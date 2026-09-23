// AHMAD-MD

import config from '../config.js';
import { cmd, commands } from '../command.js';
import { runtime } from '../lib/functions.js';
import fs from 'fs';
import path from 'path';
import os from "os";
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

// --- ROYAL LUXURY CATEGORY STYLE ---
const formatCategory = (category, cmds) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    if (validCmds.length === 0) return ''; 
    
    let title = `\n*◈═══〔 ${category.toUpperCase()} 〕═══◈*\n`;
    let body = validCmds.map(cmd => `*⚡︎* ${toSmallCaps(cmd.pattern)}`).join('\n');
    return `${title}${body}\n`;
};

cmd({
    pattern: "help",
    alias: ["listcmd", "list", "h", "commands", "menu"],
    desc: "Show all available commands with descriptions",
    category: "main",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply, pushname }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(Boolean);
        const uptime = runtime(process.uptime());
        const BOT_NAME = config.BOT_NAME || "AHMAD-MD";

        // Organize commands into categories with Royal Style
        let menuSections = '';
        categories.forEach(cat => {
            const catCmds = Object.values(commands).filter(c => c.category === cat);
            menuSections += formatCategory(cat, catCmds);
        });

        // --- ROYAL INTERFACE DESIGN ---
        let menuText = `
*✨ ${BOT_NAME.toUpperCase()} ✨*

*╭══════════════════⊷*
*│ 👤 OWNER:* ${config.OWNER_NAME || "Ahmad Hasan"}
*│ 🚀 UPTIME:* ${uptime}
*│ 📂 COMMANDS:* ${totalCommands}
*│ 🛠️ MODE:* ${config.MODE || "Public"}
*│ ⚙️ PREFIX:* [ ${config.PREFIX} ]
*╰══════════════════⊷*
${menuSections}
*──╼『 ${BOT_NAME} 』╾──*
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ ʜᴀsᴀɴ*`;

        // Image Handling: Checks for local image first, then falls back to config link
        const localImagePath = path.join(__dirname, '../lib/jawadmd.jpg');
        let imageToSend;

        if (fs.existsSync(localImagePath)) {
            imageToSend = fs.readFileSync(localImagePath);
        } else {
            imageToSend = { url: config.BOT_IMAGE || "https://files.catbox.moe/p5id8x.jpg" };
        }

        await conn.sendMessage(from, {
            image: typeof imageToSend === 'object' ? imageToSend : { url: imageToSend },
            caption: menuText,
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

    } catch (e) {
        console.error('Command List Error:', e);
        reply(`❌ Error: ${e.message}`);
    }
})
