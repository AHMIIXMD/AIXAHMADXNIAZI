import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "report",
    react: "🚨",
    category: "misc",
    filename: __filename
}, async (conn, mek, m, { from, sender, text }) => {

    const owner = "923221540695@s.whatsapp.net"; // درست JID format

    if (!text) {
        return conn.sendMessage(from, {
            text: "❌ Please write something to report\nExample: .report bot is not working"
        }, { quoted: mek });
    }

    // user response
    await conn.sendMessage(from, {
        text: "✅ Report sent successfully"
    }, { quoted: mek });

    // owner ko report
    await conn.sendMessage(owner, {
        text:
`🚨 NEW REPORT RECEIVED

👤 From: ${sender}
📍 Chat: ${from}
📝 Report: ${text}`
    }, { quoted: mek });

});
