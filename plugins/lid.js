import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// COMMAND 1: Get Your Own LID
// ============================================
cmd({
  pattern: "my",
  alias: ["my", "li", "io"],
  react: "🆔",
  desc: "Get your WhatsApp LID/ID",
  category: "general",
  use: ".my",
  filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
  try {
    const myId = sender || m.sender || mek.key.remoteJid;
    
    let msg = `╔══════════════════════╗\n`;
    msg += `║      🆔 *YOUR ID*      ║\n`;
    msg += `╚══════════════════════╝\n\n`;
    msg += `📱 *ID:* ${myId}\n\n`;
    msg += `📌 *Type:* ${myId.includes('@lid') ? 'LID' : 'Phone Number'}\n`;
    msg += `🔹 *Status:* Active\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💡 *Use this ID in SUDO list!*`;
    
    await reply(msg);
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// COMMAND 2: Get Someone Else's LID (Reply)
// ============================================
cmd({
  pattern: "getid",
  alias: ["getlid", "gid"],
  react: "🔍",
  desc: "Get LID of replied user",
  category: "general",
  use: "Reply to a message and type .getid",
  filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
  try {
    if (!m.quoted) {
      return reply(`❌ *Reply to a user's message!*\n\n📌 *Usage:* Reply to any message and type .getid`);
    }

    const targetId = m.quoted.sender || m.quoted.key.remoteJid;
    const targetName = m.quoted.pushName || 'Unknown User';

    let msg = `╔══════════════════════╗\n`;
    msg += `║    🔍 *USER ID*       ║\n`;
    msg += `╚══════════════════════╝\n\n`;
    msg += `👤 *Name:* ${targetName}\n`;
    msg += `📱 *ID:* ${targetId}\n\n`;
    msg += `📌 *Type:* ${targetId.includes('@lid') ? 'LID' : 'Phone Number'}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💡 *Add to SUDO or BAN list!*`;

    await reply(msg);
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// COMMAND 3: Get All Group Members LIDs
// ============================================
cmd({
  pattern: "groupids",
  alias: ["allids", "gids"],
  react: "📋",
  desc: "Get LIDs of all group members",
  category: "group",
  use: ".groupids",
  filename: __filename
},
async (conn, mek, m, { from, isGroup, participants, reply, isCreator }) => {
  try {
    if (!isGroup) {
      return reply("❌ This command can only be used in groups.");
    }

    // Check if admin or owner
    const isAdmin = m.isAdmin || false;
    if (!isAdmin && !isCreator) {
      return reply("❌ Only admins can use this command.");
    }

    if (!participants || participants.length === 0) {
      return reply("❌ No participants found.");
    }

    let msg = `╔════════════════════════════╗\n`;
    msg += `║   📋 *GROUP MEMBERS*       ║\n`;
    msg += `╚════════════════════════════╝\n\n`;
    msg += `👥 *Total:* ${participants.length} members\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Limit to 50 participants to avoid message too long
    const maxShow = 50;
    let count = 0;
    
    for (let p of participants) {
      if (count >= maxShow) break;
      const id = p.id || p;
      const name = p.name || p.notify || 'Unknown';
      const isAdmin = p.admin ? '👑' : '👤';
      msg += `${isAdmin} *${name}*\n`;
      msg += `   └─ 📱 ${id}\n\n`;
      count++;
    }

    if (participants.length > maxShow) {
      msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `⚠️ *Showing ${maxShow}/${participants.length} members*\n`;
      msg += `💡 Use .myid to get your own ID\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💡 *Copy IDs to use in SUDO/BAN list!*`;

    await reply(msg);
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// COMMAND 4: Copy LID to Clipboard (Tag)
// ============================================
cmd({
  pattern: "copylid",
  alias: ["clid"],
  react: "📋",
  desc: "Copy LID of tagged user",
  category: "general",
  use: ".copylid @user",
  filename: __filename
},
async (conn, mek, m, { from, reply, participants }) => {
  try {
    // Check if someone is mentioned
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
      return reply(`❌ *Tag a user!*\n\n📌 *Usage:* .copylid @username`);
    }

    const targetId = m.mentionedJid[0];
    
    // Find the mentioned user
    let userName = 'Unknown';
    if (participants) {
      const found = participants.find(p => p.id === targetId);
      if (found) userName = found.name || found.notify || 'Unknown';
    }

    let msg = `╔══════════════════════╗\n`;
    msg += `║   📋 *LID COPIED*     ║\n`;
    msg += `╚══════════════════════╝\n\n`;
    msg += `👤 *User:* ${userName}\n`;
    msg += `📱 *LID:* ${targetId}\n\n`;
    msg += `🔹 *Status:* Ready to use\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `✅ *Copy this ID and use it!*\n\n`;
    msg += `💡 *Example:*\n`;
    msg += `SUDO: ["${targetId}"]`;

    await reply(msg);
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
