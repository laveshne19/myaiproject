/* Shiv AI — Stotra & Aarti corpus.
   Traditional devotional texts (public domain). Each verse carries the Devanagari,
   a romanised reading, and a plain-English meaning so the reciter understands
   what they are saying rather than only how it sounds. */

export const STOTRAS = [
  {
    id: 'panchakshara-stotram',
    name: 'Shiva Panchakshara Stotram',
    hi: 'शिव पञ्चाक्षर स्तोत्रम्',
    by: 'Adi Shankaracharya',
    note: 'Five verses, one for each syllable of Na-Ma-Śi-Vā-Ya.',
    minutes: 3,
    complete: true,
    verses: [
      {
        deva:
          'नागेन्द्रहाराय त्रिलोचनाय\nभस्माङ्गरागाय महेश्वराय ।\nनित्याय शुद्धाय दिगम्बराय\nतस्मै "न" काराय नमः शिवाय ॥',
        translit:
          'Nāgendra-hārāya trilocanāya bhasmāṅga-rāgāya maheśvarāya,\nnityāya śuddhāya digambarāya tasmai "na"-kārāya namaḥ śivāya.',
        meaning:
          'To Him who wears the king of serpents as a garland, who has three eyes, whose body is smeared with ash, the great Lord — eternal, pure, clothed in the directions themselves: to that syllable "Na", salutations to Shiva.',
      },
      {
        deva:
          'मन्दाकिनी सलिल चन्दन चर्चिताय\nनन्दीश्वर प्रमथनाथ महेश्वराय ।\nमन्दार पुष्प बहुपुष्प सुपूजिताय\nतस्मै "म" काराय नमः शिवाय ॥',
        translit:
          'Mandākinī-salila-candana-carcitāya nandīśvara-pramathanātha-maheśvarāya,\nmandāra-puṣpa-bahupuṣpa-supūjitāya tasmai "ma"-kārāya namaḥ śivāya.',
        meaning:
          'To Him anointed with the water of the heavenly Ganga and with sandal, lord of Nandi and of the ganas, worshipped with mandara and countless flowers: to that syllable "Ma", salutations to Shiva.',
      },
      {
        deva:
          'शिवाय गौरी वदनाब्ज वृन्द\nसूर्याय दक्षाध्वर नाशकाय ।\nश्री नीलकण्ठाय वृषध्वजाय\nतस्मै "शि" काराय नमः शिवाय ॥',
        translit:
          'Śivāya gaurī-vadanābja-vṛnda-sūryāya dakṣādhvara-nāśakāya,\nśrī-nīlakaṇṭhāya vṛṣadhvajāya tasmai "śi"-kārāya namaḥ śivāya.',
        meaning:
          'To the auspicious one, the sun that opens the lotus of Gauri’s face, destroyer of Daksha’s sacrifice, the blue-throated, whose banner bears the bull: to that syllable "Shi", salutations to Shiva.',
      },
      {
        deva:
          'वसिष्ठ कुम्भोद्भव गौतमार्य\nमुनीन्द्र देवार्चित शेखराय ।\nचन्द्रार्क वैश्वानर लोचनाय\nतस्मै "व" काराय नमः शिवाय ॥',
        translit:
          'Vasiṣṭha-kumbhodbhava-gautamārya-munīndra-devārcita-śekharāya,\ncandrārka-vaiśvānara-locanāya tasmai "va"-kārāya namaḥ śivāya.',
        meaning:
          'To Him whose crown is worshipped by Vasishtha, Agastya, Gautama and the greatest sages and gods, whose three eyes are the moon, the sun and fire: to that syllable "Va", salutations to Shiva.',
      },
      {
        deva:
          'यक्षस्वरूपाय जटाधराय\nपिनाकहस्ताय सनातनाय ।\nदिव्याय देवाय दिगम्बराय\nतस्मै "य" काराय नमः शिवाय ॥',
        translit:
          'Yakṣa-svarūpāya jaṭādharāya pināka-hastāya sanātanāya,\ndivyāya devāya digambarāya tasmai "ya"-kārāya namaḥ śivāya.',
        meaning:
          'To Him who took the form of a yaksha, who bears matted locks, who holds the Pinaka bow, the eternal, the luminous god clothed in the sky: to that syllable "Ya", salutations to Shiva.',
      },
      {
        deva:
          'पञ्चाक्षरमिदं पुण्यं यः पठेच्छिव सन्निधौ ।\nशिवलोकमवाप्नोति शिवेन सह मोदते ॥',
        translit:
          'Pañcākṣaram-idaṁ puṇyaṁ yaḥ paṭhec-chiva sannidhau,\nśivalokam-avāpnoti śivena saha modate.',
        meaning:
          'Whoever recites these sacred five syllables in the presence of Shiva reaches Shiva’s own realm and rejoices there with Him. (The closing fruit-verse.)',
      },
    ],
  },

  {
    id: 'rudrashtakam',
    name: 'Shiva Rudrashtakam',
    hi: 'शिव रुद्राष्टकम्',
    by: 'Goswami Tulsidas — Ramcharitmanas, Uttarkand',
    note: 'Eight verses sung by Kaka Bhushundi. The last verse is the one people cry to.',
    minutes: 5,
    complete: true,
    verses: [
      {
        deva:
          'नमामीशमीशान निर्वाणरूपं ।\nविभुं व्यापकं ब्रह्मवेदस्वरूपं ।\nनिजं निर्गुणं निर्विकल्पं निरीहं ।\nचिदाकाशमाकाशवासं भजेऽहं ॥',
        translit:
          'Namāmīśam-īśāna nirvāṇa-rūpaṁ, vibhuṁ vyāpakaṁ brahma-veda-svarūpaṁ,\nnijaṁ nirguṇaṁ nirvikalpaṁ nirīhaṁ, cidākāśam-ākāśa-vāsaṁ bhaje’ham.',
        meaning:
          'I bow to the Lord Ishana, whose very form is liberation — all-pervading, the essence of Brahman and the Vedas. Self-existent, beyond qualities, beyond alternatives, beyond desire: the sky of consciousness who dwells in the sky. Him I worship.',
      },
      {
        deva:
          'निराकारमोंकारमूलं तुरीयं ।\nगिरा ज्ञान गोतीतमीशं गिरीशं ।\nकरालं महाकाल कालं कृपालं ।\nगुणागार संसारपारं नतोऽहं ॥',
        translit:
          'Nirākāram-oṁkāra-mūlaṁ turīyaṁ, girā jñāna gotītam-īśaṁ girīśaṁ,\nkarālaṁ mahākāla kālaṁ kṛpālaṁ, guṇāgāra saṁsāra-pāraṁ nato’ham.',
        meaning:
          'Formless, the root of Om, the fourth state; beyond speech, beyond knowing, beyond the senses — the Lord of mountains. Terrible, the death of even great Death, and yet full of mercy. Home of every virtue, the far shore of this world: to Him I bow.',
      },
      {
        deva:
          'तुषाराद्रि संकाश गौरं गभीरं ।\nमनोभूत कोटि प्रभा श्री शरीरं ।\nस्फुरन्मौलि कल्लोलिनी चारु गंगा ।\nलसद्भालबालेन्दु कण्ठे भुजंगा ॥',
        translit:
          'Tuṣārādri saṅkāśa gauraṁ gabhīraṁ, manobhūta koṭi prabhā śrī śarīraṁ,\nsphuran-mauli kallolinī cāru gaṅgā, lasad-bhāla-bālendu kaṇṭhe bhujaṅgā.',
        meaning:
          'White as a snow mountain and unfathomably deep; His radiant body outshines a crore of gods of love. From His crown leaps the lovely, rolling Ganga; on His forehead the young moon shines, and a serpent rests at His throat.',
      },
      {
        deva:
          'चलत्कुण्डलं भ्रू सुनेत्रं विशालं ।\nप्रसन्नाननं नीलकण्ठं दयालं ।\nमृगाधीशचर्माम्बरं मुण्डमालं ।\nप्रियं शंकरं सर्वनाथं भजामि ॥',
        translit:
          'Calat-kuṇḍalaṁ bhrū sunetraṁ viśālaṁ, prasannānanaṁ nīlakaṇṭhaṁ dayālaṁ,\nmṛgādhīśa-carmāmbaraṁ muṇḍa-mālaṁ, priyaṁ śaṅkaraṁ sarvanāthaṁ bhajāmi.',
        meaning:
          'Earrings swinging, brows beautiful, eyes wide; a serene face, a blue throat, and compassion in all of it. Clothed in the lion’s skin, garlanded with skulls — beloved Shankara, Lord of all: Him I worship.',
      },
      {
        deva:
          'प्रचण्डं प्रकृष्टं प्रगल्भं परेशं ।\nअखण्डं अजं भानुकोटिप्रकाशं ।\nत्रयःशूल निर्मूलनं शूलपाणिं ।\nभजेऽहं भवानीपतिं भावगम्यं ॥',
        translit:
          'Pracaṇḍaṁ prakṛṣṭaṁ pragalbhaṁ pareśaṁ, akhaṇḍaṁ ajaṁ bhānu-koṭi-prakāśaṁ,\ntrayaḥ-śūla nirmūlanaṁ śūlapāṇiṁ, bhaje’haṁ bhavānī-patiṁ bhāva-gamyaṁ.',
        meaning:
          'Fierce, supreme, fearless, the highest Lord; undivided, unborn, blazing like a crore of suns. He who uproots the three sufferings, trident in hand — the husband of Bhavani, reached only through feeling. Him I worship.',
      },
      {
        deva:
          'कलातीत कल्याण कल्पान्तकारी ।\nसदा सज्जनानन्ददाता पुरारी ।\nचिदानन्द संदोह मोहापहारी ।\nप्रसीद प्रसीद प्रभो मन्मथारी ॥',
        translit:
          'Kalātīta kalyāṇa kalpānta-kārī, sadā sajjanānanda-dātā purārī,\ncidānanda sandoha mohāpahārī, prasīda prasīda prabho manmathārī.',
        meaning:
          'Beyond time, auspiciousness itself, who brings the ages to their end; always the giver of joy to the good, destroyer of the three cities. A mass of conscious bliss who steals delusion away — be gracious, be gracious, O Lord who burned desire.',
      },
      {
        deva:
          'न यावद् उमानाथ पादारविन्दं ।\nभजन्तीह लोके परे वा नराणां ।\nन तावत् सुखं शान्ति सन्तापनाशं ।\nप्रसीद प्रभो सर्वभूताधिवासं ॥',
        translit:
          'Na yāvad umānātha pādāravindaṁ, bhajantīha loke pare vā narāṇāṁ,\nna tāvat sukhaṁ śānti santāpa-nāśaṁ, prasīda prabho sarva-bhūtādhivāsaṁ.',
        meaning:
          'Until a person worships the lotus feet of Uma’s Lord — in this world or the next — there is no happiness, no peace, no end to burning. Be gracious, O Lord who dwells inside every living being.',
      },
      {
        deva:
          'न जानामि योगं जपं नैव पूजां ।\nनतोऽहं सदा सर्वदा शम्भु तुभ्यं ।\nजरा जन्म दुःखौघ तातप्यमानं ।\nप्रभो पाहि आपन्नमामीश शम्भो ॥',
        translit:
          'Na jānāmi yogaṁ japaṁ naiva pūjāṁ, nato’haṁ sadā sarvadā śambhu tubhyaṁ,\njarā janma duḥkhaugha tātapyamānaṁ, prabho pāhi āpannam-āmīśa śambho.',
        meaning:
          'I do not know yoga. I do not know japa. I do not know how to perform worship. I only know how to bow — always, and to you, Shambhu. Burning in the flood of birth, age and sorrow, I have fallen. Protect me, my Lord.',
      },
    ],
  },

  {
    id: 'lingashtakam',
    name: 'Lingashtakam',
    hi: 'लिङ्गाष्टकम्',
    by: 'Traditional',
    note: 'Eight verses, each ending: "to that Sadashiva Linga I bow."',
    minutes: 4,
    complete: true,
    verses: [
      {
        deva:
          'ब्रह्ममुरारि सुरार्चित लिङ्गं\nनिर्मलभासित शोभित लिङ्गम् ।\nजन्मज दुःख विनाशक लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Brahma-murāri surārcita liṅgaṁ, nirmala-bhāsita śobhita liṅgam,\njanmaja duḥkha vināśaka liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'The Linga worshipped by Brahma, Vishnu and the gods; shining with a spotless light; destroyer of the sorrow that comes with being born — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'देवमुनि प्रवरार्चित लिङ्गं\nकामदहन करुणाकर लिङ्गम् ।\nरावण दर्प विनाशन लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Devamuni pravarārcita liṅgaṁ, kāmadahana karuṇākara liṅgam,\nrāvaṇa darpa vināśana liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Worshipped by gods and the greatest sages; the burner of desire who is yet a mine of compassion; the breaker of Ravana’s pride — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'सर्व सुगन्ध सुलेपित लिङ्गं\nबुद्धि विवर्धन कारण लिङ्गम् ।\nसिद्ध सुरासुर वन्दित लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Sarva sugandha sulepita liṅgaṁ, buddhi vivardhana kāraṇa liṅgam,\nsiddha surāsura vandita liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Anointed with every fragrance; the cause that makes the intellect grow; saluted by the perfected ones, by gods and by demons alike — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'कनक महामणि भूषित लिङ्गं\nफणिपति वेष्टित शोभित लिङ्गम् ।\nदक्षसुयज्ञ विनाशन लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Kanaka mahāmaṇi bhūṣita liṅgaṁ, phaṇipati veṣṭita śobhita liṅgam,\ndakṣa-suyajña vināśana liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Adorned with gold and great gems; beautiful, encircled by the lord of serpents; the destroyer of Daksha’s proud sacrifice — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'कुङ्कुम चन्दन लेपित लिङ्गं\nपङ्कज हार सुशोभित लिङ्गम् ।\nसञ्चित पाप विनाशन लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Kuṅkuma candana lepita liṅgaṁ, paṅkaja hāra suśobhita liṅgam,\nsañcita pāpa vināśana liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Smeared with kumkum and sandalwood; lovely with a garland of lotuses; the destroyer of accumulated wrongdoing — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'देवगणार्चित सेवित लिङ्गं\nभावैर्भक्तिभिरेव च लिङ्गम् ।\nदिनकर कोटि प्रभाकर लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Devagaṇārcita sevita liṅgaṁ, bhāvair-bhaktibhir-eva ca liṅgam,\ndinakara koṭi prabhākara liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Served and worshipped by the hosts of gods — and worshipped equally by simple feeling and devotion; radiant as a crore of suns — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'अष्टदलोपरिवेष्टित लिङ्गं\nसर्वसमुद्भव कारण लिङ्गम् ।\nअष्टदरिद्र विनाशन लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Aṣṭadalopari-veṣṭita liṅgaṁ, sarva-samudbhava kāraṇa liṅgam,\naṣṭa-daridra vināśana liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Set upon the eight-petalled lotus; the cause from which everything arises; the destroyer of the eight forms of poverty — to that eternal Shiva Linga I bow.',
      },
      {
        deva:
          'सुरगुरु सुरवर पूजित लिङ्गं\nसुरवन फुल्ल सुपूजित लिङ्गम् ।\nपरात्परं परमात्मक लिङ्गं\nतत् प्रणमामि सदाशिव लिङ्गम् ॥',
        translit:
          'Suraguru suravara pūjita liṅgaṁ, suravana phulla supūjita liṅgam,\nparātparaṁ paramātmaka liṅgaṁ, tat praṇamāmi sadāśiva liṅgam.',
        meaning:
          'Worshipped by the guru of the gods and by the best of them; honoured with blossoms from the celestial groves; higher than the highest, the very Self — to that eternal Shiva Linga I bow.',
      },
    ],
  },

  {
    id: 'bilvashtakam',
    name: 'Bilvashtakam',
    hi: 'बिल्वाष्टकम्',
    by: 'Traditional',
    note: 'Sung while offering bilva (bael) leaves. Every verse ends: "one bilva leaf, offered to Shiva."',
    minutes: 3,
    complete: true,
    verses: [
      {
        deva:
          'त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम् ।\nत्रिजन्मपापसंहारं एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Tridalaṁ triguṇākāraṁ trinetraṁ ca triyāyudham,\ntrijanma-pāpa-saṁhāraṁ eka-bilvaṁ śivārpaṇam.',
        meaning:
          'Three leaves — the three qualities of nature; the three eyes; the three-pointed weapon. Destroyer of the wrongs of three lifetimes: one bilva leaf, offered to Shiva.',
      },
      {
        deva:
          'त्रिशाखैः बिल्वपत्रैश्च अच्छिद्रैः कोमलैः शुभैः ।\nतवपूजां करिष्यामि एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Triśākhaiḥ bilvapatraiśca acchidraiḥ komalaiḥ śubhaiḥ,\ntava-pūjāṁ kariṣyāmi eka-bilvaṁ śivārpaṇam.',
        meaning:
          'With three-lobed bilva leaves — unbroken, tender, auspicious — I will perform your worship: one bilva leaf, offered to Shiva.',
      },
      {
        deva:
          'अखण्ड बिल्व पत्रेण पूजिते नन्दिकेश्वरे ।\nशुद्ध्यन्ति सर्वपापेभ्यो एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Akhaṇḍa bilva patreṇa pūjite nandikeśvare,\nśuddhyanti sarva-pāpebhyo eka-bilvaṁ śivārpaṇam.',
        meaning:
          'When the Lord of Nandi is worshipped with a whole, unbroken bilva leaf, one is cleansed of every wrong: one bilva leaf, offered to Shiva.',
      },
      {
        deva:
          'शालिग्राम शिलामेकां विप्राणां जातु अर्पयेत् ।\nसोमयज्ञ महापुण्यं एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Śāligrāma śilām-ekāṁ viprāṇāṁ jātu arpayet,\nsomayajña mahāpuṇyaṁ eka-bilvaṁ śivārpaṇam.',
        meaning:
          'The merit of gifting a shaligrama stone, the great merit of the Soma sacrifice — all of it is in this: one bilva leaf, offered to Shiva.',
      },
      {
        deva:
          'दन्ति कोटि सहस्राणि वाजपेय शतानि च ।\nकोटिकन्या महादानं एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Danti koṭi sahasrāṇi vājapeya śatāni ca,\nkoṭi-kanyā mahādānaṁ eka-bilvaṁ śivārpaṇam.',
        meaning:
          'Ten billion elephants given away, a hundred Vajapeya sacrifices, the greatest of gifts — one bilva leaf, offered to Shiva, equals them.',
      },
      {
        deva:
          'लक्ष्म्याः स्तनत उत्पन्नं महादेवस्य च प्रियम् ।\nबिल्ववृक्षं प्रयच्छामि एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Lakṣmyāḥ stanata utpannaṁ mahādevasya ca priyam,\nbilva-vṛkṣaṁ prayacchāmi eka-bilvaṁ śivārpaṇam.',
        meaning:
          'Born of Lakshmi herself and dear to Mahadeva — I offer the bilva tree: one bilva leaf, offered to Shiva.',
      },
      {
        deva:
          'दर्शनं बिल्ववृक्षस्य स्पर्शनं पापनाशनम् ।\nअघोरपापसंहारं एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Darśanaṁ bilva-vṛkṣasya sparśanaṁ pāpa-nāśanam,\naghora-pāpa-saṁhāraṁ eka-bilvaṁ śivārpaṇam.',
        meaning:
          'To see the bilva tree, to touch it, ends wrongdoing; it destroys even the most terrible faults: one bilva leaf, offered to Shiva.',
      },
      {
        deva:
          'काशीक्षेत्र निवासं च कालभैरव दर्शनम् ।\nप्रयागे माधवं दृष्ट्वा एकबिल्वं शिवार्पणम् ॥',
        translit:
          'Kāśī-kṣetra nivāsaṁ ca kālabhairava darśanam,\nprayāge mādhavaṁ dṛṣṭvā eka-bilvaṁ śivārpaṇam.',
        meaning:
          'To live in Kashi, to behold Kala Bhairava, to see Madhava at Prayaga — all of that fruit is here: one bilva leaf, offered to Shiva.',
      },
    ],
  },

  {
    id: 'nirvana-shatakam',
    name: 'Nirvana Shatakam',
    hi: 'निर्वाण षट्कम्',
    by: 'Adi Shankaracharya',
    note: 'Six verses of pure negation, each ending "Shivo’ham — I am Shiva."',
    minutes: 4,
    complete: true,
    verses: [
      {
        deva:
          'मनो बुद्ध्यहङ्कार चित्तानि नाहं\nन च श्रोत्रजिह्वे न च घ्राणनेत्रे ।\nन च व्योम भूमिर्न तेजो न वायुः\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        translit:
          'Mano-buddhy-ahaṅkāra cittāni nāhaṁ, na ca śrotra-jihve na ca ghrāṇa-netre,\nna ca vyoma bhūmir-na tejo na vāyuḥ, cidānanda-rūpaḥ śivo’ham śivo’ham.',
        meaning:
          'I am not mind, intellect, ego or memory. Not ear or tongue, not nose or eye. Not space, earth, fire or air. I am the form of consciousness and bliss — I am Shiva, I am Shiva.',
      },
      {
        deva:
          'न च प्राणसंज्ञो न वै पञ्चवायुः\nन वा सप्तधातुर्न वा पञ्चकोशः ।\nन वाक्पाणिपादं न चोपस्थपायु\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        translit:
          'Na ca prāṇa-saṁjño na vai pañcavāyuḥ, na vā saptadhātur-na vā pañcakośaḥ,\nna vāk-pāṇi-pādaṁ na copastha-pāyu, cidānanda-rūpaḥ śivo’ham śivo’ham.',
        meaning:
          'I am not the life-breath, nor the five vital airs; not the seven tissues, not the five sheaths; not speech, hand or foot, nor any organ. I am consciousness and bliss — I am Shiva, I am Shiva.',
      },
      {
        deva:
          'न मे द्वेषरागौ न मे लोभमोहौ\nमदो नैव मे नैव मात्सर्यभावः ।\nन धर्मो न चार्थो न कामो न मोक्षः\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        translit:
          'Na me dveṣa-rāgau na me lobha-mohau, mado naiva me naiva mātsarya-bhāvaḥ,\nna dharmo na cārtho na kāmo na mokṣaḥ, cidānanda-rūpaḥ śivo’ham śivo’ham.',
        meaning:
          'I have no hatred or attachment, no greed or delusion, no pride, no envy. I am not duty, not wealth, not desire, not even liberation. I am consciousness and bliss — I am Shiva, I am Shiva.',
      },
      {
        deva:
          'न पुण्यं न पापं न सौख्यं न दुःखं\nन मन्त्रो न तीर्थं न वेदा न यज्ञाः ।\nअहं भोजनं नैव भोज्यं न भोक्ता\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        translit:
          'Na puṇyaṁ na pāpaṁ na saukhyaṁ na duḥkhaṁ, na mantro na tīrthaṁ na vedā na yajñāḥ,\nahaṁ bhojanaṁ naiva bhojyaṁ na bhoktā, cidānanda-rūpaḥ śivo’ham śivo’ham.',
        meaning:
          'Not merit, not sin; not pleasure, not pain. Not mantra, not pilgrimage, not the Vedas, not sacrifice. I am not the eating, the eaten, or the eater. I am consciousness and bliss — I am Shiva, I am Shiva.',
      },
      {
        deva:
          'न मे मृत्युशङ्का न मे जातिभेदः\nपिता नैव मे नैव माता न जन्म ।\nन बन्धुर्न मित्रं गुरुर्नैव शिष्यः\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        translit:
          'Na me mṛtyu-śaṅkā na me jāti-bhedaḥ, pitā naiva me naiva mātā na janma,\nna bandhur-na mitraṁ gurur-naiva śiṣyaḥ, cidānanda-rūpaḥ śivo’ham śivo’ham.',
        meaning:
          'I have no fear of death, no distinction of birth. No father, no mother, no being born. No relative, no friend, no teacher and no student. I am consciousness and bliss — I am Shiva, I am Shiva.',
      },
      {
        deva:
          'अहं निर्विकल्पो निराकाररूपो\nविभुत्वाच्च सर्वत्र सर्वेन्द्रियाणाम् ।\nन चासङ्गतं नैव मुक्तिर्न मेयः\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम् ॥',
        translit:
          'Ahaṁ nirvikalpo nirākāra-rūpo, vibhutvācca sarvatra sarvendriyāṇām,\nna cāsaṅgataṁ naiva muktir-na meyaḥ, cidānanda-rūpaḥ śivo’ham śivo’ham.',
        meaning:
          'I am without alternatives, without form; being all-pervading, I am everywhere and in every sense. I am neither bound nor liberated nor measurable. I am consciousness and bliss — I am Shiva, I am Shiva.',
      },
    ],
  },

  {
    id: 'shiv-tandav',
    name: 'Shiv Tandav Stotram',
    hi: 'शिव ताण्डव स्तोत्रम्',
    by: 'Ravana',
    note:
      'Composed by Ravana beneath Kailash. These are the opening five of the sixteen verses — the ones most commonly recited.',
    minutes: 4,
    complete: false,
    verses: [
      {
        deva:
          'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥',
        translit:
          'Jaṭāṭavī-galaj-jala-pravāha-pāvita-sthale\ngale’valambya lambitāṁ bhujaṅga-tuṅga-mālikām,\ndamad-damad-damad-daman-ninnāda-vaḍ-ḍamarvayaṁ\ncakāra caṇḍa-tāṇḍavaṁ tanotu naḥ śivaḥ śivam.',
        meaning:
          'From the forest of His matted hair the sacred water streams and sanctifies the ground; a tall garland of serpents hangs at His throat. To the damaru sounding damad-damad-damad-daman He danced the furious Tandava — may that Shiva spread auspiciousness upon us.',
      },
      {
        deva:
          'जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी\nविलोलवीचिवल्लरीविराजमानमूर्धनि ।\nधगद्धगद्धगज्ज्वलल्ललाटपट्टपावके\nकिशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥',
        translit:
          'Jaṭā-kaṭāha-sambhrama-bhraman-nilimpa-nirjharī\nvilola-vīci-vallarī-virājamāna-mūrdhani,\ndhagad-dhagad-dhagaj-jvalal-lalāṭa-paṭṭa-pāvake\nkiśora-candra-śekhare ratiḥ pratikṣaṇaṁ mama.',
        meaning:
          'The celestial river whirls and swirls through the cauldron of His matted locks; its restless waves crown His head like a creeper. On His forehead the fire blazes dhagad-dhagad, and the young moon rests above. In Him, at every instant, is my delight.',
      },
      {
        deva:
          'धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर\nस्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे ।\nकृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि\nक्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥',
        translit:
          'Dharādharendra-nandinī-vilāsa-bandhu-bandhura\nsphurad-diganta-santati-pramodamāna-mānase,\nkṛpā-kaṭākṣa-dhoraṇī-niruddha-durdharāpadi\nkvacid-digambare mano vinodam-etu vastuni.',
        meaning:
          'He is the beautiful companion in the play of the mountain-king’s daughter; His mind delights in the endless shining horizons. His stream of merciful glances holds back even unbearable calamity. May my mind find its joy in that One clothed in the directions.',
      },
      {
        deva:
          'जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा\nकदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे ।\nमदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे\nमनो विनोदमद्भुतं बिभर्तु भूतभर्तरि ॥',
        translit:
          'Jaṭā-bhujaṅga-piṅgala-sphurat-phaṇā-maṇi-prabhā\nkadamba-kuṅkuma-drava-pralipta-digvadhū-mukhe,\nmadāndha-sindhura-sphurat-tvag-uttarīya-medure\nmano vinodam-adbhutaṁ bibhartu bhūta-bhartari.',
        meaning:
          'The tawny serpents in His hair flash the light of the jewels on their hoods, painting the faces of the maidens of the directions with saffron. He is wrapped in the hide of the maddened elephant. May my mind hold a wondrous joy in Him, the sustainer of all beings.',
      },
      {
        deva:
          'सहस्रलोचनप्रभृत्यशेषलेखशेखर\nप्रसूनधूलिधोरणी विधूसराङ्घ्रिपीठभूः ।\nभुजङ्गराजमालया निबद्धजाटजूटक\nश्रियै चिराय जायतां चकोरबन्धुशेखरः ॥',
        translit:
          'Sahasra-locana-prabhṛty-aśeṣa-lekha-śekhara\nprasūna-dhūli-dhoraṇī vidhūsarāṅghri-pīṭha-bhūḥ,\nbhujaṅga-rāja-mālayā nibaddha-jāṭa-jūṭaka\nśriyai cirāya jāyatāṁ cakora-bandhu-śekharaḥ.',
        meaning:
          'The footstool where He rests is grey with the pollen fallen from the crowns of all the gods — thousand-eyed Indra among them — as they bow. His matted crown is bound with a garland of the serpent king. May He who wears the moon bring lasting prosperity.',
      },
    ],
  },
];

