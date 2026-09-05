import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Anime / Couple Girls Image URLs Array
const animeUrls = [
    'https://files.catbox.moe/tj569j.jpg', 'https://files.catbox.moe/6bx7ft.jpg',
    'https://files.catbox.moe/bno8uq.jpg', 'https://files.catbox.moe/a01s0y.jpg',
    'https://files.catbox.moe/s90my8.jpg', 'https://files.catbox.moe/na5kw3.jpg',
    'https://files.catbox.moe/uz832x.jpg', 'https://files.catbox.moe/5u6w70.jpg',
    'https://files.catbox.moe/hfkder.jpg', 'https://files.catbox.moe/rnbwmw.jpg',
    'https://files.catbox.moe/hyajf0.jpg', 'https://files.catbox.moe/90w1d8.jpg',
    'https://files.catbox.moe/347zfk.jpg', 'https://files.catbox.moe/122s6g.jpg',
    'https://files.catbox.moe/61nmlh.jpg', 'https://files.catbox.moe/odolyo.jpg',
    'https://files.catbox.moe/2k0n9o.jpg', 'https://files.catbox.moe/vfko4p.jpg',
    'https://files.catbox.moe/hux1r5.jpg', 'https://files.catbox.moe/drkrz8.jpg',
    'https://files.catbox.moe/zo5pfe.jpg', 'https://files.catbox.moe/5kyfwb.jpg'
];

// Single command for random image selection
cmd({
    pattern: "couplepp",
    alias: ["coupledp", "animegirl"],
    desc: "Get a random anime/couple DP image",
    category: "anime",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Pick a random image from the array
        const randomUrl = animeUrls[Math.floor(Math.random() * animeUrls.length)];

        await conn.sendMessage(from, { 
            image: { url: randomUrl }, 
            caption: `*Random Couple DP*\n\n*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*` 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in couplepp command:", e);
        await reply("Failed to send image. Please try again.");
    }
});
