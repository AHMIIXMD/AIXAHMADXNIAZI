// AHMAD MD 

import { cmd } from "../command.js";
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "forward",
  alias: ["frd", "fwd"],
  desc: "Forward messages to groups using WhatsApp native method",
  category: "owner",
  filename: __filename
}, async (client, message, match, { isCreator, reply, from }) => {
  try {
    // Owner check - use reply function from context
    if (!isCreator) return await reply("*📛 Owner Only Command*");
    
    // Quoted message check
    if (!message.quoted) return await reply("*🍁 Please reply to a message to forward*");

    // Handle match input
    let jidInput = "";
    if (typeof match === "string") {
      jidInput = match.trim();
    } else if (Array.isArray(match)) {
      jidInput = match.join(" ").trim();
    } else if (match && typeof match === "object") {
      jidInput = match.text || "";
    }
    
    if (!jidInput) {
      return await reply(
        "*🍁 Usage:* `.forward jid1,jid2,...`\n" +
        "*Example:* `.forward120363408512260657 @g.us`\n" +
        "*Example (multiple):* `.forward 120363408512260657@g.us,1234567890@s.whatsapp.net`\n" +
        "Reply to a message first!"
      );
    }

    // Process JIDs
    const rawJids = jidInput.split(',').map(jid => jid.trim()).filter(jid => jid);
    const validJids = rawJids
      .map(jid => {
        if (jid.includes('@')) {
          if (jid.endsWith('@g.us') || jid.endsWith('@s.whatsapp.net') || jid.endsWith('@newsletter')) {
            const numbers = jid.match(/\d+/g);
            if (!numbers || numbers.length === 0) return null;
            
            if (jid.endsWith('@g.us')) {
              return `${numbers.join('')}@g.us`;
            } else if (jid.endsWith('@s.whatsapp.net')) {
              return `${numbers.join('')}@s.whatsapp.net`;
            } else if (jid.endsWith('@newsletter')) {
              return `${numbers.join('')}@newsletter`;
            }
          }
          return null;
        } else if (/^\d+$/.test(jid)) {
          return `${jid}@g.us`;
        }
        return null;
      })
      .filter(jid => jid !== null)
      .slice(0, 50);

    if (validJids.length === 0) {
      return await reply("❌ No valid JIDs found");
    }

    // Remove duplicates
    const uniqueJids = [...new Set(validJids)];
    
    // Start processing
    await reply(`🔄 Forwarding to ${uniqueJids.length} chats...`);

    let successCount = 0;
    const failedJids = [];

    // Get the quoted message content from the original message's contextInfo
    const quotedContent = message.msg?.contextInfo?.quotedMessage;
    
    if (!quotedContent) {
      return await reply("❌ Could not extract quoted message content");
    }

    // Create message structure for forwarding
    const messageContent = { ...quotedContent };

    // Forward to each chat
    for (const [index, jid] of uniqueJids.entries()) {
      try {
        // Create the message to forward
        const forwardData = generateWAMessageFromContent(
          jid,
          messageContent,
          { userJid: client.user.id }
        );

        // Send using relayMessage
        await client.relayMessage(jid, forwardData.message, {
          messageId: forwardData.key.id
        });

        successCount++;
        
        // Progress update every 5 chats
        if ((index + 1) % 5 === 0 && uniqueJids.length > 5) {
          await reply(`📤 Sent to ${index + 1}/${uniqueJids.length} chats...`);
        }
        
        // Small delay
        if (index < uniqueJids.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`Forward error to ${jid}:`, error.message);
        failedJids.push({
          jid: jid.includes('@g.us') ? jid.replace('@g.us', '') : 
               jid.includes('@s.whatsapp.net') ? jid.replace('@s.whatsapp.net', '') :
               jid.replace('@newsletter', ''),
          error: error.message.substring(0, 30)
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Final report
    let report = `✅ *Forward Complete*\n\n` +
                 `📤 Success: ${successCount}/${uniqueJids.length}\n`;
    
    // Get content type from quotedContent keys
    const contentType = Object.keys(quotedContent)[0] || 'unknown';
    report += `📦 Content Type: ${contentType.replace('Message', '')}\n`;
    
    // Count types
    const groupCount = uniqueJids.filter(jid => jid.endsWith('@g.us')).length;
    const personalCount = uniqueJids.filter(jid => jid.endsWith('@s.whatsapp.net')).length;
    const newsletterCount = uniqueJids.filter(jid => jid.endsWith('@newsletter')).length;
    report += `👥 Groups: ${groupCount}\n`;
    report += `👤 Personal: ${personalCount}\n`;
    report += `📰 Newsletters: ${newsletterCount}\n`;
    
    if (failedJids.length > 0) {
      report += `\n❌ Failed (${failedJids.length}):\n`;
      failedJids.slice(0, 3).forEach(f => {
        report += `• ${f.jid}: ${f.error}\n`;
      });
      if (failedJids.length > 3) report += `... +${failedJids.length - 3} more`;
    }
    
    if (rawJids.length > uniqueJids.length) {
      report += `\n⚠️ Removed ${rawJids.length - uniqueJids.length} invalid/duplicate JIDs`;
    }

    await reply(report);

  } catch (error) {
    console.error("Forward Error:", error);
    await reply(`💢 Error: ${error.message.substring(0, 100)}`);
  }
});
