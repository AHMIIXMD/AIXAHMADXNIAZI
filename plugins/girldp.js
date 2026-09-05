import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Girl DP URLs object
const girlDpUrls = {
    url1: 'https://files.catbox.moe/yrv3t8.jpg',
    url2: 'https://files.catbox.moe/mgxcmh.jpg',
    url3: 'https://files.catbox.moe/57p7bs.jpg',
    url4: 'https://files.catbox.moe/ct3x5i.jpg',
    url5: 'https://files.catbox.moe/i32r8e.jpg',
    url6: 'https://files.catbox.moe/9vx3oh.jpg',
    url7: 'https://files.catbox.moe/tvy3fg.jpg',
    url8: 'https://files.catbox.moe/wt1017.jpg',
    url9: 'https://files.catbox.moe/3fklx4.jpg',
    url10: 'https://files.catbox.moe/blfy4i.jpg',
    url11: 'https://files.catbox.moe/kafz5k.jpg',
    url12: 'https://files.catbox.moe/rrb30k.jpg',
    url13: 'https://files.catbox.moe/5vb4n9.jpg',
    url14: 'https://files.catbox.moe/57p7bs.jpg',
    url15: 'https://files.catbox.moe/6f6qob.jpg',
    url16: 'https://files.catbox.moe/48itao.jpg',
    url17: 'https://files.catbox.moe/dsqk27.jpg',
    url18: 'https://files.catbox.moe/1uygix.jpg',
    url19: 'https://files.catbox.moe/80r3n0.jpg',
    url20: 'https://files.catbox.moe/ieyqak.jpg',
    url21: 'https://files.catbox.moe/c9bi22.webp',
    url22: 'https://files.catbox.moe/a0vrdt.jpg'
};

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// Helper to get mimetype
function getMime(url) {
    return url.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
}

// Single command for random Girl DP
cmd({
    pattern: "girldp",
    alias: ["gdp", "girlpic"],
    desc: "Get a random Girl DP image",
    category: "girldp",
    react: "🌸",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Convert object values into an array and select a random URL
        const urlsArray = Object.values(girlDpUrls);
        const randomUrl = urlsArray[Math.floor(Math.random() * urlsArray.length)];

        await conn.sendMessage(from, {
            image: { url: randomUrl },
            mimetype: getMime(randomUrl),
            caption: caption
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in girldp command:", e);
        await reply("Failed to send image. Please try again.");
    }
});
