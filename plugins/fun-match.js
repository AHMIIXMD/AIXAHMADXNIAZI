import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Random Boy Selection Command
cmd({
  pattern: "bacha",
  alias: ["larka"],
  desc: "Randomly selects a boy from the group",
  react: "👦",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");
    if (!groupMetadata?.participants) return reply("⚠️ Couldn't fetch group members.");

    const botNumber = conn.user.id;
    const participants = groupMetadata.participants.filter(p => p.id !== botNumber);

    if (participants.length < 1) return reply("❌ No eligible participants found!");

    const randomUser = participants[Math.floor(Math.random() * participants.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: `👦 *Yeh lo tumhara Bacha!*\n\n@${randomUser.id.split('@')[0]} is your handsome boy! 😎`,
        mentions: [randomUser.id]
      },
      { quoted: mek }
    );
  } catch (error) {
    console.error("Error in .bacha command:", error);
    reply("❌ An error occurred while selecting a boy.");
  }
});

// Random Girl Selection Command
cmd({
  pattern: "bachi",
  alias: ["kuri", "larki"],
  desc: "Randomly selects a girl from the group",
  react: "👧",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");
    if (!groupMetadata?.participants) return reply("⚠️ Couldn't fetch group members.");

    const botNumber = conn.user.id;
    const participants = groupMetadata.participants.filter(p => p.id !== botNumber);

    if (participants.length < 1) return reply("❌ No eligible participants found!");

    const randomUser = participants[Math.floor(Math.random() * participants.length)];

    await conn.sendMessage(
      mek.chat,
      {
        text: `👧 *Yeh lo tumhari Bachi!*\n\n@${randomUser.id.split('@')[0]} is your beautiful girl! 💖`,
        mentions: [randomUser.id]
      },
      { quoted: mek }
    );
  } catch (error) {
    console.error("Error in .bachi command:", error);
    reply("❌ An error occurred while selecting a girl.");
  }
});
