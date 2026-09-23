import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "imagine",
  desc: "Generate AI art using Deline txt2img API",
  category: "ai",
  react: "🪄",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return await reply(
        "🎨 *Please provide a prompt!*\n\nExample:\n*.art couple lip kiss anime style*"
      );
    }

    await reply("*🪄 Creating your art, please wait...*");

    const apiUrl = `https://api.deline.web.id/ai/txt2img?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, {
      responseType: "arraybuffer"
    });

    const imageBuffer = Buffer.from(response.data);

    await conn.sendMessage(
      from,
      {
        image: imageBuffer,
        caption: `🎨 *AI Art Generated!*\n🧠 Prompt: ${q}\n\n✨ Powered By AHMAD TechX`
      },
      { quoted: mek }
    );

  } catch (err) {
    console.error("ART ERROR:", err);
    await reply("❌ *Failed to generate art.*\nTry another prompt or try later.");
  }
});
