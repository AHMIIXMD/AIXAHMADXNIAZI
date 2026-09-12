import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd, commands } from '../command.js';

const __filename = fileURLToPath(import.meta.url);

// --- PING COMMAND (MODERN UI) ---
cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        // --- AUTO UNFOLLOW NEWSLETTER ---
        try {
            await conn.newsletterUnfollow('120363409040641272@newsletter');
        } catch (err) {
            console.log("Newsletter unfollow error:", err.message);
        }

        const start = new Date().getTime();

        const reactionEmojis = ['⚡', '🚀', '🎯', '✨', '💎'];
        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

        // Quick reaction
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        // Ultra Sleek Text Design (ORIGINAL)
        const text = `*ᴘᴏɴɢ...!!* 📡\n\n*🚀 sᴘᴇᴇᴅ:* ${responseTime.toFixed(2)}ms\n*🧬 sᴛᴀᴛᴜs:* Online\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ-ᴍᴅ*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: "AHMAD-MD TECH",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});

// --- PING2 COMMAND (DASHBOARD UI) ---
cmd({
    pattern: "ping2",
    desc: "Check bot's response time with dashboard view.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // --- AUTO UNFOLLOW NEWSLETTER ---
        try {
            await conn.newsletterUnfollow('120363409040641272@newsletter');
        } catch (err) {
            console.log("Newsletter unfollow error:", err.message);
        }

        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500));
        const endTime = Date.now();
        const ping = endTime - startTime;

        let status;
        let indicator;
        if (ping < 1000) {
            status = "𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭";
            indicator = "🟢";
        } else if (ping < 1500) {
            status = "𝐆𝐨𝐨𝐝";
            indicator = "🟡";
        } else {
            status = "𝐋𝐚𝐠𝐠𝐲";
            indicator = "🔴";
        }

        // Dashboard Style Design (ORIGINAL)
        const msg = `
┏━━━━━━━━━━━━━━━━━━┈⊷
┃  ✨ *AHMAD-MD SYSTEM* ✨
┗━━━━━━━━━━━━━━━━━━┈⊷
┃
┃ 📡 *Latency:* ${ping} ms
┃ 🧠 *Quality:* ${status} ${indicator}
┃ ⚡ *Performance:* Stable
┃ 🛰️ *Server:* Global-High
┃
┗━━━━━━━━━━━━━━━━━━┈⊷

> *Created by Ahmad Hassan*`;

        await conn.sendMessage(from, { 
            text: msg.trim(),
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: "AHMAD-MD TECH",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`⚠️ Error: ${e.message}`);
    }
});
