import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Anime Couple Image URLs Array
const coupleUrls = [
    'https://files.catbox.moe/levy53.jpg', 'https://files.catbox.moe/fsm1f5.jpg',
    'https://files.catbox.moe/dvbapn.jpg', 'https://files.catbox.moe/79e21j.jpg',
    'https://files.catbox.moe/vvcow5.jpg', 'https://files.catbox.moe/ljrtij.jpg',
    'https://files.catbox.moe/eotiwe.jpg', 'https://files.catbox.moe/ue5se5.jpg',
    'https://files.catbox.moe/mk2b93.jpg', 'https://files.catbox.moe/e9oa3g.jpg',
    'https://files.catbox.moe/73num9.jpg', 'https://files.catbox.moe/b6zgmb.jpg',
    'https://files.catbox.moe/12iupk.jpg', 'https://files.catbox.moe/c4sw5v.jpg',
    'https://files.catbox.moe/utrrdy.jpg', 'https://files.catbox.moe/6ep8l9.jpg',
    'https://files.catbox.moe/zrtj68.jpg', 'https://files.catbox.moe/ztopua.jpg',
    'https://files.catbox.moe/ja8kpv.jpg', 'https://files.catbox.moe/ko0s4j.jpg',
    'https://files.catbox.moe/3weuio.jpg', 'https://files.catbox.moe/eucfna.jpg',
    'https://files.catbox.moe/xxcbom.jpg', 'https://files.catbox.moe/6r5o2b.jpg',
    'https://files.catbox.moe/80nnf2.jpg'
];

// Single command to pick a random couple image
cmd({
    pattern: "animecouple",
    alias: ["couple", "couples"],
    desc: "Get a random anime couple image",
    category: "anime",
    react: "👩‍❤️‍👨",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Array me se random image URL select karne ke liye
        const randomUrl = coupleUrls[Math.floor(Math.random() * coupleUrls.length)];

        await conn.sendMessage(from, { 
            image: { url: randomUrl }, 
            caption: `*Random Anime Couple*\n\n*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*` 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in animecouple command:", e);
        await reply("Failed to send image. Please try again.");
    }
});
