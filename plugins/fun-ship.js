import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

cmd({
  pattern: "ship",
  alias: ["match"],
  desc: "Randomly pairs the command user with another group member.",
  react: "❤️",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Get group metadata to access participants
    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    
    // Filter out the sender to avoid self-pairing
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to make a pair.");
    }

    // Get random participant (excluding sender)
    const randomPair = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];

    const user1 = sender.split("@")[0];
    const user2 = randomPair.split("@")[0];
    
    const message = `💘 *Match Found!* 💘\n❤️ @${user1} + @${user2}\n💖 Congratulations! 🎉`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [sender, randomPair]
      }
    }, { quoted: m });

  } catch (error) {
    console.error("❌ Error in ship command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

cmd({
  pattern: "dad",
  alias: ["father", "papa", "baap"],
  desc: "Assigns a random dad from group members.",
  react: "👨",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a dad.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👨 *Dad Found!* 👨\n@${userName} is your dad!\n💖 Father figure alert!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in dad command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Mom command
cmd({
  pattern: "mom",
  alias: ["mother", "maa", "mummy"],
  desc: "Assigns a random mom from group members.",
  react: "👩",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a mom.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👩 *Mom Found!* 👩\n@${userName} is your mom!\n💖 Mother figure alert!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in mom command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Son command
cmd({
  pattern: "son",
  alias: ["beta"],
  desc: "Assigns a random son from group members.",
  react: "👦",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a son.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👦 *Son Found!* 👦\n@${userName} is your son!\n🧒 Take care of your child!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in son command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Daughter command
cmd({
  pattern: "daughter",
  alias: ["beti"],
  desc: "Assigns a random daughter from group members.",
  react: "👧",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a daughter.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👧 *Daughter Found!* 👧\n@${userName} is your daughter!\n👧 Love your little girl!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in daughter command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Boyfriend command
cmd({
  pattern: "boyfriend",
  alias: ["bfriend", "boyfrnd"],
  desc: "Assigns a random boyfriend from group members.",
  react: "👨‍❤️‍👨",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a boyfriend.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👨‍❤️‍👨 *Boyfriend Found!* 👨‍❤️‍👨\n@${userName} is your boyfriend!\n💑 Go on a date!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in boyfriend command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Girlfriend command
cmd({
  pattern: "girlfriend",
  alias: ["gfriend", "girlfrnd"],
  desc: "Assigns a random girlfriend from group members.",
  react: "👩‍❤️‍👩",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a girlfriend.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👩‍❤️‍👩 *Girlfriend Found!* 👩‍❤️‍👩\n@${userName} is your girlfriend!\n💑 Go on a date!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in girlfriend command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Twin command
cmd({
  pattern: "twin",
  alias: ["jodua"],
  desc: "Assigns a random twin from group members.",
  react: "👯",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a twin.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👯 *Twin Found!* 👯\n@${userName} is your twin!\n🎭 You look exactly alike!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in twin command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Partner command
cmd({
  pattern: "partner",
  alias: ["jodi"],
  desc: "Assigns a random partner from group members.",
  react: "🤝",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a partner.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🤝 *Partner Found!* 🤝\n@${userName} is your partner!\n🤝 Work together!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in partner command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Bodyguard command
cmd({
  pattern: "bodyguard",
  alias: ["rakshak", "guard"],
  desc: "Assigns a random bodyguard from group members.",
  react: "💂",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a bodyguard.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `💂 *Bodyguard Found!* 💂\n@${userName} is your bodyguard!\n🛡️ They will protect you!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in bodyguard command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Boss command
cmd({
  pattern: "boss",
  alias: ["maalik", "owner"],
  desc: "Assigns a random boss from group members.",
  react: "👔",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a boss.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👔 *Boss Found!* 👔\n@${userName} is your boss!\n💼 Listen to them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in boss command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Employee command
cmd({
  pattern: "employee",
  alias: ["naukar", "worker"],
  desc: "Assigns a random employee from group members.",
  react: "👷",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find an employee.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👷 *Employee Found!* 👷\n@${userName} is your employee!\n💼 Give them work!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in employee command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Pet command
cmd({
  pattern: "pet",
  alias: ["janwar", "animal"],
  desc: "Assigns a random pet from group members.",
  react: "🐶",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a pet.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🐶 *Pet Found!* 🐶\n@${userName} is your pet!\n🐕 Take good care of them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in pet command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Servant command
cmd({
  pattern: "servant",
  alias: ["naukar", "chhakar"],
  desc: "Assigns a random servant from group members.",
  react: "🧹",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a servant.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🧹 *Servant Found!* 🧹\n@${userName} is your servant!\n🧽 Make them work!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in servant command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Idol command
cmd({
  pattern: "idol",
  alias: ["hero", "star"],
  desc: "Assigns a random idol from group members.",
  react: "🌟",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find an idol.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🌟 *Idol Found!* 🌟\n@${userName} is your idol!\n⭐ Worship them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in idol command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Fan command
cmd({
  pattern: "fan",
  alias: ["deewana"],
  desc: "Assigns a random fan from group members.",
  react: "🤩",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a fan.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🤩 *Fan Found!* 🤩\n@${userName} is your fan!\n🙏 They admire you!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in fan command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Ghost command
cmd({
  pattern: "ghost",
  alias: ["bhoot", "pret"],
  desc: "Assigns a random ghost from group members.",
  react: "👻",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a ghost.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👻 *Ghost Found!* 👻\n@${userName} is a ghost!\n👀 Watch out for them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in ghost command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Angel command
cmd({
  pattern: "angel",
  desc: "Assigns a random angel from group members.",
  react: "😇",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find an angel.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `😇 *Angel Found!* 😇\n@${userName} is an angel!\n✨ They watch over you!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in angel command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Devil command
cmd({
  pattern: "devil",
  alias: ["shaitan", "rakshas"],
  desc: "Assigns a random devil from group members.",
  react: "😈",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a devil.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `😈 *Devil Found!* 😈\n@${userName} is a devil!\n🔥 Stay away from them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in devil command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// King command
cmd({
  pattern: "king",
  alias: ["raja", "badshah"],
  desc: "Assigns a random king from group members.",
  react: "👑",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a king.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👑 *King Found!* 👑\n@${userName} is the king!\n🏰 Bow before them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in king command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Queen command
cmd({
  pattern: "queen",
  alias: ["rani", "malika"],
  desc: "Assigns a random queen from group members.",
  react: "👸",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a queen.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👸 *Queen Found!* 👸\n@${userName} is the queen!\n🏰 Bow before her!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in queen command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Slave command
cmd({
  pattern: "slave",
  alias: ["gulam", "banda"],
  desc: "Assigns a random slave from group members.",
  react: "⛓️",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a slave.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `⛓️ *Slave Found!* ⛓️\n@${userName} is your slave!\n🔗 Make them obey!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in slave command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Master command
cmd({
  pattern: "master",
  alias: ["maalik", "swami"],
  desc: "Assigns a random master from group members.",
  react: "🎩",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a master.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🎩 *Master Found!* 🎩\n@${userName} is your master!\n🎭 Obey them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in master command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Genius command
cmd({
  pattern: "genius",
  alias: ["budhimaan", "smart"],
  desc: "Assigns a random genius from group members.",
  react: "🧠",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a genius.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🧠 *Genius Found!* 🧠\n@${userName} is a genius!\n💡 Learn from them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in genius command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Fool command
cmd({
  pattern: "fool",
  alias: ["bewakoof", "stupid"],
  desc: "Assigns a random fool from group members.",
  react: "🤡",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a fool.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🤡 *Fool Found!* 🤡\n@${userName} is a fool!\n🎭 Don't listen to them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in fool command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Rich command
cmd({
  pattern: "rich",
  alias: ["amir", "crorepati"],
  desc: "Assigns a random rich person from group members.",
  react: "💰",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a rich person.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `💰 *Rich Person Found!* 💰\n@${userName} is rich!\n💵 Ask for money!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in rich command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Poor command
cmd({
  pattern: "poor",
  alias: ["garib", "bechara"],
  desc: "Assigns a random poor person from group members.",
  react: "🪙",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a poor person.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🪙 *Poor Person Found!* 🪙\n@${userName} is poor!\n🙏 Help them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in poor command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

cmd({
  pattern: "bhai",
  alias: ["brother"],
  desc: "Assigns a random brother from group members.",
  react: "👨‍🦰",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a brother.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👬 *Brother Found!* 👬\n@${userName} is your brother!\n💪 Take care of each other!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in bhai command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Sister command
cmd({
  pattern: "bahan",
  alias: ["sister", "behen"],
  desc: "Assigns a random sister from group members.",
  react: "👩",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a sister.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👭 *Sister Found!* 👭\n@${userName} is your sister!\n💖 Love and protect each other!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in bahan command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Wife command
cmd({
  pattern: "wife",
  alias: ["biwi"],
  desc: "Assigns a random wife from group members.",
  react: "👰",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a wife.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `💍 *Wife Found!* 💍\n@${userName} is your wife!\n💕 Treat her with love and respect!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in wife command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Husband command
cmd({
  pattern: "husband",
  alias: ["shohar"],
  desc: "Assigns a random husband from group members.",
  react: "🤵",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a husband.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `💍 *Husband Found!* 💍\n@${userName} is your husband!\n💕 Take care of him!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in husband command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Chacha (Paternal Uncle) command
cmd({
  pattern: "chacha",
  desc: "Assigns a random paternal uncle from group members.",
  react: "👨‍🦳",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a chacha.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🧓 *Chacha Found!* 🧓\n@${userName} is your chacha (paternal uncle)!\n👴 Respect your elders!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in chacha command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Chachi (Paternal Aunt) command
cmd({
  pattern: "chachi",
  desc: "Assigns a random paternal aunt from group members.",
  react: "👵",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a chachi.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🧓 *Chachi Found!* 🧓\n@${userName} is your chachi (paternal aunt)!\n👵 Respect your elders!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in chachi command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Nana (Maternal Grandfather) command
cmd({
  pattern: "nana",
  desc: "Assigns a random maternal grandfather from group members.",
  react: "👴",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a nana.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👴 *Nana Found!* 👴\n@${userName} is your nana (maternal grandfather)!\n🌳 Your family tree grows!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in nana command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Nani (Maternal Grandmother) command
cmd({
  pattern: "nani",
  desc: "Assigns a random maternal grandmother from group members.",
  react: "👵",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a nani.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👵 *Nani Found!* 👵\n@${userName} is your nani (maternal grandmother)!\n🌳 Your family tree grows!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in nani command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Mama (Maternal Uncle) command
cmd({
  pattern: "mama",
  desc: "Assigns a random maternal uncle from group members.",
  react: "🧔",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a mama.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🧔 *Mama Found!* 🧔\n@${userName} is your mama (maternal uncle)!\n👨‍👦 Treat him with respect!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in mama command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Mami (Maternal Aunt) command
cmd({
  pattern: "mami",
  desc: "Assigns a random maternal aunt from group members.",
  react: "👩‍🦰",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a mami.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👩‍🦰 *Mami Found!* 👩‍🦰\n@${userName} is your mami (maternal aunt)!\n👩‍👧 Treat her with respect!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in mami command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Best Friend command
cmd({
  pattern: "bestfriend",
  alias: ["bf", "bestie"],
  desc: "Assigns a random best friend from group members.",
  react: "🤝",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a best friend.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🤝 *Best Friend Found!* 🤝\n@${userName} is your best friend!\n👫 Friends forever!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in bestfriend command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Enemy command
cmd({
  pattern: "enemy",
  alias: ["dushman"],
  desc: "Assigns a random enemy from group members.",
  react: "😠",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find an enemy.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `😠 *Enemy Found!* 😠\n@${userName} is your enemy!\n⚔️ Watch your back!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in enemy command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Crush command
cmd({
  pattern: "crush",
  alias: ["pyaar"],
  desc: "Assigns a random crush from group members.",
  react: "😍",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a crush.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `😍 *Crush Found!* 😍\n@${userName} is your crush!\n💘 You have feelings for them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in crush command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Teacher command
cmd({
  pattern: "teacher",
  alias: ["sir", "guru"],
  desc: "Assigns a random teacher from group members.",
  react: "👨‍🏫",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a teacher.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `👨‍🏫 *Teacher Found!* 👨‍🏫\n@${userName} is your teacher!\n📚 Learn from them!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in teacher command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Student command
cmd({
  pattern: "student",
  alias: ["chela"],
  desc: "Assigns a random student from group members.",
  react: "🧑‍🎓",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a student.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `🧑‍🎓 *Student Found!* 🧑‍🎓\n@${userName} is your student!\n📖 Teach them well!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in student command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Rival command
cmd({
  pattern: "rival",
  alias: ["competitor"],
  desc: "Assigns a random rival from group members.",
  react: "⚔️",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to find a rival.");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const userName = randomPerson.split("@")[0];
    
    const message = `⚔️ *Rival Found!* ⚔️\n@${userName} is your rival!\n🏆 Compete fairly!`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [randomPerson]
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in rival command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});
