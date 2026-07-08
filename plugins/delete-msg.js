import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ================== DELETE COMMAND ====================
cmd({
    pattern: "delete",
    alias: ["del", "dlt"],
    desc: "Delete a quoted message",
    category: "group",
    react: "🗑️",
    filename: __filename
}, async (conn, mek, m, {
    from,
    isCreator,
    isGroup,
    reply
}) => {
    try {
        // Check if it's a group
        if (!isGroup) return reply('❌ This command can only be used in groups!');
        
        // Check if sender is creator
        if (!isCreator) return reply('❌ Only the bot creator can use this command!');
        
        // Check if message is quoted
        if (!m.quoted) return reply('❌ Please reply to a message to delete it!');
        
        // Create the delete key
        const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        };
        
        // Delete the quoted message
        await conn.sendMessage(m.chat, { delete: key });
        
        // Optional: Send confirmation (can be removed if you don't want any response)
        await reply('✅ Message deleted successfully!');
        
    } catch (err) {
        console.error(err);
        await reply('❌ Failed to delete message. Something went wrong.');
    }
});
