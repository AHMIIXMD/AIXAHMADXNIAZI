import axios from "axios";
import { cmd, commands } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — ringtone fetch karne ke liye
// ==========================================
async function getRingtone(conn, mek, m, { from, reply, args }) {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("Please provide a search query! Example: .ringtone Suna");
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("No ringtones found for your query. Please try a different keyword.");
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(
            from,
            {
                audio: { url: randomRingtone.dl_link },
                mimetype: "audio/mpeg",
                fileName: `${randomRingtone.title}.mp3`,
            },
            { quoted: mek }
        );
    } catch (error) {
        console.error("Error in ringtone command:", error);
        reply("Sorry, something went wrong while fetching the ringtone. Please try again later.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.ringtone, .ringtones, .ring)
// ==========================================
cmd({
    pattern: "ringtone",
    alias: ["ringtones", "ring"],
    desc: "Get a random ringtone from the API.",
    react: "🎵",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, reply, args }) => {
    await getRingtone(conn, mek, m, { from, reply, args });
});

// ==========================================
// 📌 2. Bina prefix wala handler (ringtone, ringtones, ring)
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

        // Ringtone triggers (bina prefix)
        const ringtoneTriggers = ["ringtone", "ringtones", "ring"];

        // Check: kya pehla word trigger hai?
        if (!ringtoneTriggers.includes(firstWord)) return;

        // Baaki text (search query)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Ringtone fetch karo
        await getRingtone(conn, mek, { }, {
            from,
            reply: replyFn,
            args
        });

    } catch (error) {
        console.error("Ringtone No-Prefix Error:", error);
    }
});
