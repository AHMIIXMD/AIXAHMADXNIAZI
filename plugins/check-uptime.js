import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — uptime check karne ke liye
// ==========================================
async function checkUptime(conn, mek, m, { from, reply }) {
    try {
        // ⏳ React - processing
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        // 1000ms delay to ensure react is visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        const formatUptime = (seconds) => {
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);

            let timeString = '';
            if (days > 0) timeString += `${days} day${days > 1 ? 's' : ''} `;
            if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
            if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
            if (secs > 0 || timeString === '') timeString += `${secs} second${secs !== 1 ? 's' : ''}`;

            return timeString.trim();
        };

        const uptime = formatUptime(process.uptime());

        await conn.sendMessage(from, {
            text: `⏱️ *Uptime:* ${uptime}`,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                mentionedJid: [m.sender || mek.sender]
            }
        }, { quoted: mek });

        // 800ms delay before success react
        await new Promise(resolve => setTimeout(resolve, 800));

        // ✅ React - success
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Error in uptime command:", e);
        // ❌ React - error
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ Error checking uptime: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.uptime, .runtime, .up)
// ==========================================
cmd({
    pattern: "uptime",
    alias: ["runtime", "up"],
    desc: "Check bot uptime",
    category: "utility",
    react: "⏱️",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await checkUptime(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (uptime, runtime, up)
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

        // Uptime triggers (bina prefix)
        const uptimeTriggers = ["uptime", "runtime", "up"];

        // Check: kya exact match hai?
        if (!uptimeTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Uptime check karo
        await checkUptime(conn, mek, { sender }, { from, reply: replyFn });

    } catch (error) {
        console.error("Uptime No-Prefix Error:", error);
    }
});
