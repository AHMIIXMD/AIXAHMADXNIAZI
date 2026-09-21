// plugins/viewonce.js - ESM Version
import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);

// Define the exact keywords to check for (only these three)
const positiveKeywords = ["nice", "good", "cute", "🌝", "🥵", "💋", "👍", "🌚", "wow", "😩", "super"];

// ==========================================
// 🔧 Common function — view once retrieve karne ke liye
// (dono handlers isi ko call karenge)
// ==========================================
async function retrieveViewOnce(client, message, m, { from, isCreator, userConfig }) {
    // Only owner
    if (!isCreator) {
        return await client.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: message });
    }

    const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

    if (!m.quoted) {
        return await client.sendMessage(from, {
            text: "*🍁 Please reply to a view once message!*"
        }, { quoted: message });
    }

    if (!m.quoted.viewOnce) {
        return await client.sendMessage(from, {
            text: "*❌ Please reply to a view once message!*"
        }, { quoted: message });
    }

    const buffer = await m.quoted.download();
    const mtype = m.quoted.mtype;
    const originalCaption = m.quoted.text || '';
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
        case "imageMessage":
            messageContent = {
                image: buffer,
                caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : `> ${DESCRIPTION}`,
                mimetype: m.quoted.mimetype || "image/jpeg"
            };
            break;
        case "videoMessage":
            messageContent = {
                video: buffer,
                caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : `> ${DESCRIPTION}`,
                mimetype: m.quoted.mimetype || "video/mp4"
            };
            break;
        case "audioMessage":
            messageContent = {
                audio: buffer,
                mimetype: "audio/mp4",
                ptt: m.quoted.ptt || false
            };
            break;
        default:
            return await client.sendMessage(from, {
                text: "❌ Only image, video, and audio messages are supported"
            }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
}

// ==========================================
// 🔧 Common function — view once user DM mein bhejne ke liye
// ==========================================
async function sendViewOnceToDM(client, message, m, { from, isCreator, userConfig }) {
    // Only owner
    if (!isCreator) return;

    const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

    if (!m.quoted) return;

    const buffer = await m.quoted.download();
    const mtype = m.quoted.mtype;
    const originalCaption = m.quoted.text || '';
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
        case "imageMessage":
            messageContent = {
                image: buffer,
                caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : `> ${DESCRIPTION}`,
                mimetype: m.quoted.mimetype || "image/jpeg"
            };
            break;
        case "videoMessage":
            messageContent = {
                video: buffer,
                caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : `> ${DESCRIPTION}`,
                mimetype: m.quoted.mimetype || "video/mp4"
            };
            break;
        case "audioMessage":
            messageContent = {
                audio: buffer,
                mimetype: "audio/mp4",
                ptt: m.quoted.ptt || false
            };
            break;
        default:
            return;
    }

    await client.sendMessage(message.sender, messageContent, options);
}

// ==========================================
// 📌 1. View Once keyword handler (bina prefix — original)
// ==========================================
cmd({
    'on': "body"
}, async (client, message, m, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig
}) => {
    try {
        if (!isCreator) return;

        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";
        const messageText = body.trim().toLowerCase();
        const hasExactKeywordOnly = positiveKeywords.includes(messageText);

        if (hasExactKeywordOnly && message.quoted?.viewOnce) {
            const buffer = await message.quoted.download();
            const mtype = message.quoted.mtype;
            const originalCaption = message.quoted.text || '';
            const options = { quoted: message };

            let messageContent = {};
            switch (mtype) {
                case "imageMessage":
                    messageContent = {
                        image: buffer,
                        caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : `> ${DESCRIPTION}`,
                        mimetype: message.quoted.mimetype || "image/jpeg"
                    };
                    break;
                case "videoMessage":
                    messageContent = {
                        video: buffer,
                        caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : `> ${DESCRIPTION}`,
                        mimetype: message.quoted.mimetype || "video/mp4"
                    };
                    break;
                case "audioMessage":
                    messageContent = {
                        audio: buffer,
                        mimetype: "audio/mp4",
                        ptt: message.quoted.ptt || false
                    };
                    break;
                default:
                    return;
            }

            await client.sendMessage(message.sender, messageContent, options);
        }
    } catch (error) {
        console.error("View Once Keyword Error:", error);
    }
});

// ==========================================
// 📌 2. Prefix wala handler (.vv3, .vv2, .vv)
// ==========================================
cmd({
    pattern: "vv3",
    react: '🐳',
    desc: "Retrieve view once messages (Owner Only)",
    category: "owner",
    filename: __filename
}, async (client, message, m, { from, isCreator, userConfig }) => {
    try {
        await retrieveViewOnce(client, message, m, { from, isCreator, userConfig });
    } catch (error) {
        console.error("vv3 Error:", error);
        await client.sendMessage(from, {
            text: "❌ Error retrieving view once message:\n" + error.message
        }, { quoted: message });
    }
});

cmd({
    pattern: "vv",
    alias: ["viewonce", 'retrive'],
    react: '🐳',
    desc: "Owner Only - retrieve quoted message back to user",
    category: "owner",
    filename: __filename
}, async (client, message, m, { from, isCreator, userConfig }) => {
    try {
        await retrieveViewOnce(client, message, m, { from, isCreator, userConfig });
    } catch (error) {
        console.error("vv Error:", error);
        await client.sendMessage(from, {
            text: "❌ Error fetching vv message:\n" + error.message
        }, { quoted: message });
    }
});

cmd({
    pattern: "vv2",
    alias: ["wah", "ohh", "oho", "🙂", "😂", "❤️", "💋", "🥵", "🌚", "😒", "nice", "ok"],
    desc: "Owner Only - retrieve quoted message back to user",
    category: "owner",
    filename: __filename
}, async (client, message, m, { from, isCreator, userConfig }) => {
    try {
        await sendViewOnceToDM(client, message, m, { from, isCreator, userConfig });
    } catch (error) {
        console.error("vv2 Error:", error);
        await client.sendMessage(from, {
            text: "❌ Error fetching vv message:\n" + error.message
        }, { quoted: message });
    }
});

// ==========================================
// 📌 3. Bina prefix wala handler (vv3, vv2, vv, aur saare aliases)
// ==========================================
cmd({
    'on': "body"
}, async (client, message, m, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig,
    prefix
}) => {
    try {
        if (!isCreator) return;

        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // vv3 / vv / vv2 ke saare triggers (alias ke saath)
        const vv3Triggers = ["vv3"];
        const vvTriggers = ["vv", "viewonce", "retrive"];
        const vv2Triggers = ["vv2", "wah", "ohh", "oho", "🙂", "😂", "❤️", "💋", "🥵", "🌚", "😒", "nice", "ok"];

        // vv3
        if (vv3Triggers.includes(userText)) {
            await retrieveViewOnce(client, message, m, { from, isCreator, userConfig });
            return;
        }

        // vv (aur aliases)
        if (vvTriggers.includes(userText)) {
            await retrieveViewOnce(client, message, m, { from, isCreator, userConfig });
            return;
        }

        // vv2 (aur aliases) → user ke DM mein bheje
        if (vv2Triggers.includes(userText)) {
            await sendViewOnceToDM(client, message, m, { from, isCreator, userConfig });
            return;
        }

    } catch (error) {
        console.error("View Once No-Prefix Error:", error);
    }
});
