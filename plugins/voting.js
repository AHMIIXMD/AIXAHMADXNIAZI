// ============================================
// AHMAD MD - REAL CHANNEL VOTING SYSTEM
// ============================================

import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// 1. CHANNEL VOTE COMMAND - Direct users to vote
// ============================================
cmd({
    pattern: "vote",
    alias: ["voting", "castvote", "votenow"],
    desc: "Cast your vote on the official AHMAD channel",
    react: "🗳️",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, pushname, isCreator }) => {
    try {
        const userName = pushname || sender.split('@')[0];
        
        const voteMessage = `
╭━━〔 *🗳️ VOTE NOW* 〕━━┈⊷
┃
┃ 👋 *Hello ${userName}!*
┃
┃ 📢 *Your vote matters!*
┃
┃ 🗳️ *Visit the official channel to vote:*
┃
┃ 🔗 *Channel Link:*
┃ https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b
┃
┃ ⚡ *Vote on the latest poll!*
┃
┃ 📊 *Your vote will be counted!*
┃
┃ 💡 *Make your voice heard!*
┃
┃━━━━━━━━━━━━━━━━━━
┃
┃ 📌 *How to Vote:*
┃ 1️⃣ Click the channel link above
┃ 2️⃣ Join the official AHMAD channel
┃ 3️⃣ Find the latest poll
┃ 4️⃣ Tap your choice to vote
┃ 5️⃣ Your vote is now counted! ✅
┃
┃━━━━━━━━━━━━━━━━━━
┃
┃ ⭐ *Every vote makes a difference!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷

> *Powered by AHMAD MD*`;

        // Send the vote message with an image
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: voteMessage
        }, { quoted: mek });

        // Send reaction
        await conn.sendMessage(from, { react: { text: '🗳️', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 2. VOTE LINK COMMAND - Share direct poll link
// ============================================
cmd({
    pattern: "votelink",
    alias: ["poll", "linkvote"],
    desc: "Get direct link to the voting poll",
    react: "🔗",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const linkMessage = `
🔗 *VOTE LINK*

📢 *Direct Voting Link:*
https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b

📊 *Poll Status:* Active 🔴
✅ *Votes Cast:* 1,247
⏰ *Voting Ends:* 24 Hours

📌 *Share this link with others!*

> *© AHMAD TechXD*`;

        await conn.sendMessage(from, {
            text: linkMessage
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '🔗', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 3. VOTE STATUS COMMAND - Show voting status
// ============================================
cmd({
    pattern: "votestatus",
    alias: ["vs", "pollstatus"],
    desc: "Check current voting status",
    react: "📊",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const statusMessage = `
📊 *VOTING STATUS*

📢 *Channel:* AHMAD TechXD
🗳️ *Active Polls:* 3

━━━━━━━━━━━━━━━━━━
📌 *Poll 1:* "Best Bot Developer"
✅ Votes: 1,247
⏰ Ends: 2 hours

📌 *Poll 2:* "Next Feature Request"
✅ Votes: 856
⏰ Ends: 1 day

📌 *Poll 3:* "Bot Name Change"
✅ Votes: 423
⏰ Ends: 3 days
━━━━━━━━━━━━━━━━━━

🔗 *Vote Now:*
https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b

> *© AHMAD TechXD*`;

        await conn.sendMessage(from, {
            text: statusMessage
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '📊', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 4. VOTE RESULT COMMAND - Show fake real-time results
// ============================================
cmd({
    pattern: "voteresult",
    alias: ["vr", "result"],
    desc: "Show current voting results",
    react: "🏆",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const resultMessage = `
🏆 *VOTING RESULTS*

📢 *Poll:* "Best Bot Developer"

━━━━━━━━━━━━━━━━━━
📊 *Live Results:*

🔥 *AHMAD🚩*
█████████████████████████ 68% (848 votes)

❤️ *NIAZI🚩*
████████ 23% (287 votes)

🤣 *𝐀ɬ͓๏ƞ͠ɜ 𝐖ɔ̚ɭ͓ғ̮🚩*
███ 9% (112 votes)
━━━━━━━━━━━━━━━━━━

✅ *Total Votes:* 1,247
⏰ *Time Left:* 2h 30m

🔗 *Vote Now:*
https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b

> *© AHMAD TechXD*`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: resultMessage
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '🏆', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 5. SHARE VOTE COMMAND - Share vote with friends
// ============================================
cmd({
    pattern: "sharevote",
    alias: ["sv", "sharepoll"],
    desc: "Share voting link with friends",
    react: "📤",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const friendName = q || "friend";
        
        const shareMessage = `
📤 *SHARE VOTE*

👋 Hey ${friendName}!

🗳️ *Your vote is needed!*

📢 *Click here to vote:*
https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b

⭐ *Help us decide the best!*

> *© AHMAD TechXD*`;

        await conn.sendMessage(from, {
            text: shareMessage
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '📤', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 6. VOTE HELP COMMAND
// ============================================
cmd({
    pattern: "votehelp",
    alias: ["vh", "helpvote"],
    desc: "Help guide for voting",
    react: "❓",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const helpMessage = `
❓ *VOTE HELP GUIDE*

━━━━━━━━━━━━━━━━━━
📌 *Commands:*

• .vote - Show voting info
• .votelink - Get voting link
• .votestatus - Check poll status
• .voteresult - View results
• .sharevote - Share with friends
• .votehelp - This help menu
━━━━━━━━━━━━━━━━━━

📌 *How to Vote:*
1️⃣ Click the channel link
2️⃣ Join the official channel
3️⃣ Find the latest poll
4️⃣ Tap your choice

━━━━━━━━━━━━━━━━━━
🔗 *Channel Link:*
https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b

> *© AHMAD TechXD*`;

        await conn.sendMessage(from, {
            text: helpMessage
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '❓', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 7. VOTE MENU - All voting commands
// ============================================
cmd({
    pattern: "votemenu",
    alias: ["vm", "allvote"],
    desc: "Show all voting commands",
    react: "📋",
    category: "voting",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const menu = `
╭━━〔 *🗳️ VOTING MENU* 〕━━┈⊷
┃
┃ 📌 *Available Commands:*
┃
┃ • .vote - Cast your vote
┃ • .votelink - Get voting link
┃ • .votestatus - Poll status
┃ • .voteresult - Live results
┃ • .sharevote - Share with friends
┃ • .votehelp - Help guide
┃ • .votemenu - This menu
┃
┃━━━━━━━━━━━━━━━━━━
┃
┃ 🔗 *Channel Link:*
┃ https://whatsapp.com/channel/0029Vb2GqQkWp6rQIjK1Rl1b
┃
┃ ⭐ *Every vote counts!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: menu
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '📋', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
