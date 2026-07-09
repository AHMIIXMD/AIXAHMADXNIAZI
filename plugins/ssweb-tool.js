import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "ss",
  alias: ["ssweb", "screenshot"],
  react: "🌐",
  desc: "Take website screenshot.",
  category: "utility",
  use: ".ss <url>",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const url = args[0];
    if (!url) return reply("❌ Please provide a URL\nExample: .ss https://google.com");
    if (!url.startsWith("http")) return reply("❌ URL must start with http:// or https://");

    // Send processing message
    await reply("📸 Capturing website screenshot...");
    
    // React: Processing ⏳
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.hanggts.xyz/tools/ssweb?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);
    
    if (data.status && data.result) {
      await conn.sendMessage(from, { 
        image: { url: data.result.iurl },
        caption: `🖼️ *Website Screenshot*\n\n🌐 *URL:* ${data.result.ourl}\n\n> *© Powered by AHMAD TechX*`
      }, { quoted: m });

      // React: Success ✅
      await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } else {
      reply("❌ Failed to capture screenshot. Please try again.");
      // React: Error ❌
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
  } catch (error) {
    console.error("Screenshot Error:", error);
    reply("❌ An error occurred while capturing screenshot.");
    // React: Error ❌
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
