import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "chstatus",
    alias: ["channelstatus", "cstatus", "chupdate"],
    desc: "Send text or media update to a WhatsApp channel.",
    category: "channel",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    // ── Owner Check ──
    if (!isCreator) {
        return reply("❌ This command is only for the *bot owner*!");
    }

    try {
        let args = text?.trim().split(/\s+/) || [];

        /*
         * Channel JID examples:
         * 120363xxxxxxxxxx@newsletter
         *
         * Usage inside channel:
         * .chstatus Hello channel
         *
         * Usage from private/group chat:
         * .chstatus 120363xxxxxxxxxx@newsletter Hello channel
         */

        let channelJid = from;
        let caption = text?.trim() || "";

        // If channel JID is provided in command, use it
        if (args[0]?.endsWith("@newsletter")) {
            channelJid = args.shift();
            caption = args.join(" ").trim();
        }

        // Command must be used inside a channel or with channel JID
        if (!channelJid.endsWith("@newsletter")) {
            return reply(
                `📢 *Channel Status Usage:*\n\n` +
                `*Inside Channel:*\n` +
                `.chstatus Hello channel\n\n` +
                `*From Private/Group Chat:*\n` +
                `.chstatus 120363xxxxxxxxxx@newsletter Hello channel\n\n` +
                `*Media Status:*\n` +
                `Reply to an image/video/audio and use the command.\n\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            );
        }

        const quotedMsg = m.quoted;
        const mimeType = quotedMsg
            ? ((quotedMsg.msg || quotedMsg).mimetype || "")
            : "";

        if (!quotedMsg && !caption) {
            return reply(
                `📢 *Channel Status Usage:*\n\n` +
                `*Text:*\n` +
                `.chstatus Your channel update\n\n` +
                `*Media:*\n` +
                `Reply to image/video/audio and type:\n` +
                `.chstatus Optional caption\n\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            );
        }

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        // ── Download Quoted Media ──
        let mediaBuffer = null;

        if (quotedMsg) {
            mediaBuffer = await quotedMsg.download();
        }

        const getMsgType = () => {
            if (mimeType.startsWith("image/")) return "image";
            if (mimeType.startsWith("video/")) return "video";
            if (mimeType.startsWith("audio/")) return "audio";
            return null;
        };

        let messageContent = {};
        const mediaType = getMsgType();

        if (mediaBuffer && mediaType === "image") {
            messageContent = {
                image: mediaBuffer,
                caption: caption
            };
        } else if (mediaBuffer && mediaType === "video") {
            messageContent = {
                video: mediaBuffer,
                caption: caption
            };
        } else if (mediaBuffer && mediaType === "audio") {
            messageContent = {
                audio: mediaBuffer,
                mimetype: mimeType,
                ptt: mimeType.includes("ogg")
            };
        } else {
            messageContent = {
                text: caption
            };
        }

        // ── Send Update to Channel ──
        await conn.sendMessage(channelJid, messageContent);

        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

        return reply(
            `✅ *Channel update sent successfully!*\n\n` +
            `*Channel:* ${channelJid}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        );

    } catch (error) {
        console.error("Channel status error:", error);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

        return reply(`❌ *Error:* ${error.message}`);
    }
});
