import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — saare admins dismiss karne ke liye
// ==========================================
async function dismissAllAdmins(conn, mek, m, { from, isCreator, isBotAdmins, isAdmins, isGroup, reply, botNumber }) {
    try {
        if (!isGroup) return await reply("⚠️ This command only works in groups.");
        if (!isBotAdmins) return await reply("❌ I must be admin to use this command.");
        if (!isAdmins && !isCreator) return await reply("🔐 Only group admins or owner can use this command.");

        const groupMetadata = await conn.groupMetadata(from);
        const ownerJid = conn.user.id.split(":")[0] + '@s.whatsapp.net';
        const botJid = botNumber.endsWith('@s.whatsapp.net') ? botNumber : botNumber + '@s.whatsapp.net';

        const admins = groupMetadata.participants
            .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
            .map(p => p.id);

        if (admins.length === 0) return await reply("⚠️ No admins found to dismiss.");

        // Exclude bot and owner
        const targets = admins.filter(jid => jid !== botJid && jid !== ownerJid);

        if (targets.length === 0) return await reply("✅ No eligible admins to dismiss (bot and owner excluded).");

        await conn.groupParticipantsUpdate(from, targets, "demote");

        await reply(`🚫 *Dismissed Successfully All Admins*`, { mentions: targets });

    } catch (err) {
        console.error(err);
        await reply("❌ Failed to dismiss admins. Something went wrong.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.dismissall, .disall)
// ==========================================
cmd({
    pattern: "dismissall",
    alias: ["disall"],
    desc: "Remove admin rights from all admins except bot and owner",
    category: "group",
    react: "⚔️",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, isBotAdmins, isAdmins, isGroup, reply, botNumber }) => {
    await dismissAllAdmins(conn, mek, m, { from, isCreator, isBotAdmins, isAdmins, isGroup, reply, botNumber });
});

// ==========================================
// 📌 2. Bina prefix wala handler (dismissall, disall)
// 🔒 Sirf GROUP + Admin/Owner
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
    isBotAdmins,
    isAdmins,
    botNumber
}) => {
    try {
        // 🔒 SIRF GROUP
        if (!isGroup) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Dismissall triggers (bina prefix)
        const dismissTriggers = ["dismissall", "disall"];

        // Check: exact match?
        if (!dismissTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text, opts) => {
            const msgOpts = opts?.mentions
                ? { text, mentions: opts.mentions }
                : { text };
            await conn.sendMessage(from, msgOpts, { quoted: mek });
        };

        // Dismissall chalao
        await dismissAllAdmins(conn, mek, { }, {
            from,
            isCreator,
            isBotAdmins,
            isAdmins,
            isGroup,
            reply: replyFn,
            botNumber
        });

    } catch (error) {
        console.error("DismissAll No-Prefix Error:", error);
    }
});
