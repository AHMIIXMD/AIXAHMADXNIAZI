import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Saari supported emojis ki category mapping
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
    on: "body", // On body / text listener bilkul standard format mein
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, body }) => {
    try {
        if (!isCreator) return;

        // Input text nikalna
        const textMsg = body || m.text || (m.message && m.message.conversation) || "";
        const inputEmoji = textMsg.trim();

        // Agar send ki hui emoji list mein nahi hai toh ignore karein
        if (!allowedCategories[inputEmoji]) return;

        const emojiMessages = allowedCategories[inputEmoji];

        // Exact .chumi structure format
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
        // Silently catch error
    }
});
