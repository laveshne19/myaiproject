/* Shiv AI — the knowledge base: who Shiva is, the forms He takes,
   what every symbol on His body means, and who stands around Him.
   Drawn from the Shiva Purana, Linga Purana, Skanda Purana, the Mahabharata
   and the living temple tradition. */

export const FACES = [
  {
    id: 'sadyojata',
    name: 'Sadyojata',
    hi: 'सद्योजात',
    dir: 'West',
    element: 'Earth',
    power: 'Creation',
    text:
      'The face turned west — "born at once". This is Shiva as the sudden appearance of things: the child, the seed breaking, the idea that was not there a moment ago. Its element is earth, the most stubborn and most fertile. When people say creation is slow, this face disagrees. Creation is instantaneous; only preparation is slow.',
  },
  {
    id: 'vamadeva',
    name: 'Vamadeva',
    hi: 'वामदेव',
    dir: 'North',
    element: 'Water',
    power: 'Preservation',
    text:
      'The face turned north — the beautiful, the left-handed, the healer. This is Shiva as the one who keeps things alive: water, medicine, motherhood, patience. Vamadeva is the aspect people meet when something they thought was ruined slowly repairs itself.',
  },
  {
    id: 'aghora',
    name: 'Aghora',
    hi: 'अघोर',
    dir: 'South',
    element: 'Fire',
    power: 'Dissolution & renewal',
    text:
      'The face turned south — "not terrible", which is exactly what you call something terrible when you have made peace with it. Aghora is the cremation-ground face: fire, decay, the honest look at what ends. It does not destroy out of anger. It destroys because nothing new can stand where the old refuses to fall.',
  },
  {
    id: 'tatpurusha',
    name: 'Tatpurusha',
    hi: 'तत्पुरुष',
    dir: 'East',
    element: 'Air',
    power: 'Concealing grace',
    text:
      'The face turned east — "that Person". This is the face of veiling, and the tradition insists that veiling is also grace. If you saw the whole of reality at once you could not function. Tatpurusha is the mercy of not being shown everything before you are ready.',
  },
  {
    id: 'ishana',
    name: 'Ishana',
    hi: 'ईशान',
    dir: 'Upward — the zenith',
    element: 'Ether',
    power: 'Revealing grace',
    text:
      'The fifth face, looking up, which most images never show. Ishana is the sky-element, the unbounded, the face of revelation. The other four face the world; this one faces what has no direction. It is why the Shivalinga is worshipped as formless — the highest face cannot be carved.',
  },
];

