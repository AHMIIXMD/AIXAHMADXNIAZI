import { cmd } from "../command.js";
import { fetchEmix } from "../lib/emix-utils.js";
import { getBuffer } from "../lib/functions.js";
import { Sticker, StickerTypes } from "wa-sticker-formatter";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — from param add kiya
// ==========================================
async function createEmixSticker(conn, mek, m, { args, q, reply, from }) {
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

        // ✅ FIX: from use kiya, mek.chat nahi
        const targetChat = from || mek.chat || mek.key?.remoteJid;
        await conn.sendMessage(targetChat, { sticker: stickerBuffer }, { quoted: mek });

    } catch (e) {
        console.error("Error in emix command:", e.message);
        reply(`❌ Could not generate emoji mix: ${e.message}`);
    }
}

// ==========================================
// 📌 Prefix handler
// ==========================================
cmd({
    pattern: "emix",
    desc: "Combine two emojis into a sticker.",
    category: "fun",
    react: "😃",
    use: ".emix 😂,🙂",
    filename: __filename,
}, async (conn, mek, m, { args, q, reply, from }) => {
    await createEmixSticker(conn, mek, m, { args, q, reply, from });
});

// ==========================================
// 📌 No-prefix handler
// ==========================================
cmd({ 'on': "body" }, async (conn, mek, store, {
    from, body, isCreator, reply, sender, userConfig, prefix
}) => {
    try {
        // ✅ Prefix wale messages skip karo — double execution rok
        if (body && prefix && body.startsWith(prefix)) return;

        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        const firstWord = userText.split(/\s+/)[0].toLowerCase();
        if (firstWord !== "emix") return;

        const query = userText.slice(firstWord.length).trim();

        // ✅ Query empty guard
        if (!query || !query.includes(",")) {
            return await conn.sendMessage(from, {
                text: "❌ *Usage:* emix 😂,🙂"
            }, { quoted: mek });
        }

        // ✅ Double execution guard
        if (mek._emixHandled) return;
        mek._emixHandled = true;

        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        await createEmixSticker(conn, mek, { chat: from }, {
            args: query.split(/\s+/).filter(a => a),
            q: query,
            reply: replyFn,
            from: from   // ✅ from pass kiya
        });

    } catch (error) {
        console.error("Emix No-Prefix Error:", error);
    }
});
