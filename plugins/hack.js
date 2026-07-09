// ============================================
// AHMAD MD - ALL HACK COMMANDS (FIXED WITH AUDIO)
// ============================================

import { cmd } from '../command.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// 1. HACK COMMAND - General Hack
// ============================================
cmd({
    pattern: "hack",
    alias: ["hackme", "hacker"],
    desc: "Fake hacking animation",
    react: "💻",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackSteps = [
            "🔓 *Initializing Hack Sequence...*",
            "🖥️ *Connecting to Target Server...*",
            "📡 *Bypassing Firewall...*",
            "🔑 *Cracking Encryption...*",
            "📂 *Accessing Database...*",
            "🔍 *Searching for Data...*",
            "💾 *Downloading Files...*",
            "🧹 *Clearing Logs...*",
            "🚪 *Closing Connection...*",
            "✅ *Hack Complete! You've Been Hacked!* 😈"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hackSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hackSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hackSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*😂 You've been HACKED!*\n> _Don't worry, it's just for fun!_"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 2. MOBILE HACK COMMAND
// ============================================
cmd({
    pattern: "mobilehack",
    alias: ["phonehack", "phone"],
    desc: "Fake mobile phone hacking animation",
    react: "📱",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackSteps = [
            "📱 *Hacking Target Phone...*",
            "🔓 *Bypassing Lock Screen...*",
            "📡 *Accessing Mobile Network...*",
            "📂 *Reading Messages...*",
            "📸 *Accessing Camera...*",
            "📍 *Tracking Location...*",
            "💾 *Downloading Contacts...*",
            "📞 *Call History Retrieved...*",
            "📧 *Emails Hacked...*",
            "✅ *Phone Hacked Successfully!* 😈"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hackSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hackSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hackSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*📱 Your Phone Has Been Hacked!*\n> _Just kidding! All in good fun!_"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 3. INSTAGRAM HACK COMMAND
// ============================================
cmd({
    pattern: "ighack",
    alias: ["instagramhack", "ig"],
    desc: "Fake Instagram hacking animation",
    react: "📸",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackSteps = [
            "📸 *Hacking Instagram Account...*",
            "🔑 *Bypassing Login...*",
            "📡 *Accessing Profile...*",
            "📂 *Downloading Stories...*",
            "💬 *Reading DMs...*",
            "📸 *Accessing Gallery...*",
            "📍 *Location Tracking...*",
            "🔒 *Changing Password...*",
            "✅ *Instagram Hacked!* 😈"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hackSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hackSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hackSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*📸 Instagram Hacked!*\n> _Don't worry, your account is safe!_"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 4. FACEBOOK HACK COMMAND
// ============================================
cmd({
    pattern: "fbhack",
    alias: ["facebookhack", "fb"],
    desc: "Fake Facebook hacking animation",
    react: "📘",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackSteps = [
            "📘 *Hacking Facebook Account...*",
            "🔑 *Decrypting Password...*",
            "📡 *Accessing Profile...*",
            "📂 *Downloading Photos...*",
            "💬 *Reading Messages...*",
            "📝 *Posting Status...*",
            "📍 *Checking Location...*",
            "🔐 *Changing Security Settings...*",
            "✅ *Facebook Hacked!* 😈"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hackSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hackSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hackSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*📘 Facebook Hacked!*\n> _All in good fun! Your account is safe!_"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 5. FBI HACK COMMAND
// ============================================
cmd({
    pattern: "fbihack",
    alias: ["fbi", "nsa"],
    desc: "Fake FBI hacking animation",
    react: "🕵️",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackSteps = [
            "🕵️ *FBI HACK INITIATED...*",
            "📡 *Tracking IP Address...*",
            "🔑 *Decrypting Government Server...*",
            "📂 *Accessing Top Secret Files...*",
            "🔍 *Searching Criminal Database...*",
            "📍 *Locating Target...*",
            "📸 *Accessing Surveillance Cameras...*",
            "🔐 *Bypassing Security Clearance...*",
            "✅ *FBI Hack Complete! You're Busted!* 😈"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hackSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hackSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hackSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*🕵️ FBI Has Located You!*\n> _It's just a joke! You're safe!_"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 6. SNAPCHAT HACK COMMAND
// ============================================
cmd({
    pattern: "snaphack",
    alias: ["snapchathack", "snap"],
    desc: "Fake Snapchat hacking animation",
    react: "👻",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackSteps = [
            "👻 *Hacking Snapchat Account...*",
            "🔓 *Cracking Username...*",
            "📡 *Accessing Streaks...*",
            "📂 *Downloading Snaps...*",
            "💬 *Reading Chats...*",
            "📍 *Checking Location...*",
            "🔐 *Bypassing Security...*",
            "✅ *Snapchat Hacked!* 😈"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hackSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hackSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hackSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*👻 Snapchat Hacked!*\n> _No worries, your snaps are safe!_"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 7. HAPPY BIRTHDAY COMMAND
// ============================================
cmd({
    pattern: "happybirthday",
    alias: ["hbd", "birthday"],
    desc: "Happy birthday celebration animation",
    react: "🎂",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hbdSteps = [
            "🎂 *Happy Birthday!* 🎂",
            "🎉 *Celebrating...* 🎉",
            "🎈 *Party Time!* 🎈",
            "🎁 *Gifts Arriving...* 🎁",
            "🎊 *Confetti Everywhere!* 🎊",
            "🎂 *Blow the Candles!* 🎂",
            "🌟 *Make a Wish!* 🌟",
            "🎉 *Happy Birthday To You!* 🎉"
        ];

        const sentMsg = await conn.sendMessage(from, {
            text: hbdSteps[0]
        }, { quoted: mek });

        for (let i = 1; i < hbdSteps.length; i++) {
            await sleep(800);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: hbdSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*🎂 Happy Birthday! Have a wonderful day!* 🎉"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 8. RAIN COMMAND - Emoji Rain
// ============================================
cmd({
    pattern: "rain",
    desc: "Animated emoji rain effect",
    react: "🌧️",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

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

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        currentText = "🌈 *Rain Stopped!*\n\n✨ Have a beautiful day! 😍";
        const finalMsg = {
            key: sentMessage.key,
            type: 0xe,
            editedMessage: { conversation: currentText }
        };
        await conn.relayMessage(from, { protocolMessage: finalMsg }, {});

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 9. VIRUS COMMAND
// ============================================
cmd({
    pattern: "virus",
    alias: ["virusattack"],
    desc: "Fake virus attack animation",
    react: "🦠",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const steps = [
            "🦠 *VIRUS DETECTED!*",
            "📡 *Spreading through system...*",
            "💀 *Corrupting files...*",
            "⚠️ *System failure imminent!*",
            "🔄 *Restarting...*",
            "✅ *Just Kidding! Your device is safe!* 😂"
        ];

        const sentMsg = await conn.sendMessage(from, { text: steps[0] }, { quoted: mek });
        for (let i = 1; i < steps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: sentMsg.key,
                type: 0xe,
                editedMessage: { conversation: steps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: "*🦠 Virus Scare Complete!*\n> _All in good fun!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 10. HACK MENU COMMAND - Show All Hack Commands
// ============================================
cmd({
    pattern: "hackmenu",
    alias: ["hacklist", "hacks"],
    desc: "Show all hack commands",
    react: "💀",
    category: "hack",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*"
            }, { quoted: mek });
        }

        const hackMenu = `
╭━━〔 💀 *HACK COMMANDS* 〕━━┈⊷
┃
┃ 📌 *Available Hack Commands:*
┃
┃ • .hack - General hack animation
┃ • .mobilehack - Phone hack animation
┃ • .ighack - Instagram hack animation
┃ • .fbhack - Facebook hack animation
┃ • .fbihack - FBI hack animation
┃ • .snaphack - Snapchat hack animation
┃ • .virus - Virus attack animation
┃ • .rain - Emoji rain animation
┃ • .happybirthday - Birthday celebration
┃ • .hackmenu - Show this menu
┃
┃━━━━━━━━━━━━━━━━━━
┃ ⚠️ *All commands are for fun only!*
┃
╰━━〔 © AHMAD TechXD 〕━━┈⊷`;

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

        await conn.sendMessage(from, {
            text: hackMenu
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
