cmd({
    pattern: "cpost",
    alias: ["cchannel", "postch"],
    desc: "Reply wale message ko channel mein post ya forward karta hai",
    category: "owner",
    use: ".cpost <Channel JID or Link>",
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, q, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ Yeh command sirf bot owner use kar sakta hai!");

        // 1. Quoted message (reply) check karna
        if (!m.quoted) {
            return reply("❌ Kisi message, media ya audio ke reply mein `.cpost <channel_jid>` likhein!");
        }

        // 2. Channel JID extract karna
        let channelJid = args[0];

        if (!channelJid) {
            return reply("❌ Channel ki JID ya link provide karein!\nExample: `.cpost 120363xxx@newsletter`");
        }

        // Agar user ne full link diya ho to JID extract karein
        if (channelJid.includes("whatsapp.com/channel/")) {
            channelJid = channelJid.split("whatsapp.com/channel/")[1].split("/")[0] + "@newsletter";
        } else if (!channelJid.endsWith("@newsletter")) {
            channelJid = channelJid.trim() + "@newsletter";
        }

        // 3. Message structure prepare karna forward/post ke liye
        let targetMessage = m.quoted.fakeObj ? m.quoted.fakeObj : m.quoted;

        // Forwarding message to channel
        await conn.sendMessage(channelJid, { 
            forward: targetMessage 
        }, { 
            quoted: null 
        });

        return reply("✅ Content success fully channel me post kar diya gaya hai!");

    } catch (e) {
        console.error("Cpost Error:", e);
        return reply(`❌ Post karne me error aya: ${e.message}`);
    }
});
