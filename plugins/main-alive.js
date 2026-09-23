import { cmd, commands } from '../command.js';
import os from "os";
import config from '../config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "alive",
    desc: "Check uptime and system status",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        // ⏳ Initial React
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        const formatUptime = (seconds) => {
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${secs}s`;
        };

        const uptime = formatUptime(process.uptime());
        const RAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const platform = os.platform();

        // PROFESSIONAL DASHBOARD DESIGN
        const status = `*╭───────────〔 ᴀʜᴍᴀᴅ-ᴍᴅ 〕──────────┈⊷*
*│*
*┝┤ 🤖 sᴛᴀᴛᴜs:* ᴏɴʟɪɴᴇ & ᴀᴄᴛɪᴠᴇ
*┝┤ ⏱️ ᴜᴘᴛɪᴍᴇ:* ${uptime}
*┝┤ 📟 ʀᴀᴍ ᴜsᴀɢᴇ:* ${RAM} ᴍʙ
*┝┤ 💻 ᴘʟᴀᴛғᴏʀᴍ:* ${platform}
*│*
*╰──────────────────────────────────┈⊷*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ ʜᴀssᴀɴ*`;

        await conn.sendMessage(from, { 
            text: status,
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

        // ✅ Success React
        await conn.sendMessage(from, { react: { text: '🟢', key: m.key } });

    } catch (e) {
        console.error("Error in alive command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply(`❌ System Error: ${e.message}`);
    }
});
