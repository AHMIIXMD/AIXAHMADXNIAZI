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

// ==========================================
// 🔧 Common function — anime wallpaper bhejne ke liye
// ==========================================
async function sendAnimeWallpaper(conn, mek, m, { from, reply, index, url }) {
    try {
        const wallNum = index + 1;
        await conn.sendMessage(from, {
            image: { url: url },
            caption: `*Anime Wallpaper ${wallNum}*\n\n*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`
        }, { quoted: mek });
    } catch (e) {
        console.error(`Error in animewallpaper${index + 1} command:`, e);
        await reply("Failed to send wallpaper. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler
// (.animewallpaper1 ... .animewallpaper20 aur .aw1 ... .aw20)
// ==========================================
wallpaperUrls.forEach((url, index) => {
    const wallNum = index + 1;
    cmd({
        pattern: `animewallpaper${wallNum}`,
        alias: [`aw${wallNum}`],
        desc: `Get anime wallpaper ${wallNum}`,
        category: "anime",
        react: "🖼️",
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        await sendAnimeWallpaper(conn, mek, m, { from, reply, index, url });
    });
});

// ==========================================
// 📌 2. Bina prefix wala handler
// (animewallpaper1 ... animewallpaper20 aur aw1 ... aw20)
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

        let num = null;

        // Check 1: animewallpaper{N}
        const matchFull = userText.match(/^animewallpaper([0-9]{1,2})$/);
        if (matchFull) {
            num = parseInt(matchFull[1], 10);
        }

        // Check 2: aw{N}
        const matchShort = userText.match(/^aw([0-9]{1,2})$/);
        if (!num && matchShort) {
            num = parseInt(matchShort[1], 10);
        }

        // Agar koi match nahi mila
        if (!num) return;

        // Range check: 1 se 20 tak
        if (num < 1 || num > wallpaperUrls.length) return;

        const index = num - 1;
        const url = wallpaperUrls[index];

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Wallpaper bhejo
        await sendAnimeWallpaper(conn, mek, { }, {
            from,
            reply: replyFn,
            index,
            url
        });

    } catch (error) {
        console.error("AnimeWallpaper No-Prefix Error:", error);
    }
});
