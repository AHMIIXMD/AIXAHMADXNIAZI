import { cmd, commands } from '../command.js';
import { sleep } from '../lib/functions.js';
import config from '../config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

/////////////////////////////
// 🕌 ISLAMIC SYSTEM (ALL-IN-ONE EDITION)
/////////////////////////////

// 🤲 BASIC DUAS & ZIKR
cmd({
    pattern: "dua_forgiveness",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🤲 اللهم اغفر لي وارحمني");
});

cmd({
    pattern: "dua_rizq",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🤲 اللهم ارزقني رزقًا حلالًا طيبًا");
});

cmd({
    pattern: "dua_guidance",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🤲 اللهم اهدني ووفقني");
});

cmd({
    pattern: "dua_health",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🤲 اللهم عافني في بدني");
});

cmd({
    pattern: "zikr_astaghfirullah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕋 أستغفر الله العظيم");
});

cmd({
    pattern: "zikr_alhamdulillah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕋 الحمد لله رب العالمين");
});

cmd({
    pattern: "zikr_subhanallah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕋 سبحان الله");
});

cmd({
    pattern: "zikr_allahuakbar",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕋 الله أكبر");
});

cmd({
    pattern: "zikr_lailahaillallah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕋 لا إله إلا الله");
});

cmd({
    pattern: "zikr_lahawla",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕋 لاحول ولا قوة إلا بالله");
});

cmd({
    pattern: "hadith_good_morals",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("📖 بہترین انسان وہ ہے جس کے اخلاق اچھے ہوں");
});

cmd({
    pattern: "hadith_cleanliness",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("📖 صفائی ایمان کا حصہ ہے");
});

cmd({
    pattern: "hadith_truth",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("📖 سچائی نجات دیتی ہے");
});

cmd({
    pattern: "hadith_patience",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("📖 صبر جنت کی کنجی ہے");
});

cmd({
    pattern: "darood_sharif",
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🌙 اللهم صل وسلم على نبينا محمد");
});

cmd({
    pattern: "kalima_tayyiba",
    category: "islamic",
    react: "☪️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("☪️ لا إله إلا الله محمد رسول الله");
});

cmd({
    pattern: "islam_fact",
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🕌 صدقہ رزق میں برکت لاتا ہے اور گناہ مٹاتا ہے");
});

cmd({
    pattern: "quran_reminder",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("📖 قرآن مجید ہدایت اور رحمت ہے");
});

// 🌺 EXTENDED DAROOD SHARIF COLLECTION
cmd({
    pattern: "darood_ibrahimi",
    category: "islamic",
    react: "🌹",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🌹 *دَرُودِ إِبْرَاهِيمِي:* \n\nاللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ");
});

cmd({
    pattern: "darood_taj",
    category: "islamic",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("👑 *دَرُودِ تَاج:* \n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا وَمَوْلاَنَا مُحَمَّدٍ صَاحِبِ التَّاجِ وَالْمِعْرَاجِ وَالْبُرَاقِ وَالْعَلَمِ، دَافِعِ الْبَلاَءِ وَالْوَبَاءِ وَالْقَحْطِ وَالْمَرَضِ وَالأَلَمِ");
});

cmd({
    pattern: "darood_tanjina",
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("✨ *دَرُودِ تَنْجِينَا:* \n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلاَةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الأَهْوَالِ وَالأَفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ");
});

cmd({
    pattern: "darood_shifa",
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("💚 *دَرُودِ شِفَاء:* \n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ طِبِّ الْقُلُوبِ وَدَوَائِهَا، وَعَافِيَةِ الأَبْدَانِ وَشِفَائِهَا، وَنُورِ الأَبْصَارِ وَضِيَائِهَا، وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ");
});

// 📿 TASBIHAT & AZKAR COLLECTION
cmd({
    pattern: "tasbeeh_ya_hayyu",
    alias: ["yahayyu", "yaqayyum"],
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("✨ *تَسْبِیحِ يَا حَيُّ يَا قَيُّومُ:*\n\nيَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ");
});

cmd({
    pattern: "tasbeeh_fatima",
    category: "islamic",
    react: "📿",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply(`📿 *تَسْبِیحِ فَاطِمِی (رضی اللہ عنہا):*

1️⃣ *سُبْحَانَ اللَّهِ* (33 مرتبہ)
2️⃣ *الْحَمْدُ لِلَّهِ* (33 مرتبہ)
3️⃣ *اللَّهُ أَكْبَرُ* (34 مرتبہ)`);
});

