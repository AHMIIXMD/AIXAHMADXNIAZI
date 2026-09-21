// AHMAD Tech
import { cmd } from "../command.js";
import fetch from 'node-fetch';
import * as converter from '../lib/converter.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — TikTok audio extract
// ==========================================
async function extractTikTokAudio(conn, mek, m, { from, reply, args, q }) {
    try {
        const url = q || m.quoted?.text;
        if (!url || !url.includes("tiktok.com")) {
            return reply("❌ Please provide/reply to a TikTok link");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://api.deline.web.id/downloader/tiktok?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.status || !data.result) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("Failed to fetch TikTok video.");
        }

        const videoUrl = data.result.download;

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        const videoResponse = await fetch(videoUrl);
        const videoBuffer = await videoResponse.buffer();

        await conn.sendMessage(from, { react: { text: '🔧', key: mek.key } });
        const audioBuffer = await converter.toAudio(videoBuffer, 'mp4');

        await conn.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error('TTMP3 Error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply("❌ Audio extraction failed. Error: " + error.message);
    }
}

// ==========================================
// 🔧 Common function — Instagram audio extract
// ==========================================
async function extractInstagramAudio(conn, mek, m, { from, reply, args, q }) {
    try {
        const url = q || m.quoted?.text;
        if (!url || !url.includes("instagram.com")) {
            return reply("❌ Please provide/reply to an Instagram link");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data?.status || !data.data?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("Failed to fetch media.");
        }

        const videoItem = data.data.find(item => item.type === 'video');
        if (!videoItem) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("No video found.");
        }

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        const videoResponse = await fetch(videoItem.url);
        const videoBuffer = await videoResponse.buffer();

        await conn.sendMessage(from, { react: { text: '🔧', key: mek.key } });
        const audioBuffer = await converter.toAudio(videoBuffer, 'mp4');

        await conn.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error('IGMP3 Error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply("❌ Audio extraction failed. Error: " + error.message);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.ttmp3, .tiktokmp3, .tiktokaudio, .ttaudio)
// ==========================================
cmd({
    pattern: "ttmp3",
    alias: ["tiktokmp3", "tiktokaudio", "ttaudio"],
    react: "🎵",
    desc: "Extract audio from TikTok video",
    category: "download",
    use: ".ttmp3 <TikTok URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
    await extractTikTokAudio(conn, mek, m, { from, reply, args, q });
});

// ==========================================
// 📌 2. Prefix wala handler (.igmp3, .instamp3, .instaaudio, .igaudio)
// ==========================================
cmd({
    pattern: "igmp3",
    alias: ["instamp3", "instaaudio", "igaudio"],
    react: "🎵",
    desc: "Extract audio from Instagram video/reel",
    category: "download",
    use: ".igmp3 <Instagram URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
    await extractInstagramAudio(conn, mek, m, { from, reply, args, q });
});

// ==========================================
// 📌 3. Bina prefix wala handler (saare triggers)
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
    prefix,
    quoted
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // TikTok MP3 triggers
        const ttTriggers = ["ttmp3", "tiktokmp3", "tiktokaudio", "ttaudio"];

        // Instagram MP3 triggers
        const igTriggers = ["igmp3", "instamp3", "instaaudio", "igaudio"];

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // TikTok MP3
        if (ttTriggers.includes(firstWord)) {
            await extractTikTokAudio(conn, mek, {
                quoted: quoted
            }, {
                from,
                reply: replyFn,
                args: query.split(/\s+/).filter(a => a),
                q: query
            });
            return;
        }

        // Instagram MP3
        if (igTriggers.includes(firstWord)) {
            await extractInstagramAudio(conn, mek, {
                quoted: quoted
            }, {
                from,
                reply: replyFn,
                args: query.split(/\s+/).filter(a => a),
                q: query
            });
            return;
        }

    } catch (error) {
        console.error("MP3 No-Prefix Error:", error);
    }
});
