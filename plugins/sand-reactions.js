import { cmd } from '../command.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import crypto from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { fileURLToPath } from 'url';

// ========== FIX: Get __filename in ES module ==========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegPath.path);

// ========== CONFIG ==========
const USER_AGENT = '𝘼𝙃𝙈𝘼𝘿-best.js / 6.6.0';

// ========== FETCH GIF FROM NEKOS.BEST ==========
async function fetchGif(url) {
    try {
        const response = await axios.get(url, { 
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': USER_AGENT
            },
            timeout: 15000
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching GIF:", error);
        throw new Error("Could not fetch GIF.");
    }
}

// ========== CONVERT GIF TO VIDEO ==========
async function gifToVideo(gifBuffer) {
    const filename = crypto.randomBytes(6).toString('hex');
    const gifPath = path.join(tmpdir(), `${filename}.gif`);
    const mp4Path = path.join(tmpdir(), `${filename}.mp4`);

    fs.writeFileSync(gifPath, gifBuffer);

    await new Promise((resolve, reject) => {
        ffmpeg(gifPath)
            .outputOptions([
                "-movflags faststart",
                "-pix_fmt yuv420p",
                "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
            ])
            .on("error", (err) => {
                console.error("❌ ffmpeg conversion error:", err);
                reject(new Error("Could not process GIF to video."));
            })
            .on("end", resolve)
            .save(mp4Path);
    });

    const videoBuffer = fs.readFileSync(mp4Path);
    fs.unlinkSync(gifPath);
    fs.unlinkSync(mp4Path);

    return videoBuffer;
}

// ========== GET GIF URL FROM NEKOS.BEST ==========
async function getNekosGif(action) {
    const apiUrl = `https://nekos.best/api/v2/${action}`;
    const response = await axios.get(apiUrl, {
        headers: {
            'User-Agent': USER_AGENT
        }
    });
    return response.data.results[0].url;
}

// ==================== LURK COMMAND ====================
cmd({
    pattern: "lurk",
    desc: "Send a lurk reaction GIF.",
    category: "fun",
    react: "👀",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is lurking @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is lurking everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("lurk");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .lurk command:", error);
        reply(`❌ *Error in .lurk command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SHOOT COMMAND ====================
cmd({
    pattern: "shoot",
    desc: "Send a shoot reaction GIF.",
    category: "fun",
    react: "🔫",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} shot @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} shot everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("shoot");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .shoot command:", error);
        reply(`❌ *Error in .shoot command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SLEEP COMMAND ====================
cmd({
    pattern: "sleep",
    desc: "Send a sleep reaction GIF.",
    category: "fun",
    react: "😴",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is sleeping with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is sleeping!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("sleep");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .sleep command:", error);
        reply(`❌ *Error in .sleep command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== CLAP COMMAND ====================
cmd({
    pattern: "clap",
    desc: "Send a clap reaction GIF.",
    category: "fun",
    react: "👏",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} clapped for @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} clapped for everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("clap");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .clap command:", error);
        reply(`❌ *Error in .clap command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SHRUG COMMAND ====================
cmd({
    pattern: "shrug",
    desc: "Send a shrug reaction GIF.",
    category: "fun",
    react: "🤷",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} shrugged at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} shrugged at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("shrug");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .shrug command:", error);
        reply(`❌ *Error in .shrug command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== STARE COMMAND ====================
cmd({
    pattern: "stare",
    desc: "Send a stare reaction GIF.",
    category: "fun",
    react: "👀",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is staring at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is staring at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("stare");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .stare command:", error);
        reply(`❌ *Error in .stare command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== WAVE COMMAND ====================
cmd({
    pattern: "wave",
    desc: "Send a wave reaction GIF.",
    category: "fun",
    react: "👋",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} waved at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is waving at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("wave");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .wave command:", error);
        reply(`❌ *Error in .wave command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== POKE COMMAND ====================
cmd({
    pattern: "poke",
    desc: "Send a poke reaction GIF.",
    category: "fun",
    react: "👉",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} poked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} poked everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("poke");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .poke command:", error);
        reply(`❌ *Error in .poke command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== CONFUSED COMMAND ====================
cmd({
    pattern: "confused",
    desc: "Send a confused reaction GIF.",
    category: "fun",
    react: "😕",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is confused by @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is confused!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("confused");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .confused command:", error);
        reply(`❌ *Error in .confused command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SMILE COMMAND ====================
cmd({
    pattern: "smile",
    desc: "Send a smile reaction GIF.",
    category: "fun",
    react: "😁",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} smiled at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is smiling at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("smile");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .smile command:", error);
        reply(`❌ *Error in .smile command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== PECK COMMAND ====================
cmd({
    pattern: "peck",
    desc: "Send a peck reaction GIF.",
    category: "fun",
    react: "🐦",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} pecked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} pecked everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("peck");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .peck command:", error);
        reply(`❌ *Error in .peck command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== WINK COMMAND ====================
cmd({
    pattern: "wink",
    desc: "Send a wink reaction GIF.",
    category: "fun",
    react: "😉",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} winked at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is winking at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("wink");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .wink command:", error);
        reply(`❌ *Error in .wink command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SIP COMMAND ====================
cmd({
    pattern: "sip",
    desc: "Send a sip reaction GIF.",
    category: "fun",
    react: "☕",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is sipping with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is sipping!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("sip");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .sip command:", error);
        reply(`❌ *Error in .sip command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BLUSH COMMAND ====================
cmd({
    pattern: "blush",
    desc: "Send a blush reaction GIF.",
    category: "fun",
    react: "😊",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is blushing at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is blushing!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("blush");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .blush command:", error);
        reply(`❌ *Error in .blush command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SMUG COMMAND ====================
cmd({
    pattern: "smug",
    desc: "Send a smug reaction GIF.",
    category: "fun",
    react: "😏",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is smug at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is feeling smug!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("smug");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .smug command:", error);
        reply(`❌ *Error in .smug command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== TICKLE COMMAND ====================
cmd({
    pattern: "tickle",
    desc: "Send a tickle reaction GIF.",
    category: "fun",
    react: "🤣",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} tickled @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} tickled everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("tickle");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .tickle command:", error);
        reply(`❌ *Error in .tickle command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== YEET COMMAND ====================
cmd({
    pattern: "yeet",
    desc: "Send a yeet reaction GIF.",
    category: "fun",
    react: "💨",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} yeeted @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is yeeting everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("yeet");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .yeet command:", error);
        reply(`❌ *Error in .yeet command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== THINK COMMAND ====================
cmd({
    pattern: "think",
    desc: "Send a think reaction GIF.",
    category: "fun",
    react: "🤔",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is thinking about @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is thinking!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("think");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .think command:", error);
        reply(`❌ *Error in .think command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HIGHFIVE COMMAND ====================
cmd({
    pattern: "highfive",
    desc: "Send a high-five reaction GIF.",
    category: "fun",
    react: "✋",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} gave a high-five to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is high-fiving everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("highfive");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .highfive command:", error);
        reply(`❌ *Error in .highfive command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== FEED COMMAND ====================
cmd({
    pattern: "feed",
    desc: "Send a feed reaction GIF.",
    category: "fun",
    react: "🍕",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is feeding @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is feeding everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("feed");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .feed command:", error);
        reply(`❌ *Error in .feed command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== WAG COMMAND ====================
cmd({
    pattern: "wag",
    desc: "Send a wag reaction GIF.",
    category: "fun",
    react: "🐕",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} wagged at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} wagged at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("wag");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .wag command:", error);
        reply(`❌ *Error in .wag command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BITE COMMAND ====================
cmd({
    pattern: "bite",
    desc: "Send a bite reaction GIF.",
    category: "fun",
    react: "🦷",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} bit @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is biting everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("bite");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .bite command:", error);
        reply(`❌ *Error in .bite command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== TEEHEE COMMAND ====================
cmd({
    pattern: "teehee",
    desc: "Send a teehee reaction GIF.",
    category: "fun",
    react: "😜",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} teehee'd at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} teehee'd at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("teehee");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .teehee command:", error);
        reply(`❌ *Error in .teehee command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SHOCKED COMMAND ====================
cmd({
    pattern: "shocked",
    desc: "Send a shocked reaction GIF.",
    category: "fun",
    react: "😮",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is shocked by @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is shocked!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("shocked");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .shocked command:", error);
        reply(`❌ *Error in .shocked command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BLEH COMMAND ====================
cmd({
    pattern: "bleh",
    desc: "Send a bleh reaction GIF.",
    category: "fun",
    react: "😝",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} bleh'd at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} bleh'd at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("bleh");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .bleh command:", error);
        reply(`❌ *Error in .bleh command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BORED COMMAND ====================
cmd({
    pattern: "bored",
    desc: "Send a bored reaction GIF.",
    category: "fun",
    react: "😑",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is bored by @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is bored!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("bored");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .bored command:", error);
        reply(`❌ *Error in .bored command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NOM COMMAND ====================
cmd({
    pattern: "nom",
    desc: "Send a nom reaction GIF.",
    category: "fun",
    react: "🍽️",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is nomming @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is nomming everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("nom");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nom command:", error);
        reply(`❌ *Error in .nom command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NYA COMMAND ====================
cmd({
    pattern: "nya",
    desc: "Send a nya reaction GIF.",
    category: "fun",
    react: "🐱",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} nya'd at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} nya'd at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("nya");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nya command:", error);
        reply(`❌ *Error in .nya command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== YAWN COMMAND ====================
cmd({
    pattern: "yawn",
    desc: "Send a yawn reaction GIF.",
    category: "fun",
    react: "🥱",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} yawned at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} yawned at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("yawn");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .yawn command:", error);
        reply(`❌ *Error in .yawn command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== FACEPALM COMMAND ====================
cmd({
    pattern: "facepalm",
    desc: "Send a facepalm reaction GIF.",
    category: "fun",
    react: "🤦",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} facepalmed at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} facepalmed at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("facepalm");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .facepalm command:", error);
        reply(`❌ *Error in .facepalm command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== CUDDLE COMMAND ====================
cmd({
    pattern: "cuddle",
    desc: "Send a cuddle reaction GIF.",
    category: "fun",
    react: "🤗",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} cuddled @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is cuddling everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("cuddle");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .cuddle command:", error);
        reply(`❌ *Error in .cuddle command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== KICK COMMAND ====================
cmd({
    pattern: "kick",
    desc: "Send a kick reaction GIF.",
    category: "fun",
    react: "🦶",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} kicked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} kicked everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("kick");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .kick command:", error);
        reply(`❌ *Error in .kick command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HAPPY COMMAND ====================
cmd({
    pattern: "happy",
    desc: "Send a happy reaction GIF.",
    category: "fun",
    react: "😄",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is happy with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is happy!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("happy");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .happy command:", error);
        reply(`❌ *Error in .happy command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== CARRY COMMAND ====================
cmd({
    pattern: "carry",
    desc: "Send a carry reaction GIF.",
    category: "fun",
    react: "🏃",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} carried @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} carried everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("carry");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .carry command:", error);
        reply(`❌ *Error in .carry command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HUG COMMAND ====================
cmd({
    pattern: "hug",
    desc: "Send a hug reaction GIF.",
    category: "fun",
    react: "🤗",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} hugged @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is hugging everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("hug");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .hug command:", error);
        reply(`❌ *Error in .hug command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== KABEDON COMMAND ====================
cmd({
    pattern: "kabedon",
    desc: "Send a kabedon reaction GIF.",
    category: "fun",
    react: "🧱",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} kabedon'd @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} kabedon'd everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("kabedon");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .kabedon command:", error);
        reply(`❌ *Error in .kabedon command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BAKA COMMAND ====================
cmd({
    pattern: "baka",
    desc: "Send a baka reaction GIF.",
    category: "fun",
    react: "😤",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} called @${mentionedUser.split("@")[0]} baka`
            : isGroup
            ? `${sender} called everyone baka!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("baka");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .baka command:", error);
        reply(`❌ *Error in .baka command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BONK COMMAND ====================
cmd({
    pattern: "bonk",
    desc: "Send a bonk reaction GIF.",
    category: "fun",
    react: "🔨",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} bonked @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} bonked everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("bonk");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .bonk command:", error);
        reply(`❌ *Error in .bonk command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== PAT COMMAND ====================
cmd({
    pattern: "pat",
    desc: "Send a pat reaction GIF.",
    category: "fun",
    react: "🫂",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} patted @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is patting everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("pat");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .pat command:", error);
        reply(`❌ *Error in .pat command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== ANGRY COMMAND ====================
cmd({
    pattern: "angry",
    desc: "Send an angry reaction GIF.",
    category: "fun",
    react: "😡",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is angry at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is angry!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("angry");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .angry command:", error);
        reply(`❌ *Error in .angry command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SPIN COMMAND ====================
cmd({
    pattern: "spin",
    desc: "Send a spin reaction GIF.",
    category: "fun",
    react: "🔄",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} spun @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} spun everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("spin");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .spin command:", error);
        reply(`❌ *Error in .spin command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SHAKE COMMAND ====================
cmd({
    pattern: "shake",
    desc: "Send a shake reaction GIF.",
    category: "fun",
    react: "🤝",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} shook @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} shook everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("shake");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .shake command:", error);
        reply(`❌ *Error in .shake command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== RUN COMMAND ====================
cmd({
    pattern: "run",
    desc: "Send a run reaction GIF.",
    category: "fun",
    react: "🏃",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} ran from @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} ran from everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("run");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .run command:", error);
        reply(`❌ *Error in .run command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NOD COMMAND ====================
cmd({
    pattern: "nod",
    desc: "Send a nod reaction GIF.",
    category: "fun",
    react: "🙂",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} nodded at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} nodded at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("nod");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nod command:", error);
        reply(`❌ *Error in .nod command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== NOPE COMMAND ====================
cmd({
    pattern: "nope",
    desc: "Send a nope reaction GIF.",
    category: "fun",
    react: "🙅",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} said nope to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} said nope to everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("nope");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .nope command:", error);
        reply(`❌ *Error in .nope command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== KISS COMMAND ====================
cmd({
    pattern: "kiss",
    desc: "Send a kiss reaction GIF.",
    category: "fun",
    react: "💋",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} kissed @${mentionedUser.split("@")[0]} 🥰`
            : isGroup
            ? `${sender} kissed everyone! 💋`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("kiss");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .kiss command:", error);
        reply(`❌ *Error in .kiss command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== DANCE COMMAND ====================
cmd({
    pattern: "dance",
    desc: "Send a dance reaction GIF.",
    category: "fun",
    react: "💃",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} danced with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is dancing with everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("dance");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .dance command:", error);
        reply(`❌ *Error in .dance command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== PUNCH COMMAND ====================
cmd({
    pattern: "punch",
    desc: "Send a punch reaction GIF.",
    category: "fun",
    react: "👊",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} punched @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} punched everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("punch");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .punch command:", error);
        reply(`❌ *Error in .punch command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HANDSHAKE COMMAND ====================
cmd({
    pattern: "handshake",
    desc: "Send a handshake reaction GIF.",
    category: "fun",
    react: "🤝",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} shook hands with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} shook hands with everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("handshake");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .handshake command:", error);
        reply(`❌ *Error in .handshake command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SLAP COMMAND ====================
cmd({
    pattern: "slap",
    desc: "Send a slap reaction GIF.",
    category: "fun",
    react: "✊",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} slapped @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} slapped everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("slap");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .slap command:", error);
        reply(`❌ *Error in .slap command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== CRY COMMAND ====================
cmd({
    pattern: "cry",
    desc: "Send a crying reaction GIF.",
    category: "fun",
    react: "😢",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is crying over @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is crying!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("cry");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .cry command:", error);
        reply(`❌ *Error in .cry command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== LAPPILLOW COMMAND ====================
cmd({
    pattern: "lappillow",
    desc: "Send a lappillow reaction GIF.",
    category: "fun",
    react: "🛏️",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is using @${mentionedUser.split("@")[0]} as a lap pillow`
            : isGroup
            ? `${sender} is using everyone as a lap pillow!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("lappillow");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .lappillow command:", error);
        reply(`❌ *Error in .lappillow command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== POUT COMMAND ====================
cmd({
    pattern: "pout",
    desc: "Send a pout reaction GIF.",
    category: "fun",
    react: "😤",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} pouted at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} pouted at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("pout");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .pout command:", error);
        reply(`❌ *Error in .pout command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== BLOWKISS COMMAND ====================
cmd({
    pattern: "blowkiss",
    desc: "Send a blowkiss reaction GIF.",
    category: "fun",
    react: "😘",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} blew a kiss to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} blew kisses to everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("blowkiss");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .blowkiss command:", error);
        reply(`❌ *Error in .blowkiss command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== HANDHOLD COMMAND ====================
cmd({
    pattern: "handhold",
    desc: "Send a hand-holding reaction GIF.",
    category: "fun",
    react: "🤝",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} is holding hands with @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} wants to hold hands with everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("handhold");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .handhold command:", error);
        reply(`❌ *Error in .handhold command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== SALUTE COMMAND ====================
cmd({
    pattern: "salute",
    desc: "Send a salute reaction GIF.",
    category: "fun",
    react: "🫡",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} saluted @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} saluted everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("salute");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .salute command:", error);
        reply(`❌ *Error in .salute command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== THUMBSUP COMMAND ====================
cmd({
    pattern: "thumbsup",
    desc: "Send a thumbsup reaction GIF.",
    category: "fun",
    react: "👍",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} gave a thumbs up to @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} gave a thumbs up to everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("thumbsup");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .thumbsup command:", error);
        reply(`❌ *Error in .thumbsup command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== LAUGH COMMAND ====================
cmd({
    pattern: "laugh",
    desc: "Send a laugh reaction GIF.",
    category: "fun",
    react: "😂",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} laughed at @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} is laughing at everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("laugh");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .laugh command:", error);
        reply(`❌ *Error in .laugh command:*\n\`\`\`${error.message}\`\`\``);
    }
});

// ==================== TABLEFLIP COMMAND ====================
cmd({
    pattern: "tableflip",
    desc: "Send a tableflip reaction GIF.",
    category: "fun",
    react: "(╯°□°)╯︵┻━┻",
    filename: __filename,
    use: "@tag (optional)",
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        let sender = `@${mek.sender.split("@")[0]}`;
        let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
        let isGroup = m.isGroup;

        let message = mentionedUser
            ? `${sender} flipped a table on @${mentionedUser.split("@")[0]}`
            : isGroup
            ? `${sender} flipped a table on everyone!`
            : `> © Powered By 𝘼𝙃𝙈𝘼𝘿 🖤`;

        let gifUrl = await getNekosGif("tableflip");
        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);
        
        await conn.sendMessage(
            mek.chat,
            { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
            { quoted: mek }
        );
    } catch (error) {
        console.error("❌ Error in .tableflip command:", error);
        reply(`❌ *Error in .tableflip command:*\n\`\`\`${error.message}\`\`\``);
    }
});
