import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Saari supported emojis ki category list
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

cmd({
    pattern: "🥺|🥹|🥲|😮‍💨|😡|🖕|🚩|😂|🤣|😆|😁|😊|🙂|😉|🤗|❤️‍🩹|🫂|🫦|🫠|😫|🫩|🥵|🥶|😎|👻|🌚|🌝|🦋|🌸|💅|🍂|🌹|🌍|🌎|🌑|🌒",
    desc: "Plays emoji animation",
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, command }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const inputEmoji = command.trim();

        if (!allowedCategories[inputEmoji]) return;

        const emojiMessages = allowedCategories[inputEmoji];

        // Bilkul `.chumi` wali structure
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
