import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "chumi",
    desc: "Displays kissing emoji animation",
    category: "tools",
    react: "💋",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "🥵", "❤️", "💋", "😫", "🤤", 
            "😋", "🥵", "🥶", "🙊", "😻", 
            "🙈", "💋", "🫂", "🫀", "👅", 
            "👄", "💋"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 12. LOADING Command
cmd({
    pattern: "loading",
    alias: ["load", "progress"],
    desc: "Displays a loading animation",
    category: "tools",
    react: "🔄",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const loadingFrames = [
            "🔄 *Loading...* ```[▱▱▱▱▱▱▱▱▱▱] 0%```",
            "🔄 *Loading...* ```[▰▱▱▱▱▱▱▱▱▱] 10%```",
            "🔄 *Loading...* ```[▰▰▱▱▱▱▱▱▱▱] 20%```",
            "🔄 *Loading...* ```[▰▰▰▱▱▱▱▱▱▱] 30%```",
            "🔄 *Loading...* ```[▰▰▰▰▱▱▱▱▱▱] 40%```",
            "🔄 *Loading...* ```[▰▰▰▰▰▱▱▱▱▱] 50%```",
            "🔄 *Loading...* ```[▰▰▰▰▰▰▱▱▱▱] 60%```",
            "🔄 *Loading...* ```[▰▰▰▰▰▰▰▱▱▱] 70%```",
            "🔄 *Loading...* ```[▰▰▰▰▰▰▰▰▱▱] 80%```",
            "🔄 *Loading...* ```[▰▰▰▰▰▰▰▰▰▱] 90%```",
            "🔄 *Loading...* ```[▰▰▰▰▰▰▰▰▰▰] 100%```",
            "✅ *Loading Complete!*"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of loadingFrames) {
            currentText = frame;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 13. COUNTDOWN Command
cmd({
    pattern: "cd",
    alias: ["cd", "timer"],
    desc: "Starts a countdown from 10 to 1",
    category: "tools",
    react: "⏰",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (let i = 10; i >= 1; i--) {
            currentText = `⏰ *Countdown* ⏰\n\n🚀 ${i}...`;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🎉 *Countdown Complete!* 🎉\n\n*Blast Off!* 🚀";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 14. WEATHER Command
cmd({
    pattern: "wthr",
    alias: ["forecast"],
    desc: "Simulates weather animation",
    category: "tools",
    react: "🌤️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const weatherFrames = [
            "🌤️ *Weather Update*\n\n☀️ Sunny day...",
            "🌤️ *Weather Update*\n\n⛅ Partly cloudy...",
            "🌤️ *Weather Update*\n\n🌥️ Clouds forming...",
            "🌤️ *Weather Update*\n\n☁️ Mostly cloudy...",
            "🌤️ *Weather Update*\n\n🌦️ Light rain starting...",
            "🌤️ *Weather Update*\n\n🌧️ Rain falling...",
            "🌤️ *Weather Update*\n\n⛈️ Thunderstorm!",
            "🌤️ *Weather Update*\n\n🌧️ Rain stopping...",
            "🌤️ *Weather Update*\n\n🌥️ Clouds clearing...",
            "🌤️ *Weather Update*\n\n🌤️ Back to sunny!",
            "✅ *Weather Report Complete!*"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of weatherFrames) {
            currentText = frame;
            await sleep(1500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 15. TYPING Command
cmd({
    pattern: "type",
    alias: ["type", "writer"],
    desc: "Simulates typing animation",
    category: "tools",
    react: "⌨️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const text = "Hello! This is a typing simulation...";
        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (let i = 0; i <= text.length; i++) {
            currentText = text.substring(0, i) + (i < text.length ? "▊" : "");
            await sleep(100);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await sleep(500);
        currentText = text + "\n\n✅ *Typing complete!*";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 16. SPINNER Command
cmd({
    pattern: "spinner",
    alias: ["spin", "rotate"],
    desc: "Displays a spinning animation",
    category: "tools",
    react: "🌀",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const spinnerFrames = [
            "🌀 *Spinning...* ⬆️",
            "🌀 *Spinning...* ↗️",
            "🌀 *Spinning...* ➡️",
            "🌀 *Spinning...* ↘️",
            "🌀 *Spinning...* ⬇️",
            "🌀 *Spinning...* ↙️",
            "🌀 *Spinning...* ⬅️",
            "🌀 *Spinning...* ↖️"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        // Repeat the spinner 3 times
        for (let round = 0; round < 3; round++) {
            for (const frame of spinnerFrames) {
                currentText = frame;
                await sleep(300);
                const protocolMsg = {
                    key: sentMessage.key,
                    type: 0xe,
                    editedMessage: { conversation: currentText }
                };
                await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
            }
        }

        currentText = "✅ *Spinning Complete!* 🎯";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 18. ROCKET Command
cmd({
    pattern: "rocket",
    alias: ["launch", "blastoff"],
    desc: "Rocket launch animation",
    category: "tools",
    react: "🚀",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const rocketFrames = [
            "🚀 *Rocket Launch Sequence Initiated*\n\n🔧 Systems check...",
            "🚀 *Rocket Launch Sequence*\n\n⛽ Fuel loading... ```[▰▱▱▱▱] 20%```",
            "🚀 *Rocket Launch Sequence*\n\n⛽ Fuel loading... ```[▰▰▰▱▱] 60%```",
            "🚀 *Rocket Launch Sequence*\n\n⛽ Fuel loading... ```[▰▰▰▰▰] 100%```",
            "🚀 *Rocket Launch Sequence*\n\n🎯 Navigation systems online",
            "🚀 *Rocket Launch Sequence*\n\n🔬 Pre-launch diagnostics...",
            "🚀 *Launch Countdown*\n\n3...",
            "🚀 *Launch Countdown*\n\n2...",
            "🚀 *Launch Countdown*\n\n1...",
            "🚀 *LIFTOFF!* 🎉\n\n          ✨\n          ▲\n         / \\\n        /   \\\n       /🚀   \\\n      /       \\\n     /         \\",
            "🚀 *Ascending...*\n\n          ✨\n          ▲\n         / \\\n        /   \\\n       /     \\\n      / 🚀   \\\n     /        \\",
            "🚀 *Entering Orbit...*\n\n          ▲\n         / \\\n        /   \\\n       /     \\\n      /       \\\n     /   🚀   \\",
            "🚀 *Mission Successful!*\n\n🌍 Rocket has reached orbit!\n✨ Mission accomplished!"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of rocketFrames) {
            currentText = frame;
            await sleep(1500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Launch failed!* ${e.message}`);
    }
});

// 19. CLOCK Command
cmd({
    pattern: "clock",
    desc: "Analog clock animation showing time passing",
    category: "tools",
    react: "⏰",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const clockFrames = [
            "⏰ *3:00*\n\n     🕒\n   /    \\\n  /      \\\n |    •   |\n  \\      /\n   \\____/",
            "⏰ *3:15*\n\n     🕒\n   /    \\\n  /      \\\n |   ➚•  |\n  \\      /\n   \\____/",
            "⏰ *3:30*\n\n     🕒\n   /    \\\n  /      \\\n |    ➚  |\n  \\  •  /\n   \\____/",
            "⏰ *3:45*\n\n     🕒\n   /    \\\n  /      \\\n |  •➚   |\n  \\      /\n   \\____/",
            "⏰ *4:00*\n\n     🕓\n   /    \\\n  /      \\\n |    •   |\n  \\      /\n   \\____/",
            "⏰ *4:15*\n\n     🕓\n   /    \\\n  /      \\\n |   ➚•  |\n  \\      /\n   \\____/",
            "⏰ *4:30*\n\n     🕓\n   /    \\\n  /      \\\n |    ➚  |\n  \\  •  /\n   \\____/",
            "⏰ *4:45*\n\n     🕓\n   /    \\\n  /      \\\n |  •➚   |\n  \\      /\n   \\____/",
            "⏰ *5:00*\n\n     🕔\n   /    \\\n  /      \\\n |    •   |\n  \\      /\n   \\____/",
            "⏰ *Time Animation Complete!*\n\n⏳ 2 hours have passed in animation!"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of clockFrames) {
            currentText = frame;
            await sleep(1200);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Clock stopped!* ${e.message}`);
    }
});

// 2. FING Command
cmd({
    pattern: "fing",
    alias: ['fingering', 'hath', 'ungli', 'touch', 'moan'],
    desc: "Funny girl animation (owner only)",
    category: "tools",
    react: "👅",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const animationFrames = [
            "👆🏻------🍑", 
            "👆🏻-----🍑", 
            "👆🏻----🍑", 
            "👆🏻---🍑", 
            "👆🏻--🍑", 
            "👆🏻-🍑", 
            "👆🏻🍑", 
            "👉🏻🍑", 
            "👉🏻💦🍑", 
            "👉🏻💦💦🍑", 
            "👉🏻💦💦💦🍑", 
            "💦🍑💦 *Awf 🥵👅*"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of animationFrames) {
            currentText = frame;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 3. MUTH Command
cmd({
    pattern: "muth",
    alias: ["handjob", "hand"],
    desc: "Displays a simple handjob animation (owner only)",
    category: "fun",
    react: "✊",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const animationFrames = [
            "✊ 🍌",
            "✊🍌",
            "✊🍌💦",
            "✊🍌💦💦",
            "😩💦💦💦",
            "😵‍💫 Done!"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of animationFrames) {
            currentText = frame;
            await sleep(800);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// 4. HAPPY Command
cmd({
    pattern: "happy",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "😃", "😄", "😁", "😊", "😎", "🥳",
            "😸", "😹", "🌞", "🌈", "😃", "😄",
            "😁", "😊", "😎", "🥳", "😸", "😹",
            "🌞", "🌈", "😃", "😄", "😁", "😊"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 5. HEART Command
cmd({
    pattern: "heart",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "❤️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "💖", "💗", "💕", "🩷", "💛", "💚",
            "🩵", "💙", "💜", "🖤", "🩶", "🤍",
            "🤎", "❤️‍🔥", "💞", "💓", "💘", "💝",
            "♥️", "💟", "❤️‍🩹", "❤️"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 6. ANGRY Command
cmd({
    pattern: "angry",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🤡",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "😡", "😠", "🤬", "😤", "😾", "😡",
            "😠", "🤬", "😤", "😾"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 7. SAD Command
cmd({
    pattern: "sad",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "😶",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "🥺", "😟", "😕", "😖", "😫", "🙁",
            "😩", "😥", "😓", "😪", "😢", "😔",
            "😞", "😭", "💔", "😭", "😿"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 8. SHY Command
cmd({
    pattern: "shy",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🧐",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "😳", "😊", "😶", "🙈", "🙊",
            "😳", "😊", "😶", "🙈", "🙊"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 9. MOON Command
cmd({
    pattern: "moon",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🌚",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "🌗", "🌘", "🌑", "🌒", "🌓", "🌔",
            "🌕", "🌖", "🌗", "🌘", "🌑", "🌒",
            "🌓", "🌔", "🌕", "🌖", "🌗", "🌘",
            "🌑", "🌒", "🌓", "🌔", "🌕", "🌖",
            "🌗", "🌘", "🌑", "🌒", "🌓", "🌔",
            "🌕", "🌖", "🌝🌚"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 10. CONFUSED Command
cmd({
    pattern: "confused",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🤔",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const emojiMessages = [
            "😕", "😟", "😵", "🤔", "😖", 
            "😲", "😦", "🤷", "🤷‍♂️", "🤷‍♀️"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const line of emojiMessages) {
            currentText = line;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

// 11. NIKAL Command
cmd({
    pattern: "nikal",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🗿",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const asciiMessages = [
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀     ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀  ⠀    ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀__⠀   ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀  ⠀  ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Lavde   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__|⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀     ⠀   ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀⠀      ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸   Pehli   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀     ⣿  ⢹⠀           ⡇\n  ⠙⢿⣯⠄⠀⠀(P)⠀⠀     ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀     ⠀   ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀   ⠀     ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Fursat  ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀        ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀⠀__ ⠀  ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀      ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀ ⠀      ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Meeee   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀       ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__| ⠀    ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀   ⠀  ⠀⢳⡀⠀⡏⠀⠀       ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀  ⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲   ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀       ⣿  ⢹⠀           ⡇\n  ⠙⢿⣯⠄⠀⠀lodu⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀   ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀  ⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀"
        ];

        let currentText = '';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const asciiMessage of asciiMessages) {
            currentText = asciiMessage;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});
