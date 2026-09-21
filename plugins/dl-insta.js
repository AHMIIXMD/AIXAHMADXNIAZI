import axios from "axios";
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — IGDL #1
// ==========================================
async function downloadIG1(conn, mek, m, { from, reply, args, q }) {
    try {
        const url = q || m.quoted?.text;
        if (!url || !url.includes("instagram.com")) {
            return reply("❌ Please provide/reply to an Instagram link");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.data?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("Failed to fetch media. Invalid link or private content.");
        }

        for (const item of response.data.data) {
            await conn.sendMessage(from, {
                [item.type === 'video' ? 'video' : 'image']: { url: item.url },
                caption: `📶 *Instagram Downloader*\n\n` +
                    `- ❤‍🩹 *Quality*: HD\n\n` +
                    `> *© Powered by AHMAD TechX*`
            }, { quoted: mek });
        }

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error('IGDL Error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply("❌ Download failed. Try again later.");
    }
}

// ==========================================
// 🔧 Common function — IGDL #2 (API v5)
// ==========================================
async function downloadIG2(conn, mek, m, { from, reply, args }) {
    try {
        const igUrl = args[0];
        if (!igUrl || !igUrl.includes("instagram.com")) {
            return reply('❌ Please provide a valid Instagram video URL.\n\nExample:\n.igdl5 https://instagram.com/reel/...');
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(igUrl)}`;
        const response = await axios.get(apiUrl);

        const data = response.data;

        if (!data.status || !data.result || !Array.isArray(data.result)) {
            return reply('❌ Unable to fetch the video. Please check the URL and try again.');
        }

        const videoUrl = data.result[0];
        if (!videoUrl) return reply("❌ No video found in the response.");

        const metadata = data.metadata || {};
        const author = metadata.author || "Unknown";
        const caption = metadata.caption ? metadata.caption.slice(0, 300) + "..." : "No caption provided.";
        const likes = metadata.like || 0;
        const comments = metadata.comment || 0;

        await reply('Downloading Instagram video...Please wait.📥');

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: `📥 *Instagram Reel Downloader*\n👤 *Author:* ${author}\n💬 *Caption:* ${caption}\n❤️ *Likes:* ${likes} | 💭 *Comments:* ${comments}\n\n> Powered By AHMAD TechX 💜`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('IGDL5 Error:', error);
        reply('❌ Failed to download the Instagram video. Please try again later.');
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 🔧 Common function — IGDL #3 (posts, reels, stories)
// ==========================================
async function downloadIG3(conn, mek, m, { from, reply, args, q }) {
    try {
        const url = q || m.quoted?.text;
        if (!url || !url.includes("instagram.com")) {
            return reply("❌ Please provide/reply to a valid Instagram link");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://jawad-tech.vercel.app/igdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.result?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("❌ Failed to fetch media. Invalid link or private content.");
        }

        const mediaData = response.data.result;

        for (const item of mediaData) {
            const isVideo = item.contentType?.includes('video') || item.format === 'mp4';

            if (isVideo) {
                await conn.sendMessage(from, {
                    video: { url: item.url },
                    caption: `📱 *Instagram Downloader*\n\n` +
                        `📹 *Type*: Video\n` +
                        `💾 *Size*: ${(item.size / 1024 / 1024).toFixed(2)} MB\n` +
                        `🎞️ *Format*: ${item.format}\n\n` +
                        `> *© Powered by AHMAD TechXD*`
                }, { quoted: mek });
            } else {
                await conn.sendMessage(from, {
                    image: { url: item.url },
                    caption: `📱 *Instagram Downloader*\n\n` +
                        `🖼️ *Type*: Image\n` +
                        `💾 *Size*: ${(item.size / 1024).toFixed(2)} KB\n` +
                        `🎨 *Format*: ${item.format}\n\n` +
                        `> *© Powered by AHMAD TechXD*`
                }, { quoted: mek });
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error('IGDL Error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply("❌ Download failed. Please check the link and try again.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.igdl, .instagram, .insta, .ig)
// ==========================================
cmd({
    pattern: "igdl",
    alias: ["instagram", "insta", "ig"],
    react: "⬇️",
    desc: "Download Instagram videos/reels",
    category: "download",
    use: ".igdl <Instagram URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
    await downloadIG1(conn, mek, m, { from, reply, args, q });
});

// ==========================================
// 📌 2. Prefix wala handler (.igdl2, .instagram2, .ig2, .instadl2)
// ==========================================
cmd({
    pattern: "igdl2",
    alias: ["instagram2", "ig2", "instadl2"],
    react: '📥',
    desc: "Download videos from Instagram (API v5)",
    category: "download",
    use: ".igdl5 <Instagram video URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    await downloadIG2(conn, mek, m, { from, reply, args });
});

// ==========================================
// 📌 3. Prefix wala handler (.igdl3, .instagram3, .insta3, .ig3)
// ==========================================
cmd({
    pattern: "igdl3",
    alias: ["instagram3", "insta3", "ig3"],
    react: "⬇️",
    desc: "Download Instagram posts, reels, and stories",
    category: "download",
    use: ".igdl <Instagram URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
    await downloadIG3(conn, mek, m, { from, reply, args, q });
});

// ==========================================
// 📌 4. Bina prefix wala handler (saare IG triggers)
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
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Triggers
        const ig1Triggers = ["igdl", "instagram", "insta", "ig"];
        const ig2Triggers = ["igdl2", "instagram2", "ig2", "instadl2"];
        const ig3Triggers = ["igdl3", "instagram3", "insta3", "ig3"];

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // IG #1
        if (ig1Triggers.includes(firstWord)) {
            await downloadIG1(conn, mek, { quoted: null }, {
                from,
                reply: replyFn,
                args: query.split(/\s+/),
                q: query
            });
            return;
        }

        // IG #2
        if (ig2Triggers.includes(firstWord)) {
            await downloadIG2(conn, mek, { }, {
                from,
                reply: replyFn,
                args: query.split(/\s+/)
            });
            return;
        }

        // IG #3
        if (ig3Triggers.includes(firstWord)) {
            await downloadIG3(conn, mek, { quoted: null }, {
                from,
                reply: replyFn,
                args: query.split(/\s+/),
                q: query
            });
            return;
        }

    } catch (error) {
        console.error("IGDL No-Prefix Error:", error);
    }
});
