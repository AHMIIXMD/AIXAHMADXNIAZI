import { cmd } from '../command.js';
import { sleep } from '../lib/functions.js';
import config from '../config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

/////////////////////////////
// 🕌 ISLAMIC SYSTEM & COMMANDS
/////////////////////////////

// 🕋 ADHAN & PRAYER TIMES
cmd({
    pattern: "adhan",
    alias: ["azan", "azanfajr"],
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 *أَذَان:*\n\nاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ\nاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ\nأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ\nأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ\nحَيَّ عَلَى الصَّلَاةِ\nحَيَّ عَلَى الصَّلَاةِ\nحَيَّ عَلَى الْفَلَاحِ\nحَيَّ عَلَى الْفَلَاحِ\nاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ\nلَا إِلَهَ إِلَّا اللَّهُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "namaz_times",
    alias: ["prayertimes", "salah"],
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕌 *نماز کے اوقات:*\n\n1️⃣ فجر (Fajr)\n2️⃣ ظہر (Zuhr)\n3️⃣ عصر (Asr)\n4️⃣ مغرب (Maghrib)\n5️⃣ عشاء (Isha)\n\n📿 *اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ*");
    } catch (e) { console.log(e); }
});

// 🤲 MORNING & EVENING DUAS
cmd({
    pattern: "dua_morning",
    alias: ["subahdua"],
    category: "islamic",
    react: "🌅",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌅 *صبح کی دعا:*\n\nاللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_evening",
    alias: ["shaamdua"],
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 *شام کی دعا:*\n\nاللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_sleep",
    alias: ["sonekidua"],
    category: "islamic",
    react: "😴",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("😴 *سونے کی دعا:*\n\nبِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_wakeup",
    alias: ["uthnekidua"],
    category: "islamic",
    react: "☀️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("☀️ *جاگنے کی دعا:*\n\nالْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_eating",
    alias: ["khanekidua"],
    category: "islamic",
    react: "🍽️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🍽️ *کھانے سے پہلے:*\n\nبِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ\n\n🍽️ *کھانے کے بعد:*\n\nالْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_travel",
    alias: ["safarkidua"],
    category: "islamic",
    react: "🚗",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🚗 *سفر کی دعا:*\n\nسُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_rain",
    alias: ["barishkidua"],
    category: "islamic",
    react: "🌧️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌧️ *بارش کی دعا:*\n\nاللَّهُمَّ صَيِّبًا نَافِعًا");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_anxiety",
    alias: ["pareshanidua", "dua_stress"],
    category: "islamic",
    react: "💙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💙 *پریشانی کی دعا:*\n\nلَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_distress",
    alias: ["mushkildua"],
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 *مشکل کی دعا:*\n\nحَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_hajat",
    alias: ["hajatkidua"],
    category: "islamic",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌟 *حاجت کی دعا:*\n\nاللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ، لَا إِلَهَ إِلَّا أَنْتَ، الْمَنَّانُ، بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_forgiveness",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 اللهم اغفر لي وارحمني");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_rizq",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 اللهم ارزقني رزقًا حلالًا طيبًا");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_guidance",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 اللهم اهدني ووفقني");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_health",
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 اللهم عافني في بدني");
    } catch (e) { console.log(e); }
});

// 📿 MORE ZIKR & TASBIH
cmd({
    pattern: "zikr_la_hawla",
    alias: ["lahawla"],
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 *لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ*\n\n📿 یہ جنت کے خزانوں میں سے ایک خزانہ ہے");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_subhanallahi_wabihamdihi",
    alias: ["subhanallahi_wabihamdihi"],
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("✨ *سُبْحَانَ اللَّهِ وَبِحَمْدِهِ*\n\n📿 جو شخص صبح و شام 100 مرتبہ پڑھے، اس کے گناہ معاف ہو جاتے ہیں");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_subhanallahil_azeem",
    alias: ["subhanallahilazeem"],
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💚 *سُبْحَانَ اللَّهِ الْعَظِيمِ*\n\n📿 یہ دو کلمے زبان پر ہلکے، میزان میں بھاری، رحمان کو پیارے ہیں");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_1000",
    alias: ["hazarkalima"],
    category: "islamic",
    react: "🔢",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🔢 *1000 مرتبہ پڑھنے والے اذکار:*\n\n1️⃣ سُبْحَانَ اللَّهِ (100)\n2️⃣ الْحَمْدُ لِلَّهِ (100)\n3️⃣ اللَّهُ أَكْبَرُ (100)\n4️⃣ لَا إِلَهَ إِلَّا اللَّهُ (100)\n5️⃣ أَسْتَغْفِرُ اللَّهَ (100)\n\n✨ *کل 500 - مکمل کریں 1000 تک*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_astaghfirullah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 أستغفر الله العظيم");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_alhamdulillah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 الحمد لله رب العالمين");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_subhanallah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 سبحان الله");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_allahuakbar",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 الله أكبر");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_lailahaillallah",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 لا إله إلا الله");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "zikr_lahawla",
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 لاحول ولا قوة إلا بالله");
    } catch (e) { console.log(e); }
});

