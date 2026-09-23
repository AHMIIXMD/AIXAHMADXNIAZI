import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from "path";
import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "find",
  alias: ["whatsong", "findsong"],
  react: '🎵',
  desc: "Identify songs from audio files",
  category: "utility",
  use: ".findsong [reply to audio/video]",
  filename: __filename
}, async (client, message, args, { reply, quoted }) => {  // ← FIXED: Added args parameter
  try {
    // Check if quoted message exists and has media
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || (!mimeType.startsWith('audio/') && !mimeType.startsWith('video/'))) {
      return reply("Please reply to an audio or video file (MP3/MP4)");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    
    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('audio/mpeg')) extension = '.mp3';
    else if (mimeType.includes('video/mp4')) extension = '.mp4';
    else if (mimeType.includes('audio/')) extension = '.mp3';
    else if (mimeType.includes('video/')) extension = '.mp4';
    else {
      return reply("Unsupported format. Please use MP3 or MP4");
    }

    // Create temp file
    const tempFilePath = path.join(os.tmpdir(), `findsong_input_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `audio${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const audioUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (!audioUrl) {
      throw "Failed to upload audio to Catbox";
    }

    // Identify song using API
    const apiUrl = `https://api.zenzxz.my.id/api/tools/whatmusic?url=${encodeURIComponent(audioUrl)}`;
    const response = await axios.get(apiUrl, { 
      timeout: 30000
    });

    const songData = response.data;

    if (!songData.success || !songData.data) {
      throw "Could not identify the song. Please try with a clearer audio sample.";
    }

    const { title, artists } = songData.data;

    // Create formatted response
    const resultText = `╭─「 🎵 *Song Found* 」
│
│ • *Title:* ${title || 'Unknown'}
│ • *Artist:* ${artists || 'Unknown'}
│
╰─「 Powered by *AHMADTechX* 」`;

    // Send message with contextInfo for forward tag
    await client.sendMessage(message.chat, {
      text: resultText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true
      }
    }, { quoted: message });

  } catch (error) {
    console.error('FindSong Error:', error);
    await reply(`❌ Error: ${error.message || "Failed to identify song. The audio might be too short or unclear."}`);
  }
});
