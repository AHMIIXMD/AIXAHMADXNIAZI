import { cmd } from "../command.js";
import axios from "axios";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "capcut",
  desc: "Download CapCut templates",
  category: "download",
  react: "🎬",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return await reply(
        "🎬 *Please provide a CapCut template link*"
      );
    }

    await reply("*⏳ Fetching CapCut template, please wait...*");

    const apiUrl = `https://api.deline.web.id/downloader/capcut?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || data.result.error) {
      return await reply("❌ Failed to fetch CapCut template.");
    }

    const result = data.result;

    // Prefer No Watermark > HD No Watermark
    let media =
      result.medias.find(v => v.quality === "No Watermark") ||
      result.medias.find(v => v.quality.includes("No Watermark")) ||
      result.medias[0];

    const caption = `🎬 *CapCut Template Downloaded*

📌 *Title:* ${result.title}
👤 *Author:* ${result.author}
⏱ *Duration:* ${Math.floor(result.duration / 1000)}s
🎞 *Quality:* ${media.quality}

✨ Powered By AHMAD Tech`;

    await conn.sendMessage(
      from,
      {
        video: { url: media.url },
        caption
      },
      { quoted: mek }
    );

  } catch (err) {
    console.error("CAPCUT ERROR:", err);
    await reply("❌ Error downloading CapCut template. Try again later.");
  }
});
