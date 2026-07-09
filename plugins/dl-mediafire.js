import axios from "axios";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "mediafire",
  alias: ["mfire", "mfdownload"],
  react: '📥',
  desc: "Download any file from MediaFire (supports .mp4, .apk, .zip, .js, documents, etc.)",
  category: "download",
  use: ".mediafire <MediaFire URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args.join(" "); // Support URLs with spaces if needed
    if (!url || !url.includes("mediafire.com")) {
      return reply("❌ Please provide a valid MediaFire URL\nExample: .mediafire https://www.mediafire.com/file/...");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.deline.web.id/downloader/mediafire?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.result || !data.result.downloadUrl || !data.result.fileName) {
      return reply("❌ Failed to fetch file info. Invalid URL or API error.");
    }

    const fileName = data.result.fileName;
    const downloadUrl = data.result.downloadUrl;

    const fileResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(fileResponse.data);

    // Determine mimetype based on file extension (fallback to generic)
    const ext = fileName.split('.').pop().toLowerCase();
    let mimetype = 'application/octet-stream'; // Default for any file
    if (ext === 'mp4') mimetype = 'video/mp4';
    else if (ext === 'apk') mimetype = 'application/vnd.android.package-archive';
    else if (ext === 'zip') mimetype = 'application/zip';
    else if (ext === 'js') mimetype = 'text/javascript';
    else if (['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'].includes(ext)) mimetype = 'application/octet-stream';

    const messageOptions = {
      document: fileBuffer,
      fileName: fileName,
      mimetype: mimetype,
      caption: `*MediaFire Download*\n\n📄 *File:* ${fileName}\n\nPowered by AHMAD-MD`
    };

    await conn.sendMessage(from, messageOptions, { quoted: mek });
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("MediaFire Error:", error);
    reply("❌ Failed to download file. Please check the URL or try again later.");
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
