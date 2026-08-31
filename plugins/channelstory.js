cmd({
    pattern: "channelstory",
    alias: ["cstory"],
    desc: "Send channel story update to groups",
    category: "group",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    if (!isCreator) return reply("❌ Only owner!");

    const channelLink = "https://whatsapp.com/channel/002Va..."; // Apna channel link daalein
    const storyText = text || "📢 New Story/Status Update!";
    
    const mentionedJid = [m.sender];
    const contextInfo = { 
        mentionedJid, 
        forwardedNewsletter: {
            newsletterJid: "120363...@newsletter", // Apna channel JID
            newsletterName: "Your Channel Name",
            serverMessageId: "123456789"
        }
    };

    await conn.sendMessage(from, {
        text: `📢 *${storyText}*\n\n🔗 ${channelLink}`,
        contextInfo
    });

    reply("✅ Channel story update sent!");
});


cmd({
    pattern: "channelpost",
    alias: ["cpost"],
    desc: "Post media as channel story update",
    category: "group",
    react: "📸",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator, quoted }) => {

    if (!isCreator) return reply("❌ Only owner!");

    if (!quoted) return reply("❌ Reply to an image/video!");
    
    const media = await quoted.download();
    const caption = text || "📌 New Channel Update!";
    
    // Send as channel style message
    await conn.sendMessage(from, {
        image: media,
        caption: `📢 *Channel Story Update*\n\n${caption}`,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletter: {
                newsletterJid: "120363...@newsletter",
                newsletterName: "Your Channel",
                serverMessageId: Date.now().toString()
            }
        }
    });

    reply("✅ Posted as channel story!");
});
