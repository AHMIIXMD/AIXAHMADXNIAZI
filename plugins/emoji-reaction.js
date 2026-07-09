// ============================================
// AHMAD MD - EMOJI TRIGGER ANIMATIONS
// ============================================

const { cmd, commands } = require("../command");
const { sleep } = require("../lib/functions");
const config = require("../config");

// ============================================
// 1. 🌧️ EMOJI RAIN - Send 🌧️ to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌧️') return;

        const frames = [
            "🌧️💧💦🌊",
            "💧🌧️💦🌊",
            "💦🌧️💧🌊",
            "🌊💦🌧️💧",
            "💧💦🌊🌧️",
            "🌧️💦💧🌊",
            "💦🌊🌧️💧"
        ];

        let currentText = '🌧️ *Rain Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🌧️ *Emoji Rain*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌈 *Rain Stopped!*\n\n✨ Have a beautiful day!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 2. 💃 EMOJI DANCE - Send 💃 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💃') return;

        const frames = [
            "💃🕺💃🕺\n🎵🎶🎵🎶",
            "🕺💃🕺💃\n🎶🎵🎶🎵",
            "💃🕺💃🕺\n🎵🎶🎵🎶",
            "🕺💃🕺💃\n🎶🎵🎶🎵",
            "💃🕺💃🕺\n🎵🎶🎵🎶"
        ];

        let currentText = '💃 *Dance Party Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `💃 *Dance Party*\n\n${frame}`;
            await sleep(600);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🎉 *Dance Complete!*\n\n💃 Keep Dancing!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 3. ⚔️ EMOJI FIGHT - Send ⚔️ to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '⚔️') return;

        const frames = [
            "😎 vs 🤖\n⚔️ Round 1!",
            "😎 👊 🤖\n💥 BOOM!",
            "😎 💥 🤖\n💢 OOF!",
            "😎 ⚡ 🤖\n💥 KABOOM!",
            "😎 🏆 🤖\n🎉 FINISH!"
        ];

        let currentText = '⚔️ *Fight Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `⚔️ *Emoji Fight*\n\n${frame}`;
            await sleep(800);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🏆 *Winner: 😎!*\n\n> *Epic Battle Complete!*";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 4. 💓 HEART BEAT - Send 💓 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💓') return;

        const frames = [
            "💓💓💓\n💗💗💗",
            "❤️❤️❤️\n💖💖💖",
            "💓💓💓\n💗💗💗",
            "❤️❤️❤️\n💖💖💖",
            "💓💓💓\n💗💗💗"
        ];

        let currentText = '💓 *Heart Beating...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `💓 *Heart Beat*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "❤️ *Heart Beating Normal!*\n\n💕 Love you!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 5. ✨ SPARKLE - Send ✨ to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '✨') return;

        const frames = [
            "✦ ✧ ★ ✧ ✦",
            "✧ ★ ✦ ★ ✧",
            "★ ✧ ✦ ✧ ★",
            "✦ ★ ✧ ★ ✦",
            "✨ 🌟 ⭐ 🌟 ✨"
        ];

        let currentText = '✨ *Sparkle Effect!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `✨ *Sparkle*\n\n${frame}`;
            await sleep(400);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌟 *You are a Star!*\n\n✨ Keep Shining!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 6. 🌌 GALAXY - Send 🌌 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌌') return;

        const frames = [
            "✦ ✧ ★ ✧ ✦",
            "  ✦ ✧ ★ ✧",
            "★ ✧ ✦ ✧ ★",
            "✧ ★ ✦ ★ ✧",
            "✦ ✧ ★ ✧ ✦"
        ];

        let currentText = '🌌 *Galaxy Loading...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🌌 *Galaxy Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌌 *Galaxy Complete!*\n\n⭐ You are a Star!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 7. 🔥 FIRE - Send 🔥 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🔥') return;

        const frames = [
            "🔥🔥🔥\n🔥🔥🔥",
            "🔥🔥🔥\n🔥🔥🔥",
            "🔥🔥🔥\n🔥🔥🔥",
            "🔥🔥🔥\n🔥🔥🔥",
            "🔥🔥🔥\n🔥🔥🔥"
        ];

        let currentText = '🔥 *Fire Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🔥 *Emoji Fire*\n\n${frame}`;
            await sleep(400);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🔥 *Fire Extinguished!*\n\n✨ Stay Cool!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 8. 🌙 MOON - Send 🌙 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌙') return;

        const frames = [
            "🌑🌒🌓🌔",
            "🌕🌖🌗🌘",
            "🌑🌒🌓🌔",
            "🌕🌖🌗🌘"
        ];

        let currentText = '🌙 *Moon Loading...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🌙 *Moon Phases*\n\n${frame}`;
            await sleep(600);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌕 *Full Moon!*\n\n🌙 Good Night!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 9. ☀️ SUN - Send ☀️ to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '☀️') return;

        const frames = [
            "🌅☀️🌅",
            "☀️🌅☀️",
            "🌅☀️🌅",
            "☀️🌅☀️",
            "☀️☀️☀️"
        ];

        let currentText = '🌅 *Sun Rising...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `☀️ *Sun Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "☀️ *Good Morning!*\n\n✨ Have a Great Day!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 10. 🌊 WAVE - Send 🌊 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌊') return;

        const frames = [
            "~ ~ ~ ~ ~ ~",
            "~ ~ ~ ~ ~ ~",
            "~ ~ ~ ~ ~ ~",
            "🌊🌊🌊🌊🌊",
            "~ ~ ~ ~ ~ ~"
        ];

        let currentText = '🌊 *Wave Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🌊 *Wave Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌊 *Wave Complete!*\n\n🏄‍♂️ Ride the Wave!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 11. 🌈 RAINBOW - Send 🌈 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌈') return;

        const frames = [
            "🌈🌈🌈\n🌈🌈🌈",
            "🌈🌈🌈\n🌈🌈🌈",
            "🌈🌈🌈\n🌈🌈🌈",
            "🌈🌈🌈\n🌈🌈🌈"
        ];

        let currentText = '🌈 *Rainbow Loading...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🌈 *Rainbow Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌈 *Rainbow Complete!*\n\n✨ Stay Colorful!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 12. 💥 EXPLOSION - Send 💥 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💥') return;

        const frames = [
            "💥💥💥",
            "💥💥💥",
            "💥💥💥",
            "💥💥💥",
            "✨✨✨"
        ];

        let currentText = '💥 *Explosion Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `💥 *Explosion Effect*\n\n${frame}`;
            await sleep(400);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "💥 *Explosion Complete!*\n\n🎉 BOOM!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 13. 😊 FACE CHANGE - Send 😊 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😊') return;

        const frames = [
            "😊😄😁😆",
            "😂🤣😅😇",
            "🥰😍🤩😘",
            "😊😄😁😆",
            "😂🤣😅😇"
        ];

        let currentText = '😊 *Face Change Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `😊 *Face Change*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "😊 *Face Change Complete!*\n\n✨ Keep Smiling!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 14. 🌸 FLOWER - Send 🌸 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌸') return;

        const frames = [
            "🌱🌱🌱",
            "🌿🌿🌿",
            "🌺🌸🌺",
            "🌸🌺🌸",
            "🌺🌸🌺"
        ];

        let currentText = '🌸 *Flower Growing...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🌸 *Flower Effect*\n\n${frame}`;
            await sleep(600);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🌸 *Flower Bloomed!*\n\n🌺 Beautiful!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 15. 🎉 PARTY - Send 🎉 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎉') return;

        const frames = [
            "🎉🎊🎉🎊",
            "🎊🎉🎊🎉",
            "🎉🎊🎉🎊",
            "🎊🎉🎊🎉",
            "🎉🎊🎉🎊"
        ];

        let currentText = '🎉 *Party Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🎉 *Party Effect*\n\n${frame}`;
            await sleep(400);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🎉 *Party Complete!*\n\n🎊 Let's Celebrate!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 16. 🎮 GAME - Send 🎮 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎮') return;

        const frames = [
            "🎮🕹️🎮",
            "🕹️🎮🕹️",
            "🎮🕹️🎮",
            "🕹️🎮🕹️",
            "🎮🕹️🎮"
        ];

        let currentText = '🎮 *Game Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🎮 *Game Effect*\n\n${frame}`;
            await sleep(400);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🎮 *Game Complete!*\n\n🏆 You Win!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 17. 🕐 CLOCK - Send 🕐 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🕐') return;

        const frames = [
            "🕐🕑🕒",
            "🕓🕔🕕",
            "🕖🕗🕘",
            "🕙🕚🕛",
            "🕐🕑🕒"
        ];

        let currentText = '🕐 *Clock Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🕐 *Clock Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🕐 *Time Complete!*\n\n⏰ Time's Up!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 18. 🚀 ROCKET - Send 🚀 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🚀') return;

        const frames = [
            "🚀💨💨\n🌍🌍🌍",
            "💨🚀💨\n🌍🌍🌍",
            "💨💨🚀\n🌍🌍🌍",
            "🚀💨💨\n🌍🌍🌍",
            "🌌🚀🌌\n⭐🌟⭐"
        ];

        let currentText = '🚀 *Rocket Launch!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🚀 *Rocket Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🚀 *Liftoff Complete!*\n\n🌌 To the Moon!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 19. 👻 GHOST - Send 👻 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '👻') return;

        const frames = [
            "👻💨💨",
            "💨👻💨",
            "💨💨👻",
            "👻💨💨",
            "💨👻💨"
        ];

        let currentText = '👻 *Ghost Appeared!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `👻 *Ghost Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "👻 *Ghost Disappeared!*\n\n💀 Boo!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 20. 🥷 NINJA - Send 🥷 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🥷') return;

        const frames = [
            "🥷💨💨",
            "💨🥷💨",
            "💨💨🥷",
            "🥷💨💨",
            "💨🥷💨"
        ];

        let currentText = '🥷 *Ninja Activated!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🥷 *Ninja Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🥷 *Ninja Complete!*\n\n🗡️ Shadow Strike!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 21. 🧟 ZOMBIE - Send 🧟 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🧟') return;

        const frames = [
            "🧟🧟🧟",
            "🧟‍♂️🧟‍♀️🧟",
            "🧟🧟🧟",
            "🧟‍♀️🧟🧟‍♂️",
            "🧟🧟🧟"
        ];

        let currentText = '🧟 *Zombies Approaching!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🧟 *Zombie Effect*\n\n${frame}`;
            await sleep(600);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🧟 *Zombie Attack Stopped!*\n\n💀 You Survived!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 22. 🏁 RACE - Send 🏁 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🏁') return;

        const frames = [
            "🏎️💨💨\n🚀💨💨",
            "💨🏎️💨\n💨🚀💨",
            "💨💨🏎️\n💨💨🚀",
            "🏎️💨💨\n🚀💨💨",
            "💨🏎️💨\n💨🚀💨"
        ];

        let currentText = '🏁 *Race Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🏁 *Race Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🏁 *Race Complete!*\n\n🏆 Winner!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 23. 🎰 SLOT MACHINE - Send 🎰 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎰') return;

        const frames = [
            "🍎🍋🍒\n🎰🎰🎰",
            "🍋🍒🍎\n🎰🎰🎰",
            "🍒🍎🍋\n🎰🎰🎰",
            "🍎🍋🍒\n🎰🎰🎰",
            "🍋🍒🍎\n🎰🎰🎰"
        ];

        let currentText = '🎰 *Slot Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🎰 *Slot Effect*\n\n${frame}`;
            await sleep(400);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🎰 *Slot Complete!*\n\n🎉 Jackpot!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 24. 🧩 PUZZLE - Send 🧩 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🧩') return;

        const frames = [
            "🧩🧩🧩",
            "🧩🧩🧩",
            "🧩🧩🧩",
            "🧩🧩🧩",
            "🧩🧩🧩"
        ];

        let currentText = '🧩 *Puzzle Started!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `🧩 *Puzzle Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "🧩 *Puzzle Complete!*\n\n✅ Solved!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// 25. 💎 DIAMOND - Send 💎 to trigger
