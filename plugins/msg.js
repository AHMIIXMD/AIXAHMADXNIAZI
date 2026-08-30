// plugins/msg.js - ESM Version
import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "msg",
    alias: ["repeat", "spam"],
    desc: "msg text messages multiple times",
    category: "owner",
    filename: __filename
}, async (client, message, match, { isCreator, reply, from }) => {
    try {
        if (!isCreator) return await reply("*📛 Owner Only Command*");
        
        if (!match) {
            return await reply("*Usage:* `.msg Your text , count`");
        }

        // Parse: text , count
        let text = match;
        let count = 1;
        
        const commaIndex = match.indexOf(',');
        if (commaIndex !== -1) {
            text = match.substring(0, commaIndex).trim();
            const countStr = match.substring(commaIndex + 1).trim();
            const parsedCount = parseInt(countStr);
            if (!isNaN(parsedCount) && parsedCount > 0) {
                count = Math.min(parsedCount, 100);
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
        await reply(`💢 Error: ${error.message}`);
    }
});
