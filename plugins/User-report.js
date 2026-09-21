import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — report bhejne ke liye
// ==========================================
async function sendReport(conn, mek, m, { from, sender, text, reply }) {
    const owner = "923221540695@s.whatsapp.net"; // درست JID format

    if (!text) {
        return conn.sendMessage(from, {
            text: "❌ Please write something to report\nExample: .report bot is not working"
        }, { quoted: mek });
    }

    // user response
    await conn.sendMessage(from, {
        text: "✅ Report sent successfully"
    }, { quoted: mek });

    // owner ko report
    await conn.sendMessage(owner, {
        text:
`🚨 NEW REPORT RECEIVED

👤 From: ${sender}
📍 Chat: ${from}
📝 Report: ${text}`
    }, { quoted: mek });
}

// ==========================================
// 📌 1. Prefix wala handler (.report)
// ==========================================
cmd({
    pattern: "report",
    react: "🚨",
    category: "misc",
    filename: __filename
}, async (conn, mek, m, { from, sender, text, reply }) => {
    await sendReport(conn, mek, m, { from, sender, text, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (report)
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
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Report trigger (bina prefix)
        if (firstWord !== "report") return;

        // Baaki text (report ka message)
        const reportText = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Report bhejo
        await sendReport(conn, mek, { }, {
            from,
            sender,
            text: reportText,
            reply: replyFn
        });

    } catch (error) {
        console.error("Report No-Prefix Error:", error);
    }
});
