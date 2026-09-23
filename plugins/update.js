import { cmd } from '../command.js';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Your Vercel API base URL
const API_BASE_URL = 'https://ahmadhassan-eight.vercel.app/';

// Allowed users (LID and phone number formats)
const ALLOWED_USERS = [
    '239891891929169@lid',
    '923221540695@s.whatsapp.net'
];

cmd({
    pattern: "update",
    desc: "Update all connected servers with latest plugins",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, react }) => {

    // Check if sender is allowed
    if (!ALLOWED_USERS.includes(sender)) {
        await react('❌');
        return reply("Only AHMAD Can Use This Command");
    }

    try {
        // Send processing reaction
        await react('⏳');
        
        // Fetch all servers from API
        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 10000 });
        
        if (!serversResponse.data || !serversResponse.data.servers) {
            await react('❌');
            return reply("Failed to fetch server list");
        }
        
        const servers = serversResponse.data.servers;
        
        // Send immediate response
        await reply(`🔄 *Updating ${servers.length} Servers...*`);
        
        // Send update requests to all servers in parallel (fire and forget)
        const updatePromises = servers.map(server => {
            const updateUrl = `${server.url}/updateplugins?key=jawi804`;
            return axios.get(updateUrl, { 
                timeout: 5000  // 5 second timeout
            }).catch(err => ({
                server: server.name,
                error: err.message
            }));
        });
        
        // Don't wait for all to complete - just fire them
        Promise.allSettled(updatePromises);
        
        await react('✅');
        await reply(`✅ *Update commands sent to ${servers.length} servers!*\n\n> Updates are processing in background\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`);
        
    } catch (error) {
        console.error("Update error:", error.message);
        await react('❌');
        return reply("❌ Update Failed");
    }
});
