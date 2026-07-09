import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// ============================================
// 1. AKELA COMMAND - Who's forever alone
// ============================================
cmd({
  pattern: "akela",
  alias: ["alone", "single4ever"],
  desc: "Group ka sabse akela insaan reveal karo",
  react: "🙃",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const lonely = participants[Math.floor(Math.random() * participants.length)];
  const msgs = [
    `🙃 AKELA AWARD 2025! 🙃\n\nIs saal ka "Officially Single" Award:\n\n🥁 @${lonely.id.split("@")[0]} 🥁\n\nDaily Routine:\n📱 Subah uthke memes dekho\n☕ Akele chai piyo\n💬 Group mein bakwaas karo\n🌙 Raat ko akele so jao\n\n"Koi baat nahi yaar, ek din zaroor milega/milegi tujhe!"\n\nAbhi ke liye: PIZZA IS LOVE! 🍕😂`,
    `🙃 SINGLE HALL OF FAME! 🙃\n\n@${lonely.id.split("@")[0]} ne is saal ka\nAKELA CHAMPION title jeeta!\n\n"Na koi propose kiya, na koi mila,\nBas group mein online raha/rahi,\nAur khud se hi hassta/hassti raha/rahi!"\n\n💪 Self love is the best love! 😂❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [lonely.id] }, { quoted: mek });
});

// ============================================
// 2. BEWAFA COMMAND - Betray dramatically
// ============================================
cmd({
  pattern: "bewafa",
  alias: ["betrayal", "dhoka"],
  desc: "Dramatic betrayal scene group mein",
  react: "🗡️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const traitor = participants[Math.floor(Math.random() * participants.length)];
  const msgs = [
    `🗡️ BEWAFA ALERT! 🗡️\n\n@${sender.split("@")[0]} ne @${traitor.id.split("@")[0]} ke baare mein bataya:\n\n"Maine sab kuch kiya unke liye!\nOnline raha, message kiya, react kiya!\nAur inhone kya kiya?\n\nDOOSRE GROUP MEIN CHALE GAYE! 😭\n\nYeh BEWAFAI hai ya nahi?!" 😤💔\n\nGroup ki support chahiye! 😂`,
    `🗡️ DHOKA TIME! 🗡️\n\n@${traitor.id.split("@")[0]} ne @${sender.split("@")[0]} ko\nDHOKA diya!\n\nKaise?\n"Unhone mera meme dekha,\nLekin react nahi kiya!\nYeh chota dhoka nahi,\nYEH BETRAYAL HAI!" 😭😂\n\nSabse chota lekin sabse dard wala dhoka! 💀❤️`
  ];
  await conn.sendMessage(mek.chat, { text: msgs[Math.floor(Math.random() * msgs.length)], mentions: [sender, traitor.id] }, { quoted: mek });
});

// ============================================
// 3. CHAKKAR COMMAND - Dizzy in love
// ============================================
cmd({
  pattern: "chakkar",
  alias: ["dizzy", "confused2"],
  desc: "Mohabbat mein chakkar aana",
  react: "😵",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const cause = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `😵 CHAKKAR AA GAYA! 😵\n\n@${sender.split("@")[0]} ko @${cause.id.split("@")[0]} ki wajah se\nchakkar aa gaya!\n\nDoctors ne bataya reason:\n\n🩺 Diagnosis: Mohabbat ka Virus\n\nSymptoms:\n🔄 Inka naam aaye - chakkar\n📱 Inka message aaye - chakkar\n👁️ Inhe dekho - zyada chakkar\n💬 Inse baat karo - hospital!\n\nKoi dawai nahi is bimari ki!\nBas woh hi theek kar sakte/sakti hain! 😂💘`,
    mentions: [sender, cause.id]
  }, { quoted: mek });
});

// ============================================
// 4. ULLU BANANA COMMAND - Prank someone
// ============================================
cmd({
  pattern: "ullubana",
  alias: ["prank", "fooling"],
  desc: "Kisi ko ullu banao group mein",
  react: "🦉",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const fool = participants[Math.floor(Math.random() * participants.length)];
  const pranks = [
    `🦉 ULLU BANANA SHURU! 🦉\n\n@${fool.id.split("@")[0]} bhai/behan!\n\nKHAAS KHABAR: Tumhare baare mein ek bahut important announcement ane wali hai group mein!\n\n...\n\n...\n\n...\n\nWOH YEH HAI KE TUM DUNYA KE SABSE BADE ULLU HO! 😂🦉\n\n@${sender.split("@")[0]} ne bana diya! April Fool! 😂💕`,
    `🦉 PRANK SUCCESSFUL! 🦉\n\n@${sender.split("@")[0]} ne @${fool.id.split("@")[0]} ko\nbana diya aaj ka ULLU! 🦉\n\n@${fool.id.split("@")[0]}: "Kya hua? Kya hua?"\n\nGroup: "HAHAHAHA!" 😂\n\nYeh pyaar bhari chherhna hai! ❤️😂`
  ];
  await conn.sendMessage(mek.chat, { text: pranks[Math.floor(Math.random() * pranks.length)], mentions: [sender, fool.id] }, { quoted: mek });
});

// ============================================
// 5. TAALI BAJAO COMMAND - Appreciation clap
// ============================================
cmd({
  pattern: "taalibajao",
  alias: ["clap", "shukriya"],
  desc: "Kisi ke liye group mein taali bajao",
  react: "👏",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const star = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `👏 TAALI BAJAO SABB! 👏\n\n@${sender.split("@")[0]} ne @${star.id.split("@")[0]} ke liye\nStanding Ovation diya!\n\nKyun?\n\n✅ Is insaan ne group ko zinda rakha\n✅ Sab se milke baat ki\n✅ Kabhi kisi ko ignore nahi kiya\n✅ Group ka asli hero/heroine hai yeh!\n\n👏👏👏👏👏👏👏👏👏👏\n\nSab milke taali bajao! 🎊`,
    mentions: [sender, star.id]
  }, { quoted: mek });
});

// ============================================
// 6. NEEND URAI COMMAND - Sleep stealer
// ============================================
cmd({
  pattern: "neendurai",
  alias: ["sleepstealer", "insomnia"],
  desc: "Kisi ne tumhari neend urai hai reveal karo",
  react: "😴",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const sleepthief = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `😴 NEEND URAI REPORT! 😴\n\n@${sender.split("@")[0]} ki neend ka thief:\n\n@${sleepthief.id.split("@")[0]} 🦹\n\nKaise:\n🌙 Raat 12 baje: Unka khayal\n🌙 Raat 1 baje: Unki purani chats\n🌙 Raat 2 baje: Unka status recheck\n🌙 Raat 3 baje: "Kya woh mujhe pasand karte/karti hain?!"\n🌙 Subah 6 baje: Nind nahi ayi\n\nYeh neend ka thief nahi,\nDil ka thief hai! 😭😂💕`,
    mentions: [sender, sleepthief.id]
  }, { quoted: mek });
});

// ============================================
// 7. CHATPATA COMMAND - Spicy personality
// ============================================
cmd({
  pattern: "chatpata",
  alias: ["spicy", "teekha"],
  desc: "Group ka sabse chatpata personality",
  react: "🌶️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const spicy = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🌶️ CHATPATA AWARD! 🌶️\n\nGroup ka Sabse Chatpata Insaan:\n\n@${spicy.id.split("@")[0]} 🏆\n\nPersonality Report:\n🌶️ Baatein - Chatpati\n🔥 Jawab - Teekha\n😏 Andaaz - Masaledar\n💯 Humor - Extra chatpata\n\n"Yeh insaan bland nahi!\nHar baat mein flavor hai!"\n\nAise log group ki jaan hote hain! ❤️🌶️`,
    mentions: [spicy.id]
  }, { quoted: mek });
});

