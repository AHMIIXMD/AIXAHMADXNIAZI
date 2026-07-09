// AHMADTech
import { cmd } from "../command.js";
import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Helper function to upload to Catbox
async function uploadToCatbox(buffer, mimeType) {
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else extension = '.jpg';

    const tempFilePath = path.join(os.tmpdir(), `temp_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, buffer);

    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath);

    if (!imageUrl) throw "Failed to upload image to Catbox";
    return imageUrl;
}

// ==================== UPSCALE COMMANDS (1-16) ====================

// Upscale 1
cmd({
    pattern: "upscale1",
    alias: ["hd1"],
    desc: "Upscale image with resolution 1",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=1`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 1)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 2
cmd({
    pattern: "upscale2",
    alias: ["hd2"],
    desc: "Upscale image with resolution 2",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=2`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 2)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 3
cmd({
    pattern: "upscale3",
    alias: ["hd3"],
    desc: "Upscale image with resolution 3",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=3`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 3)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 4
cmd({
    pattern: "upscale4",
    alias: ["hd4"],
    desc: "Upscale image with resolution 4",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=4`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 4)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 5
cmd({
    pattern: "upscale5",
    alias: ["hd5"],
    desc: "Upscale image with resolution 5",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=5`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 5)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 6
cmd({
    pattern: "upscale6",
    alias: ["hd6"],
    desc: "Upscale image with resolution 6",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=6`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 6)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 7
cmd({
    pattern: "upscale7",
    alias: ["hd7"],
    desc: "Upscale image with resolution 7",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=7`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 7)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 8
cmd({
    pattern: "upscale8",
    alias: ["hd8"],
    desc: "Upscale image with resolution 8",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=8`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 8)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 9
cmd({
    pattern: "upscale9",
    alias: ["hd9"],
    desc: "Upscale image with resolution 9",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=9`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 9)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 10
cmd({
    pattern: "upscale10",
    alias: ["hd10"],
    desc: "Upscale image with resolution 10",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=10`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 10)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 11
cmd({
    pattern: "upscale11",
    alias: ["hd11"],
    desc: "Upscale image with resolution 11",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=11`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 11)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 12
cmd({
    pattern: "upscale12",
    alias: ["hd12"],
    desc: "Upscale image with resolution 12",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=12`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 12)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 13
cmd({
    pattern: "upscale13",
    alias: ["hd13"],
    desc: "Upscale image with resolution 13",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=13`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 13)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 14
cmd({
    pattern: "upscale14",
    alias: ["hd14"],
    desc: "Upscale image with resolution 14",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=14`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 14)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 15
cmd({
    pattern: "upscale15",
    alias: ["hd15"],
    desc: "Upscale image with resolution 15",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=15`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 15)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Upscale 16
cmd({
    pattern: "upscale16",
    alias: ["hd16"],
    desc: "Upscale image with resolution 16",
    category: "tools",
    react: "🔼",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/upscale?url=${encodedUrl}&resolusi=16`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Upscaled (Resolution 16)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ==================== UNBLUR COMMAND ====================

cmd({
    pattern: "unblur",
    alias: ["sharpen"],
    desc: "Remove blur from image",
    category: "tools",
    react: "✨",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/unblur?url=${encodedUrl}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Unblurred Successfully*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ==================== BLUR COMMAND ====================

cmd({
    pattern: "blurface",
    alias: ["blur"],
    desc: "Apply blur effect to image",
    category: "tools",
    react: "🌫️",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/blurface?url=${encodedUrl}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Blur Effect Applied*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ==================== REMOVE BG COMMANDS (2) ====================

// Remove BG v1
cmd({
    pattern: "removebg",
    alias: ["nobg1", "rmbg1"],
    desc: "Remove background from image (v1)",
    category: "tools",
    react: "🎨",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/removebg?url=${encodedUrl}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Background Removed (v1)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Remove BG v2
cmd({
    pattern: "removebg2",
    alias: ["nobg2", "rmbg2"],
    desc: "Remove background from image (v2)",
    category: "tools",
    react: "🎨",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/v1/removebg?url=${encodedUrl}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Background Removed (v2)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ==================== REMINI COMMAND ====================

cmd({
    pattern: "remini",
    alias: ["enhance2", "hd2"],
    desc: "Enhance image quality using Remini",
    category: "tools",
    react: "🌟",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/remini?url=${encodedUrl}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Enhanced with Remini*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ==================== ENHANCE COMMANDS (4) ====================

// Enhance 1
cmd({
    pattern: "enhance1",
    alias: ["enh1"],
    desc: "Enhance image with resolution 1",
    category: "tools",
    react: "🔆",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/enhancer?url=${encodedUrl}&resolusi=1`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Enhanced (Resolution 1)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Enhance 4
cmd({
    pattern: "enhance4",
    alias: ["enh4"],
    desc: "Enhance image with resolution 4",
    category: "tools",
    react: "🔆",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/enhancer?url=${encodedUrl}&resolusi=4`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Enhanced (Resolution 4)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Enhance 8
cmd({
    pattern: "enhance8",
    alias: ["enh8"],
    desc: "Enhance image with resolution 8",
    category: "tools",
    react: "🔆",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/enhancer?url=${encodedUrl}&resolusi=8`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Enhanced (Resolution 8)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Enhance 16
cmd({
    pattern: "enhance16",
    alias: ["enh16"],
    desc: "Enhance image with resolution 16",
    category: "tools",
    react: "🔆",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/enhancer?url=${encodedUrl}&resolusi=16`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Enhanced (Resolution 16)*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ==================== COLORIZE COMMAND ====================

cmd({
    pattern: "colorize",
    alias: ["color", "addcolor"],
    desc: "Add color to black and white images",
    category: "tools",
    react: "🌈",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';
        
        if (!/image/.test(mime)) return reply("📸 Please reply to an image");
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const mediaBuffer = await q.download();
        const imageUrl = await uploadToCatbox(mediaBuffer, mime);
        const encodedUrl = encodeURIComponent(imageUrl);
        
        const apiUrl = `https://api.nexray.web.id/tools/colorize?url=${encodedUrl}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await conn.sendMessage(from, { 
            image: Buffer.from(response.data), 
            caption: "*✅ Image Colorized Successfully*\n> *🚀 Powered by AHMAD-MD*"
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
