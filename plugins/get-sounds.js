import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Sound URLs object
const soundUrls = {
    url1: 'https://files.catbox.moe/pw4yuu.mp3',
    url2: 'https://files.catbox.moe/tuueyw.mp3',
    url3: 'https://files.catbox.moe/q56rza.mp3',
    url4: 'https://files.catbox.moe/ldrebe.mp3',
    url5: 'https://files.catbox.moe/cpjqjd.mp3',
    url6: 'https://files.catbox.moe/v5c4fd.mp3',
    url7: 'https://files.catbox.moe/naub62.mp3',
    url8: 'https://files.catbox.moe/ez7wvh.mp3',
    url9: 'https://files.catbox.moe/3ruryr.mp3',
    url10: 'https://files.catbox.moe/vxfry5.mp3',
    url11: 'https://files.catbox.moe/hk2fjw.mp3',
    url12: 'https://files.catbox.moe/pvymqf.mp3',
    url13: 'https://files.catbox.moe/md2jm5.mp3',
    url14: 'https://files.catbox.moe/ypx92a.mp3',
    url15: 'https://files.catbox.moe/7tv2do.mp3',
    url16: 'https://files.catbox.moe/sr8k3y.mp3'
};

// Sound Command 1
cmd({
    pattern: "sound",
    desc: "Play sound effect 1",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url1 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 2
cmd({
    pattern: "sound2",
    desc: "Play sound effect 2",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url2 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound2 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 3
cmd({
    pattern: "sound3",
    desc: "Play sound effect 3",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url3 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound3 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 4
cmd({
    pattern: "sound4",
    desc: "Play sound effect 4",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url4 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound4 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 5
cmd({
    pattern: "sound5",
    desc: "Play sound effect 5",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url5 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound5 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 6
cmd({
    pattern: "sound6",
    desc: "Play sound effect 6",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url6 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound6 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 7
cmd({
    pattern: "sound7",
    desc: "Play sound effect 7",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url7 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound7 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 8
cmd({
    pattern: "sound8",
    desc: "Play sound effect 8",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url8 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound8 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 9
cmd({
    pattern: "sound9",
    desc: "Play sound effect 9",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url9 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound9 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 10
cmd({
    pattern: "sound10",
    desc: "Play sound effect 10",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url10 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound10 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 11
cmd({
    pattern: "sound11",
    desc: "Play sound effect 11",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url11 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound11 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 12
cmd({
    pattern: "sound12",
    desc: "Play sound effect 12",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url12 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound12 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 13
cmd({
    pattern: "sound13",
    desc: "Play sound effect 13",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url13 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound13 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 14
cmd({
    pattern: "sound14",
    desc: "Play sound effect 14",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url14 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound14 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 15
cmd({
    pattern: "sound15",
    desc: "Play sound effect 15",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url15 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound15 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});

// Sound Command 16
cmd({
    pattern: "sound16",
    desc: "Play sound effect 16",
    category: "sound",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: soundUrls.url16 }, 
            mimetype: 'audio/mpeg',
            ptt: false 
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in sound16 command:", e);
        await reply("Failed to play sound. Please try again.");
    }
});
