import { cmd } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ===== ALWAYS ONLINE =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup, userConfig }) => {
    try {
        // Get userConfig from context
        const config = userConfig || {};
        
        // Always online after reply
        if (config.ALWAYS_ONLINE === "true") {
            await conn.sendPresenceUpdate('available', from).catch(() => {});
        } else if (config.ALWAYS_ONLINE === "false") {
            await conn.sendPresenceUpdate('unavailable', from).catch(() => {});
        }
    } catch (e) {
        // Silent fail
    }
});

// ===== AUTO TYPING =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup, userConfig }) => {
    try {
        // Get userConfig from context
        const config = userConfig || {};
        
        if (config.AUTO_TYPING === 'true') {
            await conn.sendPresenceUpdate('composing', from).catch(() => {});
        } 
        else if (config.AUTO_TYPING === 'inbox') {
            if (!isGroup) {
                await conn.sendPresenceUpdate('composing', from).catch(() => {});
            }
        }
        else if (config.AUTO_TYPING === 'group') {
            if (isGroup) {
                await conn.sendPresenceUpdate('composing', from).catch(() => {});
            }
        }
    } catch (e) {
        // Silent fail
    }
});

// ===== AUTO RECORDING =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup, userConfig }) => {
    try {
        // Get userConfig from context
        const config = userConfig || {};
        
        if (config.AUTO_RECORDING === 'true') {
            await conn.sendPresenceUpdate('recording', from).catch(() => {});
        }
        else if (config.AUTO_RECORDING === 'inbox') {
            if (!isGroup) {
                await conn.sendPresenceUpdate('recording', from).catch(() => {});
            }
        }
        else if (config.AUTO_RECORDING === 'group') {
            if (isGroup) {
                await conn.sendPresenceUpdate('recording', from).catch(() => {});
            }
        }
    } catch (e) {
        // Silent fail
    }
});
