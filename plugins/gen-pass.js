import crypto from 'crypto';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — strong password generate karne ke liye
// ==========================================
async function generateStrongPassword(conn, mek, m, { from, args, reply }) {
    try {
        const length = args[0] ? parseInt(args[0]) : 12;

        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (Minimum 08 Characters).');
        }

        if (length > 100) {
            return reply('❌ Maximum length 100 characters tak hi allowed hai!');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password🤕: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.gpass)
// ==========================================
cmd({
    pattern: "gpass",
    desc: "Generate a strong password.",
    category: "other",
    react: "🔐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await generateStrongPassword(conn, mek, m, { from, args, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (gpass, password, passgen)
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
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Gpass triggers (bina prefix)
        const gpassTriggers = ["gpass", "password", "passgen", "genpass"];

        // Check: kya pehla word trigger hai?
        if (!gpassTriggers.includes(firstWord)) return;

        // Baaki text (length arg)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Password generate karo
        await generateStrongPassword(conn, mek, { }, {
            from,
            args,
            reply: replyFn
        });

    } catch (error) {
        console.error("Gpass No-Prefix Error:", error);
    }
});
