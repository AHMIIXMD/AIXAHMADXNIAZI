// ============================================
// AHMAD MD - VIDEO TO MP3 CONVERTER
// ============================================

import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "mp3",
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

        // Send processing reaction
        await react('⏳');

        // Download video
        const videoBuffer = await m.quoted.download();
        if (!videoBuffer) {
            await react('❌');
            return await reply("❌ Failed to download video. Please try again.");
        }

        // Convert video to MP3 using ffmpeg via child_process
        const { exec } = await import('child_process');
        const fs = await import('fs');
        const path = await import('path');
        const os = await import('os');

        // Create temp files
        const tempVideo = path.join(os.tmpdir(), `video_${Date.now()}.mp4`);
        const tempAudio = path.join(os.tmpdir(), `audio_${Date.now()}.mp3`);

        // Write video buffer to temp file
        fs.writeFileSync(tempVideo, videoBuffer);

        // Convert using ffmpeg
        await new Promise((resolve, reject) => {
            exec(
                `ffmpeg -i "${tempVideo}" -vn -acodec libmp3lame -ab 128k "${tempAudio}"`,
                (error, stdout, stderr) => {
                    if (error) reject(error);
                    else resolve();
                }
            );
        });

        // Read audio buffer
        const audioBuffer = fs.readFileSync(tempAudio);

        // Cleanup temp files
        fs.unlinkSync(tempVideo);
        fs.unlinkSync(tempAudio);

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
