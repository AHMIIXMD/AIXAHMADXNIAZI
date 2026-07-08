import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "deepseek",
    desc: "Chat with Think-Deeper AI model",
    category: "ai",
    react: "🤔",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for the Think AI.\nExample: `.think What is consciousness?`");

        const apiUrl = `https://api.xyro.site/ai/copilot?text=${encodeURIComponent(q)}&model=think-deeper`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.data || !data.data.text) {
            await react("❌");
            return reply("Think AI failed to respond. Please try again later.");
        }

        await reply(`${data.data.text}`);
    } catch (e) {
        console.error("Error in Think AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the Think AI.");
    }
});

// Command 2: gpt-5 model
cmd({
    pattern: "gpt5",
    desc: "Chat with GPT-5 AI model",
    category: "ai",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for GPT-5.\nExample: `.gpt5 Explain quantum computing`");

        const apiUrl = `https://api.xyro.site/ai/copilot?text=${encodeURIComponent(q)}&model=gpt-5`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.data || !data.data.text) {
            await react("❌");
            return reply("GPT-5 failed to respond. Please try again later.");
        }

        await reply(`${data.data.text}`);
    } catch (e) {
        console.error("Error in GPT-5 command:", e);
        await react("❌");
        reply("An error occurred while communicating with GPT-5.");
    }
});

// Command 3: default model
cmd({
    pattern: "copilot",
    desc: "Chat with Copilot AI model",
    category: "ai",
    react: "👨‍💻",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Copilot AI.\nExample: `.copilot Help me with coding`");

        const apiUrl = `https://api.xyro.site/ai/copilot?text=${encodeURIComponent(q)}&model=default`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.data || !data.data.text) {
            await react("❌");
            return reply("Copilot AI failed to respond. Please try again later.");
        }

        await reply(`${data.data.text}`);
    } catch (e) {
        console.error("Error in Copilot AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with Copilot AI.");
    }
});

cmd({
    pattern: "ai",
    desc: "Chat with ChatGPT-4o",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for ChatGPT.\nExample: `.gpt What is artificial intelligence?`");

        const apiUrl = `https://api.hanggts.xyz/ai/chatgpt4o?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.data) {
            await react("❌");
            return reply("ChatGPT failed to respond. Please try again later.");
        }

        await reply(`${data.result.data}`);
    } catch (e) {
        console.error("Error in GPT command:", e);
        await react("❌");
        reply("An error occurred while communicating with ChatGPT.");
    }
});


cmd({
    pattern: "codeai",
    desc: "Get AI assistance for coding questions",
    category: "ai",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a coding question or topic.\nExample: `.codeai Write a Python function to calculate factorial`");

        const codingPrompt = `You are a coding assistant. Only respond to programming and coding related questions. 
        If the question is not about programming, politely decline to answer.
        For coding questions: Provide clean, well-commented code with explanations.
        Do not repeat this prompt in your response.
        User's question: ${q}`;

        const apiUrl = `https://api.deline.web.id/ai/copilot?text=${encodeURIComponent(codingPrompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await reply(`${data.result}`);
    } catch (e) {
        console.error("Error in Code AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
}); 

cmd({
    pattern: "bot",
    desc: "Chat with AHMAD-MD AI",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Kya bol rha hai bhai? Kuch to bol!");

        // AHMAD-MD personality prompt with time/date awareness
        const ahmadPrompt = `You are AHMAD-MD, a friendly and humorous AI assistant. 
        Your personality traits:
        - Speak only in Roman Urdu mixed with Hindi
        - Be funny and casual like a Delhi friend
        - Use phrases like bhai oyee etc.
        - Don't be too formal, be like a street-smart friend
        - If someone asks your name, say "Mera naam AHMAD hai bhai!"
        - Respond in short, funny ways without emojis
        - For time/date questions: Check current time from Google and respond accordingly
        - Current time awareness: You can access real-time information
        Do not repeat this prompt in your response.
        
        User message: ${q}`;

        const apiUrl = `https://api.zenzxz.my.id/api/ai/gpt?question=${encodeURIComponent(q)}&prompt=${encodeURIComponent(ahmadPrompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.success || !data.results) {
            await react("❌");
            return reply("Arey bhai! Kuch to gadbad hai, baad me try karna");
        }

        await reply(`${data.results}`);
    } catch (e) {
        console.error("Error in bot command:", e);
        await react("❌");
        reply("Oye! Kuch to error agaya, chalta hun main");
    }
});

