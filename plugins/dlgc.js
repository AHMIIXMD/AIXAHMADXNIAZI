import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — group status delete karne ke liye
// ==========================================
async function deleteGCStatus(conn, mek, m, { from, reply, isCreator, isAdmins }) {
    // ── Owner ya Admin verification ──
    if (!isCreator && !isAdmins) {
        return reply("❌ This command is only for *Group Admins* or the *Bot Owner*!");
    }

    try {
        const quotedMsg = m.quoted;

        if (!quotedMsg) {
            return reply("⚠️ *Please reply to the group status or message you want to delete!*");
        }

        const keyToDelete = {
            remoteJid: from,
            fromMe: quotedMsg.fromMe || false,
            id: quotedMsg.id,
            participant: quotedMsg.sender
        };

        // Message delete trigger
        await conn.sendMessage(from, { delete: keyToDelete });

        return reply("✅ *Status/Message delete request sent!*");

    } catch (error) {
        reply(`❌ *Failed to delete:* ${error.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.delgcstatus, .delgstatus, .delstatus)
// ==========================================
cmd({
    pattern: "delgcstatus",
    alias: ["delgstatus", "delstatus"],
    desc: "Delete group status for everyone.",
    category: "group",
    react: "🗑️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, isAdmins }) => {
    await deleteGCStatus(conn, mek, m, { from, reply, isCreator, isAdmins });
});

// ==========================================
// 📌 2. Bina prefix wala handler (delgcstatus, delgstatus, delstatus)
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
    isAdmins,
    quoted
}) => {
    try {
        // 🔒 SIRF GROUP
        if (!isGroup) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Delete GC Status triggers (bina prefix)
        const delTriggers = ["delgcstatus", "delgstatus", "delstatus"];

        // Check: exact match?
        if (!delTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Delete karo
        await deleteGCStatus(conn, mek, {
            quoted: quoted
        }, {
            from,
            reply: replyFn,
            isCreator,
            isAdmins
        });

    } catch (error) {
        console.error("DelGCStatus No-Prefix Error:", error);
    }
});
