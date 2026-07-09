import { cmd } from '../command.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "gitclone",
    alias: ["git"],
    desc: "Download any public GitHub repo as ZIP",
    category: "download",
    react: "⬇️",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("📌 *Usage:* .git <repo_link>");

        // React: processing
        await conn.sendMessage(m.chat, { react: { text: '⬇️', key: mek.key } });

        const url = args[0];
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/i);
        if (!match) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: mek.key } });
            return reply("❌ Invalid GitHub link.");
        }

        const owner = match[1];
        const repo = match[2].replace(/\.git$/, '');

        // Try main first, then master if main fails
        const branches = ['main', 'master'];
        let zipData = null;
        for (const branch of branches) {
            const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;
            try {
                const res = await axios.get(zipUrl, { responseType: 'arraybuffer' });
                zipData = res.data;
                break;
            } catch {}
        }

        if (!zipData) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: mek.key } });
            return reply("❌ Failed to download. Branch not found.");
        }

        const filePath = path.join(__dirname, `${repo}.zip`);
        fs.writeFileSync(filePath, zipData);

        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(filePath),
            fileName: `${repo}.zip`,
            mimetype: 'application/zip'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

        // React: success
        await conn.sendMessage(m.chat, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Git Download Error:", e);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: mek.key } });
        reply("❌ Failed to download repo.");
    }
});
