import axios from "axios";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — MediaFire download karne ke liye
// ==========================================
async function downloadMediaFire(conn, mek, m, { from, reply, args }) {
    try {
        const url = args.join(" ");
        if (!url || !url.includes("mediafire.com")) {
            return reply("❌ Please provide a valid MediaFire URL\nExample: .mediafire https://www.mediafire.com/file/...");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://api.deline.web.id/downloader/mediafire?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.downloadUrl || !data.result.fileName) {
            return reply("❌ Failed to fetch file info. Invalid URL or API error.");
        }

        const fileName = data.result.fileName;
        const downloadUrl = data.result.downloadUrl;

        const fileResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(fileResponse.data);

        // Determine mimetype based on file extension
        const ext = fileName.split('.').pop().toLowerCase();
        let mimetype = 'application/octet-stream';
        if (ext === 'mp4') mimetype = 'video/mp4';
        else if (ext === 'apk') mimetype = 'application/vnd.android.package-archive';
        else if (ext === 'zip') mimetype = 'application/zip';
        else if (ext === 'js') mimetype = 'text/javascript';
        else if (['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'].includes(ext)) mimetype = 'application/octet-stream';

        const messageOptions = {
            document: fileBuffer,
            fileName: fileName,
            mimetype: mimetype,
            caption: `*MediaFire Download*\n\n📄 *File:* ${fileName}\n\nPowered by AHMAD-MD`
        };

        await conn.sendMessage(from, messageOptions, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error("MediaFire Error:", error);
        reply("❌ Failed to download file. Please check the URL or try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.mediafire, .mfire, .mfdownload)
// ==========================================
cmd({
    pattern: "mediafire",
    alias: ["mfire", "mfdownload"],
    react: '📥',
    desc: "Download any file from MediaFire",
    category: "download",
    use: ".mediafire <MediaFire URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    await downloadMediaFire(conn, mek, m, { from, reply, args });
});

// ==========================================
// 📌 2. Bina prefix wala handler (mediafire, mfire, mfdownload)
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

        // MediaFire triggers (bina prefix)
        const mfTriggers = ["mediafire", "mfire", "mfdownload"];

        // Check: kya pehla word trigger hai?
        if (!mfTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // MediaFire download karo
        await downloadMediaFire(conn, mek, { }, {
            from,
            reply: replyFn,
            args
        });

    } catch (error) {
        console.error("MediaFire No-Prefix Error:", error);
    }
});
