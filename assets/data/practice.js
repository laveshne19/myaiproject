/* Shiv AI — observances and how to actually do them at home. */

export const FESTIVALS = [
  {
    id: 'mahashivaratri',
    name: 'Maha Shivaratri',
    hi: 'महाशिवरात्रि',
    when: 'Chaturdashi of the dark fortnight in Magha/Phalguna — February or March',
    tag: 'The great night',
    text:
      'The night Shiva is said to have performed the Tandava, and the night He married Parvati, and the night the Lingodbhava pillar appeared — the tradition stacks all of it onto one date because this is the night the northern hemisphere gives a human body a natural upward energy.\n\nUnlike almost every other Hindu festival, it is observed at night and by staying awake. There are four prahars (watches), and the devout perform abhishek in each: milk in the first, curd in the second, ghee in the third, honey in the fourth.',
    how: [
      'Fast from sunrise — full (nirjala), or fruit and milk if your health requires. Do not fast if you are diabetic, pregnant, unwell or on medication that needs food.',
      'Bathe and visit a Shiva temple in the evening, or set up at home.',
      'Perform abhishek with water, then milk, then water again. Offer bilva leaves, white flowers, bhasma, dhatura if available.',
      'Stay awake. Chant Om Namah Shivaya, recite the Rudrashtakam and the Shiv Tandav Stotram, sit in silence between the watches.',
      'Break the fast the next morning after the sunrise aarti.',
    ],
  },
  {
    id: 'shravan',
    name: 'Shravan / Sawan',
    hi: 'श्रावण',
    when: 'The lunar month of Shravan — roughly July to August',
    tag: 'Shiva’s month',
    text:
      'The monsoon month, and the most important stretch of the Shaiva year. It is said the Samudra Manthan happened in Shravan, which is why the month belongs to the one who drank the poison. Every Monday (Shravan Somvar) is a fast day, and the whole of north India turns saffron with kanwariyas — pilgrims walking barefoot with Ganga water on a shoulder-pole to pour over a Jyotirlinga.',
    how: [
      'Observe Somvar vrat — fast on Mondays, eat once after the evening worship.',
      'Perform jalabhishek: pour water over the linga slowly, chanting Om Namah Shivaya.',
      'Offer bilva leaves; the tradition says a single one given in Shravan carries the weight of a hundred.',
      'Unmarried women traditionally observe the sixteen Mondays (Solah Somvar) vrat.',
    ],
  },
  {
    id: 'pradosh',
    name: 'Pradosh Vrat',
    hi: 'प्रदोष व्रत',
    when: 'Trayodashi — the thirteenth tithi — twice each lunar month',
    tag: 'The twilight hour',
    text:
      'Pradosh is the hour and a half around sunset on Trayodashi, and the tradition holds that Shiva dances between Nandi’s horns at that time. It is the day the gods brought Him the poison, and the day He accepted it. Saturday Pradosh (Shani Pradosh) is considered the most powerful, particularly for those under difficult planetary periods.',
    how: [
      'Fast through the day; break it after the evening worship.',
      'Bathe before sunset and worship in the pradosh window — roughly 1.5 hours around sunset.',
      'Abhishek with water and milk; offer bilva, incense, a ghee lamp.',
      'Recite the Shiva Panchakshara Stotram or Mahamrityunjaya 108 times.',
    ],
  },
  {
    id: 'masik-shivaratri',
    name: 'Masik Shivaratri',
    hi: 'मासिक शिवरात्रि',
    when: 'Chaturdashi of the dark fortnight, every lunar month',
    tag: 'The monthly night',
    text:
      'Maha Shivaratri’s smaller monthly counterpart. Same night in the lunar cycle, every month of the year. For most householders this is the sustainable practice — twelve nights a year rather than one, and no less regarded.',
    how: [
      'A light fast, or simply one satvik meal.',
      'Night worship: a ghee lamp, water, bilva, and 108 repetitions of Om Namah Shivaya.',
      'Sit in silence for as long as you can manage after.',
    ],
  },
  {
    id: 'kanwar',
    name: 'Kanwar Yatra',
    hi: 'कांवड़ यात्रा',
    when: 'Through Shravan, peaking on Shravan Shivaratri',
    tag: 'The walk',
    text:
      'Millions walk — many barefoot — from Haridwar, Gaumukh, Gangotri or Sultanganj carrying Ganga water in pots slung from a decorated pole, to pour it over a Shiva linga. The Sultanganj-to-Deoghar route is 105 km and is completed without setting the kanwar down on the ground. It is one of the largest annual human gatherings anywhere, and it is entirely voluntary and entirely unorganised at its core.',
    how: [
      'Take a sankalp (resolve) before starting, and keep it simple and honest.',
      'The kanwar must not touch the ground; use stands at rest points.',
      'Vegetarian food, no intoxicants, bathe before handling the pots.',
      'Walk within your body’s capacity. The vow is not worth a hospital.',
    ],
  },
  {
    id: 'guru-purnima',
    name: 'Guru Purnima',
    hi: 'गुरु पूर्णिमा',
    when: 'Full moon of Ashadha — June or July',
    tag: 'The first teaching',
    text:
      'Remembered in the Shaiva tradition as the day Adiyogi finally turned to the seven sages who had waited eighty-four years, and began to teach — becoming Adi Guru, the first teacher. Elsewhere it honours Veda Vyasa. Both readings honour the transmission itself.',
    how: [
      'Honour a teacher — a real one, in person or in memory, not an abstraction.',
      'Sit in silence at dawn.',
      'Begin something you have been meaning to learn. That is the actual observance.',
    ],
  },
  {
    id: 'nag-panchami',
    name: 'Nag Panchami',
    hi: 'नाग पंचमी',
    when: 'Fifth tithi of the bright fortnight of Shravan',
    tag: 'The serpents',
    text:
      'Serpents are honoured, and Shiva wears Vasuki at His throat. Milk is offered at snake images and anthills. In practice, please offer it at a stone image — pouring milk on live snakes harms them, and several states now discourage the practice for exactly that reason.',
    how: [
      'Offer milk and flowers at a nag image or a Shiva linga.',
      'Recite the Nageshwar or Mahamrityunjaya mantra.',
      'Do not disturb, capture or feed live snakes.',
    ],
  },
  {
    id: 'kartik-purnima',
    name: 'Kartik Purnima / Tripurari Purnima',
    hi: 'कार्तिक पूर्णिमा',
    when: 'Full moon of Kartik — November',
    tag: 'The night of the three cities',
    text:
      'The night Shiva destroyed Tripura, and so He is called Tripurari. Also Dev Deepawali in Kashi, when the ghats of Varanasi are lit end to end with lamps and the whole river turns into light.',
    how: [
      'Light lamps at dusk — as many as you can, in a row.',
      'Bathe in a river at dawn if you can reach one.',
      'Recite the Shiv Tandav Stotram.',
    ],
  },
];

