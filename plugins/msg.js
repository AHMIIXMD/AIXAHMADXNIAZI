// plugins/msg.js - ESM Version

import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — multi messages bhejne ke liye
// ==========================================
async function sendMultiMessages(client, message, match, { isCreator, reply, from, q }) {
    try {
        if (!isCreator) return await reply("*📛 Owner Only Command*");

        // Use q parameter like tagall does
        let args = q || '';

        if (!args) {
            return await reply("*Usage:* `.msg Your text , count`\n*Max count:* 50");
        }

        // Parse: text , count
        let text = args;
        let count = 1;

        const commaIndex = args.indexOf(',');
        if (commaIndex !== -1) {
            text = args.substring(0, commaIndex).trim();
            const countStr = args.substring(commaIndex + 1).trim();
            const parsedCount = parseInt(countStr);
            if (!isNaN(parsedCount) && parsedCount > 0) {
                if (parsedCount > 50) {
                    return await reply("❌ *Count exceeds limit!*\nPlease choose a number under 50.\nExample: `.msg Hello , 20`");
                }
                count = parsedCount;
            }
        }

        for (let i = 0; i < count; i++) {
            try {
                const messageContent = {
                    extendedTextMessage: {
                        text: text,
                        contextInfo: { mentionedJid: [] }
                    }
                };

                const msgData = generateWAMessageFromContent(
                    from,
                    messageContent,
                    { userJid: client.user.id }
                );

                await client.relayMessage(from, msgData.message, {
                    messageId: msgData.key.id
                });

                if (i < count - 1) {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

            } catch (error) {
                try {
                    await client.sendMessage(from, { text: text });
                } catch (e) {}
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        await reply("✅ Multi Message Successfully Sent");

    } catch (error) {
        console.error("Msg Error:", error);
        await reply(`💢 Error: ${error.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.msg, .repeat, .spam)
// ==========================================
cmd({
    pattern: "msg",
    alias: ["repeat", "spam"],
    desc: "msg text messages multiple times",
    category: "owner",
    filename: __filename
}, async (client, message, match, { isCreator, reply, from, q }) => {
    await sendMultiMessages(client, message, match, { isCreator, reply, from, q });
});

// ==========================================
// 📌 2. Bina prefix wala handler (msg, repeat, spam)
// 🔒🔒 SIRF OWNER — extra security
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
        // 🔒 SIRF OWNER — warna WhatsApp ban ho jayega
        if (!isCreator) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Msg triggers (bina prefix)
        const msgTriggers = ["msg", "repeat", "spam"];

        // Check: kya pehla word trigger hai?
        if (!msgTriggers.includes(firstWord)) return;

        // Baaki text (message + count)
        const restText = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Multi messages bhejo
        await sendMultiMessages(conn, mek, null, {
            isCreator,
            reply: replyFn,
            from,
            q: restText
        });

    } catch (error) {
        console.error("Msg No-Prefix Error:", error);
    }
});