export const AARTIS = [
  {
    id: 'om-jai-shiv-omkara',
    name: 'Om Jai Shiv Omkara',
    hi: 'ॐ जय शिव ओंकारा',
    by: 'Pandit Shivanand Swami',
    note: 'The aarti sung in almost every Shiva temple in India at dawn and dusk.',
    minutes: 5,
    complete: true,
    refrain: 'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा ।',
    verses: [
      {
        deva:
          'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा ।\nब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा ॥',
        meaning:
          'Victory to Shiva, the Omkara. Brahma, Vishnu and Sadashiva — and He who holds the Goddess as half of Himself.',
      },
      {
        deva:
          'एकानन चतुरानन पंचानन राजे ।\nहंसासन गरुड़ासन वृषवाहन साजे ॥',
        meaning:
          'One-faced, four-faced, five-faced — so He reigns. Seated on the swan, on Garuda, riding the bull: all three forms are adorned as one.',
      },
      {
        deva:
          'दो भुज चार चतुर्भुज दसभुज ते सोहे ।\nतीनों रूप निरखता त्रिभुवन जन मोहे ॥',
        meaning:
          'Two arms, four arms, ten arms — each beautiful. Seeing these three forms, all three worlds are enchanted.',
      },
      {
        deva:
          'अक्षमाला वनमाला मुण्डमाला धारी ।\nत्रिपुरारी कंसारी कर माला धारी ॥',
        meaning:
          'Wearing the rosary, the forest garland, the garland of skulls. Destroyer of Tripura, destroyer of Kansa — the garland is in His hand.',
      },
      {
        deva:
          'श्वेताम्बर पीताम्बर बाघम्बर अंगे ।\nसनकादिक गरुणादिक भूतादिक संगे ॥',
        meaning:
          'White cloth, yellow cloth, tiger skin upon the body. Sanaka and the sages, Garuda and the birds, the ganas and spirits — all keep His company.',
      },
      {
        deva:
          'कर के मध्य कमंडलु चक्र त्रिशूलधारी ।\nसुखकारी दुखहारी जगपालनकारी ॥',
        meaning:
          'In His hands the water-pot, the discus, the trident. Giver of ease, remover of grief, sustainer of the world.',
      },
      {
        deva:
          'ब्रह्मा विष्णु सदाशिव जानत अविवेका ।\nप्रणवाक्षर के मध्ये ये तीनों एका ॥',
        meaning:
          'Only the undiscerning see Brahma, Vishnu and Sadashiva as separate. Within the syllable Om, these three are one.',
      },
      {
        deva:
          'त्रिगुणस्वामी जी की आरति जो कोई नर गावे ।\nकहत शिवानंद स्वामी सुख संपत्ति पावे ॥',
        meaning:
          'Whoever sings this aarti to the Lord of the three qualities — says Shivanand Swami — receives happiness and abundance.',
      },
    ],
  },
];