// 📖 QURANIC SURAHS & VERSES
cmd({
    pattern: "surah_fatiha",
    alias: ["alfatiha"],
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 *سُورَةُ الْفَاتِحَةِ:*\n\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۞ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۞ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_falaq",
    alias: ["alfalaq"],
    category: "islamic",
    react: "🌅",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌅 *سُورَةُ الْفَلَقِ:*\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِن شَرِّ مَا خَلَقَ ۞ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۞ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_nas",
    alias: ["annas"],
    category: "islamic",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🛡️ *سُورَةُ النَّاسِ:*\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَٰهِ النَّاسِ ۞ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَالنَّاسِ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_kafirun",
    alias: ["alkafirun"],
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 *سُورَةُ الْكَافِرُونَ:*\n\nقُلْ يَا أَيُّهَا الْكَافِرُونَ ۞ لَا أَعْبُدُ مَا تَعْبُدُونَ ۞ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ۞ وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ۞ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ۞ لَكُمْ دِينُكُمْ وَلِيَ دِينِ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_asr",
    alias: ["alasr"],
    category: "islamic",
    react: "⏰",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("⏰ *سُورَةُ الْعَصْرِ:*\n\nوَالْعَصْرِ ۞ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۞ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_kauthar",
    alias: ["alkauthar"],
    category: "islamic",
    react: "🌊",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌊 *سُورَةُ الْكَوْثَرِ:*\n\nإِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۞ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۞ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "ayatul_kursi",
    alias: ["ayatakursi", "kursi"],
    category: "islamic",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("👑 *آيَةُ الْكُرْسِيِّ:*\n\nاللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_yaseen",
    alias: ["yaseen"],
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 *سُورَةُ يٰسٓ:*\n\nیٰسٓ ۞ وَالْقُرْآنِ الْحَكِيمِ ۞ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۞ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ\n\n📿 *یٰسٓ کو قرآن کا دل کہا جاتا ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_rahman",
    alias: ["arrahman"],
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💚 *سُورَةُ الرَّحْمَٰنِ:*\n\nالرَّحْمَٰنُ ۞ عَلَّمَ الْقُرْآنَ ۞ خَلَقَ الْإِنسَانَ ۞ عَلَّمَهُ الْبَيَانَ\n\n📿 *فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "surah_mulk",
    alias: ["almulk"],
    category: "islamic",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("👑 *سُورَةُ الْمُلْكِ:*\n\nتَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ\n\n📿 *جو رات کو پڑھے، اسے قبر کا عذاب نہ ہوگا*");
    } catch (e) { console.log(e); }
});

// 🕌 AHADITH & REMINDERS
cmd({
    pattern: "hadith_good_morals",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 بہترین انسان وہ ہے جس کے اخلاق اچھے ہوں");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "hadith_cleanliness",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 صفائی ایمان کا حصہ ہے");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "hadith_truth",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 سچائی نجات دیتی ہے");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "hadith_patience",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 صبر جنت کی کنجی ہے");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "darood_sharif",
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 اللهم صل وسلم على نبينا محمد");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "kalima_tayyiba",
    category: "islamic",
    react: "☪️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("☪️ لا إله إلا الله محمد رسول الله");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "islam_fact",
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕌 صدقہ رزق میں برکت لاتا ہے اور گناہ مٹاتا ہے");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "quran_reminder",
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 قرآن مجید ہدایت اور رحمت ہے");
    } catch (e) { console.log(e); }
});