// ============================================
// 8. WAITING ROOM COMMAND - Who's waiting for reply
// ============================================
cmd({
  pattern: "waitingroom",
  alias: ["waitkaro", "doubletch"],
  desc: "Kiska reply ka intezaar ho raha hai",
  react: "⏳",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const waitfor = participants[Math.floor(Math.random() * participants.length)];
  const mins = Math.floor(Math.random() * 300) + 10;
  await conn.sendMessage(mek.chat, {
    text: `⏳ WAITING ROOM REPORT ⏳\n\n@${sender.split("@")[0]} pichle ${mins} minutes se\n@${waitfor.id.split("@")[0]} ka reply wait kar raha/rahi hai!\n\nDouble tick status: ✅✅ (SEEN!)\n\nPhir bhi reply nahi aaya!\n\nStatus check kiya: 5 baar ✅\nProfile click kiya: 3 baar ✅\nMessage resend ka socha: ✅\nBlock hone ka check kiya: ✅\n\n@${waitfor.id.split("@")[0]} reply karo bhai/behan!\nKoi zinda hai wahaan?! 😭😂`,
    mentions: [sender, waitfor.id]
  }, { quoted: mek });
});

// ============================================
// 9. KING/QUEEN COMMAND - Crown someone
// ============================================
cmd({
  pattern: "taj",
  alias: ["crown", "king", "queen"],
  desc: "Kisi ko group ka king/queen banao",
  react: "👑",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const royal = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `👑 TAJ CEREMONY! 👑\n\nAaj ka KING/QUEEN OF THE GROUP:\n\n✨ @${royal.id.split("@")[0]} ✨\n\nRoyal Qualities:\n👑 Baatein - Khaandaani\n🌟 Presence - Shahi\n💫 Style - Alag hi level\n❤️ Dil - Sona\n\n"Poori group unki praja hai!\nHum sab bow down karte hain!" 😂👑\n\nLong live the King/Queen! 🎊`,
    mentions: [royal.id]
  }, { quoted: mek });
});

// ============================================
// 10. LAFANGAA COMMAND - Naughty one
// ============================================
cmd({
  pattern: "lafangaa",
  alias: ["naughty", "shararat"],
  desc: "Group ka sabse lafangaa reveal karo",
  react: "😈",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const naughty = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `😈 LAFANGAA AWARD! 😈\n\nGroup ka Official LAFANGAA title:\n\n@${naughty.id.split("@")[0]} ko! 🏆\n\nInn ki sharaatein:\n😈 Seedha jawab kabhi nahi dete/deti\n😂 Baatein ghumaate/ghumaati hain\n🤣 Har cheez mein fun dhundh lete/leti hain\n😏 Serious scene mein bhi haste/hasti hain\n\nPar yahi lafangapan toh group ki jaan hai!\n\nKeep being you! 😂❤️`,
    mentions: [naughty.id]
  }, { quoted: mek });
});

// ============================================
// 11. CHOCOLATE WALA COMMAND - Sweet personality
// ============================================
cmd({
  pattern: "chocolatewala",
  alias: ["meetha", "sweet"],
  desc: "Sabse meetha insaan group mein reveal",
  react: "🍫",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const sweet = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🍫 CHOCOLATE WALA INSAAN! 🍫\n\nGroup ka Sabse Meetha Insaan:\n\n@${sweet.id.split("@")[0]} 🍬\n\nKyu?\n\n🍫 Unki baatein - chocolate si meethi\n🍬 Unka behavior - candy sa pyaara\n🧁 Unka dil - cake sa naram\n🍰 Unki muskaan - dessert sa lajawab\n\n"Is insaan ke saath time spend karna\nDil ko khush kar jaata hai!"\n\nMashaAllah! ✨❤️`,
    mentions: [sweet.id]
  }, { quoted: mek });
});

// ============================================
// 12. BAAT KAATNA COMMAND - Interrupter
// ============================================
cmd({
  pattern: "baatkaatna",
  alias: ["interrupt", "beechmein"],
  desc: "Group ka sabse baat kaatne wala",
  react: "✂️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const interrupter = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `✂️ BAAT KAATNE KA AWARD! ✂️\n\nGroup ka Sabse Baat Kaatne Wala/Wali:\n\n@${interrupter.id.split("@")[0]} 🏆\n\nScenario:\n\nKoi: "Yaar main batana chahta/chahti tha/thi ke aaj..."\n@${interrupter.id.split("@")[0]}: "ARE BHAI/BEHAN MERI SUNO!" 😂\n\nKoi: "Haan toh main keh raha/rahi tha/thi..."\n@${interrupter.id.split("@")[0]}: "WAISE MUJHE BHI EK BAAT YAAD AAYI!"\n\nBaat koi puri karta hi nahi in ke saath! 😂❤️`,
    mentions: [interrupter.id]
  }, { quoted: mek });
});

// ============================================
// 13. PALAT COMMAND - Will they turn around
// ============================================
cmd({
  pattern: "palat",
  alias: ["turnback", "wapasaa"],
  desc: "Kya woh palat ke aayega Bollywood style",
  react: "🔄",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  const palats = ["PALAT!", "PALAT!", "PALAT!", "Nahi palte/palti 💔"];
  const result = palats[Math.floor(Math.random() * palats.length)];
  await conn.sendMessage(mek.chat, {
    text: `🔄 PALAT TEST! 🔄\n\n@${sender.split("@")[0]} ja raha/rahi hai...\n\n@${target.id.split("@")[0]} kya palte/palti hain?\n\n🥁 ....\n🥁 ......\n🥁 ........\n\nResult: ${result} ${result.includes("Nahi") ? "\n\n😭 Pyaar tha teri yaad mein!\nBollywood se zyada dukh hua! 💔😂" : "\n\n😍 YESSS! Isliye kehte hain - sachchi mohabbat palti hai!\n\nDDLJ moment! 🎬❤️"}`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 14. GAANA SUNAO COMMAND - Dedicate a song
// ============================================
cmd({
  pattern: "gaanasunao",
  alias: ["dedicate", "song4u"],
  desc: "Kisi ko randomly gaana dedicate karo",
  react: "🎵",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const listener = participants[Math.floor(Math.random() * participants.length)];
  const songs = [
    `🎵 DEDICATED SONG! 🎵\n\n@${sender.split("@")[0]} ne @${listener.id.split("@")[0]} ko\nKhaas Taur Pe yeh gaana dedicate kiya:\n\n🎶 "Tujh Mein Rab Dikhta Hai"\n\n"Jab bhi group mein aate/aati ho,\nDil khush ho jaata hai!\nAllah ki khoobsoorat creation ho tum!" 🥺\n\nDil se! ❤️🎵`,
    `🎵 SONG DEDICATION! 🎵\n\n@${sender.split("@")[0]} ki taraf se @${listener.id.split("@")[0]} ke liye:\n\n🎶 "Pehla Nasha" 🎶\n\n"Pehla Nasha, Pehla Khumar,\nNaya Pyaar Hai, Naya Intezaar!"\n\nYeh gaana sirf tumhare liye! 🌹😂`,
    `🎵 SPECIAL DEDICATION! 🎵\n\n@${listener.id.split("@")[0]} ke liye @${sender.split("@")[0]} ne bheja:\n\n🎶 "Teri Meri Prem Kahani" 🎶\n\nSunna? Dil se sunna! 💕\nBaaki group ko bhi wait hai tumhara reaction dekhne ka! 😂`
  ];
  await conn.sendMessage(mek.chat, { text: songs[Math.floor(Math.random() * songs.length)], mentions: [sender, listener.id] }, { quoted: mek });
});

// ============================================
// 15. HAATH THAMNA COMMAND - Hold my hand
// ============================================
cmd({
  pattern: "haaththamna",
  alias: ["handhold", "saathchalo"],
  desc: "Virtual haath thamna romantic scene",
  react: "🤝",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const partner = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🤝 HAATH THAMNA SCENE! 🤝\n\n[Dramatic Bollywood scene begins]\n\n@${sender.split("@")[0]} ne @${partner.id.split("@")[0]} ki taraf haath badhaya aur kaha:\n\n"Yeh raaste tanha mushkil hain,\nLekin tumhara haath ho toh\nKoi raah mushkil nahi!\nSaath chaloge/chalogi?" 🥺\n\n[Violin music intensifies] 🎻\n\nBackground mein baarish shuru! 🌧️\n\n@${partner.id.split("@")[0]} kya jawab doge/dogi?! 😂❤️`,
    mentions: [sender, partner.id]
  }, { quoted: mek });
});

