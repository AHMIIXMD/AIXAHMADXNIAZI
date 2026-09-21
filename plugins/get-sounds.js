import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Sound URLs Array
const soundUrls = [
    'https://files.catbox.moe/pw4yuu.mp3',  // 1
    'https://files.catbox.moe/tuueyw.mp3',  // 2
    'https://files.catbox.moe/q56rza.mp3',  // 3
    'https://files.catbox.moe/ldrebe.mp3',  // 4
    'https://files.catbox.moe/cpjqjd.mp3',  // 5
    'https://files.catbox.moe/v5c4fd.mp3',  // 6
    'https://files.catbox.moe/naub62.mp3',  // 7
    'https://files.catbox.moe/ez7wvh.mp3',  // 8
    'https://files.catbox.moe/3ruryr.mp3',  // 9
    'https://files.catbox.moe/vxfry5.mp3',  // 10
    'https://files.catbox.moe/hk2fjw.mp3',  // 11
    'https://files.catbox.moe/pvymqf.mp3',  // 12
    'https://files.catbox.moe/md2jm5.mp3',  // 13
    'https://files.catbox.moe/ypx92a.mp3',  // 14
    'https://files.catbox.moe/7tv2do.mp3',  // 15
    'https://files.catbox.moe/sr8k3y.mp3'   // 16
];

// ==========================================
// 🔧 Common function — sound play karne ke liye
// ==========================================
async function playSound(conn, mek, m, { from, reply, url }) {
    try {
        await conn.sendMessage(from, {
            audio: { url: url },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound command:", e);
        await reply("Failed to play sound. Please try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.sound1 se .sound16)
// ==========================================
soundUrls.forEach((url, index) => {
    const num = index + 1;
    cmd({
        pattern: num === 1 ? "sound" : `sound${num}`,   // .sound aur .sound2-.sound16
        desc: `Play sound effect ${num}`,
        category: "sound",
        react: "🎵",
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        await playSound(conn, mek, m, { from, reply, url });
    });
});

// ==========================================
// 📌 2. Bina prefix wala handler (sound, sound2, sound3... sound16)
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

        let soundNum = 0;

        // Case 1: "sound" → #1
        if (userText === "sound") {
            soundNum = 1;
        }
        // Case 2: "sound2", "sound3" ... "sound16"
        else {
            const match = userText.match(/^sound([0-9]{1,2})$/);
            if (match) {
                soundNum = parseInt(match[1], 10);
            }
        }

        // Agar koi match nahi mila
        if (!soundNum) return;

        // Range check: 1 se 16 tak
        if (soundNum < 1 || soundNum > soundUrls.length) return;

        const url = soundUrls[soundNum - 1];

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Sound play karo
        await playSound(conn, mek, { }, {
            from,
            reply: replyFn,
            url
        });

    } catch (error) {
        console.error("Sound No-Prefix Error:", error);
    }
});
