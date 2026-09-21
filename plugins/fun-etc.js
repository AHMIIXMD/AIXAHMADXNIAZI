import axios from "axios";
import { cmd } from "../command.js";
import { fetchGif, gifToVideo } from "../lib/fetchGif.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Marriage GIF bhejne ke liye
// ==========================================
async function sendMarriageGif(conn, mek, store, { isGroup, groupMetadata, reply, sender }) {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups!");

        const participants = groupMetadata.participants.map(user => user.id);

        // Filter out the sender and bot number
        const eligibleParticipants = participants.filter(
            id => id !== sender && !id.includes(conn.user.id.split('@')[0])
        );

        if (eligibleParticipants.length < 1) {
            return reply("❌ Not enough participants to perform a marriage!");
        }

        // Select random pair
        const randomIndex = Math.floor(Math.random() * eligibleParticipants.length);
        const randomPair = eligibleParticipants[randomIndex];

        // Fetch wedding GIF
        const apiUrl = "https://api.waifu.pics/sfw/hug";
        let res = await axios.get(apiUrl);
        let gifUrl = res.data.url;

        let gifBuffer = await fetchGif(gifUrl);
        let videoBuffer = await gifToVideo(gifBuffer);

        const message = `💍 *Shadi Mubarak!* 💒\n\n👰 @${sender.split("@")[0]} + 🤵 @${randomPair.split("@")[0]}\n\nMay you both live happily ever after! 💖`;

        await conn.sendMessage(
            mek.chat || store,
            {
                video: videoBuffer,
                caption: message,
                gifPlayback: true,
                mentions: [sender, randomPair]
            },
            { quoted: mek }
        );

    } catch (error) {
        console.error("❌ Error in .marige command:", error);
        reply(`❌ *Error in .marige command:*\n\`\`\`${error.message}\`\`\``);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.marige, .shadi, .marriage, .wedding)
// ==========================================
cmd({
    pattern: "marige",
    alias: ["shadi", "marriage", "wedding"],
    desc: "Randomly pairs two users for marriage with a wedding GIF",
    react: "💍",
    category: "fun",
    filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
    await sendMarriageGif(conn, mek, store, { isGroup, groupMetadata, reply, sender });
});

// ==========================================
// 📌 2. Bina prefix wala handler (marige, shadi, marriage, wedding)
// 🔒 Sirf GROUP
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig,
    prefix,
    isGroup,
    groupMetadata
}) => {
    try {
        // 🔒 SIRF GROUP
        if (!isGroup) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Marriage triggers (bina prefix)
        const marriageTriggers = ["marige", "shadi", "marriage", "wedding"];

        // Check: exact match?
        if (!marriageTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Marriage GIF bhejo
        await sendMarriageGif(conn, mek, from, {
            isGroup,
            groupMetadata,
            reply: replyFn,
            sender
        });

    } catch (error) {
        console.error("Marige No-Prefix Error:", error);
    }
});