// ============================================
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💎') return;

        const frames = [
            "💎💎💎",
            "💎💎💎",
            "💎💎💎",
            "💎💎💎",
            "💎💎💎"
        ];

        let currentText = '💎 *Diamond Found!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const frame of frames) {
            currentText = `💎 *Diamond Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        currentText = "💎 *Diamond Complete!*\n\n✨ You're Rich!";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// EMOJI TRIGGER LIST COMMAND
// ============================================
cmd({
    pattern: "emojitrigger",
    desc: "Show all emoji trigger commands",
    category: "tools",
    react: "🎯",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const list = `
╭━━〔 🎯 *EMOJI TRIGGERS* 〕━━┈⊷
┃
┃ 📌 *Send these emojis to trigger animation:*
┃
┃ 🌧️ - Emoji Rain
┃ 💃 - Dance Party
┃ ⚔️ - Fight Battle
┃ 💓 - Heart Beat
┃ ✨ - Sparkle Effect
┃ 🌌 - Galaxy Effect
┃ 🔥 - Fire Effect
┃ 🌙 - Moon Phases
┃ ☀️ - Sun Rising
┃ 🌊 - Wave Effect
┃ 🌈 - Rainbow Effect
┃ 💥 - Explosion Effect
┃ 😊 - Face Change
┃ 🌸 - Flower Bloom
┃ 🎉 - Party Effect
┃ 🎮 - Game Effect
┃ 🕐 - Clock Effect
┃ 🚀 - Rocket Launch
┃ 👻 - Ghost Effect
┃ 🥷 - Ninja Effect
┃ 🧟 - Zombie Effect
┃ 🏁 - Race Effect
┃ 🎰 - Slot Machine
┃ 🧩 - Puzzle Effect
┃ 💎 - Diamond Effect
┃
┃ *Just send the emoji!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷`;

        await conn.sendMessage(from, { text: list }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
// ============================================
// AHMAD MD - KEYBOARD EMOJI TRIGGERS (ALL EMOJIS)
// ============================================

const { cmd, commands } = require("../command");
const { sleep } = require("../lib/functions");
const config = require("../config");

// ============================================
// SMILEYS & EMOTION EMOJIS
// ============================================

// 1. 😊 - SMILE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😊') return;
        const frames = ["😊😄😁😆", "😂🤣😅😇", "🥰😍🤩😘", "😊😄😁😆"];
        let currentText = '😊 *Smile Animation!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😊 *Smile*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😊 *Keep Smiling!*\n\n✨ Have a great day!";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 2. 😂 - LAUGH
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😂') return;
        const frames = ["😂🤣😅😆", "😊😄😁😆", "😂🤣😅😆"];
        let currentText = '😂 *Laughing!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😂 *Laugh*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😂 *Laughter is the best medicine!*";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 3. 😍 - LOVE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😍') return;
        const frames = ["😍🥰😘❤️", "💕💓💗💖", "😍🥰😘❤️"];
        let currentText = '😍 *Love!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😍 *Love Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "❤️ *Love you!* 💕";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 4. 😭 - CRY
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😭') return;
        const frames = ["😭😢😥😪", "🥺😢😭💔", "😭😢😥😪"];
        let currentText = '😭 *Crying...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😭 *Cry Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🥺 *Don't cry!* Everything will be okay! ❤️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 5. 😡 - ANGRY
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😡') return;
        const frames = ["😡😠🤬😤", "😡😠🤬😤", "😡😠🤬😤"];
        let currentText = '😡 *Angry!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😡 *Angry Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😌 *Calm down!* Take a deep breath! 🧘";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 6. 😎 - COOL
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😎') return;
        const frames = ["😎🕶️😎🕶️", "😎😎😎😎", "😎🕶️😎🕶️"];
        let currentText = '😎 *Cool!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😎 *Cool Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😎 *Stay cool!* 🕶️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 7. 🥺 - PLEAD
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🥺') return;
        const frames = ["🥺🥺🥺🥺", "🥺🥹🥺🥹", "🥺🥺🥺🥺"];
        let currentText = '🥺 *Aww!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🥺 *Pleading Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🥺 *Don't be sad!* Here's a hug! 🤗❤️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 8. 🤩 - STARSTRUCK
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🤩') return;
        const frames = ["🤩😍✨⭐", "⭐🌟✨🤩", "🤩😍✨⭐"];
        let currentText = '🤩 *Amazing!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🤩 *Starstruck Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🌟 *You're a star!* ✨";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 9. 😱 - SCREAM
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😱') return;
        const frames = ["😱😱😱😱", "😨😰😱😨", "😱😱😱😱"];
        let currentText = '😱 *Scream!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😱 *Scream Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😱 *Don't panic!* Everything is fine! 🤗";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 10. 😇 - INNOCENT
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😇') return;
        const frames = ["😇👼😇👼", "😇😇😇😇", "😇👼😇👼"];
        let currentText = '😇 *Angel!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😇 *Angel Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "👼 *You're an angel!* 😇";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 11. 😈 - IMP
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😈') return;
        const frames = ["😈😈😈😈", "😈👿😈👿", "😈😈😈😈"];
        let currentText = '😈 *Mischief!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😈 *Mischief Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😈 *Feeling naughty?* 😏";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 12. 🤔 - THINK
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🤔') return;
        const frames = ["🤔🤔🤔🤔", "🤔💭🤔💭", "🤔🤔🤔🤔"];
        let currentText = '🤔 *Thinking...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🤔 *Think Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💡 *I know!* 🤔";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 13. 🥵 - HOT
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🥵') return;
        const frames = ["🥵🥵🥵🥵", "🔥🥵🔥🥵", "🥵🥵🥵🥵"];
        let currentText = '🥵 *Hot!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🥵 *Hot Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🥵 *It's getting hot!* 🔥";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 14. 🥶 - COLD
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🥶') return;
        const frames = ["🥶🥶🥶🥶", "❄️🥶❄️🥶", "🥶🥶🥶🥶"];
        let currentText = '🥶 *Cold!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🥶 *Cold Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🥶 *Stay warm!* 🔥";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 15. 🫠 - MELTING
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🫠') return;
        const frames = ["🫠🫠🫠🫠", "🫠💧🫠💧", "🫠🫠🫠🫠"];
        let currentText = '🫠 *Melting!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🫠 *Melting Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🫠 *Don't melt!* Stay cool! 🧊";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 16. 🥹 - HOLDING TEARS
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🥹') return;
        const frames = ["🥹🥹🥹🥹", "🥹🥺🥹🥺", "🥹🥹🥹🥹"];
        let currentText = '🥹 *Emotional!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🥹 *Emotional Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🥹 *It's okay to feel!* ❤️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 17. 😤 - TRIUMPH
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😤') return;
        const frames = ["😤😤😤😤", "💪😤💪😤", "😤😤😤😤"];
        let currentText = '😤 *Determined!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😤 *Determined Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💪 *You're a fighter!* 😤";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 18. 🫡 - SALUTE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🫡') return;
        const frames = ["🫡🫡🫡🫡", "🎖️🫡🎖️🫡", "🫡🫡🫡🫡"];
        let currentText = '🫡 *Salute!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🫡 *Salute Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🫡 *At your service!* 🎖️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 19. 🤗 - HUG
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🤗') return;
        const frames = ["🤗🤗🤗🤗", "🫂🤗🫂🤗", "🤗🤗🤗🤗"];
        let currentText = '🤗 *Hug!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🤗 *Hug Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🫂 *Sending you a big hug!* ❤️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 20. 😏 - SMIRK
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '😏') return;
        const frames = ["😏😏😏😏", "😏😉😏😉", "😏😏😏😏"];
        let currentText = '😏 *Smirk!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `😏 *Smirk Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "😏 *I see what you did there!*";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 21. 🙃 - UPSIDE DOWN
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🙃') return;
        const frames = ["🙃🙃🙃🙃", "🙃😊🙃😊", "🙃🙃🙃🙃"];
        let currentText = '🙃 *Upside Down!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🙃 *Upside Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🙃 *Seeing things differently!* 🌍";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 22. 👀 - EYES
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '👀') return;
        const frames = ["👀👀👀👀", "👀👁️👀👁️", "👀👀👀👀"];
        let currentText = '👀 *Watching...*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `👀 *Eyes Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "👀 *I see you!* 😂";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 23. 🫣 - PEKING
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🫣') return;
        const frames = ["🫣🫣🫣🫣", "🫣🙈🫣🙈", "🫣🫣🫣🫣"];
        let currentText = '🫣 *Peeking!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🫣 *Peek Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🫣 *I saw that!* 😂";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 24. 🫤 - UNCERTAIN
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🫤') return;
        const frames = ["🫤🫤🫤🫤", "🫤🙄🫤🙄", "🫤🫤🫤🫤"];
        let currentText = '🫤 *Uncertain!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🫤 *Uncertain Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🫤 *Not sure about this!* 😅";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// HEARTS
