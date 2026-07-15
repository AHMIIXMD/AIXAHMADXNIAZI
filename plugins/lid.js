import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// COMMAND 1: Get Your Own LID (Clean & Simple)
// ============================================
cmd({
  pattern: "my",
  alias: ["my", "mo"],
  react: "🆔",
  desc: "Get your WhatsApp LID/ID",
  category: "general",
  use: ".lid",
  filename: __filename
},
async (conn, mek, m, { from, reply, sender }) => {
  try {
    const myId = sender || m.sender || mek.key.remoteJid;
    
    // Bilkul simple screenshot jaisa format
    let msg = `| *Your LID:* ${myId}`;
    
    await reply(msg);
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
