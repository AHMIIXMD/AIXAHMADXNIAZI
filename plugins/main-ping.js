import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd, commands } from '../command.js';

const __filename = fileURLToPath(import.meta.url);

// --- PING COMMAND ---
cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Ping command",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const text = `AHMAD MD BOT HACK BYE JUNAID`;

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

// --- PING2 COMMAND ---
cmd({
    pattern: "ping2",
    desc: "Ping2 command",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = `AHMAD MD BOT HACK BYE JUNAID`;

        await conn.sendMessage(from, { 
            text: msg,
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