export const FORMS = [
  {
    id: 'nataraja',
    name: 'Nataraja',
    hi: 'नटराज',
    tag: 'Lord of the dance',
    icon: 'nataraja',
    text:
      'Shiva dances the Ananda Tandava inside a ring of fire. Four arms: one damaru sounding creation into being, one flame that will end it, one raised palm saying "do not fear", one pointing to the lifted foot — refuge. Beneath the other foot lies Apasmara, the dwarf of forgetfulness. Shiva pins him down but never kills him, because ignorance is not to be annihilated; it is to be stood upon while you keep dancing. The ring of fire is the universe. The still face at the centre of all that motion is the whole teaching.',
    where: 'Chidambaram, Tamil Nadu — the temple of the Akasha (ether) linga.',
  },
  {
    id: 'ardhanarishvara',
    name: 'Ardhanarishvara',
    hi: 'अर्धनारीश्वर',
    tag: 'Half woman, half god',
    icon: 'ardha',
    text:
      'One body, split down the middle: the right is Shiva — ash, matted hair, tiger skin; the left is Parvati — silk, anklet, curved hip. Not two beings embracing. One being. The form arose when the sage Bhringi tried to circumambulate Shiva alone, refusing to honour the Goddess; Shiva merged with her so that no one could walk between them again. Consciousness without energy cannot move; energy without consciousness has no direction. Every Indian household knows this arithmetic even when it forgets the theology.',
    where: 'Ardhanarishvara shrines across India; famously carved at Elephanta Caves, Mumbai.',
  },
  {
    id: 'dakshinamurthy',
    name: 'Dakshinamurthy',
    hi: 'दक्षिणामूर्ति',
    tag: 'The teacher who says nothing',
    icon: 'guru',
    text:
      'Shiva seated under a banyan, facing south, young — and around him four sages, ancient. He teaches them in complete silence, and they understand. This is the origin of the guru in Indian thought: the highest instruction is not information transfer. His hand holds the chin-mudra, thumb and forefinger joined — the individual self meeting the absolute, the other three fingers (the three qualities of nature) falling away.',
    where: 'A south-facing niche on the outer wall of nearly every South Indian Shiva temple.',
  },
  {
    id: 'mahakala',
    name: 'Mahakala',
    hi: 'महाकाल',
    tag: 'Time itself, and what devours it',
    icon: 'kala',
    text:
      'Kala means time and also death — in Sanskrit they are the same word, which tells you something. Shiva is Mahakala, the great time that eats even time. Everything you fear losing, you fear losing to Kala. Shiva stands beyond it, which is why the frightened have always come to Him. At Ujjain, the Mahakaleshwar linga is the only Jyotirlinga facing south, the direction of death, and the only one whose morning aarti is performed with ash from a cremation ground.',
    where: 'Mahakaleshwar, Ujjain, Madhya Pradesh.',
  },
  {
    id: 'neelkanth',
    name: 'Neelkanth',
    hi: 'नीलकण्ठ',
    tag: 'The blue throat',
    icon: 'throat',
    text:
      'When gods and demons churned the ocean for the nectar of immortality, the first thing to surface was not nectar but Halahala, a poison that began killing creation. Everyone who wanted the nectar ran. Shiva walked forward and drank it. Parvati caught His throat so it could go no further, and the poison stopped there, staining it blue. This is the most quietly demanding image in the tradition: the willingness to hold what would destroy others, and to hold it without passing it on.',
    where: 'Neelkanth Mahadev, Rishikesh, Uttarakhand.',
  },
  {
    id: 'gangadhara',
    name: 'Gangadhara',
    hi: 'गंगाधर',
    tag: 'Bearer of the river',
    icon: 'ganga',
    text:
      'King Bhagiratha meditated for generations to bring the Ganga down to earth so his ancestors could be released. But the river’s fall would have shattered the ground. Shiva stood in her path and caught her in His matted hair, and she wandered in that forest of locks for years until she came out gentled. Power that arrives unbroken destroys what it came to save. Something has to absorb the fall.',
    where: 'Gangotri and Haridwar, Uttarakhand.',
  },
  {
    id: 'tripurantaka',
    name: 'Tripurantaka',
    hi: 'त्रिपुरान्तक',
    tag: 'Destroyer of the three cities',
    icon: 'bow',
    text:
      'Three flying cities of gold, silver and iron, granted a boon that they could only be destroyed by a single arrow at the one instant in a thousand years when all three aligned. Shiva made the earth His chariot, the sun and moon His wheels, Meru His bow and Vishnu His arrow — and then, the texts say, He smiled, and they were gone before the arrow was loosed. The three cities are the three states of the small self: waking, dreaming, sleeping. One aligned moment of clarity ends all three.',
    where: 'Depicted at Ellora and in the Tripurantakeshwara temples of Karnataka.',
  },
  {
    id: 'lingodbhava',
    name: 'Lingodbhava',
    hi: 'लिङ्गोद्भव',
    tag: 'The pillar with no end',
    icon: 'linga',
    text:
      'Brahma and Vishnu argued over who was greater. A column of fire appeared with neither top nor bottom. They agreed: whoever finds an end wins. Vishnu took the form of a boar and dug downward for an age; Brahma became a swan and flew up for an age. Vishnu returned and admitted he had failed. Brahma lied and claimed he had reached the top — and for that lie he lost his worship on earth. The pillar was Shiva. The story is not about power; it is about the one thing the tradition will not forgive, which is pretending you have understood.',
    where: 'Arunachaleshwara, Tiruvannamalai — the fire linga.',
  },
  {
    id: 'bhairava',
    name: 'Kala Bhairava',
    hi: 'काल भैरव',
    tag: 'The fierce guardian',
    icon: 'bhairava',
    text:
      'When Brahma’s fifth head spoke arrogance, Shiva manifested Bhairava, who severed it — and then carried the skull as a begging bowl until the act was expiated in Kashi. Bhairava is the doorkeeper: fierce at the threshold, gentle inside. Every Shiva temple has him at the boundary, and in Kashi it is said he holds the keys of the city. He is worshipped by those who need protection rather than comfort — travellers at night, people in litigation, anyone standing at a door they must walk through.',
    where: 'Kala Bhairava temple, Varanasi.',
  },
  {
    id: 'adiyogi',
    name: 'Adiyogi / Mahayogi',
    hi: 'आदियोगी',
    tag: 'The first yogi, the first teacher',
    icon: 'yogi',
    text:
      'Before Shiva was worshipped He was observed. The tradition says He sat in stillness so complete that seven men waited eighty-four years to be taught, and on the first full moon of Dakshinayana He turned and began — that day is remembered as Guru Purnima, and those seven became the Saptarishis who carried yoga across the world. The eighty-four years are remembered too, in the eighty-four fundamental asanas. Yoga in this account is not exercise; it is what a human being does with the machinery of a body once they stop being run by it.',
    where: 'Kedarnath and Kailash, in the tradition; Isha, Coimbatore, in stone.',
  },
  {
    id: 'pashupatinath',
    name: 'Pashupatinath',
    hi: 'पशुपतिनाथ',
    tag: 'Lord of all beings',
    icon: 'pashu',
    text:
      'Pashu means the bound creature; pati means the lord. Every being caught in instinct, fear and conditioning is a pashu — and Shiva is not their master but their release. The Pashupata school, one of the oldest Shaiva orders, took this literally: the practice was to become so free of the good opinion of others that liberation had nothing left to hold on to.',
    where: 'Pashupatinath, Kathmandu, Nepal — and Mallikarjuna, Srisailam.',
  },
  {
    id: 'bhikshatana',
    name: 'Bhikshatana',
    hi: 'भिक्षाटन',
    tag: 'The naked beggar',
    icon: 'bhiksha',
    text:
      'Shiva wanders as a naked mendicant with a skull-bowl, and the sages of the Daruka forest — proud of their rituals — send their wives to shame Him. Instead the whole forest follows Him. The sages hurl a tiger, a serpent, a demon at Him; He wears them. The teaching is uncomfortable and deliberate: ritual without realisation is a costume, and God is quite willing to arrive at your door looking like someone you would refuse.',
    where: 'Bronze Bhikshatana figures of the Chola period, Tamil Nadu.',
  },
];

