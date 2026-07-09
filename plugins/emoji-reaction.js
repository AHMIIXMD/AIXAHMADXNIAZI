// ============================================
// AHMAD MD - EMOJI REACTION SYSTEM
// ============================================

import { cmd } from '../command.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// MAIN EMOJI REACTION COMMAND
// When user sends any emoji, bot responds with random emoji
// ============================================

// All emojis for random response
const responseEmojis = [
    // Smileys & Emotion
    "😊", "😂", "🤣", "❤️", "💕", "🥰", "😍", "🤩", "😘", "😗", "😙", "😚",
    "🥲", "😀", "😁", "😅", "😆", "🤣", "😂", "🙂", "🙃", "🫠", "😉", "😊",
    "😇", "🥰", "😍", "🤩", "😘", "😗", "😙", "😚", "🥲", "😀", "😁", "😅",
    "😆", "🤣", "😂", "🙂", "🙃", "🫠", "😉", "😊", "😇", "🥰", "😍", "🤩",
    
    // Hearts
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹",
    "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥️", "♦️", "♠️", "♣️",
    
    // Animals
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮",
    "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉",
    "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰",
    "🪲", "🪳", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦀", "🐡",
    "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🦭", "🐅", "🐆", "🦓", "🦍",
    
    // Food
    "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑",
    "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🫒", "🥦", "🥬", "🥒", "🌶️",
    "🫑", "🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨",
    "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭",
    "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘",
    "🫕", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍤", "🍥", "🥮", "🍡", "🍢",
    "🍧", "🍨", "🍩", "🍪", "🎂", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯",
    
    // Activities
    "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓",
    "🏸", "🏒", "🥍", "🏑", "⛳", "🎣", "🥊", "🥋", "🎽", "🛹", "🛼", "🎿",
    "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "⛹️", "🤾", "🏌️", "🏇", "🧘", "🏄",
    "🏊", "🤽", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️",
    
    // Travel & Places
    "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚",
    "🚛", "🚜", "🏍️", "🛵", "🚲", "🛴", "🛹", "🛼", "🚂", "🚃", "🚄", "🚅",
    "🚆", "🚇", "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚎", "🏎️", "🚓",
    "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🏍️", "🛵", "🚲", "🛴", "🛹",
    "✈️", "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛳️", "⛵",
    "🚤", "🛥️", "🛶", "🚢", "🪭", "🪁", "🎈", "🎉", "🎊", "🎋", "🎍", "🎎",
    
    // Objects
    "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "💽", "💾", "💿", "📀",
    "🧮", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🪆", "🪁", "🎯", "🎳", "🎪",
    "🎨", "🎭", "🪄", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🪘", "🎷", "🎺",
    "🎸", "🎻", "🪕", "🎙️", "🎚️", "🎛️", "📻", "📺", "📹", "📼", "🔍", "🔎",
    "🕯️", "💡", "🔦", "🏮", "🪔", "📔", "📕", "📖", "📗", "📘", "📙", "📚",
    "📓", "📒", "📃", "📜", "📄", "📰", "📑", "🔖", "🏷️", "💰", "🪙", "💴",
    "💵", "💶", "💷", "💸", "💳", "🧾", "💹", "📈", "📉", "📊", "📋", "📌",
    "📍", "📎", "🖇️", "📏", "📐", "✂️", "🗃️", "🗄️", "🗑️", "🔒", "🔓", "🔏",
    
    // Symbols
    "🔄", "⏫", "⏬", "⏩", "⏪", "⏮️", "⏭️", "⏯️", "🔼", "🔽", "⏸️", "⏹️",
    "⏺️", "⏏️", "🎦", "🔅", "🔆", "📶", "📳", "📴", "♻️", "⚜️", "🔱", "📛",
    "🔰", "⭕", "❌", "⛔", "🚫", "🚳", "🚭", "🚯", "🚱", "🚷", "📵", "🔞",
    
    // More fun emojis
    "⭐", "🌟", "✨", "⚡", "💫", "🔥", "💯", "🎯", "🎖️", "🏆", "🥇", "🥈",
    "🥉", "🎪", "🎨", "🎭", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺",
    "🎸", "🎻", "🪕", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🪆", "🪁"
];

