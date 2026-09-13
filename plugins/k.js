import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Fuck Command with Single Image
cmd({
    pattern: "fk",            // Bagair dot ke kaam karega
    alias: ["fk"],         // .fuck se bhi chalega
    desc: "Send a fuck reaction image",
    category: "fun",
    react: "🥵",
    filename: __filename,
    use: "🖕"                // Prefix ke saath bhi chalega
},
async (conn, mek, m, { from, reply }) => {
    try {
        // New Image URL
        const imageUrl = 'https://files.catbox.moe/z0m2qt.jpg';

        // Sending the image with caption
        await conn.sendMessage(from, { 
            image: { url: imageUrl }, 
            caption: "*_FUCK YOU BABY 🍼🥵_*" 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in fuck command:", e);
        await reply("Oops, something went wrong!");
    }
});