// ============================================
// 16. CHUP RAHNA COMMAND - Silent treatment
// ============================================
cmd({
  pattern: "chuprahna",
  alias: ["silence", "khaamoshi"],
  desc: "Silent treatment drama group mein",
  react: "🤐",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🤐 SILENT TREATMENT ALERT! 🤐\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ko\nSILENT TREATMENT de raha/rahi hai!\n\nReason: \n"Unhone mera message 4 ghante baad dekha!\nAur SIRF 1 word reply kiya!\n\n'Ok'\n\nOK?! OK?! BAS OK?! 😤\n\nAb @${sender.split("@")[0]} chup rahega/rahegi...\n\n...for 5 minutes...\n\n...phir khud hi baat karega/karegi! 😂💀`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 17. PHOOLON KA HAAR COMMAND - Garland of love
// ============================================
cmd({
  pattern: "phoolonkahaar",
  alias: ["garland", "mala"],
  desc: "Kisi ko phoolon ka haar pehnaao",
  react: "🌺",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const honored = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🌺 PHOOLON KA HAAR! 🌺\n\n🌸🌹🌺🌻🌼🌷🌸\n\n@${sender.split("@")[0]} ne @${honored.id.split("@")[0]} ko\nPHOOLON KA HAAR pehnaaya!\n\n🌸🌹🌺🌻🌼🌷🌸\n\nSath mein kaha:\n"Yeh haar nahi, meri dua hai!\nHar phool ki tarah khilte raho!\nHar khushbu ki tarah bikharte raho!\nZindagi mein hamesha bahar rahe!"\n\n🌺 Mubarak Ho! 🌺\n\nInshAllah! 🤲💫`,
    mentions: [sender, honored.id]
  }, { quoted: mek });
});

// ============================================
// 18. GHOOR KE DEKHNA COMMAND - Stare battle
// ============================================
cmd({
  pattern: "ghoordekhna",
  alias: ["stare", "nigahein"],
  desc: "Staring contest wala romantic scene",
  react: "👁️‍🗨️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const stared = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `👁️‍🗨️ GHOOR KE DEKHNA! 👁️‍🗨️\n\n@${sender.split("@")[0]} aur @${stared.id.split("@")[0]}\nki group mein aankh mili!\n\nTik tik tik...\n\n@${sender.split("@")[0]}: 👀\n@${stared.id.split("@")[0]}: 👀\n@${sender.split("@")[0]}: 👁️\n@${stared.id.split("@")[0]}: 👁️\n\n10 second baad...\n\nDono ne ek waqt mein neeche dekha! 😳\n\nGroup: "OHHHH!" 😂🔥\n\nYeh toh filmi scene tha! ❤️`,
    mentions: [sender, stared.id]
  }, { quoted: mek });
});

// ============================================
// 19. BAHAANA COMMAND - Excuse maker
// ============================================
cmd({
  pattern: "bahaana",
  alias: ["excuse", "bakwaasreason"],
  desc: "Group ka sabse zyada bahaane wala",
  react: "🙄",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const excuser = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🙄 BAHAANA KING/QUEEN! 🙄\n\nGroup ka Sabse Zyada Bahaane Wala/Wali:\n\n@${excuser.id.split("@")[0]} 🏆\n\nInke Top Bahane:\n\n🙄 Reply late: "Net nahi tha!"\n🙄 Online nahi: "Phone charge nahi tha!"\n🙄 Nahi aaye: "Light chali gayi thi!"\n🙄 Message nahi padha: "Notification nahi aayi!"\n\nBhai/behan sach to yeh hai ke bus mood nahi tha! 😂💀\n\nHum sab jaante hain! ❤️`,
    mentions: [excuser.id]
  }, { quoted: mek });
});

