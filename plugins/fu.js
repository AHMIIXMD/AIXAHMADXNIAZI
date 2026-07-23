import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Fuck Command with Random Images
cmd({
    pattern: "🖕",            // Bagair dot ke kaam karega
    alias: [".🖕"],          // Dot ke saath bhi kaam karega
    desc: "Send a random fuck reaction image",
    category: "fun",
    react: "🥵",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Image URLs Array
        const imageUrls = [
            'https://files.catbox.moe/yvdjgo.jpg',
            'https://files.catbox.moe/e14pbn.jpg',
            'https://files.catbox.moe/ia9ion.jpg',
            'https://files.catbox.moe/6pe09u.jpg',
            'https://files.catbox.moe/gxpah0.jpg',
            'https://files.catbox.moe/fj5kyr.jpg',
            'https://files.catbox.moe/jr3q6o.jpg',
            'https://files.catbox.moe/wuc1uh.jpg',
            'https://files.catbox.moe/0a7c2a.jpg',
            'https://files.catbox.moe/ojbqal.jpg'
        ];

        // Picking a random image from the list
        const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

        // Sending the image with caption
        await conn.sendMessage(from, { 
            image: { url: randomImage }, 
            caption: "*_FUCK YOU BABY 🍼🥵_*" 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in fuck command:", e);
        await reply("Oops, something went wrong!");
    }
});
