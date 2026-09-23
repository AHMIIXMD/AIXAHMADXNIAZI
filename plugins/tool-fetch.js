import axios from 'axios';
import { cmd, commands } from '../command.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from a provided URL or API",
    category: "main",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const q = args.join(' ').trim();
        if (!q) return reply('❌ Please provide a valid URL or query.');

        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://.');

        // Make request using axios directly
        const response = await axios({
            method: 'get',
            url: q,
            responseType: 'arraybuffer', // Get raw response to detect content type
            timeout: 30000 // 30 second timeout
        });

        // Get content type from response headers
        const contentType = response.headers['content-type'] || '';
        
        // Handle different response types
        if (contentType.includes('application/json')) {
            // Parse JSON data
            const jsonData = JSON.parse(response.data.toString());
            const jsonString = JSON.stringify(jsonData, null, 2);
            
            // If JSON is too long, send as file
            if (jsonString.length > 2000) {
                const buffer = Buffer.from(jsonString);
                await conn.sendMessage(from, {
                    document: buffer,
                    mimetype: 'application/json',
                    fileName: 'response.json',
                    caption: `📄 *JSON Response*\nSize: ${jsonString.length} characters`
                }, { quoted: mek });
            } else {
                // Send as normal text
                await conn.sendMessage(from, {
                    text: `🔍 *Fetched JSON Data*:\n\`\`\`${jsonString}\`\`\``
                }, { quoted: mek });
            }
        }
        else if (contentType.includes('image/')) {
            // Send as image
            await conn.sendMessage(from, {
                image: Buffer.from(response.data),
                caption: `🖼️ *Image Response*\nContent-Type: ${contentType}`
            }, { quoted: mek });
        }
        else if (contentType.includes('video/')) {
            // Send as video
            await conn.sendMessage(from, {
                video: Buffer.from(response.data),
                caption: `🎥 *Video Response*\nContent-Type: ${contentType}`
            }, { quoted: mek });
        }
        else if (contentType.includes('audio/')) {
            // Send as audio
            await conn.sendMessage(from, {
                audio: Buffer.from(response.data),
                mimetype: contentType,
                caption: `🎵 *Audio Response*\nContent-Type: ${contentType}`
            }, { quoted: mek });
        }
        else if (contentType.includes('text/')) {
            // Send as text
            const textData = response.data.toString();
            if (textData.length > 2000) {
                // If text is too long, send as file
                const buffer = Buffer.from(textData);
                await conn.sendMessage(from, {
                    document: buffer,
                    mimetype: 'text/plain',
                    fileName: 'response.txt',
                    caption: `📄 *Text Response*\nSize: ${textData.length} characters`
                }, { quoted: mek });
            } else {
                await conn.sendMessage(from, {
                    text: `📝 *Text Response*:\n${textData}`
                }, { quoted: mek });
            }
        }
        else {
            // Handle other content types or send as document
            const buffer = Buffer.from(response.data);
            const ext = contentType.split('/')[1] || 'bin';
            await conn.sendMessage(from, {
                document: buffer,
                mimetype: contentType,
                fileName: `response.${ext}`,
                caption: `📁 *Response*\nContent-Type: ${contentType}\nSize: ${buffer.length} bytes`
            }, { quoted: mek });
        }

    } catch (e) {
        console.error("Error in fetch command:", e);
        
        let errorMessage = `❌ An error occurred:\n`;
        if (e.response) {
            errorMessage += `Status: ${e.response.status}\n`;
            errorMessage += `Message: ${e.response.statusText || e.message}`;
        } else if (e.request) {
            errorMessage += `No response received from server\n`;
            errorMessage += `Error: ${e.message}`;
        } else {
            errorMessage += e.message;
        }
        
        reply(errorMessage);
    }
});
