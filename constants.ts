import { SlideType, SlideData, QuestionTF, QuestionMC, GrammarItem, DrillItem, GrammarBankSection } from './types';

export const LESSON_TITLE = "Unit 4A – Legends of the Ottoman Seas";

export const SLIDES: SlideData[] = [
  {
    id: 0,
    type: SlideType.COVER,
    title: "LEGENDS OF THE OTTOMAN SEAS",
    subtitle: "Unit 4A - Naval History & Past Simple",
    content: {
      backgroundImage: "barbaros_cover.jpg"
    }
  },
  {
    id: 1,
    type: SlideType.ICE_BREAKER,
    title: "Look at the images. What do you think?",
    subtitle: "Click the questions below for hints. Talk with your partner.",
    content: {
      images: [
        { 
          src: "barbaros_statue.jpg", 
          label: "Statue in Beşiktaş" 
        },
        { 
          src: "ottoman_galleon.jpg", 
          label: "Ottoman Galley (Kadırga)" 
        },
        { 
          src: "karamursel_ferry.jpg", 
          label: "Karamürsel (Ferry/Town)" 
        },
        { 
          src: "preveza_battle.jpg", 
          label: "Sea Battle (Preveza)" 
        }
      ],
      questions: [
        {
          id: 1,
          text: "Who was a famous admiral?",
          hints: [
            "Hint 1: He had a red beard.",
            "Hint 2: He was born on Lesbos island.",
            "Hint 3: He won the Battle of Preveza.",
            "Hint 4: There is a big statue of him in Beşiktaş.",
            "Hint 5: His name starts with 'B'...",
            "✅ Answer: Barbaros Hayreddin Paşa"
          ]
        },
        {
          id: 2,
          text: "Who was the first commander?",
          hints: [
            "Hint 1: He lived in the 14th century (1300s).",
            "Hint 2: He was the first 'Kapudan-ı Derya'.",
            "Hint 3: He designed light, fast ships.",
            "Hint 4: A town in Kocaeli is named after him.",
            "Hint 5: His name is K_r_m_rs_l.",
            "✅ Answer: Karamürsel Bey"
          ]
        },
        {
          id: 3,
          text: "When were they active?",
          hints: [
            "Hint 1: Not in 2024!",
            "Hint 2: In the time of the Ottoman Empire.",
            "Hint 3: One was in the 14th century.",
            "Hint 4: One was in the 16th century (Golden Age).",
            "Hint 5: A long time ago (Past Simple).",
            "✅ Answer: 14th and 16th Centuries"
          ]
        },
        {
          id: 4,
          text: "Why were they important?",
          hints: [
            "Hint 1: Look at the sea map.",
            "Hint 2: They protected the sea.",
            "Hint 3: They fought brave battles.",
            "Hint 4: They made the navy strong.",
            "Hint 5: They are legends of history.",
            "✅ Answer: They were heroes of the sea."
          ]
        }
      ],
      teacherHelper: {
        text: "Click questions to see hints. Encourage guessing:",
        examples: ["Maybe he was...", "I think he was...", "He was a sailor..."]
      },
      bonusQuestion: {
        question: "Do you know which town is named after the first commander?",
        answer: "Karamürsel! 🎉"
      }
    }
  },
  {
    id: 2,
    type: SlideType.READING,
    title: "Legends of the Ottoman Seas",
    subtitle: "Read about the commanders.",
    content: {
      audioSrc: "reading_audio.mp3",
      text: `Barbaros Hayreddin Paşa was one of the most famous admirals in Ottoman history. He was born on the island of Lesbos, and he was a successful sailor from a young age. He was brave, experienced, and loyal to the Ottoman Empire. He was active in the Mediterranean Sea, and he was famous for protecting Ottoman ports and ships. Many European countries were afraid of him because his navy was strong and fast.

Karamürsel Bey was another important name in early Ottoman naval history. He was the first Kapudan-ı Derya, or “Grand Admiral,” of the Ottoman Empire. He was active in the 14th century, and he was one of the first to organize an Ottoman navy. He was connected to the region of Kocaeli, and the modern town “Karamürsel” was named after him. In his time, shipbuilding and training sailors were very important.

Both commanders were leaders of different centuries, but they were similar in one important way: they were symbols of Ottoman power at sea. Their missions were difficult, but they were successful. Today, their names are still important in Turkish naval culture, and many young sailors learn about them in naval training.`,
      vocabulary: [
        { word: "famous", definition: "Known by many people (Popüler/Ünlü)." },
        { word: "admiral", definition: "A high-ranking commander in the navy (Amiral)." },
        { word: "admirals", definition: "Plural of admiral; naval commanders (Amiraller)." },
        { word: "born", definition: "Started life (Doğmak)." },
        { word: "island", definition: "Land with water all around it (Ada)." },
        { word: "Lesbos", definition: "A Greek island (Midilli Adası)." },
        { word: "successful", definition: "Good at winning or doing a job (Başarılı)." },
        { word: "sailor", definition: "A person who works on a ship (Denizci)." },
        { word: "young", definition: "Not old (Genç)." },
        { word: "brave", definition: "Not afraid of danger (Cesur)." },
        { word: "experienced", definition: "Knowing a lot because you did it before (Tecrübeli)." },
        { word: "loyal", definition: "Always supporting your country or friend (Sadık)." },
        { word: "Empire", definition: "A group of countries ruled by one leader (İmparatorluk)." },
        { word: "active", definition: "Working or doing things (Aktif/Görevde)." },
        { word: "Mediterranean", definition: "The sea between Europe and Africa (Akdeniz)." },
        { word: "protecting", definition: "Keeping something safe (Korumak)." },
        { word: "ports", definition: "Places where ships stop (Limanlar)." },
        { word: "ships", definition: "Big boats (Gemiler)." },
        { word: "afraid of", definition: "Scared; feeling fear (Korkmak)." },
        { word: "navy", definition: "Military ships of a country (Donanma)." },
        { word: "strong", definition: "Having power (Güçlü)." },
        { word: "fast", definition: "Moving quickly (Hızlı)." },
        { word: "important", definition: "Has big value (Önemli)." },
        { word: "early", definition: "Near the beginning (Erken dönem)." },
        { word: "Grand", definition: "Big or important (Büyük)." },
        { word: "organize", definition: "To plan or arrange (Düzenlemek/Kurmak)." },
        { word: "connected", definition: "Linked to (Bağlantılı)." },
        { word: "region", definition: "Area or part of a country (Bölge)." },
        { word: "town", definition: "A small city (Kasaba/İlçe)." },
        { word: "named", definition: "Given a name (Adı verildi)." },
        { word: "shipbuilding", definition: "Making ships (Gemi inşası)." },
        { word: "training", definition: "Teaching skills (Eğitim)." },
        { word: "Both", definition: "The two of them (Her ikisi)." },
        { word: "leaders", definition: "People who guide others (Liderler)." },
        { word: "centuries", definition: "Periods of 100 years (Yüzyıllar)." },
        { word: "similar", definition: "Almost the same (Benzer)." },
        { word: "symbols", definition: "Signs or icons (Semboller)." },
        { word: "power", definition: "Strength or control (Güç)." },
        { word: "missions", definition: "Important jobs or tasks (Görevler)." },
        { word: "difficult", definition: "Hard to do (Zor)." },
        { word: "culture", definition: "Way of life (Kültür)." }
      ],
      keyPoints: [
        {
          title: "Birth Place",
          content: "He was born on the island Lesbos (today part of Greece).",
          position: "left"
        },
        {
          title: "Original Name",
          content: "His real name was Khizr (or Khidr), later he got the name “Hayreddin.”",
          position: "right"
        },
        {
          title: "Nickname",
          content: "He was also called “Barbarossa,” which means “Red-beard” in Italian.",
          position: "left"
        },
        {
          title: "Occupation",
          content: "He first worked as a corsair (sea pirate/privateer), then became an admiral of the Ottoman Navy.",
          position: "right"
        },
        {
          title: "Famous Victory",
          content: "In 1538, he won a big sea battle called Battle of Preveza — that made him famous.",
          position: "left"
        },
        {
          title: "Impact",
          content: "His successes helped the Ottoman Empire become powerful in the Mediterranean Sea in the 1500s.",
          position: "right"
        },
        {
          title: "Karamürsel Ship",
          content: "Karamürsel Bey designed a special light ship which was very fast in the Sea of Marmara.",
          position: "left"
        }
      ]
    }
  },
  {
    id: 3,
    type: SlideType.COMPREHENSION_TF,
    title: "Comprehension Check",
    subtitle: "True or False?",
    content: {
      questions: [
        { id: 1, statement: "Barbaros was born on an island.", isTrue: true, explanation: "Yes, he was born on Lesbos (Midilli)." },
        { id: 2, statement: "European countries were not afraid of Barbaros.", isTrue: false, explanation: "False. They were afraid because his navy was strong." },
        { id: 3, statement: "Karamürsel Bey was the first Grand Admiral.", isTrue: true, explanation: "True, he was the first Kapudan-ı Derya." },
        { id: 4, statement: "Ottoman shipbuilding was important in his time.", isTrue: true, explanation: "Correct. Building ships was very important." },
        { id: 5, statement: "They were active in the 20th century.", isTrue: false, explanation: "No, they were active in the 14th and 16th centuries." },
        { id: 6, statement: "Karamürsel Bey is connected to the city of Kocaeli.", isTrue: true, explanation: "Yes, the district is named after him." },
      ] as QuestionTF[]
    }
  },
  {
    id: 4,
    type: SlideType.COMPREHENSION_MC,
    title: "Comprehension Check",
    subtitle: "Choose the correct answer.",
    content: {
      questions: [
        { 
          id: 1, 
          question: "Where was Barbaros active?", 
          options: ["Black Sea", "Mediterranean", "Aegean"], 
          correctIndex: 1,
          iconType: "geography",
          explanation: "Tip: The Mediterranean (Akdeniz) was the center of his power."
        },
        { 
          id: 2, 
          question: "Karamürsel Bey was connected to:", 
          options: ["Kocaeli", "Spain", "Tunisia"], 
          correctIndex: 0,
          iconType: "geography",
          explanation: "Info: Kocaeli is a province in Turkey where Karamürsel is located."
        },
        { 
          id: 3, 
          question: "What was Barbaros famous for?", 
          options: ["Building castles", "Protecting ports", "Writing books"], 
          correctIndex: 1,
          iconType: "person",
          explanation: "Correct! Protecting Ottoman trade and ports was his main duty."
        },
        { 
          id: 4, 
          question: "When was Karamürsel Bey active?", 
          options: ["14th Century", "16th Century", "19th Century"], 
          correctIndex: 0,
          iconType: "history",
          explanation: "Right. He was an early Ottoman commander (1300s)."
        },
        { 
          id: 5, 
          question: "What does 'Kapudan-ı Derya' mean?", 
          options: ["Captain of the Ship", "Grand Admiral", "Soldier"], 
          correctIndex: 1,
          iconType: "general",
          explanation: "Info: It is the highest rank in the Ottoman Navy."
        },
        { 
          id: 6, 
          question: "Why were they successful?", 
          options: ["They were rich", "Strategic Skill", "Foreign Help"], 
          correctIndex: 1,
          iconType: "general",
          explanation: "Yes, their experience and naval strategy made them successful."
        },
      ] as QuestionMC[]
    }
  },
  {
    id: 5,
    type: SlideType.GRAMMAR,
    title: "Grammar Practice",
    subtitle: "Complete with 'was' or 'were'.",
    content: {
      items: [
        { id: 1, prefix: "Barbaros", suffix: "a famous admiral.", correctAnswer: "was" },
        { id: 2, prefix: "They", suffix: "important commanders.", correctAnswer: "were" },
        { id: 3, prefix: "Karamürsel", suffix: "active in the 14th century.", correctAnswer: "was" },
        { id: 4, prefix: "Naval battles", suffix: "dangerous.", correctAnswer: "were" },
        { id: 5, prefix: "Ottoman ships", suffix: "strong.", correctAnswer: "were" },
        { id: 6, prefix: "I", suffix: "at the museum yesterday.", correctAnswer: "was" },
        { id: 7, prefix: "The sea", suffix: "calm last night.", correctAnswer: "was" },
        { id: 8, prefix: "The sailors", suffix: "brave.", correctAnswer: "were" },
      ] as GrammarItem[]
    }
  },
  {
    id: 6,
    type: SlideType.SPEAKING,
    title: "Subject Explanation & Speaking",
    subtitle: "Past Simple: TO BE (Was / Were)",
    content: {
      grammarTip: {
        title: "Grammar Rules",
        positive: {
          title: "Positive (+)",
          examples: ["I / He / She / It was...", "We / You / They were..."]
        },
        negative: {
          title: "Negative (-)",
          examples: ["I wasn't (was not)...", "They weren't (were not)..."]
        },
        question: {
          title: "Question (?)",
          examples: ["Was she famous?", "Were they sailors?"]
        },
        timeExpressions: {
          title: "Time Expressions",
          list: ["yesterday", "last week", "last night", "in 1990", "when I was a child"]
        }
      },
      prompts: [
        "Where were you yesterday?",
        "Who was your first teacher?",
        "Was it cold last week?",
        "Were you happy yesterday?",
        "Where were you born?",
        "Who was your best friend in primary school?",
        "Was your last holiday fun?",
        "Where were you two hours ago?"
      ],
      examples: [
        "I was at home yesterday.",
        "My first teacher was Mr. Yılmaz.",
        "No, it wasn't cold.",
        "Yes, I was very happy.",
        "I was born in Istanbul.",
        "My best friend was Ali.",
        "Yes, it was amazing!",
        "I was at school."
      ]
    }
  },
  {
    id: 7,
    type: SlideType.DRILL,
    title: "Pattern Practice",
    subtitle: "Complete the questions and answers.",
    content: {
      drills: [
        // Group 1: Singular (Barbaros)
        { 
          id: 1, 
          type: 'question', 
          prompt: "Barbaros / a captain (?)", 
          part1: "", 
          part2: " Barbaros a captain?", 
          correctAnswer: "Was" 
        },
        { 
          id: 2, 
          type: 'positive', 
          prompt: "Yes / he (+)", 
          part1: "Yes, he ", 
          part2: ".", 
          correctAnswer: "was" 
        },
        
        // Group 2: Plural (Ships)
        { 
          id: 3, 
          type: 'question', 
          prompt: "The ships / slow (?)", 
          part1: "", 
          part2: " the ships slow?", 
          correctAnswer: "Were" 
        },
        { 
          id: 4, 
          type: 'negative', 
          prompt: "No / they (-)", 
          part1: "No, they ", 
          part2: ".", 
          correctAnswer: "weren't" 
        },

        // Group 3: Contextual (Piri Reis)
        { 
          id: 5, 
          type: 'question', 
          prompt: "Piri Reis / a cartographer (?)", 
          part1: "", 
          part2: " Piri Reis a cartographer?", 
          correctAnswer: "Was" 
        },
        { 
          id: 6, 
          type: 'positive', 
          prompt: "Yes / he (+)", 
          part1: "Yes, he ", 
          part2: ".", 
          correctAnswer: "was" 
        },
        
        // Group 4: Battle Context (New)
        {
          id: 7,
          type: 'question', 
          prompt: "The weather / stormy (?)", 
          part1: "", 
          part2: " the weather stormy?", 
          correctAnswer: "Was" 
        },
        {
          id: 8,
          type: 'negative', 
          prompt: "No / it (-)", 
          part1: "No, it ", 
          part2: ".", 
          correctAnswer: "wasn't" 
        },
        
        // Group 5: Preveza (New)
        {
          id: 9,
          type: 'question', 
          prompt: "Preveza / a victory (?)", 
          part1: "", 
          part2: " Preveza a victory?", 
          correctAnswer: "Was" 
        },
        {
          id: 10,
          type: 'positive', 
          prompt: "Yes / it (+)", 
          part1: "Yes, it ", 
          part2: ".", 
          correctAnswer: "was" 
        },

        // Group 6: Sailors (New)
        {
          id: 11,
          type: 'question', 
          prompt: "The sailors / strong (?)", 
          part1: "", 
          part2: " the sailors strong?", 
          correctAnswer: "Were" 
        },
        {
          id: 12,
          type: 'positive', 
          prompt: "Yes / they (+)", 
          part1: "Yes, they ", 
          part2: ".", 
          correctAnswer: "were" 
        }
      ] as DrillItem[]
    }
  },
  {
    id: 8,
    type: SlideType.GRAMMAR_BANK,
    title: "Pattern Practice Speakout A2 4A Grammar Bank",
    subtitle: "Exercises",
    content: {
      sections: [
        {
          id: 1,
          title: "Exercise 2",
          instruction: "Complete the questions and answers in the past. Use two words for each item (1-10). A contraction = two words.",
          items: [
            { id: 1, segments: ["Q: ", " Barbaros Hayrettin Paşa?"], answers: ["Who was"] },
            { id: 2, segments: ["A: ", " a famous Ottoman admiral."], answers: ["He was"] },
            { id: 3, segments: ["Q: ", " a soldier?"], answers: ["Was he"] },
            { id: 4, segments: ["A: No, he ", ". He was a sailor."], answers: ["wasn't"] },
            { id: 5, segments: ["Q: ", " ", " he born?"], answers: ["When", "was"] },
            { id: 6, segments: ["A: He ", " in 1478."], answers: ["was born"] },
            { id: 7, segments: ["Q: ", " his brother?"], answers: ["Who was"] },
            { id: 8, segments: ["A: His ", " Oruç Reis."], answers: ["brother was"] },
            { id: 9, segments: ["Q: ", " ", " he famous?"], answers: ["Why", "was"] },
            { id: 10, segments: ["A: He ", " famous because of his victories at sea."], answers: ["was"] },
          ]
        },
        {
          id: 2,
          title: "Exercise 3",
          instruction: "Complete the sentences with the present simple or past simple form of be. Use the positive (+) or negative (-) form.",
          items: [
            { id: 1, segments: ["1. Paula ", " (+) a student here in 2010 and now she ", " (+) a teacher."], answers: ["was", "is"] },
            { id: 2, segments: ["2. I ", " (-) well at the weekend, but I ", " (+) fine now."], answers: ["wasn't", "am"] },
            { id: 3, segments: ["3. Hannah and Billy ", " (+) OK today, but they ", " (-) OK yesterday."], answers: ["are", "weren't"] },
            { id: 4, segments: ["4. Kiefer ", " (-) at work today, but he ", " (+) here yesterday."], answers: ["isn't", "was"] },
            { id: 5, segments: ["5. We ", " (+) at home on Friday, but we ", " (-) at home today."], answers: ["were", "aren't"] },
            { id: 6, segments: ["6. My driving lesson ", " (-) easy today and it ", " (+) difficult yesterday."], answers: ["isn't", "was"] },
          ]
        }
      ] as GrammarBankSection[]
    }
  },
  {
    id: 9,
    type: SlideType.MEDIA,
    title: "Historical Gallery",
    subtitle: "Visual & Video Context",
    content: {
      items: [
        { 
          type: "image", 
          src: "barbaros_statue.jpg", 
          caption: "Statue of Barbaros (Istanbul)",
          description: "This is a statue of Barbaros. It is in Beşiktaş. He was a famous admiral."
        },
        { 
          type: "image", 
          src: "piri_reis_map.jpg", 
          caption: "Piri Reis Map",
          description: "This is the Piri Reis map. It was very detailed. Piri Reis was a clever cartographer."
        },
        { 
          type: "image", 
          src: "ottoman_galleon.jpg", 
          caption: "Ottoman Galleon",
          description: "This is an Ottoman galleon. It was a big ship. The navy was strong."
        },
        { 
          type: "image", 
          src: "nigari_portrait.jpg", 
          caption: "Portrait by Nigari",
          description: "This is a painting of Barbaros. He was old in this picture. He was powerful."
        },
        { 
          type: "image", 
          src: "preveza_battle.jpg", 
          caption: "Battle of Preveza",
          description: "This was the Battle of Preveza. It was in 1538. It was a great victory."
        },
        { 
          type: "image", 
          src: "ottoman_sailors.jpg", 
          caption: "Ottoman Sailors",
          description: "These were Ottoman sailors. They were brave. Their clothes were traditional."
        },
        { 
          type: "image", 
          src: "naval_miniature.jpg", 
          caption: "Naval Miniature",
          description: "This is an old miniature. It was a style of art. The ships were colorful."
        },
        { 
          type: "image", 
          src: "turgut_reis.jpg", 
          caption: "Turgut Reis",
          description: "This was Turgut Reis. He was also a famous commander. He was a friend of Barbaros."
        },
        { 
          type: "image", 
          src: "america_map.jpg", 
          caption: "Map of America (Piri Reis)",
          description: "This was a map of America. It was very interesting. Piri Reis was the drawer."
        },
        { 
          type: "video", 
          src: "https://www.youtube.com/watch?v=fXTqw4MAG5U", 
          caption: "Barbaroslar Akdeniz'in Kılıcı (YouTube)",
          description: "This is a video about Barbaros. He was a legend of the seas."
        }
      ]
    }
  }
];
