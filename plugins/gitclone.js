import { cmd } from '../command.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🔧 Common function — GitHub repo clone karne ke liye
// ==========================================
async function downloadGitRepo(conn, mek, m, { from, args, reply }) {
    try {
        if (!args[0]) return reply("📌 *Usage:* .git <repo_link>");

        // React: processing
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const url = args[0];
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/i);
        if (!match) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
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
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("❌ Failed to download. Branch not found.");
        }

        const filePath = path.join(__dirname, `${repo}.zip`);
        fs.writeFileSync(filePath, zipData);

        await conn.sendMessage(from, {
            document: fs.readFileSync(filePath),
            fileName: `${repo}.zip`,
            mimetype: 'application/zip'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

        // React: success
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("Git Download Error:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply("❌ Failed to download repo.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.gitclone, .git)
// ==========================================
cmd({
    pattern: "gitclone",
    alias: ["git"],
    desc: "Download any public GitHub repo as ZIP",
    category: "download",
    react: "⬇️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await downloadGitRepo(conn, mek, m, { from, args, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (gitclone, git)
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

        // Git triggers (bina prefix)
        const gitTriggers = ["gitclone", "git"];

        // Check: kya pehla word trigger hai?
        if (!gitTriggers.includes(firstWord)) return;

        // Baaki text (URL)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Repo download karo
        await downloadGitRepo(conn, mek, { }, {
            from,
            args,
            reply: replyFn
        });

    } catch (error) {
        console.error("GitClone No-Prefix Error:", error);
    }
});
