import config from '../config.js';
import { cmd, commands } from '../command.js';
import path from 'path';
import os from "os";
import fs from 'fs';
import { runtime } from '../lib/functions.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Haya song bhejne ke liye
// ==========================================
async function sendHayaSong(conn, mek, m, { from, reply }) {
    try {
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/cs1158.opus" },
            mimetype: 'audio/mpeg',
            ptt: false,
            contextInfo: {
                mentionedJid: [m.sender || mek.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: "HAYA SINGS❤️‍🩹",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        reply(`Error: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (saare triggers)
// ==========================================
const patternLoop = ["hayasong", "haya", "hsong"];

patternLoop.forEach((ptrn) => {
    cmd({
        pattern: ptrn,
        category: "haya song",
        react: "⚡",
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        await sendHayaSong(conn, mek, m, { from, reply });
    });
});

// ==========================================
// 📌 2. Bina prefix wala handler (hayasong, haya, hsong)
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig,
    prefix
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Haya song triggers (bina prefix)
        const hayaTriggers = ["hayasong", "haya", "hsong"];

        // Check: exact match?
        if (!hayaTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Haya song bhejo
        await sendHayaSong(conn, mek, { sender }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("HayaSong No-Prefix Error:", error);
    }
});
