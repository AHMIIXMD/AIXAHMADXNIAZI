import config from '../config.js';
import { cmd, commands } from '../command.js';
import path from 'path';
import os from "os";
import fs from 'fs';
import { runtime } from '../lib/functions.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Teeno patterns jo menu me show karne hain
const patternLoop = ["hayasong", "haya", "hsong"];

patternLoop.forEach((ptrn) => {
    cmd({
        pattern: ptrn,
        category: "haya song", // Teeno ko ek hi special category dedi taaki menu me alag se block bane
        react: "⚡",
        filename: __filename
    },
    async (conn, mek, m, { from, reply }) => {
        try {
            // Audio file aur channel forwarding details
            await conn.sendMessage(from, {
                audio: { url: "https://files.catbox.moe/cs1158.opus" },
                mimetype: 'audio/mpeg',
                ptt: false, 
                contextInfo: { 
                    mentionedJid: [m.sender], 
                    forwardingScore: 999, 
                    isForwarded: true, 
                    forwardedNewsletterMessageInfo: { 
                        newsletterJid: '120363407531832623@newsletter', 
                        newsletterName: "HAYA SINGS❤️‍🩹", 
                        serverMessageId: 143 
                    } 
                }
            }, { quoted: mek });

        } catch (e) { 
            reply(`Error: ${e.message}`); 
        } 
    });
});
