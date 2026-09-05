import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Boy DP URLs
const boyDpUrls = {
    url1: 'https://files.catbox.moe/y1l7ed.jpg',
    url2: 'https://files.catbox.moe/4kujce.jpg',
    url3: 'https://files.catbox.moe/vrrn72.jpg',
    url4: 'https://files.catbox.moe/7w87wk.jpg',
    url5: 'https://files.catbox.moe/jf7cwz.jpg',
    url6: 'https://files.catbox.moe/gc3c1g.jpg',
    url7: 'https://files.catbox.moe/nufhim.jpg',
    url8: 'https://files.catbox.moe/yfce44.jpg',
    url9: 'https://files.catbox.moe/gdhv0h.jpg',
    url10: 'https://files.catbox.moe/ptwcm0.jpg',
    url11: 'https://files.catbox.moe/3upyka.jpg',
    url12: 'https://files.catbox.moe/erj2f8.jpg',
    url13: 'https://files.catbox.moe/g50vs5.jpg',
    url14: 'https://files.catbox.moe/1jta5y.jpg',
    url15: 'https://files.catbox.moe/siph10.jpg',
    url16: 'https://files.catbox.moe/mxlbfq.jpg',
    url17: 'https://files.catbox.moe/3aqy6x.jpg',
    url18: 'https://files.catbox.moe/0qvy21.jpg',
    url19: 'https://files.catbox.moe/szdoa0.jpg',
    url20: 'https://files.catbox.moe/3upyka.jpg',
    url21: 'https://files.catbox.moe/jadoal.jpg',
    url22: 'https://files.catbox.moe/yfce44.jpg'
};

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// Single command for random Boy DP
cmd({
    pattern: "boydp",
    alias: ["bdp", "boypic"],
    desc: "Get a random Boy DP image",
    category: "boydp",
    react: "👦",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Convert object values into an array and select a random URL
        const urlsArray = Object.values(boyDpUrls);
        const randomUrl = urlsArray[Math.floor(Math.random() * urlsArray.length)];

        await conn.sendMessage(from, {
            image: { url: randomUrl },
            mimetype: 'image/jpeg',
            caption: caption
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in boydp command:", e);
        await reply("Failed to send image. Please try again.");
    }
});
