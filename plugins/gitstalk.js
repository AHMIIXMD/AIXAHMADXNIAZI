import axios from 'axios';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — GitHub profile fetch karne ke liye
// ==========================================
async function fetchGitHubProfile(conn, mek, m, { from, args, reply }) {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *Username*: ${data.name || data.login}
🔗 *Github Url*: (${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ AHMAD TᴇᴄʜX`;

        await conn.sendMessage(from, {
            image: { url: data.avatar_url },
            caption: userInfo
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.githubstalk, .ghstalk)
// ==========================================
cmd({
    pattern: "githubstalk",
    alias: ["ghstalk", "ghprofile"],
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "main",
    react: "🖥️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    await fetchGitHubProfile(conn, mek, m, { from, args, reply });
});

// ==========================================
// 📌 2. Bina prefix wala handler (githubstalk, ghstalk, ghprofile)
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

        // GitHub stalk triggers (bina prefix)
        const ghTriggers = ["githubstalk", "ghstalk", "ghprofile"];

        // Check: kya pehla word trigger hai?
        if (!ghTriggers.includes(firstWord)) return;

        // Baaki text (username)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // GitHub profile fetch karo
        await fetchGitHubProfile(conn, mek, { }, {
            from,
            args,
            reply: replyFn
        });

    } catch (error) {
        console.error("GitHubStalk No-Prefix Error:", error);
    }
});