// 📜 SHORT SURAHS COLLECTION
cmd({
    pattern: "surah_kausar",
    alias: ["alkausar"],
    category: "islamic",
    react: "🌊",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("🌊 *سُورَةُ الْكَوْثَرِ:*\n\nإِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۞ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۞ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ");
});

cmd({
    pattern: "surah_ikhlas",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    reply("📖 *سُورَةُ الإِخْلَاصِ:*\n\nقُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ");
});

// ✨ ANIMATION COMMANDS (99 Names)
cmd({
    pattern: "prophetnames",
    alias: ["asmaunnabi", "muhammadnames"],
    desc: "Displays 99 Names of Prophet Muhammad (PBUH) animation",
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const prophetNames = [
            "1. مُحَمَّدٌ", "2. أَحْمَدُ", "3. حَامِدٌ", "4. مَحْمُودٌ", "5. قَاسِمٌ",
            "6. عَاقِبٌ", "7. فَاتِحٌ", "8. خَاتَمٌ", "9. حَاشِرٌ", "10. مَاحِي",
            "11. دَاعٍ", "12. سِرَاجٌ", "13. مُنِيرٌ", "14. نَذِيرٌ", "15. بَشِيرٌ",
            "16. نَظِيرٌ", "17. هَادٍ", "18. مَهْدِيٌّ", "19. رَسُولٌ", "20. نَبِيٌّ",
            "21. أُمِّيٌّ", "22. كَرِيمٌ", "23. مَكِينٌ", "24. مُطَاعٌ", "25. أَمِينٌ",
            "26. رَؤُوفٌ", "27. رَحِيمٌ", "28. مُزَّمِّلٌ", "29. مُدَّثِّرٌ", "30. طٰهٰ",
            "31. يٰسٓ", "32. مُصْطَفٰى", "33. مُجْتَبٰى", "34. مُرْتَضٰى", "35. نَاصِرٌ",
            "36. مَنْصُورٌ", "37. وَلِيٌّ", "38. عَفُوٌّ", "39. شَافِعٌ", "40. مُشَفَّعٌ",
            "41. صَادِقٌ", "42. مُصَدَّقٌ", "43. خَلِيلٌ", "44. حَبِيبٌ", "45. صَفِيٌّ",
            "46. نَجِيٌّ", "47. شَهِيدٌ", "48. شَاهِدٌ", "49. مَشْهُودٌ", "50. عَالِمٌ",
            "51. حَاكِمٌ", "52. نُورٌ", "53. حُجَّةٌ", "54. بُرْهَانٌ", "55. مُطَهَّرٌ",
            "56. طَاهِرٌ", "57. طَيِّبٌ", "58. سَيِّدٌ", "59. إِمَامٌ", "60. خَطِيبٌ",
            "61. مُقْتَصِدٌ", "62. مُجَابٌ", "63. كَافٍ", "64. شَافٍ", "65. مُفَضَّلٌ",
            "66. مُقَدَّمٌ", "67. مُؤَخَّرٌ", "68. كَبِيرٌ", "69. صَاحِبٌ", "70. عَزِيزٌ",
            "71. فَصِيحٌ", "72. نَاصِحٌ", "73. مُنْجٍ", "74. مُؤْمِنٌ", "75. مُطِيعٌ",
            "76. زَكِيٌّ", "77. مُبَلِّغٌ", "78. شَكُورٌ", "79. قَرِيبٌ", "80. وَدُودٌ",
            "81. مُكَرَّمٌ", "82. عَظِيمٌ", "83. مُعَلِّمٌ", "84. بَارٌّ", "85. صَبُورٌ",
            "86. مَأْمُونٌ", "87. مُقِيلٌ", "88. صَاحِبُ اللِّوَاءِ", "89. صَاحِبُ الْمَقَامِ", "90. صَاحِبُ الْحَوْضِ",
            "91. صَاحِبُ الشَّفَاعَةِ", "92. رَحْمَةٌ لِلْعَالَمِينَ", "93. غَوْثٌ", "94. غَيْثٌ", "95. عِصْمَةٌ",
            "96. نِعْمَةٌ", "97. هِدَايَةٌ", "98. عُرْوَةٌ وُثْقٰى", "99. صِرَاطٌ مُسْتَقِيمٌ"
        ];

        let currentText = "💚 *Asma-un-Nabi ﷺ (Muhammad ﷺ Ke Mubarak Naam)* 💚";
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const name of prophetNames) {
            currentText = `💚 *${name}* 💚`;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});

