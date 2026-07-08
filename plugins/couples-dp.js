import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "cpp",
  alias: ["couplepp", "couplepic", "couple"],
  react: "💑",
  desc: "Get matching couples profile pictures.",
  category: "utility",
  use: ".cpp",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    // Send fetching message
    await reply("*💫 Fetching Couples Profile Pictures...*");
    
    // React: Processing ⏳
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://okatsu-rolezapiiz.vercel.app/random/ppcp`;
    const { data } = await axios.get(apiUrl);
    
    if (data.status && data.result) {
      // Send male picture
      await conn.sendMessage(from, { 
        image: { url: data.result.cowo },
        caption: "👦 *Male Profile Picture*"
      }, { quoted: m });

      // Send female picture
      await conn.sendMessage(from, { 
        image: { url: data.result.cewe },
        caption: "👩 *Female Profile Picture*"
      });

      // React: Success ✅
      await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } else {
      reply("❌ Failed to fetch couples pictures. Please try again.");
      // React: Error ❌
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
  } catch (error) {
    console.error("Couples PP Error:", error);
    reply("❌ An error occurred while fetching couples pictures.");
    // React: Error ❌
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
