import config from '../config.js';
import { cmd, commands } from '../command.js';
import ytdl from 'yt-search';
import fs from 'fs-extra';
import { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const l = console.log;
var videotime = 60000; // 1000 min

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts Ahmad',
    react: "🔎",
    desc: "Search and get details from YouTube.",
    category: "search",
    filename: __filename
},
async (conn, mek, m, {
    from, l, quoted, body, isCmd, umarmd, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply('*Please give me words to search*');

        let arama = await ytdl(q);
        let results = arama.all.slice(0, 10); // 🔟 Only the first 10 results
        let mesaj = '';

        results.forEach((video, i) => {
            mesaj += `*${i + 1}. ${video.title}*\n🔗 ${video.url}\n📺 ${video.timestamp} | 👀 ${video.views} views\n\n`;
        });

        await conn.sendMessage(from, { text: mesaj.trim() }, { quoted: mek });

    } catch (e) {
        l(e);
        reply('*Error !!*');
    }
});