// ============================================
// MAIN COMMAND - Triggers on any emoji
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        // Check if user is owner
        if (!isCreator) return;

        // Check if message is exactly one emoji (no other text)
        const trimmed = body.trim();
        
        // Check if it's a single emoji (no spaces, no text)
        const emojiRegex = /^[\p{Emoji}\u200d\u20e3\uFE0F]+$/u;
        if (!emojiRegex.test(trimmed)) return;

        // Check if it's a single character emoji (not multiple emojis)
        const emojiCount = [...trimmed].filter(char => 
            /\p{Emoji}/u.test(char)
        ).length;
        
        if (emojiCount !== 1) return;

        // If user sends an emoji, reply with a random emoji
        const randomEmoji = responseEmojis[Math.floor(Math.random() * responseEmojis.length)];
        
        await conn.sendMessage(from, {
            text: randomEmoji
        }, { quoted: mek });

    } catch (e) {
        // Silent fail - don't spam errors
    }
});

// ============================================
// EMOJI REACTION WITH ROTATION COMMAND
// When user sends emoji, bot cycles through multiple emojis
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;

        const trimmed = body.trim();
        const emojiRegex = /^[\p{Emoji}\u200d\u20e3\uFE0F]+$/u;
        if (!emojiRegex.test(trimmed)) return;

        const emojiCount = [...trimmed].filter(char => 
            /\p{Emoji}/u.test(char)
        ).length;
        
        if (emojiCount !== 1) return;

        // Send 3 different emojis with delay
        const emojis = [
            responseEmojis[Math.floor(Math.random() * responseEmojis.length)],
            responseEmojis[Math.floor(Math.random() * responseEmojis.length)],
            responseEmojis[Math.floor(Math.random() * responseEmojis.length)]
        ];

        // Send first emoji
        const sentMsg = await conn.sendMessage(from, {
            text: emojis[0]
        }, { quoted: mek });

        // Update to second emoji
        await sleep(500);
        const protocolMsg1 = {
            key: sentMsg.key,
            type: 0xe,
            editedMessage: { conversation: emojis[1] }
        };
        await conn.relayMessage(from, { protocolMessage: protocolMsg1 }, {});

        // Update to third emoji
        await sleep(500);
        const protocolMsg2 = {
            key: sentMsg.key,
            type: 0xe,
            editedMessage: { conversation: emojis[2] }
        };
        await conn.relayMessage(from, { protocolMessage: protocolMsg2 }, {});

    } catch (e) {
        // Silent fail
    }
});

// ============================================
// EMOJI REACTION WITH TEXT COMMAND
// When user sends emoji, bot replies with emoji + message
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;

        const trimmed = body.trim();
        const emojiRegex = /^[\p{Emoji}\u200d\u20e3\uFE0F]+$/u;
        if (!emojiRegex.test(trimmed)) return;

        const emojiCount = [...trimmed].filter(char => 
            /\p{Emoji}/u.test(char)
        ).length;
        
        if (emojiCount !== 1) return;

        const randomEmoji = responseEmojis[Math.floor(Math.random() * responseEmojis.length)];
        const messages = [
            `*${randomEmoji}*`,
            `_${randomEmoji}_`,
            `*${randomEmoji}* 😂`,
            `*${randomEmoji}* ❤️`,
            `*${randomEmoji}* 🔥`,
            `*${randomEmoji}* ✨`,
            `*${randomEmoji}* 💯`,
            `*${randomEmoji}* 🌟`
        ];

        await conn.sendMessage(from, {
            text: messages[Math.floor(Math.random() * messages.length)]
        }, { quoted: mek });

    } catch (e) {
        // Silent fail
    }
});

// ============================================
// EMOJI MENU COMMAND
// ============================================
cmd({
    pattern: "emojimenu",
    desc: "Show emoji reaction commands",
    react: "🎨",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const menu = `
╭━━〔 🎨 *EMOJI REACTION SYSTEM* 〕━━┈⊷
┃
┃ 📌 *How it works:*
┃ 
┃ Send any single emoji without prefix
┃ Bot will reply with a random emoji
┃ 
┃ 📌 *Examples:*
┃ → Send: 😊
┃ → Bot replies: ❤️ (random emoji)
┃ 
┃ Send: 🔥
┃ → Bot replies: ⭐ (random emoji)
┃ 
┃ *Each emoji gets a random reaction!*
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