// ============================================

// 25. ❤️ - RED HEART
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '❤️') return;
        const frames = ["❤️💕💗💖", "💓💘💝💟", "❤️💕💗💖"];
        let currentText = '❤️ *Heart!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `❤️ *Heart Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "❤️ *Love you!* 💕";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 26. 💔 - BROKEN HEART
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💔') return;
        const frames = ["💔💔💔💔", "💔🥺💔🥺", "💔💔💔💔"];
        let currentText = '💔 *Broken Heart!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💔 *Broken Heart Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💔 *Time heals all wounds!* 🕊️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 27. 💖 - SPARKLING HEART
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💖') return;
        const frames = ["💖💕💗💖", "✨💖✨💖", "💖💕💗💖"];
        let currentText = '💖 *Sparkling Heart!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💖 *Sparkle Heart Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💖 *You're special!* ✨";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 28. 💕 - TWO HEARTS
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💕') return;
        const frames = ["💕💕💕💕", "💕❤️💕❤️", "💕💕💕💕"];
        let currentText = '💕 *Two Hearts!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💕 *Two Hearts Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💕 *Love is beautiful!* ❤️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 29. 💗 - GROWING HEART
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💗') return;
        const frames = ["💗💗💗💗", "💗💕💗💕", "💗💗💗💗"];
        let currentText = '💗 *Growing Heart!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💗 *Growing Heart Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💗 *Heart growing bigger!* 💕";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 30. 💓 - BEATING HEART
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💓') return;
        const frames = ["💓💓💓💓", "💗💓💗💓", "💓💓💓💓"];
        let currentText = '💓 *Beating Heart!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💓 *Beating Heart Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💓 *Heart is beating for you!* ❤️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// ANIMALS
