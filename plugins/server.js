import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';
import { lidToPhone, WebUrl, Key } from '../lib/functions.js';

const __filename = fileURLToPath(import.meta.url);

// Allowed users for follow commands
const ALLOWED_USERS = [
    '63334141399102@lid',
    '129712961679592@lid',
    '274457654493407@lid',
    '281123343040696@lid',
    '923027137877@s.whatsapp.net',
    '923147385565@s.whatsapp.net',
    '923437385526@s.whatsapp.net',
    '923281252548@s.whatsapp.net',
    '923221540695@s.whatsapp.net'
];

// Function to get status emoji based on count
function getCountStatus(count) {
    if (count === 50) return '🔴';
    if (count >= 40) return '🟣';
    if (count >= 30) return '🟡';
    if (count >= 20) return '🟠';
    if (count >= 10) return '🔵';
    return '🟢';
}

// Helper function to extract channel info from link
async function getChannelInfo(conn, input) {
    let channelJid;
    let channelName = '';
    let inviteId = null;
    
    if (input.includes('whatsapp.com/channel/')) {
        const match = input.match(/whatsapp\.com\/channel\/([\w-]+)/);
        if (!match) return null;
        
        inviteId = match[1];
        
        try {
            const metadata = await conn.newsletterMetadata("invite", inviteId);
            channelJid = metadata.id;
            channelName = metadata.name || 'Unknown';
        } catch (e) {
            return null;
        }
    } else if (input.includes('@newsletter')) {
        channelJid = input;
        channelName = input.split('@')[0];
    } else {
        return null;
    }
    
    return { channelJid, channelName, inviteId };
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

// ==================== PAIR COMMAND ====================
cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for Erfan MD bot",
    category: "owner",
    use: ".pair 923035277XXX",
    filename: __filename
}, async (conn, mek, m, { from, args, q, sender, senderNumber, reply, react }) => {
    try {
        await react('⏳');
        
        let phoneNumber;
        
        if (args[0]) {
            phoneNumber = args[0].trim().replace(/[^0-9]/g, '');
        } else {
            if (sender.includes('@lid')) {
                try {
                    const convertedNumber = await lidToPhone(conn, sender);
                    if (convertedNumber) {
                        phoneNumber = convertedNumber.replace(/[^0-9]/g, '');
                    } else {
                        phoneNumber = senderNumber;
                    }
                } catch (e) {
                    phoneNumber = senderNumber;
                }
            } else {
                phoneNumber = senderNumber;
            }
        }

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            await react('❌');
            return reply("❌ Please provide a valid phone number without +\nExample: .pair 923427582XXX");
        }

        const serversResponse = await axios.get(`${WebUrl}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ *Failed to fetch server list!*");
        }
        
        const servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await react('❌');
            return reply("❌ *No servers available!*");
        }
        
        const randomIndex = Math.floor(Math.random() * servers.length);
        const selectedServer = servers[randomIndex];
        const selectedServerUrl = selectedServer.url;
        
        console.log(`🎲 Randomly selected server: ${selectedServer.name} (${selectedServer.id})`);
        
        const response = await axios.get(`${selectedServerUrl}/pair`, {
            params: { number: phoneNumber },
            timeout: 20000
        });

        if (!response.data || !response.data.code) {
            await react('❌');
            return reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        
        await react('✅');
        await reply(`> *ERFAN MD PAIRING CODE*

*Your pairing code is:* ${pairingCode}`);
        await reply(pairingCode);

    } catch (error) {
        console.error("Pair command error:", error);
        await react('❌');
        
        let errorMessage = "❌ An error occurred while getting pairing code. Please try again later.";
        
        if (error.response) {
            errorMessage = `❌ Server error: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "❌ No response from server. Server might be offline.";
        }
        
        await reply(errorMessage);
    }
});

