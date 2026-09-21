import { cmd } from "../command.js";
import { fetchEmix } from "../lib/emix-utils.js";
import { getBuffer } from "../lib/functions.js";
import { Sticker, StickerTypes } from "wa-sticker-formatter";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — emoji mix sticker banane ke liye
// ==========================================
async function createEmixSticker(conn, mek, m, { args, q, reply }) {
    try {
        if (!q || !q.includes(",")) {
            return reply("❌ *Usage:* .emix 😂,🙂\n_Send two emojis separated by a comma._");
        }

        let [emoji1, emoji2] = q.split(",").map(e => e.trim());

        if (!emoji1 || !emoji2) {
            return reply("❌ Please provide two emojis separated by a comma.");
        }

        let imageUrl = await fetchEmix(emoji1, emoji2);

        if (!imageUrl) {
            return reply("❌ Could not generate emoji mix. Try different emojis.");
        }

        let buffer = await getBuffer(imageUrl);
        let sticker = new Sticker(buffer, {
            pack: "Emoji Mix",
            author: "AHMAD-MD",
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            quality: 75,
            background: "transparent",
        });

        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(mek.chat || from, { sticker: stickerBuffer }, { quoted: mek });

    } catch (e) {
        console.error("Error in .emix command:", e.message);
        reply(`❌ Could not generate emoji mix: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.emix)
// ==========================================
cmd({
    pattern: "emix",
    desc: "Combine two emojis into a sticker.",
    category: "fun",
    react: "😃",
    use: ".emix 😂,🙂",
    filename: __filename,
}, async (conn, mek, m, { args, q, reply }) => {
    await createEmixSticker(conn, mek, m, { args, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (emix)
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
        // Normalize body (emojis ke liye NFC zaroori hai)
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Emix trigger (bina prefix)
        if (firstWord !== "emix") return;

        // Baaki text (emoji1,emoji2)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Emix sticker banao
        await createEmixSticker(conn, mek, {
            chat: from
        }, {
            args: query.split(/\s+/).filter(a => a),
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("Emix No-Prefix Error:", error);
    }
});