export const AVATARS = [
  { n: 1, name: 'Piplaad', hi: 'पिपलाद', text: 'Born after his father Dadhichi gave up his body for the gods, Piplaad grew up fatherless and demanded to know why. Told that Shani, the planet of hardship, was responsible, he pronounced a curse — and then, on Shiva’s counsel, withdrew it. Shiva granted that Shani would not afflict anyone before the age of sixteen. He is invoked against the burden of inherited misfortune.' },
  { n: 2, name: 'Nandi', hi: 'नंदी', text: 'Born to the sage Shilada, who had asked for a deathless child. Nandi became Shiva’s vahana, his gatekeeper and the foremost of the ganas. He faces the sanctum in every Shiva temple, never looking away. Devotees whisper their wish into his ear — the guard is also the messenger.' },
  { n: 3, name: 'Veerabhadra', hi: 'वीरभद्र', text: 'Born from a lock of Shiva’s hair struck to the ground in grief and rage after Sati died at Daksha’s fire sacrifice. Veerabhadra destroyed the yajna and beheaded Daksha, who was later restored with a goat’s head. He is the shape grief takes when it will not be told to be reasonable.' },
  { n: 4, name: 'Bhairava', hi: 'भैरव', text: 'The fierce form that severed Brahma’s fifth head for arrogance and then bore the guilt of it as a wandering ascetic until Kashi absolved Him. Guardian of thresholds, of Kashi, and of anyone who must pass through a dangerous doorway.' },
  { n: 5, name: 'Ashwatthama', hi: 'अश्वत्थामा', text: 'Son of Dronacharya in the Mahabharata, born of Shiva’s aspect. His rage at the war’s end brought a curse of deathlessness — to wander with an unhealing wound until the end of the age. A hard avatar: proof that divine power without restraint is a punishment.' },
  { n: 6, name: 'Sharabha', hi: 'शरभ', text: 'A vast being, part lion and part bird, manifested to cool Narasimha’s fury after the killing of Hiranyakashipu. Vaishnava texts tell it differently, and the disagreement is itself part of Indian religious history. What both sides preserve is the idea that even righteous rage needs something larger to absorb it.' },
  { n: 7, name: 'Grihapati', hi: 'गृहपति', text: 'Born to the brahmin Vishwanara and Shuchishmati, who longed for a son equal to Shiva. Destined to die by fire or lightning at sixteen, the boy worshipped at Kashi and was granted lordship over fire and the household. The avatar of the home — of the ordinary life made sacred.' },
  { n: 8, name: 'Durvasa', hi: 'दुर्वासा', text: 'The sage of the legendary temper, born of Shiva’s wrathful portion to Anasuya and Atri. His curses set whole epics in motion — Shakuntala’s forgetting, Indra’s downfall. He is the reminder that a short fuse can carry real spiritual power and still ruin everything around it.' },
  { n: 9, name: 'Hanuman', hi: 'हनुमान', text: 'The eleventh Rudra, born to Anjana and Kesari with the blessing of Vayu. Strength that never once serves itself; devotion so complete that it becomes power. Of all the avatars this is the one Indian households live with daily — Tuesday, the sindoor, the folded hands.' },
  { n: 10, name: 'Vrishabha', hi: 'वृषभ', text: 'The bull form Shiva took to reclaim the sons of Vishnu who had grown corrupt in the netherworld. The bull in Shaiva iconography is dharma itself, standing on four legs in the first age and one in ours.' },
  { n: 11, name: 'Yatinath', hi: 'यतिनाथ', text: 'Shiva came as an ascetic to test the hospitality of the tribal Aahuka and his wife Aahuki, who had vowed never to turn away a guest. The test cost them everything and they kept the vow. An avatar about atithi devo bhava — the guest is God, and the tradition means it literally.' },
  { n: 12, name: 'Krishna Darshan', hi: 'कृष्ण दर्शन', text: 'Manifested to King Nabhaga to establish the value of yajna and ritual observance when they were being abandoned. The avatar that argues, unusually for Shiva, in favour of form and ceremony.' },
  { n: 13, name: 'Avadhoot', hi: 'अवधूत', text: 'Shiva appeared as an avadhoot — a naked wandering ascetic beyond all social rules — to deflate Indra’s pride when the king of the gods grew arrogant. He blocked Indra’s path and would not move. Avadhoots still walk India, and are still not moved.' },
  { n: 14, name: 'Bhikshuvarya', hi: 'भिक्षुवर्य', text: 'Shiva as the supreme mendicant, protecting the orphaned child of a murdered king and teaching that the soul is untouched by what happens to the body. Invoked by those who have lost the person who was meant to protect them.' },
  { n: 15, name: 'Sureshwar', hi: 'सुरेश्वर', text: 'Shiva came to the boy-king Upamanyu, who wanted milk and instead wanted Shiva, first disguised as Indra and abusing Shiva’s name to test him. The boy refused to hear it and prepared to die. Shiva revealed Himself and gave him an ocean of milk. The avatar of the devotee who cannot be talked out of it.' },
  { n: 16, name: 'Kirata', hi: 'किरात', text: 'Shiva as a tribal hunter who fought Arjuna over a boar both had shot. Arjuna, the greatest archer alive, could not defeat Him, and only when his flower garland appeared on the hunter’s head did he realise who he had been fighting. He received the Pashupatastra. The avatar of the teacher who arrives as an obstacle.' },
  { n: 17, name: 'Sunartaka Nartaka', hi: 'सुनर्तक नर्तक', text: 'Shiva came as a dancer to the house of Himavan to ask for Parvati’s hand, performing so beautifully that the mountain king offered him anything — and He asked for Parvati. The avatar of the suitor who wins by artistry rather than force.' },
  { n: 18, name: 'Brahmachari', hi: 'ब्रह्मचारी', text: 'When Parvati was performing terrible austerities to win Shiva, He came to her disguised as a young celibate and spoke against Shiva — ash-smeared, homeless, keeping company with ghosts — to test her resolve. She began to walk away rather than listen. Then He showed His face.' },
  { n: 19, name: 'Yaksheshwar', hi: 'यक्षेश्वर', text: 'After the gods defeated the demons they became insufferable about it. Shiva appeared as a yaksha holding a blade of grass and asked Agni to burn it, Vayu to move it. Neither could. The avatar that ends the sentence "we did this ourselves".' },
];

