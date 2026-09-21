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

// ✅ Ek hi loop — prefix + no-prefix dono handle karega
for (const emojiKey of Object.keys(allowedCategories)) {
    cmd({
        pattern: emojiKey,
        desc: "Plays emoji animation",
        category: "tools",
        react: emojiKey,
        filename: __filename,
        noPrefix: true    // 👈 bina prefix bhi kaam kare
    }, async (conn, mek, m, { from, reply, isCreator, command, body }) => {
        try {
            // ⚠️ Sirf owner
            if (!isCreator) return;

            // User ne kya bheja — normalize karo
            const userText = (body || "").normalize("NFC").trim();
            const emojiNorm = emojiKey.normalize("NFC");

            // 3 situations check karo:
            // 1. Sirf emoji:              "🥺"        ✅
            // 2. Prefix + emoji:          ".🥺"       ✅
            // 3. Prefix + emoji (space):  ". 🥺"      ✅
            const isPlainEmoji = userText === emojiNorm;
            const isPrefixedEmoji = userText.endsWith(emojiNorm) &&
                                    userText.length <= emojiNorm.length + 2;

            if (!isPlainEmoji && !isPrefixedEmoji) return;

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
