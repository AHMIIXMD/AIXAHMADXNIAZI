// ============================================
// AHMAD MD - UNIQUE FUN COMMANDS
// ============================================

import { cmd } from '../command.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// 1. EMOJI RAIN COMMAND - Animated emoji rain
// ============================================
cmd({
    pattern: "rain",
    alias: ["emojirain", "rainfall"],
    desc: "Animated emoji rain effect",
    react: "🌧️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const emojis = ["🌈", "⭐", "💫", "✨", "🌙", "☀️", "🌸", "🌺", "🎵", "💎", "🌟", "🔥"];
        const rainSteps = [];

        for (let i = 0; i < 15; i++) {
            let line = "";
            for (let j = 0; j < 10; j++) {
                line += emojis[Math.floor(Math.random() * emojis.length)];
            }
            rainSteps.push(line);
        }

        const sentMsg = await conn.sendMessage(from, { 
            text: "🌧️ *EMOJI RAIN STARTED!*" 
        }, { quoted: mek });

        for (const frame of rainSteps) {
            await sleep(300);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: frame }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, { 
            text: "🌈 *Rain Stopped!* Have a beautiful day! ✨" 
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 2. EMOJI BATTLE COMMAND - Emoji fight
// ============================================
cmd({
    pattern: "fight",
    alias: ["emojifight", "battle"],
    desc: "Emoji battle animation",
    react: "⚔️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;

        const fighters = q ? q.split('|') : ["😎", "🤖"];
        const emoji1 = fighters[0] || "😎";
        const emoji2 = fighters[1] || "🤖";

        const battleSteps = [
            `⚔️ *EMOJI BATTLE STARTED!*\n\n${emoji1} vs ${emoji2}`,
            `⚔️ *ROUND 1!*\n\n${emoji1} 👊 ${emoji2}`,
            `⚔️ *ROUND 2!*\n\n${emoji1} 💥 ${emoji2}`,
            `⚔️ *ROUND 3!*\n\n${emoji1} ⚡ ${emoji2}`,
            `⚔️ *FINAL ROUND!*\n\n${emoji1} 🏆 ${emoji2}`,
        ];

        const sentMsg = await conn.sendMessage(from, { 
            text: battleSteps[0] 
        }, { quoted: mek });

        for (let i = 1; i < battleSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: battleSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        const winner = Math.random() > 0.5 ? emoji1 : emoji2;
        await conn.sendMessage(from, { 
            text: `🏆 *WINNER: ${winner}!*\n\n> *Epic Battle Complete!*` 
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 3. EMOJI PUZZLE COMMAND
// ============================================
cmd({
    pattern: "puzzle",
    alias: ["emojipuzzle"],
    desc: "Guess the emoji puzzle",
    react: "🧩",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const puzzles = [
            { emoji: "🍕", answer: "Pizza" },
            { emoji: "🚗", answer: "Car" },
            { emoji: "🌍", answer: "Earth" },
            { emoji: "📱", answer: "Phone" },
            { emoji: "💻", answer: "Computer" },
            { emoji: "🎵", answer: "Music" },
            { emoji: "📚", answer: "Books" },
            { emoji: "🍔", answer: "Burger" },
            { emoji: "✈️", answer: "Airplane" },
            { emoji: "🚀", answer: "Rocket" }
        ];

        const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
        
        await conn.sendMessage(from, {
            text: `🧩 *EMOJI PUZZLE*\n\nGuess what this emoji represents:\n\n${selected.emoji}\n\n💡 *Hint:* It's a common object\n\n⏳ *Answer in 10 seconds...*`
        }, { quoted: mek });

        await sleep(10000);

        await conn.sendMessage(from, {
            text: `✅ *Answer: ${selected.answer}!*\n\n🧩 *Better luck next time!*`
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 4. EMOJI STORY COMMAND - Random emoji story
// ============================================
cmd({
    pattern: "story",
    alias: ["emojistory"],
    desc: "Generate random emoji story",
    react: "📖",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const stories = [
            { emoji: "🌅🏖️🌊🏄‍♂️", text: "A beautiful day at the beach!" },
            { emoji: "🚀🌍⭐👽", text: "Aliens visited Earth!" },
            { emoji: "🐱🐶🦴🐾", text: "Adventures of a cat and dog!" },
            { emoji: "🏰🐉⚔️🛡️", text: "A knight fighting a dragon!" },
            { emoji: "🎮🕹️👾🏆", text: "Gaming tournament victory!" },
            { emoji: "🚗💨🏎️🏁", text: "A high-speed race!" },
            { emoji: "🍕🍔🌮🍟", text: "Food festival fun!" },
            { emoji: "🎤🎸🎵🎶", text: "A concert night!" }
        ];

        const story = stories[Math.floor(Math.random() * stories.length)];
        
        await conn.sendMessage(from, {
            text: `📖 *EMOJI STORY*\n\n${story.emoji}\n\n📝 *Meaning:* ${story.text}\n\n> *Emoji Story by AHMAD MD*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '📖', key: mek.key } });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 5. EMOJI TRANSFORM COMMAND
// ============================================
cmd({
    pattern: "transform",
    alias: ["emoji2text"],
    desc: "Transform text into emoji chain",
    react: "🔄",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;
        if (!q) return reply("❌ Please provide text to transform.\nExample: .transform Hello World");

        const wordToEmoji = {
            'love': '❤️', 'heart': '❤️', 'like': '👍', 'hate': '💔',
            'happy': '😊', 'sad': '😢', 'angry': '😡', 'excited': '🤩',
            'fire': '🔥', 'water': '💧', 'air': '🌬️', 'earth': '🌍',
            'sun': '☀️', 'moon': '🌙', 'star': '⭐', 'rain': '🌧️',
            'dog': '🐶', 'cat': '🐱', 'bird': '🐦', 'fish': '🐟',
            'car': '🚗', 'plane': '✈️', 'rocket': '🚀', 'bike': '🚲',
            'food': '🍔', 'pizza': '🍕', 'cake': '🎂', 'coffee': '☕'
        };

        const text = q.toLowerCase();
        const words = text.split(' ');
        let transformed = '';

        words.forEach(word => {
            const emoji = wordToEmoji[word] || word.split('').map(c => {
                const emojiMap = {
                    'a': '🅰️', 'b': '🅱️', 'c': '🇨', 'd': '🇩', 'e': '🇪',
                    'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯',
                    'k': '🇰', 'l': '🇱', 'm': '🇲', 'n': '🇳', 'o': '🅾️',
                    'p': '🇵', 'q': '🇶', 'r': '🇷', 's': '🇸', 't': '🇹',
                    'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾', 'z': '🇿'
                };
                return emojiMap[c] || c;
            }).join('');
            transformed += emoji + ' ';
        });

        await conn.sendMessage(from, {
            text: `🔄 *EMOJI TRANSFORMED*\n\n📝 *Original:* ${q}\n\n✨ *Emoji:* ${transformed.trim()}\n\n> *Transformed by AHMAD MD*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '🔄', key: mek.key } });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 6. EMOJI DANCE COMMAND
// ============================================
cmd({
    pattern: "dance",
    alias: ["emojidance"],
    desc: "Animated emoji dance party",
    react: "💃",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const dancers = ["💃", "🕺", "💃", "🕺", "💃", "🕺", "🎵", "🎶"];
        const danceSteps = [];

        for (let i = 0; i < 10; i++) {
            let line = "🎵 *DANCE PARTY!* 🎵\n\n";
            for (let j = 0; j < 4; j++) {
                const emoji1 = dancers[Math.floor(Math.random() * dancers.length)];
                const emoji2 = dancers[Math.floor(Math.random() * dancers.length)];
                line += `   ${emoji1} ${emoji2}\n`;
            }
            danceSteps.push(line);
        }

        const sentMsg = await conn.sendMessage(from, { 
            text: danceSteps[0] 
        }, { quoted: mek });

        for (const frame of danceSteps) {
            await sleep(500);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: frame }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, { 
            text: "🎉 *Dance Party Over!* 🎉\n\n> *Keep Dancing!* 💃🕺" 
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 7. EMOJI RACE COMMAND
// ============================================
cmd({
    pattern: "race",
    alias: ["emojirace"],
    desc: "Emoji race competition",
    react: "🏁",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;

        const racers = q ? q.split('|') : ["🏎️", "🚀", "🛵", "🚲"];
        const track = "█".repeat(10);
        const raceSteps = [];

        for (let round = 0; round < 10; round++) {
            let line = "🏁 *EMOJI RACE!*\n\n";
            racers.forEach(racer => {
                const position = Math.min(10, Math.floor(Math.random() * (round + 2)));
                const trackWithRacer = "█".repeat(position) + racer + "█".repeat(10 - position);
                line += `${trackWithRacer}\n`;
            });
            raceSteps.push(line);
        }

        const sentMsg = await conn.sendMessage(from, { 
            text: raceSteps[0] 
        }, { quoted: mek });

        for (const frame of raceSteps) {
            await sleep(800);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: frame }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        const winner = racers[Math.floor(Math.random() * racers.length)];
        await conn.sendMessage(from, { 
            text: `🏆 *WINNER: ${winner}!*\n\n> *Race Complete!*` 
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 8. EMOJI WEATHER COMMAND
// ============================================
cmd({
    pattern: "weathercast",
    alias: ["emojweather"],
    desc: "Emoji weather forecast",
    react: "🌤️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const weathers = [
            { emoji: "☀️", text: "Sunny day! Time to go out!" },
            { emoji: "🌤️", text: "Partly cloudy. Nice weather!" },
            { emoji: "⛅", text: "Cloudy. May rain later." },
            { emoji: "🌧️", text: "Rainy! Take an umbrella!" },
            { emoji: "⛈️", text: "Thunderstorm! Stay indoors!" },
            { emoji: "🌨️", text: "Snowy! Play in the snow!" },
            { emoji: "🌪️", text: "Tornado warning! Take cover!" },
            { emoji: "🌈", text: "Rainbow! Beautiful day!" }
        ];

        const forecast = [];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        for (let i = 0; i < 7; i++) {
            const weather = weathers[Math.floor(Math.random() * weathers.length)];
            forecast.push(`${days[i]}: ${weather.emoji} ${weather.text}`);
        }

        await conn.sendMessage(from, {
            text: `🌤️ *EMOJI WEATHER FORECAST*\n\n📅 *7-Day Forecast:*\n\n${forecast.join('\n')}\n\n> *Weather by AHMAD MD*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '🌤️', key: mek.key } });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 9. EMOJI MENU COMMAND
// ============================================
cmd({
    pattern: "emojimenu",
    alias: ["emenu"],
    desc: "Show all emoji commands",
    react: "🎨",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const menu = `
╭━━〔 🎨 *EMOJI COMMANDS* 〕━━┈⊷
┃
┃ • .rain - Emoji rain effect 🌧️
┃ • .fight - Emoji battle ⚔️
┃ • .puzzle - Emoji puzzle 🧩
┃ • .story - Emoji story 📖
┃ • .transform - Text to emoji 🔄
┃ • .dance - Emoji dance 💃
┃ • .race - Emoji race 🏁
┃ • .weathercast - Emoji weather 🌤️
┃ • .emojimenu - This menu 🎨
┃
┃━━━━━━━━━━━━━━━━━━
┃ ⚠️ *Owner Only Commands!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: menu
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '🎨', key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
