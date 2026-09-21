import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    on: "text",
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        // Directly text read kar rahe hain jisse issue na aaye
        const bodyText = m.text || m.body || "";
        if (!bodyText) return;

        const inputEmoji = bodyText.trim();

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

        // Check: Agar bhejne wala emoji list mein nahi hai toh exit ho jaye
        if (!allowedCategories[inputEmoji]) return;

        const emojiMessages = allowedCategories[inputEmoji];

        // Structure ke mutabiq initial message send hoga
        let currentText = emojiMessages[0];
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        // Structure ke mutabiq animation loop
        for (let i = 1; i < emojiMessages.length; i++) {
            currentText = emojiMessages[i];
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        // Quietly fail to prevent spamming chat on non-matching messages
    }
});
