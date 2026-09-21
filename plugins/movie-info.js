import axios from 'axios';
import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ==========================================
// 🔧 Common function — Movie info fetch karne ke liye
// ==========================================
async function fetchMovieInfo(conn, mek, m, { from, reply, sender, args }) {
    try {
        // Properly extract the movie name from arguments
        const movieName = args.length > 0
            ? args.join(' ')
            : (m.text || "").replace(/^[\.\#\$\!]?movie(info)?\s?/i, '').trim();

        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.\nExample: .movieinfo Iron Man");
        }

        const apiUrl = `https://apis.davidcyriltech.my.id/imdb?query=${encodeURIComponent(movieName)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status || !response.data.movie) {
            return reply("🚫 Movie not found. Please check the name and try again.");
        }

        const movie = response.data.movie;

        // Format the caption
        const dec = `
🎬 *${movie.title}* (${movie.year}) ${movie.rated || ''}

⭐ *IMDb:* ${movie.imdbRating || 'N/A'} | 🍅 *Rotten Tomatoes:* ${movie.ratings?.find(r => r.source === 'Rotten Tomatoes')?.value || 'N/A'} | 💰 *Box Office:* ${movie.boxoffice || 'N/A'}

📅 *Released:* ${new Date(movie.released).toLocaleDateString()}
⏳ *Runtime:* ${movie.runtime}
🎭 *Genre:* ${movie.genres}

📝 *Plot:* ${movie.plot}

🎥 *Director:* ${movie.director}
✍️ *Writer:* ${movie.writer}
🌟 *Actors:* ${movie.actors}

🌍 *Country:* ${movie.country}
🗣️ *Language:* ${movie.languages}
🏆 *Awards:* ${movie.awards || 'None'}

[View on IMDb](${movie.imdbUrl})
`;

        // Send message
        await conn.sendMessage(
            from,
            {
                image: {
                    url: movie.poster && movie.poster !== 'N/A' ? movie.poster : 'https://files.catbox.moe/7zfdcq.jpg'
                },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363408512260657@newsletter',
                        newsletterName: 'AHMAD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Movie command error:', e);
        reply(`❌ Error: ${e.message}`);
    }
}

// ==========================================
// 📌 1. Prefix wala handler (.movieinfo, .movie, .imdb)
// ==========================================
cmd({
    pattern: "movieinfo",
    alias: ["movie", "imdb"],
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, args }) => {
    await fetchMovieInfo(conn, mek, m, { from, reply, sender, args });
});

// ==========================================
// 📌 2. Bina prefix wala handler (movieinfo, movie, imdb)
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

        // Movie info triggers (bina prefix)
        const movieTriggers = ["movieinfo", "movie", "imdb"];

        // Check: kya pehla word trigger hai?
        if (!movieTriggers.includes(firstWord)) return;

        // Baaki text (movie name)
        const restText = userText.slice(firstWord.length).trim();
        const args = restText.split(/\s+/).filter(a => a);

        // Reply function
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        // Movie info fetch karo
        await fetchMovieInfo(conn, mek, {
            text: userText,
            sender: sender
        }, {
            from,
            reply: replyFn,
            sender,
            args
        });

    } catch (error) {
        console.error("MovieInfo No-Prefix Error:", error);
    }
});
