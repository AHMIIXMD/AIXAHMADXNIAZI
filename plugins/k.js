import { cmd } from '../command.js';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "fk",            
    alias: ["fuck"],         
    desc: "Send a reaction image",
    category: "fun",
    react: "🥵",
    filename: __filename,
    use: "fk"                
},
async (conn, mek, m, { from, reply }) => {
    try {
        const imageUrl = 'https://files.catbox.moe/z0m2qt.jpg';

        // Image ko buffer me download kar ke bhejne ke liye
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'utf-8');

        await conn.sendMessage(from, { 
            image: imageBuffer, 
            caption: "*_FUCK YOU BABY 🍼🥵_*" 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in fk command:", e);
        await reply("Oops, something went wrong!");
    }
});
