import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "cstory",
    alias: ["channelstory", "chstory"],
    desc: "Send channel style story update to groups",
    category: "group",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator, quoted }) => {

    // ── Owner Check ──
    if (!isCreator) return reply("❌ Only bot owner can use this!");

    // ── ⚠️ YOUR CHANNEL INFO (SET KAR DIYA HAI) ──
    const channelLink = "https://whatsapp.com/channel/0029Vb8HaRgH5JM63v05741a";
    const channelName = "𝘼𝙃𝙈𝘼𝘿 𝙈𝘿";
    const channelJid = "120363426472060176@newsletter";

    try {
        // ── Check if replying to media ──
        const quotedMsg = m.quoted;
        const mimeType = quotedMsg ? (quotedMsg.msg || quotedMsg).mimetype || "" : "";
        const caption = text || "📢 New Channel Story Update!";

        let mediaBuffer = null;
        if (quotedMsg) {
            mediaBuffer = await quotedMsg.download();
        }

        // ── Get mentioned users ──
        const groupMetadata = await conn.groupMetadata(from);
        const mentionedJid = (groupMetadata.participants || []).map(p => p.id);

        // ── Context Info for Channel Style ──
        const contextInfo = {
            mentionedJid,
            isForwarded: true,
            forwardedNewsletter: {
                newsletterJid: channelJid,
                newsletterName: channelName,
                serverMessageId: Date.now().toString()
            }
        };

        // ── React with loading ──
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // ── Send Message with Media or Text ──
        let messageContent = {};

        if (mediaBuffer && mimeType.startsWith("image/")) {
            messageContent = {
                image: mediaBuffer,
                caption: `📢 *${channelName}*\n\n${caption}\n\n🔗 ${channelLink}`,
                contextInfo
            };
        } 
        else if (mediaBuffer && mimeType.startsWith("video/")) {
            messageContent = {
                video: mediaBuffer,
                caption: `📢 *${channelName}*\n\n${caption}\n\n🔗 ${channelLink}`,
                contextInfo
            };
        } 
        else if (mediaBuffer && mimeType.startsWith("audio/")) {
            messageContent = {
                audio: mediaBuffer,
                mimetype: mimeType,
                ptt: mimeType.includes("ogg"),
                contextInfo
            };
        }
        else {
            messageContent = {
                text: `📢 *${channelName}*\n\n${caption}\n\n🔗 ${channelLink}`,
                contextInfo
            };
        }

        // ── Send to group ──
        await conn.sendMessage(from, messageContent);
        await conn.sendMessage(from, { 
            react: { text: "✅", key: mek.key } 
        });

        reply("✅ Channel story update sent successfully!");

    } catch (error) {
        reply(`❌ Error: ${error.message}`);
        console.error("Channel Story Error:", error);
    }
});