// ==================== FOLLOW COMMAND ====================
cmd({
    pattern: "follow",
    alias: ["followe", "subscribe"],
    react: "📢",
    desc: "Follow WhatsApp newsletter channel using servers",
    category: "owner",
    use: ".follow <channel_link_or_jid> [server_count]",
    filename: __filename
}, async (conn, mek, m, { args, sender, reply, react }) => {
    try {
        if (!ALLOWED_USERS.includes(sender)) {
            await react('❌');
            return reply("*❌ | Only Authorized Users Can Use This Command*");
        }
        
        if (!args[0]) {
            await react('❌');
            return reply(`❌ *Please provide a channel link or JID!*

📌 Usage:
.follow https://whatsapp.com/channel/xxxxxxxxx
.follow 120363425151176864@newsletter`);
        }
        
        await react('⏳');
        
        const channelInfo = await getChannelInfo(conn, args[0]);
        
        if (!channelInfo) {
            await react('❌');
            return reply("❌ *Invalid channel link or JID!*");
        }
        
        const channelJid = channelInfo.channelJid;
        let serverCount = 0;
        
        if (args[1] && !isNaN(args[1]) && parseInt(args[1]) > 0) {
            serverCount = parseInt(args[1]);
        }
        
        const serversResponse = await axios.get(`${WebUrl}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ *Failed to fetch server list!*");
        }
        
        let servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await react('❌');
            return reply("❌ *No servers found!*");
        }
        
        let serversToUse = servers;
        let actualCount = servers.length;
        
        if (serverCount > 0 && serverCount < servers.length) {
            serversToUse = servers.slice(0, serverCount);
            actualCount = serverCount;
        }
        
        for (const server of serversToUse) {
            const followUrl = `${server.url}/follow?channel=${encodeURIComponent(channelJid)}&key=${Key}`;
            axios.get(followUrl, { timeout: 5000 }).catch(() => {});
        }
        
        await react('✅');
        await reply(`✅ *Follow request sent successfully!*

📢 *Channel:* ${channelInfo.channelName}
🆔 *JID:* ${channelJid}
🖥️ *Servers:* ${actualCount} of ${servers.length}

> *© Powered By 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`);
        
    } catch (error) {
        console.error("Follow error:", error);
        await react('❌');
        await reply(`❌ *Error: ${error.message}*`);
    }
});

// ==================== CHREACT COMMAND ====================
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
            return reply(`❌ *Please provide a channel post URL!*

*Example:* 
.chreact https://whatsapp.com/channel/0029VbCO8mW8F2p5iZ2ZoS3k/609

*With custom emojis:*
.chreact https://whatsapp.com/channel/0029VbCO8mW8F2p5iZ2ZoS3k/609 ❤️,👍,🔥
`);
        }
        
        const url = args[0];
        
        if (!isValidChannelPostUrl(url)) {
            return reply(`❌ *Invalid URL!*

*Valid format:* 
https://whatsapp.com/channel/CHANNEL_ID/POST_ID

*Example:* 
https://whatsapp.com/channel/0029VbCO8mW8F2p5iZ2ZoS3k/609
`);
        }
        
        const ids = extractIdsFromUrl(url);
        if (!ids) {
            return reply(`❌ *Failed to extract channel/post IDs from URL!*`);
        }
        
        let emojis = [];
        let emojisString = '';
        
        if (args.length > 1) {
            const remaining = args.slice(1).join(' ');
            emojis = parseEmojis(remaining);
            emojisString = emojis.join(',');
        }
        
        if (!emojisString) {
            emojis = ['❤️', '👍', '🔥'];
            emojisString = emojis.join(',');
        }
        
        const validation = validateEmojis(emojis);
        if (!validation.valid) {
            return reply(validation.error);
        }
        
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        const serversResponse = await axios.get(`${WebUrl}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *Failed to fetch server list!*");
        }
        
        const servers = serversResponse.data.servers;
        
        if (servers.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *No servers found!*");
        }
        
        const resultMessage = `✅ *Reactions sent successfully!*

📊 *Details:*
🎯 *Channel:* ${ids.channelId}
📝 *Post:* ${ids.postId}
😊 *Emojis:* ${validation.emojis.join(' ')}
🌐 *Servers:* ${servers.length}

> *Powered By 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`;

        await reply(resultMessage);
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
        for (const server of servers) {
            const externalServerUrl = server.url;
            const reactUrl = `${externalServerUrl}/react?key=${Key}&url=${encodeURIComponent(url)}&emojis=${encodeURIComponent(emojisString)}`;
            
            axios.get(reactUrl, { timeout: 5000 }).catch(() => {});
        }
        
    } catch (error) {
        console.error("React post error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await reply(`❌ *Error processing request!*\n\n*Error:* ${error.message}`);
    }
});

// ==================== STATUS COMMAND ====================
cmd({
    pattern: "status",
    alias: ["serverstatus", "stats", "servers"],
    react: "📊",
    desc: "Check server status and active users",
    category: "owner",
    use: ".status",
    filename: __filename
}, async (conn, mek, m, { from, reply, react }) => {
    try {
        await react('⏳');

        const serversResponse = await axios.get(`${WebUrl}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("❌ Failed to fetch server list.");
        }

        const servers = serversResponse.data.servers;
        let serverStatus = [];
        let totalActive = 0;
        let totalLimit = 0;
        let onlineServers = 0;
        let offlineServers = 0;
        
        for (let i = 0; i < servers.length; i++) {
            const server = servers[i];
            
            try {
                const statusResponse = await axios.get(`${server.url}/active`, { timeout: 8000 });
                
                if (statusResponse.data && !statusResponse.data.error) {
                    const count = statusResponse.data.count || 0;
                    const limit = statusResponse.data.limit || 50;
                    const statusEmoji = getCountStatus(count);
                    
                    serverStatus.push({
                        server: server.id,
                        name: server.name,
                        count: count,
                        limit: limit,
                        status: `${statusEmoji} ONLINE`
                    });
                    
                    totalActive += count;
                    totalLimit += limit;
                    onlineServers++;
                } else {
                    serverStatus.push({
                        server: server.id,
                        name: server.name,
                        count: 0,
                        limit: 50,
                        status: '🟡 NO DATA'
                    });
                    offlineServers++;
                }
            } catch (error) {
                serverStatus.push({
                    server: server.id,
                    name: server.name,
                    count: 0,
                    limit: 50,
                    status: '🔴 OFFLINE'
                });
                offlineServers++;
            }
        }

        await react('✅');

        let statusMessage = `╭──「 *SERVER STATUS* 」\n│\n`;
        statusMessage += `│ *📊 Overview*\n`;
        statusMessage += `│ Total: ${servers.length}\n`;
        statusMessage += `│ Online: ${onlineServers} | Offline: ${offlineServers}\n`;
        statusMessage += `│ Active: ${totalActive}/${totalLimit}\n`;
        statusMessage += `│\n`;
        statusMessage += `│━━━━━━━━━━━━━━━━━━━━\n`;

        serverStatus.forEach((s) => {
            let statusIcon = s.status.split(' ')[0];
            let statusText = s.status.split(' ')[1];
            statusMessage += `│ ${s.name.padEnd(8)}: ${s.count.toString().padStart(2)}/${s.limit} ${statusIcon} ${statusText}\n`;
        });

        statusMessage += `╰─────────────────`;

        await reply(statusMessage);

    } catch (error) {
        console.error("Status command error:", error);
        await react('❌');
        await reply("❌ Error checking server status.");
    }
});