cmd({
    pattern: "allahnames",
    alias: ["asmaulhusna", "99names"],
    desc: "Displays 99 Names of Allah animation",
    category: "islamic",
    react: "📿",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const allahNames = [
            "1. الرَّحْمٰنُ", "2. الرَّحِيمُ", "3. الْمَلِكُ", "4. الْقُدُّوسُ", "5. السَّلَامُ",
            "6. الْمُؤْمِنُ", "7. الْمُهَيْمِنُ", "8. الْعَزِيزُ", "9. الْجَبَّارُ", "10. الْمُتَكَبِّرُ",
            "11. الْخَالِقُ", "12. الْبَارِئُ", "13. الْمُصَوِّرُ", "14. الْغَفَّارُ", "15. الْقَهَّارُ",
            "16. الْوَهَّابُ", "17. الرَّزَّاقُ", "18. الْفَتَّاحُ", "19. الْعَلِيمُ", "20. الْقَابِضُ",
            "21. الْبَاسِطُ", "22. الْخَافِضُ", "23. الرَّافِعُ", "24. الْمُعِزُّ", "25. الْمُذِلُّ",
            "26. السَّمِيعُ", "27. الْبَصِيرُ", "28. الْحَكَمُ", "29. الْعَدْلُ", "30. اللَّطِيفُ",
            "31. الْخَبِيرُ", "32. الْحَلِيمُ", "33. الْعَظِيمُ", "34. الْغَفُورُ", "35. الشَّكُورُ",
            "36. الْعَلِيُّ", "37. الْكَبِيرُ", "38. الْحَفِيظُ", "39. الْمُقِيتُ", "40. الْحَسِيبُ",
            "41. الْجَلِيلُ", "42. الْكَرِيمُ", "43. الرَّقِيبُ", "44. الْمُجِيبُ", "45. الْوَاسِعُ",
            "46. الْحَكِيمُ", "47. الْوَدُودُ", "48. الْمَجِيدُ", "49. الْبَاعِثُ", "50. الشَّهِيدُ",
            "51. الْحَقُّ", "52. الْوَكِيلُ", "53. الْقَوِيُّ", "54. الْمَتِينُ", "55. الْوَلِيُّ",
            "56. الْحَمِيدُ", "57. الْمُحْصِي", "58. الْمُبْدِئُ", "59. الْمُعِيدُ", "60. الْمُحْيِي",
            "61. الْمُمِيتُ", "62. الْحَيُّ", "63. الْقَيُّومُ", "64. الْوَاجِدُ", "65. الْمَاجِدُ",
            "66. الْوَاحِدُ", "67. الْأَحَدُ", "68. الصَّمَدُ", "69. الْقَادِرُ", "70. الْمُقْتَدِرُ",
            "71. الْمُقَدِّمُ", "72. الْمُؤَخِّرُ", "73. الْأَوَّلُ", "74. الْآخِرُ", "75. الظَّاهِرُ",
            "76. الْبَاطِنُ", "77. الْوَالِي", "78. الْمُتَعَالِي", "79. الْبَرُّ", "80. التَّوَّابُ",
            "81. الْمُنْتَقِمُ", "82. الْعَفُوُّ", "83. الرَّؤُوفُ", "84. مَالِكُ الْمُلْكِ", "85. ذُو الْجَلَالِ وَالْإِكْرَامِ",
            "86. الْمُقْسِطُ", "87. الْجَامِعُ", "88. الْغَنِيُّ", "89. الْمُغْنِي", "90. الْمَانِعُ",
            "91. الضَّارُّ", "92. النَّافِعُ", "93. النُّورُ", "94. الْهَادِي", "95. الْبَدِيعُ",
            "96. الْبَاقِي", "97. الْوَارِثُ", "98. الرَّشِيدُ", "99. الصَّبُورُ"
        ];

        let currentText = "✨ *Asma-ul-Husna (Allah Ke Names)* ✨";
        const sentMessage = await conn.sendMessage(from, { text: currentText }, { quoted: mek });

        for (const name of allahNames) {
            currentText = `✨ *${name}* ✨`;
            await sleep(1000);
            const protocolMsg = {
                key: sentMessage.key,
                type: 0xe,
                editedMessage: { conversation: currentText }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }
    } catch (e) {
        reply(`❌ *Error!* ${e.message}`);
    }
});
