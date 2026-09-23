import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "flirt",
    alias: ["line"],
    desc: "Get a random flirty message",
    react: "😘",
    category: "fun",
    use: '.flirt',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.result) {
            return reply("❌ Couldn't fetch a flirty message. Try again later!");
        }
        
        const flirtMessage = `${data.result}
`.trim();

        await reply(flirtMessage);
        
    } catch (error) {
        console.error('Flirt Error:', error);
        reply("❌ Failed to fetch a flirty message. Maybe try being romantic yourself?");
    }
});
