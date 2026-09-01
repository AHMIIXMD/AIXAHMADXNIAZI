import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Global Object to store AFK data temporarily
global.afkData = global.afkData || {};

cmd({
    pattern: "afk",
    alias: ["away"],
    desc: "Set AFK status when you are away",
    category: "misc",
    react: "💤",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, sender }) => {
    try {
        const args = text?.trim() || "";

        // Turn OFF AFK mode (.afk off)
        if (args.toLowerCase() === "off") {
            if (!global.afkData[sender]) {
                return reply("❌ *You are not in AFK mode!*");
            }
            
            delete global.afkData[sender];
            return reply("✅ *Your AFK mode has been turned off.*");
        }

        // Usage command if no reason is provided (.afk)
        if (!args) {
            return reply(
                `💤 *AFK Usage Guide:*\n\n` +
                `*Turn ON AFK:* \`.afk [reason]\` (Example: \`.afk Sleeping\`)\n` +
                `*Turn OFF AFK:* \`.afk off\`\n\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            );
        }

        // Set AFK Status Logic
        const timeNow = Math.floor(Date.now() / 1000);
        global.afkData[sender] = {
            reason: args,
            time: timeNow
        };

        return reply(`💤 *You are now AFK!*\n\n📝 *Reason:* ${args}`);

    } catch (error) {
        reply(`❌ *Error:* ${error.message}`);
    }
});