export const SYMBOLS = [
  { id: 'trishul', name: 'Trishula', hi: 'त्रिशूल', text: 'The three-pointed spear: the three qualities of nature (sattva, rajas, tamas), the three times (past, present, future), the three sufferings (from oneself, from other beings, from fate). Held, not wielded — the point is that all three are in one hand.' },
  { id: 'damaru', name: 'Damaru', hi: 'डमरू', text: 'The two-headed drum, shaped like an hourglass — two triangles meeting at a point. Its sound is the first vibration from which language and the universe emerge. The Sanskrit alphabet is said to have fallen out of fourteen beats of it.' },
  { id: 'third-eye', name: 'The third eye', hi: 'त्रिनेत्र', text: 'Not a magic weapon but the faculty of discrimination — viveka — that sees through appearance. It opened once in anger and burned Kamadeva to ash. Mostly it is closed, which is also a teaching: the capacity to destroy should be the least-used one you have.' },
  { id: 'moon', name: 'The crescent moon', hi: 'चन्द्रशेखर', text: 'The moon on the second day of its waxing, worn on the matted hair. Cursed by Daksha to waste away, the moon took refuge in Shiva and was granted this: it will wane, but it will never disappear. What you carry on your head is what you have chosen to protect.' },
  { id: 'ganga', name: 'The Ganga', hi: 'गंगाधर', text: 'The river caught in His hair before it could break the earth. Knowledge, grace and force all need a medium that can slow them down enough to be survivable.' },
  { id: 'serpent', name: 'Vasuki, the serpent', hi: 'वासुकि', text: 'Coiled three times around His throat — past, present and future — and looking to the right, the direction of dharma. The serpent is the kundalini, the energy that rises when it stops being spent horizontally. Also: fear itself, worn as an ornament.' },
  { id: 'bhasma', name: 'Bhasma / Vibhuti', hi: 'भस्म', text: 'Ash from the cremation ground, smeared in three lines across the forehead. It is what everything becomes. Wearing it is not morbid; it is the daily refusal to be fooled about time. In practice it is cooling, and it means the wearer has already accepted the worst news.' },
  { id: 'rudraksha', name: 'Rudraksha', hi: 'रुद्राक्ष', text: '"The tear of Rudra" — the seed that fell when Shiva finally wept, after ages of meditation for the welfare of all beings. Worn as a mala of 108 beads for japa. Different mukhis (faces) are traditionally worn for different purposes.' },
  { id: 'tiger', name: 'The tiger skin', hi: 'व्याघ्रचर्म', text: 'He sits on the skin of the tiger sent to kill Him by the sages of Daruka forest. Fear and ferocity, converted into a seat. Whatever was sent to destroy you is what you now sit on.' },
  { id: 'nandi', name: 'Nandi', hi: 'नंदी', text: 'The bull who faces the sanctum and never turns away. He is dharma, and he is patience. Tradition says you should look at the linga between his horns — you approach God through steadiness, not around it.' },
  { id: 'linga', name: 'The Shivalinga', hi: 'शिवलिंग', text: 'Linga means "mark" or "sign" — that by which the unmanifest is inferred. Set in the yoni-pitha, it is consciousness resting in energy, the two never worshipped apart. The ellipsoid is deliberately the least representational shape available: it points, and refuses to depict.' },
  { id: 'jata', name: 'The matted locks', hi: 'जटा', text: 'Uncut, uncombed, holding a river and a moon. The ascetic’s refusal of grooming as a refusal of performance — and simultaneously the most crowded head in the pantheon. Renunciation in this tradition does not mean emptiness.' },
];

