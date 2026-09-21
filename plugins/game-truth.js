import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random truth question fetch karne ke liye
// ==========================================
async function getRandomTruth(conn, mek, m, { from, reply }) {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/truth');

        if (!data.success) return reply("❌ Couldn't get a truth question. Try again!");

        await reply(`🔍 *Truth Question* 🔍\n\n"${data.question}"\n\n_Be honest!_`);

    } catch (error) {
        console.error('Truth Error:', error);
        reply("❌ Can't handle the truth right now. Try again later!");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.truth)
// ==========================================
cmd({
    pattern: "truth",
    desc: "Get a random truth question",
    react: "🤔",
    category: "fun",
    use: '.truth',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await getRandomTruth(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (truth)
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

        // Truth trigger (bina prefix)
        if (userText !== "truth") return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Truth fetch karo
        await getRandomTruth(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Truth No-Prefix Error:", error);
    }
});
