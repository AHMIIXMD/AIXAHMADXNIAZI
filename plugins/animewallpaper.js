import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Anime Wallpaper Image URLs Array
const wallpaperUrls = [
    'https://files.catbox.moe/zhm68m.jpg', 'https://files.catbox.moe/ko2vd0.jpg',
    'https://files.catbox.moe/tk2rc6.jpg', 'https://files.catbox.moe/c0o08z.jpg',
    'https://files.catbox.moe/zifzkw.jpg', 'https://files.catbox.moe/bp2rr1.jpg',
    'https://files.catbox.moe/3m3ryl.jpg', 'https://files.catbox.moe/6bv64a.jpg',
    'https://files.catbox.moe/y04yhb.jpg', 'https://files.catbox.moe/9cnsre.jpg',
    'https://files.catbox.moe/b8cnop.jpg', 'https://files.catbox.moe/ox54m4.jpg',
    'https://files.catbox.moe/l8rxsj.jpg', 'https://files.catbox.moe/qn0qe2.jpg',
    'https://files.catbox.moe/cywfh9.jpg', 'https://files.catbox.moe/bqdzaq.jpg',
    'https://files.catbox.moe/6utb71.jpg', 'https://files.catbox.moe/g6vebg.jpg',
    'https://files.catbox.moe/acxpyc.jpg', 'https://files.catbox.moe/b4edqi.jpg'
];

// Single command to pick a random wallpaper
cmd({
    pattern: "animewallpaper",
    alias: ["aw", "animewall", "wallpaper"],
    desc: "Get a random anime wallpaper image",
    category: "anime",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Array me se random wallpaper URL pick karne ke liye
        const randomUrl = wallpaperUrls[Math.floor(Math.random() * wallpaperUrls.length)];

        await conn.sendMessage(from, { 
            image: { url: randomUrl }, 
            caption: `*Random Anime Wallpaper*\n\n*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*` 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in animewallpaper command:", e);
        await reply("Failed to send wallpaper. Please try again.");
    }
});
