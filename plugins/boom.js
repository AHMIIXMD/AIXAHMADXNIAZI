import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "boom",
  alias: ["spam", "massmail"],
  react: '☠️',
  desc: "Send multiple messages (Boom)",
  category: "utility",
  use: ".boom <count> <message>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    // Check if user provided count and message
    if (args.length < 2) {
      return reply('❌ Sahih tareeqa: .boom <tadaad> <message>\n\nExample:\n.boom 5 Hello');
    }

    const count = parseInt(args[0]);
    const text = args.slice(1).join(" ");

    // Limit set karna zaroori hai taake bot ban na ho (Max 30)
    if (isNaN(count) || count <= 0) return reply('❌ Tadaad (count) aik number honi chahiye.');
    if (count > 50) return reply('❌ Bohot zyada messages! Limit 50 tak hai.');

    // Boom loop
    for (let i = 0; i < count; i++) {
      await conn.sendMessage(from, { text: text });
    }

  } catch (error) {
    console.error('Boom Command Error:', error);
    reply('❌ Command execute karne mein masla aya.');
  }
});
