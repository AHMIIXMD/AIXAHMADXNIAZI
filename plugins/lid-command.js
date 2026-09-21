import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Helper functions
// ==========================================
async function lidToPhone(conn, lid) {
    try {
        const pn = await conn.signalRepository.lidMapping.getPNForLID(lid);
        if (pn) {
            return cleanPN(pn);
        }
        return lid.split("@")[0];
    } catch (e) {
        return lid.split("@")[0];
    }
}

async function phoneToLID(conn, phoneNumber) {
    try {
        const cleanedPN = phoneNumber.replace(/\D/g, '');
        const lid = await conn.signalRepository.lidMapping.getLIDForPN(cleanedPN);
        if (lid) {
            return lid;
        }
        return null;
    } catch (e) {
        return null;
    }
}

function cleanPN(pn) {
    return pn.split(":")[0];
}

// ==========================================
// 🔧 Common function — ID command
// ==========================================
async function handleIdCommand(conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, text }) {
    try {
        if (text && text.includes('whatsapp.com/channel/')) {
            const match = text.match(/whatsapp\.com\/channel\/([\w-]+)/);
            if (!match) return reply("⚠️ *Invalid channel link format.*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx");

            const inviteId = match[1];
            let metadata;

            try {
                metadata = await conn.newsletterMetadata("invite", inviteId);
            } catch (e) {
                return reply("❌ Failed to fetch channel metadata. Make sure the link is correct.");
            }

            if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");

            return reply(`> ${metadata.id}`);
        }

        if (isGroup) {
            const groupJID = from.includes('@g.us') ? from : `${from}@g.us`;
            return reply(`> *Group JID:* ${groupJID}`);
        } else {
            if (fromMe) {
                const botPN = botNumber2.split('@')[0];
                return reply(`> *Your ID:* ${botPN}@s.whatsapp.net`);
            } else {
                let senderPN = sender.split('@')[0];
                if (sender.includes('@lid')) {
                    senderPN = await lidToPhone(conn, sender);
                }
                return reply(`> *Your ID:* ${senderPN}@s.whatsapp.net`);
            }
        }

    } catch (e) {
        console.error("ID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
}

// ==========================================
// 🔧 Common function — LID command
// ==========================================
async function handleLidCommand(conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, mentionUser, text }) {
    try {
        // If phone number is provided as argument
        const inputText = text ? text.trim() : "";
        if (inputText && /^\d{7,15}$/.test(inputText.replace(/\D/g, ''))) {
            const phoneNumber = inputText.replace(/\D/g, '');
            const lid = await phoneToLID(conn, phoneNumber);
            if (lid) {
                return reply(`> *LID for ${phoneNumber}:* ${lid}`);
            } else {
                return reply(`⚠️ LID not found for number: *${phoneNumber}*\n\nYeh number WhatsApp pe nahi mila ya LID available nahi hai.`);
            }
        }

        // If mentioning someone to get their LID
        const mentionedUser = mentionUser ? mentionUser[0] : null;

        if (mentionedUser) {
            if (mentionedUser.includes('@lid')) {
                return reply(`> *User LID:* ${mentionedUser}`);
            } else {
                return reply(`⚠️ Mentioned user is not in LID format.`);
            }
        }

        if (isGroup) {
            if (sender.includes('@lid')) {
                return reply(`> *Your LID:* ${sender}`);
            } else {
                return reply(`⚠️ You don't have a LID format in this chat.`);
            }
        } else {
            if (fromMe) {
                if (botNumber2.includes('@lid')) {
                    return reply(`> *Bot LID:* ${botNumber2}`);
                } else {
                    return reply(`> *Bot Number:* ${botNumber2}`);
                }
            } else {
                if (sender.includes('@lid')) {
                    return reply(`> *Your LID:* ${sender}`);
                } else {
                    return reply(`⚠️ You don't have a LID format. Your current ID: ${sender}`);
                }
            }
        }

    } catch (e) {
        console.error("LID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.id, .chatid, .jid, etc.)
// ==========================================
cmd({
    pattern: "id",
    alias: ["chatid", "jid", "gjid", "channelid", "newsletter", "cid"],
    desc: "Get various IDs (chat, user, group, or channel)",
    react: "⚡",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, text }) => {
    await handleIdCommand(conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, text });
});

// ==========================================
// 📌 2. Prefix wala handler (.lid, .getlid, .lidonly, .mylid)
// ==========================================
cmd({
    pattern: "lid",
    alias: ["getlid", "lidonly", "mylid"],
    desc: "Get LID. Use .lid to get your own LID, or .lid<number> to get LID of a phone number",
    react: "🆔",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, mentionUser, text }) => {
    await handleLidCommand(conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, mentionUser, text });
});

// ==========================================
// 📌 3. Bina prefix wala handler (saare triggers)
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
    mentionedJid
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // ID triggers (bina prefix)
        const idTriggers = ["id", "chatid", "jid", "gjid", "channelid", "newsletter", "cid"];

        // LID triggers (bina prefix)
        const lidTriggers = ["lid", "getlid", "lidonly", "mylid"];

        // Baaki text
        const restText = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // ID command
        if (idTriggers.includes(firstWord)) {
            await handleIdCommand(conn, mek, { }, {
                from,
                isGroup,
                reply: replyFn,
                sender,
                fromMe: mek.key?.fromMe || false,
                botNumber2: conn.user?.id || "",
                text: restText
            });
            return;
        }

        // LID command
        if (lidTriggers.includes(firstWord)) {
            await handleLidCommand(conn, mek, { }, {
                from,
                isGroup,
                reply: replyFn,
                sender,
                fromMe: mek.key?.fromMe || false,
                botNumber2: conn.user?.id || "",
                mentionUser: mentionedJid || [],
                text: restText
            });
            return;
        }

    } catch (error) {
        console.error("ID/LID No-Prefix Error:", error);
    }
});