// ============================================

// 31. 🐶 - DOG
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐶') return;
        const frames = ["🐶🐶🐶🐶", "🐶🐕🐶🐕", "🐶🐶🐶🐶"];
        let currentText = '🐶 *Dog!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐶 *Dog Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐶 *Woof woof!* 🐕";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 32. 🐱 - CAT
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐱') return;
        const frames = ["🐱🐱🐱🐱", "🐱🐈🐱🐈", "🐱🐱🐱🐱"];
        let currentText = '🐱 *Cat!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐱 *Cat Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐱 *Meow!* 🐈";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 33. 🐰 - RABBIT
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐰') return;
        const frames = ["🐰🐰🐰🐰", "🐰🐇🐰🐇", "🐰🐰🐰🐰"];
        let currentText = '🐰 *Rabbit!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐰 *Rabbit Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐰 *Hop hop!* 🐇";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 34. 🦊 - FOX
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🦊') return;
        const frames = ["🦊🦊🦊🦊", "🦊🦊🦊🦊", "🦊🦊🦊🦊"];
        let currentText = '🦊 *Fox!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🦊 *Fox Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🦊 *What does the fox say?* Ring-ding-ding!";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 35. 🐼 - PANDA
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐼') return;
        const frames = ["🐼🐼🐼🐼", "🐼🐼🐼🐼", "🐼🐼🐼🐼"];
        let currentText = '🐼 *Panda!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐼 *Panda Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐼 *Cute panda!* 🖤🤍";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 36. 🐨 - KOALA
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐨') return;
        const frames = ["🐨🐨🐨🐨", "🐨🐨🐨🐨", "🐨🐨🐨🐨"];
        let currentText = '🐨 *Koala!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐨 *Koala Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐨 *Koala cuteness!* 🍃";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 37. 🐻 - BEAR
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐻') return;
        const frames = ["🐻🐻🐻🐻", "🐻🐻🐻🐻", "🐻🐻🐻🐻"];
        let currentText = '🐻 *Bear!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐻 *Bear Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐻 *Grrr!* 🐾";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 38. 🐷 - PIG
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐷') return;
        const frames = ["🐷🐷🐷🐷", "🐷🐖🐷🐖", "🐷🐷🐷🐷"];
        let currentText = '🐷 *Pig!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐷 *Pig Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐷 *Oink oink!* 🐖";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 39. 🐸 - FROG
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐸') return;
        const frames = ["🐸🐸🐸🐸", "🐸🐸🐸🐸", "🐸🐸🐸🐸"];
        let currentText = '🐸 *Frog!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐸 *Frog Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐸 *Ribbit ribbit!* 🪰";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 40. 🐵 - MONKEY
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐵') return;
        const frames = ["🐵🐵🐵🐵", "🐵🐒🐵🐒", "🐵🐵🐵🐵"];
        let currentText = '🐵 *Monkey!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐵 *Monkey Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐵 *Ooh ooh ah ah!* 🐒";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 41. 🐧 - PENGUIN
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐧') return;
        const frames = ["🐧🐧🐧🐧", "🐧🐧🐧🐧", "🐧🐧🐧🐧"];
        let currentText = '🐧 *Penguin!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐧 *Penguin Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐧 *Waddle waddle!* ❄️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 42. 🐦 - BIRD
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐦') return;
        const frames = ["🐦🐦🐦🐦", "🐦🐦🐦🐦", "🐦🐦🐦🐦"];
        let currentText = '🐦 *Bird!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐦 *Bird Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐦 *Chirp chirp!* 🎵";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 43. 🦋 - BUTTERFLY
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🦋') return;
        const frames = ["🦋🦋🦋🦋", "🦋🌸🦋🌸", "🦋🦋🦋🦋"];
        let currentText = '🦋 *Butterfly!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🦋 *Butterfly Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🦋 *Beautiful butterfly!* 🌸";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 44. 🐝 - BEE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐝') return;
        const frames = ["🐝🐝🐝🐝", "🐝🌸🐝🌸", "🐝🐝🐝🐝"];
        let currentText = '🐝 *Bee!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐝 *Bee Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐝 *Buzz buzz!* 🍯";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 45. 🐌 - SNAIL
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐌') return;
        const frames = ["🐌🐌🐌🐌", "🐌🐌🐌🐌", "🐌🐌🐌🐌"];
        let currentText = '🐌 *Snail!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐌 *Snail Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐌 *Slow and steady wins the race!* 🏁";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 46. 🐢 - TURTLE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐢') return;
        const frames = ["🐢🐢🐢🐢", "🐢🐢🐢🐢", "🐢🐢🐢🐢"];
        let currentText = '🐢 *Turtle!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐢 *Turtle Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐢 *Slow and steady!* 🌊";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 47. 🐙 - OCTOPUS
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🐙') return;
        const frames = ["🐙🐙🐙🐙", "🐙🐙🐙🐙", "🐙🐙🐙🐙"];
        let currentText = '🐙 *Octopus!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🐙 *Octopus Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🐙 *8 legs of fun!* 🌊";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// FOOD