// 🕌 ISLAMIC KNOWLEDGE & FACTS
cmd({
    pattern: "pillars_islam",
    alias: ["arkan"],
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕌 *اسلام کے 5 ارکان:*\n\n1️⃣ کلمہ شہادت\n2️⃣ نماز\n3️⃣ روزہ\n4️⃣ زکوٰۃ\n5️⃣ حج");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "pillars_iman",
    alias: ["arkan_iman"],
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("✨ *ایمان کے 6 ارکان:*\n\n1️⃣ اللہ پر ایمان\n2️⃣ فرشتوں پر ایمان\n3️⃣ کتابوں پر ایمان\n4️⃣ رسولوں پر ایمان\n5️⃣ آخرت پر ایمان\n6️⃣ تقدیر پر ایمان");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "islamic_months",
    alias: ["mahine"],
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 *اسلامی مہینے:*\n\n1️⃣ محرم\n2️⃣ صفر\n3️⃣ ربیع الاول\n4️⃣ ربیع الثانی\n5️⃣ جمادی الاول\n6️⃣ جمادی الثانی\n7️⃣ رجب\n8️⃣ شعبان\n9️⃣ رمضان\n🔟 شوال\n1️⃣1️⃣ ذی القعدہ\n1️⃣2️⃣ ذی الحجہ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "ramadan_info",
    alias: ["ramzan"],
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 *رمضان المبارک:*\n\n📿 روزے رکھنا\n📖 قرآن پڑھنا\n🤲 تراویح\n💝 صدقہ و خیرات\n🕌 اعتکاف\n\n✨ *رمضان میں ایک نیکی کا اجر 70 گنا بڑھ جاتا ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "hajj_info",
    alias: ["hajj"],
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 *حج کے ارکان:*\n\n1️⃣ احرام\n2️⃣ طواف\n3️⃣ سعی\n4️⃣ عرفہ\n5️⃣ مزدلفہ\n6️⃣ منیٰ\n7️⃣ رمیاں\n8️⃣ قربانی\n9️⃣ طواف زیارت\n\n📿 *حج مبرور کا بدلہ جنت ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "wudu_steps",
    alias: ["wuzu"],
    category: "islamic",
    react: "💧",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💧 *وضو کے فرائض:*\n\n1️⃣ چہرہ دھونا\n2️⃣ کہنیوں تک ہاتھ دھونا\n3️⃣ سر کا مسح\n4️⃣ ٹخنوں تک پاؤں دھونا\n\n📿 *وضو ایمان کی روشنی ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "namaz_steps",
    alias: ["namaz"],
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕌 *نماز کے ارکان:*\n\n1️⃣ تکبیر تحریمہ\n2️⃣ قیام\n3️⃣ قرأت\n4️⃣ رکوع\n5️⃣ سجدہ\n6️⃣ قعدہ اخیرہ\n\n📿 *نماز مومن کی معراج ہے*");
    } catch (e) { console.log(e); }
});

// 💝 SPECIAL ISLAMIC DAYS
cmd({
    pattern: "jummah_info",
    alias: ["juma"],
    category: "islamic",
    react: "🕌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕌 *جمعہ المبارک:*\n\n📿 سورہ کہف پڑھیں\n🤲 کثرت سے درود پڑھیں\n💝 صدقہ کریں\n🕌 نماز جمعہ ادا کریں\n\n✨ *جمعہ کے دن کی دعا قبول ہوتی ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "eid_info",
    alias: ["eid"],
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 *عیدین کی سنتیں:*\n\n1️⃣ غسل کرنا\n2️⃣ نئے کپڑے پہننا\n3️⃣ عطر لگانا\n4️⃣ عیدگاہ جانا\n5️⃣ عید کی نماز\n6️⃣ ایک دوسرے کو مبارکباد دینا\n\n✨ *عید مبارک!*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "shab_e_qadr",
    alias: ["lailatulqadr"],
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("✨ *لیلۃ القدر:*\n\n📿 *دعا:* اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي\n\n🕌 رمضان کے آخری عشرے کی طاق راتیں\n✨ *یہ ہزار مہینوں سے بہتر ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "shab_e_barat",
    alias: ["15shaban"],
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 *شبِ برات (15 شعبان):*\n\n📿 نوافل پڑھیں\n📖 قرآن پڑھیں\n🤲 دعائیں کریں\n💝 صدقہ کریں\n🌙 روزہ رکھیں\n\n✨ *اللہ اس رات اپنے بندوں کی بخشش کرتا ہے*");
    } catch (e) { console.log(e); }
});

