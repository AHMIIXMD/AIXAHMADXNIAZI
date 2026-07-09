// AHMAD TechX

import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "getpp",
    alias: ["profile", "getdp"],
    react: "🚀",
    desc: "Sends profile picture by number, mention or reply",
    category: "other",
    use: ".getpp <number> OR reply OR mention",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {

    try {

        let targetJid = null;

        // No input
        if (
            (!args || args.length === 0 || !args.join(" ").trim()) &&
            (!m.mentionedJid || m.mentionedJid.length === 0) &&
            !m.quoted
        ) {
            return reply(
                `ℹ️ *Usage:*\n` +
                `• .getpp 923xxxxxxxxx\n` +
                `• Reply to someone's message\n` +
                `• Mention someone in group`
            );
        }

        // Number input
        const argText = args.join(" ").trim();

        if (argText && argText.match(/[0-9]/)) {

            let phone = argText.replace(/[^0-9]/g, "");

            if (phone.length >= 8 && phone.length <= 15) {
                targetJid = phone + "@s.whatsapp.net";
            } else {
                return reply("❌ Invalid phone number");
            }

        }

        // Mention
        else if (m.mentionedJid && m.mentionedJid.length > 0) {
            targetJid = m.mentionedJid[0];
        }

        // Reply
        else if (m.quoted) {
            targetJid = m.quoted.sender;
        }

        // Final check
        if (!targetJid) {
            return reply("❌ User not found");
        }

        // Fix JID
        if (!targetJid.includes("@")) {
            targetJid += "@s.whatsapp.net";
        }

        let ppUrl;

        try {

            // Fetch profile picture
            ppUrl = await conn.profilePictureUrl(targetJid, "image");

            let userName = targetJid.split("@")[0];

            // Send image
            await conn.sendMessage(
                from,
                {
                    image: { url: ppUrl },
                    caption:
                        `> *Profile Pic Downloaded Successfully* ✅\n` +
                        `*User:* ${userName}`
                },
                { quoted: mek }
            );

            // React
            await conn.sendMessage(from, {
                react: {
                    text: "✅",
                    key: mek.key
                }
            });

        } catch (fetchError) {

            console.log("Profile Fetch Error:", fetchError);

            return reply(
                "❌ Cannot fetch profile picture\n\n" +
                "Possible reasons:\n" +
                "• User has no profile picture\n" +
                "• Privacy settings blocked access\n" +
                "• Number is not on WhatsApp"
            );
        }

    } catch (e) {

        console.log("getpp command error:", e);

        reply("❌ Error while processing command");
    }
});
