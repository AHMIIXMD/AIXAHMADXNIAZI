import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — pickup line fetch karne ke liye
// ==========================================
async function getPickupLine(conn, mek, m, { from, reply }) {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/pickupline');

        if (!data.success) return reply("❌ Failed to get a pickup line. Try again!");

        await reply(`💝 *Pickup Line* 💝\n\n"${data.pickupline}"\n\n_Use wisely!_`);

    } catch (error) {
        console.error('Pickup Error:', error);
        reply("❌ My charm isn't working right now. Try again later!");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.pickup, .pickupline, .flirtline)
// ==========================================
cmd({
    pattern: "pickup",
    alias: ["pickupline", "flirtline"],
    desc: "Get a random pickup line",
    react: "💘",
    category: "fun",
    use: '.pickup',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await getPickupLine(conn, mek, m, { from, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (pickup, pickupline, flirtline)
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
    prefix
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Pickup triggers (bina prefix)
        const pickupTriggers = ["pickup", "pickupline", "flirtline"];

        // Check: exact match?
        if (!pickupTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Pickup line fetch karo
        await getPickupLine(conn, mek, { }, {
            from,
            reply: replyFn
        });

    } catch (error) {
        console.error("Pickup No-Prefix Error:", error);
    }
});
