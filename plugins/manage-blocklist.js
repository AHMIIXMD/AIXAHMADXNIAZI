// Ahmad

import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — block/unblock karne ke liye
// ==========================================
async function handleBlockAction(conn, mek, m, { reply, q, react, action }) {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (mek.sender !== botOwner) {
        if (react) await react("❌");
        return reply("Only the bot owner can use this command.");
    }

    let jid;
    if (mek.quoted) {
        jid = mek.quoted.sender;
    } else if (mek.mentionedJid && mek.mentionedJid.length > 0) {
        jid = mek.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        if (react) await react("❌");
        return reply("Please mention a user or reply to their message.");
    }

    try {
        await conn.updateBlockStatus(jid, action);

        if (react) await react("✅");

        const actionText = action === "block" ? "blocked" : "unblocked";
        reply(`Successfully ${actionText} @${jid.split("@")[0]}`, { mentions: [jid] });

    } catch (error) {
        console.error(`${action} command error:`, error);
        if (react) await react("❌");
        reply(`Failed to ${action} the user.`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.block)
// ==========================================
cmd({
    pattern: "block",
    desc: "Blocks a person",
    category: "owner",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { reply, q, react }) => {
    await handleBlockAction(conn, mek, m, { reply, q, react, action: "block" });
});

// ==========================================
// 📌 2. Prefix wala handler (.unblock)
// ==========================================
cmd({
    pattern: "unblock",
    desc: "Unblocks a person",
    category: "owner",
    react: "🔓",
    filename: __filename
}, async (conn, mek, m, { reply, q, react }) => {
    await handleBlockAction(conn, mek, m, { reply, q, react, action: "unblock" });
});

// ==========================================
// 📌 3. Bina prefix wala handler (block, unblock)
// 🔒 SIRF OWNER — pehle se har command mein check hai
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
    mentionedJid,
    quoted
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Block/Unblock triggers (bina prefix)
        const blockTriggers = {
            "block": "block",
            "unblock": "unblock"
        };

        // Check: kya pehla word trigger hai?
        const matchedAction = blockTriggers[firstWord];
        if (!matchedAction) return;

        // Baaki text (number/mention)
        const restText = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text, opts) => {
            const msgOpts = opts?.mentions
                ? { text, mentions: opts.mentions }
                : { text };
            await conn.sendMessage(from, msgOpts, { quoted: mek });
        };

        // React function
        const reactFn = async (emoji) => {
            try {
                await conn.sendMessage(from, { react: { text: emoji, key: mek.key } });
            } catch (e) {}
        };

        // Block/Unblock karo
        await handleBlockAction(conn, mek, {
            sender: sender,
            quoted: quoted,
            mentionedJid: mentionedJid
        }, {
            reply: replyFn,
            q: restText,
            react: reactFn,
            action: matchedAction
        });

    } catch (error) {
        console.error("Block/Unblock No-Prefix Error:", error);
    }
});
