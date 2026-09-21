import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — couples PP fetch karne ke liye
// ==========================================
async function getCouplesPP(conn, mek, m, { from, args, reply }) {
    try {
        // Send fetching message
        await reply("*💫 Fetching Couples Profile Pictures...*");

        // React: Processing ⏳
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const apiUrl = `https://okatsu-rolezapiiz.vercel.app/random/ppcp`;
        const { data } = await axios.get(apiUrl);

        if (data.status && data.result) {
            // Send male picture
            await conn.sendMessage(from, {
                image: { url: data.result.cowo },
                caption: "👦 *Male Profile Picture*"
            }, { quoted: mek });

            // Send female picture
            await conn.sendMessage(from, {
                image: { url: data.result.cewe },
                caption: "👩 *Female Profile Picture*"
            });

            // React: Success ✅
            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        } else {
            reply("❌ Failed to fetch couples pictures. Please try again.");
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }
    } catch (error) {
        console.error("Couples PP Error:", error);
        reply("❌ An error occurred while fetching couples pictures.");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.cpp, .couplepp, .couplepic, .couple)
// ==========================================
cmd({
    pattern: "cpp",
    alias: ["couplepp", "couplepic", "couple"],
    react: "💑",
    desc: "Get matching couples profile pictures.",
    category: "utility",
    use: ".cpp",
    filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
    await getCouplesPP(conn, m, m, { from, args, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (cpp, couplepp, couplepic, couple)
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

        // CPP triggers (bina prefix)
        const cppTriggers = ["cpp", "couplepp", "couplepic", "couple"];

        // Check: exact match?
        if (!cppTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Couples PP fetch karo
        await getCouplesPP(conn, mek, mek, {
            from,
            args: [],
            reply: replyFn
        });

    } catch (error) {
        console.error("CouplesPP No-Prefix Error:", error);
    }
});