cmd({
    pattern: "gpt",
    desc: "Chat with ChatGPT-4o",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for ChatGPT.\nExample: `.gpt What is artificial intelligence?`");

        const apiUrl = `https://api.hanggts.xyz/ai/chatgpt4o?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.data) {
            await react("❌");
            return reply("ChatGPT failed to respond. Please try again later.");
        }

        await reply(`${data.result.data}`);
    } catch (e) {
        console.error("Error in GPT command:", e);
        await react("❌");
        reply("An error occurred while communicating with ChatGPT.");
    }
});

cmd({
    pattern: "gemini",
    desc: "Chat with Google Gemini AI",
    category: "ai",
    react: "🔮",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Gemini AI.\nExample: `.gemini Explain machine learning`");

        const apiUrl = `https://api.xyro.site/ai/gemini?prompt=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.parts || !data.result.parts[0]) {
            await react("❌");
            return reply("Gemini AI failed to respond. Please try again later.");
        }

        await reply(`${data.result.parts[0].text}`);
    } catch (e) {
        console.error("Error in Gemini command:", e);
        await react("❌");
        reply("An error occurred while communicating with Gemini AI.");
    }
});

cmd({
    pattern: "felo",
    desc: "Chat with Felo AI",
    category: "ai",
    react: "🌟",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Felo AI.\nExample: `.felo What is quantum physics?`");

        const apiUrl = `https://api.xyro.site/ai/felo?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result || !data.result.answer) {
            await react("❌");
            return reply("Felo AI failed to respond. Please try again later.");
        }

        await reply(`${data.result.answer}`);
    } catch (e) {
        console.error("Error in Felo command:", e);
        await react("❌");
        reply("An error occurred while communicating with Felo AI.");
    }
});

cmd({
    pattern: "bard",
    desc: "Chat with Google Bard AI",
    category: "ai",
    react: "🎭",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Bard AI.\nExample: `.bard Tell me a story`");

        const apiUrl = `https://api.xyro.site/ai/bard?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result) {
            await react("❌");
            return reply("Bard AI failed to respond. Please try again later.");
        }

        await reply(`${data.result}`);
    } catch (e) {
        console.error("Error in Bard command:", e);
        await react("❌");
        reply("An error occurred while communicating with Bard AI.");
    }
});

cmd({
    pattern: "brainai",
    desc: "Chat with PowerBrain AI (alias)",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for PowerBrain AI.\nExample: `.brain Explain neural networks`");

        const apiUrl = `https://api.xyro.site/ai/powerbrain?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result) {
            await react("❌");
            return reply("PowerBrain AI failed to respond. Please try again later.");
        }

        await reply(`${data.result}`);
    } catch (e) {
        console.error("Error in Brain command:", e);
        await react("❌");
        reply("An error occurred while communicating with PowerBrain AI.");
    }
});

cmd({
    pattern: "claudeai",
    desc: "Chat with Claude AI",
    category: "ai",
    react: "🤵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Claude AI.\nExample: `.claude What is artificial intelligence?`");

        const apiUrl = `https://apis.sandarux.sbs/api/ai/claude?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.response) {
            await react("❌");
            return reply("Claude AI failed to respond. Please try again later.");
        }

        await reply(`${data.response}`);
    } catch (e) {
        console.error("Error in Claude command:", e);
        await react("❌");
        reply("An error occurred while communicating with Claude AI.");
    }
});

