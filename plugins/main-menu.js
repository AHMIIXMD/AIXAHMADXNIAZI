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

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu"],
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const totalCommands = Object.keys(commands).length;
        
        // --- 1. SENDING BANNER IMAGE FIRST ---
        // Replace this URL with your custom banner image URL
        let bannerImage = "https://files.catbox.moe/ptvl03.jpg";
        
        // Use a slight delay to ensure it sends before the text
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await conn.sendMessage(from, { 
            image: { url: bannerImage }
        });

        // --- 2. SENDING PRECISE TEXT MENU SECOND (As per image_0.png) ---
        // Formatting text to match the exact look: Bold, emojis, newlines, and bullet style
        let preciseMenu = `
👑 *${config.BOT_NAME || "AHMAD"}* 👑

       *بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیمِ*
     *اِیَّاکَ نَعۡبُدُ وَ اِیَّاکَ نَسۡتَعِیۡنُ* ☝️

┌─── ❖
│ 👑 *Owner:* *${config.OWNER_NAME || "AHMAD"}* 🚩
│ ⏱️ *Uptime:* ${uptime}
│ 📜 *Commands:* ${totalCommands}
│ 🌐 *Mode:* ${config.MODE || "public"}
│ 🖥️ *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
└───📌

[ ISLAMIC MENU ]

⚡︎ *DUA_FOR_...*
⚡︎ *ALLAH_NAMES*
⚡︎ *QURAN_VERSES*
⚡︎ *HADEES*
⚡︎ *DURUD*
⚡︎ *DUAS*

> *✨ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ ʜᴀssᴀɴ ✨*`;

        // Send text menu with specific context info (newsletter info, etc.)
        await conn.sendMessage(from, { 
            text: preciseMenu,
            contextInfo: { 
                mentionedJid: [m.sender],
                isForwarded: true, 
                forwardingScore: 999, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363426472060176@newsletter', 
                    newsletterName: "AHMADTech", 
                    serverMessageId: 143 
                } 
            }
        }, { quoted: mek });

        // --- 3. OPTIONAL: AUDIO PLAYBACK ---
        // (Uncomment if you want to keep the audio message part)
        /*
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/yvvzji.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });
        */

    } catch (e) { 
        console.error("Error in menu command:", e);
        reply(`Error: ${e.message}`); 
    } 
});