export const FAMILY = [
  {
    id: 'parvati',
    name: 'Parvati / Sati / Shakti',
    hi: 'पार्वती',
    rel: 'Consort — and half of Him',
    text:
      'First Sati, daughter of Daksha, who married Shiva against her father’s contempt and gave up her body when he insulted her husband at the yajna. Then Parvati, daughter of the mountain Himavan, who won Him back through austerities so severe that the gods intervened. She is Shakti — the power without which Shiva is described as a corpse, shava. In Ardhanarishvara they are literally one body. Every serious Shaiva lineage is also Shakta; the tradition does not permit you to take only the half you like.',
  },
  {
    id: 'ganesha',
    name: 'Ganesha',
    hi: 'गणेश',
    rel: 'Elder son — remover of obstacles',
    text:
      'Made by Parvati from the turmeric of her own body to guard her door while she bathed, and beheaded by Shiva when the boy — who had never met Him — refused Him entry. Parvati’s grief was such that Shiva sent the ganas to bring the head of the first being facing north; they returned with an elephant’s. Worshipped first, before any other deity, in every ritual in India. The god of beginnings is a god who was destroyed and remade at his beginning.',
  },
  {
    id: 'kartikeya',
    name: 'Kartikeya / Murugan / Skanda',
    hi: 'कार्तिकेय',
    rel: 'Younger son — commander of the divine armies',
    text:
      'Born of Shiva’s fire, carried by Agni and Ganga, nursed by the six Krittika stars — hence six heads. He was born for one purpose: to end the demon Tarakasura, who could be killed only by a son of Shiva, which is why Kamadeva was sent to disturb Shiva’s meditation and was burned for it. In Tamil Nadu he is Murugan, the god of hills and of youth, and the Arupadai Veedu — his six war-camps — are among the most-walked pilgrimages in India.',
  },
  {
    id: 'nandi-f',
    name: 'Nandi',
    hi: 'नंदी',
    rel: 'Vahana, gatekeeper, first devotee',
    text:
      'The white bull who carries Him and guards His door. Nandi is the only one permitted to stay when Shiva and Parvati wish to be alone, and it is Nandi who is asked first for permission to enter. Devotees whisper their prayers into his ear.',
  },
  {
    id: 'ashokasundari',
    name: 'Ashokasundari',
    hi: 'अशोकसुंदरी',
    rel: 'Daughter (Padma Purana)',
    text:
      'In the Padma Purana, Parvati creates a daughter from the wish-fulfilling Kalpavriksha to end her loneliness — named for removing (a-shoka) sorrow. She is a regional and textual tradition rather than a pan-Indian one, and is honoured particularly in Gujarat.',
  },
];
