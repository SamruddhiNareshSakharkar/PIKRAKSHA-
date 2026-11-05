import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Sprout, Flower2, CircleDot } from 'lucide-react';

export default function CropCalendarView({ farm, lang = 'en', t }) {
  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');

  const isGrapes = cropStr.toLowerCase().includes('grape') || cropStr.toLowerCase().includes('द्राक्ष');
  const isTomato = cropStr.toLowerCase().includes('tomato') || cropStr.toLowerCase().includes('टोमॅटो');
  const isSoybean = cropStr.toLowerCase().includes('soybean') || cropStr.toLowerCase().includes('सोयाबीन');

  let stages = [];
  let defaultActive = 2;

  if (isGrapes) {
    defaultActive = 3;
    stages = [
      {
        id: 0,
        name: { en: 'Foundation & October Pruning', mr: 'ऑक्टोबर फळ छाटणी', hi: 'अक्टूबर फल छंटाई' },
        days: '0 - 15 DAP',
        bbch: 'BBCH 00-09',
        risk: { en: 'Low (Spur Canker)', mr: 'कमी (डेड आर्म / कॅन्कर)', hi: 'कम (कैनकर)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Bacterial spur canker, fungal dead-arm disease on cut canes.', mr: 'छाटणीच्या जखमांमधून बुरशी व जिवाणूंचा शिरकाव.', hi: 'छंटाई के घावों से फफूंद संक्रमण।' },
        ipmAction: { en: 'Paste cut ends with Bordeaux paste (10%). Spray Hydrogen Cyanamide for uniform bud break.', mr: 'काडीच्या टोकावर १०% बोर्डो पेस्ट लावा. एकसारख्या फुटीसाठी हायड्रोजन सायानामाइड फवारा.', hi: 'छंटाई वाले सिरों पर बोर्डो लेप लगाएं।' }
      },
      {
        id: 1,
        name: { en: 'Bud Burst & 5-Leaf Sprouting', mr: 'कोंब फुटणे व ५-पाने अवस्था', hi: 'कली फूटना व 5 पत्तियां' },
        days: '15 - 35 DAP',
        bbch: 'BBCH 10-19',
        risk: { en: 'Moderate (Flea Beetle & Thrips)', mr: 'मध्यम (उडद्या कीड व थ्रिप्स)', hi: 'मध्यम (पिस्सू भृंग व थ्रिप्स)' },
        riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
        keyThreats: { en: 'Flea beetles chewing tender sprouting eyes; thrips curling young leaves.', mr: 'उडद्या भुंगेरे कोवळे डोळे खाऊन टाकतात, थ्रिप्समुळे पाने आकसतात.', hi: 'पिस्सू भृंग द्वारा नई कोपलें चबाना, थ्रिप्स।' },
        ipmAction: { en: 'Release Chrysoperla predators. Shake vines on plastic sheets at dawn to collect beetles.', mr: 'क्रायसोपर्ला मित्रकीड सोडा. पहाटे झाडांच्या खाली प्लास्टिक अंथरून भुंगेरे गोळा करा.', hi: 'मित्र कीट छोड़ें। सुबह के समय कीटों को हिलाकर गिराएं।' }
      },
      {
        id: 2,
        name: { en: 'Pre-Bloom & Flowering Capfall', mr: 'फुलोरा व मणी धारणा', hi: 'फूल व गुच्छे बनना' },
        days: '35 - 55 DAP',
        bbch: 'BBCH 50-69',
        risk: { en: 'CRITICAL (Downy Mildew & Powdery)', mr: 'अति-गंभीर (डाऊनी मिल्ड्यू व भुरी)', hi: 'अति-संवेदनशील (डाउनी व पाउडरी मिल्ड्यू)' },
        riskColor: 'bg-red-100 text-red-800 border-red-300 animate-pulse',
        keyThreats: { en: 'Downy mildew destroys flower rachis. Oil-drop lesions appear under high morning dew.', mr: 'फुलोऱ्यावर डाऊनी मिल्ड्यू आल्यास संपूर्ण घड गळून पडतो, पाठीमागे पांढरी बुरशी वाढते.', hi: 'फूलों पर डाउनी मिल्ड्यू का गंभीर प्रकोप, गुच्छे गिरना।' },
        ipmAction: { en: 'Strict 10-10-10 weather rule: Spray 1% Bordeaux mixture. Dip rachis in gibberellic acid with Trichoderma.', mr: '१०-१०-१० नियमानुसार लगेच १% बोर्डो मिश्रण फवारा. ट्रायकोडर्मा द्रावणाचा वापर करा.', hi: '1% बोर्डो मिश्रण का छिड़काव करें। ट्राइकोडर्मा घोल का उपयोग करें।' }
      },
      {
        id: 3,
        name: { en: 'Berry Elongation & Sizing (CURRENT)', mr: 'मणी वाढ व घड विकास (सध्याचा टप्पा)', hi: 'अंगूर का आकार बढ़ना (वर्तमान)' },
        days: '55 - 85 DAP',
        bbch: 'BBCH 71-79',
        risk: { en: 'HIGH (Berry Cracking & Mealybug)', mr: 'जास्त (मणी तडकणे व पिठ्या ढेकूण)', hi: 'उच्च (अंगूर फटना व मिलीबग)' },
        riskColor: 'bg-orange-100 text-orange-800 border-orange-300',
        isCurrent: true,
        keyThreats: { en: 'Unseasonal rain triggers berry splitting; Mealybug deposits honeydew in bunches.', mr: 'अवकाळी पावसामुळे मणी तडकतात, पिठ्या ढेकूण घडाच्या आत चिकट मलमूत्र सोडतो.', hi: 'बेमौसम बारिश से अंगूर फटना, मिलीबग का हमला।' },
        ipmAction: { en: 'Release Cryptolaemus montrouzieri ladybird beetles @ 600/acre. Cover bunch clusters with paper cap.', mr: 'ऑस्ट्रेलियन लेडीबर्ड भुंगेरे (क्रिप्टोलेमस) प्रति एकरी ६०० सोडा. घडांना पेपर टोपी लावा.', hi: 'क्रिप्टोलेमस शिकारी भृंग छोड़ें। गुच्छों को ढकें।' }
      },
      {
        id: 4,
        name: { en: 'Veraison, Sugar & Export Harvest', mr: 'मणी पक्वता व साखर भरणी', hi: 'अंगूर पकना व कटाई' },
        days: '85 - 120+ DAP',
        bbch: 'BBCH 80-89',
        risk: { en: 'Low (APEDA Chemical Residue)', mr: 'कमी (रासायनिक अंश मुक्ती)', hi: 'कम (अवशेष मुक्त कटाई)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Rejection at European export ports if chemical residues are detected above MRL.', mr: 'युरोप निर्यातीत रसायनांचे अंश आढळल्यास कंटेनर रिजेक्ट होण्याचा धोका.', hi: 'यूरोपीय निर्यात में रासायनिक अवशेष पाए जाने पर अस्वीकृति का जोखिम।' },
        ipmAction: { en: 'Zero chemical sprays (Pre-Harvest Interval 30 days). Spray bio-stimulant sea-weed extract.', mr: 'कापणीपूर्वी ३० दिवस कोणतीही रासायनिक फवारणी पूर्ण बंद ठेवा. जैविक अर्क वापरा.', hi: 'कटाई से 30 दिन पहले रासायनिक छिड़काव बंद करें।' }
      }
    ];
  } else if (isTomato) {
    defaultActive = 2;
    stages = [
      {
        id: 0,
        name: { en: 'Nursery & Seedling Germination', mr: 'रोपवाटिका व पुनर्लागवड', hi: 'नर्सरी व रोपाई' },
        days: '0 - 25 DAT',
        bbch: 'BBCH 00-19',
        risk: { en: 'Moderate (Damping Off)', mr: 'मध्यम (रोपांची मर / डॅम्पिंग ऑफ)', hi: 'मध्यम (आर्द्र गलन)' },
        riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
        keyThreats: { en: 'Pythium root rot collapsing young tender seedlings.', mr: 'पिथियम बुरशीमुळे रोपांच्या खोडाला काजळी येऊन रोपे कोलमडतात.', hi: 'नर्सरी में तना सड़न व पौधों का गिरना।' },
        ipmAction: { en: 'Drench nursery raised beds with Trichoderma harzianum (10g/L). Root dip seedlings before planting.', mr: 'ट्रायकोडर्मा हरझियानम (१० ग्रॅम/लिटर) द्रावणाने आळवणी करा. रोपांची मुळे बुडवून पुनर्लागवड करा.', hi: 'ट्राइकोडर्मा घोल से क्यारियों को तर करें। जड़ शोधन करें।' }
      },
      {
        id: 1,
        name: { en: 'Vegetative Growth & Bamboo Staking', mr: 'शाकीय वाढ व बांबू तारांची बांधणी', hi: 'वानस्पतिक बढ़वार व बंधाई' },
        days: '25 - 45 DAT',
        bbch: 'BBCH 20-49',
        risk: { en: 'Moderate (Whitefly & Leaf Miner)', mr: 'मध्यम (पांढरी माशी व नागअळी)', hi: 'मध्यम (सफेद मक्खी व लीफ माइनर)' },
        riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
        keyThreats: { en: 'Whiteflies transmit Tomato Leaf Curl Virus (TLCV); leaf miners tunnel serpentines.', mr: 'पांढरी माशी विषाणूजन्य चुरडा-मुरडा (TLCV) पसरवते; नागअळी पानात पांढरे पट्टे करते.', hi: 'सफेद मक्खी पत्ता मरोड़ वायरस फैलाती है, लीफ माइनर।' },
        ipmAction: { en: 'Install 20 yellow sticky traps/acre. Spray 5% NSKE (Neem extract). Tie vines firmly off soil.', mr: 'एकरी २० पिवळे चिकट सापळे लावा. ५% निंबोळी अर्काची फवारणी करा. रोपे जमिनीपासून वर बांधा.', hi: '20 पीले चिपचिपे कार्ड लगाएं। 5% नीम अर्क छिड़कें।' }
      },
      {
        id: 2,
        name: { en: 'Flowering & Fruit Setting (CURRENT)', mr: 'फुलधारणा व फळधारणा (सध्याचा टप्पा)', hi: 'फूल आना व फल बनना (वर्तमान)' },
        days: '45 - 75 DAT',
        bbch: 'BBCH 50-71',
        risk: { en: 'CRITICAL (Late Blight & Pinworm)', mr: 'अति-गंभीर (करपा व पिनवर्म अळी)', hi: 'अति-संवेदनशील (पछेती झुलसा व पिनवर्म)' },
        riskColor: 'bg-red-100 text-red-800 border-red-300 animate-pulse',
        isCurrent: true,
        keyThreats: { en: 'Late Blight (Phytophthora infestans) blackens stems and causes brown rot on green fruit within 48h in cool fog.', mr: 'धुके व थंड हवेमुळे लेट ब्लाईट (करपा) संपूर्ण वावर ४८ तासांत काळवंडतो; फळांवर काळे खड्डे पडतात.', hi: 'पछेती झुलसा (लेट ब्लाइट) के कारण 48 घंटे में तने और हरे फल काले पड़कर सड़ते हैं।' },
        ipmAction: { en: 'Install Tuta absoluta pinworm pheromone traps. Spray Copper Hydroxide (2.5g/L). Drain standing root water.', mr: 'तुटा पिनवर्म कामगंध सापळे लावा. कॉपर हायड्रॉक्साइड (२.५ ग्रॅम/लि) ची फवारणी करा. मुळांशी साचलेले पाणी बाहेर काढा.', hi: 'पिनवर्म ट्रैप लगाएं। कॉपर हाइड्रोक्साइड छिड़कें। जलभराव निकालें।' }
      },
      {
        id: 3,
        name: { en: 'Fruit Sizing & Color Turning', mr: 'फळ विकास व फळे लाल होणे', hi: 'फल का आकार व लाल होना' },
        days: '75 - 100 DAT',
        bbch: 'BBCH 75-85',
        risk: { en: 'High (Fruit Borer Helicoverpa)', mr: 'जास्त (फळ पोखरणारी अळी)', hi: 'उच्च (फल छेदक सुंडी)' },
        riskColor: 'bg-orange-100 text-orange-800 border-orange-300',
        keyThreats: { en: 'Helicoverpa caterpillars bore holes into ripening tomatoes, inducing secondary bacterial soft rot.', mr: 'अळी टोमॅटोच्या आत तोंड खुपसून फळ खाऊन सडवते, वास येतो.', hi: 'सुंडी फलों में छेद करके सड़न पैदा करती है।' },
        ipmAction: { en: 'Release Trichogramma pretiosum @ 50,000/acre. Spray HaNPV viral bio-pesticide (250 LE/ha).', mr: 'ट्रायकोकार्ड ५०,००० प्रति एकर लावा. HaNPV जैविक विषाणू द्रावणाची फवारणी करा.', hi: 'ट्राइकोग्रामा परजीवी छोड़ें। HaNPV वायरस छिड़कें।' }
      },
      {
        id: 4,
        name: { en: 'Harvesting & Market Picking', mr: 'तोडणी व प्रतवारी', hi: 'तुड़ाई व विपणन' },
        days: '100+ DAT',
        bbch: 'BBCH 89-99',
        risk: { en: 'Low (Post-Harvest Loss)', mr: 'कमी (साठवणूक नुकसान)', hi: 'कम (भंडारण नुकसान)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Bruising and mold during crate loading.', mr: 'तोडणी करताना फळांना जखमा होऊन बुरशी येणे.', hi: 'तुड़ाई के समय फलों में चोट व फफूंद।' },
        ipmAction: { en: 'Pick in morning hours using plastic crates with aeration holes. Keep in shaded packhouse.', mr: 'सकाळच्या वेळेत तोडणी करा. हवेशीर क्रेट्समध्ये सावलीत माल ठेवा.', hi: 'सुबह के समय तुड़ाई करें। छायादार स्थान पर रखें।' }
      }
    ];
  } else if (isSoybean) {
    defaultActive = 3;
    stages = [
      {
        id: 0,
        name: { en: 'Sowing & Germination', mr: 'पेरणी व उगवण', hi: 'बुआई व अंकुरण' },
        days: '0 - 15 DAS',
        bbch: 'BBCH 00-10',
        risk: { en: 'Low (Seedling Rot)', mr: 'कमी (बीज कुजणे)', hi: 'कम (बीज सड़न)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Rhizoctonia seed rot in waterlogged soils.', mr: 'जास्त पावसात बियाणे कुजणे.', hi: 'अधिक नमी में बीज सड़ना।' },
        ipmAction: { en: 'Seed treatment with Bradyrhizobium japonicum + Trichoderma viride.', mr: 'रायझोबियम जिवाणू संवर्धन + ट्रायकोडर्मा बीजप्रक्रिया.', hi: 'राइजोबियम व ट्राइकोडर्मा से बीज उपचार करें।' }
      },
      {
        id: 1,
        name: { en: 'Vegetative Branching', mr: 'शाकीय वाढ व फांद्या फुटणे', hi: 'शाखाएं निकलना' },
        days: '15 - 35 DAS',
        bbch: 'BBCH 20-39',
        risk: { en: 'Moderate (Girdle Beetle & Stem Fly)', mr: 'मध्यम (चक्री भुंगा व खोडमाशी)', hi: 'मध्यम (गर्डल बीटल व तना मक्खी)' },
        riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
        keyThreats: { en: 'Girdle beetle female cuts ring grooves around petiole, causing branch wilting.', mr: 'चक्री भुंग्याची मादी फांदीवर दोन चक्राकार खाचा करून अंडी घालते, फांदी वाळते.', hi: 'गर्डल बीटल शाखाओं पर रिंग काटकर अंडे देती है, जिससे पौधे सूखते हैं।' },
        ipmAction: { en: 'Hand-pick and destroy ring-girdled dry twigs during early morning rounds.', mr: 'सकाळी शेताची पाहणी करून खाचा पडलेल्या सुकलेल्या फांद्या तोडून नष्ट करा.', hi: 'प्रभावित शाखाओं को काटकर नष्ट करें।' }
      },
      {
        id: 2,
        name: { en: 'Flowering Stage', mr: 'फुलोरा अवस्था', hi: 'फूल आने की अवस्था' },
        days: '35 - 55 DAS',
        bbch: 'BBCH 50-65',
        risk: { en: 'Moderate (Spodoptera Leaf Eating)', mr: 'मध्यम (तंबाखूची लष्करी अळी)', hi: 'मध्यम (तम्बाकू की इल्ली)' },
        riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
        keyThreats: { en: 'Spodoptera litura egg masses hatch and skeletonize leaves completely.', mr: 'लष्करी अळी पानाच्या पाठीमागे शेकडो अंडी घालून पानांची चाळण करते.', hi: 'लश्करी इल्ली पत्तों को छलनी कर देती है।' },
        ipmAction: { en: 'Install 5 Spodolure pheromone traps/acre. Spray Nomuraea rileyi bio-fungicide (5g/L).', mr: 'एकरी ५ स्पोडोल्यूर कामगंध सापळे लावा. नोमुरिया रिलेई (५ ग्रॅम/लि) जैविक बुरशी फवारा.', hi: 'फेरोमोन ट्रैप लगाएं। जैविक कवक नोमुरिया का छिड़काव करें।' }
      },
      {
        id: 3,
        name: { en: 'Pod Filling & Seed Development (CURRENT)', mr: 'शेंगा भरणे व दाणे वाढ (सध्याचा टप्पा)', hi: 'फली दाना भराव (वर्तमान)' },
        days: '55 - 80 DAS',
        bbch: 'BBCH 71-85',
        risk: { en: 'Moderate (Safe Below Threshold)', mr: 'कमी-मध्यम (नुकसान पातळीखाली)', hi: 'मध्यम (सीमा के नीचे सुरक्षित)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        isCurrent: true,
        keyThreats: { en: 'Helicoverpa caterpillars piercing green pods and eating tender seeds.', mr: 'घाटे अळी हिरव्या शेंगांना छिद्र पाडून आतील दाणे खाते.', hi: 'फली छेदक इल्ली दानों को खाती है।' },
        ipmAction: { en: 'Install 10 T-shaped bird perches/acre. Trap count safe (<5 moths). Avoid chemical sprays.', mr: 'एकरी १० \'T\' आकाराचे पक्षी थांबे लावा. सापळ्यात ५ पेक्षा कमी पतंग असल्याने कोणतीही फवारणी करू नका.', hi: '10 टी-आकार के पक्षी बसेरे लगाएं। रासायनिक छिड़काव न करें।' }
      },
      {
        id: 4,
        name: { en: 'Maturity & Pod Drying', mr: 'शेंगा पक्वता व काढणी', hi: 'फसल पकना व कटाई' },
        days: '80 - 100+ DAS',
        bbch: 'BBCH 89-99',
        risk: { en: 'Low (Pod Shattering)', mr: 'कमी (शेंगा तडकणे)', hi: 'कम (फली चटकना)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Over-drying in field causes pods to shatter, dropping seeds on ground.', mr: 'उन्हामुळे शेंगा शेतातच तडकून बियाणे गळण्याची भीती.', hi: 'अधिक सूखने से खेत में बीज बिखरने का डर।' },
        ipmAction: { en: 'Harvest when 90% of leaves turn yellow and drop, and pod moisture reaches 14%.', mr: '९०% पाने पिवळी पडून गळल्यावर आणि शेंगांमध्ये १४% ओलावा असताना काढणी करा.', hi: '90% पत्तियां पीली पड़ने पर सही नमी में कटाई करें।' }
      }
    ];
  } else {
    // Cotton default
    defaultActive = 2;
    stages = [
      {
        id: 0,
        name: { en: 'Sowing & Germination', mr: 'पेरणी व उगवण', hi: 'बुआई व अंकुरण' },
        days: '0 - 25 DAS',
        bbch: 'BBCH 00-19',
        risk: { en: 'Low (Damping Off)', mr: 'कमी (मर रोग)', hi: 'कम (आर्द्र गलन)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Stem rot, early sucking pests (thrips/aphids).', mr: 'खोडकुज, सुरुवातीचे रसशोषक कीड (फुलकिडे, मावा).', hi: 'तना गलन, शुरुआती रस चूसक कीट।' },
        ipmAction: { en: 'Seed treatment with Trichoderma viride (5g/kg seed). Install yellow sticky traps.', mr: 'ट्रायकोडर्मा व्हिरीडी (५ ग्रॅम/किलो) बीजप्रक्रिया. पिवळे चिकट सापळे लावावेत.', hi: 'ट्राइकोडर्मा से बीज उपचार करें। पीले चिपचिपे जाल लगाएं।' }
      },
      {
        id: 1,
        name: { en: 'Vegetative & Square Formation', mr: 'शाकीय वाढ व पाते लागणे', hi: 'वानस्पतिक वृद्धि व कलियां' },
        days: '25 - 55 DAS',
        bbch: 'BBCH 20-49',
        risk: { en: 'Moderate (Sucking Complex)', mr: 'मध्यम (रसशोषक कीड)', hi: 'मध्यम (रस चूसक कीट)' },
        riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
        keyThreats: { en: 'Jassids, Whitefly, Early Pink Bollworm emergence.', mr: 'तुडतुडे, पांढरी माशी, बोंडअळीचा सुरुवातीचा प्रादुर्भाव.', hi: 'जैसिड्स, सफेद मक्खी, प्रारंभिक गुलाबी सुंडी।' },
        ipmAction: { en: 'Install 5 Gossyplure pheromone traps/acre. Spray 5% NSKE (Neem Extract).', mr: 'एकरी ५ कामगंध सापळे लावा. ५% निंबोळी अर्काची पहिली फवारणी करा.', hi: 'प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। 5% नीम अर्क का छिड़काव करें।' }
      },
      {
        id: 2,
        name: { en: 'Flowering & Boll Development (CURRENT)', mr: 'फुलोरा व बोंड धारणा (सध्याचा टप्पा)', hi: 'फूल व गूलर बनना (वर्तमान)' },
        days: '55 - 90 DAS',
        bbch: 'BBCH 50-79',
        risk: { en: 'CRITICAL (Pink Bollworm Peak)', mr: 'अति-गंभीर (बोंडअळीचा सर्वोच्च धोका)', hi: 'अति-संवेदनशील (गुलाबी सुंडी शिखर)' },
        riskColor: 'bg-red-100 text-red-800 border-red-300 animate-pulse',
        isCurrent: true,
        keyThreats: { en: 'Pink Bollworm (Pectinophora gossypiella) internal burrowing into squares and bolls, rosette flowers.', mr: 'गुलाबी बोंडअळी कळ्या व बोंडामध्ये शिरकाव, डोमकळ्या (Rosette flowers).', hi: 'गुलाबी सुंडी का गूलर के अंदर प्रवेश, डोमकली।' },
        ipmAction: { en: 'Check traps daily (ETL: 8 moths/day). Collect & destroy rosette flowers. Release Trichogramma @ 60,000 eggs/acre.', mr: 'दररोज सापळे तपासा (नुकसान पातळी: ८ पतंग/दिवस). डोमकळ्या गोळा करून नष्ट करा. ट्रायकोकार्ड ६०,००० प्रति एकर सोडा.', hi: 'रोजाना ट्रैप जांचें (8 कीट/दिन). डोमकली नष्ट करें। ट्राइकोग्रामा कार्ड लगाएं।' }
      },
      {
        id: 3,
        name: { en: 'Boll Maturation & Bursting', mr: 'बोंड पक्वता व बोंड फुटणे', hi: 'गूलर पकना व खिलना' },
        days: '90 - 130 DAS',
        bbch: 'BBCH 80-89',
        risk: { en: 'High (Late Infestation)', mr: 'जास्त (शेवटचा प्रादुर्भाव)', hi: 'उच्च (अंतिम संक्रमण)' },
        riskColor: 'bg-orange-100 text-orange-800 border-orange-300',
        keyThreats: { en: 'Stained lint, seed damage, secondary bacterial boll rot.', mr: 'कापसाचा दर्जा खराब, बियांचे नुकसान, बोंड सडणे.', hi: 'कपास के रेशे खराब होना, बीज क्षति, सड़न।' },
        ipmAction: { en: 'Maintain clean picking. Never stack infested crop residues near field.', mr: 'स्वच्छ वेचणी करा. किडलेली बोंडे शेतात किंवा धुऱ्यावर साठवू नका.', hi: 'साफ तुड़ाई करें। संक्रमित अवशेष खेत में न छोड़ें।' }
      },
      {
        id: 4,
        name: { en: 'Terminal Harvest & Residue Mgmt', mr: 'अंतिम वेचणी व अवशेष व्यवस्थापन', hi: 'अंतिम तुड़ाई व अवशेष प्रबंधन' },
        days: '130+ DAS',
        bbch: 'BBCH 90-99',
        risk: { en: 'Low (Carry-Over Risk)', mr: 'कमी (पुढील हंगामासाठी धोका)', hi: 'कम (अगले मौसम हेतु जोखिम)' },
        riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        keyThreats: { en: 'Overwintering diapausing larvae surviving in stalks for next season.', mr: 'सुप्तावस्थेतील अळ्या पुढील हंगामासाठी शेतात जिवंत राहणे.', hi: 'सुप्त सुंडियां अगले मौसम के लिए डंठल में जीवित रहना।' },
        ipmAction: { en: 'Deep summer ploughing. Terminate crop by December-end; avoid ratoon cotton (फरदड बंदी).', mr: 'उन्हाळी खोल नांगरट करा. डिसेंबर अखेर पीक काढून टाका, फरदड (ratoon) कापूस घेऊ नका.', hi: 'गहरी जुताई करें। फरदड़ कपास बिल्कुल न लें।' }
      }
    ];
  }

  const [activeStage, setActiveStage] = useState(defaultActive);

  useEffect(() => {
    setActiveStage(defaultActive);
  }, [farm?.id]);

  const current = stages[activeStage] || stages[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? `${cropStr} वाढ अवस्था व कीड दिनदर्शिका` : `${cropStr} Growth Phenology & Pest Calendar`}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? `${cropStr} पीक वाढ टप्पा आणि कीड संवेदनशीलता दिनदर्शिका` : `${cropStr} Phenological Stages & Vulnerability Timeline`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `प्रत्येक वाढीच्या टप्प्यावर कीड संवेदनशीलता बदलते. ${typeof farm?.farmerName === 'object' ? (farm.farmerName[lang] || farm.farmerName.en) : (farm?.farmerName || 'Farmer')} यांच्या पिकाचा सध्याचा टप्पा तपासा.`
                : `Target university-certified IPM interventions to the exact BBCH growth stage of ${farm.farmerName.en}'s farm.`}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Registered Variety</span>
            <span className="text-sm font-extrabold text-emerald-950">
              {farm.crop?.variety || cropStr} ({farm.crop?.das || 70} DAS)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Growth Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {stages.map((stg) => {
          const isSelected = activeStage === stg.id;
          return (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg.id)}
              className={`p-4 rounded-2xl text-left border transition-all relative ${
                isSelected
                  ? 'bg-forest-900 text-white border-forest-900 shadow-md ring-2 ring-emerald-500'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              {stg.isCurrent && (
                <span className="absolute -top-2.5 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                  NOW (आता)
                </span>
              )}
              <div className="text-[10px] font-mono opacity-70 mb-1">{stg.bbch}</div>
              <div className="font-extrabold text-xs mb-1 line-clamp-2">
                {stg.name[lang] || stg.name.en}
              </div>
              <div className="text-[11px] font-bold opacity-80">{stg.days}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs font-bold text-slate-400 font-mono">{current.bbch} • {current.days}</span>
            <h3 className="text-xl font-extrabold text-slate-900">
              {current.name[lang] || current.name.en}
            </h3>
          </div>
          <span className={`px-3 py-1.5 rounded-xl border text-xs font-black self-start sm:self-auto ${current.riskColor}`}>
            Risk: {current.risk[lang] || current.risk.en}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{lang === 'mr' ? 'या टप्प्यातील मुख्य कीड व रोग धोके' : 'Primary Pests & Disease Threats in this Stage'}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.keyThreats[lang] || current.keyThreats.en}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'mr' ? 'विद्यापीठ प्रमाणित IPM कृती उपाय' : 'University-Recommended IPM Intervention'}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.ipmAction[lang] || current.ipmAction.en}
            </p>
          </div>
        </div>

        {/* University standard tag */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
          <span>🌾 <strong>Agricultural Protocol:</strong> Calibrated with MPKV Rahuri & VNMKV Parbhani crop protection guidelines.</span>
          <span className="text-emerald-700 font-bold text-[11px] shrink-0">Stage Verified</span>
        </div>
      </div>
    </div>
  );
}