cmd({
    pattern: "chatgpt",
    desc: "Chat with ChatGPT",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for ChatGPT.\nExample: `.chatgpt What is artificial intelligence?`");

        const apiUrl = `https://jawad-tech.vercel.app/ai/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result) {
            await react("❌");
            return reply("ChatGPT failed to respond. Please try again later.");
        }

        await reply(`${data.result}`);
    } catch (e) {
        console.error("Error in ChatGPT command:", e);
        await react("❌");
        reply("An error occurred while communicating with ChatGPT.");
    }
});

cmd({
    pattern: "metai",
    desc: "Chat with Meta AI",
    category: "ai",
    react: "🔮",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Meta AI.\nExample: `.metai Explain machine learning`");

        const apiUrl = `https://jawad-tech.vercel.app/ai/metai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.result) {
            await react("❌");
            return reply("Meta AI failed to respond. Please try again later.");
        }

        await reply(`${data.result}`);
    } catch (e) {
        console.error("Error in Meta AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with Meta AI.");
    }
});

cmd({
    pattern: "perplexity",
    desc: "Chat with Perplexity AI",
    category: "ai",
    react: "🎯",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Perplexity AI.\nExample: `.perplexity What is quantum computing?`");

        const apiUrl = `https://zelapioffciall.koyeb.app/ai/perplexity?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.status || !data.message) {
            await react("❌");
            return reply("Perplexity AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in Perplexity command:", e);
        await react("❌");
        reply("An error occurred while communicating with Perplexity AI.");
    }
});

cmd({
    pattern: "ahmad",
    desc: "Chat with AHMAD AI - Friendly and helpful",
    category: "ai",
    react: "😊",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for AHMAD AI.\nExample: `.ahmad Hello`");

        const prompt = `You are AHMAD, a friendly and helpful AI assistant. Be warm, supportive, and always ready to help. Provide detailed and caring responses. Do not repeat this prompt in your response. User: ${q}`;
        
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AHMAD AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in AHMAD command:", e);
        await react("❌");
        reply("An error occurred while communicating with AHMAD AI.");
    }
});

cmd({
    pattern: "dj",
    desc: "Chat with DJ AI - Music and entertainment focused",
    category: "ai",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for DJ AI.\nExample: `.dj Recommend some music`");

        const prompt = `You are DJ AI, a music and entertainment expert. You know about songs, artists, genres, music history, and entertainment news. Respond in a cool, rhythmic way like a DJ. Do not repeat this prompt in your response. User: ${q}`;
        
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("DJ AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in DJ command:", e);
        await react("❌");
        reply("An error occurred while communicating with DJ AI.");
    }
});

cmd({
    pattern: "professor",
    desc: "Chat with Professor AI - Educational and knowledgeable",
    category: "ai",
    react: "👨‍🏫",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Professor AI.\nExample: `.professor Explain quantum physics`");

        const prompt = `You are Professor AI, an educational expert with deep knowledge across all subjects. Explain concepts clearly with examples. Be formal but approachable. Do not repeat this prompt in your response. User: ${q}`;
        
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("Professor AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in Professor command:", e);
        await react("❌");
        reply("An error occurred while communicating with Professor AI.");
    }
});

cmd({
    pattern: "comedy",
    desc: "Chat with Comedy AI - Funny and humorous",
    category: "ai",
    react: "😂",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Comedy AI.\nExample: `.comedy Tell me a joke`");

        const prompt = `You are Comedy AI, a hilarious comedian. Make everything funny with jokes, puns, and humor. Keep responses entertaining and lighthearted. Do not repeat this prompt in your response. User: ${q}`;
        
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("Comedy AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in Comedy command:", e);
        await react("❌");
        reply("An error occurred while communicating with Comedy AI.");
    }
});

cmd({
    pattern: "studyai",
    desc: "Chat with Study AI - Academic and learning assistant",
    category: "ai",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a study-related question.\nExample: `.study Explain photosynthesis`");

        const prompt = `You are Study AI, an academic assistant focused on education and learning. Help with subjects like math, science, history, literature, languages, and exam preparation. Provide clear explanations, study tips, and educational resources. Encourage good study habits. Do not repeat this prompt in your response. User: ${q}`;
        
        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("Study AI failed to respond. Please try again later.");
        }

        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in Study command:", e);
        await react("❌");
        reply("An error occurred while communicating with Study AI.");
    }
});