// ============================================
// 20. TARKEEB COMMAND - Clever plan
// ============================================
cmd({
  pattern: "tarkeeb",
  alias: ["plan", "jugaad"],
  desc: "Pyaar pane ki tarkeeb batao",
  react: "🧩",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  const plans = [
    `🧩 TARKEEB REVEALED! 🧩\n\n@${sender.split("@")[0]} ka @${target.id.split("@")[0]} ke\ndil mein jagah banane ka SECRET PLAN:\n\nStep 1: Group mein funny message bhejo 😂\nStep 2: Unka react aane par smile karo 😊\nStep 3: DM mein casual baat shuru karo 💬\nStep 4: "Sirf dost hain" kaho 🙄\nStep 5: 3 baje tak baatein karo ✅\nStep 6: Dono ko pata chal jaaye! 💘\n\nYeh plan already chal raha hai! 😂👀`,
    `🧩 JUGAAD PLAN! 🧩\n\n@${sender.split("@")[0]} ka super secret plan\n@${target.id.split("@")[0]} ke liye:\n\nPhase 1: Unka status like karo - DONE ✅\nPhase 2: Unka meme share karo - DONE ✅\nPhase 3: "Haha" se reply shuru karo - DONE ✅\nPhase 4: Abhi tak ka progress: Pending ⏳\n\nBhai/behan seedha bol do yaar! 😂💕`
  ];
  await conn.sendMessage(mek.chat, { text: plans[Math.floor(Math.random() * plans.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 21. HASSI CHHUPA COMMAND - Hidden smile
// ============================================
cmd({
  pattern: "hassichhupa",
  alias: ["hidingsmile", "musakura"],
  desc: "Jo chhupake muskura raha hai uska khulasa",
  react: "🫣",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const hider = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🫣 CHHUPII HASSI PAKDI! 🫣\n\n@${hider.id.split("@")[0]} jab bhi kisi khaas ka\nnaam group mein aata hai:\n\nScreen pe: "😐" (Normal face)\nAndar se: "😍😂🥰😭🤭"\n\nAur jab woh message karte/karti hain:\n\nHaath kaanpne lagte hain 😅\nHassi chhupani padti hai 🫣\nBaaad mein screen shot 📸\n\nYeh wala pyaar sabse sundar hai!\nJo chhupaate hain, woh gehra hota hai! 😂💖`,
    mentions: [hider.id]
  }, { quoted: mek });
});

// ============================================
// 22. MOBILE BAND KARO COMMAND - Put phone down
// ============================================
cmd({
  pattern: "mobileband",
  alias: ["putdown", "offkaro"],
  desc: "Kisi ko mobile band karne ka hukum",
  react: "📵",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const addict = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `📵 MOBILE BAND KARO! 📵\n\n@${addict.id.split("@")[0]} bhai/behan!\n\nMedical Report:\nTumhara mobile addiction level: CRITICAL 🚨\n\nProof:\n📱 Subah uthke pehla kaam: Mobile check\n🚿 Bathroom mein bhi: Mobile\n🍽️ Khaana khate: Mobile\n🛏️ Sone se pehle: Mobile\n💤 Neend mein bhi: Sapne mein mobile\n\nDOCTOR KA NUSKHA:\nMobile rakho 5 minute ke liye!\nAasman dekhlo! ☁️\n\nKyun? Wahan bhi clouds hain, Instagram nahi! 😂`,
    mentions: [addict.id]
  }, { quoted: mek });
});

// ============================================
// 23. PAGALPAN KA CERTIFICATE COMMAND
// ============================================
cmd({
  pattern: "pagalpancert",
  alias: ["crazycert", "diwanapan"],
  desc: "Pagalpan ka official certificate do",
  react: "🎓",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const crazy = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🎓 OFFICIAL CERTIFICATE 🎓\n\n╔══════════════════╗\n║  PAGALPAN AWARD  ║\n╚══════════════════╝\n\nYeh certificate diya jaata hai:\n\n@${crazy.id.split("@")[0]} ko\n\nIs baat ki gawahi mein ke:\n\n✅ Yeh insaan group ka sabse zyada\nsochne wala/wali hai\n✅ Har cheez mein romance dhundhta/dhundhti hai\n✅ Dil hamesha dil ki sunta/sunti hai\n\nSeal: 💘 GROUP OF LOVE 💘\n\nTaareekh: Aaj 😂❤️`,
    mentions: [crazy.id]
  }, { quoted: mek });
});

// ============================================
// 24. MOBILE WALLPAPER COMMAND
// ============================================
cmd({
  pattern: "wallpaper",
  alias: ["lockscreen", "screensaver"],
  desc: "Kiska photo tumhare mobile ki wallpaper hai",
  react: "📲",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const wallpaper = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `📲 WALLPAPER REVEAL! 📲\n\nScientific Bluetooth Scan ne bataya:\n\n@${sender.split("@")[0]} ke mobile ki\nSECRET WALLPAPER mein hai:\n\n👉 @${wallpaper.id.split("@")[0]} 👈\n\nProof:\n🔓 Lockscreen: Unki DP 😳\n🏠 Homescreen: Unhi ki tasweer\n⌚ Watch wallpaper: Bhi unhi ka 😂\n\nSach hai ya nahi?!\n@${sender.split("@")[0]} batao! 👀\n\nPoora group jaanna chahta/chahti hai! 😂💖`,
    mentions: [sender, wallpaper.id]
  }, { quoted: mek });
});

// ============================================
// 25. DONO BAAT KARO COMMAND - Talk to each other
// ============================================
cmd({
  pattern: "donobaat",
  alias: ["talkboth", "batcheet"],
  desc: "Force two people to talk in group",
  react: "💬",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const shuffled = participants.sort(() => 0.5 - Math.random());
  const p1 = shuffled[0];
  const p2 = shuffled[1];
  await conn.sendMessage(mek.chat, {
    text: `💬 GROUP MATCHMAKER PRESENTS! 💬\n\nAaj yeh dono group mein baat karenge:\n\n@${p1.id.split("@")[0]} 🤝 @${p2.id.split("@")[0]}\n\nRules:\n✅ Ek dusre ko introduce karo\n✅ Ek joke sunao\n✅ Ek compliment do\n\nShuru karo!\n\nGroup wait kar raha hai! 😂👀\n\nAgar nahi kiya toh group tumhara number publish karega! 😂 (JK!)`,
    mentions: [p1.id, p2.id]
  }, { quoted: mek });
});

// ============================================
// 26. KAAN PAKADNA COMMAND - Sorry gesture
// ============================================
cmd({
  pattern: "kaanpakadna",
  alias: ["sorry2", "maafi"],
  desc: "Dramatic maafi maango kisi se",
  react: "🙏",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const forgive = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🙏 KAAN PAKAD KE MAAFI! 🙏\n\n@${sender.split("@")[0]} ne @${forgive.id.split("@")[0]} ke saamne\nkaan pakad liye! 👂\n\n"Yaar sach mein sorry!\nMain galat tha/thi!\nTumne jo kaha woh sahi tha!\nTumhari baat sunni chahiye thi!\nAb maaf kar do please!"\n\n🥺🥺🥺🥺🥺\n\n@${forgive.id.split("@")[0]} ab maafi do!\nBechaara/beechari kaan pakde khada/khadi hai! 😂❤️\n\nMaafi hi pyaar hai! 💕`,
    mentions: [sender, forgive.id]
  }, { quoted: mek });
});

// ============================================
// 27. TAQDIR COMMAND - Fate revealer
// ============================================
cmd({
  pattern: "taqdir",
  alias: ["fate", "muqaddar"],
  desc: "Taqdir ne kya likha hai batao",
  react: "🔮",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const destined = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🔮 TAQDIR KA INKISHAAF! 🔮\n\nStars, Moon, aur Algorithm sab ne\nmilke @${sender.split("@")[0]} ki TAQDIR batai:\n\n📜 "Is insaan ki zindagi mein @${destined.id.split("@")[0]} ek ahem kirdar ada karega/karegi!"\n\nKaise:\n✨ Khushiyon mein saath\n🌧️ Mushkilon mein saath\n😂 Hassi mein saath\n🥺 Aansoon mein saath\n\n"Taqdir ne mila diya,\nAb nibhaana tumhara kaam!"\n\nAllah ki marzi mein hi bhalaai hai! 🤲💫`,
    mentions: [sender, destined.id]
  }, { quoted: mek });
});