// 🌸 SPECIAL DAROOD PACK
cmd({
    pattern: "darood_nariya",
    alias: ["nariya"],
    category: "islamic",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🔥 *دَرُودِ نَارِيَة:*\n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنَ النَّارِ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "darood_shaafi",
    alias: ["shaafi"],
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💚 *دَرُودِ شَافِي:*\n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "darood_mahabbat",
    alias: ["mahabbat"],
    category: "islamic",
    react: "💕",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💕 *دَرُودِ مَحَبَّت:*\n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَأَصْحَابِهِ عَدَدَ كُلِّ حَرْفٍ كُتِبَ وَيُكْتَبُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "darood_ghausia",
    alias: ["ghausia"],
    category: "islamic",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌟 *دَرُودِ غَوْثِيَّة:*\n\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ");
    } catch (e) { console.log(e); }
});

// 📿 SPECIAL NAFIL & IBADAT
cmd({
    pattern: "tahajjud",
    alias: ["tahajjud_info"],
    category: "islamic",
    react: "🌌",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌌 *نمازِ تہجد:*\n\n🕌 رات کے آخری پہر\n📿 2 سے 12 رکعت\n🤲 اس وقت کی دعا قبول ہوتی ہے\n\n✨ *تہجد پڑھنے والا اللہ کا خاص بندہ ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "ishraq",
    alias: ["ishraq_info"],
    category: "islamic",
    react: "🌅",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌅 *نمازِ اشراق:*\n\n🕌 سورج نکلنے کے 20 منٹ بعد\n📿 2 سے 12 رکعت\n✨ *اجر حج و عمرہ کے برابر*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "chast",
    alias: ["salatul_duha"],
    category: "islamic",
    react: "☀️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("☀️ *نمازِ چاشت:*\n\n🕌 سورج بلند ہونے پر\n📿 2 سے 12 رکعت\n✨ *گناہوں کی بخشش کا ذریعہ*");
    } catch (e) { console.log(e); }
});

// 🕋 SPECIAL ZIKR FOR PROTECTION
cmd({
    pattern: "ayat_protection",
    alias: ["hifazat"],
    category: "islamic",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🛡️ *حفاظت کے لیے:*\n\n📿 آیت الکرسی\n📿 سورہ فلق\n📿 سورہ ناس\n📿 سورہ اخلاص\n\n✨ *صبح و شام 3 بار پڑھیں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "ruqya",
    alias: ["dam"],
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 *دم کی دعا:*\n\nأَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ\n\n📿 *3 بار پڑھ کر خود پر دم کریں*");
    } catch (e) { console.log(e); }
});

// 🕌 ISLAMIC QUIZ & INFO
cmd({
    pattern: "islam_quiz",
    alias: ["quiz"],
    category: "islamic",
    react: "❓",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("❓ *اسلامی سوال:*\n\n*قرآن مجید میں کتنی سورتیں ہیں؟*\n\n1️⃣ 112\n2️⃣ 114 ✅\n3️⃣ 116\n4️⃣ 120\n\n🕌 *جواب: 114 سورتیں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "quran_info",
    alias: ["quraninfo"],
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 *قرآن مجید:*\n\n📿 114 سورتیں\n📖 30 پارے\n✨ 6666 آیات\n🕌 7 منزلیں\n\n💚 *قرآن ہدایت کا سرچشمہ ہے*");
    } catch (e) { console.log(e); }
});

// 💝 AKHLAQ & MUAMLAAT
cmd({
    pattern: "akhlaq",
    alias: ["goodmorals"],
    category: "islamic",
    react: "💝",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💝 *اچھے اخلاق:*\n\n1️⃣ سچ بولنا\n2️⃣ وعدہ پورا کرنا\n3️⃣ والدین کی خدمت\n4️⃣ پڑوسیوں کا خیال\n5️⃣ مسکینوں کی مدد\n6️⃣ سلام کرنا\n7️⃣ مسکراہٹ\n\n✨ *بہترین انسان وہ ہے جس کے اخلاق اچھے ہوں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "parents_dua",
    alias: ["walidain"],
    category: "islamic",
    react: "👨‍👩‍👧",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("👨‍👩‍👧 *والدین کے لیے دعا:*\n\nرَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا\n\n✨ *ماں باپ کی خدمت جنت کی کنجی ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "neighbor_rights",
    alias: ["padosi"],
    category: "islamic",
    react: "🏠",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🏠 *پڑوسیوں کے حقوق:*\n\n1️⃣ سلام کرنا\n2️⃣ بیمار پرسی\n3️⃣ تعزیت\n4️⃣ مدد کرنا\n5️⃣ تحفہ دینا\n6️⃣ تکلیف نہ دینا\n\n✨ *جبرائیل نے پڑوسیوں کے حقوق کی بہت تاکید کی*");
    } catch (e) { console.log(e); }
});

