/* Shiv AI — Mantra corpus.
   Each entry: sacred text in Devanagari, IAST-style transliteration, plain-English
   meaning, traditional japa count, and the intention it is chanted for.
   Sources are the traditional Vedic / Puranic corpus, which is in the public domain. */

export const MANTRAS = [
  {
    id: 'panchakshara',
    name: 'Om Namah Shivaya',
    hi: 'ॐ नमः शिवाय',
    deva: 'ॐ नमः शिवाय',
    translit: 'Oṁ Namaḥ Śivāya',
    tag: 'Panchakshara — the five syllables',
    count: 108,
    seconds: 4,
    meaning:
      'I bow to Shiva — the auspicious one, the innermost Self. The five syllables Na-Ma-Śi-Vā-Ya hold the five elements: earth, water, fire, air and ether. To chant them is to bow to the whole of creation, and to the awareness that watches it.',
    benefit: 'Purification, steadiness of mind, protection. The mantra for every hour and every state.',
    intent: 'peace',
  },
  {
    id: 'mahamrityunjaya',
    name: 'Mahamrityunjaya Mantra',
    hi: 'महामृत्युंजय मंत्र',
    deva:
      'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
    translit:
      'Oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam,\nurvārukam-iva bandhanān mṛtyor-mukṣīya māmṛtāt.',
    tag: 'Rigveda 7.59.12 — the great death-conquering verse',
    count: 108,
    seconds: 11,
    meaning:
      'We worship the three-eyed one, fragrant, who nourishes all beings. As the ripe cucumber is freed from its stem, may He free us from death — but not from immortality. It does not ask to escape dying. It asks to be released the way ripe fruit releases: naturally, completely, without being torn.',
    benefit: 'Healing, courage in illness, protection for someone you love, release from fear of endings.',
    intent: 'healing',
  },
  {
    id: 'rudra',
    name: 'Om Namo Bhagavate Rudraya',
    hi: 'ॐ नमो भगवते रुद्राय',
    deva: 'ॐ नमो भगवते रुद्राय',
    translit: 'Oṁ Namo Bhagavate Rudrāya',
    tag: 'The eight-syllable Rudra mantra',
    count: 108,
    seconds: 5,
    meaning:
      'Salutations to the Lord Rudra — the fierce, the one who removes suffering by roaring it away. Rudra is not cruelty; Rudra is the force that will not let a lie stand.',
    benefit: 'Strength when you must face something hard. Burning off inertia, fear and stagnation.',
    intent: 'strength',
  },
  {
    id: 'shiva-gayatri',
    name: 'Shiva Gayatri',
    hi: 'शिव गायत्री',
    deva: 'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि ।\nतन्नो रुद्रः प्रचोदयात् ॥',
    translit: 'Oṁ tatpuruṣāya vidmahe mahādevāya dhīmahi,\ntanno rudraḥ pracodayāt.',
    tag: 'The Gayatri addressed to Mahadeva',
    count: 108,
    seconds: 7,
    meaning:
      'We know that Supreme Person; we meditate on the Great God. May Rudra illumine our understanding. It is a prayer not for things, but for clear seeing.',
    benefit: 'Clarity in decisions, discernment, study and concentration.',
    intent: 'wisdom',
  },
  {
    id: 'karpura',
    name: 'Karpura Gauram (Dhyana Mantra)',
    hi: 'कर्पूरगौरं',
    deva:
      'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम् ।\nसदा वसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥',
    translit:
      'Karpūra-gauraṁ karuṇāvatāraṁ saṁsāra-sāraṁ bhujagendra-hāram,\nsadā vasantaṁ hṛdayāravinde bhavaṁ bhavānī-sahitaṁ namāmi.',
    tag: 'Chanted at the close of aarti',
    count: 21,
    seconds: 12,
    meaning:
      'White as camphor, compassion itself in form, the essence of all existence, garlanded with the king of serpents — to Him who dwells always in the lotus of the heart, together with Bhavani, I bow.',
    benefit: 'Closing a prayer, settling the heart before sleep, ending the day cleanly.',
    intent: 'peace',
  },
  {
    id: 'aghora',
    name: 'Aghora Mantra',
    hi: 'अघोर मंत्र',
    deva:
      'ॐ अघोरेभ्यो अथ घोरेभ्यो घोरघोरतरेभ्यः ।\nसर्वेभ्यः सर्वशर्वेभ्यो नमस्ते अस्तु रुद्ररूपेभ्यः ॥',
    translit:
      'Oṁ aghorebhyo atha ghorebhyo ghora-ghoratarebhyaḥ,\nsarvebhyaḥ sarva-śarvebhyo namaste astu rudra-rūpebhyaḥ.',
    tag: 'From the Aghora face of Shiva',
    count: 21,
    seconds: 12,
    meaning:
      'To the non-terrible and to the terrible, to the more terrible than terrible, to all forms, to all of Sharva — salutations to every form of Rudra. It refuses to worship only the pleasant face of God.',
    benefit: 'Facing what you have been avoiding. Making peace with the fierce side of life.',
    intent: 'strength',
  },
  {
    id: 'shanti',
    name: 'Shanti Mantra',
    hi: 'शांति मंत्र',
    deva: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिः ।\nॐ शान्तिः शान्तिः शान्तिः ॥',
    translit:
      'Oṁ dyauḥ śāntir antarikṣaṁ śāntiḥ pṛthivī śāntiḥ,\nOṁ śāntiḥ śāntiḥ śāntiḥ.',
    tag: 'Yajurveda — peace invocation',
    count: 11,
    seconds: 10,
    meaning:
      'Peace in the heavens, peace in the space between, peace on the earth. Peace, peace, peace. The three repetitions are for the three sources of disturbance: what the world does to you, what other beings do to you, and what you do to yourself.',
    benefit: 'Anxiety, restlessness, a mind that will not stop. Chant before sleep.',
    intent: 'peace',
  },
  {
    id: 'bhairava',
    name: 'Batuk Bhairava Mantra',
    hi: 'बटुक भैरव मंत्र',
    deva: 'ॐ ह्रीं बटुकाय आपदुद्धारणाय कुरु कुरु बटुकाय ह्रीं ॐ नमः शिवाय',
    translit: 'Oṁ hrīṁ baṭukāya āpaduddhāraṇāya kuru kuru baṭukāya hrīṁ Oṁ namaḥ śivāya',
    tag: 'To Bhairava, the guardian form',
    count: 108,
    seconds: 8,
    meaning:
      'To Batuk Bhairava, remover of calamity — act, act. Bhairava is the doorkeeper: the form of Shiva that stands at the threshold and does not let harm walk in behind you.',
    benefit: 'Protection while travelling, during a crisis, when you feel unsafe.',
    intent: 'protection',
  },
  {
    id: 'omkara',
    name: 'Om (Pranava)',
    hi: 'ॐ',
    deva: 'ॐ',
    translit: 'Oṁ',
    tag: 'The seed of all mantra',
    count: 108,
    seconds: 8,
    meaning:
      'A-U-M: waking, dreaming, deep sleep — and the silence after the sound, which is the fourth. Shiva is called Omkareshwara, the lord of this syllable. Do not chant it fast. Let the hum outlast the voice.',
    benefit: 'Deep meditation, steadying the breath, entering silence.',
    intent: 'peace',
  },
  {
    id: 'shivoham',
    name: 'Shivoham',
    hi: 'शिवोऽहम्',
    deva: 'शिवोऽहम् शिवोऽहम्',
    translit: 'Śivo’ham, Śivo’ham',
    tag: 'From Adi Shankaracharya’s Nirvana Shatakam',
    count: 108,
    seconds: 5,
    meaning:
      'I am Shiva. Not "I worship Shiva" — I am That. This is the boldest line in the tradition: the auspicious consciousness you are looking for is not elsewhere, and never was.',
    benefit: 'Self-worth, dissolving the sense of being small, non-dual meditation.',
    intent: 'wisdom',
  },
];

export const INTENTS = [
  { id: 'peace', label: 'Peace', hi: 'शांति' },
  { id: 'healing', label: 'Healing', hi: 'आरोग्य' },
  { id: 'strength', label: 'Strength', hi: 'शक्ति' },
  { id: 'wisdom', label: 'Wisdom', hi: 'ज्ञान' },
  { id: 'protection', label: 'Protection', hi: 'रक्षा' },
];