// ============================================
// 28. KAPKAPI COMMAND - Nervous around crush
// ============================================
cmd({
  pattern: "kapkapi",
  alias: ["nervous", "darana"],
  desc: "Kisi ke saamne kapkapi wala feeling",
  react: "😬",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const scarer = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `😬 KAPKAPI REPORT! 😬\n\n@${sender.split("@")[0]} jab @${scarer.id.split("@")[0]} se\nbaat karta/karti hai toh:\n\n🫀 Dil: Tez tez dhadakne lagta hai\n🤲 Haath: Kaanpne lagte hain\n🗣️ Awaaz: Thodi thartharaati hai\n😳 Chehra: Zyada cheeks red hote hain\n🧠 Dimag: Hang ho jaata hai\n\nDoctor ne diagnosis diya:\n\n"SEVERE CASE OF PYAAR!" 💘\n\nKoi ilaj nahi, bas ik hi raasta:\nSeedha bol do! 😂❤️`,
    mentions: [sender, scarer.id]
  }, { quoted: mek });
});

// ============================================
// 29. TAARIF MEIN COMMIT COMMAND
// ============================================
cmd({
  pattern: "taarifcommit",
  alias: ["compliment2", "sachsach"],
  desc: "Sachchi dil se taarif karo kisi ki",
  react: "🌟",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const praised = participants[Math.floor(Math.random() * participants.length)];
  const praises = [
    `🌟 DIL SE TAARIF! 🌟\n\n@${sender.split("@")[0]} ne @${praised.id.split("@")[0]} ke baare mein\nGROUP KE SAAMNE kaha:\n\n"Sachchi baat yeh hai ke yeh insaan\nbahut acha/achi hai!\nKabhi kisi ko hurt nahi kiya,\nHamesha kisi ki madad ki,\nAur group ko hamesha khush rakha!\n\nAise log rare hain!\nKeep being amazing!" 🌟\n\nSab agree karo! 👇`,
    `🌟 HONEST REVIEW! 🌟\n\n@${praised.id.split("@")[0]} ke baare mein\n@${sender.split("@")[0]} ka review:\n\n⭐⭐⭐⭐⭐ 5/5 Stars\n\n"Baatein karo toh din ban jaata hai,\nIgore karo toh din kharab!\nYeh insaan ka jaadu hai!\nMashaAllah!" 🥺✨`
  ];
  await conn.sendMessage(mek.chat, { text: praises[Math.floor(Math.random() * praises.length)], mentions: [sender, praised.id] }, { quoted: mek });
});

// ============================================
// 30. CAPTION CONTEST COMMAND
// ============================================
cmd({
  pattern: "captioncontest",
  alias: ["caption", "caption4u"],
  desc: "Kisi ki DP ke liye funny caption do",
  react: "📸",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const model = participants[Math.floor(Math.random() * participants.length)];
  const captions = [
    `📸 CAPTION CONTEST! 📸\n\n@${model.id.split("@")[0]} ki DP ke liye\naaj ka best caption:\n\n"Allah ki art gallery ka\nSabse khoobsoorat painting!" 🎨\n\nHas lo, sachchi baat hai! 😂❤️`,
    `📸 DP CAPTION! 📸\n\n@${model.id.split("@")[0]} ki profile picture ke liye:\n\n"Yeh insaan camera ke saamne nahi,\nCamera is ke saamne pose karta hai!"\n\n📸 MashaAllah! 🌟`,
    `📸 PROFILE CAPTION! 📸\n\n@${model.id.split("@")[0]} ke liye best caption:\n\n"Warning: Itna sundar/sundar mat bano,\nLog apni aankhein kharaab kar lete hain!" 😂✨\n\nSach baat! 💖`
  ];
  await conn.sendMessage(mek.chat, { text: captions[Math.floor(Math.random() * captions.length)], mentions: [model.id] }, { quoted: mek });
});

// ============================================
// 31. ZYADA SOCHA COMMAND - Overthinking
// ============================================
cmd({
  pattern: "zyadasocha",
  alias: ["overthink", "dimaaglaga"],
  desc: "Zyada sochne wale insaan ka khulasa",
  react: "🤯",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const thinker = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🤯 OVERTHINKING AWARD! 🤯\n\nGroup ka Sabse Zyada Sochne Wala/Wali:\n\n@${thinker.id.split("@")[0]} 🧠💥\n\nInka Thought Process:\n\nKisi ne: "Ok" likha\n@${thinker.id.split("@")[0]}: "Ok matlab kya? Happy ok? Angry ok? Bored ok? Ignore kar raha/rahi hai ok? Mujhse naraaz hai ok? Doctor ko dikhaana chahiye ok? Ya sach mein ok?!"\n\nYahi sochne mein 3 ghante gaye! 😂💀\n\nBhai/behan - "Ok" bas OK hai! 😂❤️`,
    mentions: [thinker.id]
  }, { quoted: mek });
});

// ============================================
// 32. GHAZAB COMMAND - Amazingly weird
// ============================================
cmd({
  pattern: "ghazab",
  alias: ["amazing2", "kamaal"],
  desc: "Kisi ke ghazab andaaz ka khulasa",
  react: "🤩",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const amazing = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🤩 GHAZAB INSAAN! 🤩\n\nIs group mein ek GHAZAB insaan hai:\n\n@${amazing.id.split("@")[0]} 🌟\n\nKyun ghazab hain yeh?\n\n🤩 Kabhi kabhi itna funny\nke stomach hurt ho jaata hai\n🥺 Kabhi kabhi itna caring\nke dil bhar aata hai\n😤 Kabhi kabhi itna pagal\nke samajh nahi aata\n💖 Lekin hamesha itna pyaara/pyaari\nke group khaali lagta hai inke bina!\n\nGhazab ho tum! 🌟`,
    mentions: [amazing.id]
  }, { quoted: mek });
});

