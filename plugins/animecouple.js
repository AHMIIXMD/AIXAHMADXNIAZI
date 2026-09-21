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

// ==========================================
// 🔧 Common function — anime couple image bhejne ke liye
// ==========================================
async function sendAnimeCouple(conn, mek, m, { from, reply, index, url }) {
    try {
        await conn.sendMessage(from, {
            image: { url: url },
            caption: `*Anime Couple ${index + 1}*\n\n*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`
        }, { quoted: mek });
    } catch (e) {
        console.error(`Error in animecouple${index + 1} command:`, e);
        await reply("Failed to send image. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.animecouple1 ... .animecouple25)
// ==========================================
coupleUrls.forEach((url, index) => {
    cmd({
        pattern: `animecouple${index + 1}`,
        desc: `Get anime couple image ${index + 1}`,
        category: "anime",
        react: "👩‍❤️‍👨",
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        await sendAnimeCouple(conn, mek, m, { from, reply, index, url });
    });
});

// ==========================================
// 📌 2. Bina prefix wala handler (animecouple1 ... animecouple25)
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

        // Check: kya ye animecouple{N} format hai?
        // Regex: animecouple1 se animecouple25 tak
        const match = userText.match(/^animecouple([0-9]{1,2})$/);
        if (!match) return;

        const num = parseInt(match[1], 10);

        // Range check: 1 se 25 tak
        if (num < 1 || num > coupleUrls.length) return;

        const index = num - 1;
        const url = coupleUrls[index];

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Image bhejo
        await sendAnimeCouple(conn, mek, { }, {
            from,
            reply: replyFn,
            index,
            url
        });

    } catch (error) {
        console.error("AnimeCouple No-Prefix Error:", error);
    }
});
