import { cmd } from '../command.js';
import fetch from 'node-fetch';
import config from '../config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "simdata",
  alias: ["sdata", "siminfo"],
  react: "🗯️",
  desc: "Fetch SIM data by number (Owner only).",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, isCreator, args, reply }) => {

  if (!isCreator) return reply("❌ This command is only for the bot owner!");

  const number = args[0];
  if (!number) return reply("📞 Please provide a number.\nExample: *.simdata 034*********");

  try {
    // 🔒 Protected numbers
    const protectedNumbers = ["03259158117", "03437385525", "03259158117", "03147385565"];

    // 🕒 Step 1: Wait 5 seconds before checking protection
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 🛡️ Step 2: Check if requested number is protected
    if (protectedNumbers.includes(number)) {
      return reply("🚫 Access Denied! This number is protected by AHMAD-MD Owner Security System.");
    }

    // 🌐 Step 3: Fetch API
    const apiUrl = `https://fam-official.serv00.net/api/database.php?number=${number}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      return reply("❌ No record found for this number.");
    }

    // 🕒 Step 4: Wait 5 seconds to verify fetched data
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 🛡️ Step 5: Check again if fetched number is protected
    const fetchedNumber = data?.data[0]?.number || number;
    if (protectedNumbers.includes(fetchedNumber)) {
      return reply("🚫 Access Denied! This number is protected by KHAN-MD Owner Security System.");
    }

    // ✅ Step 6: Pick first valid record
    const record = data.data.find(item => item.name || item.address) || data.data[0];

    let resultText = `*╭┈───〔 ꜱɪᴍ ᴅᴀᴛᴀ ʟᴏᴏᴋᴜᴘ 〕┈───⊷*\n`;
    resultText += `*├▢ 📱 Number:* ${number}\n`;
    resultText += `*├▢ 👤 Name:* ${record.name || "N/A"}\n`;
    resultText += `*├▢ 🆔 CNIC:* ${record.cnic || "N/A"}\n`;
    resultText += `*├▢ 🏠 Address:* ${record.address || "N/A"}\n`;
    resultText += `*╰─────────────*\n\n`;
    resultText += `⚠️ *Disclaimer:* This data is fetched from a public API.\n`;
    resultText += `_We are not responsible for any misuse or illegal activity._`;

    // ✅ Step 7: Send final verified result
    await conn.sendMessage(from, { text: resultText }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("❌ Failed to fetch SIM data. Please try again later.");
  }
});
