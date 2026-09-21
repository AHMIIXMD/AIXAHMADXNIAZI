import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const API_BASE_URL = 'https://ahmad-md.vercel.app/api';

// ==========================================
// 🔧 Common function — pair code nikalne ke liye
// (dono handlers isi ko call karenge)
// ==========================================
async function getPairCode(conn, mek, m, { q, senderNumber, reply, react }) {
    try {

        // =========================
        // LOADING REACTION
        // =========================
        await react('⏳');

        // =========================
        // GET PHONE NUMBER
        // =========================
        const phoneNumber = q
            ? q.replace(/[^0-9]/g, '')
            : senderNumber.replace(/[^0-9]/g, '');

        // =========================
        // VALIDATE NUMBER
        // =========================
        if (!phoneNumber) {
            await react('❌');
            return await reply(
                "❌ Please provide a phone number\n\nExample:\n.pair 923001234567"
            );
        }

        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            await react('❌');
            return await reply("❌ Invalid phone number format");
        }

        // =========================
        // FETCH SERVER LIST
        // =========================
        let serversResponse;

        try {
            serversResponse = await axios.get(
                `${API_BASE_URL}/servers`,
                { timeout: 20000 }
            );
        } catch (e) {
            console.log("SERVER FETCH ERROR:", e.response?.data || e.message);
            await react('❌');
            return await reply("❌ Failed to connect to API server");
        }

        // =========================
        // CHECK SERVER RESPONSE
        // =========================
        if (!serversResponse.data || !Array.isArray(serversResponse.data.servers)) {
            console.log("INVALID SERVER RESPONSE:", serversResponse.data);
            await react('❌');
            return await reply("❌ Invalid server response");
        }

        const servers = serversResponse.data.servers;

        if (servers.length === 0) {
            await react('❌');
            return await reply("❌ No active servers found");
        }

        // =========================
        // RANDOM SERVER SELECT
        // =========================
        const randomServer = servers[Math.floor(Math.random() * servers.length)];

        if (!randomServer.url) {
            await react('❌');
            return await reply("❌ Invalid server URL");
        }

        const serverUrl = randomServer.url.replace(/\/$/, '');
        console.log("SELECTED SERVER:", serverUrl);

        // =========================
        // GET PAIR CODE
        // =========================
        let response;

        try {
            response = await axios.get(
                `${serverUrl}/code`,
                {
                    params: { number: phoneNumber },
                    timeout: 60000
                }
            );
        } catch (e) {
            console.log("PAIR API ERROR:", e.response?.data || e.message);
            await react('❌');
            return await reply(
                `❌ Pair API Failed\n\n${e.response?.data?.message || e.message}`
            );
        }

        console.log("PAIR RESPONSE:", response.data);

        // =========================
        // EXTRACT PAIR CODE
        // =========================
        const pairingCode =
            response.data?.code ||
            response.data?.pair ||
            response.data?.pairingCode;

        // =========================
        // CHECK PAIR CODE
        // =========================
        if (!pairingCode) {
            console.log("INVALID PAIR RESPONSE:", response.data);
            await react('❌');
            return await reply("❌ Pair code not found in API response");
        }

        // =========================
        // SUCCESS REACTION
        // =========================
        await react('✅');

        // =========================
        // FIRST MESSAGE
        // =========================
        await reply(`
╭━━〔 AHMAD-MD PAIR 〕━━⬣
┃
┃ ✅ Pair code generated successfully
┃ 🌐 SERVER: ${randomServer.name || 'Unknown'}
┃
┃ 📱 HOW TO CONNECT
┃ 1. Open WhatsApp
┃ 2. Linked Devices
┃ 3. Link a Device
┃ 4. Paste the code below
┃
╰━━━━━━━━━━━━━━⬣
`);

        // =========================
        // SECOND MESSAGE (OTP ONLY)
        // =========================
        await reply(pairingCode);

    } catch (error) {
        console.log("FULL ERROR:", error);
        await react('❌');
        return await reply(`❌ Error:\n${error.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.pair, .getpair, .clonebot)
// ==========================================
cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for AHMAD-MD bot",
    category: "owner",
    use: ".pair 923001234567",
    filename: __filename
}, async (conn, mek, m, { q, senderNumber, reply, react }) => {
    await getPairCode(conn, mek, m, { q, senderNumber, reply, react });
});

// ==========================================
// 📌 2. Bina prefix wala handler (pair, getpair, clonebot)
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, {
    from,
    body,
    isCreator,
    reply,
    sender,
    senderNumber,
    userConfig,
    prefix
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Pair triggers (bina prefix)
        const pairTriggers = ["pair", "getpair", "clonebot"];

        // Check: kya pehla word pair/getpair/clonebot hai?
        if (!pairTriggers.includes(firstWord)) return;

        // Baaki text (phone number)
        const query = userText.slice(firstWord.length).trim();

        // Sender number nikalo (bina @ ke)
        const senderNum = sender ? sender.split('@')[0].split(':')[0] : "";

        // reply aur react functions banao
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        const reactFn = async (emoji) => {
            try {
                await conn.sendMessage(from, {
                    react: { text: emoji, key: mek.key }
                });
            } catch (e) {
                console.log("React error:", e.message);
            }
        };

        // Pair function call karo
        await getPairCode(conn, mek, { }, {
            q: query,
            senderNumber: senderNum,
            reply: replyFn,
            react: reactFn
        });

    } catch (error) {
        console.error("Pair No-Prefix Error:", error);
    }
});
