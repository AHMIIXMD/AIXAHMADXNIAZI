import config from '../config.js';
import { cmd, commands } from '../command.js';
import path from 'path';
import os from "os";
import fs from 'fs';
import { runtime } from '../lib/functions.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function for small caps text
const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';
    const smallCapsMap = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
        'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
        's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };
    return text.toLowerCase().split('').map(char => smallCapsMap[char] || char).join('');
};

// Helper sleep function for animation delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- SIMPLE CLEAN CATEGORY DESIGN ---
const formatCategory = (category, cmds) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    if (validCmds.length === 0) return ''; 
    
    let title = `\n╭───〔 *${category.toUpperCase()} MENU* 〕───\n│\n`;
    let body = validCmds.map(cmd => `│ ⚡︎ *${toSmallCaps(cmd.pattern)}*`).join('\n');
    let footer = `\n│\n╰───────────────────────\n`;
    
    return `${title}${body}${footer}`;
};

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu"],
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // --- LOADING ANIMATION ---
        const loadingFrames = [
            "🔄 *Loading Menu...* ```[▱▱▱▱▱▱▱▱▱▱] 0%```",
            "🔄 *Loading Menu...* ```[▰▰▱▱▱▱▱▱▱▱] 20%```",
            "🔄 *Loading Menu...* ```[▰▰▰▰▱▱▱▱▱▱] 40%```",
            "🔄 *Loading Menu...* ```[▰▰▰▰▰▰▱▱▱▱] 60%```",
            "🔄 *Loading Menu...* ```[▰▰▰▰▰▰▰▰▱▱] 80%```",
            "🔄 *Loading Menu...* ```[▰▰▰▰▰▰▰▰▰▰] 100%```",
            "✅ *Loading Complete! Preparing Menu...*"
        ];

        let sentMessage = await conn.sendMessage(from, { text: loadingFrames[0] }, { quoted: mek });

        for (let i = 1; i < loadingFrames.length; i++) {
            await sleep(400); // Animation speed (400ms)
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: loadingFrames[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(Boolean);
        let menuSections = '';
        categories.forEach(cat => {
            const catCmds = Object.values(commands).filter(c => c.category === cat);
            menuSections += formatCategory(cat, catCmds);
        });

        const BOT_NAME = config.BOT_NAME || "AHMAD-MD";
        const uptime = runtime(process.uptime());

        // --- UPGRADED PREMIUM INTERFACE DESIGN ---
        let dec = `
👑 *${BOT_NAME.toUpperCase()}* 👑

┌─── ❖ *SYSTEM INFO* ❖
│ 👑 *Owner:* ${config.OWNER_NAME || "Ahmad Hassan"}
│ ⏱️ *Uptime:* ${uptime}
│ 📜 *Commands:* ${Object.keys(commands).length}
│ 🌐 *Mode:* ${config.MODE || "Public"}
│ 🖥️ *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
└───📌
${menuSections}
> *✨ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ ʜᴀssᴀɴ ✨*`;

        let imageToUse = "https://files.catbox.moe/ptvl03.jpg";

        // 1. Menu Image Send with Caption
        await conn.sendMessage(from, { 
            image: { url: imageToUse },
            caption: dec, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363426472060176@newsletter', 
                    newsletterName: "AHMADTech", 
                    serverMessageId: 143 
                } 
            } 
        }, { quoted: mek });

        // 2. Audio File Send
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/6fmy9a.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

    } catch (e) { 
        reply(`Error: ${e.message}`); 
    } 
});
