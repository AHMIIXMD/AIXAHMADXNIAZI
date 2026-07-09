import { cmd } from "../command.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// HOW THESE WORK:
// User types .unban1 (or any command below)
// Bot replies with a ready-made appeal text
// User copies that text and sends it to WhatsApp support themselves
// Bot does nothing automatically - just gives the text

// ============================================
// 1. ENGLISH APPEAL - BASIC
// ============================================
cmd({
  pattern: "unban",
  alias: ["appeal1"],
  desc: "WhatsApp unban appeal - English Basic",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #1*\n📋 Copy this and send to: support@whatsapp.com\n\n━━━━━━━━━━━━━━━━━━━\nHello WhatsApp Support Team,\n\nI am writing to request the restoration of my WhatsApp account. My account has been banned and I believe this was done in error.\n\nI have always followed WhatsApp's Terms of Service and Community Guidelines. I have never sent spam, bulk messages, or used any third-party applications.\n\nPlease review my account and restore it as soon as possible.\n\nThank you for your time.\n━━━━━━━━━━━━━━━━━━━\n\n✅ Copy the text above and email it to WhatsApp support.`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 2. ENGLISH APPEAL - DETAILED
// ============================================
cmd({
  pattern: "unban2",
  alias: ["appeal2"],
  desc: "WhatsApp unban appeal - English Detailed",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #2*\n📋 Copy and send to: support@whatsapp.com\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Team,\n\nI am reaching out because my WhatsApp account has been suspended and I strongly believe this decision was made in error.\n\nI want to assure you that:\n• I have never violated your Terms of Service\n• I have never used unauthorized third-party apps\n• I have never sent spam or bulk messages\n• I have never harassed any user\n\nMy WhatsApp is my primary communication tool and this suspension is causing significant disruption to my daily life and work.\n\nI kindly request you to review my account and reinstate it at the earliest convenience.\n\nThank you sincerely.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 3. ENGLISH APPEAL - PROFESSIONAL
// ============================================
cmd({
  pattern: "unban3",
  alias: ["appeal3"],
  desc: "WhatsApp unban appeal - English Professional",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #3*\n📋 Copy and send to: support@whatsapp.com\n\n━━━━━━━━━━━━━━━━━━━\nTo Whom It May Concern,\n\nI am submitting this formal appeal regarding the suspension of my WhatsApp account.\n\nI have been a loyal WhatsApp user for several years and have always maintained compliance with all platform policies. The sudden suspension has affected my ability to communicate with family, friends, and colleagues.\n\nI respectfully request a thorough review of my account activity. I am confident that upon investigation, you will find no violations warranting a permanent ban.\n\nI am willing to cooperate fully with any verification process required.\n\nBest regards.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 4. ENGLISH APPEAL - SHORT & POLITE
// ============================================
cmd({
  pattern: "unban4",
  alias: ["appeal4"],
  desc: "WhatsApp unban appeal - Short English",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #4*\n📋 Short & Polite Version\n\n━━━━━━━━━━━━━━━━━━━\nHi WhatsApp Support,\n\nMy account was recently banned. I believe this is a mistake as I have not violated any of your terms.\n\nPlease restore my account. I rely on WhatsApp to stay connected with my family and friends.\n\nThank you!\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 5. ENGLISH APPEAL - EMOTIONAL
// ============================================
cmd({
  pattern: "unban5",
  alias: ["appeal5"],
  desc: "WhatsApp unban appeal - Emotional English",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #5*\n📋 Emotional Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Team,\n\nI am deeply distressed by the sudden suspension of my account. WhatsApp is my only means of staying in contact with my family members who live abroad.\n\nI have used WhatsApp responsibly for years and have never done anything to deserve this ban. I am a genuine user who values this platform.\n\nPlease give me a chance to explain myself and restore my account. This situation is causing me great hardship.\n\nI humbly request your reconsideration.\n\nWith sincere hope,\nA loyal user\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 6. URDU APPEAL - BASIC
// ============================================
cmd({
  pattern: "unban6",
  alias: ["appeal6", "urduappeal1"],
  desc: "WhatsApp unban appeal - Urdu Basic",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #6*\n📋 Urdu Version - Copy karo aur email karo\n\n━━━━━━━━━━━━━━━━━━━\nمحترم واٹس ایپ ٹیم،\n\nمیرا واٹس ایپ اکاؤنٹ بند کر دیا گیا ہے۔ مجھے یقین ہے کہ یہ غلطی سے ہوا ہے۔\n\nمیں نے کبھی بھی واٹس ایپ کی شرائط و ضوابط کی خلاف ورزی نہیں کی۔ میں نے کوئی اسپام میسج نہیں بھیجا اور نہ ہی کوئی غیر قانونی کام کیا۔\n\nبراہ کرم میرا اکاؤنٹ بحال کریں۔\n\nشکریہ\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 7. URDU APPEAL - DETAILED
// ============================================
cmd({
  pattern: "unban7",
  alias: ["appeal7", "urduappeal2"],
  desc: "WhatsApp unban appeal - Urdu Detailed",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #7*\n📋 Urdu Detailed - support@whatsapp.com pe bhejo\n\n━━━━━━━━━━━━━━━━━━━\nمحترم واٹس ایپ سپورٹ ٹیم،\n\nمیں آپ کو بتانا چاہتا/چاہتی ہوں کہ میرا اکاؤنٹ بند کر دیا گیا ہے جو بالکل غلط ہے۔\n\nمیں نے:\n• کبھی اسپام نہیں کیا\n• کوئی غیر قانونی ایپ استعمال نہیں کی\n• کسی کو تنگ نہیں کیا\n• واٹس ایپ کے قوانین کی ہمیشہ پابندی کی\n\nواٹس ایپ میرے خاندان اور دوستوں سے رابطے کا واحد ذریعہ ہے۔ براہ کرم میری درخواست پر غور فرمائیں اور اکاؤنٹ بحال کریں۔\n\nنیک تمنا کے ساتھ\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 8. ARABIC APPEAL - BASIC
// ============================================
cmd({
  pattern: "unban8",
  alias: ["appeal8", "arabicappeal1"],
  desc: "WhatsApp unban appeal - Arabic Basic",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #8*\n📋 Arabic Version - أرسل إلى support@whatsapp.com\n\n━━━━━━━━━━━━━━━━━━━\nإلى فريق دعم واتساب المحترم،\n\nتم تعليق حسابي على واتساب وأعتقد أن هذا حدث بالخطأ.\n\nلم أنتهك أي من شروط الخدمة الخاصة بكم. لم أرسل رسائل مزعجة ولم أستخدم أي تطبيقات غير مرخصة.\n\nأرجو منكم مراجعة حسابي واستعادته في أقرب وقت ممكن.\n\nشكراً جزيلاً\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 9. ARABIC APPEAL - DETAILED
// ============================================
cmd({
  pattern: "unban9",
  alias: ["appeal9", "arabicappeal2"],
  desc: "WhatsApp unban appeal - Arabic Detailed",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #9*\n📋 Arabic Detailed\n\n━━━━━━━━━━━━━━━━━━━\nعزيزي فريق واتساب،\n\nأكتب إليكم لأستأنف قرار تعليق حسابي. لقد كنت مستخدماً أميناً لواتساب لسنوات عديدة.\n\nأؤكد لكم:\n• لم أرسل أي رسائل مزعجة\n• لم أستخدم تطبيقات غير رسمية\n• لم أنتهك أي سياسة من سياساتكم\n• لم أتحرش بأي مستخدم\n\nواتساب هو وسيلتي الرئيسية للتواصل مع عائلتي وأصدقائي. أرجو إعادة تفعيل حسابي.\n\nمع خالص الشكر والاحترام\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 10. ARABIC APPEAL - PROFESSIONAL
// ============================================
cmd({
  pattern: "unban10",
  alias: ["appeal10", "arabicappeal3"],
  desc: "WhatsApp unban appeal - Arabic Professional",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #10*\n📋 Arabic Professional\n\n━━━━━━━━━━━━━━━━━━━\nإلى الجهة المختصة في واتساب،\n\nأتقدم بهذا الاستئناف الرسمي بشأن تعليق حسابي على منصة واتساب.\n\nلقد التزمت دائماً بجميع سياسات المنصة وشروط الاستخدام. التعليق المفاجئ أثر بشكل كبير على تواصلي مع عائلتي وعملي اليومي.\n\nأطلب منكم إجراء مراجعة شاملة لنشاط حسابي وإعادة تفعيله. أنا على استعداد للتعاون في أي إجراء تحقق مطلوب.\n\nمع الاحترام التام\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 11. HINDI APPEAL - BASIC
// ============================================
cmd({
  pattern: "unban11",
  alias: ["appeal11", "hindiappeal1"],
  desc: "WhatsApp unban appeal - Hindi Basic",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #11*\n📋 Hindi Version\n\n━━━━━━━━━━━━━━━━━━━\nप्रिय WhatsApp सपोर्ट टीम,\n\nमेरा WhatsApp अकाउंट बंद कर दिया गया है। मुझे लगता है यह गलती से हुआ है।\n\nमैंने कभी भी WhatsApp की शर्तों का उल्लंघन नहीं किया। न स्पैम भेजा, न कोई गैरकानूनी काम किया।\n\nकृपया मेरा अकाउंट वापस चालू करें।\n\nधन्यवाद\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 12. HINDI APPEAL - DETAILED
// ============================================
cmd({
  pattern: "unban12",
  alias: ["appeal12", "hindiappeal2"],
  desc: "WhatsApp unban appeal - Hindi Detailed",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #12*\n📋 Hindi Detailed\n\n━━━━━━━━━━━━━━━━━━━\nआदरणीय WhatsApp टीम,\n\nमेरा अकाउंट बैन हो गया है और मैं इसके खिलाफ अपील करना चाहता/चाहती हूं।\n\nमैं आपको विश्वास दिलाता/दिलाती हूं:\n• मैंने कभी स्पैम नहीं भेजा\n• कोई अनधिकृत ऐप इस्तेमाल नहीं की\n• किसी को परेशान नहीं किया\n• सभी नियमों का पालन किया\n\nWhatsApp मेरे परिवार और दोस्तों से जुड़ने का एकमात्र साधन है। कृपया मेरे अकाउंट की समीक्षा करें और इसे बहाल करें।\n\nसादर\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 13. RUSSIAN APPEAL - BASIC
// ============================================
cmd({
  pattern: "unban13",
  alias: ["appeal13", "russianappeal1"],
  desc: "WhatsApp unban appeal - Russian Basic",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #13*\n📋 Russian Version\n\n━━━━━━━━━━━━━━━━━━━\nУважаемая команда поддержки WhatsApp,\n\nМой аккаунт WhatsApp был заблокирован, и я считаю, что это произошло по ошибке.\n\nЯ никогда не нарушал(а) правила использования сервиса. Я не рассылал(а) спам и не использовал(а) сторонние приложения.\n\nПожалуйста, восстановите мой аккаунт как можно скорее.\n\nСпасибо за понимание.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 14. RUSSIAN APPEAL - DETAILED
// ============================================
cmd({
  pattern: "unban14",
  alias: ["appeal14", "russianappeal2"],
  desc: "WhatsApp unban appeal - Russian Detailed",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #14*\n📋 Russian Detailed\n\n━━━━━━━━━━━━━━━━━━━\nДорогая команда WhatsApp,\n\nОбращаюсь к вам с апелляцией относительно блокировки моего аккаунта.\n\nУверяю вас:\n• Я никогда не рассылал(а) спам\n• Не использовал(а) неофициальные приложения\n• Не нарушал(а) правила сообщества\n• Не преследовал(а) других пользователей\n\nWhatsApp является моим основным средством связи с семьёй и друзьями. Прошу вас провести проверку моего аккаунта и восстановить его.\n\nС уважением\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 15. JAPANESE APPEAL
// ============================================
cmd({
  pattern: "unban15",
  alias: ["appeal15", "japaneseappeal"],
  desc: "WhatsApp unban appeal - Japanese",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #15*\n📋 Japanese Version\n\n━━━━━━━━━━━━━━━━━━━\nWhatsAppサポートチームの皆様へ\n\n私のWhatsAppアカウントが停止されました。これは誤りだと思います。\n\n私はWhatsAppの利用規約を常に遵守してきました。スパムメッセージを送ったことも、不正なアプリを使用したこともありません。\n\nどうかアカウントを復元していただきますよう、お願い申し上げます。\n\nよろしくお願いします。\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 16. CHINESE APPEAL
// ============================================
cmd({
  pattern: "unban16",
  alias: ["appeal16", "chineseappeal"],
  desc: "WhatsApp unban appeal - Chinese",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #16*\n📋 Chinese Version\n\n━━━━━━━━━━━━━━━━━━━\n尊敬的WhatsApp支持团队，\n\n我的WhatsApp账号被封禁了，我认为这是一个错误。\n\n我从未违反WhatsApp的服务条款。我没有发送垃圾信息，也没有使用任何未经授权的第三方应用程序。\n\n请审查我的账号并尽快恢复它。\n\n非常感谢您的帮助。\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 17. TURKISH APPEAL
// ============================================
cmd({
  pattern: "unban17",
  alias: ["appeal17", "turkishappeal"],
  desc: "WhatsApp unban appeal - Turkish",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #17*\n📋 Turkish Version\n\n━━━━━━━━━━━━━━━━━━━\nSaygıdeğer WhatsApp Destek Ekibi,\n\nWhatsApp hesabım askıya alındı ve bunun bir hata olduğunu düşünüyorum.\n\nHizmet koşullarınızı her zaman eksiksiz olarak uyguladım. Hiçbir zaman istenmeyen mesaj göndermedi m ve izinsiz uygulama kullanmadım.\n\nLütfen hesabımı inceleyerek en kısa sürede geri açın.\n\nTeşekkür ederim.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 18. INDONESIAN APPEAL
// ============================================
cmd({
  pattern: "unban18",
  alias: ["appeal18", "indonesianappeal"],
  desc: "WhatsApp unban appeal - Indonesian",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #18*\n📋 Indonesian Version\n\n━━━━━━━━━━━━━━━━━━━\nKepada Tim Dukungan WhatsApp yang Terhormat,\n\nAkun WhatsApp saya telah diblokir dan saya percaya ini terjadi karena kesalahan.\n\nSaya selalu mematuhi Syarat dan Ketentuan WhatsApp. Saya tidak pernah mengirim pesan spam atau menggunakan aplikasi pihak ketiga yang tidak resmi.\n\nMohon tinjau akun saya dan pulihkan secepatnya.\n\nTerima kasih.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 19. PORTUGUESE APPEAL
// ============================================
cmd({
  pattern: "unban19",
  alias: ["appeal19", "portugueseappeal"],
  desc: "WhatsApp unban appeal - Portuguese",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #19*\n📋 Portuguese Version\n\n━━━━━━━━━━━━━━━━━━━\nPrezada Equipe de Suporte do WhatsApp,\n\nMinha conta do WhatsApp foi banida e acredito que isso foi um erro.\n\nSempre segui os Termos de Serviço do WhatsApp. Nunca enviei spam nem usei aplicativos de terceiros não autorizados.\n\nPor favor, analise minha conta e restaure-a o mais rápido possível.\n\nObrigado(a).\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 20. SPANISH APPEAL
// ============================================
cmd({
  pattern: "unban20",
  alias: ["appeal20", "spanishappeal"],
  desc: "WhatsApp unban appeal - Spanish",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #20*\n📋 Spanish Version\n\n━━━━━━━━━━━━━━━━━━━\nEstimado Equipo de Soporte de WhatsApp,\n\nMi cuenta de WhatsApp ha sido suspendida y creo que esto fue un error.\n\nSiempre he cumplido con los Términos de Servicio de WhatsApp. Nunca he enviado mensajes no deseados ni he utilizado aplicaciones de terceros no autorizadas.\n\nPor favor, revise mi cuenta y restáurela lo antes posible.\n\nGracias.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 21. FRENCH APPEAL
// ============================================
cmd({
  pattern: "unban21",
  alias: ["appeal21", "frenchappeal"],
  desc: "WhatsApp unban appeal - French",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #21*\n📋 French Version\n\n━━━━━━━━━━━━━━━━━━━\nChère Équipe de Support WhatsApp,\n\nMon compte WhatsApp a été suspendu et je pense que c'est une erreur.\n\nJ'ai toujours respecté les Conditions d'Utilisation de WhatsApp. Je n'ai jamais envoyé de spam ni utilisé d'applications tierces non autorisées.\n\nJe vous prie de bien vouloir examiner mon compte et de le rétablir dans les meilleurs délais.\n\nMerci.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 22. GERMAN APPEAL
// ============================================
cmd({
  pattern: "unban22",
  alias: ["appeal22", "germanappeal"],
  desc: "WhatsApp unban appeal - German",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #22*\n📋 German Version\n\n━━━━━━━━━━━━━━━━━━━\nSehr geehrtes WhatsApp-Support-Team,\n\nMein WhatsApp-Konto wurde gesperrt und ich glaube, dass dies ein Fehler war.\n\nIch habe stets die Nutzungsbedingungen von WhatsApp eingehalten. Ich habe niemals Spam gesendet oder nicht autorisierte Drittanbieter-Apps verwendet.\n\nBitte überprüfen Sie mein Konto und stellen Sie es so bald wie möglich wieder her.\n\nVielen Dank.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 23. PERSIAN/FARSI APPEAL
// ============================================
cmd({
  pattern: "unban23",
  alias: ["appeal23", "farsiappeal"],
  desc: "WhatsApp unban appeal - Persian/Farsi",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #23*\n📋 Persian/Farsi Version\n\n━━━━━━━━━━━━━━━━━━━\nتیم پشتیبانی واتساپ عزیز،\n\nحساب کاربری واتساپ من مسدود شده است و معتقدم این اشتباه بوده است.\n\nمن همیشه از قوانین و مقررات واتساپ پیروی کرده‌ام. هرگز پیام اسپام ارسال نکرده‌ام و از هیچ برنامه شخص ثالث غیرمجازی استفاده نکرده‌ام.\n\nلطفاً حساب من را بررسی کنید و در اسرع وقت آن را بازگردانید.\n\nمتشکرم.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 24. BANGLA APPEAL
// ============================================
cmd({
  pattern: "unban24",
  alias: ["appeal24", "banglaappeal"],
  desc: "WhatsApp unban appeal - Bangla",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #24*\n📋 Bangla Version\n\n━━━━━━━━━━━━━━━━━━━\nপ্রিয় WhatsApp সাপোর্ট টিম,\n\nআমার WhatsApp অ্যাকাউন্ট বন্ধ করা হয়েছে এবং আমি মনে করি এটি ভুলবশত হয়েছে।\n\nআমি সর্বদা WhatsApp-এর শর্তাবলী মেনে চলেছি। আমি কখনো স্প্যাম পাঠাইনি বা অননুমোদিত অ্যাপ ব্যবহার করিনি।\n\nঅনুগ্রহ করে আমার অ্যাকাউন্ট পর্যালোচনা করুন এবং যত তাড়াতাড়ি সম্ভব পুনরুদ্ধার করুন।\n\nধন্যবাদ।\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 25. SWAHILI APPEAL
// ============================================
cmd({
  pattern: "unban25",
  alias: ["appeal25", "swahiliappeal"],
  desc: "WhatsApp unban appeal - Swahili",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #25*\n📋 Swahili Version\n\n━━━━━━━━━━━━━━━━━━━\nKwa Timu ya Msaada ya WhatsApp,\n\nAkaunti yangu ya WhatsApp imefungwa na ninaamini hii ilifanyika kwa makosa.\n\nNimekuwa nikifuata Masharti ya Huduma ya WhatsApp kila wakati. Sijawahi kutuma ujumbe taka wala kutumia programu zisizo rasmi.\n\nTafadhali kagua akaunti yangu na uirejeshe haraka iwezekanavyo.\n\nAsante.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 26. ENGLISH APPEAL - SECOND BAN
// ============================================
cmd({
  pattern: "unban26",
  alias: ["appeal26", "secondban"],
  desc: "Appeal for second time ban",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #26*\n📋 For Second Time Ban\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nI am writing regarding the second suspension of my account. I have previously submitted an appeal and I am now reaching out again as I still believe my account was suspended in error.\n\nI want to sincerely apologize if anything I did unintentionally caused this issue. I assure you I had no malicious intent.\n\nI respectfully request another review of my account. I promise to be more careful going forward.\n\nThank you for your patience.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 27. ENGLISH APPEAL - BUSINESS ACCOUNT
// ============================================
cmd({
  pattern: "unban27",
  alias: ["appeal27", "businessappeal"],
  desc: "Appeal for WhatsApp Business account ban",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #27*\n📋 Business Account Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Business Support Team,\n\nMy WhatsApp Business account has been suspended and this is severely impacting my ability to communicate with customers.\n\nI run a legitimate business and use WhatsApp Business solely for customer communication in compliance with all policies. I have never used automated messaging or sent unsolicited bulk messages.\n\nThis suspension is causing significant financial and operational losses. I urgently request a review and restoration of my account.\n\nThank you.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 28. ENGLISH APPEAL - REPORTED BY MISTAKE
// ============================================
cmd({
  pattern: "unban28",
  alias: ["appeal28", "wrongreport"],
  desc: "Appeal when wrongly reported by others",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #28*\n📋 Wrongly Reported Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support Team,\n\nI believe my account was suspended because I was incorrectly reported by other users. This appears to be a misunderstanding or a coordinated false report.\n\nI have never harassed, spammed, or violated any WhatsApp policy. The reports against me are unfounded and malicious.\n\nI kindly ask you to review the actual content of my account activity and verify that I have done nothing wrong.\n\nPlease restore my account.\n\nThank you.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 29. ENGLISH APPEAL - OLD NUMBER REUSE
// ============================================
cmd({
  pattern: "unban29",
  alias: ["appeal29", "oldnumber"],
  desc: "Appeal when number was previously used by someone else",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #29*\n📋 Old Number Reuse Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nI recently acquired this phone number from my telecom provider and registered it on WhatsApp. My account was immediately banned, which suggests this number was previously misused by its prior owner.\n\nI am a new user of this number and have not committed any violations. The ban is related to the previous owner's actions, not mine.\n\nI kindly request you to review this situation and allow me to use this number on WhatsApp.\n\nThank you for your understanding.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 30. ENGLISH APPEAL - TEMPORARY BAN
// ============================================
cmd({
  pattern: "unban30",
  alias: ["appeal30", "tempban"],
  desc: "Appeal for temporary ban removal",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #30*\n📋 Temporary Ban Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nI have received a temporary ban on my WhatsApp account. I understand that this may have been triggered automatically, but I assure you that I did not intentionally violate any guidelines.\n\nI have learned from this experience and will be more mindful of my usage going forward. I promise to use WhatsApp responsibly.\n\nPlease consider lifting this ban early. I sincerely apologize for any inconvenience caused.\n\nThank you.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 31. URDU APPEAL - BUSINESS
// ============================================
cmd({
  pattern: "unban31",
  alias: ["appeal31", "urduappeal3"],
  desc: "WhatsApp unban appeal - Urdu Business",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #31*\n📋 Urdu Business Version\n\n━━━━━━━━━━━━━━━━━━━\nمحترم واٹس ایپ بزنس سپورٹ ٹیم،\n\nمیرا واٹس ایپ بزنس اکاؤنٹ بند کر دیا گیا ہے جس سے میرے کاروبار کو نقصان پہنچ رہا ہے۔\n\nمیں اپنے گاہکوں سے رابطے کے لیے واٹس ایپ بزنس کا استعمال کرتا/کرتی ہوں اور تمام اصولوں پر عمل کرتا/کرتی ہوں۔ میں نے کبھی بلک میسجنگ یا اسپام نہیں کی۔\n\nبراہ کرم فوری طور پر میرا اکاؤنٹ بحال کریں۔\n\nشکریہ\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 32. ARABIC APPEAL - SECOND BAN
// ============================================
cmd({
  pattern: "unban32",
  alias: ["appeal32", "arabicsecondban"],
  desc: "WhatsApp unban appeal - Arabic Second Ban",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #32*\n📋 Arabic Second Ban Version\n\n━━━━━━━━━━━━━━━━━━━\nعزيزي فريق واتساب،\n\nهذه مراسلتي الثانية لاستئناف قرار تعليق حسابي. قدمت استئنافاً سابقاً ولم يتم الرد عليه حتى الآن.\n\nأود أن أؤكد من جديد أنني لم أنتهك أي من سياساتكم. إذا كان هناك سوء فهم، فأنا على استعداد تام للتوضيح والتعاون.\n\nأرجو منكم مراجعة حالتي مرة أخرى وإعادة تفعيل حسابي.\n\nشكراً على تفهمكم.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 33. ENGLISH APPEAL - WITH DETAILS TEMPLATE
// ============================================
cmd({
  pattern: "unban33",
  alias: ["appeal33", "detailedtemplate"],
  desc: "Appeal with full details template to fill in",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #33*\n📋 Full Details Template - Fill in your info!\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support Team,\n\nI am writing to appeal the suspension of my WhatsApp account.\n\nMy Details:\n• Phone Number: [YOUR NUMBER]\n• Device: [ANDROID/iPhone]\n• Country: [YOUR COUNTRY]\n• Email: [YOUR EMAIL]\n\nI have not violated any of WhatsApp's Terms of Service. I believe this ban was made in error and I respectfully request its immediate removal.\n\nThank you for your prompt attention.\n\nSincerely,\n[YOUR NAME]\n━━━━━━━━━━━━━━━━━━━\n\n✏️ Fill in your details before sending!`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 34. ITALIAN APPEAL
// ============================================
cmd({
  pattern: "unban34",
  alias: ["appeal34", "italianappeal"],
  desc: "WhatsApp unban appeal - Italian",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #34*\n📋 Italian Version\n\n━━━━━━━━━━━━━━━━━━━\nGentile Team di Supporto WhatsApp,\n\nIl mio account WhatsApp è stato sospeso e ritengo che ciò sia avvenuto per errore.\n\nHo sempre rispettato i Termini di Servizio di WhatsApp. Non ho mai inviato messaggi spam né utilizzato applicazioni di terze parti non autorizzate.\n\nLa prego di esaminare il mio account e di ripristinarlo il prima possibile.\n\nGrazie.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 35. KOREAN APPEAL
// ============================================
cmd({
  pattern: "unban35",
  alias: ["appeal35", "koreanappeal"],
  desc: "WhatsApp unban appeal - Korean",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #35*\n📋 Korean Version\n\n━━━━━━━━━━━━━━━━━━━\nWhatsApp 고객 지원팀에게,\n\n제 WhatsApp 계정이 정지되었습니다. 이것은 오류라고 생각합니다.\n\n저는 항상 WhatsApp의 서비스 약관을 준수해 왔습니다. 스팸 메시지를 보내거나 승인되지 않은 타사 앱을 사용한 적이 없습니다.\n\n제 계정을 검토하고 최대한 빨리 복구해 주시기 바랍니다.\n\n감사합니다.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 36. URDU APPEAL - EMOTIONAL
// ============================================
cmd({
  pattern: "unban36",
  alias: ["appeal36", "urduemotional"],
  desc: "WhatsApp unban appeal - Urdu Emotional",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #36*\n📋 Urdu Emotional Version\n\n━━━━━━━━━━━━━━━━━━━\nمحترم واٹس ایپ ٹیم،\n\nمیں انتہائی پریشانی کی حالت میں آپ کو لکھ رہا/رہی ہوں۔ میرا واٹس ایپ اکاؤنٹ میرے بیرون ملک مقیم خاندان سے رابطے کا واحد ذریعہ ہے۔\n\nمیں نے کبھی کوئی قانون نہیں توڑا، کبھی کسی کو تنگ نہیں کیا اور نہ ہی کوئی غلط کام کیا۔ یہ پابندی میرے لیے بہت بڑا صدمہ ہے۔\n\nبراہ کرم میری درخواست پر رحم فرمائیں اور میرا اکاؤنٹ بحال کریں۔\n\nآپ کی بے حد شکرگزار\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 37. ARABIC APPEAL - EMOTIONAL
// ============================================
cmd({
  pattern: "unban37",
  alias: ["appeal37", "arabicemotional"],
  desc: "WhatsApp unban appeal - Arabic Emotional",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #37*\n📋 Arabic Emotional Version\n\n━━━━━━━━━━━━━━━━━━━\nفريق واتساب الكريم،\n\nأكتب إليكم في حالة من الضيق الشديد. واتساب هو وسيلتي الوحيدة للتواصل مع أفراد عائلتي في الخارج.\n\nلم أرتكب أي مخالفة ولم أؤذِ أحداً. أشعر بالظلم الشديد جراء هذا الحظر المفاجئ.\n\nأناشدكم بالنظر في قضيتي بعين الاعتبار وإعادة تفعيل حسابي. هذا الحساب لا يعني لي مجرد تطبيق، بل هو رابطي بمن أحب.\n\nشكراً من القلب.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 38. ENGLISH APPEAL - FINAL ATTEMPT
// ============================================
cmd({
  pattern: "unban38",
  alias: ["appeal38", "finalappeal"],
  desc: "WhatsApp unban final attempt appeal",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #38*\n📋 Final Attempt Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nThis is my final attempt to appeal the ban on my account. I have tried multiple times and I am genuinely desperate to have this resolved.\n\nI am a genuine, long-term WhatsApp user who has never misused the platform. I do not understand why my account was banned.\n\nI am willing to provide any proof or verification needed to confirm my identity and good-faith usage.\n\nPlease, I beg you to reconsider and restore my account. It is critically important to me.\n\nWith sincere desperation and hope,\nA loyal user\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 39. RUSSIAN APPEAL - DETAILED
// ============================================
cmd({
  pattern: "unban39",
  alias: ["appeal39", "russiandetailed"],
  desc: "WhatsApp unban appeal - Russian Detailed",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #39*\n📋 Russian Detailed Version\n\n━━━━━━━━━━━━━━━━━━━\nУважаемая служба поддержки WhatsApp,\n\nЯ обращаюсь к вам с официальной апелляцией в связи с блокировкой моей учётной записи.\n\nЗаверяю вас:\n• Я никогда не нарушал(а) правила платформы\n• Я не использовал(а) сторонние приложения\n• Я не отправлял(а) спам или нежелательные сообщения\n• Я не нарушал(а) права других пользователей\n\nWhatsApp является моим основным инструментом общения. Блокировка существенно влияет на мою повседневную жизнь. Прошу провести тщательную проверку и восстановить аккаунт.\n\nС уважением.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 40. HINDI APPEAL - EMOTIONAL
// ============================================
cmd({
  pattern: "unban40",
  alias: ["appeal40", "hindiemotional"],
  desc: "WhatsApp unban appeal - Hindi Emotional",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #40*\n📋 Hindi Emotional Version\n\n━━━━━━━━━━━━━━━━━━━\nआदरणीय WhatsApp टीम,\n\nमैं बहुत परेशान हूं। मेरा WhatsApp अकाउंट बंद हो गया है और यह मेरे परिवार से जुड़ने का एकमात्र तरीका था।\n\nमैंने कभी कोई नियम नहीं तोड़ा। मैंने कभी स्पैम नहीं भेजा और न ही किसी को परेशान किया।\n\nकृपया मेरी बात सुनें और मेरा अकाउंट वापस करें। मैं आपसे विनती करता/करती हूं।\n\nआपका/आपकी\nएक वफादार उपयोगकर्ता\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 41. ENGLISH APPEAL - NEW PHONE
// ============================================
cmd({
  pattern: "unban41",
  alias: ["appeal41", "newphone"],
  desc: "Appeal when banned after changing phone",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #41*\n📋 New Phone / Device Change Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nMy account was suspended after I transferred it to a new phone/device. I believe this may have triggered an automatic flag in your system.\n\nI recently purchased a new device and reinstalled WhatsApp using my same number. I have done nothing wrong and this appears to be an automated error.\n\nPlease verify that I am the legitimate owner of this number and restore my account access.\n\nThank you.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 42. ENGLISH APPEAL - MINOR VIOLATION APOLOGY
// ============================================
cmd({
  pattern: "unban42",
  alias: ["appeal42", "apologyappeal"],
  desc: "Appeal with apology for minor mistake",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #42*\n📋 Apology Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support Team,\n\nI am writing to sincerely apologize and appeal my account suspension.\n\nI acknowledge that I may have unknowingly violated a minor platform rule. This was not done with any harmful intent and I was not aware it was against the guidelines.\n\nI have now fully read and understood WhatsApp's Terms of Service. I promise this will not happen again.\n\nI humbly request you to restore my account and give me a second chance.\n\nSincerely apologetic,\nA remorseful user\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 43. THAI APPEAL
// ============================================
cmd({
  pattern: "unban43",
  alias: ["appeal43", "thaiappeal"],
  desc: "WhatsApp unban appeal - Thai",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #43*\n📋 Thai Version\n\n━━━━━━━━━━━━━━━━━━━\nเรียน ทีมสนับสนุน WhatsApp,\n\nบัญชี WhatsApp ของฉันถูกระงับ และฉันเชื่อว่าเกิดขึ้นโดยผิดพลาด\n\nฉันได้ปฏิบัติตามข้อกำหนดการให้บริการของ WhatsApp เสมอ ฉันไม่เคยส่งข้อความสแปมหรือใช้แอปพลิเคชันของบุคคลที่สามที่ไม่ได้รับอนุญาต\n\nโปรดตรวจสอบบัญชีของฉันและคืนค่าโดยเร็วที่สุด\n\nขอบคุณ\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 44. ENGLISH APPEAL - GROUP ADMIN
// ============================================
cmd({
  pattern: "unban44",
  alias: ["appeal44", "adminappeal"],
  desc: "Appeal for group admin account ban",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #44*\n📋 Group Admin Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nI am the admin of several WhatsApp groups and my account has been suspended. I believe this may be due to the high volume of messages in the groups I manage, which may have been incorrectly flagged as spam.\n\nAs a responsible admin, I have always ensured group content follows WhatsApp guidelines. I moderate my groups carefully and remove any inappropriate content immediately.\n\nPlease understand that group admin activity naturally involves higher message volumes and this is not spam behavior.\n\nPlease restore my account.\n\nThank you.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 45. ENGLISH APPEAL - STUDENT
// ============================================
cmd({
  pattern: "unban45",
  alias: ["appeal45", "studentappeal"],
  desc: "Appeal from student perspective",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #45*\n📋 Student Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support Team,\n\nI am a student and my WhatsApp account has been suspended. This is extremely disruptive as I use WhatsApp for:\n• Study group communication\n• Receiving important academic announcements\n• Staying in touch with classmates and teachers\n\nI have never used WhatsApp inappropriately. The ban is causing me to miss important educational communications.\n\nPlease review and restore my account urgently.\n\nThank you.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 46. URDU APPEAL - PROFESSIONAL
// ============================================
cmd({
  pattern: "unban46",
  alias: ["appeal46", "urduprofessional"],
  desc: "WhatsApp unban appeal - Urdu Professional",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #46*\n📋 Urdu Professional Version\n\n━━━━━━━━━━━━━━━━━━━\nمحترم واٹس ایپ سپورٹ،\n\nمیں یہ باضابطہ درخواست اپنے واٹس ایپ اکاؤنٹ کی بحالی کے لیے پیش کر رہا/رہی ہوں۔\n\nمیں نے ہمیشہ آپ کی تمام پالیسیوں کی پابندی کی ہے اور پلیٹ فارم کو ذمہ داری سے استعمال کیا ہے۔ میں اس پابندی کی کوئی معقول وجہ نہیں سمجھ پا رہا/رہی۔\n\nمیری گزارش ہے کہ میرے اکاؤنٹ کی سرگرمیوں کا جائزہ لیں اور اگر کوئی غلط فہمی ہے تو دور کریں۔\n\nمیں کسی بھی تصدیقی عمل میں مکمل تعاون کے لیے تیار ہوں۔\n\nخلوص کے ساتھ\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 47. ENGLISH APPEAL - SENIOR CITIZEN
// ============================================
cmd({
  pattern: "unban47",
  alias: ["appeal47", "seniorappeal"],
  desc: "Appeal from senior citizen perspective",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #47*\n📋 Senior Citizen Version\n\n━━━━━━━━━━━━━━━━━━━\nDear WhatsApp Support,\n\nI am an elderly person and WhatsApp is my primary way of staying connected with my children and grandchildren who live far away.\n\nI am not very familiar with all the technical rules of the application, but I have never intended to break any rules. If I unknowingly did something wrong, I sincerely apologize.\n\nPlease help me restore my account. Being cut off from my family is very distressing for me.\n\nThank you for your kindness.\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 48. ENGLISH APPEAL - COMPLAINT TO META
// ============================================
cmd({
  pattern: "unban48",
  alias: ["appeal48", "metacomplaint"],
  desc: "Formal complaint to Meta/parent company",
  react: "📩",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📩 *WHATSAPP UNBAN APPEAL #48*\n📋 Meta Formal Complaint\n📧 Send to: support@whatsapp.com\n\n━━━━━━━━━━━━━━━━━━━\nTo Meta Platforms / WhatsApp Legal Team,\n\nI am filing a formal complaint regarding the unjust and unexplained suspension of my WhatsApp account.\n\nI have received no clear reason for this ban and no prior warning. I have not been given any opportunity to defend myself or understand the alleged violation.\n\nI request:\n1. A full explanation of the reason for the ban\n2. Evidence of any alleged violation\n3. Immediate restoration of my account\n\nIf this matter is not resolved, I reserve the right to escalate through appropriate consumer protection channels.\n\nFormal complaint filed by:\nA concerned user\n━━━━━━━━━━━━━━━━━━━`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 49. ALL APPEALS LIST COMMAND
// ============================================
cmd({
  pattern: "unbanlist",
  alias: ["appeallist", "unbanhelp"],
  desc: "Show all available unban appeal commands",
  react: "📋",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📋 *ALL UNBAN APPEAL COMMANDS* 📋\n\n🇬🇧 *ENGLISH:*\n.unban1 - Basic\n.unban2 - Detailed\n.unban3 - Professional\n.unban4 - Short\n.unban5 - Emotional\n.unban26 - Second Ban\n.unban27 - Business\n.unban28 - Wrongly Reported\n.unban29 - Old Number\n.unban30 - Temp Ban\n.unban33 - Full Template\n.unban38 - Final Attempt\n.unban41 - New Phone\n.unban42 - Apology\n.unban44 - Group Admin\n.unban45 - Student\n.unban47 - Senior\n.unban48 - Meta Complaint\n\n🇵🇰 *URDU:*\n.unban6 .unban7 .unban31 .unban36 .unban46\n\n🇸🇦 *ARABIC:*\n.unban8 .unban9 .unban10 .unban32 .unban37\n\n🇮🇳 *HINDI:*\n.unban11 .unban12 .unban40\n\n🇷🇺 *RUSSIAN:*\n.unban13 .unban14 .unban39\n\n🇯🇵 *JAPANESE:* .unban15\n🇨🇳 *CHINESE:* .unban16\n🇹🇷 *TURKISH:* .unban17\n🇮🇩 *INDONESIAN:* .unban18\n🇧🇷 *PORTUGUESE:* .unban19\n🇪🇸 *SPANISH:* .unban20\n🇫🇷 *FRENCH:* .unban21\n🇩🇪 *GERMAN:* .unban22\n🇮🇷 *PERSIAN:* .unban23\n🇧🇩 *BANGLA:* .unban24\n🌍 *SWAHILI:* .unban25\n🇮🇹 *ITALIAN:* .unban34\n🇰🇷 *KOREAN:* .unban35\n🇹🇭 *THAI:* .unban43\n\n📧 *Send all appeals to: support@whatsapp.com*`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

// ============================================
// 50. HOW TO SUBMIT GUIDE
// ============================================
cmd({
  pattern: "unbanguide",
  alias: ["howtoappeal", "appealguide"],
  desc: "Guide on how to submit WhatsApp unban appeal",
  react: "📖",
  category: "unban",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    reply(`📖 *WHATSAPP UNBAN GUIDE* 📖\n\n*Step by Step - How to Appeal:*\n\n*STEP 1:* Type one of these commands to get your appeal text:\n👉 .unban1 to .unban48\n👉 .unbanlist - to see all options\n\n*STEP 2:* Copy the appeal text the bot sends you\n\n*STEP 3:* Send the copied text to:\n📧 *support@whatsapp.com*\n\n*STEP 4:* Include your phone number and device info in the email\n\n*STEP 5:* Wait 1-3 working days for a response\n\n━━━━━━━━━━━━━━━━━━━\n*TIPS FOR BETTER CHANCES:*\n✅ Be polite and calm\n✅ Use your real phone number\n✅ Send from the email linked to your account\n✅ Try multiple appeals in different languages\n✅ Be patient - it may take time\n\n⚠️ *NOTE: The bot only gives you the text. YOU send it to WhatsApp yourself.*\n\n> *Unban Guide By BOT* 📱`);
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});
