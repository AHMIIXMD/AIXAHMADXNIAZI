import { cmd } from "../command.js";
import config from '../config.js';
import { sleep } from "../lib/functions.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Saari supported emojis ki category list
const allowedCategories = {
    "🥺": ["🥺", "😢", "😭", "🙁", "☹️", "😞", "😓", "😟", "😮‍💨", "💔", "🥀", "🥺"],
    "🥹": ["🥹", "🥺", "🥲", "😭", "💧", "❤️‍🩹", "🥹"],
    "🥲": ["🥲", "🥹", "🥺", "🙂", "🫠", "🥲"],
    "😮‍💨": ["😮‍💨", "😓", "😮", "😔", "🚬", "😮‍💨"],
    "😡": ["😡", "🤬", "😠", "😤", "👿", "👺", "💣", "💥", "🔥", "⚡", "😡"],
    "🖕": ["🖕", "👊", "🖕", "😏", "🖕"],
    "🚩": ["🚩", "⚠️", "🚨", "🚫", "🚩"],
    "😂": ["😂", "🤣", "😆", "😄", "😃", "😀", "😅", "😋", "😜", "🤪", "😹", "😂"],
    "🤣": ["🤣", "😂", "💀", "☠️", "😹", "😝", "🤣"],
    "😆": ["😆", "😁", "😄", "😃", "😂", "😆"],
    "😁": ["😁", "😀", "😃", "😄", "😆", "😁"],
    "😊": ["😊", "🙂", "☺️", "🤗", "🥰", "😊"],
    "🙂": ["🙂", "🙃", "🫠", "😐", "🙂"],
    "😉": ["😉", "😜", "😜", "😏", "😉"],
    "🤗": ["🤗", "🫂", "🥰", "❤️", "🤗"],
    "❤️‍🩹": ["❤️‍🩹", "❤️", "💖", "💝", "💗", "💓", "💕", "💔", "❣️", "💘", "💞", "❤️‍🩹"],
    "🫂": ["🫂", "🫀", "❤️", "🤗", "🫂"],
    "🫦": ["🫦", "💋", "👄", "👅", "🥵", "🫦"],
    "🫠": ["🫠", "🙃", "🫠", "💧", "🫠"],
    "😫": ["😫", "😩", "😫", "🥵", "🤤", "😫"],
    "🫩": ["🫩", "😵‍💫", "🫩", "🌀", "🫩"],
    "🥵": ["🥵", "🤤", "👄", "🫦", "🔥", "🥵"],
    "🥶": ["🥶", "❄️", "🧊", "🥶"],
    "😎": ["😎", "😏", "🤑", "🤠", "🗿", "🥸", "⚡", "✨", "👑", "😎"],
    "👻": ["👻", "💀", "☠️", "🎃", "👻"],
    "🌚": ["🌚", "🌝", "🌒", "🌑", "🌚"],
    "🌝": ["🌝", "🌚", "🌞", "🌝"],
    "🦋": ["🦋", "✨", "🌸", "🌺", "🌼", "🦋"],
    "🌸": ["🌸", "🌺", "🌹", "🌻", "💐", "🌸"],
    "💅": ["💅", "✨", "👑", "💄", "💅"],
    "🍂": ["🍂", "🍁", "🌾", "🍃", "🍂"],
    "🌹": ["🌹", "🥀", "🌸", "💐", "🌹"],
    "🌍": ["🌍", "🌎", "🌏", "🌑", "🌒", "🌍"],
    "🌎": ["🌎", "🌍", "🌏", "🌑", "🌒", "🌎"],
    "🌑": ["🌑", "🌒", "🌓", "🌔", "🌕", "🌑"],
    "🌒": ["🌒", "🌓", "🌔", "🌕", "🌘", "🌒"],

    // ==========================
    // 🆕 Naye emojis (aap ki di hui)
    // ==========================
    "♥️": ["♥️", "❤️", "💖", "💗", "💕", "♥️"],
    "❤️": ["❤️", "💖", "💝", "💗", "💓", "💕", "💞", "❣️", "❤️"],
    "🎀": ["🎀", "💗", "🎁", "🎀"],
    "✈️": ["✈️", "🛫", "🛬", "🌍", "✈️"],
    "🍷": ["🍷", "🍻", "🍺", "🍷"],
    "🍟": ["🍟", "🍔", "🥤", "🍟"],
    "🫶": ["🫶", "❤️", "🤗", "🫂", "🫶"],
    "👀": ["👀", "👁️", "👁️‍🗨️", "🧐", "👀"],
    "💗": ["💗", "💖", "💓", "💕", "❤️", "💗"],
    "☠️": ["☠️", "💀", "👻", "🏴‍☠️", "☠️"],
    "🔪": ["🔪", "🗡️", "⚔️", "💀", "🔪"]
};

// ==========================================
// 1️⃣ Bina prefix wala handler (vv3 wale structure jaisa)
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, { from, body, isCreator, reply, sender, userConfig }) => {
    try {
        // Sirf owner
        if (!isCreator) return;

        // Message normalize karo
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Check: kya ye exact emoji hai jo list mein hai?
        const matchedKey = Object.keys(allowedCategories).find(
            k => k.normalize("NFC") === userText
        );

        if (!matchedKey) return;  // List mein nahi → khamosh

        // Animation chalao
        const emojiMessages = allowedCategories[matchedKey];
        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

    } catch (error) {
        console.error("Emoji No-Prefix Error:", error);
    }
});

// ==========================================
// 2️⃣ Prefix wala handler (.🥺, .😂, .😡 ...)
// ==========================================
for (const emojiKey of Object.keys(allowedCategories)) {
    cmd({
        pattern: emojiKey,
        desc: "Plays emoji animation",
        category: "tools",
        react: emojiKey,
        filename: __filename
    }, async (conn, mek, m, { from, reply, isCreator }) => {
        try {
            if (!isCreator) {
                return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
            }

            const emojiMessages = allowedCategories[emojiKey];
            if (!emojiMessages) return;

            let currentText = '';
            const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

            for (const line of emojiMessages) {
                currentText = line;
                await sleep(1000);
                const protocolMsg = {
                    key: sentMessage.key,
                    type: 0xe,
                    editedMessage: { conversation: currentText }
                };
                await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
            }
        } catch (e) {
            reply(`❌ *Error!* ${e.message}`);
        }
    });
}
