// plugins/viewonce.js - ESM Version
import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);

// Define the exact keywords to check for (only these three)
const positiveKeywords = ["nice", "good", "cute", "🌝", "🥵", "💋", "👍", "🌚", "wow", "😩", "super"];

// No prefix keyword handler for view once messages (owner only)
cmd({
    'on': "body"
}, async (client, message, m, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig  // Added userConfig parameter
}) => {
    try {
        // Only allow the bot owner/creator
        if (!isCreator) {
            return; // Simply return without any response if not owner
        }

        // Get DESCRIPTION from userConfig if available, otherwise use config.DESCRIPTION
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        const messageText = body.trim().toLowerCase();
        
        // Check if the message contains EXACTLY one of the keywords ONLY
        // No other words, just the keyword alone
        const hasExactKeywordOnly = positiveKeywords.includes(messageText);
        
        // Only process if contains exact keyword ONLY AND replying to a view once message
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
                    return; // Silently ignore unsupported types
            }

            // Send the view once content to the user's DM
            await client.sendMessage(message.sender, messageContent, options);
        }
    } catch (error) {
        console.error("View Once Keyword Error:", error);
    }
});

// Command handler for manual retrieval of view once messages (owner only)
cmd({
    pattern: "vv3",
    react: '🐳',
    desc: "Retrieve view once messages (Owner Only)",
    category: "owner",
    filename: __filename
}, async (client, message, m, {
    from,
    isCreator,
    userConfig  // Added userConfig parameter
}) => {
    try {
        // Only allow the bot owner/creator
        if (!isCreator) {
            return; // Simply return without any response if not owner
        }

        // Get DESCRIPTION from userConfig if available, otherwise use config.DESCRIPTION
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        if (!m.quoted) {
            return await client.sendMessage(from, {
                text: "*🍁 Please reply to a view once message!*"
            }, { quoted: message });
        }

        // Check if it's a view once message
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
                    text: "❌ Only image, video, and audio view once messages are supported"
                }, { quoted: message });
        }

        await client.sendMessage(from, messageContent, options);
    } catch (error) {
        console.error("vv Error:", error);
        await client.sendMessage(from, {
            text: "❌ Error retrieving view once message:\n" + error.message
        }, { quoted: message });
    }
});

// ==================== VV COMMAND ====================
cmd({
    pattern: "vv",
    alias: ["viewonce", 'retrive'],
    react: '🐳',
    desc: "Owner Only - retrieve quoted message back to user",
    category: "owner",
    filename: __filename
}, async (client, message, m, { 
    from, 
    isCreator,
    userConfig  // Added userConfig parameter
}) => {
    try {
        if (!isCreator) {
            return await client.sendMessage(from, {
                text: "*📛 This is an owner command.*"
            }, { quoted: message });
        }

        // Get DESCRIPTION from userConfig if available, otherwise use config.DESCRIPTION
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        if (!m.quoted) {
            return await client.sendMessage(from, {
                text: "*🍁 Please reply to a view once message!*"
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
    } catch (error) {
        console.error("vv Error:", error);
        await client.sendMessage(from, {
            text: "❌ Error fetching vv message:\n" + error.message
        }, { quoted: message });
    }
});

// ==================== VV2 COMMAND ====================
cmd({
    pattern: "vv2",
    alias: ["wah", "ohh", "oho", "🙂", "😂", "❤️", "💋", "🥵", "🌚", "😒", "nice", "ok"],
    desc: "Owner Only - retrieve quoted message back to user",
    category: "owner",
    filename: __filename
}, async (client, message, m, { 
    from, 
    isCreator,
    userConfig  // Added userConfig parameter
}) => {
    try {
        if (!isCreator) {
            return; // Simply return without any response if not owner
        }

        // Get DESCRIPTION from userConfig if available, otherwise use config.DESCRIPTION
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        if (!m.quoted) {
            return await client.sendMessage(from, {
                text: "*🍁 Please reply to a view once message!*"
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

        // Forward to user's DM
        await client.sendMessage(message.sender, messageContent, options);
    } catch (error) {
        console.error("vv Error:", error);
        await client.sendMessage(from, {
            text: "❌ Error fetching vv message:\n" + error.message
        }, { quoted: message });
    }
});