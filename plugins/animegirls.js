import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Anime Girls Image URLs Array
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

// ==========================================
// 🔧 Common function — anime girl image bhejne ke liye
// ==========================================
async function sendAnimeGirl(conn, mek, m, { from, reply, index, url }) {
    try {
        await conn.sendMessage(from, {
            image: { url: url },
            caption: `*Anime Girl ${index + 1}*\n\n*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`
        }, { quoted: mek });
    } catch (e) {
        console.error(`Error in animegirl${index + 1} command:`, e);
        await reply("Failed to send image. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.animegirl1 ... .animegirl22)
// ==========================================
animeUrls.forEach((url, index) => {
    cmd({
        pattern: `animegirl${index + 1}`,
        desc: `Get anime girl image ${index + 1}`,
        category: "anime",
        react: "👧",
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        await sendAnimeGirl(conn, mek, m, { from, reply, index, url });
    });
});

// ==========================================
// 📌 2. Bina prefix wala handler (animegirl1 ... animegirl22)
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

        // Check: kya ye animegirl{N} format hai?
        const match = userText.match(/^animegirl([0-9]{1,2})$/);
        if (!match) return;

        const num = parseInt(match[1], 10);

        // Range check: 1 se 22 tak
        if (num < 1 || num > animeUrls.length) return;

        const index = num - 1;
        const url = animeUrls[index];

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Image bhejo
        await sendAnimeGirl(conn, mek, { }, {
            from,
            reply: replyFn,
            index,
            url
        });

    } catch (error) {
        console.error("AnimeGirl No-Prefix Error:", error);
    }
});
