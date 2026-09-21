import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random dare fetch karne ke liye
// ==========================================
async function getRandomDare(conn, mek, m, { from, reply }) {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/dare');

        if (!data.success) return reply("❌ Failed to get a dare. Try again!");

        await reply(`🔥 *Dare Challenge* 🔥\n\n"${data.question}"\n\n_Don't chicken out!_`);

    } catch (error) {
        console.error('Dare Error:', error);
        reply("❌ Too scared to give a dare right now. Try again later!");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.dare)
// ==========================================
cmd({
    pattern: "dare",
    desc: "Get a random dare challenge",
    react: "😈",
    category: "fun",
    use: '.dare',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await getRandomDare(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (dare)
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

        // Dare trigger (bina prefix)
        if (userText !== "dare") return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Dare fetch karo
        await getRandomDare(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Dare No-Prefix Error:", error);
    }
});
