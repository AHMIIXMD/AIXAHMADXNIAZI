import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — hidetag bhejne ke liye
// ==========================================
async function sendHideTag(conn, mek, m, { from, q, isGroup, isCreator, isAdmins, participants, reply, body }) {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isCreator) return reply("❌ Only group admins can use this command.");

        const mentionAll = { mentions: participants.map(u => u.id) };

        // If no message or reply is provided
        if (!q && !m.quoted) {
            return reply("❌ Please provide a message or reply to a message to tag all members.");
        }

        // Get the original message text with proper formatting
        let messageToSend = '';

        // If there is a quoted message
        if (m.quoted) {
            const type = m.quoted.mtype || '';

            // If it's a text message
            if (type === 'extendedTextMessage') {
                messageToSend = m.quoted.text || 'No message content found.';
            }
            // Handle media messages
            else if (['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)) {
                try {
                    const buffer = await m.quoted.download?.();
                    if (!buffer) return reply("❌ Failed to download the quoted media.");

                    let content;
                    switch (type) {
                        case "imageMessage":
                            content = { image: buffer, caption: m.quoted.text || "📷 Image", ...mentionAll };
                            break;
                        case "videoMessage":
                            content = {
                                video: buffer,
                                caption: m.quoted.text || "🎥 Video",
                                gifPlayback: m.quoted.message?.videoMessage?.gifPlayback || false,
                                ...mentionAll
                            };
                            break;
                        case "audioMessage":
                            content = {
                                audio: buffer,
                                mimetype: "audio/mp4",
                                ptt: m.quoted.message?.audioMessage?.ptt || false,
                                ...mentionAll
                            };
                            break;
                        case "stickerMessage":
                            content = { sticker: buffer, ...mentionAll };
                            break;
                        case "documentMessage":
                            content = {
                                document: buffer,
                                mimetype: m.quoted.message?.documentMessage?.mimetype || "application/octet-stream",
                                fileName: m.quoted.message?.documentMessage?.fileName || "file",
                                caption: m.quoted.text || "",
                                ...mentionAll
                            };
                            break;
                    }

                    if (content) {
                        return await conn.sendMessage(from, content, { quoted: mek });
                    }
                } catch (e) {
                    console.error("Media download/send error:", e);
                    return reply("❌ Failed to process the media. Sending as text instead.");
                }
            }
            else {
                messageToSend = m.quoted.text || "📨 Message";
            }
        }
        // If no quoted message, use the command text
        else if (q) {
            const originalMsg = m.message?.conversation ||
                                m.message?.extendedTextMessage?.text ||
                                m.message?.imageMessage?.caption ||
                                m.message?.videoMessage?.caption ||
                                q;

            // Remove the command prefix (.hidetag or .tag or .h)
            const commandPatterns = ['.hidetag', '.tag', '.h'];
            let cleanText = originalMsg;

            for (const pattern of commandPatterns) {
                if (cleanText.startsWith(pattern)) {
                    cleanText = cleanText.slice(pattern.length).trim();
                    break;
                }
            }

            messageToSend = cleanText || q;
        }

        // Send the message with proper formatting
        if (messageToSend) {
            await conn.sendMessage(from, {
                text: messageToSend,
                ...mentionAll
            }, { quoted: mek });
        } else {
            return reply("❌ No message to send.");
        }

    } catch (e) {
        console.error(e);
        reply(`❌ *Error Occurred !!*\n\n${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.hidetag, .tag, .h)
// ==========================================
cmd({
    pattern: "hidetag",
    alias: ["tag", "h"],
    react: "🔊",
    desc: "To Tag all Members for Any Message/Media",
    category: "group",
    use: '.hidetag Hello',
    filename: __filename
}, async (conn, mek, m, { from, q, isGroup, isCreator, isAdmins, participants, reply }) => {
    await sendHideTag(conn, mek, m, { from, q, isGroup, isCreator, isAdmins, participants, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (hidetag, tag, h)
// 🔒 Sirf GROUP + Admin/Owner
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
    prefix,
    isGroup,
    isAdmins,
    participants,
    quoted
}) => {
    try {
        // 🔒 SIRF GROUP
        if (!isGroup) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Hidetag triggers (bina prefix)
        const hidetagTriggers = ["hidetag", "tag", "h"];

        // Check: kya pehla word trigger hai?
        if (!hidetagTriggers.includes(firstWord)) return;

        // Baaki text (message)
        const restText = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Hidetag bhejo
        await sendHideTag(conn, mek, {
            quoted: quoted,
            message: mek.message
        }, {
            from,
            q: restText,
            isGroup,
            isCreator,
            isAdmins,
            participants,
            reply: replyFn
        });

    } catch (error) {
        console.error("HideTag No-Prefix Error:", error);
    }
});