// 🌙 RAMADAN SPECIAL
cmd({
    pattern: "sehri_dua",
    alias: ["sehri"],
    category: "islamic",
    react: "🌙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌙 *سحری کی دعا:*\n\nوَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "iftar_dua",
    alias: ["iftar"],
    category: "islamic",
    react: "🌅",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌅 *افطار کی دعا:*\n\nاللَّهُمَّ اِنِّي لَكَ صُمْتُ وَبِكَ اٰمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلٰي رِزْقِكَ اَفْطَرْتُ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "ramadan_dua",
    alias: ["ramzan_dua"],
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 *رمضان کی دعا:*\n\nاللَّهُمَّ بَارِكْ لَنَا فِي رَمَضَانَ وَأَعِنَّا عَلَى الصِّيَامِ وَالْقِيَامِ");
    } catch (e) { console.log(e); }
});

// 🕌 MORE ZIKR PACK
cmd({
    pattern: "hasbunallah",
    alias: ["hasbunallah_zikr"],
    category: "islamic",
    react: "💙",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💙 *حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ*\n\n📿 *اللہ ہمارے لیے کافی ہے اور وہ بہترین کارساز ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "bismillah",
    alias: ["bismi"],
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("✨ *بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ*\n\n📿 *ہر کام کی ابتدا اللہ کے نام سے کریں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "inshaallah",
    alias: ["insha_allah"],
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 *إِنْ شَاءَ اللَّهُ*\n\n📿 *اگر اللہ نے چاہا*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "mashaallah",
    alias: ["masha_allah"],
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💚 *مَا شَاءَ اللَّهُ*\n\n📿 *جو اللہ نے چاہا*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "alhamdulillah",
    alias: ["alhamdu"],
    category: "islamic",
    react: "🙏",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🙏 *الْحَمْدُ لِلَّهِ*\n\n📿 *تمام تعریفیں اللہ کے لیے ہیں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "subhanallah",
    alias: ["subhan_allah"],
    category: "islamic",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("✨ *سُبْحَانَ اللَّهِ*\n\n📿 *اللہ پاک ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "allahuakbar",
    alias: ["allahu_akbar"],
    category: "islamic",
    react: "🕋",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🕋 *اللَّهُ أَكْبَرُ*\n\n📿 *اللہ سب سے بڑا ہے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "lailahaillallah",
    alias: ["kalima1"],
    category: "islamic",
    react: "☪️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("☪️ *لَا إِلَهَ إِلَّا اللَّهُ*\n\n📿 *اللہ کے سوا کوئی عبادت کے لائق نہیں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "astaghfirullah",
    alias: ["astagfirullah"],
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 *أَسْتَغْفِرُ اللَّهَ*\n\n📿 *میں اللہ سے بخشش مانگتا ہوں*");
    } catch (e) { console.log(e); }
});

// 🕌 ISLAMIC WISDOM & QUOTES
cmd({
    pattern: "islamic_quote",
    alias: ["quote"],
    category: "islamic",
    react: "💬",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        const quotes = [
            "💬 *جو اللہ سے ڈرتا ہے، اللہ اسے راستہ دکھاتا ہے*",
            "💬 *صبر کرو، اللہ دیکھ رہا ہے*",
            "💬 *دعا مومن کا ہتھیار ہے*",
            "💬 *نماز جنت کی کنجی ہے*",
            "💬 *والدین کی خدمت عبادت ہے*",
            "💬 *علم حاصل کرنا ہر مسلمان پر فرض ہے*",
            "💬 *مسکراہٹ بھی صدقہ ہے*",
            "💬 *اللہ کے فیصلے پر راضی رہو*",
            "💬 *توبہ کرنے میں دیر نہ کرو*",
            "💬 *قرآن پڑھو، دلوں کو سکون ملے گا*"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await reply(randomQuote);
    } catch (e) { console.log(e); }
});

// 🌸 ISLAMIC STORIES
cmd({
    pattern: "prophet_story",
    alias: ["qissa"],
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 *نبی ﷺ کی امانت داری:*\n\nنبی ﷺ کو لوگ *الامین* (امانت دار) کہتے تھے۔ آپ ﷺ ہمیشہ سچ بولتے اور امانت پوری کرتے۔\n\n💚 *ہمیں بھی سچا اور امانت دار ہونا چاہیے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "sahabi_story",
    alias: ["sahaba"],
    category: "islamic",
    react: "⭐",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("⭐ *حضرت ابوبکر صدیقؓ:*\n\nآپؓ نے اسلام قبول کرنے کے بعد اپنا سارا مال اللہ کی راہ میں خرچ کر دیا۔\n\n💚 *ہمیں بھی اللہ کے لیے قربانی دینی چاہیے*");
    } catch (e) { console.log(e); }
});

