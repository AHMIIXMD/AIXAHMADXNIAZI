import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const STATUS_JID = "status@broadcast";

// JID ko clean karna
const normalizeJid = (jid = "") => {
    return jid.split(":")[0];
};

// Sirf normal WhatsApp user JIDs
const isUserJid = (jid = "") => {
    return jid.endsWith("@s.whatsapp.net");
};

// Bot ka apna JID
const getMyJid = (conn) => {
    return normalizeJid(conn.user?.id || "");
};

// Contacts aur groups se status viewers collect karna
const getStatusViewers = async (conn) => {
    const viewers = new Set();

    // ── Store ke Contacts ──
    const contacts = conn.store?.contacts || {};

    for (const jid of Object.keys(contacts)) {
        const cleanJid = normalizeJid(jid);

        if (isUserJid(cleanJid)) {
            viewers.add(cleanJid);
        }
    }

    // ── Sab Groups ke Participants ──
    try {
        const allChats = await conn.groupFetchAllParticipating();
        const allGroups = Object.values(allChats || {});

        for (const group of allGroups) {
            for (const participant of group.participants || []) {
                const participantJid = normalizeJid(
                    participant.id || participant.jid || ""
                );

                if (isUserJid(participantJid)) {
                    viewers.add(participantJid);
                }
            }
        }
    } catch (error) {
        console.error(
            "Group participants fetch error:",
            error.message
        );
    }

    // Bot ko apne hi status viewers se remove karna
    const myJid = getMyJid(conn);
    if (myJid) {
        viewers.delete(myJid);
    }

    return [...viewers];
};

cmd({
    pattern: "status",
    alias: [
        "mystatus",
        "story",
        "wstatus",
        "chstatus"
    ],
    desc: "Post text, image, video or audio on WhatsApp Status.",
    category: "owner",
    react: "🟢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator }) => {

    // ── Owner Check ──
    if (!isCreator) {
        return reply(
            "❌ This command is only for the *bot owner*!"
        );
    }

    try {
        const caption = text?.trim() || "";
        const quotedMsg = m.quoted;
        const quotedData = quotedMsg
            ? (quotedMsg.msg || quotedMsg)
            : null;

        const mimeType = quotedData?.mimetype || "";

        // ── Usage Check ──
        if (!quotedMsg && !caption) {
            return reply(
                `🟢 *WhatsApp Status Usage:*\n\n` +

                `*Text Status:*\n` +
                `.status Today is a beautiful day\n\n` +

                `*Image Status:*\n` +
                `Image ko reply karke:\n` +
                `.status New picture\n\n` +

                `*Video Status:*\n` +
                `Video ko reply karke:\n` +
                `.status New video update\n\n` +

                `*Audio Status:*\n` +
                `Audio ko reply karke:\n` +
                `.status Listen to this\n\n` +

                `━━━━━━━━━━━━━━━━━━\n` +
                `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            );
        }

        // ── Status Viewers Collect ──
        const statusViewers = await getStatusViewers(conn);

        if (!statusViewers.length) {
            return reply(
                `❌ *Status viewers nahi mile!*\n\n` +
                `Make sure contacts store ya group participants available hon.`
            );
        }

        // ── Processing Reaction ──
        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        let statusContent = {};

        // ── Quoted Image ──
        if (quotedMsg && mimeType.startsWith("image/")) {
            const imageBuffer = await quotedMsg.download();

            statusContent = {
                image: imageBuffer,
                caption: caption || undefined
            };
        }

        // ── Quoted Video ──
        else if (quotedMsg && mimeType.startsWith("video/")) {
            const videoBuffer = await quotedMsg.download();

            statusContent = {
                video: videoBuffer,
                caption: caption || undefined
            };
        }

        // ── Quoted Audio ──
        else if (quotedMsg && mimeType.startsWith("audio/")) {
            const audioBuffer = await quotedMsg.download();

            statusContent = {
                audio: audioBuffer,
                mimetype: mimeType,
                ptt: mimeType.includes("ogg")
            };
        }

        // ── Text Status ──
        else if (!quotedMsg && caption) {
            statusContent = {
                text: caption
            };
        }

        else {
            return reply(
                `❌ Unsupported status type!\n\n` +
                `Sirf text, image, video aur audio status supported hain.`
            );
        }

        // ── Publish WhatsApp Status ──
        await conn.sendMessage(
            STATUS_JID,
            statusContent,
            {
                broadcast: true,
                statusJidList: statusViewers,

                // Text status design
                backgroundColor: "#128C7E",
                font: 2
            }
        );

        // ── Success Reaction ──
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

        return reply(
            `✅ *WhatsApp Status uploaded successfully!*\n\n` +
            `👀 *Viewers:* ${statusViewers.length}\n` +
            `📌 *Status:* Status tab mein show hoga\n` +
            `⏱️ *Duration:* WhatsApp ke normal status rules ke mutabiq\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `~ *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        );

    } catch (error) {
        console.error("WhatsApp status error:", error);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

        return reply(
            `❌ *Status Upload Error:*\n\n${error.message}`
        );
    }
});
