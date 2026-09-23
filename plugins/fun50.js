import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Helper to get bot ID safely
const getBotId = (conn) => {
  if (!conn.user) return '';
  return conn.user.id.split(':')[0] + '@s.whatsapp.net';
};

// ============================================
// 1. ISHQ METER COMMAND
// ============================================
cmd({
  pattern: "ishqmeter",
  alias: ["pyaarmeter", "dildhadkan"],
  desc: "Tumhara ishq kitna gehra hai check karo",
  react: "💘",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  const percent = Math.floor(Math.random() * 100) + 1;
  const messages = [
    { r: [90, 100], t: `🔥 *ISHQ MEIN DOOBA HUA!* 🔥\n\nYeh banda/bandi toh sidha jahannum ka parwana hai!\nIshq ka level: ${percent}% 💯\n\n*"Teri tasweer aankhon mein hai, teri khusboo saanson mein hai!"*\n\nAllah bachaye aisi mohabbat se! 😂❤️` },
    { r: [70, 89], t: `😍 *KAFI GEHRA ISHQ!* 😍\n\nIshq level: ${percent}%\n\n*"Jab bhi teri yaad aati hai, phone haath mein aa jaata hai!"*\n\nBhai propose kar de, der mat kar! 💌` },
    { r: [40, 69], t: `😊 *THODA THODA PYAAR!* 😊\n\nIshq level: ${percent}%\n\n*"Dil mein kuch to hai, lekin bolne ki himmat nahi!"*\n\nYeh wala stage sabse zyada khubsoorat hota hai! 🌸` },
    { r: [1, 39], t: `😐 *DOST JAISA PYAAR!* 😐\n\nIshq level: ${percent}%\n\n*"Yaar tu toh sirf friend zone mein hai!"* 😂\n\nThoda kaam karo apne aap par! 💪` }
  ];
  const msg = messages.find(x => percent >= x.r[0] && percent <= x.r[1]);
  await conn.sendMessage(mek.chat, {
    text: `💘 *ISHQ METER* 💘\n\n@${sender.split("@")[0]} ka ishq:\n\n${msg.t}`,
    mentions: [sender]
  }, { quoted: mek });
});

// ============================================
// 2. ANDHA ISHQ COMMAND
// ============================================
cmd({
  pattern: "andhaishq",
  alias: ["blindlove", "pagalashiq"],
  desc: "Kisi ko randomly andha ashiq bana do",
  react: "🙈",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Sirf group mein chalega yeh tamasha!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const victim = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🙈 *ANDHA ISHQ ALERT!* 🙈\n\n@${sender.split("@")[0]} aaj se @${victim.id.split("@")[0]} ka\n*PAGAL DEEWANA* ban gaya/gayi hai! 😂\n\n"Raat ko sapne mein bhi teri hi tasweer!"\n"Din mein bhi teri hi fikar!"\n\n*Bhai/Behen, doctor ko dikha lo!* 💀😂`,
    `🙈 *ANDHA PYAAR!* 🙈\n\n@${sender.split("@")[0]} toh @${victim.id.split("@")[0]} ke liye\nmathaa tek chuka/chuki hai! 🙇\n\nHar subah status check: ✅\nHar raat online dekhna: ✅\nBlock hone ke baad bhi message: ✅\n\n*Ishq mein aql kho di!* 😂💔`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, victim.id] }, { quoted: mek });
});

// ============================================
// 3. LAFZ-E-MOHABBAT COMMAND
// ============================================
cmd({
  pattern: "lafzmohabbat",
  alias: ["romanticlafz", "dilletter"],
  desc: "Kisi ko romantic Urdu lafzon mein express karo",
  react: "🌹",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein aao pehle!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const beloved = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🌹 *LAFZ-E-MOHABBAT* 🌹\n\n@${sender.split("@")[0]} ne @${beloved.id.split("@")[0]} ke liye kaha:\n\n*"Teri aankhein - do sitare meri raat ke,\nTeri muskaan - subah ki pehli dhoop,\nTere bina ye group bhi soona lagta hai,\nHai teri hasrat dil mein aisa kuch!"*\n\n🥀 Dono ko MUBARAK! 🎊`,
    `🌹 *DIL KI ZUBAAN* 🌹\n\n@${sender.split("@")[0]} dil mein chhupa ke rakhta/rakhti tha/thi,\naaj bol hi diya @${beloved.id.split("@")[0]} ko:\n\n*"Jab tum online hote/hoti ho,\ntoh mera dil bhi recharge ho jaata hai!"* 😂💓\n\nSabse sach baat! 🔥`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, beloved.id] }, { quoted: mek });
});

