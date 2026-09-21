import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import axios from 'axios'; // Make sure 'axios' is installed (npm install axios)

const __filename = fileURLToPath(import.meta.url);

// --- WHATSAPP AI AGENT COMMAND ---
cmd({
    pattern: "agent",
    alias: ["aad", "aiagent", "bot"],
    use: '.agent <aapka sawaal>',
    desc: "Chat with AAD Meta Agent using API Key",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, sender, reply }) => {
    try {
        // --- LAHORE / PAKISTAN NUMBER CHECK ---
        const userNumber = sender.split('@')[0];
        if (!userNumber.startsWith('92')) {
            return await reply("❌ Ye command sirf Lahore / Pakistan ke numbers ke liye allow hai!");
        }

        if (!q) return reply("Kutuch poochein! Example: `.agent Hello, aap kaun ho?`");

        // React on processing
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Meta Agent API Key (Access Token)
        const apiKey = "WAAViiA027dxA95f6Qk0maQUhPBA3hJ7pe68kIUMiTgZC9F0qpRJOqZBY3aCjszPSWWvgni8VdOXMIOKpz7485ZCoJmpO9BAZAGRyG0mRenzXvLfl8dkpqZAO4pchrZBiSnOJlfahZBPxkK0KoKRaHXcYg8gEVQJhHBZCRjEMZB4WZCEVfnTIPKm";

        // Meta Graph API Endpoint for Meta AI / WhatsApp Cloud API Agent
        // Replace 'YOUR_PHONE_NUMBER_ID' if you have a specific Phone Number ID from Meta Developer Dashboard
        const url = `https://graph.facebook.com/v18.0/me/messages`;

        // Request Payload
        const response = await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: userNumber,
                type: "text",
                text: { body: q }
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Success Reaction & Reply
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

        const textResponse = `*🤖 ᴀᴀᴅ ᴀɢᴇɴᴛ ʀᴇsᴘᴏɴsᴇ*\n\nMessage Agent tak bhej diya gaya hai!\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ-ᴍᴅ*`;

        await conn.sendMessage(from, {
            text: textResponse,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.log("Agent API Error:", e.response ? e.response.data : e.message);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        reply(`❌ Agent Error: ${e.response?.data?.error?.message || e.message}`);
    }
});
