import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "delgcstatus",
    alias: ["delgstatus", "delstatus"],
    desc: "Delete group status for everyone (Admin & Owner only).",
    category: "group",
    react: "🗑️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, isAdmins, isBotAdmin }) => {

    // ── Check if User is Owner or Group Admin ──
    if (!isCreator && !isAdmins) {
        return reply("❌ This command is only for *Group Admins* or the *Bot Owner*!");
    }

    if (!isBotAdmin) {
        return reply("❌ *Please make the bot an admin first to delete messages for everyone!*");
    }

    try {
        const quotedMsg = m.quoted;

        if (!quotedMsg) {
            return reply("⚠️ *Please reply to the group status or message you want to delete!*");
        }

        // Target message ki key banana taaki delete for everyone chal sake
        const keyToDelete = {
            remoteJid: from,
            fromMe: quotedMsg.fromMe || false,
            id: quotedMsg.id,
            participant: quotedMsg.sender
        };

        // Delete for Everyone command
        await conn.sendMessage(from, { delete: keyToDelete });

        return reply("✅ *Status/Message successfully deleted for everyone by Admin!*");

    } catch (error) {
        reply(`❌ *Failed to delete:* ${error.message}`);
    }
});