// ============================================

// 48. 🍕 - PIZZA
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍕') return;
        const frames = ["🍕🍕🍕🍕", "🧀🍕🧀🍕", "🍕🍕🍕🍕"];
        let currentText = '🍕 *Pizza!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍕 *Pizza Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍕 *Yummy pizza!* 😋";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 49. 🍔 - BURGER
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍔') return;
        const frames = ["🍔🍔🍔🍔", "🍔🍔🍔🍔", "🍔🍔🍔🍔"];
        let currentText = '🍔 *Burger!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍔 *Burger Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍔 *Juicy burger!* 🍟";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 50. 🍟 - FRIES
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍟') return;
        const frames = ["🍟🍟🍟🍟", "🍟🍟🍟🍟", "🍟🍟🍟🍟"];
        let currentText = '🍟 *Fries!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍟 *Fries Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍟 *Crispy fries!* 🍔";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 51. 🌭 - HOT DOG
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌭') return;
        const frames = ["🌭🌭🌭🌭", "🌭🌭🌭🌭", "🌭🌭🌭🌭"];
        let currentText = '🌭 *Hot Dog!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🌭 *Hot Dog Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🌭 *Tasty hot dog!* 🥤";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 52. 🍩 - DOUGHNUT
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍩') return;
        const frames = ["🍩🍩🍩🍩", "🍩🍩🍩🍩", "🍩🍩🍩🍩"];
        let currentText = '🍩 *Doughnut!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍩 *Doughnut Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍩 *Sweet doughnut!* ☕";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 53. 🍪 - COOKIE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍪') return;
        const frames = ["🍪🍪🍪🍪", "🍪🍪🍪🍪", "🍪🍪🍪🍪"];
        let currentText = '🍪 *Cookie!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍪 *Cookie Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍪 *Yummy cookie!* 🥛";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 54. 🍫 - CHOCOLATE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍫') return;
        const frames = ["🍫🍫🍫🍫", "🍫🍫🍫🍫", "🍫🍫🍫🍫"];
        let currentText = '🍫 *Chocolate!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍫 *Chocolate Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍫 *Sweet chocolate!* 🍬";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 55. 🍦 - ICE CREAM
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍦') return;
        const frames = ["🍦🍦🍦🍦", "🍦🍦🍦🍦", "🍦🍦🍦🍦"];
        let currentText = '🍦 *Ice Cream!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍦 *Ice Cream Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍦 *Cool ice cream!* 🍧";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 56. 🍰 - CAKE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🍰') return;
        const frames = ["🍰🍰🍰🍰", "🎂🍰🎂🍰", "🍰🍰🍰🍰"];
        let currentText = '🍰 *Cake!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🍰 *Cake Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🍰 *Happy birthday!* 🎂";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 57. 🎂 - BIRTHDAY CAKE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎂') return;
        const frames = ["🎂🎂🎂🎂", "🎂🎉🎂🎉", "🎂🎂🎂🎂"];
        let currentText = '🎂 *Birthday!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎂 *Birthday Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎂 *Happy Birthday!* 🎉";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 58. ☕ - COFFEE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '☕') return;
        const frames = ["☕☕☕☕", "☕☕☕☕", "☕☕☕☕"];
        let currentText = '☕ *Coffee!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `☕ *Coffee Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "☕ *Coffee time!* ☕";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// ACTIVITIES & SPORTS
