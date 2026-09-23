import axios from 'axios';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import googleTTS from 'google-tts-api';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
    pattern: "tts",
    desc: "download songs",
    category: "download",
    react: "💀",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
})
await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: false }, { quoted: mek })
    }catch(a){
reply(`${a}`)
}
})
