import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "shayari",
    alias: ["shayar", "poetry"],
    desc: "Get a random romantic shayari",
    react: "💖",
    category: "fun",
    use: '.shayari',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.result) {
            return reply("❌ Shayari dil mein nahi aayi, phir try karo!");
        }
        
        const shayariMessage = `${data.result}`.trim();

        await reply(shayariMessage);
        
    } catch (error) {
        console.error('Shayari Error:', error);
        reply("❌ Aaj dil mein shayari nahi hai... Kal try karna!");
    }
});
