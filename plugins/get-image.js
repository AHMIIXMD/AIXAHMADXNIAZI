import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — URL سے image بھیجنے کے لیے
// ==========================================
async function convertUrlToImage(conn, mek, m, { from, reply, text }) {
    try {
        if (!text) {
            return reply('Please provide an image URL\nExample: !getimage https://example.com/image.jpg');
        }

        const imageUrl = text.trim();

        // Validate URL
        if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
            return reply('❌ Invalid image URL! Must be direct link to image (jpg/png/gif/webp)');
        }

        // Verify the image exists
        try {
            const response = await axios.head(imageUrl);
            if (!response.headers['content-type']?.startsWith('image/')) {
                return reply('❌ URL does not point to a valid image');
            }
        } catch (e) {
            return reply('❌ Could not access image URL. Please check the link');
        }

        // Send the image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: 'Here is your image from the URL'
        }, { quoted: mek });

    } catch (error) {
        console.error('GetImage Error:', error);
        reply('❌ Failed to process image. Error: ' + error.message);
    }
}

// ==========================================
// 📌 1. Prefix wala handler
// (.getimage, .tophoto, .url2image, .urltoimage, .imagefromurl, .fetchimage)
// ==========================================
cmd({
    pattern: "getimage",
    alias: ["tophoto", "url2image", "urltoimage", "imagefromurl", "fetchimage"],
    desc: "Convert image URL to WhatsApp image",
    category: "utility",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    await convertUrlToImage(conn, mek, m, { from, reply, text });
});

// ==========================================
// 📌 2. Bina prefix wala handler (saare triggers)
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

        // Saare getimage triggers (bina prefix)
        const getImageTriggers = [
            "getimage",
            "tophoto",
            "url2image",
            "urltoimage",
            "imagefromurl",
            "fetchimage"
        ];

        // Check: kya pehla word kisi trigger se match karta hai?
        if (!getImageTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Image bhejo
        await convertUrlToImage(conn, mek, { }, {
            from,
            reply: replyFn,
            text: query
        });

    } catch (error) {
        console.error("GetImage No-Prefix Error:", error);
    }
});
