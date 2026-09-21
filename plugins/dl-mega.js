import { cmd } from '../command.js';
import { File } from 'megajs';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Mega file download karne ke liye
// ==========================================
async function downloadMega(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) {
            return reply("📦 Please provide a Mega.nz file link.\n\nExample: `.megadl https://mega.nz/file/xxxx#key`");
        }

        // React: Processing
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        // Initialize MEGA File from link
        const file = File.fromURL(q);

        // Download into buffer
        const data = await new Promise((resolve, reject) => {
            file.download((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Create temp file path
        const savePath = path.join(os.tmpdir(), file.name || "mega_file.zip");

        // Save file locally
        fs.writeFileSync(savePath, data);

        // Detect mimetype based on extension
        const ext = (file.name || "").split('.').pop().toLowerCase();
        let mimetype = "application/octet-stream";
        if (ext === 'zip') mimetype = 'application/zip';
        else if (ext === 'mp4') mimetype = 'video/mp4';
        else if (ext === 'mp3') mimetype = 'audio/mpeg';
        else if (ext === 'apk') mimetype = 'application/vnd.android.package-archive';
        else if (ext === 'pdf') mimetype = 'application/pdf';

        // Send file
        await conn.sendMessage(from, {
            document: fs.readFileSync(savePath),
            fileName: file.name || "JawadTechX.zip",
            mimetype: mimetype,
            caption: "📦 Downloaded from Mega NZ\n\nPowered By AHMAD TechX"
        }, { quoted: mek });

        // Delete temp file
        fs.unlinkSync(savePath);

        // React: Done
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error("❌ MEGA Downloader Error:", error);
        reply("❌ Failed to download file from Mega.nz. Make sure the link is valid and file is accessible.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.megadl, .mega, .meganz)
// ==========================================
cmd({
    pattern: "megadl",
    alias: ["mega", "meganz"],
    react: "📦",
    desc: "Download ZIP or any file from Mega.nz",
    category: "download",
    use: '.megadl <mega file link>',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await downloadMega(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (megadl, mega, meganz)
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

        // Mega triggers (bina prefix)
        const megaTriggers = ["megadl", "mega", "meganz"];

        // Check: kya pehla word trigger hai?
        if (!megaTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Mega download karo
        await downloadMega(conn, mek, { }, {
            from,
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("Mega No-Prefix Error:", error);
    }
});
