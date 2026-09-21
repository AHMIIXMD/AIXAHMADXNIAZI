import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — quoted message delete karne ke liye
// ==========================================
async function deleteMessage(conn, mek, m, { from, isCreator, isGroup, reply }) {
    try {
        // Check if it's a group
        if (!isGroup) return reply('❌ This command can only be used in groups!');

        // Check if sender is creator
        if (!isCreator) return reply('❌ Only the bot creator can use this command!');

        // Check if message is quoted
        if (!m.quoted) return reply('❌ Please reply to a message to delete it!');

        // Create the delete key
        const key = {
            remoteJid: m.chat || from,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        };

        // Delete the quoted message
        await conn.sendMessage(m.chat || from, { delete: key });

        // Optional: Send confirmation
        await reply('✅ Message deleted successfully!');

    } catch (err) {
        console.error(err);
        await reply('❌ Failed to delete message. Something went wrong.');
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.delete, .del, .dlt)
// ==========================================
cmd({
    pattern: "delete",
    alias: ["del", "dlt"],
    desc: "Delete a quoted message",
    category: "group",
    react: "🗑️",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, isGroup, reply }) => {
    await deleteMessage(conn, mek, m, { from, isCreator, isGroup, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (delete, del, dlt)
// 🔒 Sirf OWNER — extra security
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
    quoted
}) => {
    try {
        // 🔒 SIRF OWNER — warna koi bhi messages delete kar dega
        if (!isCreator) return;

        // 🔒 SIRF GROUP — private mein zaroorat nahi
        if (!isGroup) return;

        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Delete triggers (bina prefix)
        const deleteTriggers = ["delete", "del", "dlt"];

        // Check: exact match?
        if (!deleteTriggers.includes(userText)) return;

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Delete message
        await deleteMessage(conn, mek, {
            quoted: quoted,
            chat: from
        }, {
            from,
            isCreator,
            isGroup,
            reply: replyFn
        });

    } catch (error) {
        console.error("Delete No-Prefix Error:", error);
    }
});