// 🕌 DUA FOR SPECIAL OCCASIONS
cmd({
    pattern: "dua_exam",
    alias: ["imtihan"],
    category: "islamic",
    react: "📚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📚 *امتحان کی دعا:*\n\nرَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_kamyabi",
    alias: ["success"],
    category: "islamic",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌟 *کامیابی کی دعا:*\n\nاللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_marriage",
    alias: ["shadi"],
    category: "islamic",
    react: "💕",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💕 *شادی کی دعا:*\n\nرَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_children",
    alias: ["aulaad"],
    category: "islamic",
    react: "👶",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("👶 *اولاد کی دعا:*\n\nرَبِّ هَبْ لِي مِنَ الصَّالِحِينَ\n\n✨ *اللہ ہمیں نیک اولاد عطا فرمائے*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_health_shifa",
    alias: ["shifa"],
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💚 *شفا کی دعا:*\n\nأَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ\n\n📿 *7 بار پڑھیں*");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_debt",
    alias: ["karza"],
    category: "islamic",
    react: "💰",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("💰 *قرض سے نجات کی دعا:*\n\nاللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_enemy",
    alias: ["dushman"],
    category: "islamic",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🛡️ *دشمن سے حفاظت:*\n\nحَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ\n\n📿 *صبح شام 7 بار پڑھیں*");
    } catch (e) { console.log(e); }
});

// 💫 CLOSING DUAS
cmd({
    pattern: "dua_majlis",
    alias: ["majliskidua"],
    category: "islamic",
    react: "🤲",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🤲 *مجلس کی دعا:*\n\nسُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_khatm",
    alias: ["khatm"],
    category: "islamic",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("📖 *ختمِ قرآن کی دعا:*\n\nاللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً");
    } catch (e) { console.log(e); }
});

cmd({
    pattern: "dua_general",
    alias: ["generaldua"],
    category: "islamic",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await reply("🌟 *جامع دعا:*\n\nرَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ\n\n✨ *یہ قرآن کی سب سے جامع دعا ہے*");
    } catch (e) { console.log(e); }
});

