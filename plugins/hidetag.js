import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Fixed & Created By AHMAD TechX
cmd({
  pattern: "hidetag",
  alias: ["tag", "h"],  
  react: "🔊",
  desc: "To Tag all Members for Any Message/Media",
  category: "group",
  use: '.hidetag Hello',
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isCreator, isAdmins,
  participants, reply
}) => {
  try {
    const isUrl = (url) => {
      return /https?:\/\/(www\.)?[\w\-@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w\-@:%_\+.~#?&//=]*)/.test(url);
    };

    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!isAdmins && !isCreator) return reply("❌ Only group admins can use this command.");

    const mentionAll = { mentions: participants.map(u => u.id) };

    // If no message or reply is provided
    if (!q && !m.quoted) {
      return reply("❌ Please provide a message or reply to a message to tag all members.");
    }

    // Get the original message text with proper formatting
    let messageToSend = '';
    
    // If there is a quoted message
    if (m.quoted) {
      const type = m.quoted.mtype || '';
      
      // If it's a text message
      if (type === 'extendedTextMessage') {
        messageToSend = m.quoted.text || 'No message content found.';
      }
      // Handle media messages
      else if (['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)) {
        try {
          const buffer = await m.quoted.download?.();
          if (!buffer) return reply("❌ Failed to download the quoted media.");

          let content;
          switch (type) {
            case "imageMessage":
              content = { image: buffer, caption: m.quoted.text || "📷 Image", ...mentionAll };
              break;
            case "videoMessage":
              content = { 
                video: buffer, 
                caption: m.quoted.text || "🎥 Video", 
                gifPlayback: m.quoted.message?.videoMessage?.gifPlayback || false, 
                ...mentionAll 
              };
              break;
            case "audioMessage":
              content = { 
                audio: buffer, 
                mimetype: "audio/mp4", 
                ptt: m.quoted.message?.audioMessage?.ptt || false, 
                ...mentionAll 
              };
              break;
            case "stickerMessage":
              content = { sticker: buffer, ...mentionAll };
              break;
            case "documentMessage":
              content = {
                document: buffer,
                mimetype: m.quoted.message?.documentMessage?.mimetype || "application/octet-stream",
                fileName: m.quoted.message?.documentMessage?.fileName || "file",
                caption: m.quoted.text || "",
                ...mentionAll
              };
              break;
          }

          if (content) {
            return await conn.sendMessage(from, content, { quoted: mek });
          }
        } catch (e) {
          console.error("Media download/send error:", e);
          return reply("❌ Failed to process the media. Sending as text instead.");
        }
      }
      else {
        messageToSend = m.quoted.text || "📨 Message";
      }
    }
    // If no quoted message, use the command text
    else if (q) {
      // 🔴 FIX: Get the original message text from the raw message
      // The message is in m.message?.conversation or m.message?.extendedTextMessage?.text
      const originalMsg = m.message?.conversation || 
                          m.message?.extendedTextMessage?.text || 
                          m.message?.imageMessage?.caption ||
                          m.message?.videoMessage?.caption ||
                          q;
      
      // Remove the command prefix (.hidetag or .tag or .h)
      const commandPatterns = ['.hidetag', '.tag', '.h'];
      let cleanText = originalMsg;
      
      for (const pattern of commandPatterns) {
        if (cleanText.startsWith(pattern)) {
          cleanText = cleanText.slice(pattern.length).trim();
          break;
        }
      }
      
      // If nothing left after removing command, use q
      messageToSend = cleanText || q;
    }

    // Send the message with proper formatting
    if (messageToSend) {
      await conn.sendMessage(from, {
        text: messageToSend,
        ...mentionAll
      }, { quoted: mek });
    } else {
      return reply("❌ No message to send.");
    }

  } catch (e) {
    console.error(e);
    reply(`❌ *Error Occurred !!*\n\n${e.message}`);
  }
});
