// AHMAD Tech

import config from '../config.js';
import { cmd, commands } from '../command.js';
import os from "os";
import { runtime, sleep } from '../lib/functions.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    const urlLower = url.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext => urlLower.endsWith(ext));
};

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository", "deploy"],
    desc: "Get AHMAD-MD deploy link and information",
    react: "📂",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply, userConfig }) => {
    try {
        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || 'AHMAD-MD';
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || 'AHMAD-TECH';
        const BOT_IMAGE = userConfig?.BOT_IMAGE || userConfig?.BOT_MEDIA_URL || config.BOT_IMAGE || config.BOT_MEDIA_URL;
        
        const deployLink = 'https://ahmad-md.vercel.app';

        // --- NEW PREMIUM DESIGN ---
        const formattedInfo = `
✨ *${BOT_NAME.toUpperCase()} - DEPLOYMENT HUB* ✨

*╔══════════════════════╗*
*┃ 🤖 SYSTEM INFORMATION*
*╠══════════════════════╝*
*┠ 👤 OWNER:* ${OWNER_NAME}
*┠ 📦 VERSION:* 1.0.0 (Latest)
*┠ 🛠️ ENGINE:* Node.js / Baileys
*┠ ⏳ RUNTIME:* ${runtime(process.uptime())}
*╚══════════════════════╝*

*╔══════════════════════╗*
*┃ 🚀 QUICK DEPLOYMENT*
*╠══════════════════════╝*
*┠ 🔗 PAIRING LINK:*
*┃* ${deployLink}
*┠ 📑 INSTRUCTIONS:*
*┃ 1.* Click the link above.
*┃ 2.* Enter your number with country code.
*┃ 3.* Link the code in Linked Devices.
*╚══════════════════════╝*

*📢 Stay Connected for Updates!*
*Powered By ${OWNER_NAME}*`.trim();

        let imageToUse;
        const localImagePath = path.join(__dirname, '../lib/AHMADmd.jpg');
        
        if (isValidImageUrl(BOT_IMAGE)) {
            try {
                await axios.head(BOT_IMAGE, { timeout: 3000 });
                imageToUse = BOT_IMAGE;
            } catch (e) {
                imageToUse = localImagePath;
            }
        } else {
            imageToUse = localImagePath;
        }

        await conn.sendMessage(from, {
            image: { url: imageToUse },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: `${BOT_NAME} - OFFICIAL`,
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("❌ Error: Script fetch nahi ho saki.");
    }
});
