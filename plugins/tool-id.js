//Ahmad MD

import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// lid to pn function for the existing command
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

// NEW FUNCTION: Phone number se LID nikalne ke liye
async function phoneToLid(conn, pn) {
    try {
        // Number se saare extra characters (+, -, spaces) khatam karne ke liye
        const cleanNumber = pn.replace(/[^0-9]/g, '');
        const formattedPn = `${cleanNumber}@s.whatsapp.net`;
        
        const lid = await conn.signalRepository.lidMapping.getLIDForPN(formattedPn);
        if (lid) {
            return lid;
        }
        return null;
    } catch (e) {
        return null;
    }
}

// cleanPn
function cleanPN(pn) {
    return pn.split(":")[0];
}

// EXISTING ID COMMAND - DO NOT MODIFY
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
        // Check if user is asking for channel ID
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
            // Get group JID only (no LID)
            const groupJID = from.includes('@g.us') ? from : `${from}@g.us`;
            return reply(`> *Group JID:* ${groupJID}`);
            
        } else {
            // Private chat (Inbox) - show s.whatsapp.net format
            if (fromMe) {
                // Owner in inbox - show bot's s.whatsapp.net
                const botPN = botNumber2.split('@')[0];
                return reply(`> *Your ID:* ${botPN}@s.whatsapp.net`);
            } else {
                // Others in inbox - convert LID to s.whatsapp.net
                let senderPN = sender.split('@')[0];
                
                if (sender.includes('@lid')) {
                    senderPN = await lidToPhone(conn, sender);
                }
                
                // Format as s.whatsapp.net only
                return reply(`> *Your ID:* ${senderPN}@s.whatsapp.net`);
            }
        }

    } catch (e) {
        console.error("ID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
});

// NEW COMMAND: Get @lid directly or from phone number
cmd({
    pattern: "getlid",
    alias: ["lidonly", "lid", "mylid"],  
    desc: "Get your LID (@lid) directly or by phone number",
    react: "🆔",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { 
    from, isGroup, reply, sender, fromMe, botNumber2, mentionUser, q
}) => {
    try {
        // 1. Agar user ne command ke sath number type kiya ho (e.g., .lid 923259158***)
        if (q && q.trim() !== '') {
            const targetNumber = q.trim();
            const fetchedLid = await phoneToLid(conn, targetNumber);
            
            if (fetchedLid) {
                return reply(`> *Phone:* ${targetNumber}\n> *LID:* ${fetchedLid}`);
            } else {
                return reply(`❌ Is number ki LID database me nahi mili ya number galat hai.`);
            }
        }

        // 2. Check if mentioning someone to get their LID
        const _mentionedUser = mentionUser ? mentionUser[0] : null;
        
        if (_mentionedUser) {
            if (_mentionedUser.includes('@lid')) {
                return reply(`> *User LID:* ${_mentionedUser}`);
            } else {
                // Agar mentioned user ka JID number format me hai, to use LID me convert karne ki koshish karein
                const fetchedLid = await phoneToLid(conn, _mentionedUser.split('@')[0]);
                if (fetchedLid) {
                    return reply(`> *User LID:* ${fetchedLid}`);
                }
                return reply(`⚠️ Mentioned user is not in LID format.`);
            }
        }
        
        // 3. Agar simple bina kisi argument ke command lagayi ho
        if (isGroup) {
            // In group - show sender's LID
            if (sender.includes('@lid')) {
                return reply(`> *Your LID:* ${sender}`);
            } else {
                return reply(`⚠️ You don't have a LID format in this chat.`);
            }
        } else {
            // Private chat
            if (fromMe) {
                // Bot owner in private chat
                if (botNumber2.includes('@lid')) {
                    return reply(`> *Bot LID:* ${botNumber2}`);
                } else {
                    return reply(`> *Bot Number:* ${botNumber2}`);
                }
            } else {
                // Other user in private chat
                if (sender.includes('@lid')) {
                    return reply(`> *Your LID:* ${sender}`);
                } else {
                    return reply(`⚠️ You don't have a LID format. Your current ID: ${sender}`);
                }
            }
        }

    } catch (e) {
        console.error("GetLID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
});
