import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — boom/spam messages bhejne ke liye
// ==========================================
async function sendBoom(conn, mek, m, { from, reply, args }) {
    try {
        // Check if user provided count and message
        if (args.length < 2) {
            return reply('❌ Sahih tareeqa: .boom <tadaad> <message>\n\nExample:\n.boom 5 Hello');
        }

        const count = parseInt(args[0]);
        const text = args.slice(1).join(" ");

        // Limit set karna zaroori hai taake bot ban na ho (Max 30)
        if (isNaN(count) || count <= 0) return reply('❌ Tadaad (count) aik number honi chahiye.');
        if (count > 50) return reply('❌ Bohot zyada messages! Limit 50 tak hai.');

        // Boom loop
        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { text: text });
        }

    } catch (error) {
        console.error('Boom Command Error:', error);
        reply('❌ Command execute karne mein masla aya.');
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.boom, .spam, .massmail)
// ==========================================
cmd({
    pattern: "boom",
    alias: ["spam", "massmail"],
    react: '☠️',
    desc: "Send multiple messages (Boom)",
    category: "utility",
    use: ".boom <count> <message>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    await sendBoom(conn, mek, m, { from, reply, args });
});

// ==========================================
// 📌 2. Bina prefix wala handler (boom, spam, massmail)
// 🔒 Sirf OWNER ke liye — security ke liye
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
        // 🔒 SIRF OWNER — warna WhatsApp ban ho jayega
        if (!isCreator) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Boom triggers (bina prefix)
        const boomTriggers = ["boom", "spam", "massmail"];

        // Check: kya pehla word trigger hai?
        if (!boomTriggers.includes(firstWord)) return;

        // Baaki text (count + message)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Boom chalao
        await sendBoom(conn, mek, { }, {
            from,
            reply: replyFn,
            args
        });

    } catch (error) {
        console.error("Boom No-Prefix Error:", error);
    }
});
