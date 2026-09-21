import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    on: "text", // Direct text/emoji listen karega
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, body }) => {
    try {
        if (!isCreator) return;
        if (!body) return;

        const inputEmoji = body.trim();

        // 🎯 AAPKI PASANDIDA EMOJIS KI CATEGORIES
        const allowedCategories = {
            // Sad / Crying / Emotional
            "🥺": ["🥺", "😢", "😭", "🙁", "☹️", "😞", "😓", "😟", "😮‍💨", "💔", "🥀", "🥺"],
            "🥹": ["🥹", "🥺", "🥲", "😭", "💧", "❤️‍🩹", "🥹"],
            "🥲": ["🥲", "🥹", "🥺", "🙂", "🫠", "🥲"],
            "😮‍💨": ["😮‍💨", "😓", "😮", "😔", "🚬", "😮‍💨"],

            // Angry / Attitude / Rude
            "😡": ["😡", "🤬", "😠", "😤", "👿", "👺", "💣", "💥", "🔥", "⚡", "😡"],
            "🖕": ["🖕", "👊", "🖕", "😏", "🖕"],
            "🚩": ["🚩", "⚠️", "🚨", "🚫", "🚩"],

            // Laughing / Happy / Smiles
            "😂": ["😂", "🤣", "😆", "😄", "😃", "😀", "😅", "😋", "😜", "🤪", "😹", "😂"],
            "🤣": ["🤣", "😂", "💀", "☠️", "😹", "😝", "🤣"],
            "😆": ["😆", "😁", "😄", "😃", "😂", "😆"],
            "😁": ["😁", "😀", "😃", "😄", "😆", "😁"],
            "😊": ["😊", "🙂", "☺️", "🤗", "🥰", "😊"],
            "🙂": ["🙂", "🙃", "🫠", "😐", "🙂"],
            "😉": ["😉", "😜", "😜", "😏", "😉"],
            "🤗": ["🤗", "🫂", "🥰", "❤️", "🤗"],

            // Hearts & Love
            "❤️‍🩹": ["❤️‍🩹", "❤️", "💖", "💝", "💗", "💓", "💕", "💔", "❣️", "💘", "💞", "❤️‍🩹"],
            "🫂": ["🫂", "🫀", "❤️", "🤗", "🫂"],
            "🫦": ["🫦", "💋", "👄", "👅", "🥵", "🫦"],

            // Melting / Hot / Cold / Crazy
            "🫠": ["🫠", "🙃", "🫠", "💧", "🫠"],
            "😫": ["😫", "😩", "😫", "🥵", "🤤", "😫"],
            "🫩": ["🫩", "😵‍💫", "🫩", "🌀", "🫩"],
            "🥵": ["🥵", "🤤", "👄", "🫦", "🔥", "🥵"],
            "🥶": ["🥶", "❄️", "🧊", "🥶"],

            // Cool / Ghost / Magic
            "😎": ["😎", "😏", "🤑", "🤠", "🗿", "🥸", "⚡", "✨", "👑", "😎"],
            "👻": ["👻", "💀", "☠️", "🎃", "👻"],
            "🌚": ["🌚", "🌝", "🌒", "🌑", "🌚"],
            "🌝": ["🌝", "🌚", "🌞", "🌝"],

            // Nature / Flowers / Earth
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

        // Check: Kya bheja hua emoji list mein hai?
        if (!allowedCategories[inputEmoji]) return;

        const emojiMessages = allowedCategories[inputEmoji];

        // Single-message Editing Animation Execution
        let currentText = emojiMessages[0];
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (let i = 1; i < emojiMessages.length; i++) {
            await sleep(1000); // 1 Second Speed
            currentText = emojiMessages[i];
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

    } catch (e) {
        // Silently ignore errors
    }
});
