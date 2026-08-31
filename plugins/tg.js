import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd } from '../command.js';
import axios from 'axios';
import { getBuffer } from "../lib/functions.js";
import { videoToWebp } from '../lib/video-utils.js';
import { Sticker, StickerTypes } from "wa-sticker-formatter";

const __filename = fileURLToPath(import.meta.url);

// Telegram Bot Token - UPDATED WITH NEW BOT TOKEN
const BOT_TOKEN = '8515677844:AAGa0LaHgZtAKmieSm6gLhTyNn1fHfW4I60';

cmd({
    pattern: "tsticker",
    alias: ["tg", "tgs", "tgstick", "telegramsticker"],
    react: "🛡️",
    desc: "Download Telegram sticker pack",
    category: "download",
    use: ".tsticker <telegram_sticker_url>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, isCreator }) => {
    try {
        // Owner restriction
        if (!isCreator) {
            return await reply("📛 This is an owner command.");
        }

        if (!q) {
            return await reply("❌ Please provide a Telegram sticker pack URL!\nExample: .tsticker https://t.me/addstickers/packname");
        }

        // Validate Telegram sticker URL
        if (!q.includes('t.me/addstickers/') && !q.includes('telegram.me/addstickers/')) {
            return await reply("❌ Please provide a valid Telegram sticker pack URL!\nIt should look like: https://t.me/addstickers/packname");
        }

        // ⏳ React - processing
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });
        
        await reply("📦 Downloading sticker pack... Please wait!");

        // Extract pack name from URL
        let packName = q.replace("https://t.me/addstickers/", "")
                       .replace("http://t.me/addstickers/", "")
                       .replace("https://telegram.me/addstickers/", "")
                       .replace("http://telegram.me/addstickers/", "");
        packName = packName.split('?')[0].trim();

        if (!packName) {
            return await reply("❌ Invalid sticker pack URL!");
        }

        // Fetch sticker pack info from Telegram API
        const apiURL = `https://api.telegram.org/bot${BOT_TOKEN}/getStickerSet?name=${encodeURIComponent(packName)}`;
        
        const response = await axios.get(apiURL, {
            timeout: 30000,
            headers: {
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0"
            }
        });

        // Check if response is valid
        if (!response.data || !response.data.ok) {
            const errorMsg = response.data?.description || 'Invalid response from Telegram API';
            return await reply(`❌ Failed to fetch sticker pack: ${errorMsg}`);
        }

        const stickerSet = response.data.result;

        if (!stickerSet || !stickerSet.stickers || stickerSet.stickers.length === 0) {
            return await reply("❌ No stickers found in this pack!");
        }

        // Process stickers to get download URLs
        const stickers = [];
        
        for (const sticker of stickerSet.stickers) {
            try {
                // Get file path for each sticker
                const fileResponse = await axios.get(
                    `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${sticker.file_id}`
                );

                if (fileResponse.data.ok && fileResponse.data.result.file_path) {
                    const filePath = fileResponse.data.result.file_path;
                    const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
                    
                    stickers.push({
                        emoji: sticker.emoji || "❓",
                        is_animated: sticker.is_animated || false,
                        is_video: sticker.is_video || false,
                        image_url: imageUrl,
                        file_id: sticker.file_id,
                        file_path: filePath
                    });
                }
            } catch (fileError) {
                console.error(`Error processing sticker ${sticker.file_id}:`, fileError.message);
                continue;
            }
        }

        if (stickers.length === 0) {
            return await reply("❌ No stickers could be processed!");
        }

        // Send sticker pack info
        await reply(`📦 *Sticker Pack Info*\n\n` +
                   `*Name:* ${stickerSet.name || 'N/A'}\n` +
                   `*Title:* ${stickerSet.title || 'N/A'}\n` +
                   `*Type:* ${stickerSet.sticker_type || 'regular'}\n` +
                   `*Stickers:* ${stickers.length}\n\n` +
                   `⏳ Processing ${stickers.length} stickers...`);

        let sentCount = 0;
        let failedCount = 0;
        const totalStickers = stickers.length;
        let pack = "𝘼𝙃𝙈𝘼𝘿🚩";

        // Send each sticker
        for (const [index, sticker] of stickers.entries()) {
            try {
                const stickerUrl = sticker.image_url;
                const filePath = sticker.file_path || '';
                const fileExtension = filePath.split('.').pop().toLowerCase();
                
                console.log(`[TSTICK] Processing sticker ${index + 1}/${totalStickers}: ${filePath}`);
                
                // Handle based on file extension and type
                if (fileExtension === 'webp' && !sticker.is_animated) {
                    // Static WebP sticker - send directly
                    await conn.sendMessage(from, {
                        sticker: { url: stickerUrl }
                    }, { quoted: mek });
                    sentCount++;
                    
                } else if (fileExtension === 'tgs' || fileExtension === 'webm' || sticker.is_animated || sticker.is_video) {
                    // Animated sticker - need to convert
                    try {
                        console.log(`[TSTICK] Converting animated sticker ${index + 1}`);
                        const videoBuffer = await getBuffer(stickerUrl);
                        
                        if (videoBuffer && videoBuffer.length > 0) {
                            // Convert video to WebP sticker
                            const webpBuffer = await videoToWebp(videoBuffer);
                            
                            if (webpBuffer && webpBuffer.length > 0) {
                                // Create sticker with proper metadata
                                let stickerObj = new Sticker(webpBuffer, {
                                    pack: pack, 
                                    type: StickerTypes.FULL,
                                    categories: ["🤩", "🎉"], 
                                    id: "12345",
                                    quality: 75, 
                                    background: 'transparent',
                                });
                                
                                const buffer = await stickerObj.toBuffer();
                                await conn.sendMessage(from, { 
                                    sticker: buffer 
                                }, { quoted: mek });
                                sentCount++;
                            } else {
                                throw new Error('Empty WebP buffer');
                            }
                        } else {
                            throw new Error('Empty video buffer');
                        }
                        
                    } catch (convertError) {
                        console.error(`[TSTICK] Conversion failed for sticker ${index + 1}:`, convertError.message);
                        // Fallback: send as document
                        try {
                            await conn.sendMessage(from, {
                                document: { url: stickerUrl },
                                fileName: `sticker_${index + 1}.${fileExtension || 'webm'}`,
                                mimetype: 'application/octet-stream'
                            }, { quoted: mek });
                            sentCount++;
                        } catch (fallbackError) {
                            failedCount++;
                        }
                    }
                    
                } else {
                    // Unknown format - try as image first, then document
                    try {
                        await conn.sendMessage(from, {
                            image: { url: stickerUrl }
                        }, { quoted: mek });
                        sentCount++;
                    } catch (imageError) {
                        try {
                            await conn.sendMessage(from, {
                                document: { url: stickerUrl },
                                fileName: `sticker_${index + 1}.${fileExtension || 'unknown'}`,
                                mimetype: 'application/octet-stream'
                            }, { quoted: mek });
                            sentCount++;
                        } catch (docError) {
                            failedCount++;
                        }
                    }
                }
                
                // Small delay between stickers
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (stickerError) {
                console.error(`[TSTICK] Error sending sticker ${index + 1}:`, stickerError.message);
                failedCount++;
                // Continue with next sticker even if one fails
            }
        }

        // ✅ React - success
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
        
        const resultMessage = `✅ Sticker pack download completed!\n\n` +
                             `*Pack:* ${stickerSet.name || 'Unknown'}\n` +
                             `*Title:* ${stickerSet.title || 'N/A'}\n` +
                             `*Success:* ${sentCount}/${totalStickers}\n` +
                             `*Failed:* ${failedCount}\n` +
                             (failedCount > 0 ? `\n⚠️ Some stickers failed to convert. They were sent as documents.` : '');
        
        await reply(resultMessage);

    } catch (error) {
        console.error('[TSTICK] Command Error:', error?.message || error);
        
        // Handle specific error types
        let errorMsg = "❌ Download failed: ";
        if (error.response && error.response.status === 404) {
            errorMsg += "Sticker pack not found. Please check the URL.";
        } else if (error.response && error.response.status === 401) {
            errorMsg += "Invalid bot token. Please configure a valid Telegram bot token.";
        } else if (error.code === 'ECONNABORTED') {
            errorMsg += "Connection timeout. Please try again later.";
        } else {
            errorMsg += error?.message || 'Unknown error';
        }
        
        await reply(errorMsg);
    }
});