// ============================================

// 59. ⚽ - SOCCER
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '⚽') return;
        const frames = ["⚽⚽⚽⚽", "⚽⚽⚽⚽", "⚽⚽⚽⚽"];
        let currentText = '⚽ *Soccer!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `⚽ *Soccer Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "⚽ *Goal!* 🥅";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 60. 🏀 - BASKETBALL
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🏀') return;
        const frames = ["🏀🏀🏀🏀", "🏀🏀🏀🏀", "🏀🏀🏀🏀"];
        let currentText = '🏀 *Basketball!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🏀 *Basketball Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🏀 *Slam dunk!* 🏆";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 61. 🎮 - VIDEO GAME
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎮') return;
        const frames = ["🎮🎮🎮🎮", "🎮🕹️🎮🕹️", "🎮🎮🎮🎮"];
        let currentText = '🎮 *Game On!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎮 *Game Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎮 *Player 1 ready!* 🕹️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 62. 🎯 - TARGET
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎯') return;
        const frames = ["🎯🎯🎯🎯", "🎯🎯🎯🎯", "🎯🎯🎯🎯"];
        let currentText = '🎯 *Target!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎯 *Target Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎯 *Bullseye!* 🏹";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 63. 🏆 - TROPHY
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🏆') return;
        const frames = ["🏆🏆🏆🏆", "🏆🏆🏆🏆", "🏆🏆🏆🏆"];
        let currentText = '🏆 *Trophy!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🏆 *Trophy Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🏆 *Winner!* 🥇";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 64. 🥇 - GOLD MEDAL
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🥇') return;
        const frames = ["🥇🥇🥇🥇", "🥇🥈🥉🥇", "🥇🥇🥇🥇"];
        let currentText = '🥇 *Gold!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🥇 *Gold Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🥇 *Number 1!* 🏆";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 65. 🎸 - GUITAR
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎸') return;
        const frames = ["🎸🎸🎸🎸", "🎸🎵🎸🎵", "🎸🎸🎸🎸"];
        let currentText = '🎸 *Guitar!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎸 *Guitar Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎸 *Rock on!* 🎶";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 66. 🎵 - MUSIC
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎵') return;
        const frames = ["🎵🎵🎵🎵", "🎵🎶🎵🎶", "🎵🎵🎵🎵"];
        let currentText = '🎵 *Music!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎵 *Music Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎵 *Beautiful music!* 🎶";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 67. 🎤 - MICROPHONE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎤') return;
        const frames = ["🎤🎤🎤🎤", "🎤🎵🎤🎵", "🎤🎤🎤🎤"];
        let currentText = '🎤 *Microphone!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎤 *Mic Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎤 *Sing it!* 🎶";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// TRAVEL & PLACES
