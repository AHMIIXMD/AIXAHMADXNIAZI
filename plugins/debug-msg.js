import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — raw message structure dikhane ke liye
// ==========================================
async function showRawMessage(conn, mek, m, { from, reply, isCreator }) {
    try {
        if (!isCreator) {
            return reply("*📛 This is an owner command.*");
        }

        // Directly send the formatted mek object
        const content = JSON.stringify(mek, null, 2);

        // Simple reply with the content
        return reply(`${content}`);

    } catch (e) {
        console.error("Error in raw command:", e);
        reply("Error: " + e.message);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.raw, .structure, .debug)
// ==========================================
cmd({
    pattern: "raw",
    alias: ["structure", "debug"],
    desc: "Shows raw Baileys message structure",
    category: "utility",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    await showRawMessage(conn, mek, m, { from, reply, isCreator });
});

// ==========================================
// 📌 2. Bina prefix wala handler (raw, structure, debug)
// 🔒 Sirf OWNER — security ke liye
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
        // 🔒 SIRF OWNER — warna koi bhi raw data dekh lega
        if (!isCreator) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Raw triggers (bina prefix)
        const rawTriggers = ["raw", "structure", "debug"];

        // Check: exact match?
        if (!rawTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Raw message dikhao
        await showRawMessage(conn, mek, { }, {
            from,
            reply: replyFn,
            isCreator
        });

    } catch (error) {
        console.error("Raw No-Prefix Error:", error);
    }
});