// 🎬 ANIMATED COMMANDS (Prophet Names & Allah Names)
cmd({
    pattern: "prophetnames",
    alias: ["asmaunnabi", "muhammadnames"],
    desc: "Displays 99 Names of Prophet Muhammad (PBUH) animation",
    category: "islamic",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

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
}, async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, { text: "*This is an owner command.*" }, { quoted: mek });
        }

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
// ==========================================
// 🕌 BINA PREFIX WALA AUTO HANDLER
// Saari Islamic commands ko bina prefix chalata hai
// ==========================================
cmd({
    'on': "body"
}, async (conn, mek, store, {
    from,
    body,
    isCreator,
    reply,
    sender,
    userConfig,
    prefix
}) => {
    try {
        // Normalize body
        const userText = (body || "").normalize("NFC").trim().toLowerCase();
        if (!userText) return;

        // Saari Islamic triggers ki list (jo bina prefix chalengi)
        const islamicTriggers = {
            // Adhan & Prayer
            "adhan": "adhan", "azan": "adhan", "azanfajr": "adhan",
            "namaz_times": "namaz_times", "prayertimes": "namaz_times", "salah": "namaz_times",

            // Morning & Evening Duas
            "dua_morning": "dua_morning", "subahdua": "dua_morning",
            "dua_evening": "dua_evening", "shaamdua": "dua_evening",
            "dua_sleep": "dua_sleep", "sonekidua": "dua_sleep",
            "dua_wakeup": "dua_wakeup", "uthnekidua": "dua_wakeup",
            "dua_eating": "dua_eating", "khanekidua": "dua_eating",
            "dua_travel": "dua_travel", "safarkidua": "dua_travel",
            "dua_rain": "dua_rain", "barishkidua": "dua_rain",
            "dua_anxiety": "dua_anxiety", "pareshanidua": "dua_anxiety", "dua_stress": "dua_anxiety",
            "dua_distress": "dua_distress", "mushkildua": "dua_distress",
            "dua_hajat": "dua_hajat", "hajatkidua": "dua_hajat",
            "dua_forgiveness": "dua_forgiveness",
            "dua_rizq": "dua_rizq",
            "dua_guidance": "dua_guidance",
            "dua_health": "dua_health",

            // Zikr
            "zikr_la_hawla": "zikr_la_hawla", "lahawla": "zikr_la_hawla",
            "zikr_subhanallahi_wabihamdihi": "zikr_subhanallahi_wabihamdihi",
            "subhanallahi_wabihamdihi": "zikr_subhanallahi_wabihamdihi",
            "zikr_subhanallahil_azeem": "zikr_subhanallahil_azeem",
            "subhanallahilazeem": "zikr_subhanallahil_azeem",
            "zikr_1000": "zikr_1000", "hazarkalima": "zikr_1000",
            "zikr_astaghfirullah": "zikr_astaghfirullah",
            "zikr_alhamdulillah": "zikr_alhamdulillah",
            "zikr_subhanallah": "zikr_subhanallah",
            "zikr_allahuakbar": "zikr_allahuakbar",
            "zikr_lailahaillallah": "zikr_lailahaillallah",
            "zikr_lahawla": "zikr_lahawla",

            // Quranic Surahs
            "surah_fatiha": "surah_fatiha", "alfatiha": "surah_fatiha",
            "surah_falaq": "surah_falaq", "alfalaq": "surah_falaq",
            "surah_nas": "surah_nas", "annas": "surah_nas",
            "surah_kafirun": "surah_kafirun", "alkafirun": "surah_kafirun",
            "surah_asr": "surah_asr", "alasr": "surah_asr",
            "surah_kauthar": "surah_kauthar", "alkauthar": "surah_kauthar",
            "ayatul_kursi": "ayatul_kursi", "ayatakursi": "ayatul_kursi", "kursi": "ayatul_kursi",
            "surah_yaseen": "surah_yaseen", "yaseen": "surah_yaseen",
            "surah_rahman": "surah_rahman", "arrahman": "surah_rahman",
            "surah_mulk": "surah_mulk", "almulk": "surah_mulk",

            // Ahadith
            "hadith_good_morals": "hadith_good_morals",
            "hadith_cleanliness": "hadith_cleanliness",
            "hadith_truth": "hadith_truth",
            "hadith_patience": "hadith_patience",
            "darood_sharif": "darood_sharif",
            "kalima_tayyiba": "kalima_tayyiba",
            "islam_fact": "islam_fact",
            "quran_reminder": "quran_reminder",

            // Islamic Knowledge
            "pillars_islam": "pillars_islam", "arkan": "pillars_islam",
            "pillars_iman": "pillars_iman", "arkan_iman": "pillars_iman",
            "islamic_months": "islamic_months", "mahine": "islamic_months",
            "ramadan_info": "ramadan_info", "ramzan": "ramadan_info",
            "hajj_info": "hajj_info", "hajj": "hajj_info",
            "wudu_steps": "wudu_steps", "wuzu": "wudu_steps",
            "namaz_steps": "namaz_steps", "namaz": "namaz_steps",

            // Special Days
            "jummah_info": "jummah_info", "juma": "jummah_info",
            "eid_info": "eid_info", "eid": "eid_info",
            "shab_e_qadr": "shab_e_qadr", "lailatulqadr": "shab_e_qadr",
            "shab_e_barat": "shab_e_barat", "15shaban": "shab_e_barat",

            // Darood Pack
            "darood_nariya": "darood_nariya", "nariya": "darood_nariya",
            "darood_shaafi": "darood_shaafi", "shaafi": "darood_shaafi",
            "darood_mahabbat": "darood_mahabbat", "mahabbat": "darood_mahabbat",
            "darood_ghausia": "darood_ghausia", "ghausia": "darood_ghausia",

            // Nafal
            "tahajjud": "tahajjud", "tahajjud_info": "tahajjud",
            "ishraq": "ishraq", "ishraq_info": "ishraq",
            "chast": "chast", "salatul_duha": "chast",

            // Protection
            "ayat_protection": "ayat_protection", "hifazat": "ayat_protection",
            "ruqya": "ruqya", "dam": "ruqya",

            // Quiz
            "islam_quiz": "islam_quiz", "quiz": "islam_quiz",
            "quran_info": "quran_info", "quraninfo": "quran_info",

            // Akhlaq
            "akhlaq": "akhlaq", "goodmorals": "akhlaq",
            "parents_dua": "parents_dua", "walidain": "parents_dua",
            "neighbor_rights": "neighbor_rights", "padosi": "neighbor_rights",

            // Ramadan
            "sehri_dua": "sehri_dua", "sehri": "sehri_dua",
            "iftar_dua": "iftar_dua", "iftar": "iftar_dua",
            "ramadan_dua": "ramadan_dua", "ramzan_dua": "ramadan_dua",

            // More Zikr
            "hasbunallah": "hasbunallah", "hasbunallah_zikr": "hasbunallah",
            "bismillah": "bismillah", "bismi": "bismillah",
            "inshaallah": "inshaallah", "insha_allah": "inshaallah",
            "mashaallah": "mashaallah", "masha_allah": "mashaallah",
            "alhamdulillah": "alhamdulillah", "alhamdu": "alhamdulillah",
            "subhanallah": "subhanallah", "subhan_allah": "subhanallah",
            "allahuakbar": "allahuakbar", "allahu_akbar": "allahuakbar",
            "lailahaillallah": "lailahaillallah", "kalima1": "lailahaillallah",
            "astaghfirullah": "astaghfirullah", "astagfirullah": "astaghfirullah",

            // Wisdom & Stories
            "islamic_quote": "islamic_quote", "quote": "islamic_quote",
            "prophet_story": "prophet_story", "qissa": "prophet_story",
            "sahabi_story": "sahabi_story", "sahaba": "sahabi_story",

            // Special Duas
            "dua_exam": "dua_exam", "imtihan": "dua_exam",
            "dua_kamyabi": "dua_kamyabi", "success": "dua_kamyabi",
            "dua_marriage": "dua_marriage", "shadi": "dua_marriage",
            "dua_children": "dua_children", "aulaad": "dua_children",
            "dua_health_shifa": "dua_health_shifa", "shifa": "dua_health_shifa",
            "dua_debt": "dua_debt", "karza": "dua_debt",
            "dua_enemy": "dua_enemy", "dushman": "dua_enemy",

            // Closing Duas
            "dua_majlis": "dua_majlis", "majliskidua": "dua_majlis",
            "dua_khatm": "dua_khatm", "khatm": "dua_khatm",
            "dua_general": "dua_general", "generaldua": "dua_general",

            // Animated
            "prophetnames": "prophetnames",
            "asmaunnabi": "prophetnames",
            "muhammadnames": "prophetnames",
            "allahnames": "allahnames",
            "asmaulhusna": "allahnames",
            "99names": "allahnames"
        };

        // Check: kya userText exactly kisi trigger se match karta hai?
        const matchedCommand = islamicTriggers[userText];
        if (!matchedCommand) return;

        // Reply aur React functions
        const replyFn = async (text) => {
            await conn.sendMessage(from, { text }, { quoted: mek });
        };

        const reactFn = async (emoji) => {
            try {
                await conn.sendMessage(from, { react: { text: emoji, key: mek.key } });
            } catch (e) {}
        };

        // Command dhoondo — commands array mein
        const { commands } = await import('../command.js');
        const cmdObj = Object.values(commands).find(
            c => c.pattern && c.pattern.toLowerCase() === matchedCommand
        );

        if (!cmdObj || !cmdObj.function) return;

        // Command execute karo
        await cmdObj.function(conn, mek, { }, {
            from,
            reply: replyFn,
            react: reactFn,
            isCreator,
            sender,
            userConfig,
            prefix: ""
        });

    } catch (error) {
        console.error("Islamic No-Prefix Error:", error);
    }
});