// ============================================
// 33. ONLINE DEKHNA COMMAND - Stalking check
// ============================================
cmd({
  pattern: "onlinedekhna",
  alias: ["onlinecheck", "stalk"],
  desc: "Kiska online check karte rehte ho",
  react: "🟢",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const watched = participants[Math.floor(Math.random() * participants.length)];
  const times = Math.floor(Math.random() * 20) + 5;
  await conn.sendMessage(mek.chat, {
    text: `🟢 ONLINE CHECK REPORT! 🟢\n\nScientific Analysis ne bataya:\n\n@${sender.split("@")[0]} ne aaj\n@${watched.id.split("@")[0]} ka\n\nOnline status check kiya: ${times} baar! 😂\n\nTimeline:\n🕐 Subah 8: Check ✅\n🕑 Dopahar 1: Check ✅\n🕓 Shaam 4: Check ✅\n🕗 Raat 7: Check ✅\n🕙 Raat 10: Check ✅\n...\n\nBhai yeh mobile addiction nahi,\nYEH PYAAR HAI! 😭😂💕`,
    mentions: [sender, watched.id]
  }, { quoted: mek });
});

// ============================================
// 34. DUSHMAN KA DUSHMAN COMMAND
// ============================================
cmd({
  pattern: "dushmankadushman",
  alias: ["enemyenemy", "hamdard"],
  desc: "Jo tumhara dushman hai uska dushman banao",
  react: "⚔️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const ally = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `⚔️ ALLIANCE DECLARE! ⚔️\n\n@${sender.split("@")[0]} ne @${ally.id.split("@")[0]} ko\nHAMDARD choose kiya!\n\n"Tum mere dushman ke dushman ho!\nIsliye tum mere dost ho!\nGroup mein tumhara saath chahiye!"\n\n🤝 @${ally.id.split("@")[0]} ab @${sender.split("@")[0]} ka\nOfficial Yaar hai!\n\nSaath mein:\n✅ Roast karenge\n✅ Defend karenge\n✅ Chai peeyenge\n✅ Drama karenge! 😂❤️`,
    mentions: [sender, ally.id]
  }, { quoted: mek });
});

// ============================================
// 35. BURA NA MANO COMMAND - No offense
// ============================================
cmd({
  pattern: "buraanamano",
  alias: ["nooffense", "mazaakmein"],
  desc: "Bura na mano style mein sach bol do",
  react: "😅",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  const truths = [
    `😅 BURA NA MANO PAR... 😅\n\n@${target.id.split("@")[0]} bhai/behan:\n\n"Bura na mano par...\nTumhare replies aate hain\njab main apna phone rakh deta/deti hoon!\n\nBura na mano par...\nTumhara 'abhi aata/aati hoon'\nmein 45 minute lagte hain!\n\nBura na mano par...\nTum group ke sabse zyada nakhre waale ho!\n\nPar sach yeh hai ke...\nTUMHARE BINA GROUP SOONA HAI!" ❤️😂`,
    `😅 HONEST BAAT! 😅\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ko kaha:\n\n"Bura na mano par sach yeh hai ke:\nTum pagal ho!\nPar tumhara pagalpan bhi cute hai!\nTumse ladna bhi achha lagta hai!\nAur tumhara saath bhi chahiye hamesha!"\n\nYeh toh love-hate relationship hai! 😂💕`
  ];
  await conn.sendMessage(mek.chat, { text: truths[Math.floor(Math.random() * truths.length)], mentions: [sender, target.id] }, { quoted: mek });
});

// ============================================
// 36. MIRROR MIRROR COMMAND - Confidence boost
// ============================================
cmd({
  pattern: "mirrormirror",
  alias: ["selfconfidence", "aainaa"],
  desc: "Kisi ko mirror mein khud dekhne ka game",
  react: "🪞",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const beautiful = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🪞 MIRROR MIRROR ON THE WALL! 🪞\n\nMagic Mirror se pucha gaya:\n\n"Mirror mirror on the wall,\nIs group mein sabse beautiful kaun?"\n\n🪞 Mirror ne jawab diya:\n\n"${beautiful.id.split("@")[0]} of course!" 👑\n\n"Allah ne khoob banaya hai inhe!\nAndar se bhi, bahar se bhi!\nAur yeh khud nahi maante - tab bhi!"\n\nMashaAllah! 🌟 Believe in yourself! 💪`,
    mentions: [beautiful.id]
  }, { quoted: mek });
});

// ============================================
// 37. MERA HERO COMMAND - Group hero
// ============================================
cmd({
  pattern: "merahero",
  alias: ["hero", "savior"],
  desc: "Aaj ka group hero kaun hai",
  react: "🦸",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const hero = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🦸 AAJ KA GROUP HERO! 🦸\n\nSuperhero Music Plays 🎵\n\nAaj ka OFFICIAL GROUP HERO/HEROINE:\n\n⚡ @${hero.id.split("@")[0]} ⚡\n\nSuperpowers:\n💬 Boring conversations ko fun banana\n😂 Sad mood ko khush karna\n🎯 Sahi waqt pe sahi baat kehna\n❤️ Group ko pyaar se bharpur rakhna\n\nThank you for being our hero!\n\nCape pehno! 🦸🎊`,
    mentions: [hero.id]
  }, { quoted: mek });
});

// ============================================
// 38. NATKHAT COMMAND - Mischievous one
// ============================================
cmd({
  pattern: "natkhat",
  alias: ["mischief", "shararat2"],
  desc: "Group ka sabse natkhat insaan",
  react: "😜",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const natkhat = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `😜 NATKHAT AWARD! 😜\n\nGroup ka sabse Natkhat:\n\n@${natkhat.id.split("@")[0]} 🏆\n\nInka crime record:\n😜 Log serious baar pe funny baat - Guilty ✅\n😂 Kisi ki taarif ke beech mein mazaak - Guilty ✅\n🙃 Serious mood kharaab karna - Guilty ✅\n😅 Khud toh hans le, doosron ko confuse kare - Guilty ✅\n\nSentence:\nGroup ko aur zyada hasaate raho! 😂❤️\n\nTumhare bina group phika hai! 🌶️`,
    mentions: [natkhat.id]
  }, { quoted: mek });
});

// ============================================
// 39. PARESHAAN COMMAND - Worry wart
// ============================================
cmd({
  pattern: "pareshan",
  alias: ["worried", "tension"],
  desc: "Group ka sabse pareshan rehne wala",
  react: "😰",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const worrier = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `😰 PARESHAAN AWARD! 😰\n\nGroup ka Sabse PARESHAAN REHNE WALA/WALI:\n\n@${worrier.id.split("@")[0]} 🏆\n\nInka daily pareshani schedule:\n\n😰 Subah: "Aaj kya hoga?"\n😟 Dopahar: "Kya woh mujhse naraaz hain?"\n😱 Shaam: "Maine kuch galat toh nahi kaha?"\n😭 Raat: "Sab theek hai na?"\n\nPar yeh jo care karte/karti hain,\nyahi inhe special banata hai!\n\nSab theek hai! Allah pe bharosa rakho! 🤲💖`,
    mentions: [worrier.id]
  }, { quoted: mek });
});

