import { cmd } from '../command.js';
import { File } from 'megajs';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "megadl",
    alias: ["mega", "meganz"],
    react: "📦",
    desc: "Download ZIP or any file from Mega.nz",
    category: "download",
    use: '.megadl <mega file link>',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("📦 Please provide a Mega.nz file link.\n\nExample: `.megadl https://mega.nz/file/xxxx#key`");

        // React: Processing
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

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

        // Send file
        await conn.sendMessage(from, {
            document: fs.readFileSync(savePath),
            fileName: file.name || "JawadTechX.zip",
            mimetype: "application/zip",
            caption: "📦 Downloaded from Mega NZ\n\nPowered By AHMAD TechX"
        }, { quoted: mek });

        // Delete temp file
        fs.unlinkSync(savePath);

        // React: Done
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error("❌ MEGA Downloader Error:", error);
        reply("❌ Failed to download file from Mega.nz. Make sure the link is valid and file is accessible.");
    }
});
