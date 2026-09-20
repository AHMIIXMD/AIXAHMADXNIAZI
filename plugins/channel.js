import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Normalize JID (remove device suffix)
const normalizeJid = (jid = "") => {
    return jid.split(":")[0];
};

cmd({
    pattern: "chstatus",
    alias: ["channelstatus", "chpost"],
    desc: "Post text, image, video or audio to a WhatsApp Channel.",
    category: "owner",
    react: "🟢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    // ── Owner Check ──
    if (!isCreator) {
        return reply("❌ This command is only for the *bot owner*!");
    }

    try {
        // Check if channel JID is provided in the message
        // Format: .chstatus 120363412470316878@newsletter
        const args = text?.trim().split(" ");
        const channelJid = args && args[0] ? normalizeJid(args[0]) : null;

        if (!channelJid || !channelJid.endsWith("@newsletter")) {
            return reply(
                `❌ *Invalid Channel JID!*\n\n` +
                `Usage: .chstatus <channel_jid>\n` +
                `Example: .chstatus 120363412470316878@newsletter\n\n` +
                `⚠️ Reply to a video/audio/image/text to post it on the channel.`
            );
        }

        const quotedMsg = m.quoted;
        const quotedData = quotedMsg ? (quotedMsg.msg || quotedMsg) : null;
        const mimeType = quotedData?.mimetype || "";
        const caption = args.slice(1).join(" ") || ""; // Agar text bhi dena ho

        // ── Usage Check ──
        if (!quotedMsg && !caption) {
            return reply(
                `🟢 *WhatsApp Channel Post Usage:*\n\n` +
                `*Text Post:*\n` +
                `.chstatus ${channelJid} Your text here\n\n` +
                `*Video/Audio/Image Post:*\n` +
                `Media ko reply karke:\n` +
                `.chstatus ${channelJid}`
            );
        }

        // ── Processing Reaction ──
        await conn.sendMessage(from, {
            react: { text: "⏳", key: mek.key }
        });

        let channelContent = {};

        // ── Quoted Image ──
        if (quotedMsg && mimeType.startsWith("image/")) {
            const imageBuffer = await quotedMsg.download();
            channelContent = {
                image: imageBuffer,
                caption: caption || undefined
            };
        }
        // ── Quoted Video ──
        else if (quotedMsg && mimeType.startsWith("video/")) {
            const videoBuffer = await quotedMsg.download();
            channelContent = {
                video: videoBuffer,
                caption: caption || undefined
            };
        }
        // ── Quoted Audio ──
        else if (quotedMsg && mimeType.startsWith("audio/")) {
            const audioBuffer = await quotedMsg.download();
            channelContent = {
                audio: audioBuffer,
                mimetype: mimeType,
                ptt: mimeType.includes("ogg")
            };
        }
        // ── Text Post (Agar koi media reply nahi hai) ──
        else if (!quotedMsg && caption) {
            channelContent = {
                text: caption
            };
        } 
        else {
            return reply("❌ Unsupported format! Sirf text, image, video aur audio supported hain.");
        }

        // ── Publish to Channel ──
        // Yahan hum direct channel JID par bhej rahe hain, statusJidList ki zaroorat nahi
        await conn.sendMessage(
            channelJid,
            channelContent
        );

        // ── Success Reaction ──
        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });

        return reply(
            `✅ *Channel Post uploaded successfully!*\n\n` +
            `📢 *Channel:* ${channelJid}\n` +
            `📌 *Content:* ${quotedMsg ? "Media" : "Text"}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        );

    } catch (error) {
        console.error("Channel Post error:", error);
        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });
        return reply(`❌ *Channel Upload Error:*\n\n${error.message}`);
    }
});
