import axios from "axios";
import { sleep } from '../lib/functions.js';
import { cmd, commands } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random joke fetch karne ke liye
// ==========================================
async function getRandomJoke(conn, mek, m, { reply }) {
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = response.data;

        if (!joke || !joke.setup || !joke.punchline) {
            return reply("❌ Failed to fetch a joke. Please try again.");
        }

        const jokeMessage = `🤣 *Here's a random joke for you!* 🤣\n\n*${joke.setup}*\n\n${joke.punchline} 😆\n\n> *© Powered by AHMAD TechX*`;

        return reply(jokeMessage);
    } catch (error) {
        console.error("❌ Error in joke command:", error);
        return reply("⚠️ An error occurred while fetching the joke. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.joke)
// ==========================================
cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
}, async (conn, m, store, { reply }) => {
    await getRandomJoke(conn, m, m, { reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (joke)
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

        // Joke trigger (bina prefix)
        if (userText !== "joke") return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Joke fetch karo
        await getRandomJoke(conn, mek, { }, {
            reply: replyFn
        });

    } catch (error) {
        console.error("Joke No-Prefix Error:", error);
    }
});
