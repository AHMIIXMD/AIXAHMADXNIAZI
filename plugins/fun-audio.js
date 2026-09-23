import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const RUN_MUREED_AUDIO = "https://files.catbox.moe/wuikae.mp3";

cmd({
    pattern: "runmureed",
    desc: "Run Mureed Audio",
    category: "fun",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, reply, react }) => {
    try {
        await conn.sendMessage(
            from,
            {
                audio: { url: RUN_MUREED_AUDIO },
                mimetype: "audio/mpeg",
                ptt: false
            },
            { quoted: mek }
        );

        await react("✅");
    } catch (e) {
        console.error("Error in runmureed command:", e);
        await react("❌");
        reply("❌ Audio play nahi ho saki");
    }
});
