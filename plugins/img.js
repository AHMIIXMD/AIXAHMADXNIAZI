// AHMAD-MD

import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Image search karne ke liye
// ==========================================
async function searchImages(conn, mek, m, { reply, args, from, apiUrl }) {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img AHMAD");
        }

        await reply(`🔍 Searching for "${query}"...`);

        const url = `${apiUrl}${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data?.status || !response.data.result?.length) {
            return reply("❌ No images found. Try different keywords");
        }

        const results = response.data.result;

        // Get 5 random images
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const image of selectedImages) {
            await conn.sendMessage(
                from,
                {
                    image: { url: image.url },
                    caption: `*📷 Result for*: ${query}\n> *©𝛲๏፝֟Ꮿ𝛆̽ɼ͠ ɓɣ̬ 𝆺𝅥𝆬𓍢ִ໋͙⋆𝘼𝙃𝙈𝘼𝘿 𝐌𝐃💸˚₊· ͟͟͞͞➳*`
                },
                { quoted: mek }
            );

            // Add delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('Image Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.img, .image, .searchimg)
// ==========================================
cmd({
    pattern: "img",
    alias: ["image", "searchimg"],
    react: "🫧",
    desc: "Search and download images from various sources",
    category: "other",
    use: ".img <query>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    await searchImages(conn, mek, m, {
        reply,
        args,
        from,
        apiUrl: `https://jawad-tech.vercel.app/search/gimage?q=`
    });
});

// ==========================================
// 📌 2. Prefix wala handler (.img2, .image2, .searchimg2)
// ==========================================
cmd({
    pattern: "img2",
    alias: ["image2", "searchimg2"],
    react: "🫧",
    desc: "Search and download images from various sources",
    category: "other",
    use: ".img2 <query>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    await searchImages(conn, mek, m, {
        reply,
        args,
        from,
        apiUrl: `https://api.hanggts.xyz/search/gimage?q=`
    });
});

// ==========================================
// 📌 3. Bina prefix wala handler (saare triggers)
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

        // IMG #1 triggers (bina prefix)
        const img1Triggers = ["img", "image", "searchimg"];

        // IMG #2 triggers (bina prefix)
        const img2Triggers = ["img2", "image2", "searchimg2"];

        // Baaki text (query)
        const query = userText.slice(firstWord.length).trim();
        const args = query.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // IMG #1
        if (img1Triggers.includes(firstWord)) {
            await searchImages(conn, mek, { }, {
                reply: replyFn,
                args,
                from,
                apiUrl: `https://jawad-tech.vercel.app/search/gimage?q=`
            });
            return;
        }

        // IMG #2
        if (img2Triggers.includes(firstWord)) {
            await searchImages(conn, mek, { }, {
                reply: replyFn,
                args,
                from,
                apiUrl: `https://api.hanggts.xyz/search/gimage?q=`
            });
            return;
        }

    } catch (error) {
        console.error("Image Search No-Prefix Error:", error);
    }
});
