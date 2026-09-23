// ============================================
// AHMAD MD - BRAND NEW UNIQUE COMMANDS
// ============================================

import { cmd } from '../command.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// 1. MATRIX EFFECT COMMAND
// ============================================
cmd({
    pattern: "matrix",
    alias: ["hacker", "matrixcode"],
    desc: "Falling matrix code animation",
    react: "💻",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const chars = "01アイウエオカキクケコサシスセソタチツテト";
        const matrixFrames = [];

        for (let i = 0; i < 15; i++) {
            let line = "";
            for (let j = 0; j < 20; j++) {
                line += chars[Math.floor(Math.random() * chars.length)] + " ";
            }
            matrixFrames.push(`\`\`\`${line}\`\`\``);
        }

        const sentMsg = await conn.sendMessage(from, { 
            text: "💻 *MATRIX INITIALIZED...*"
        }, { quoted: mek });

        for (const frame of matrixFrames) {
            await sleep(200);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: frame }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, { 
            text: "💻 *Matrix Complete!*\n> *You are The One!* 🕶️"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 2. FORTUNE TELLER COMMAND
// ============================================
cmd({
    pattern: "fortune",
    alias: ["future", "predict"],
    desc: "Get your daily fortune prediction",
    react: "🔮",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, sender }) => {
    try {
        if (!isCreator) return;

        const fortunes = [
            "🌟 You will meet someone special today!",
            "💰 Money is coming your way!",
            "❤️ Love is in the air for you!",
            "🎉 Great success awaits you!",
            "🌈 A wonderful surprise is coming!",
            "💪 You are stronger than you think!",
            "🌟 Your hard work will pay off soon!",
            "🌸 Happiness is around the corner!",
            "✨ A new opportunity is coming!",
            "🎯 You will achieve your goals today!",
            "🌺 Someone is thinking of you right now!",
            "💫 The stars are aligned for you!",
            "🎊 Celebration time is coming!",
            "🌙 Good fortune is on its way!",
            "🔥 You are about to shine brightly!"
        ];

        const luckyNumbers = [7, 13, 21, 33, 42, 55, 69, 77, 88, 99];
        const luckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)];

        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: `🔮 *YOUR FORTUNE*\n\n${fortune}\n\n🍀 *Lucky Number:* ${luckyNumber}\n⭐ *Your lucky emoji:* ${["🌟","💰","❤️","🎉","🌈","💪","🌸","✨","🎯","🌺"][Math.floor(Math.random() * 10)]}\n\n> *Daily Fortune by AHMAD MD*`
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 3. GRAVITY COMMAND
// ============================================
cmd({
    pattern: "gravity",
    alias: ["flip", "upside"],
    desc: "Reverse/flip text animation",
    react: "🔄",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;
        if (!q) return reply("❌ Please provide text to flip.\nExample: .gravity Hello World");

        const text = q;
        const flippedText = text.split('').reverse().join('');
        const altFlip = text.toUpperCase().split('').reverse().join('');

        const frames = [
            `📝 *Original:* ${text}`,
            `🔄 *Gravity shift...*`,
            `🌀 *Spinning...*`,
            `⬇️ *Falling...*`,
            `⭐ *Flipped:* ${flippedText}`,
            `✨ *Alternative:* ${altFlip}`
        ];

        const sentMsg = await conn.sendMessage(from, { 
            text: frames[0]
        }, { quoted: mek });

        for (let i = 1; i < frames.length; i++) {
            await sleep(700);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: frames[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 4. ECHO CHAMBER COMMAND
// ============================================
cmd({
    pattern: "echo",
    alias: ["repeat", "mirror"],
    desc: "Echo your message with effects",
    react: "🔊",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;
        if (!q) return reply("❌ Please provide text to echo.\nExample: .echo Hello");

        const text = q;
        const echoLines = [
            `🔊 *Echo Effect Activated!*`,
            `📢 ${text}`,
            `🔊 ${text}`,
            `🗣️ ${text}`,
            `📣 ${text.toUpperCase()}`
        ];

        const sentMsg = await conn.sendMessage(from, { 
            text: echoLines[0]
        }, { quoted: mek });

        for (let i = 1; i < echoLines.length; i++) {
            await sleep(500);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: echoLines[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 5. GALAXY COMMAND
// ============================================
cmd({
    pattern: "galaxy",
    alias: ["stars", "space"],
    desc: "Animated galaxy/stars effect",
    react: "🌌",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const galaxies = [
            "✦  ✧  ★  ✧  ✦",
            "  ✦  ✧  ★  ✧",
            "★  ✧  ✦  ✧  ★",
            "✧  ★  ✦  ★  ✧",
            "✦  ✧  ★  ✧  ✦",
            "  ✦  ✧  ★  ✧",
            "★  ✧  ✦  ✧  ★"
        ];

        const sentMsg = await conn.sendMessage(from, { 
            text: "🌌 *GALAXY LOADING...*"
        }, { quoted: mek });

        for (const galaxy of galaxies) {
            await sleep(400);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: `🌌 *Galaxy Effect*\n\n${galaxy}` }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, { 
            text: "🌌 *Galaxy Complete!*\n> *You are a star!* ⭐"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 6. NINJA COMMAND
// ============================================
cmd({
    pattern: "ninja",
    alias: ["shadow", "stealth"],
    desc: "Become a ninja with shadow effects",
    react: "🥷",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const ninjaSteps = [
            "🥷 *Ninja Mode Activated!*",
            "🔇 *Entering Stealth...*",
            "💨 *Moving in Shadows...*",
            "🗡️ *Preparing Attack...*",
            "⚡ *Strike!*",
            "💀 *Opponent Defeated!*",
            "🌀 *Ninja Vanished!*"
        ];

        const sentMsg = await conn.sendMessage(from, { 
            text: ninjaSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < ninjaSteps.length; i++) {
            await sleep(800);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: ninjaSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, { 
            text: "🥷 *You are now a Shadow Ninja!*\n> *Use your powers wisely!* 🗡️"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 7. SPARKLE COMMAND
// ============================================
cmd({
    pattern: "sparkle",
    alias: ["glitter", "shine"],
    desc: "Sparkle effect animation",
    react: "✨",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;

        const text = q || "✨";
        const sparkleFrames = [
            `✨ *${text}* ✨`,
            `🌟 *${text}* 🌟`,
            `⭐ *${text}* ⭐`,
            `✨ *${text}* ✨`,
            `💫 *${text}* 💫`
        ];

        const sentMsg = await conn.sendMessage(from, { 
            text: sparkleFrames[0]
        }, { quoted: mek });

        for (let i = 1; i < sparkleFrames.length; i++) {
            await sleep(400);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: sparkleFrames[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 8. RIDDLE COMMAND
// ============================================
cmd({
    pattern: "riddle",
    alias: ["brain", "puzzle"],
    desc: "Get a random brain teaser riddle",
    react: "🧠",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const riddles = [
            { q: "What has keys but no locks?", a: "A Piano" },
            { q: "What gets wetter as it dries?", a: "A Towel" },
            { q: "What has hands but can't clap?", a: "A Clock" },
            { q: "What has a head and a tail but no body?", a: "A Coin" },
            { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
            { q: "What can travel around the world while staying in a corner?", a: "A Stamp" },
            { q: "What is always in front of you but can't be seen?", a: "The Future" },
            { q: "What gets bigger the more you take away?", a: "A Hole" }
        ];

        const riddle = riddles[Math.floor(Math.random() * riddles.length)];

        await conn.sendMessage(from, {
            text: `🧠 *RIDDLE TIME!*\n\n❓ ${riddle.q}\n\n⏳ *Think about it...*`
        }, { quoted: mek });

        await sleep(8000);

        await conn.sendMessage(from, {
            text: `✅ *Answer:* ${riddle.a}\n\n> *Brain Teaser by AHMAD MD*`
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 9. MOOD COMMAND
// ============================================
cmd({
    pattern: "mood",
    alias: ["vibe", "feeling"],
    desc: "Set your current mood",
    react: "🎭",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q, sender }) => {
    try {
        if (!isCreator) return;

        const mood = q || "happy";
        const moods = {
            happy: "😊", sad: "😢", angry: "😡", excited: "🤩",
            tired: "😴", love: "❤️", cool: "😎", crazy: "🤪",
            chill: "😌", energy: "⚡", peace: "🕊️", fire: "🔥"
        };

        const emoji = moods[mood.toLowerCase()] || "😊";

        const moodMessage = `🎭 *MOOD UPDATED*\n\n👤 *User:* ${sender.split('@')[0]}\n📌 *Mood:* ${mood}\n${emoji} *Feeling ${mood}!*\n\n> *Mood Tracker by AHMAD MD*`;

        await conn.sendMessage(from, {
            text: moodMessage
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 10. COUNTDOWN COMMAND
// ============================================
cmd({
    pattern: "countdown",
    alias: ["timer", "clock"],
    desc: "Animated countdown timer",
    react: "⏰",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        if (!isCreator) return;

        const seconds = parseInt(q) || 10;
        if (seconds > 30) return reply("❌ Max 30 seconds");

        const sentMsg = await conn.sendMessage(from, { 
            text: `⏰ *COUNTDOWN STARTED!*\n\n${seconds}`
        }, { quoted: mek });

        for (let i = seconds - 1; i >= 0; i--) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { 
                    conversation: i > 0 ? 
                    `⏰ *COUNTDOWN*\n\n${i}` : 
                    `🎉 *TIME'S UP!* 🎉`
                }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 11. UNIQUE MENU COMMAND
// ============================================
cmd({
    pattern: "uniquemenu",
    alias: ["newmenu", "fresh"],
    desc: "Show all unique commands",
    react: "🚀",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const menu = `
╭━━〔 🚀 *UNIQUE COMMANDS* 〕━━┈⊷
┃
┃ 📌 *Brand New Commands:*
┃
┃ • .matrix - Matrix code effect 💻
┃ • .fortune - Daily fortune 🔮
┃ • .gravity - Flip text 🔄
┃ • .echo - Echo effect 🔊
┃ • .galaxy - Galaxy effect 🌌
┃ • .ninja - Ninja mode 🥷
┃ • .sparkle - Sparkle effect ✨
┃ • .riddle - Brain teaser 🧠
┃ • .mood - Set mood 🎭
┃ • .countdown - Timer ⏰
┃ • .uniquemenu - This menu 🚀
┃
┃━━━━━━━━━━━━━━━━━━
┃ ⚠️ *Owner Only Commands!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: menu
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
