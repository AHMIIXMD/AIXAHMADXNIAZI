import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — random member select karne ke liye
// ==========================================
async function selectRandomMember(conn, mek, m, { isGroup, groupMetadata, reply, type }) {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups!");
        if (!groupMetadata?.participants) return reply("⚠️ Couldn't fetch group members.");

        const botNumber = conn.user.id;
        const participants = groupMetadata.participants.filter(p => p.id !== botNumber);

        if (participants.length < 1) return reply("❌ No eligible participants found!");

        const randomUser = participants[Math.floor(Math.random() * participants.length)];

        let text = "";
        if (type === "bacha") {
            text = `👦 *Yeh lo tumhara Bacha!*\n\n@${randomUser.id.split('@')[0]} is your handsome boy! 😎`;
        } else {
            text = `👧 *Yeh lo tumhari Bachi!*\n\n@${randomUser.id.split('@')[0]} is your beautiful girl! 💖`;
        }

        await conn.sendMessage(
            mek.chat || m.chat,
            {
                text: text,
                mentions: [randomUser.id]
            },
            { quoted: mek }
        );
    } catch (error) {
        console.error(`Error in .${type} command:`, error);
        reply(`❌ An error occurred while selecting a ${type === "bacha" ? "boy" : "girl"}.`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.bacha, .larka)
// ==========================================
cmd({
    pattern: "bacha",
    alias: ["larka"],
    desc: "Randomly selects a boy from the group",
    react: "👦",
    category: "fun",
    filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
    await selectRandomMember(conn, mek, mek, { isGroup, groupMetadata, reply, type: "bacha" });
});

// ==========================================
// 📌 2. Prefix wala handler (.bachi, .kuri, .larki)
// ==========================================
cmd({
    pattern: "bachi",
    alias: ["kuri", "larki"],
    desc: "Randomly selects a girl from the group",
    react: "👧",
    category: "fun",
    filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
    await selectRandomMember(conn, mek, mek, { isGroup, groupMetadata, reply, type: "bachi" });
});

// ==========================================
// 📌 3. Bina prefix wala handler (saare triggers)
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

        // Boy triggers (bina prefix)
        const boyTriggers = ["bacha", "larka"];

        // Girl triggers (bina prefix)
        const girlTriggers = ["bachi", "kuri", "larki"];

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Boy check
        if (boyTriggers.includes(userText)) {
            await selectRandomMember(conn, mek, { chat: from }, {
                isGroup,
                groupMetadata,
                reply: replyFn,
                type: "bacha"
            });
            return;
        }

        // Girl check
        if (girlTriggers.includes(userText)) {
            await selectRandomMember(conn, mek, { chat: from }, {
                isGroup,
                groupMetadata,
                reply: replyFn,
                type: "bachi"
            });
            return;
        }

    } catch (error) {
        console.error("Bacha/Bachi No-Prefix Error:", error);
    }
});
