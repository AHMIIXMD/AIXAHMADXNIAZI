import { cmd, commands } from "../command.js";
import { sleep } from "../lib/functions.js";
import config from "../config.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

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
