import { cmd, commands } from '../command.js';
import os from "os";
import config from '../config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — alive status bhejne ke liye
// ==========================================
async function sendAliveStatus(conn, mek, m, { from, sender, reply }) {
    try {
        // ⏳ Initial React
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const formatUptime = (seconds) => {
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${secs}s`;
        };

        const uptime = formatUptime(process.uptime());
        const RAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const platform = os.platform();

        // PROFESSIONAL DASHBOARD DESIGN
        const status = `*╭───────────〔 ᴀʜᴍᴀᴅ-ᴍᴅ 〕──────────┈⊷*
*│*
*┝┤ 🤖 sᴛᴀᴛᴜs:* ᴏɴʟɪɴᴇ & ᴀᴄᴛɪᴠᴇ
*┝┤ ⏱️ ᴜᴘᴛɪᴍᴇ:* ${uptime}
*┝┤ 📟 ʀᴀᴍ ᴜsᴀɢᴇ:* ${RAM} ᴍʙ
*┝┤ 💻 ᴘʟᴀᴛғᴏʀᴍ:* ${platform}
*│*
*╰──────────────────────────────────┈⊷*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ ʜᴀssᴀɴ*`;

        await conn.sendMessage(from, {
            text: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: "AHMAD-MD TECH",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // ✅ Success React
        await conn.sendMessage(from, { react: { text: '🟢', key: mek.key } });

    } catch (e) {
        console.error("Error in alive command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`❌ System Error: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.alive, .status, .bot)
// ==========================================
cmd({
    pattern: "alive",
    alias: ["status", "bot"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🚀",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    await sendAliveStatus(conn, mek, m, { from, sender, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (alive, status, bot)
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

        // Alive triggers (bina prefix)
        const aliveTriggers = ["alive", "status", "bot"];

        // Check: exact match?
        if (!aliveTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Status bhejo
        await sendAliveStatus(conn, mek, { sender }, {
            from,
            sender,
            reply: replyFn
        });

    } catch (error) {
        console.error("Alive No-Prefix Error:", error);
    }
});