// ============================================

// 68. 🚗 - CAR
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🚗') return;
        const frames = ["🚗🚗🚗🚗", "🚗💨🚗💨", "🚗🚗🚗🚗"];
        let currentText = '🚗 *Car!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🚗 *Car Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🚗 *Vroom vroom!* 💨";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 69. ✈️ - AIRPLANE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '✈️') return;
        const frames = ["✈️✈️✈️✈️", "✈️☁️✈️☁️", "✈️✈️✈️✈️"];
        let currentText = '✈️ *Airplane!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `✈️ *Airplane Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "✈️ *Fly high!* ☁️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 70. 🚀 - ROCKET
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🚀') return;
        const frames = ["🚀🚀🚀🚀", "🚀💫🚀💫", "🚀🚀🚀🚀"];
        let currentText = '🚀 *Rocket!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🚀 *Rocket Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🚀 *To the moon!* 🌙";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 71. 🌍 - EARTH
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌍') return;
        const frames = ["🌍🌎🌏🌍", "🌎🌍🌏🌎", "🌍🌎🌏🌍"];
        let currentText = '🌍 *Earth!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🌍 *Earth Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🌍 *Save our planet!* 🌎";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 72. 🌙 - MOON
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌙') return;
        const frames = ["🌑🌒🌓🌔", "🌕🌖🌗🌘", "🌑🌒🌓🌔"];
        let currentText = '🌙 *Moon!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🌙 *Moon Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🌙 *Good night!* 🌟";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 73. ☀️ - SUN
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '☀️') return;
        const frames = ["☀️☀️☀️☀️", "☀️🌅☀️🌅", "☀️☀️☀️☀️"];
        let currentText = '☀️ *Sun!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `☀️ *Sun Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "☀️ *Good morning!* 🌅";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 74. 🌊 - WAVE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌊') return;
        const frames = ["🌊🌊🌊🌊", "🌊🌊🌊🌊", "🌊🌊🌊🌊"];
        let currentText = '🌊 *Wave!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🌊 *Wave Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🌊 *Ride the wave!* 🏄‍♂️";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 75. 🌈 - RAINBOW
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🌈') return;
        const frames = ["🌈🌈🌈🌈", "🌈🌈🌈🌈", "🌈🌈🌈🌈"];
        let currentText = '🌈 *Rainbow!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🌈 *Rainbow Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🌈 *Be colorful!* ✨";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// OBJECTS & SYMBOLS
