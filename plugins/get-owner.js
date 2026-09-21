import { cmd } from '../command.js';
import config from '../config.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — owner contact bhejne ke liye
// ==========================================
async function sendOwnerContact(sock, mek, m, { from, userConfig }) {
    try {
        // Get values from userConfig with fallback to config
        const OWNER_NUMBER = userConfig?.OWNER_NUMBER || config.OWNER_NUMBER || "0000000000";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Bot Owner";
        const TEAM_NAME = "AHMAD-MD TEAM";

        await sock.sendPresenceUpdate("composing", from);

        const vcard =
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            `FN:${OWNER_NAME}\n` +
            `ORG:${TEAM_NAME};\n` +
            `TEL;type=CELL;type=VOICE;waid=${OWNER_NUMBER}:${'+' + OWNER_NUMBER}\n` +
            'END:VCARD';

        await sock.sendMessage(from, {
            contacts: {
                displayName: OWNER_NAME,
                contacts: [{ vcard }]
            }
        });

        await sock.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.error("Error sending contact:", e);
        await sock.sendMessage(from, {
            text: `❌ Couldn't send contact:\n${e.message}`
        });
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.owner)
// ==========================================
cmd({
    pattern: "owner",
    desc: "Get owner number",
    category: "main",
    react: "💀",
    filename: __filename
}, async (sock, m, msg, { from, userConfig }) => {
    await sendOwnerContact(sock, m, m, { from, userConfig });
});

// ==========================================
// 📌 2. Bina prefix wala handler (owner, admin, contact)
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

        // Owner triggers (bina prefix)
        const ownerTriggers = ["owner", "admin", "contact"];

        // Check: exact match?
        if (!ownerTriggers.includes(userText)) return;

        // Owner contact bhejo
        await sendOwnerContact(conn, mek, { }, {
            from,
            userConfig
        });

    } catch (error) {
        console.error("Owner No-Prefix Error:", error);
    }
});
