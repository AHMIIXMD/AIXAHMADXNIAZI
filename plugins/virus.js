// ============================================
// AHMAD MD - EXTRA FUN & UTILITY COMMANDS
// ============================================

import { cmd } from '../command.js';
import { sleep } from '../lib/functions.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// 1. FAKE VIRUS COMMAND
// ============================================
cmd({
    pattern: "virus",
    alias: ["virusattack"],
    desc: "Fake virus attack animation",
    react: "🦠",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

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
            image: { url: "https://files.catbox.moe/8q1qmq.jpg" },
            caption: "*🦠 Virus Scare Complete!*\n> _All in good fun!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 2. FAKE BANK HACK COMMAND
// ============================================
cmd({
    pattern: "bankhack",
    alias: ["hackbank", "rob"],
    desc: "Fake bank hacking animation",
    react: "🏦",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🏦 *Hacking Bank Server...*",
            "🔑 *Cracking Encryption...*",
            "💰 *Accessing Accounts...*",
            "💳 *Stealing Money...*",
            "🚨 *Alarm Triggered!*",
            "🏃 *Running Away...*",
            "✅ *Just Kidding! You're not a robber!* 😂"
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
            image: { url: "https://files.catbox.moe/q20h6q.jpg" },
            caption: "*🏦 Bank Hack Failed!*\n> _You got caught! But it's just a joke!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 3. FAKE WIFI HACK COMMAND
// ============================================
cmd({
    pattern: "wifihack",
    alias: ["hackwifi", "wifi"],
    desc: "Fake WiFi hacking animation",
    react: "📶",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "📶 *Hacking WiFi Network...*",
            "🔑 *Cracking Password...*",
            "📡 *Connecting to Router...*",
            "🔓 *Access Granted!*",
            "📊 *Downloading Data...*",
            "✅ *WiFi Hacked!* 😈"
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
            image: { url: "https://files.catbox.moe/y6qmzx.jpg" },
            caption: "*📶 WiFi Hacked!*\n> _Free WiFi forever! Just kidding!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 4. FAKE NUCLEAR LAUNCH COMMAND
// ============================================
cmd({
    pattern: "nuclear",
    alias: ["nuke", "bomb"],
    desc: "Fake nuclear launch animation",
    react: "☢️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "☢️ *NUCLEAR LAUNCH INITIATED!*",
            "🔴 *Entering Launch Codes...*",
            "📡 *Target Acquired...*",
            "🚀 *Missile Launched!*",
            "💥 *Impact in 3...*",
            "💥 *2...*",
            "💥 *1...*",
            "🎉 *Just Kidding! No nukes were harmed!*"
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
            image: { url: "https://files.catbox.moe/1pba7s.jpg" },
            caption: "*☢️ Nuclear Launch Cancelled!*\n> _World peace preserved!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 5. TIME TRAVEL COMMAND
// ============================================
cmd({
    pattern: "timetravel",
    alias: ["future", "past"],
    desc: "Fake time travel animation",
    react: "⏳",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "⏳ *Time Travel Initiated!*",
            "🌀 *Creating Wormhole...*",
            "🚀 *Entering Time Vortex...*",
            "🌌 *Traveling Through Time...*",
            "🕐 *Year 2050 Reached!*",
            "👽 *Aliens Exist!*",
            "🔄 *Returning to Present...*",
            "✅ *Welcome Back to 2025!* 😂"
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
            image: { url: "https://files.catbox.moe/d2a9kv.jpg" },
            caption: "*⏳ Time Travel Complete!*\n> _The future is bright!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 6. DARK WEB COMMAND
// ============================================
cmd({
    pattern: "darkweb",
    alias: ["deepweb"],
    desc: "Fake dark web access animation",
    react: "🌑",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🌑 *Connecting to Dark Web...*",
            "🔐 *Tor Network Established...*",
            "📡 *Bypassing Firewalls...*",
            "🕵️ *Entering Deep Web...*",
            "💀 *Dark Web Market Found!*",
            "✅ *Just Kidding! Stay Safe!* 😂"
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
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: "*🌑 Dark Web Access Denied!*\n> _Stay on the bright side!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 7. FAKE COP COMMAND
// ============================================
cmd({
    pattern: "cop",
    alias: ["police", "arrest"],
    desc: "Fake police arrest animation",
    react: "🚔",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🚔 *POLICE ARREST INITIATED!*",
            "🚨 *Sirens Blaring...*",
            "🔫 *Officers Approaching...*",
            "👮 *You're Under Arrest!*",
            "🔗 *Handcuffs Applied...*",
            "🚔 *Taking to Station...*",
            "✅ *Just Kidding! You're Free!* 😂"
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
            image: { url: "https://files.catbox.moe/8q1qmq.jpg" },
            caption: "*🚔 You're Free!*\n> _No criminals were caught today!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 8. FAKE TERRORIST COMMAND
// ============================================
cmd({
    pattern: "terror",
    alias: ["terrorist"],
    desc: "Fake terrorist alert animation",
    react: "🚨",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🚨 *TERRORIST ALERT!*",
            "🔍 *Scanning Area...*",
            "🎯 *Target Identified!*",
            "💥 *Neutralized!*",
            "✅ *False Alarm! It was just a prank!* 😂"
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
            image: { url: "https://files.catbox.moe/q20h6q.jpg" },
            caption: "*🚨 All Clear!*\n> _Stay safe, stay happy!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 9. FAKE IP TRACKER COMMAND
// ============================================
cmd({
    pattern: "iptrack",
    alias: ["traceip", "ip"],
    desc: "Fake IP tracking animation",
    react: "🌐",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🌐 *Tracking IP Address...*",
            "📡 *Locating Server...*",
            "📍 *Coordinates Found!*",
            "🌍 *Country: USA*",
            "🏙️ *City: New York*",
            "✅ *IP Tracked Successfully!* 😈"
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
            image: { url: "https://files.catbox.moe/y6qmzx.jpg" },
            caption: "*🌐 Your IP is safe!*\n> _No one can track you!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 10. FAKE ZOMBIE APOCALYPSE COMMAND
// ============================================
cmd({
    pattern: "zombie",
    alias: ["apocalypse"],
    desc: "Fake zombie apocalypse animation",
    react: "🧟",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🧟 *ZOMBIE APOCALYPSE STARTED!*",
            "🏃 *Zombies Approaching...*",
            "🧟‍♂️ *They're Everywhere!*",
            "🔫 *Fighting Back...*",
            "💀 *We Survived!*",
            "✅ *Just Kidding! It's safe!* 😂"
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
            image: { url: "https://files.catbox.moe/d2a9kv.jpg" },
            caption: "*🧟 Apocalypse Cancelled!*\n> _Stay alive, stay happy!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 11. FAKE SPACE INVASION COMMAND
// ============================================
cmd({
    pattern: "spaceinvasion",
    alias: ["aliens", "ufo"],
    desc: "Fake alien invasion animation",
    react: "👽",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "👽 *ALIEN INVASION DETECTED!*",
            "🛸 *UFOs Approaching...*",
            "🌍 *Earth Under Attack!*",
            "💥 *Defense Systems Activated...*",
            "🛡️ *Aliens Defeated!*",
            "✅ *Just Kidding! Earth is safe!* 😂"
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
            image: { url: "https://files.catbox.moe/1pba7s.jpg" },
            caption: "*👽 Alien Invasion Failed!*\n> _They went to Mars instead!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 12. FAKE JAIL COMMAND
// ============================================
cmd({
    pattern: "jail",
    alias: ["prison"],
    desc: "Fake jail animation",
    react: "⛓️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "⛓️ *You've Been Sentenced!*",
            "🚔 *Officers Taking You Away...*",
            "🔐 *Cell Door Locked...*",
            "📸 *Mugshot Taken...*",
            "🕒 *Time Served...*",
            "✅ *Just Kidding! You're Free!* 😂"
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
            image: { url: "https://files.catbox.moe/8q1qmq.jpg" },
            caption: "*⛓️ Jail Break Successful!*\n> _You're a free bird!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 13. FAKE SATELLITE HACK COMMAND
// ============================================
cmd({
    pattern: "sathack",
    alias: ["satellite", "sat"],
    desc: "Fake satellite hacking animation",
    react: "🛰️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🛰️ *Hacking Satellite...*",
            "📡 *Accessing Space Systems...*",
            "🌍 *Earth View Acquired...*",
            "🔭 *Zooming In...*",
            "✅ *Satellite Hacked!* 😈"
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
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: "*🛰️ Satellite Hacked!*\n> _You can see everything now! Just kidding!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 14. FAKE HAIR LOSS COMMAND
// ============================================
cmd({
    pattern: "hairloss",
    alias: ["bald", "dandruff"],
    desc: "Fake hair loss scare animation",
    react: "🧑‍🦲",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "🧑‍🦲 *Hair Loss Alert!*",
            "💇 *Hair Falling Out...*",
            "😱 *Bald Spot Forming...*",
            "🧴 *Using Hair Oil...*",
            "✅ *Just Kidding! Your hair is fine!* 😂"
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
            image: { url: "https://files.catbox.moe/q20h6q.jpg" },
            caption: "*🧑‍🦲 No Hair Loss Today!*\n> _Keep growing!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 15. FAKE BOMB DEFUSAL COMMAND
// ============================================
cmd({
    pattern: "bombdefuse",
    alias: ["defuse", "bomb"],
    desc: "Fake bomb defusal animation",
    react: "💣",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const steps = [
            "💣 *BOMB DETECTED!*",
            "🔴 *60 Seconds Left...*",
            "✂️ *Cutting Red Wire...*",
            "⏳ *10 Seconds Left...*",
            "✅ *Bomb Defused!* 🎉"
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
            image: { url: "https://files.catbox.moe/1pba7s.jpg" },
            caption: "*💣 Bomb Defused Successfully!*\n> _You're a hero!_"
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================
// 16. ALL EXTRA COMMANDS LIST
// ============================================
cmd({
    pattern: "funlist",
    alias: ["funmenu", "extra"],
    desc: "Show all extra fun commands",
    react: "🎮",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) return;

        const funMenu = `
╭━━〔 *EXTRA FUN COMMANDS* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• .virus - Virus scare animation
┃◈┃• .bankhack - Bank hack animation
┃◈┃• .wifihack - WiFi hack animation
┃◈┃• .nuclear - Nuclear launch animation
┃◈┃• .timetravel - Time travel animation
┃◈┃• .darkweb - Dark web access animation
┃◈┃• .cop - Police arrest animation
┃◈┃• .terror - Terrorist alert animation
┃◈┃• .iptrack - IP tracking animation
┃◈┃• .zombie - Zombie apocalypse animation
┃◈┃• .spaceinvasion - Alien invasion animation
┃◈┃• .jail - Jail animation
┃◈┃• .sathack - Satellite hack animation
┃◈┃• .hairloss - Hair loss scare animation
┃◈┃• .bombdefuse - Bomb defusal animation
┃◈┃• .funlist - Show all extra commands
┃◈└───────────┈⊷
╰──────────────┈⊷
*⚠️ All commands are for fun only!*
> *© Powered by AHMAD TechXD*`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ky6phx.jpg" },
            caption: funMenu
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
