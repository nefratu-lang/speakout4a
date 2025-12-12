
export enum SlideType {
  COVER = 'COVER',
  LEARNING_OUTCOMES = 'LEARNING_OUTCOMES', // Yeni
  ICE_BREAKER = 'ICE_BREAKER',
  READING = 'READING',
  COMPREHENSION_TF = 'COMPREHENSION_TF',
  COMPREHENSION_MC = 'COMPREHENSION_MC',
  GRAMMAR = 'GRAMMAR',
  GRAMMAR_BANK = 'GRAMMAR_BANK',
  DRILL = 'DRILL',
  SPEAKING = 'SPEAKING',
  MEDIA = 'MEDIA',
  REFLECTION = 'REFLECTION' // Yeni
}

export interface Vocabulary {
  word: string;
  definition: string;
}

export interface KeyPoint {
  title: string;
  content: string;
  position: 'left' | 'right';
}

export interface ReadingContent {
  text: string;
  vocabulary: Vocabulary[];
  keyPoints: KeyPoint[];
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content: any; 
}

export interface QuestionTF {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface QuestionMC {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  iconType: 'history' | 'geography' | 'person' | 'general';
}

export interface GrammarItem {
  id: number;
  prefix: string;
  suffix: string;
  correctAnswer: 'was' | 'were';
}

export interface DrillItem {
  id: number;
  type: 'question' | 'positive' | 'negative';
  prompt: string; 
  part1: string; 
  part2: string; 
  correctAnswer: string; 
}

// Grammar Bank için yeni interfaceler
export interface GrammarBankItem {
  id: number;
  // segments: Boşlukların arasına ve etrafına gelecek metin parçaları.
  // Örn: "Paula ___ (+) student... she ___ (+) teacher." -> ["Paula", "(+) student... she", "(+) teacher."]
  segments: string[]; 
  answers: string[]; // Boşluklara gelecek doğru cevaplar sırasıyla.
}

export interface GrammarBankSection {
  id: number;
  title: string;
  instruction: string;
  items: GrammarBankItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