export const PUJA = {
  intro:
    'None of this is required. Shiva accepted a bilva leaf from a hunter who did not know he was worshipping. But if you want a form to hold, this is the ordinary household form.',
  steps: [
    { n: 1, name: 'Snana — bathe', text: 'Bathe before worship. Clean clothes. Face east or north if you can. This is not superstition; it is a signal to your own attention that something different is starting.' },
    { n: 2, name: 'Deepa — the lamp', text: 'Light a ghee or oil lamp. A single wick is enough. Light it first and put it out last.' },
    { n: 3, name: 'Sankalpa — the resolve', text: 'Say, in your own language, who you are and what this worship is for. Out loud, once. Vagueness here is why so much practice goes nowhere.' },
    { n: 4, name: 'Abhishek — the pouring', text: 'Pour over the linga in this order: water, milk, curd, ghee, honey, sugar (panchamrit), then water again to close. Pour slowly. Chant Om Namah Shivaya throughout. If you have only water, use only water — this is genuinely fine.' },
    { n: 5, name: 'Bilva patra', text: 'Offer bilva leaves with the smooth side down, three lobes intact and unbroken. Even one is sufficient. Bilva is the one offering the texts will not let you substitute.' },
    { n: 6, name: 'Bhasma & chandan', text: 'Three horizontal lines of vibhuti on the forehead — the tripundra — and sandal paste. Ash for what ends, sandalwood for what cools.' },
    { n: 7, name: 'Naivedya — the offering', text: 'Fruit, milk, or anything satvik you would eat yourself. Do not offer what you would not eat.' },
    { n: 8, name: 'Aarti', text: 'Om Jai Shiv Omkara, lamp circling clockwise. Then Karpura Gauram to close.' },
    { n: 9, name: 'Japa & silence', text: '108 repetitions of Om Namah Shivaya on a rudraksha mala. Then sit still for as long as you can. The silence after is the actual worship; the rest was preparation.' },
  ],
  offer: [
    { yes: true, item: 'Bilva (bael) leaves', why: 'The single most beloved offering. Three lobes, unbroken, smooth side down.' },
    { yes: true, item: 'Water & milk', why: 'The essential abhishek. Cold water in summer especially — He drank poison; the tradition keeps trying to cool Him.' },
    { yes: true, item: 'Bhasma / vibhuti', why: 'Sacred ash. Three lines on the forehead.' },
    { yes: true, item: 'White flowers, dhatura, aak', why: 'Datura and calotropis are His — plants no other deity is offered.' },
    { yes: true, item: 'Rudraksha, bhang, honey, sugarcane', why: 'All traditional and all accepted.' },
    { yes: false, item: 'Tulsi leaves', why: 'Tulsi is Vishnu’s. The Puranas tell of Vrinda, whose devotion made her sacred to Vishnu; she is not offered to Shiva.' },
    { yes: false, item: 'Ketaki (kewda) flower', why: 'Cursed by Shiva for falsely witnessing Brahma’s claim to have reached the top of the pillar of fire.' },
    { yes: false, item: 'Turmeric & kumkum on the linga', why: 'Haldi and kumkum are associated with saubhagya and the Goddess; the linga receives bhasma and chandan instead. (Kumkum is offered to Parvati beside Him.)' },
    { yes: false, item: 'Coconut water for abhishek', why: 'Coconut is offered whole and broken as prasad, but its water is not traditionally used for abhishek in most lineages.' },
    { yes: false, item: 'Champa & broken rice', why: 'Champa is cursed in the Shiva Purana; akshat offered to Shiva should be whole, unbroken grains.' },
  ],
  note:
    'Regional lineages differ, sometimes sharply. If your family does it another way, your family is not wrong — follow the tradition you were given.',
};
