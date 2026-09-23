// AHMAD TechXD

import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "img",
    alias: ["image", "searchimg"],
    react: "🫧",
    desc: "Search and download images from various sources",
    category: "other",
    use: ".img <query>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");

        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img AHMAD Tech");
        }

        await reply(`🔍 Searching for "${query}"...`);

        // API Endpoint
        const url = `https://jawad-tech.vercel.app/search/gimage?q=${encodeURIComponent(query)}`;

        const response = await axios.get(url);

        // Validate response
        if (!response.data || !response.data.status || !response.data.result || !response.data.result.length) {
            return reply("❌ No images found. Try different keywords");
        }

        const results = response.data.result;

        // Random 5 images
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const image of selectedImages) {

            if (!image.url) continue;

            await conn.sendMessage(
                from,
                {
                    image: { url: image.url },
                    caption: `*📷 Result for:* ${query}\n> *© Powered by AHMAD-MD*`
                },
                { quoted: mek }
            );

            // Delay
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error("Image Search Error:", error);

        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});

cmd({
    pattern: "img2",
    alias: ["image2", "searchimg2"],
    react: "🫧",
    desc: "Search and download images from various sources",
    category: "other",
    use: ".img2 <query>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {

    try {

        const query = args.join(" ");

        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img2 AHMAD HASSAN");
        }

        await reply(`🔍 Searching for "${query}"...`);

        // API Endpoint
        const url = `https://api.hanggts.xyz/search/gimage?q=${encodeURIComponent(query)}`;

        const response = await axios.get(url);

        // Validate response
        if (!response.data || !response.data.status || !response.data.result || !response.data.result.length) {
            return reply("❌ No images found. Try different keywords");
        }

        const results = response.data.result;

        // Random 5 images
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const image of selectedImages) {

            if (!image.url) continue;

            await conn.sendMessage(
                from,
                {
                    image: { url: image.url },
                    caption: `*📷 Result for:* ${query}\n> *© Powered by AHMAD-MD*`
                },
                { quoted: mek }
            );

            // Delay
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {

        console.error("Image Search Error:", error);

        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});
