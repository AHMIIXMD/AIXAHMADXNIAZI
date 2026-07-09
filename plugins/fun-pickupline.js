import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "pickup",
    alias: ["pickupline", "flirtline"],
    desc: "Get a random pickup line",
    react: "💘",
    category: "fun",
    use: '.pickup',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/pickupline');
        
        if (!data.success) return reply("❌ Failed to get a pickup line. Try again!");
        
        await reply(`💝 *Pickup Line* 💝\n\n"${data.pickupline}"\n\n_Use wisely!_`);
        
    } catch (error) {
        console.error('Pickup Error:', error);
        reply("❌ My charm isn't working right now. Try again later!");
    }
});
