import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
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
    "🌒": ["🌒", "🌓", "🌔", "🌕", "🌘", "🌒"]
};

// Har emoji ke liye alag command register karo (chumi wale structure mein)
for (const emojiKey of Object.keys(allowedCategories)) {
    cmd({
        pattern: emojiKey,          // ✅ sirf ek emoji, koi pipe nahi
        desc: "Plays emoji animation",
        category: "tools",
        react: emojiKey,
        filename: __filename
    }, async (conn, mek, m, { from, reply, isCreator, command }) => {
        try {
            if (!isCreator) {
                return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
            }

            // command ko normalize karo (variation selector hata do)
            const inputEmoji = (command || "").normalize("NFC").trim();

            // Agar command match na mile to pattern se fallback lo
            const matchedKey = allowedCategories[inputEmoji]
                ? inputEmoji
                : emojiKey;

            const emojiMessages = allowedCategories[matchedKey];
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
