// AHMAD MD - ESM Version
import { cmd } from '../command.js';
import axios from 'axios';
import FormData from 'form-data';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ImgBB API Key (free, working)
const IMGBB_API_KEY = '8db492efc937a635b90680a9a860dc85';

cmd({
  pattern: "url",
  alias: ["imgtourl", "imgurl", "tourl", "geturl", "upload"],
  react: '🖇',
  desc: "Upload image to ImgBB and get URL",
  category: "utility",
  use: ".tourl [reply to image]",
  filename: __filename
}, async (conn, mek, m, { from, reply, quoted }) => {
  try {
    const quotedMsg = m.quoted || m;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.includes('image')) {
      return reply("❌ Please reply to an image");
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    const mediaBuffer = await quotedMsg.download();

    const form = new FormData();
    form.append('key', IMGBB_API_KEY);
    form.append('image', mediaBuffer.toString('base64'));
    form.append('name', 'jawadmd');

    const response = await axios.post("https://api.imgbb.com/1/upload", form, {
      headers: form.getHeaders(),
      timeout: 60000
    });

    const imageUrl = response.data?.data?.url;

    if (!imageUrl) throw "Upload failed";

    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    await reply(`✅ *Image Successfully Uploaded*\n\n- ${imageUrl}`);

  } catch (error) {
    console.error("Tourl error:", error);
    await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    await reply(`❌ Error: ${error.message || error}`);
  }
});
