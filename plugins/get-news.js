import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — news headlines fetch karne ke liye
// ==========================================
async function fetchLatestNews(conn, mek, m, { from, reply }) {
    try {
        const apiKey = "0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles || !articles.length) {
            return reply("No news articles found.");
        }

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
📰 *${article.title}*
⚠️ _${article.description || 'No description available'}_
🔗 _${article.url}_

  ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ AHMAD TᴇᴄʜX
            `;

            console.log('Article URL:', article.urlToImage);

            if (article.urlToImage) {
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                await conn.sendMessage(from, { text: message });
            }
        }
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.news)
// ==========================================
cmd({
    pattern: "news",
    desc: "Get the latest news headlines.",
    category: "utility",
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await fetchLatestNews(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (news, headlines, khabar)
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

        // News triggers (bina prefix)
        const newsTriggers = ["news", "headlines", "khabar"];

        // Check: exact match?
        if (!newsTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // News fetch karo
        await fetchLatestNews(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("News No-Prefix Error:", error);
    }
});
