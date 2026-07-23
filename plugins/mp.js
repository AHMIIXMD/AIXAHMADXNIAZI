// ============================================
// AHMAD MD - VIDEO TO MP3 CONVERTER (Using Converter Library)
// ============================================

import { cmd } from '../command.js';
import * as converter from '../lib/converter.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "tomp3",
    alias: ["mp3", "v2mp3", "vtomp3", "video2mp3"],
    desc: "Convert video to MP3 audio",
    category: "audio",
    react: "🎵",
    use: ".tomp3 (reply to video)",
    filename: __filename
}, async (conn, mek, m, { from, reply, react }) => {
    try {
        // Check if message has quoted video
        if (!m.quoted) {
            return await reply("❌ Please reply to a video message!\n\nExample: `.tomp3` (reply to a video)");
        }

        // Check if quoted message is a video
        const mtype = m.quoted.mtype;
        if (mtype !== 'videoMessage') {
            return await reply("❌ Please reply to a **video** message only!");
        }

        // Check video duration (max 15 minutes)
        if (m.quoted.seconds && m.quoted.seconds > 900) {
            return await reply("⏱️ Video is too long! Maximum 15 minutes allowed.");
        }

        // Send processing reaction
        await react('⏳');

        // Download video
        const videoBuffer = await m.quoted.download();
        if (!videoBuffer) {
            await react('❌');
            return await reply("❌ Failed to download video. Please try again.");
        }

        // Convert video to MP3 using converter library
        const audioBuffer = await converter.toAudio(videoBuffer, 'mp4');

        // Send audio
        await conn.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        // Success reaction
        await react('✅');
        
        await reply("✅ *Video converted to MP3 successfully!*\n\n🎵 Enjoy your audio!");

    } catch (e) {
        console.error("Video to MP3 Error:", e);
        await react('❌');
        await reply(`❌ Error converting video to MP3:\n${e.message || 'Please try again with a shorter video.'}`);
    }
});
