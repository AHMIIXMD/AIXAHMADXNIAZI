import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

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

cmd({
    pattern: "id",
    alias: ["chatid", "jid", "gjid", "channelid", "newsletter", "cid"],
    desc: "Get various IDs (chat, user, group, or channel)",
    react: "⚡",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, {
    from, isGroup, reply, sender, fromMe, botNumber2
}) => {
    try {
        if (m.text && m.text.includes('whatsapp.com/channel/')) {
            const match = m.text.match(/whatsapp\.com\/channel\/([\w-]+)/);
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
});

cmd({
    pattern: "lid",
    alias: ["getlid", "lidonly", "mylid"],
    desc: "Get LID. Use .lid to get your own LID, or .lid<number> to get LID of a phone number",
    react: "🆔",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, {
    from, isGroup, reply, sender, fromMe, botNumber2, mentionUser, text
}) => {
    try {
        // If phone number is provided as argument e.g. .lid923259158***
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
});
