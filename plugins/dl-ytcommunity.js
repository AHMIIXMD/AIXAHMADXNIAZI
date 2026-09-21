import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — YouTube community post download
// ==========================================
async function downloadYTPost(conn, mek, m, { from, args, q, reply, react }) {
    try {
        if (!q) return reply("Please provide a YouTube community post URL.\nExample: `.ytpost <url>`");

        const apiUrl = `https://api.siputzx.my.id/api/d/ytpost?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            if (react) await react("❌");
            return reply("Failed to fetch the community post. Please check the URL.");
        }

        const post = data.data;
        let caption = `📢 *YouTube Community Post* 📢\n\n` +
                      `📜 *Content:* ${post.content}`;

        if (post.images && post.images.length > 0) {
            for (const img of post.images) {
                await conn.sendMessage(from, { image: { url: img }, caption }, { quoted: mek });
                caption = ""; // Only add caption once
            }
        } else {
            await conn.sendMessage(from, { text: caption }, { quoted: mek });
        }

        if (react) await react("✅");
    } catch (e) {
        console.error("Error in ytpost command:", e);
        if (react) await react("❌");
        reply("An error occurred while fetching the YouTube community post.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.ytpost, .ytcommunity, .ytc)
// ==========================================
cmd({
    pattern: "ytpost",
    alias: ["ytcommunity", "ytc"],
    desc: "Download a YouTube community post",
    category: "download",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, args, q, reply, react }) => {
    await downloadYTPost(conn, mek, m, { from, args, q, reply, react });
});

// ==========================================
// 📌 2. Bina prefix wala handler (ytpost, ytcommunity, ytc)
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

        // YTPost triggers (bina prefix)
        const ytpostTriggers = ["ytpost", "ytcommunity", "ytc"];

        // Check: kya pehla word trigger hai?
        if (!ytpostTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // React function
        const reactFn = async (emoji) => {
            try {
                await conn.sendMessage(from, { react: { text: emoji, key: mek.key } });
            } catch (e) {}
        };

        // YTPost download karo
        await downloadYTPost(conn, mek, { }, {
            from,
            args: query.split(/\s+/).filter(a => a),
            q: query,
            reply: replyFn,
            react: reactFn
        });

    } catch (error) {
        console.error("YTPost No-Prefix Error:", error);
    }
});
