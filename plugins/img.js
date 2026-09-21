// AHMAD-MD 

import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from "url";

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
            return reply("🖼️ Please provide a search query\nExample: .img AHMAD");
        }

        await reply(`🔍 Searching for "${query}"...`);
        
        // Using the API endpoint
        const url = `https://jawad-tech.vercel.app/search/gimage?q=${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        
        // Validate response based on the provided JSON structure
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
            return reply("🖼️ Please provide a search query\nExample: .img2 AHMAD");
        }

        await reply(`🔍 Searching for "${query}"...`);
        
        // Using the provided API endpoint
        const url = `https://api.hanggts.xyz/search/gimage?q=${encodeURIComponent(query)}`;
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
});