// ============================================
// 40. INTERVIEW COMMAND - Job interview style
// ============================================
cmd({
  pattern: "interview",
  alias: ["hireornot", "qanda"],
  desc: "Kisi ka love interest ke liye interview",
  react: "📋",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const candidate = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `📋 LOVE INTERVIEW! 📋\n\nInterviewer: @${sender.split("@")[0]}\nCandidate: @${candidate.id.split("@")[0]}\n\nQuestions:\n\nQ1: "Apne aap ke baare mein batao?"\nQ2: "Raat ko 2 baje call karoon toh kya karo ge/gi?"\nQ3: "Kisi ko ignore karte/karti ho kya?"\nQ4: "Pyaar mein loyalty ka kya matlab hai?"\nQ5: "5 saal baad khud ko kahan dekhte/dekhti ho?"\n\nPanel ka verdict: ✅ HIRED FOR DOST LEVEL!\nNext promotion: Khaas Dost 😂💕\n\nInhei dil se liya gaya interview mein! 😂❤️`,
    mentions: [sender, candidate.id]
  }, { quoted: mek });
});

// ============================================
// 41. KHEL TAMAM COMMAND - Game over drama
// ============================================
cmd({
  pattern: "kheltamam",
  alias: ["gameover", "tamam"],
  desc: "Kisi ne game over kar diya pyaar mein",
  react: "💔",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const gameender = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `💔 KHEL TAMAM! 💔\n\n@${gameender.id.split("@")[0]} ne aaj\n@${sender.split("@")[0]} ka KHEL TAMAM kar diya!\n\nKaise?\n\nScenario:\n@${sender.split("@")[0]}: "Good Morning!"\n@${gameender.id.split("@")[0]}: "Hm."\n\n😭 Ek ghante ki mehnat,\n1 word mein khatam!\n\n"Hm" - yeh do haroof se dil toot gaya! 💔\n\n@${gameender.id.split("@")[0]} thoda aur type karo yaar! 😂❤️`,
    mentions: [sender, gameender.id]
  }, { quoted: mek });
});

// ============================================
// 42. RISHTA PAKKA COMMAND - Engagement drama
// ============================================
cmd({
  pattern: "rishtapakka",
  alias: ["engaged", "mangni"],
  desc: "Rishta pakka karo group mein",
  react: "💍",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const shuffled = participants.sort(() => 0.5 - Math.random());
  const rishta1 = shuffled[0];
  const rishta2 = shuffled[1];
  await conn.sendMessage(mek.chat, {
    text: `💍 RISHTA PAKKA COMMITTEE! 💍\n\nIs group ne milke faislah kiya:\n\n@${rishta1.id.split("@")[0]} + @${rishta2.id.split("@")[0]}\n\n= RISHTA PAKKA! 🎊\n\nCommittee ka analysis:\n✅ Dono group mein active hain\n✅ Dono ki personality match karti hai\n✅ Dono ek doosre ke jokes pe haste hain\n✅ Dono perfect nakhrebaaz hain\n\nSagai ki meethai dono taraf se chahiye! 🍬😂\n\nMubarak ho dono ko! 💕`,
    mentions: [rishta1.id, rishta2.id]
  }, { quoted: mek });
});

// ============================================
// 43. PYAAR KI DUKAAN COMMAND - Love shop
// ============================================
cmd({
  pattern: "pyaardukaan",
  alias: ["loveshop", "dildukaan"],
  desc: "Pyaar ki dukaan se kuch khareedo",
  react: "🏪",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  const items = [
    { item: "1 kg Wafa", price: "Ek sachchi muskaan" },
    { item: "500g Mohabbat", price: "Ek honest reply" },
    { item: "1 bottle Sabr", price: "2 ghante wait karna" },
    { item: "Sachcha Rishta Pack", price: "Apna ego chhod do" },
    { item: "Pyaar ka Combo", price: "Sirf teri ek haan" },
  ];
  const chosen = items[Math.floor(Math.random() * items.length)];
  await conn.sendMessage(mek.chat, {
    text: `🏪 PYAAR KI DUKAAN! 🏪\n\n@${sender.split("@")[0]} ne aaj order kiya:\n\n🛍️ Item: ${chosen.item}\n💰 Price: ${chosen.price}\n\nOrder Status: PROCESSING... ⏳\n\nDelivery time: Jab dono tayaar hon!\n\nNote: Yeh dukaan ek baar visit karo,\nZindagi bhar ke liye delivery hogi! 😂💕\n\nOrder accepted! 🎊`,
    mentions: [sender]
  }, { quoted: mek });
});

// ============================================
// 44. ZABAAN SAMBHALNA COMMAND - Watch your words
// ============================================
cmd({
  pattern: "zabaansambhlo",
  alias: ["watchwords", "muh"],
  desc: "Zabaan sambhalne ki warning do kisi ko",
  react: "👄",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const target = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `👄 ZABAAN SAMBHALNA YAAD DILAYA! 👄\n\n@${sender.split("@")[0]} ne @${target.id.split("@")[0]} ko\nnasehat di:\n\n"Yaar zabaan sambhala karo!\nJo bolte ho - yaad rehta hai!\nJo likhte ho - screenshot hota hai!\nJo commit karte ho - nibhaana padta hai!\n\nLekin kuch lafz aisa keh do ke,\nLog hamesha yaad rakhein,\nKhushiyon wale lafz!\n\nKyunke tum jo bhi bolte/bolti ho,\nDono per effect hota hai!"\n\n❤️ Pyaar se kaho, pyaar milega! 🌹`,
    mentions: [sender, target.id]
  }, { quoted: mek });
});

