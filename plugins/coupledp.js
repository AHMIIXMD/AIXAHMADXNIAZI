import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Couple DP URLs
const coupleDpUrls = {
    url1: 'https://files.catbox.moe/b1o0kp.jpg',
    url2: 'https://files.catbox.moe/3ovw4e.jpg',
    url3: 'https://files.catbox.moe/ubg3fb.jpg',
    url4: 'https://files.catbox.moe/izlx32.jpg',
    url5: 'https://files.catbox.moe/6kvhkt.jpg',
    url6: 'https://files.catbox.moe/y0tkz9.jpg',
    url7: 'https://files.catbox.moe/nzbf1k.jpg',
    url8: 'https://files.catbox.moe/zuy3qn.jpg',
    url9: 'https://files.catbox.moe/z5qtah.jpg',
    url10: 'https://files.catbox.moe/6clonp.jpg',
    url11: 'https://files.catbox.moe/p83bjn.jpg',
    url12: 'https://files.catbox.moe/2bgvp8.jpg',
    url13: 'https://files.catbox.moe/g6c4i7.jpg',
    url14: 'https://files.catbox.moe/1h7n5a.jpg',
    url15: 'https://files.catbox.moe/k5458j.jpg',
    url16: 'https://files.catbox.moe/1l9cr3.jpg',
    url17: 'https://files.catbox.moe/ew0j67.jpg',
    url18: 'https://files.catbox.moe/pi0thx.jpg',
    url19: 'https://files.catbox.moe/msgvm8.jpg',
    url20: 'https://files.catbox.moe/s1vola.jpg',
    url21: 'https://files.catbox.moe/5x3sze.jpg',
    url22: 'https://files.catbox.moe/phe2wh.jpg'
};

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// Sirf ek loop jo URLs se direct patterns generate karega
Object.keys(coupleDpUrls).forEach((key, index) => {
    const num = index + 1;
    cmd({
        pattern: `coupledp${num}`,
        alias: [`cp${num}`],
        desc: `Send Couple DP ${num}`,
        category: "coupledp",
        react: "💑",
        filename: __filename
    },
    async (conn, mek, m, { from, reply }) => {
        try {
            await conn.sendMessage(from, {
                image: { url: coupleDpUrls[key] },
                mimetype: 'image/jpeg',
                caption: caption
            }, { quoted: mek });
        } catch (e) {
            console.error(`Error in coupledp${num}:`, e);
            await reply("Failed to send image. Please try again.");
        }
    });
});
