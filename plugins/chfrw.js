import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// JID ko saaf karna
const normalizeJid = (jid = "") => {
    return jid.split(":")[0];
};

cmd({
    pattern: "chforward",
    alias: ["chpost", "chsend", "forwardtochannel"],
    desc: "Forward any media/text to a WhatsApp Channel.",
    category: "owner",
    react: "📤",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    // ── Owner Check ──
    if (!isCreator) {
        return reply("❌ This command is only for the *bot owner*!");
    }

    try {
        // Channel JID nikalo
        const args = text?.trim().split(" ");
        const channelJid = args && args[0] ? normalizeJid(args[0]) : null;

        if (!channelJid || !channelJid.endsWith("@newsletter")) {
            return reply(
                `❌ *Invalid Channel JID!*\n\n` +
                `Usage: .chforward <channel_jid>\n` +
                `Example: .chforward 120363412470316878@newsletter\n\n` +
                `⚠️ Kisi bhi video/audio/image/text ko reply karke ye command lagayein.`
            );
        }

        const quotedMsg = m.quoted;
        const quotedData = quotedMsg ? (quotedMsg.msg || quotedMsg) : null;
        const mimeType = quotedData?.mimetype || "";
        const caption = args.slice(1).join(" ") || "";

        // Agar na media hai na text
        if (!quotedMsg && !caption) {
            return reply(
                `🟢 *Channel Forward Usage:*\n\n` +
                `*Text:* .chforward ${channelJid} Aapka text\n` +
                `*Media:* Media par reply karke .chforward ${channelJid}`
            );
        }

        // Processing React
        await conn.sendMessage(from, {
            react: { text: "⏳", key: mek.key }
        });

        let content = {};

        // Image
        if (quotedMsg && mimeType.startsWith("image/")) {
            const buffer = await quotedMsg.download();
            content = { image: buffer, caption: caption || undefined };
        }
        // Video
        else if (quotedMsg && mimeType.startsWith("video/")) {
            const buffer = await quotedMsg.download();
            content = { video: buffer, caption: caption || undefined };
        }
        // Audio
        else if (quotedMsg && mimeType.startsWith("audio/")) {
            const buffer = await quotedMsg.download();
            content = { audio: buffer, mimetype: mimeType, ptt: mimeType.includes("ogg") };
        }
        // Document (PDF etc)
        else if (quotedMsg && mimeType.startsWith("application/")) {
            const buffer = await quotedMsg.download();
            content = { 
                document: buffer, 
                mimetype: mimeType, 
                fileName: quotedData.fileName || "file",
                caption: caption || undefined 
            };
        }
        // Text
        else if (!quotedMsg && caption) {
            content = { text: caption };
        }
        else {
            return reply("❌ Ye media type supported nahi hai.");
        }

        // ── Channel Mein Post Karein ──
        await conn.sendMessage(channelJid, content);

        // Success React
        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });

        return reply(
            `✅ *Channel Mein Post Ho Gaya!*\n\n` +
            `📢 *Channel:* ${channelJid}\n` +
            `📌 *Type:* ${quotedMsg ? "Media" : "Text"}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        );

    } catch (error) {
        console.error("Channel Forward error:", error);
        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });
        return reply(`❌ *Error:*\n\n${error.message}`);
    }
});
