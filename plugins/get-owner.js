import { cmd } from '../command.js';
import config from '../config.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "owner",
  desc: "Get owner number",
  category: "main",
  react: "💀",
  filename: __filename
}, async (sock, m, msg, { from, userConfig }) => {
  try {
    // Get values from userConfig with fallback to config
    const OWNER_NUMBER = userConfig?.OWNER_NUMBER || config.OWNER_NUMBER || "0000000000";
    const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Bot Owner";
    const TEAM_NAME = "AHMAD-MD TEAM"; // Direct hardcoded as requested

    await sock.sendPresenceUpdate("composing", from);

    const vcard =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${OWNER_NAME}\n` +
      `ORG:${TEAM_NAME};\n` +
      `TEL;type=CELL;type=VOICE;waid=${OWNER_NUMBER}:${'+' + OWNER_NUMBER}\n` +
      'END:VCARD';

    await sock.sendMessage(from, {
      contacts: {
        displayName: OWNER_NAME,
        contacts: [{ vcard }]
      }
    });

    await sock.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error("Error sending contact:", e);
    await sock.sendMessage(from, {
      text: `❌ Couldn't send contact:\n${e.message}`
    });
  }
});
