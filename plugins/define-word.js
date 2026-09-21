import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — word define karne ke liye
// ==========================================
async function defineWord(conn, mek, m, { from, q, reply }) {
    try {
        if (!q) {
            return reply("Please provide a word to define.\n\n📌 *Usage:* .define [word]");
        }

        const word = q.trim();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await axios.get(url);
        const definitionData = response.data[0];

        const definition = definitionData.meanings[0].definitions[0].definition;
        const example = definitionData.meanings[0].definitions[0].example || '❌ No example available';
        const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || '❌ No synonyms available';
        const phonetics = definitionData.phonetics[0]?.text || '🔇 No phonetics available';
        const audio = definitionData.phonetics[0]?.audio || null;

        const wordInfo = `
📖 *Word*: *${definitionData.word}*  
🗣️ *Pronunciation*: _${phonetics}_  
📚 *Definition*: ${definition}  
✍️ *Example*: ${example}  
📝 *Synonyms*: ${synonyms}  

🔗 *Powered By AHMAD Tech*`;

        if (audio) {
            await conn.sendMessage(from, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: mek });
        }

        return reply(wordInfo);
    } catch (e) {
        console.error("❌ Error:", e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 *Word not found.* Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.define)
// ==========================================
cmd({
    pattern: "define",
    desc: "📖 Get the definition of a word",
    react: "🔍",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    await defineWord(conn, mek, m, { from, q, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (define)
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig,
    prefix
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim();
        if (!userText) return;

        // Pehla word nikaalo
        const firstWord = userText.split(/\s+/)[0].toLowerCase();

        // Define trigger (bina prefix)
        if (firstWord !== "define") return;

        // Baaki text (word)
        const query = userText.slice(firstWord.length).trim();

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Word define karo
        await defineWord(conn, mek, { }, {
            from,
            q: query,
            reply: replyFn
        });

    } catch (error) {
        console.error("Define No-Prefix Error:", error);
    }
});
