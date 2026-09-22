import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';
import { WebUrl, Key } from '../lib/functions.js';

const __filename = fileURLToPath(import.meta.url);

// Function to get status emoji based on count
function getCountStatus(count) {
    if (count === 50) return '🔴';
    if (count >= 40) return '🟣';
    if (count >= 30) return '🟡';
    if (count >= 20) return '🟠';
    if (count >= 10) return '🔵';
    return '🟢';
}

// Validate channel post URL format
function isValidChannelPostUrl(url) {
    const pattern = /^https?:\/\/(?:www\.)?whatsapp\.com\/channel\/[a-zA-Z0-9]+\/\d+$/;
    return pattern.test(url);
}

// Extract channel ID and post ID from URL
function extractIdsFromUrl(url) {
    const match = url.match(/\/channel\/([a-zA-Z0-9]+)\/(\d+)/);
    if (match) {
        return {
            channelId: match[1],
            postId: match[2]
        };
    }
    return null;
}

// Parse emojis
function parseEmojis(input) {
    let emojis = [];
    const parts = input.split(',').map(p => p.trim()).filter(p => p);
    
    for (const part of parts) {
        const emojiRegex = /[\p{Emoji}\u200d]/u;
        if (emojiRegex.test(part)) {
            emojis.push(part);
        }
    }
    
    return emojis;
}

// Validate emojis format
function validateEmojis(emojis) {
    if (!emojis || emojis.length === 0) {
        return {
            valid: false,
            error: '❌ *No valid emojis found!*\n*Example:* .chreact https://whatsapp.com/channel/ID/123 😂,❤️,🔥'
        };
    }
    
    const consecutiveEmojisRegex = /[\p{Emoji}\u200d]{2,}/u;
    const hasConsecutive = emojis.some(e => consecutiveEmojisRegex.test(e));
    
    if (hasConsecutive) {
        return {
            valid: false,
            error: '❌ *Invalid format! Please separate all emojis with commas*\n*Example:* .chreact link 😂,❤️,🔥,👏,😮'
        };
    }
    
    return { valid: true, emojis };
}

// ==================== CHREACT COMMAND ===================
cmd({
    pattern: "chreact",
    alias: ["channelreact", "react", "rp"],
    react: "🎯",
    desc: "React to WhatsApp channel post",
    category: "group",
    use: ".chreact <channel_post_url> [emojis]",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) {
            return reply(`❌ *Please provide a channel post URL!*\n\n*Example:* \n.chreact https://whatsapp.com/channel/0029VbD059NBadmT79uGx41n/609`);
        }
        
        const url = args[0];
        
        if (!isValidChannelPostUrl(url)) {
            return reply(`❌ *Invalid URL!*`);
        }
        
        const ids = extractIdsFromUrl(url);
        if (!ids) {
            return reply(`❌ *Failed to extract IDs!*`);
        }
        
        let emojis = [];
        let emojisString = '';
        
        if (args.length > 1) {
            const remaining = args.slice(1).join(' ');
            emojis = parseEmojis(remaining);
            emojisString = emojis.join(',');
        }
        
        if (!emojisString) {
            emojis = ['❤️', '🫠', '👻'];
            emojisString = emojis.join(',');
        }
        
        const validation = validateEmojis(emojis);
        if (!validation.valid) return reply(validation.error);
        
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        // ===== FIX 1: Servers fetch with better error handling =====
        let servers = [];
        try {
            const serversResponse = await axios.get(`${WebUrl}/servers`, { timeout: 10000 });
            if (serversResponse.data && Array.isArray(serversResponse.data.servers)) {
                servers = serversResponse.data.servers;
            }
        } catch (err) {
            console.error('Servers fetch failed:', err.message);
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *Failed to fetch server list!*");
        }
        
        if (servers.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *No servers found!*");
        }
        
        // ===== FIX 2: Actually send and WAIT for reactions =====
        let successCount = 0;
        let failCount = 0;
        
        const results = await Promise.allSettled(
            servers.map(async (server) => {
                try {
                    const reactUrl = `${server.url}/react?key=${Key}&url=${encodeURIComponent(url)}&emojis=${encodeURIComponent(emojisString)}`;
                    const res = await axios.get(reactUrl, { timeout: 8000 });
                    if (res.data && !res.data.error) {
                        successCount++;
                        return { server: server.name, ok: true };
                    } else {
                        failCount++;
                        return { server: server.name, ok: false, error: res.data?.error };
                    }
                } catch (err) {
                    failCount++;
                    return { server: server.name, ok: false, error: err.message };
                }
            })
        );
        
        // ===== FIX 3: Show real result =====
        const resultMessage = `✅ *Reactions Processed!*

📊 *Details:*
🎯 *Channel:* ${ids.channelId}
📝 *Post:* ${ids.postId}
😊 *Emojis:* ${validation.emojis.join(' ')}
🌐 *Servers:* ${servers.length}
✅ *Success:* ${successCount}
❌ *Failed:* ${failCount}

> *Powered By 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;
        
        await reply(resultMessage);
        await conn.sendMessage(from, { react: { text: successCount > 0 ? '✅' : '❌', key: m.key } });
        
    } catch (error) {
        console.error("React post error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await reply(`❌ *Error:* ${error.message}`);
    }
});
