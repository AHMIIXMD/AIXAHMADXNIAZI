import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "cpost",
    alias: ["postch", "cchannel"],
    desc: "Forward quoted message or media directly to a channel.",
    category: "owner",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator, args }) => {

    // ── Owner Check ──
    if (!isCreator) return reply("❌ This command is only for the *bot owner*!");

    try {
        const quotedMsg = m.quoted;

        // 1. Quoted message check
        if (!quotedMsg) {
            return reply("❌ *Usage:* Reply to any text, image, video, or audio message with `.cpost <Channel JID or Link>`");
        }

        // 2. Channel JID or Link target extract karna
        let targetJid = args[0] || text?.trim();

        if (!targetJid) {
            return reply(
                `📢 *Channel Post Usage:*\n\n` +
                `*Via JID:* \`.cpost 120363xxx@newsletter\`\n` +
                `*Via Link:* \`.cpost https://whatsapp.com/channel/xxx\`\n\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            );
        }

        // Channel link parsing logic
        if (targetJid.includes("whatsapp.com/channel/")) {
            targetJid = targetJid.split("whatsapp.com/channel/")[1].split("/")[0] + "@newsletter";
        } else if (!targetJid.endsWith("@newsletter")) {
            targetJid = targetJid.trim() + "@newsletter";
        }

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // 3. Quoted object payload forward karna
        const targetMessage = quotedMsg.fakeObj ? quotedMsg.fakeObj : quotedMsg;

        await conn.sendMessage(targetJid, { 
            forward: targetMessage 
        });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
        return reply("✅ *Successfully forwarded to the channel!*");

    } catch (error) {
        console.error("Cpost Error:", error);
        reply(`❌ *Error:* ${error.message}`);
    }
});