// ============================================
// 4. PEHLI NAZAR COMMAND
// ============================================
cmd({
  pattern: "pehlinazar",
  alias: ["firstlove", "najarwala"],
  desc: "Pehli nazar ka waqia reveal karo",
  react: "👀",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala command hai bhai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `👀 *PEHLI NAZAR KA KISSA!* 👀\n\nJab @${sender.split("@")[0]} ne pehli baar\n@${target.id.split("@")[0]} ki DP dekhi...\n\n❤️ Dil: *"Yeh kaun hai?!"*\n📱 Haath: *Kaanpne lage*\n🧠 Dimag: *Hang ho gaya*\n😳 Chehra: *Laal ho gaya*\n\n*Pehli nazar mein hi kaam tamaam!* 💘😂`,
    `👀 *NAZAR MILI NAZAR!* 👀\n\n@${sender.split("@")[0]} ka @${target.id.split("@")[0]} ki\nnazar se pehla meeting:\n\n*"Bas ek pal ko dekha,\naur pal bhar mein dil le gaye!"*\n\nShayar ban gaye aap toh! 🌹😂`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 5. DILLAGI COMMAND
// ============================================
cmd({
  pattern: "dillagi",
  alias: ["mazaak", "chherhna"],
  desc: "Kisi se dillagi karo group mein",
  react: "😜",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Yeh toh group ka fun hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `😜 *DILLAGI TIME!* 😜\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} se kaha:\n\n*"Teri smile dekh ke mujhe neend nahi aati!\nAur teri baat sun ke bhi neend nahi aati!\nYani tu meri insomnia ki wajah hai!"* 😂💀\n\nYeh complaint hai ya compliment? 🤔`,
    `😜 *CHHERHNA SHURU!* 😜\n\n@${sender.split("@")[0]} ka @${target.id.split("@")[0]} ko message:\n\n*"Yaar tu online tha/thi,\nmain bhi online tha/thi,\nphir tune reply kyun nahi kiya?!\nYeh ZULM hai bhai/behan!"* 😭😂\n\nKoi jawab do bhai! 👀`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 6. KHOOBSURAT BANA COMMAND
// ============================================
cmd({
  pattern: "khoobsurat",
  alias: ["sundar", "gorgeous", "haseen"],
  desc: "Kisi ki khoobsurti ke charche karo",
  react: "✨",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein aao!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `✨ *GROUP KA SABSE KHOOBSURAT!* ✨\n\nAaj ka Official Award:\n*"Most Beautiful in Group"* 🏆\n\nJaata hai @${target.id.split("@")[0]} ko!\n\n*"Teri khoobsurti ka koi jawab nahi,\nTere saamne chand bhi phika lagta hai,\nAllah ne banaya hai tujhe bahut dhyaan se!"* 🌙✨\n\nSabko agree karna hoga! 💯`,
    `✨ *HASEEN AWARD!* ✨\n\n@${target.id.split("@")[0]} sun!\n\n*Aaj scientific research ne prove kiya hai*\nke tum is group ke sabse khoobsurat member ho!\n\nEvidence:\n📸 DP - MashaAllah 🥰\n💬 Baatein - Dil jeet leti hain\n✨ Presence - Group chamak jaata hai\n\n*Mubarak ho!* 🎊`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [target.id] }, { quoted: mek });
});

// ============================================
// 7. DHADKAN COMMAND
// ============================================
cmd({
  pattern: "dhadkan",
  alias: ["heartbeat", "dilkidhadkan"],
  desc: "Dil ki dhadkan kitni zyada hai check karo",
  react: "💓",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein hi dhadkan tez hoti hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const bpm = Math.floor(Math.random() * 150) + 60;
  await conn.sendMessage(mek.chat, {
    text: `💓 *DIL KI DHADKAN TEST* 💓\n\n@${sender.split("@")[0]} ki normal heartbeat: *72 BPM*\n\nJab @${target.id.split("@")[0]} ka naam aaya:\n\n💥 BPM: *${bpm}* 💥\n\n${bpm > 150 ? "🚨 *EMERGENCY! Ambulance bulao!* 😂💀\nYeh toh seedha ICU wala pyaar hai!" : bpm > 100 ? "😍 *WOWWW! Kaafi tez hai!*\nKuch toh hai bhai... 👀" : "😊 *Normal range mein hai!*\nPar dil mein kuch zaroor hai! 💕"}`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 8. MOHABBAT KA PEHLA KHAT COMMAND
// ============================================
cmd({
  pattern: "pehlaakhat",
  alias: ["loveletter", "dilletter2"],
  desc: "Romantic pehla khat likh do kisi ke liye",
  react: "💌",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein hi khati milti hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const beloved = participants[Math.floor(Math.random() * participants.length)];
  
  const letters = [
    `💌 *MOHABBAT KA PEHLA KHAT* 💌\n\nFrom: @${sender.split("@")[0]}\nTo: @${beloved.id.split("@")[0]}\n\n*"Jab se tumhe dekha hai,\nNa subah acchi lagti hai,\nNa raat chain se kaatti hai,\nHar waqt bas tumhara hi khayal...\n\nYeh khat likh raha/rahi hoon,\nBaat karne ki himmat nahi!\nBas itna hi kehna tha ke...\nTum ho toh duniya acchi lagti hai!"*\n\n💝 Forever Tumhara/Tumhari 💝`,
    `💌 *PEHLA KHAT - PEHLA PYAAR* 💌\n\n@${sender.split("@")[0]} ne @${beloved.id.split("@")[0]} ke liye likha:\n\n*"Teri ek muskaan ne mujhe\nShayar bana diya!\nTere ek message ne\nSaara din sundar kar diya!\n\nMain jaanta/jaanti hoon,\nTum padhoge/padhogi aur hasoge/hasogi,\nLekin is hans mein bhi mera dil hai!"*\n\n😂😭 Pagal ho gaya/gayi yeh banda/bandi! 💖`
  ];
  await conn.sendMessage(mek.chat, { text: letters[Math.floor(Math.random() * letters.length)], mentions: [sender, beloved.id] }, { quoted: mek });
});

// ============================================
// 9. ZIDDI DIL COMMAND
// ============================================
cmd({
  pattern: "ziddidil",
  alias: ["manmaani", "nakhre"],
  desc: "Dil ki ziddi harkatein batao",
  react: "😤",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala command hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `😤 *ZIDDI DIL KI REPORT!* 😤\n\n@${sender.split("@")[0]} ka dil @${target.id.split("@")[0]} ke baare mein:\n\nDimag: "Ignore karo!"\nDil: "Nahi karta!" 💢\n\nDimag: "Block kar do!"\nDil: "Bilkul nahi!" 😤\n\nDimag: "Baat mat karo!"\nDil: *pehle hi message kar chuka* 😂\n\n*Ziddi dil ka koi ilaj nahi!* 💔❤️`,
    `😤 *NAKHRE WALA DIL!* 😤\n\n@${sender.split("@")[0]} ka dil @${target.id.split("@")[0]} ke liye:\n\n*"Main nahi sochta/sochti unke baare mein..."\n(5 second baad dil ne unka profile khol liya) 😂\n\n"Mujhe koi farq nahi parta..."\n(Raat ko unka status 10 baar dekha) 👀\n\n"Main bilkul theek hoon..."\n(Unhe dekh ke neend nahi aati) 😭*\n\nYeh dil bhi na! 💀💖`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 10. YAAD AATA HAI COMMAND
// ============================================
cmd({
  pattern: "yaadaata",
  alias: ["missing", "miss"],
  desc: "Kisi ki yaad aane ka dramatic asar",
  react: "🥺",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Sirf group mein!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🥺 *YAAD AATA HAI...* 🥺\n\n@${sender.split("@")[0]} jab @${target.id.split("@")[0]} ki\nyaad aati hai toh:\n\n🌙 Raat ko: *Neend nahi aati*\n☀️ Din mein: *Kuch accha nahi lagta*\n📱 Phone pe: *Baar baar unka naam dhundha*\n🎵 Gaana suna: *Unhe yaad kiya*\n🌧️ Baarish: *Aur zyada yaad aaye*\n\n*"Teri yaad aati hai jab tujhe bhoolna chahta/chahti hoon!"* 💔😂`,
    `🥺 *MISSING YOU LEVEL: 9999* 🥺\n\n@${target.id.split("@")[0]} ki @${sender.split("@")[0]} ko\nkitni yaad aati hai:\n\n*"Chai peeta/peeti hoon - teri yaad*\n*Gaana sunta/sunti hoon - teri yaad*\n*Group mein aata/aati hoon - teri yaad*\n*Sona chahta/chahti hoon - teri yaad*\n\nTu hai hi aisi/aisa, bhoolna mushkil hai!"* 😭💖`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 11. TAUBA TAUBA COMMAND
// ============================================
cmd({
  pattern: "taubatauba",
  alias: ["chhorhdo", "bazdone"],
  desc: "Kisi ki mohabbat se tauba karne ki nakaamyab koshish",
  react: "🤦",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein aao!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🤦 *TAUBA TAUBA!* 🤦\n\n@${sender.split("@")[0]} ne aaj 10vi baar kasam khayi:\n\n*"@${target.id.split("@")[0]} ke baare mein ab nahi sochna!"*\n\nAur 10vi baar fail ho gaye/gayi! 😂\n\n*Time: 3 baje raat*\n*Kaam: Unki purani chats padh raha/rahi tha/thi*\n\nYeh pyaar nahi addiction hai bhai/behan! 😭💀\n\nAllah madad kare! 🙏`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 12. PEHLI MUHABBAT COMMAND
// ============================================
cmd({
  pattern: "pehlamuhabbat",
  alias: ["firstcrush", "bachpankipyaar"],
  desc: "Group mein pehli mohabbat ka khulasa",
  react: "🌸",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala command!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🌸 *PEHLI MOHABBAT STORY!* 🌸\n\n@${sender.split("@")[0]} ne bachpan mein\n@${target.id.split("@")[0]} se pyaar kiya!\n\n*"Unhe dekhne ke liye class late jaata/jaati tha/thi,\nUnka naam notebook pe likhta/likhti tha/thi,\nUnke ghar ke bahar se guzrna bahana tha,\nYeh pehla pyaar tha... sachcha, saada!"*\n\nAb sach batao dono! 😂💕`,
  ];
  await conn.sendMessage(mek.chat, { text: msgs[0], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 13. WAFA KA IMTIHAAN COMMAND
// ============================================
cmd({
  pattern: "wafaimtihaan",
  alias: ["loyaltytest", "wafadar"],
  desc: "Wafa ka imtihaan lo group mein",
  react: "🎭",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Sirf group mein!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const score = Math.floor(Math.random() * 100) + 1;
  await conn.sendMessage(mek.chat, {
    text: `🎭 *WAFA KA IMTIHAAN* 🎭\n\n@${target.id.split("@")[0]} ka wafa score:\n\n*${score}/100* ${score > 80 ? "💯 - *WAFADAR INSAAN!*\n\nYeh banda/bandi jannat ka haqdar/haqdar hai!\nAise insaan milte nahi aajkal! 🥺❤️" : score > 50 ? "😊 - *THEEK THEEK WAFADAR!*\n\nKuch chances hain improve karne ke! 😂" : "😅 - *JARA KAM WAFADAR!*\n\nBhai behen miyan biwi wala scene hai! 💀😂"}`,
    mentions: [target.id]
  }, { quoted: mek });
});

// ============================================
// 14. DONO KI KAHANI COMMAND
// ============================================
cmd({
  pattern: "donokikahani",
  alias: ["lovestory", "ishqkissah"],
  desc: "Do logon ki love story banao",
  react: "📖",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein hi kahaniyan hoti hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const partner = participants[Math.floor(Math.random() * participants.length)];
  
  const stories = [
    `📖 *DONO KI KAHANI* 📖\n\n*Chapter 1:* @${sender.split("@")[0]} ne @${partner.id.split("@")[0]} ki DP dekhi - Dil ruk gaya! 😍\n\n*Chapter 2:* Group mein ek dusre ke jokes pe hasne lage - Dosti shuru! 😂\n\n*Chapter 3:* DM pe baatein hone lagin - *"Sirf dost hain!"* 🙄\n\n*Chapter 4:* Raat ke 3 baje tak baatein - *"Haan sirf dost..."* 😂💀\n\n*Chapter 5:* Aaj bhi ek doosre se milne ka intzaar!\n\n*End: To be continued...* 💕`,
    `📖 *PYAARI KAHANI!* 📖\n\n*@${sender.split("@")[0]} + @${partner.id.split("@")[0]}*\n\nEk baar group mein dono online the,\nEk ne funny meme bheja,\nDoosra hansa,\nPhir baatein shuru huyin,\n\nAaj bhi yahi hota hai...\nBaar baar...\nRoz Roz...\n\n*"Kuch keh dete dono, group wait kar raha hai!"* 😂❤️`
  ];
  await conn.sendMessage(mek.chat, { text: stories[Math.floor(Math.random() * stories.length)], mentions: [sender, partner.id] }, { quoted: mek });
});

// ============================================
// 15. GULAB BHEJO COMMAND
// ============================================
cmd({
  pattern: "gulabbhejo",
  alias: ["sendrose", "phoolbhejo"],
  desc: "Kisi ko virtually gulab bhejo",
  react: "🌹",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Gulab group mein hi milte hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const receiver = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🌹 *GULAB BHEJA GAYA!* 🌹\n\n@${sender.split("@")[0]} ne @${receiver.id.split("@")[0]} ko\nbheja ek *LAAL GULAB* 🌹\n\nSath mein likha tha:\n*"Yeh gulab itna sundar nahi,\nJitne tum ho,\nLekin meri taraf se,\nSirf tumhare liye!"* 🥺\n\n*Lene wale kuch jawab do!* 😂💕`,
    `🌹 *VIRTUAL PHOOL!* 🌹\n\n🌹🌹🌹🌹🌹\n@${receiver.id.split("@")[0]} ke liye\n@${sender.split("@")[0]} ki taraf se!\n🌹🌹🌹🌹🌹\n\n*"Yeh phool murjha jayenge,\nLekin tumhara khayal nahi!"* 😭💖\n\nSabse bada shayar agaya group mein! 😂`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, receiver.id] }, { quoted: mek });
});

// ============================================
// 16. AANKHEIN COMMAND
// ============================================
cmd({
  pattern: "aankhein",
  alias: ["eyes", "nigaah"],
  desc: "Kisi ki aankhon ki taarif karo",
  react: "👁️",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group command hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const taarifs = [
    `👁️ *AANKHON KI TAARIF!* 👁️\n\n@${target.id.split("@")[0]} ki aankhein:\n\n*"Do sitare zameen pe utar aaye hain,\nIn aankhon mein doob ke duniya bhool jaata/jaati hoon,\nJab ye aankhein muskaraati hain,\nToh poori raat roshni ho jaati hai!"* 🌟\n\n*Subhan Allah!* 🥺✨`,
    `👁️ *NIGAAH!* 👁️\n\n@${target.id.split("@")[0]} ka eyes description:\n\n✨ Deep - Jaise samundar\n🌟 Bright - Jaise sitaare\n💫 Magical - Jaise koi jadu ho\n\n*"Teri aankhon se milti hain aankhein,\nToh duniya ki koi zaroorat nahi!"* 😍\n\nAllah ki khoobsoorat creation! 🙏`
  ];
  await conn.sendMessage(mek.chat, { text: taarifs[Math.floor(Math.random() * taarifs.length)], mentions: [target.id] }, { quoted: mek });
});

// ============================================
// 17. SHAYAR BAN COMMAND
// ============================================
cmd({
  pattern: "shayarban",
  alias: ["poem", "sher"],
  desc: "Group mein shayari sunao kisi ke liye",
  react: "🎤",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein shayari hoti hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const shayaris = [
    `🎤 *@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ke liye SHAYARI sunai!* 🎤\n\n*"Teri muskaan pe main marta hoon,\nTeri ek baat pe nikharta hoon,\nTu door ho toh dil ghabrata hai,\nTere paas aake chain pata hoon!"*\n\n🎊 Waah Waah! 👏 Kya baat kahi! 🌹`,
    `🎤 *SHER SUNAO!* 🎤\n\n@${sender.split("@")[0]} bola/boli @${target.id.split("@")[0]} ke liye:\n\n*"Na chai ka nasha, na chai ki mehak,\nTeri baatein hi kaafi hain mujhe jagane ko!\nNa raat ki thandak, na subah ki dhoop,\nTeri ek message hi kaafi hai mujhe khush karne ko!"*\n\n💖 Yeh toh bada hi sach sher tha! 😂🌹`
  ];
  await conn.sendMessage(mek.chat, { text: shayaris[Math.floor(Math.random() * shayaris.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 18. DUSHMAN DOST COMMAND
// ============================================
cmd({
  pattern: "dushmandost",
  alias: ["frenemies", "durhabeeb"],
  desc: "Group mein dushman ya dost ka pata lagao",
  react: "🤼",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala fun hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const person = participants[Math.floor(Math.random() * participants.length)];
  
  const relation = Math.random() > 0.5 ? "DOST" : "DUSHMAN";
  const msgs = {
    "DOST": `🤝 *SACHCHA DOST REVEAL!* 🤝\n\n@${person.id.split("@")[0]} tumhara *SACHCHA DOST* hai @${sender.split("@")[0]}!\n\nYeh:\n✅ Tere liye ready rahega/rahegi 24/7\n✅ Secret kabhi nahi batayega/batayegi\n✅ Saath milke roasted karega/karegi doosron ko\n✅ Bure waqt mein saath hoga/hogi\n\n*Aisa dost toh sona hota hai!* 💛`,
    "DUSHMAN": `😈 *KHABARDAAR!* 😈\n\n@${sender.split("@")[0]} group mein @${person.id.split("@")[0]} se\nbachke rehna!\n\nYeh toh *CHHUPA DUSHMAN* hai! 😂\n\n*"Moonh pe meetha, peeth pe..." you know!* 😅\n\nBs mazaak hai bhai, sab dost hain! 😂💕`
  };
  await conn.sendMessage(mek.chat, { text: msgs[relation], mentions: [sender, person.id] }, { quoted: mek });
});

// ============================================
// 19. TANG KARNA COMMAND
// ============================================
cmd({
  pattern: "tangkarna",
  alias: ["chidana", "pareshan"],
  desc: "Kisi ko pyaar se tang karo",
  react: "😈",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein tang karo!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const victim = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `😈 *TANG KARNA SHURU!* 😈\n\n@${sender.split("@")[0]} ne @${victim.id.split("@")[0]} ko\n*tang* karne ki kasam khayi!\n\nTareeka:\n📱 Har message pe reply karunga/karungi\n😂 Har joke pe hans lunga/lungi\n👀 Har status pe react karunga/karungi\n💌 Subah sher, raat ko shayari\n\n*"Yeh pyaar nahi tang karna hai!"* 😂💕\nHa ha ha! 😈`,
    `😈 *CHIDANA SHURU!* 😈\n\n@${victim.id.split("@")[0]} bhai/behan ALERT:\n\n@${sender.split("@")[0]} ne plan banaya hai tumhe\n*pyaar se tang* karne ka! 😂\n\nRoz subah: "Uthho! Good Morning!"\nRoz raat: "Sone ka waqt ho gaya?"\nGrup mein: Har cheez pe mention\n\n*Is tang karne se bachna mushkil hai!* 💀❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, victim.id] }, { quoted: mek });
});

// ============================================
// 20. SMILE CHURAO COMMAND
// ============================================
cmd({
  pattern: "smilechurao",
  alias: ["muskaan", "hasao"],
  desc: "Kisi ki smile churalo pyaar se",
  react: "😊",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala command!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `😊 *SMILE CHURA LI!* 😊\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ki\n*smile chura li* aaj! 😄\n\n*"Tumhari muskaan dekh ke,\nMera sara din ban jaata hai!\nYeh toh sab se khoobsoorat cheez hai,\nJo mujhe pata hai!"* 🌸\n\nAbhi smile karo tum! 😊`,
    `😊 *MUSKAAN AWARD!* 😊\n\nAaj ka *"Best Smile in Group"* award\njaata hai @${target.id.split("@")[0]} ko!\n\n*@${sender.split("@")[0]} ki taraf se special mention:*\n"Jab tum muskuraate/muskuraati ho,\ntoh group ki raunaq ho jaati hai!" 🌟\n\nShukriya itni khoobsoorat muskaan ke liye! 💖`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 21. JAAN COMMAND
// ============================================
cmd({
  pattern: "jaan",
  alias: ["jaanu", "sweetheart"],
  desc: "Kisi ko pyaar se jaan bulao",
  react: "💗",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Sirf group mein!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const beloved = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `💗 *JAAN WALA MESSAGE!* 💗\n\n@${sender.split("@")[0]} ne kaha:\n\n*"@${beloved.id.split("@")[0]}... Jaan!"*\n\n😳 @${beloved.id.split("@")[0]} ka reaction:\n\n*Chehra laal...*\n*Dil tez...*\n*Reply ka intezaar...*\n*"Maine kuch suna ya..."* 😂🥺\n\nSab ne suna! Ab reply karo JAAN! 😂💗`,
    mentions: [sender, beloved.id]
  }, { quoted: mek });
});

// ============================================
// 22. QISMAT WALA COMMAND
// ============================================
cmd({
  pattern: "qismatwala",
  alias: ["lucky", "naseeb"],
  desc: "Qismat mein kaun hai check karo",
  react: "🍀",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const fated = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🍀 *QISMAT KA INKISHAAF!* 🍀\n\n@${sender.split("@")[0]} ki qismat mein likha hai:\n\n*@${fated.id.split("@")[0]}!* ✨\n\n*"Na iss ki koshish, na uss ki koshish,\nJo likha tha qismat mein woh aaya!\nYeh dono ka milna toh upar se taya tha!"*\n\n🌟 Allah ki marzi mein hi bhalaai hai! 💫\n\nDono ko mubarak! 🎊💕`,
    mentions: [sender, fated.id]
  }, { quoted: mek });
});

// ============================================
// 23. JHOOTH KA PYAAR COMMAND
// ============================================
cmd({
  pattern: "jhoothpyaar",
  alias: ["fakelove", "dikhawa"],
  desc: "Reveal karo kaunsa pyaar jhootha hai",
  react: "🎭",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala drama!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🎭 *JHOOTH KA PARDA HATA!* 🎭\n\n@${sender.split("@")[0]} ne bataya:\n\n*"@${target.id.split("@")[0]} kehta/kehti hai 'Sirf dost hoon!'\nLekin:*\n\n- Subah sabse pehle mujhe text: ✅\n- Raat ko online check karna: ✅\n- Meri har baat yaad rakhna: ✅\n- Birthday yaad rakhna: ✅\n\n*Yeh dosti wali dosti nahi lagti!"* 😂💕`,
    `🎭 *SACH KYA HAI?!* 🎭\n\n@${target.id.split("@")[0]} kehta/kehti hai:\n*"Hum sirf dost hain!"*\n\nLekin @${sender.split("@")[0]} ka kehna hai:\n*"Agar sirf dost hain,\ntoh raat ko 2 baje sirf dost hi\n'Neend aa rahi hai?' kyun poochhte/poochhhti hain?"*\n\n😂 Poora group sach jaanta hai! 💀❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 24. SIYAANI BAT COMMAND
// ============================================
cmd({
  pattern: "siyaanibaat",
  alias: ["lifetip", "aqalmand"],
  desc: "Random funny life advice do group mein",
  react: "🧠",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  const tips = [
    `🧠 *AAJ KI SIYAANI BAAT* 🧠\n\n*"Jo teri yaad karta/karti hai,\nwoh online bhi hoga/hogi aur text bhi!\nJo nahi karta/karti, excuse bahut hoge!"*\n\n✅ Save this to your heart! 💖`,
    `🧠 *AAJ KI AQALMAND BAAT* 🧠\n\n*"Pyaar mein ek kaam karo:\nPehle khud se pyaar karo!\nBaaki sab apne aap ho jaata hai!"*\n\n✅ Daily reminder! 💪`,
    `🧠 *ZINDAGI KA FUNDA* 🧠\n\n*"Jo tumhara wait karta/karti hai,\nwoh tumse pyaar karta/karti hai!\nJo 'busy hoon' kehta/kehti hai,\nuski priority tum nahi!"*\n\n🔥 Sach baat! Save kar lo! 📌`,
    `🧠 *AQAL KI BAAT* 🧠\n\n*"Kabhi kisi ke peeche mat bhaago,\nJo tumhara hai, tumhare paas aayega!\nPhool ki tarah khilte raho,\nTitliyaan khud aayengi!"* 🦋\n\n😂 Lekin door se nahi dekho sirf! 🌸`,
    `🧠 *GROUP WISDOM* 🧠\n\n*"Wo log jo group mein kam bolte hain,\nwoh DM mein sabse zyada bolte hain!\nGroup mein shaant, privately pagal!"* 😂\n\nSach hai ya nahi? 😅`
  ];
  reply(tips[Math.floor(Math.random() * tips.length)]);
});

// ============================================
// 25. MOHABBAT KA QARZ COMMAND
// ============================================
cmd({
  pattern: "mohabbatqarz",
  alias: ["lovedebt", "ehsaan"],
  desc: "Pyaar ka qarz chukao kisi ko",
  react: "💝",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group command!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `💝 *MOHABBAT KA QARZ CHUKAYA!* 💝\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ko\naaj ek *Khaas Thank You* diya:\n\n*"Tum ne jo ek din mujhe online dekh ke\n'Kya hua?' poochha tha,\nwoh main aaj tak nahi bhool saka/sakti!\nTumhari choti si parwah ne\nzindagi badal di!"* 🥺💝\n\nYeh hai sachchi mohabbat! 😭❤️`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 26. NAZAR UTARAO COMMAND
// ============================================
cmd({
  pattern: "nazarutarao",
  alias: ["nazar", "buri nazar"],
  desc: "Kisi ki buri nazar utaro funny style mein",
  react: "🧿",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala command!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🧿 *NAZAR UTARAO!* 🧿\n\n@${target.id.split("@")[0]} par is group mein\n*bahut buri nazar* lag rahi hai!\n\nKisne lagayi? 👀\n\n🕯️ *Nazar Utarne ka Tarika:*\n\n"Allah Tawakkalt" 3 baar\n+ Durood 3 baar\n+ Group ke tamam logon ko\nchai pilao ek baar! ☕😂\n\n*Sab theek ho jaayega InshAllah!* 🙏\n\n*Yeh sab mazaak hai bhai, asli ilaj doctor!* 😂`,
    mentions: [target.id]
  }, { quoted: mek });
});

// ============================================
// 27. ROMANTIC BAKWAAS COMMAND
// ============================================
cmd({
  pattern: "romanticbakwaas",
  alias: ["filmibaatein", "dialogbaazi"],
  desc: "Filmi romantic dialogue sunao group mein",
  react: "🎬",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein sunao filmi baatein!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const co_star = participants[Math.floor(Math.random() * participants.length)];
  
  const dialogues = [
    `🎬 *FILMI SCENE!* 🎬\n\n@${sender.split("@")[0]} ne dramatic andaaz mein\n@${co_star.id.split("@")[0]} ko dekh ke kaha:\n\n*"Main tujhse mohabbat nahi karta/karti!\n(3 second silence)\nMain tujhse BOHOT mohabbat karta/karti hoon!"*\n\n😂 Seedha Bollywood scene! 🎭\n\nBackground mein violin baj rahi hai! 🎻`,
    `🎬 *DRAMATIC SCENE!* 🎬\n\n@${sender.split("@")[0]}: "@${co_star.id.split("@")[0]} tumse ek baat kehni thi..."\n@${co_star.id.split("@")[0]}: "Haan bolo..."\n@${sender.split("@")[0]}: "..."\n@${co_star.id.split("@")[0]}: "Kya hua?"\n@${sender.split("@")[0]}: "..."\n\n*Baarish shuru ho gayi dramatically!* 🌧️\n\n*Group: "Bol bhi do yaar!"* 😂💀`
  ];
  await conn.sendMessage(mek.chat, { text: dialogues[Math.floor(Math.random() * dialogues.length)], mentions: [sender, co_star.id] }, { quoted: mek });
});

// ============================================
// 28. AASHIQANA AWARD COMMAND
// ============================================
cmd({
  pattern: "aashiqanaaward",
  alias: ["romanticaward", "pyaaraward"],
  desc: "Group mein romantic award do kisi ko",
  react: "🏆",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala award!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const winner = participants[Math.floor(Math.random() * participants.length)];
  
  const awards = [
    `🏆 *AASHIQANA AWARD NIGHT!* 🏆\n\nAaj ka *"Sabse Romantic Insaan"* Award\n\n🥁 *...drum roll...*\n\n🎊 @${winner.id.split("@")[0]} ko! 🎊\n\n*"Yeh banda/bandi itna/itni romantic hai ke:\nPhool dekhe - romance\nChaand dekha - romance\nBaarish hui - romance\nChay pi - romance*\n\nYaar tum toh har jagah romance dhoondh lete/leti ho!" 😂❤️`,
    `🏆 *PYAAR WALA AWARD!* 🏆\n\n*Congratulations @${winner.id.split("@")[0]}!*\n\nTumhe mila hai:\n*"Group Ka Dil Jeetne Wala"* 🥇\n\nKyunki:\n💬 Tumhari baatein - heart touching\n😊 Tumhari muskaan - dil khushkar\n❤️ Tumhari presence - group mein jannat\n\n*Sach mein acha insaan ho tum!* 🌟`
  ];
  await conn.sendMessage(mek.chat, { text: awards[Math.floor(Math.random() * awards.length)], mentions: [winner.id] }, { quoted: mek });
});

// ============================================
// 29. MOHABBAT TERI COMMAND
// ============================================
cmd({
  pattern: "mohabbatteri",
  alias: ["yourlovetype", "pyaarkatype"],
  desc: "Tumhare pyaar ka type kya hai",
  react: "💖",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  const types = [
    `💖 *TUMHARA PYAAR KA TYPE!* 💖\n\n*SILENT LOVER* 🤫\n\nTum pyaar karte/karti ho lekin bolte/bolti nahi!\nBas aankhon se express karte/karti ho!\nStatus lagaate/lagaati ho hint waale!\nAur wait karte/karti ho ke woh samjhe/samjhe!\n\n*"Ek baar seedha bol do yaar!"* 😂💕`,
    `💖 *PYAAR TYPE RESULT!* 💖\n\n*DRAMA QUEEN/KING LOVER* 🎭\n\nTumhara pyaar:\n- Thoda zyada filmi\n- Thoda zyada dramatic\n- Thoda zyada emotional\n- Bohot zyada sachcha!\n\n*"Aisi mohabbat karo ke log story likhein!"* 😂❤️`,
    `💖 *TUMHARA LOVE TYPE!* 💖\n\n*LOYAL AF* 💎\n\nTum ek baar pyaar karte/karti ho\ntoh puri zindagi ke liye!\nChodna bhi nahi chahte/chahti,\nLekin sahi insaan dhoondna mushkil hai!\n\n*"Allah best de tumhe!"* 🤲💫`,
    `💖 *LOVE PERSONALITY!* 💖\n\n*BAKWAS LOVER* 😂\n\nTumhara pyaar:\n- Mazaak mein chhupa hua\n- Hassi mein dil ki baat\n- Jhagre mein care\n- Ignore mein attention\n\n*Poora ulta tarika hai tumhara!* 😂💕`
  ];
  await conn.sendMessage(mek.chat, {
    text: types[Math.floor(Math.random() * types.length)] + `\n\n@${sender.split("@")[0]}`,
    mentions: [sender]
  }, { quoted: mek });
});

// ============================================
// 30. DIL KHOL KE COMMAND
// ============================================
cmd({
  pattern: "dilkhol",
  alias: ["openup", "dilkhabaat"],
  desc: "Kisi se dil khol ke baat karo",
  react: "💬",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein dil kholo!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `💬 *DIL KHOL KE BAT!* 💬\n\n@${sender.split("@")[0]} ne aaj @${target.id.split("@")[0]} ko\n*DIL KHOL KE* bata diya:\n\n*"Yaar tere saath time spend karna,\nMujhe sach mein accha lagta hai!\nNa koi drama, na koi show,\nBas tu ho, toh dil khush ho!"* 🥺\n\nYeh baat sach mein dil se nikli! 💖`,
    `💬 *SACH BAAT!* 💬\n\n@${sender.split("@")[0]} ka @${target.id.split("@")[0]} ke liye\nkhula sandesa:\n\n*"Main jaanta/jaanti hoon tum bura nahi maanoge/maanogi,\nIsliye kehna chahta/chahti hoon:\nTum bahut ache/achi ho!\nAur main tumhari parwah karta/karti hoon!"*\n\n😭 Yeh group ka sachcha rishta! ❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 31. GUSSA PYAAR COMMAND
// ============================================
cmd({
  pattern: "gussapyaar",
  alias: ["lovehate", "gusspyar"],
  desc: "Gusse wale pyaar ka izhar karo",
  react: "😠❤️",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein gussa karo!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `😠❤️ *GUSSA PYAAR COMBO!* 😠❤️\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ko kaha:\n\n*"Tum mujhe bahut gussa dilate ho!\n...aur phir bhi main tumhara intezaar karta/karti hoon!\n\nTum late reply karte/karti ho,\n...aur phir bhi mujhe tumse baat karni hoti hai!\n\nTum ignore karte/karti ho,\n...aur phir bhi dil mein tumhi hote/hoti ho!\n\nYeh kya jaadu hai bhai?!"* 😭😂\n\n*Yahi toh sachcha pyaar hai!* 💀❤️`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 32. JASOOS COMMAND
// ============================================
cmd({
  pattern: "jasoos",
  alias: ["spy", "jasus"],
  desc: "Group ke jasoos ka pata lagao",
  react: "🕵️",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Jasoos group mein hote hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const spy = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🕵️ *JASOOS PAKDA GAYA!* 🕵️\n\n*BREAKING NEWS* 📰\n\nIs group mein ek *CHHUPA JASOOS* tha!\n\nAur woh hai... 🥁\n\n*@${spy.id.split("@")[0]}!* 😱\n\nYeh banda/bandi:\n✅ Sab ki screenshots leta/leti tha/thi\n✅ Group ki sari info store thi\n✅ Doosre groups mein share karta/karti tha/thi\n\n*JK bhai! Sab dost hain!* 😂\n\nMazaak tha, bura mat maano! 💕`,
    mentions: [spy.id]
  }, { quoted: mek });
});

// ============================================
// 33. TANGA PHANDA COMMAND
// ============================================
cmd({
  pattern: "tangaphanda",
  alias: ["trapped", "phanda"],
  desc: "Pyaar ke phande mein pakdo kisi ko",
  react: "🪤",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala phanda!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const trapped = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🪤 *PYAAR KE PHANDE MEIN!* 🪤\n\n@${trapped.id.split("@")[0]} bhai/behan,\ntum @${sender.split("@")[0]} ke\n*PYAAR KE PHANDE* mein a gaye/gayi ho!\n\nNikalna mushkil hai kyunki:\n\n💬 Unki baatein - nasha hai\n😊 Unki muskaan - chain hai\n📱 Unka message - khushi hai\n🌙 Unka waqt - jannat hai\n\n*Ab nikaalna bhi nahi chahoge/chahogi!* 😂💕\n\nWelcome to the best phanda! ❤️`,
    mentions: [sender, trapped.id]
  }, { quoted: mek });
});

// ============================================
// 34. MUFT ADVICE COMMAND
// ============================================
cmd({
  pattern: "muftadvice",
  alias: ["freeadvice", "nasheehat"],
  desc: "Muft mein pyaar ki advice do",
  react: "📢",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  const advices = [
    `📢 *MUFT ADVICE #1* 📢\n\n*"Jis ko tumse zyada doosra pasand ho,\nusse tumhare liye pasand mat aane do!\nKhud ki izzat karo sabse pehle!"*\n\n💪 *Self respect first!* 👑`,
    `📢 *MUFT ADVICE #2* 📢\n\n*"Woh jo tumhe 'busy hoon' kehta/kehti hai aur doosron ke saath online hai,\nwoh busy nahi - priority nahi ho tum!\nFind someone who makes time!"*\n\n🔥 *Hard truth!* ❤️`,
    `📢 *MUFT ADVICE #3* 📢\n\n*"Pyaar mein kabhi peeche mat jaao!\nAage bhi mat bhago!\nBas saath chalte raho!\nYahi sachchi mohabbat hai!"*\n\n💫 *Aaj ki wisdom!* 🌸`,
    `📢 *MUFT ADVICE #4* 📢\n\n*"Jo tumhare liye khush hota/hoti hai,\n jo tumhare liye roye,\nwoh tumhara saccha wala hai!\nBaaki sab dekho aur ignore karo!"*\n\n💖 *True story!* 🎯`,
    `📢 *MUFT ADVICE #5* 📢\n\n*"Group mein agar koi specially tumhe tag karta/karti hai,\nspecially tumhe GN/GM bolta/bolti hai,\nspecially tumhara reply chahiye hota hai -\nbhai woh kuch toh rakhta/rakhti hai dil mein!"*\n\n😂 *Observe karo yaar!* 👀`
  ];
  reply(advices[Math.floor(Math.random() * advices.length)]);
});

// ============================================
// 35. NAKHREBAAZ COMMAND
// ============================================
cmd({
  pattern: "nakhrebaaz",
  alias: ["drama", "nakhre"],
  desc: "Group ka sabse bada nakhrebaaz reveal karo",
  react: "💅",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Nakhre group mein hote hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const drama = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `💅 *NAKHREBAAZ AWARD!* 💅\n\nAaj ka *"Group Ka Sabse Bada Nakhrebaaz"* Award:\n\n🥁 *...TAADAAA...*\n\n@${drama.id.split("@")[0]}! 🎊\n\nYeh:\n💅 "Bas ek minute mein aaya/aayi" = 30 min\n💬 "Koi khaas nahi" = 3 ghante se type kar raha/rahi\n😒 "Theek hoon" = Bilkul theek nahi\n👀 "Mujhe parwah nahi" = Sabse zyada parwah\n\n*Pyaare nakhre hain inke!* 😂❤️`,
    mentions: [drama.id]
  }, { quoted: mek });
});

// ============================================
// 36. ANOKHA PYAAR COMMAND
// ============================================
cmd({
  pattern: "anokhapyaar",
  alias: ["uniquelove", "ajeebmohabbat"],
  desc: "Sabse anokhe andaaz mein pyaar karo",
  react: "🌈",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala anokha pyaar!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const loved = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🌈 *ANOKHA PYAAR!* 🌈\n\n@${sender.split("@")[0]} ka @${loved.id.split("@")[0]} ke liye\nSabse *ANOKHA* pyaar ka izhar:\n\n*"Tum wifi jaiso ho mere liye!\nJab ho toh zindagi smooth,\nJab nahi ho toh kuch kaam nahi karta!\nAur jab signal kamzor ho,\ntoh dil ghabrata hai!"* 📶❤️\n\n*Aaj ka sabse romantic comparison!* 😂💕`,
    `🌈 *AJAB MOHABBAT!* 🌈\n\n@${sender.split("@")[0]} ne @${loved.id.split("@")[0]} ko compare kiya:\n\n*"Tum mere liye Mobile Battery jaiso ho!\nSubah full charged mil jao,\ntoh poora din khushi khushi guzre!\nKam ho jao toh anxious ho jaata/jaati hoon!\nBilkul drain ho jao toh life ruk jaati hai!"*\n\n*Iss se zyada sachchi mohabbat kya hogi?!* 😂🔋❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, loved.id] }, { quoted: mek });
});

// ============================================
// 37. BHAAG GAYA/GAYI COMMAND
// ============================================
cmd({
  pattern: "bhaaggaya",
  alias: ["runaway", "ghaib"],
  desc: "Koi group se bhaag gaya pata lagao",
  react: "🏃",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group ka command hai!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const runner = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🏃 *BHAAG GAYA/GAYI!* 🏃\n\n*ALERT ALERT ALERT!* 🚨\n\nKhabar yeh hai ke @${runner.id.split("@")[0]} ne\nis group se *BHAAGNE* ki koshish ki!\n\nKyu?\n\nShayad:\n😅 Kisi ka crush wali baat pata chal gayi\n😂 Kisi ne unhe tag kar diya jhoothi shayari mein\n💀 Koi unhe publicly propose karne wala tha\n\n*Woh bhaag nahi sakte!\nHum unhe yaad dilaate rahenge!* 😂\n\nWapas aao @${runner.id.split("@")[0]}! ❤️`,
    mentions: [runner.id]
  }, { quoted: mek });
});

// ============================================
// 38. KHUSH NASEEBI COMMAND
// ============================================
cmd({
  pattern: "khushnaseebi",
  alias: ["lucky2", "bhagyashan"],
  desc: "Aaj ka sabse khush naseeb insaan kaun hai",
  react: "🌟",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala lucky!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const lucky = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `🌟 *AAJ KA SABSE KHUSH NASEEB!* 🌟\n\n*Stars ne bataya hai ke aaj ka\nsabse KHUSH NASEEB insaan hai:*\n\n✨ @${lucky.id.split("@")[0]} ✨\n\n*Aaj tumhare liye:*\n💰 Rizq mein barkat\n❤️ Pyaar mein khushi\n😊 Khushiyan dobaala\n🌙 Raat chain ki\n☀️ Subah achi\n\n*Mubarak ho!* 🎊\n\nInshAllah! 🤲💫`,
    mentions: [lucky.id]
  }, { quoted: mek });
});

// ============================================
// 39. RONE WALA COMMAND
// ============================================
cmd({
  pattern: "ronewala",
  alias: ["emotional", "drama2"],
  desc: "Group ka sabse emotional banda/bandi reveal",
  react: "😭",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein aao!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const crybaby = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `😭 *EMOTIONAL AWARD!* 😭\n\nAaj ka *"Sabse Sensitive Dil Wala"* Award:\n\n🎊 @${crybaby.id.split("@")[0]} ko! 🎊\n\nYeh:\n😭 Sad song sune - ro dete/deti hain\n🎬 Movie dekhe - ro dete/deti hain\n📖 Koi sacchi baat kaho - ro dete/deti hain\n🌧️ Baarish dekhe - ro dete/deti hain\n💌 Koi achi baat karo - ro dete/deti hain\n\n*Par yahi sensitive dil sabse\nsundar hota hai!* 🥺❤️\n\nTumhara dil sachcha hai! 💖`,
    mentions: [crybaby.id]
  }, { quoted: mek });
});

// ============================================
// 40. WAQT GUZARNA COMMAND
// ============================================
cmd({
  pattern: "waqtguzarna",
  alias: ["timewaster", "bakwastime"],
  desc: "Kaise waqt guzarte ho batao funny style",
  react: "⏰",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala command!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `⏰ *WAQT GUZARNA - DAILY SCHEDULE!* ⏰\n\n@${target.id.split("@")[0]} ka roz ka routine:\n\n☀️ *Subah:* @${sender.split("@")[0]} ke messages check karo\n🍽️ *Dopahar:* Unki status dekho\n☕ *Shaam:* Unke online hone ka intezaar\n🌙 *Raat:* Unse baatein karo\n💤 *Neend:* Unke baare mein sapne\n\n*Busy schedule hai tumhara!* 😂💕\n\nSach hai ya nahi? Bolo! 👀`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 41. CHAND SA CHEHRA COMMAND
// ============================================
cmd({
  pattern: "chandsa",
  alias: ["moonface", "chandchehra"],
  desc: "Kisi ki chand jaisi khoobsurti ki taarif",
  react: "🌙",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const beauty = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `🌙 *CHAND SA CHEHRA!* 🌙\n\nAaj @${beauty.id.split("@")[0]} ke liye:\n\n*"Chand bhi sharmata hoga dekh ke,\nSitare bhi jhukate hote nazar,\nAllah ne banaya hai tujhe bahut pyaar se,\nHar nazar mein hai teri ek alag kadar!"* 🥺\n\n*Subhan Allah!* ✨ MashaAllah! 🌟`,
    `🌙 *MOONLIGHT TAARIF!* 🌙\n\n@${beauty.id.split("@")[0]} ke liye group ka kehna:\n\n*"Raat ke andhere mein jo chand chamke,\nBilkul waise tum group mein aate/aati ho!\nSara andher dil ka mit jaata hai,\nJab tumhara message screen pe aata hai!"*\n\n💖 Sach bol raha/rahi hoon! ❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [beauty.id] }, { quoted: mek });
});

// ============================================
// 42. DOST YA DILDAR COMMAND
// ============================================
cmd({
  pattern: "dostyadildar",
  alias: ["friendorlover", "kyadono"],
  desc: "Pata lagao dono mein kya hai sachchi baat",
  react: "🤔",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala reveal!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const result = Math.random() > 0.5 ? "DILDAR" : "PAKKA DOST";
  const msgs = {
    "DILDAR": `🤔 *REVEAL TIME!* 🤔\n\n@${sender.split("@")[0]} aur @${target.id.split("@")[0]} ke beech:\n\n*Algorithm ka jawab: DILDAR!* 💘\n\n*"Dono kahte hain sirf dost hain,\nLekin:*\n💬 Baatein ghanton hoti hain\n😊 Dono ek doosre ke liye smile karte hain\n❤️ Ek doosre ki parwah hai\n\n*Yeh dosti ka naam nahi, kuch aur hai!"* 😂`,
    "PAKKA DOST": `🤔 *REVEAL!* 🤔\n\n@${sender.split("@")[0]} aur @${target.id.split("@")[0]}:\n\n*Result: PAKKA SACHCHA DOST!* 🤝\n\n*"Kuch rishte sirf dosti ke hote hain!\nIsmein koi romance nahi,\nBas ek dil ka gehri dost!\nJo hamesha saath ho!"*\n\n*Yeh dosti barkarar rahe!* 🥂💛`
  };
  await conn.sendMessage(mek.chat, { text: msgs[result], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 43. GALAT FEHMI COMMAND
// ============================================
cmd({
  pattern: "galatfehmi",
  alias: ["misunderstand", "confuse"],
  desc: "Group mein dramatic galat fehmi drama",
  react: "😤",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Galat fehmiyan group mein hoti hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `😤 *GALAT FEHMI DRAMA!* 😤\n\n@${sender.split("@")[0]} aur @${target.id.split("@")[0]} ke beech\nAaj ki *BIGGEST GALAT FEHMI:*\n\n@${sender.split("@")[0]}: "Tum mujhe ignore karte/karti ho!"\n@${target.id.split("@")[0]}: "Main busy tha/thi!"\n@${sender.split("@")[0]}: "Par tum online the/thi!"\n@${target.id.split("@")[0]}: "Main... um..."\n\n*GROUP: "Sach bol do dono!"* 😂\n\n*Aur is tarah shuru hoti hai ek filmi kahani!* 🎬❤️`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 44. PERFECT MATCH COMMAND
// ============================================
cmd({
  pattern: "perfectmatch",
  alias: ["idealmatch", "jodijori"],
  desc: "Perfect match reveal karo scientifically",
  react: "💑",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein perfect match hote hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const match = participants[Math.floor(Math.random() * participants.length)];
  
  await conn.sendMessage(mek.chat, {
    text: `💑 *PERFECT MATCH REVEAL!* 💑\n\n*AI + Stars + Algorithm + Dil =*\n\n@${sender.split("@")[0]} ka Perfect Match:\n\n🥁 *...drum roll...*\n\n💘 *@${match.id.split("@")[0]}!* 💘\n\n*Kyu Perfect Match hain?*\n✅ Dono thode pagal hain\n✅ Dono group mein active hain\n✅ Dono ke nakhre compliment hain\n✅ Dono ek doosre ko handle kar sakte hain\n\n*Allah ek kare!* 🤲💕`,
    mentions: [sender, match.id]
  }, { quoted: mek });
});

// ============================================
// 45. RAAZ KHOLA COMMAND
// ============================================
cmd({
  pattern: "raazkhola",
  alias: ["secretreveal", "raazkholdo"],
  desc: "Kisi ka group mein chhupaaya raaz kholo",
  react: "🔓",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Raaz group mein khulte hain!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId);
  const person = participants[Math.floor(Math.random() * participants.length)];
  
  const secrets = [
    `🔓 *RAAZ KHOLA!* 🔓\n\n*@${person.id.split("@")[0]} ka Chhupaaya Hua Raaz:*\n\nYeh shaks group mein kisi ko secretly like karta/karti hai!\n\nEvidence:\n👀 Unke messages carefully padhta/padhti hai\n😊 Unke jokes pe zyada hasta/hasti hai\n📱 Unka online dekh ke active ho jaata/jaati hai\n\n*Naam nahi btaiye, woh khud samjhe!* 😂💕`,
    `🔓 *SECRET EXPOSE!* 🔓\n\n@${person.id.split("@")[0]} ka woh raaz jo sab jaante hain\nlekin koi bolta nahi:\n\n*"Yeh group admin se zyada group ko sambhalte/sambhalti hain!\nHar member ki parwah karte/karti hain!\nAur chaahte/chaahti hain ke sab khush rahein!"*\n\n💖 *Yeh toh sabse pyaara raaz nikla!* 😭❤️`
  ];
  await conn.sendMessage(mek.chat, { text: secrets[Math.floor(Math.random() * secrets.length)], mentions: [person.id] }, { quoted: mek });
});

// ============================================
// 46. MOHABBAT KA DARJAA COMMAND
// ============================================
cmd({
  pattern: "mohabbatdarjaa",
  alias: ["lovelevel", "pyaarlevel"],
  desc: "Do logon ke darmiyan pyaar ka darjaa batao",
  react: "📊",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group command!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  
  const level = Math.floor(Math.random() * 10) + 1;
  const labels = ["💔 Zero", "😐 Dost Jaisa", "🙂 Thoda Pyaar", "😊 Kaafi Pyaar", "😍 Deep Pyaar", "🥰 Bohot Gehra", "💖 Dil Mein Ghar", "❤️ Sachcha Pyaar", "💘 Pagal Deewana", "💯 ISHQ MEIN DOOBA!"];
  
  await conn.sendMessage(mek.chat, {
    text: `📊 *MOHABBAT KA DARJAA* 📊\n\n@${sender.split("@")[0]} aur @${target.id.split("@")[0]}\nke darmiyan pyaar ka level:\n\n*${level}/10 - ${labels[level - 1]}*\n\n${"🔴".repeat(level)}${"⚪".repeat(10 - level)}\n\n${level >= 8 ? "😂 *Bhai/behan yeh toh seedha heart attack!*\nDoctor ko dikhao pehle! 💀" : level >= 5 ? "💕 *Kaafi accha connection hai!*\nThoda aur kaam karo! 😊" : "😅 *Thodi friendship aur ki zaroorat hai!*\nKaam karo iss par! 💪"}`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 47. DUA COMMAND
// ============================================
cmd({
  pattern: "dua",
  alias: ["prayer", "aashirwaad"],
  desc: "Kisi ke liye dil se dua karo",
  react: "🤲",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group mein dua do!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const blessed = participants[Math.floor(Math.random() * participants.length)];
  
  const duas = [
    `🤲 *DIL SE DUA!* 🤲\n\n@${sender.split("@")[0]} ki taraf se @${blessed.id.split("@")[0]} ke liye:\n\n*"Allah tujhe khush rakhe hamesha!\nTere dil ki har khaahish poori kare!\nTere pyaron ko tere paas rakhe!\nAur teri zindagi mein sirf khushiyan aayein!"*\n\nAmeen! 🌸 Ya Rabb! 🤲\n\nSach mein pyaari dua! 💖`,
    `🤲 *KHAAS DUA!* 🤲\n\n@${sender.split("@")[0]} ne @${blessed.id.split("@")[0]} ke liye\nmaanga dua mein:\n\n*"Yaa Allah, is insaan ko woh sab de\nJo main in ke liye maangta/maangti hoon!\nInhein khushiyan do, sehat do, pyaar do!\nAur ek aisi zindagi do jo ise khawhish thi!"*\n\nAmeen Sum Ameen! 🌺🤲`
  ];
  await conn.sendMessage(mek.chat, { text: duas[Math.floor(Math.random() * duas.length)], mentions: [sender, blessed.id] }, { quoted: mek });
});

// ============================================
// 48. KHWAABON WALA COMMAND
// ============================================
cmd({
  pattern: "khwaabon",
  alias: ["dreams", "sapne"],
  desc: "Sapnon wali mohabbat ka izhar karo",
  react: "💭",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { sender, reply }) => {
  if (!mek.chat.endsWith('@g.us')) return reply("❌ Group wala sapna!");
  
  const groupMetadata = await conn.groupMetadata(mek.chat);
  const botId = getBotId(conn);
  const participants = groupMetadata.participants.filter(p => p.id !== botId && p.id !== sender);
  const dreamed = participants[Math.floor(Math.random() * participants.length)];
  
  const msgs = [
    `💭 *SAPNE WALA SCENE!* 💭\n\n*Kal Raat Ka Sapna Report:*\n\n@${sender.split("@")[0]} ke sapne mein\n@${dreamed.id.split("@")[0]} aaye/aayi! 😍\n\nSapne mein:\n🌸 Dono ek park mein the\n🌅 Sunset dekh rahe the saath\n💬 Ghanton baatein ki\n😊 Haste haste baatein\n\n*Subah aankhein khuli toh reality mein woh nahi the/thi!*\n*"Ek message toh karo yaar!"* 🥺😂`,
    `💭 *SAPNA REVEAL!* 💭\n\n@${dreamed.id.split("@")[0]} tum jaante/jaanti ho?\n\n@${sender.split("@")[0]} ke roz ke sapne mein\nTum hote/hoti ho! 😳\n\n*"Sapne mein tum much kuch bolte/bolti ho\nJo reality mein bolna chahte/chahti hoon!"* 🥺\n\nKoi jawab do bhai/behan! 😂💕`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, dreamed.id] }, { quoted: mek });
});