// ============================================
// 45. JHOOTHA WADA COMMAND - Broken promise
// ============================================
cmd({
  pattern: "jhootawada",
  alias: ["brokenpromise", "wada"],
  desc: "Jhootha wada karne wale ka khulasa",
  react: "🤥",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const promisebreaker = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🤥 JHOOTA WADA EXPOSED! 🤥\n\n@${promisebreaker.id.split("@")[0]} ke famous wade:\n\n❌ "Kal zaroor reply karunga/karungi" - 3 din gaye\n❌ "Main hamesha saath hoon" - aur fir ghaib!\n❌ "Tujhe kabhi chhodunga/chohdungi nahi" - classical 😂\n❌ "Seedha baat karunga/karungi" - kabhi nahi kiya\n\n@${sender.split("@")[0]} gawah hai! 😂\n\nPar sachchi baat yeh hai ke:\nKoi perfect nahi hota!\nMaafi maango aur naya wada karo! ❤️\n\nIs baar wada nibhaao! 💪`,
    mentions: [sender, promisebreaker.id]
  }, { quoted: mek });
});

// ============================================
// 46. SONA WALA COMMAND - Most precious
// ============================================
cmd({
  pattern: "sonawala",
  alias: ["precious", "heera"],
  desc: "Sabse qeemti insaan group mein",
  react: "💛",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const gold = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `💛 SONA INSAAN! 💛\n\nIs group ka SABSE SONA INSAAN:\n\n@${gold.id.split("@")[0]} ✨\n\nKyu sona hain yeh?\n\n💛 Kabhi kisi ko bura nahi bol sakte/sakti\n💛 Sab ki baat dhyan se sunte/sunti hain\n💛 Mushkil mein pehle dusron ke baare mein soochte/soochti hain\n💛 Group mein hamesha positivity laate/laati hain\n\nAisa insaan toh heera hai,\nQismat wale ko milta hai! 💎\n\nAllah tumhe salamat rakhe! 🤲`,
    mentions: [gold.id]
  }, { quoted: mek });
});

// ============================================
// 47. GOSSIP COMMAND - Group gossip time
// ============================================
cmd({
  pattern: "gossip",
  alias: ["charcha", "khabar"],
  desc: "Group ki latest gossip share karo",
  react: "🗣️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]));
  const gossipabout = participants[Math.floor(Math.random() * participants.length)];
  const gossips = [
    `🗣️ GROUP GOSSIP! 🗣️\n\nPsst... Suno suno!\n\nKisi reliable source se khabar aayi hai ke:\n\n@${gossipabout.id.split("@")[0]} actually group mein sabko like karte/karti hain!\nHaan bhai/behan,\nWoh jo "main kisi ki parwah nahi karta/karti" wala act hai,\nBILKUL JHOOT HAI! 😂\n\nYeh toh group ke sabse caring member hain!\n\nSource: 100% reliable! 😂💕`,
    `🗣️ BREAKING GOSSIP! 🗣️\n\nAaj ki sabse badi khabar:\n\n@${gossipabout.id.split("@")[0]} roz group check karte/karti hain!\nAur sab ke messages padhte/padhti hain!\nLekin reply sirf tab karte/karti hain jab mood ho!\n\nYeh khabar sachchi hai kyunke:\nHum bhi yahi karte hain! 😂💀\n\nKoi gossip nahi, sab ek jaise hain! ❤️`
  ];
  await conn.sendMessage(mek.chat, { text: gossips[Math.floor(Math.random() * gossips.length)], mentions: [gossipabout.id] }, { quoted: mek });
});

// ============================================
// 48. FUNNY RISHTEDAR COMMAND - Funny relative
// ============================================
cmd({
  pattern: "funnyrishtedar",
  alias: ["relative", "rishtedaar"],
  desc: "Kisi ko funny rishtedar banao",
  react: "👨‍👩‍👧‍👦",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const relative = participants[Math.floor(Math.random() * participants.length)];
  const relations = [
    { rel: "Pagal Chacha/Chachi", desc: "Har waqt advice dete hain jo kisi ne nahi maangi!" },
    { rel: "Dramatic Bhai/Behan", desc: "Choti si baat pe bhi movie scene ban jaata hai!" },
    { rel: "Cool Maamu/Maami", desc: "Sabse zyada samajhdar aur sabse zyada fun!" },
    { rel: "Nakhrebaaz Cousin", desc: "Har cheez mein nakhre, par dil ka sachcha!" }
  ];
  const chosen = relations[Math.floor(Math.random() * relations.length)];
  await conn.sendMessage(mek.chat, {
    text: `👨‍👩‍👧‍👦 FAMILY REVEAL! 👨‍👩‍👧‍👦\n\n@${sender.split("@")[0]} ka group family mein:\n\n@${relative.id.split("@")[0]} hai inke:\n\n${chosen.rel} 😂\n\nKyun? Kyunke:\n"${chosen.desc}"\n\nPar family family hoti hai!\nPyaar karo sabko! 😂❤️\n\nGroup = Hamari Family! 👨‍👩‍👧‍👦`,
    mentions: [sender, relative.id]
  }, { quoted: mek });
});

// ============================================
// 49. AANKHEIN BAND KAR COMMAND - Trust test
// ============================================
cmd({
  pattern: "aankheband",
  alias: ["trustfall", "blindtrust"],
  desc: "Trust test - aankhein band kar ke trust karo",
  react: "🙈",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const trusted = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `🙈 TRUST TEST! 🙈\n\nAaj ka Trust Game:\n\n@${sender.split("@")[0]} ne aankhein band ki\naur @${trusted.id.split("@")[0]} pe TRUST kiya!\n\nScenario:\n"Aankhein band hain,\nHaath age badhaya,\nAur keh diya:\n'Main tumpe trust karta/karti hoon!'"\n\n@${trusted.id.split("@")[0]} ka reaction:\n\nOption A: Haath thaam liya ❤️\nOption B: Bol diya "Oops wrong person!" 😂\n\nGroup ko batao @${trusted.id.split("@")[0]}!\nKya choose kiya? 👀😂`,
    mentions: [sender, trusted.id]
  }, { quoted: mek });
});

// ============================================
// 50. ALVIDA NAHI KEHNA COMMAND - No goodbyes
// ============================================
cmd({
  pattern: "alvidanahi",
  alias: ["nodisconnect", "hamesha"],
  desc: "Kisi ko alvida na kehne ka wada",
  react: "♾️",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  if (!isGroup) return reply("❌ This command only works in groups!");
  
  let metadata = groupMetadata;
  if (!metadata || !metadata.participants) {
    try {
      metadata = await conn.groupMetadata(mek.chat);
    } catch (e) {
      return reply("⚠️ Could not fetch group info. Please try again.");
    }
  }
  
  const participants = metadata.participants.filter(p => !p.id.includes(conn.user.id.split("@")[0]) && p.id !== sender);
  const forever = participants[Math.floor(Math.random() * participants.length)];
  await conn.sendMessage(mek.chat, {
    text: `♾️ ALVIDA NAHI KEHNA! ♾️\n\n@${sender.split("@")[0]} ne @${forever.id.split("@")[0]} se\npoori group ke saamne wada kiya:\n\n"Main tujhe ALVIDA nahi kahunga/kahungi!\n\nChahe koi baat ho jaaye,\nChahe beech mein khamoshi aaye,\nChahe raaste alag ho jaayein,\n\nMain group mein hamesha\ntumhara naam leke yaad karunga/karungi!\nKyunke kuch rishte alvida ke baad bhi\nNahi jaate!"\n\n😭 Poori group emotional ho gayi! 😭\n\nYahi sacchi dosti hai! ♾️❤️`,
    mentions: [sender, forever.id]
  }, { quoted: mek });
});