// ============================================

// 76. 💎 - DIAMOND
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💎') return;
        const frames = ["💎💎💎💎", "💎💎💎💎", "💎💎💎💎"];
        let currentText = '💎 *Diamond!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💎 *Diamond Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💎 *Shine bright!* ✨";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 77. 🔥 - FIRE
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🔥') return;
        const frames = ["🔥🔥🔥🔥", "🔥🔥🔥🔥", "🔥🔥🔥🔥"];
        let currentText = '🔥 *Fire!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🔥 *Fire Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🔥 *You're on fire!* 💯";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 78. 💯 - PERFECT
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '💯') return;
        const frames = ["💯💯💯💯", "💯💯💯💯", "💯💯💯💯"];
        let currentText = '💯 *Perfect!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `💯 *Perfect Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "💯 *100% perfect!* 🌟";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 79. ⭐ - STAR
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '⭐') return;
        const frames = ["⭐⭐️⭐️⭐️", "⭐✨⭐✨⭐", "⭐⭐️⭐️⭐️"];
        let currentText = '⭐ *Star!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `⭐ *Star Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "⭐ *You're a star!* ✨";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 80. ✨ - SPARKLES
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '✨') return;
        const frames = ["✨✨✨✨", "✨✨✨✨", "✨✨✨✨"];
        let currentText = '✨ *Sparkles!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `✨ *Sparkle Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "✨ *Magic everywhere!* 🌟";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 81. 🎉 - PARTY
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎉') return;
        const frames = ["🎉🎊🎉🎊", "🎊🎉🎊🎉", "🎉🎊🎉🎊"];
        let currentText = '🎉 *Party!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎉 *Party Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎉 *Celebrate!* 🎊";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 82. 🎊 - CONFETTI
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎊') return;
        const frames = ["🎊🎊🎊🎊", "🎊🎊🎊🎊", "🎊🎊🎊🎊"];
        let currentText = '🎊 *Confetti!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎊 *Confetti Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎊 *Celebration time!* 🎉";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 83. 🎈 - BALLOON
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🎈') return;
        const frames = ["🎈🎈🎈🎈", "🎈🎈🎈🎈", "🎈🎈🎈🎈"];
        let currentText = '🎈 *Balloon!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🎈 *Balloon Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🎈 *Happy balloons!* 🎉";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// 84. 🕐 - CLOCK
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isCreator }) => {
    try {
        if (!isCreator) return;
        if (body.trim() !== '🕐') return;
        const frames = ["🕐🕑🕒🕓", "🕔🕕🕖🕗", "🕐🕑🕒🕓"];
        let currentText = '🕐 *Clock!*';
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });
        for (const frame of frames) {
            currentText = `🕐 *Clock Effect*\n\n${frame}`;
            await sleep(500);
            const protocolMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
        currentText = "🕐 *Time is ticking!* ⏰";
        const finalMsg = { key: sentMessage.key, type: 0xe, editedMessage: { conversation: currentText } };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});
    } catch (e) {}
});

// ============================================
// EMOJI TRIGGER LIST COMMAND
// ============================================
cmd({
    pattern: "keyboard",
    desc: "Show all keyboard emoji triggers",
    category: "tools",
    react: "⌨️",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

        const list = `
╭━━〔 ⌨️ *KEYBOARD EMOJI TRIGGERS* 〕━━┈⊷
┃
┃ 📌 *Send these emojis for animations:*
┃
┃ *Smileys:* 😊 😂 😍 😭 😡 😎 🥺 🤩
┃ 😱 😇 😈 🤔 🥵 🥶 🫠 🥹 😤 🫡 🤗
┃ 😏 🙃 👀 🫣 🫤
┃
┃ *Hearts:* ❤️ 💔 💖 💕 💗 💓
┃
┃ *Animals:* 🐶 🐱 🐰 🦊 🐼 🐨 🐻 🐷
┃ 🐸 🐵 🐧 🐦 🦋 🐝 🐌 🐢 🐙
┃
┃ *Food:* 🍕 🍔 🍟 🌭 🍩 🍪 🍫 🍦
┃ 🍰 🎂 ☕
┃
┃ *Activities:* ⚽ 🏀 🎮 🎯 🏆 🥇 🎸 🎵 🎤
┃
┃ *Travel:* 🚗 ✈️ 🚀 🌍 🌙 ☀️ 🌊 🌈
┃
┃ *Objects:* 💎 🔥 💯 ⭐ ✨ 🎉 🎊 🎈 🕐
┃
┃ *Just send any emoji!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷`;

        await conn.sendMessage(from, { text: list }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
