import React, { useState, useRef } from 'react';
import { SlideData, QuestionTF, QuestionMC, GrammarItem, Vocabulary, KeyPoint, DrillItem, GrammarBankSection, GrammarBankItem } from '../types';
import { SLIDES } from '../constants';
import { generateSpeech } from '../services/geminiService';

// --- Reading Reference Modal Component (Reusable) ---
const ReadingReferenceModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  highlightSentences: string[]; 
}> = ({ isOpen, onClose, highlightSentences }) => {
  if (!isOpen) return null;

  // We assume Slide index 3 (id 3) is the Reading Slide.
  // In constants array, it's at index 3 (id 3). Safe enough for this specific app structure.
  const readingSlide = SLIDES.find(s => s.type === 'READING');
  if (!readingSlide) return null;

  const fullText = readingSlide.content.text;
  
  // Simple paragraph split for display
  const paragraphs = fullText.split(/\n\s*\n/);

  const renderTextWithHighlights = (text: string) => {
    // If no highlights needed, return plain text
    if (!highlightSentences || highlightSentences.length === 0) return text;

    // This is a basic highlighter. It checks if the paragraph contains the key sentence.
    // Since we are not doing complex NLP, we'll try to match substrings.
    let rendered = text;
    highlightSentences.forEach(sentence => {
        if (!sentence) return;
        // Escape special regex chars if any (simple approach)
        const parts = rendered.split(sentence);
        if (parts.length > 1) {
            rendered = parts.join(`<span class="bg-yellow-200 font-bold px-1 rounded transition-colors duration-500 border-b-2 border-yellow-400 text-ocean-900">${sentence}</span>`);
        }
    });
    
    return <span dangerouslySetInnerHTML={{ __html: rendered }} />;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-[#fffdf5] w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-4 border-ocean-600 relative">
            {/* Header */}
            <div className="bg-ocean-700 text-white p-4 flex justify-between items-center shrink-0">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span>📜</span> Captain's Log (Reference Text)
                </h3>
                <button onClick={onClose} className="text-white hover:bg-ocean-600 p-2 rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 font-serif text-lg leading-relaxed text-slate-800">
                {paragraphs.map((para: string, i: number) => (
                    <p key={i} className="mb-4">
                        {renderTextWithHighlights(para)}
                    </p>
                ))}
            </div>
            
            {/* Footer Tip */}
            <div className="bg-yellow-50 p-3 text-center text-sm text-yellow-800 border-t border-yellow-200">
                💡 Answers you found are highlighted in yellow.
            </div>
        </div>
    </div>
  );
};

// --- Cover Slide ---
export const CoverSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-ocean-900 text-white">
       {/* Background Image with Overlay */}
       <div className="absolute inset-0 z-0">
          <img 
            src={data.content.backgroundImage} 
            alt="Barbaros" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent"></div>
       </div>

       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000">
          <div className="mb-6 flex justify-center">
             <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-ocean-100/10 backdrop-blur border-4 border-gold-500 flex items-center justify-center text-6xl md:text-8xl shadow-[0_0_40px_rgba(217,119,6,0.6)]">
                ⚓
             </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-lg mb-6 tracking-wide uppercase">
            {data.title}
          </h1>
          <p className="text-xl md:text-4xl text-ocean-100 font-light tracking-widest uppercase border-t border-ocean-700 pt-6 inline-block">
            {data.subtitle}
          </p>
          <div className="mt-16 animate-bounce">
            <p className="text-lg text-ocean-300 mb-2">Start Lesson</p>
            <span className="text-4xl text-gold-500">▼</span>
          </div>
       </div>
    </div>
  );
};

// --- LEARNING OUTCOMES SLIDE (FIXED SCROLL) ---
export const LearningOutcomesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    // Changed h-full to min-h-full and ensured overflow is handled by parent or this container specifically
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto">
      <div className="max-w-[1600px] w-full flex flex-col gap-6 min-h-min my-auto">
        
        {/* Header Section */}
        <div className="text-center mb-6">
           <h2 className="text-4xl font-serif font-bold text-ocean-900 tracking-wider uppercase mb-2">
             <span className="mr-3">🗺️</span> {data.title}
           </h2>
           <p className="text-xl text-slate-600 font-light italic">{data.subtitle}</p>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.content.objectives.map((obj: any, idx: number) => (
             <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-ocean-500 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-ocean-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner mx-auto">
                  {obj.icon}
                </div>
                <h3 className="text-xl font-bold text-ocean-800 mb-2 text-center">{obj.title}</h3>
                <p className="text-slate-600 text-center leading-relaxed">{obj.text}</p>
             </div>
          ))}
        </div>

        {/* Why Box */}
        {data.content.whyBox && (
          <div className="mt-8 bg-gold-500 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden max-w-4xl mx-auto w-full">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
               <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
            </div>
            <div className="relative z-10 text-center">
               <h3 className="text-2xl font-bold mb-3 uppercase tracking-widest">{data.content.whyBox.title}</h3>
               <p className="text-xl font-medium">{data.content.whyBox.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- REFLECTION SLIDE (FIXED SCROLL) ---
export const ReflectionSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [checks, setChecks] = useState<Record<number, boolean>>({});

  const toggleCheck = (id: number) => {
    setChecks(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    // Used min-h-min and my-auto to center vertically if short, but allow scroll if tall
    <div className="h-full flex flex-col items-center p-4 bg-gradient-to-b from-ocean-50 to-ocean-100 overflow-y-auto">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-ocean-200 my-auto shrink-0">
        
        {/* Header */}
        <div className="bg-ocean-800 text-white p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <h2 className="text-4xl font-serif font-bold relative z-10 mb-2">{data.title}</h2>
           <p className="text-ocean-200 uppercase tracking-widest text-sm relative z-10">{data.subtitle}</p>
        </div>

        <div className="p-8 md:p-12">
          
          {/* Recap Section */}
          <div className="mb-10">
             <h3 className="text-2xl font-bold text-ocean-900 mb-6 flex items-center gap-2 border-b border-ocean-100 pb-2">
               <span>📋</span> Mission Accomplished:
             </h3>
             <ul className="space-y-4">
                {data.content.recap.map((item: any, idx: number) => (
                   <li key={idx} className="flex items-center gap-4 text-lg text-slate-700 bg-slate-50 p-4 rounded-xl">
                      <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold shrink-0">✓</span>
                      {item.text}
                   </li>
                ))}
             </ul>
          </div>

          {/* Self Check Section */}
          <div>
             <h3 className="text-2xl font-bold text-ocean-900 mb-6 flex items-center gap-2 border-b border-ocean-100 pb-2">
               <span>🤔</span> Self Reflection:
             </h3>
             <div className="space-y-3">
               {data.content.selfCheck.map((check: any) => (
                 <button 
                   key={check.id}
                   onClick={() => toggleCheck(check.id)}
                   className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                     checks[check.id] 
                       ? 'bg-gold-50 border-gold-400 shadow-md' 
                       : 'bg-white border-slate-200 hover:border-ocean-300'
                   }`}
                 >
                   <span className={`text-lg font-medium ${checks[check.id] ? 'text-gold-700' : 'text-slate-600'}`}>
                     {check.text}
                   </span>
                   <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      checks[check.id] ? 'bg-gold-500 border-gold-500 text-white' : 'border-slate-300 text-transparent'
                   }`}>
                      ★
                   </div>
                 </button>
               ))}
             </div>
          </div>

          {/* Final Message */}
          <div className="mt-10 text-center animate-bounce">
             <span className="inline-block bg-ocean-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                {data.content.finalMessage}
             </span>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Ice Breaker (Updated for Full Screen & Hints) ---
export const IceBreakerSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const [revealBonus, setRevealBonus] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null);
  const [hintIndex, setHintIndex] = useState(0);

  const handleQuestionClick = (q: any) => {
    setActiveQuestion(q);
    setHintIndex(0);
  };

  const showNextHint = () => {
    if (activeQuestion && hintIndex < activeQuestion.hints.length - 1) {
        setHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-4 relative gap-4 overflow-hidden">
      
      {/* Teacher Prompt (Top Right) */}
      {data.content.teacherHelper && (
         <div className="absolute top-2 right-2 md:top-6 md:right-6 z-20 max-w-[200px] bg-yellow-50/90 backdrop-blur-sm border border-yellow-200 p-3 rounded-lg shadow-md transform rotate-2">
            <h4 className="text-xs font-bold text-yellow-800 mb-1 flex items-center gap-1">
               <span>💡</span> Say what you think:
            </h4>
            <p className="text-xs text-slate-700 mb-2">{data.content.teacherHelper.text}</p>
            <ul className="text-xs font-mono text-ocean-700 space-y-1">
               {data.content.teacherHelper.examples.map((ex: string, i: number) => (
                  <li key={i}>"{ex}"</li>
               ))}
            </ul>
         </div>
      )}

      {/* Central Discussion Box */}
      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 md:p-8 rounded-full shadow-2xl border-4 border-ocean-100 text-center w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center shrink-0 pointer-events-none">
         <span className="text-4xl md:text-5xl mb-2">🗣️</span>
         <h3 className="text-lg md:text-2xl font-bold text-ocean-800">Discuss with your partner</h3>
         <p className="text-xs md:text-sm text-slate-500 mt-2">1 Minute</p>
      </div>

      {/* Grid of Images - Flex grow to fill space */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 w-full h-full max-w-[1600px] flex-1 min-h-0">
         {data.content.images.map((img: any, idx: number) => (
           <div 
             key={idx} 
             onClick={() => setZoomedImg(img.src)}
             className={`relative group cursor-zoom-in overflow-hidden rounded-xl md:rounded-2xl border-2 border-white shadow-lg transition-transform hover:z-10 bg-slate-200 flex flex-col`}
           >
             <img src={img.src} alt={img.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
             <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs md:text-lg font-bold backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
               {img.label}
             </div>
           </div>
         ))}
      </div>

      {/* Questions Footer */}
      <div className="flex gap-4 items-center w-full max-w-[1600px] shrink-0 h-auto">
          <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-ocean-100 flex-1">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-medium text-ocean-800">
                {data.content.questions.map((q: any, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => handleQuestionClick(q)}
                    className="flex items-start gap-2 bg-ocean-50 hover:bg-ocean-100 p-2 rounded-lg text-left transition-colors border border-transparent hover:border-ocean-300"
                  >
                     <span className="bg-ocean-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0">{i+1}</span>
                     <span className="leading-tight text-xs md:text-base">{q.text}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* Bonus Question Bubble */}
          {data.content.bonusQuestion && (
             <button 
                onClick={() => setRevealBonus(!revealBonus)}
                className="bg-gold-500 hover:bg-yellow-500 text-white p-3 rounded-2xl rounded-bl-none shadow-lg transition-transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center w-32 md:w-40 shrink-0 border-2 border-white self-stretch"
             >
                {!revealBonus ? (
                   <>
                      <span className="text-3xl">🎁</span>
                      <span className="text-xs md:text-sm font-bold text-center mt-1">Bonus Question?</span>
                   </>
                ) : (
                   <div className="animate-in zoom-in">
                      <p className="text-[10px] md:text-xs leading-tight text-yellow-100 mb-1">{data.content.bonusQuestion.question}</p>
                      <p className="text-sm md:text-base font-bold bg-white text-gold-500 px-2 py-1 rounded-full">{data.content.bonusQuestion.answer}</p>
                   </div>
                )}
             </button>
          )}
      </div>

      {/* Lightbox Modal */}
      {zoomedImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setZoomedImg(null)}
        >
          <img src={zoomedImg} className="max-w-full max-h-full rounded shadow-2xl" alt="Zoomed" />
        </div>
      )}

      {/* HINT MODAL - ENHANCED SIZE */}
      {activeQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full relative border-4 border-ocean-100">
                  <button 
                    onClick={() => setActiveQuestion(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                  <h3 className="text-3xl md:text-4xl font-bold text-ocean-900 mb-8 pr-8 border-b border-ocean-100 pb-4">{activeQuestion.text}</h3>
                  
                  <div className="space-y-4 mb-8">
                      {activeQuestion.hints.map((hint: string, idx: number) => {
                          const isAnswer = idx === activeQuestion.hints.length - 1;
                          const isLocked = idx > hintIndex;
                          
                          return (
                            <div 
                                key={idx} 
                                className={`p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-2xl md:text-3xl font-medium ${
                                    isLocked 
                                    ? 'bg-slate-50 border-slate-100 text-slate-300 opacity-50 transform -translate-x-2'
                                    : isAnswer 
                                        ? 'bg-green-100 border-green-500 text-green-900 font-bold shadow-md transform scale-105' 
                                        : 'bg-yellow-50 border-yellow-200 text-slate-800 opacity-100 transform translate-x-0'
                                }`}
                            >
                                {isLocked ? `Hint ${idx + 1} (Locked)` : hint}
                            </div>
                          );
                      })}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                      <span className="text-lg text-slate-400 font-mono">Hint {hintIndex + 1} of {activeQuestion.hints.length}</span>
                      {hintIndex < activeQuestion.hints.length - 1 ? (
                          <button 
                            onClick={showNextHint}
                            className="bg-ocean-600 text-white px-8 py-3 rounded-full font-bold text-xl hover:bg-ocean-700 transition-colors shadow-lg flex items-center gap-3"
                          >
                            <span>Show Next Hint</span>
                            <span className="text-2xl">👇</span>
                          </button>
                      ) : (
                          <button 
                            onClick={() => setActiveQuestion(null)}
                            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold text-xl hover:bg-green-700 transition-colors shadow-lg"
                          >
                            Got it! 👍
                          </button>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// --- Reading (Full Screen) ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVocab, setActiveVocab] = useState<{word: string, def: string, x: number, y: number} | null>(null);
  const [activeKeyPoint, setActiveKeyPoint] = useState<KeyPoint | null>(null);
  
  // Reference for the audio player
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = () => {
    if (!data.content.audioSrc) {
      alert("No audio file available.");
      return;
    }

    if (isPlaying) {
      // If already playing, stop/pause it (optional logic, but typically pause)
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(data.content.audioSrc);
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onerror = () => {
             alert("Could not load audio file: " + data.content.audioSrc);
             setIsPlaying(false);
        };
      }
      audioRef.current.play().catch(e => {
          console.error("Play error:", e);
          alert("Error playing audio.");
      });
      setIsPlaying(true);
    }
  };

  const paragraphs = data.content.text.split(/\n\s*\n/);

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    // Remove basic punctuation to find the clean word
    const cleanWord = word.replace(/[.,;""''()]/g, '');
    const vocab = data.content.vocabulary?.find((v: Vocabulary) => v.word.toLowerCase() === cleanWord.toLowerCase());
    if (vocab) {
      setActiveVocab({ word: vocab.word, def: vocab.definition, x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-start p-2 md:p-6 overflow-hidden relative" onClick={() => { setActiveVocab(null); setActiveKeyPoint(null); }}>
      
      {/* Background Map Placeholder */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-center bg-cover bg-no-repeat z-0" style={{ backgroundImage: "url('piri_reis_map.jpg')" }}></div>

      <div className="w-full max-w-6xl h-full flex flex-col relative z-10">
          
          {/* Header Area */}
          <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 mb-4 flex justify-between items-center border-b-4 border-ocean-600 shrink-0">
             <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-ocean-900">{data.title}</h2>
                <p className="text-sm md:text-base text-slate-500">{data.subtitle}</p>
             </div>
             <button onClick={handleSpeak} className={`bg-ocean-100 text-ocean-700 hover:bg-ocean-200 p-3 rounded-full transition-all transform hover:scale-110 ${isPlaying ? 'ring-4 ring-ocean-300' : ''}`}>
                {isPlaying ? <span className="animate-pulse block text-xl">❚❚</span> : <span className="text-xl">🔊</span>}
             </button>
          </div>

          {/* Reading Paper - Full height usage */}
          <div className="bg-[#fffdf5] shadow-2xl rounded-lg border border-stone-200 flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 relative">
             {/* Key Points Floating Buttons */}
             {data.content.keyPoints?.map((kp: KeyPoint, idx: number) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveKeyPoint(activeKeyPoint === kp ? null : kp); }}
                  className={`absolute ${kp.position === 'left' ? 'left-2 md:left-4' : 'right-2 md:right-4'} z-20 bg-red-500 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-serif font-bold italic text-lg`}
                  style={{ top: `${15 + (idx * 15)}%` }} 
                >
                   i
                </button>
             ))}

             {/* Popup for Keypoints */}
             {activeKeyPoint && (
                <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 bg-yellow-50 border-4 border-red-400 p-6 rounded-2xl shadow-2xl animate-in zoom-in duration-200">
                   <h4 className="font-bold text-red-800 border-b border-red-200 pb-2 mb-3 text-xl">{activeKeyPoint.title}</h4>
                   <p className="text-lg text-slate-800 font-serif leading-relaxed">{activeKeyPoint.content}</p>
                   <button onClick={() => setActiveKeyPoint(null)} className="absolute top-2 right-3 text-red-400 hover:text-red-700 text-2xl font-bold">×</button>
                </div>
             )}

             {/* Text Content - Larger text for projection */}
             <div className="font-serif text-lg md:text-2xl leading-relaxed text-slate-800 text-left space-y-6 px-4 md:px-12 max-w-5xl mx-auto">
               {paragraphs.map((para: string, pIdx: number) => (
                 <p key={pIdx} className="mb-4">
                   {para.split(/(\s+)/).map((word, wIdx) => {
                      const cleanWord = word.replace(/[.,;""''()]/g, '');
                      const isVocab = data.content.vocabulary?.some((v: Vocabulary) => v.word.toLowerCase() === cleanWord.toLowerCase());
                      if (/^\s+$/.test(word)) return <span key={wIdx}>{word}</span>;
                      return (
                         <span 
                           key={wIdx}
                           onClick={(e) => handleWordClick(e, word)}
                           className={`inline-block transition-colors rounded px-0.5 ${isVocab ? 'cursor-help border-b-2 border-dotted border-ocean-400 text-ocean-900 font-medium hover:bg-yellow-200' : ''}`}
                         >
                           {word}
                         </span>
                      );
                   })}
                 </p>
               ))}
             </div>
          </div>
      </div>

      {/* Vocab Tooltip */}
      {activeVocab && (
        <div 
          className="fixed z-50 bg-ocean-900 text-white p-4 rounded-xl shadow-xl max-w-sm animate-in fade-in zoom-in duration-150 border-2 border-gold-500"
          style={{ left: Math.min(activeVocab.x - 20, window.innerWidth - 320), top: activeVocab.y + 20 }}
        >
          <h4 className="font-bold text-gold-500 text-xl mb-1">{activeVocab.word}</h4>
          <p className="text-lg">{activeVocab.def}</p>
        </div>
      )}
    </div>
  );
};

// --- Comprehension TF ---
export const ComprehensionTFSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showReading, setShowReading] = useState(false);

  const handleAnswer = (qId: number, val: boolean, correct: boolean) => {
    if (answers[qId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qId]: val === correct }));
  };

  // Collect highlighted sentences based on answered questions
  const highlights = data.content.questions
    .filter((q: QuestionTF) => answers[q.id] !== undefined && q.relatedSentence)
    .map((q: QuestionTF) => q.relatedSentence!);

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-50 justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-5xl w-full border border-slate-200 relative">
        
        {/* Reading Button */}
        <button 
            onClick={() => setShowReading(true)}
            className="absolute top-6 right-6 text-sm md:text-base bg-ocean-100 text-ocean-700 px-4 py-2 rounded-full font-bold hover:bg-ocean-200 transition-colors flex items-center gap-2"
        >
            <span>📖</span> Show Reading Text
        </button>

        <h3 className="text-3xl font-bold text-ocean-800 mb-8 text-center border-b pb-4 flex items-center justify-center gap-3">
           <span>⚖️</span> {data.subtitle}
        </h3>
        <div className="space-y-4">
          {data.content.questions.map((q: QuestionTF) => {
            const status = answers[q.id];
            return (
              <div key={q.id} className="relative">
                <div className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl transition-all border-2 ${status === true ? 'bg-green-50 border-green-200' : status === false ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100 hover:border-ocean-200'}`}>
                  <p className="text-lg md:text-xl font-medium text-slate-700 mb-3 md:mb-0 md:mr-4 flex-1">{q.statement}</p>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => handleAnswer(q.id, true, q.isTrue)} disabled={status !== undefined} className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${status === undefined ? 'bg-white border border-slate-300 hover:bg-ocean-50 hover:border-ocean-400' : (q.isTrue ? 'bg-green-600 text-white' : 'opacity-20')}`}>True</button>
                    <button onClick={() => handleAnswer(q.id, false, q.isTrue)} disabled={status !== undefined} className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${status === undefined ? 'bg-white border border-slate-300 hover:bg-ocean-50 hover:border-ocean-400' : (!q.isTrue ? 'bg-green-600 text-white' : 'opacity-20')}`}>False</button>
                  </div>
                </div>
                
                {/* Explanation Bubble */}
                {status !== undefined && (
                   <div className={`mt-2 p-3 rounded-xl text-base font-medium flex items-center gap-2 animate-in slide-in-from-top-2 ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <span className="text-xl">{status ? '✅' : '❌'}</span>
                      {q.explanation}
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ReadingReferenceModal 
        isOpen={showReading} 
        onClose={() => setShowReading(false)} 
        highlightSentences={highlights} 
      />
    </div>
  );
};

// --- Comprehension MC (Redesigned) ---
export const ComprehensionMCSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [showReading, setShowReading] = useState(false);

  const getIcon = (type: string) => {
    switch(type) {
      case 'geography': return '🌍';
      case 'history': return '📜';
      case 'person': return '👤';
      default: return '⚓';
    }
  };

  const getPraise = () => {
    const phrases = ["Excellent!", "Bravo!", "Great Job!", "Spot On!", "Correct!"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  // Collect highlighted sentences based on answered questions
  const highlights = data.content.questions
  .filter((q: QuestionMC) => selections[q.id] !== undefined && q.relatedSentence)
  .map((q: QuestionMC) => q.relatedSentence!);


  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-gradient-to-br from-ocean-900 to-ocean-700 relative">
      {/* Nautical Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
      
      <div className="w-full max-w-7xl relative z-10 py-6">
         <div className="flex justify-between items-center mb-8 border-b border-ocean-600 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md tracking-wider text-center flex-1">{data.subtitle}</h2>
            {/* Reading Button */}
            <button 
                onClick={() => setShowReading(true)}
                className="text-sm md:text-base bg-white/10 backdrop-blur text-white border border-white/20 px-4 py-2 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
            >
                <span>📖</span> Text
            </button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.content.questions.map((q: QuestionMC) => {
               const selection = selections[q.id];
               const isCorrect = selection === q.correctIndex;
               const showResult = selection !== undefined;

               return (
                  <div key={q.id} className="bg-ocean-50 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-ocean-200 hover:shadow-2xl transition-shadow duration-300">
                     {/* Card Header */}
                     <div className="bg-ocean-100 p-4 border-b border-ocean-200 flex items-start gap-3">
                        <span className="text-3xl bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm shrink-0">{getIcon(q.iconType)}</span>
                        <h4 className="text-ocean-900 font-bold text-lg md:text-xl leading-tight mt-1">{q.question}</h4>
                     </div>

                     {/* Options */}
                     <div className="p-4 space-y-2 flex-1">
                        {q.options.map((opt, idx) => {
                           let btnClass = "w-full text-left p-3 rounded-lg border-2 text-base md:text-lg font-medium transition-all relative ";
                           if (showResult) {
                              if (idx === q.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-900 font-bold";
                              else if (idx === selection && idx !== q.correctIndex) btnClass += "bg-red-100 border-red-400 text-red-900 opacity-60";
                              else btnClass += "border-transparent opacity-40";
                           } else {
                              btnClass += "bg-white border-slate-200 hover:border-ocean-400 hover:shadow-md hover:-translate-y-0.5";
                           }

                           return (
                              <button 
                                key={idx} 
                                onClick={() => !showResult && setSelections(prev => ({...prev, [q.id]: idx}))}
                                className={btnClass}
                              >
                                {opt}
                              </button>
                           );
                        })}
                     </div>

                     {/* Feedback Footer - ENHANCED */}
                     {showResult && (
                        <div className={`p-4 text-base font-medium text-center animate-in slide-in-from-bottom-2 ${isCorrect ? 'bg-ocean-800 text-white' : 'bg-red-100 text-red-600'}`}>
                           {isCorrect ? (
                               <>
                                <span className="block text-gold-500 font-bold text-xl mb-1">{getPraise()}</span>
                                {q.explanation}
                               </>
                           ) : "Incorrect. Try again!"}
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>

      <ReadingReferenceModal 
        isOpen={showReading} 
        onClose={() => setShowReading(false)} 
        highlightSentences={highlights} 
      />
    </div>
  );
};

// --- Grammar ---
export const GrammarSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [showReading, setShowReading] = useState(false);

  const checkAnswers = () => setChecked(true);

  // For grammar slide, usually we check all at once.
  // So we will highlight ALL related sentences ONLY IF 'checked' is true.
  const highlights = checked 
    ? data.content.items.filter((i: GrammarItem) => i.relatedSentence).map((i: GrammarItem) => i.relatedSentence!)
    : [];

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full border border-ocean-100 relative">
        <div className="absolute -top-6 -right-6 p-4 bg-yellow-100 rounded-full shadow-lg rotate-12 hidden md:block">
          <span className="text-5xl">✍️</span>
        </div>

        {/* Reading Button */}
        <button 
            onClick={() => setShowReading(true)}
            className="absolute top-6 left-6 text-sm bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full font-bold hover:bg-ocean-200 transition-colors flex items-center gap-2"
        >
            <span>📖</span> Show Reading Text
        </button>
        
        <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-ocean-800">{data.title}</h3>
            <p className="text-slate-500 text-lg">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-y-4 md:gap-y-6">
          {data.content.items.map((item: GrammarItem) => {
             const userVal = (inputs[item.id] || "").toLowerCase().trim();
             const isCorrect = userVal === item.correctAnswer;
             
             return (
               <div key={item.id} className="flex flex-wrap items-center text-xl md:text-2xl border-b border-slate-100 pb-2">
                 <span className="text-slate-400 font-bold text-base mr-4 w-6">{item.id}.</span>
                 <span className="text-slate-800 mr-2">{item.prefix}</span>
                 <div className="relative inline-block mx-1">
                   <input
                     type="text"
                     value={inputs[item.id] || ""}
                     onChange={(e) => {
                       setChecked(false);
                       setInputs({...inputs, [item.id]: e.target.value});
                     }}
                     className={`border-b-2 bg-transparent text-center w-24 md:w-32 font-bold focus:outline-none transition-colors ${
                       checked 
                        ? (isCorrect ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600')
                        : 'border-slate-300 focus:border-ocean-500'
                     }`}
                     placeholder="..."
                   />
                 </div>
                 <span className="text-slate-800 ml-1">{item.suffix}</span>
                 {checked && isCorrect && <span className="ml-2 text-green-500 text-2xl animate-bounce">✓</span>}
                 {checked && !isCorrect && <span className="ml-2 text-red-500 text-base font-bold animate-pulse">({item.correctAnswer})</span>}
               </div>
             );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={checkAnswers}
            className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-16 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-xl"
          >
            Check Answers
          </button>
        </div>
      </div>

      <ReadingReferenceModal 
        isOpen={showReading} 
        onClose={() => setShowReading(false)} 
        highlightSentences={highlights} 
      />
    </div>
  );
};

// --- Speaking ---
export const SpeakingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto">
      <div className="max-w-[1600px] w-full flex flex-col gap-6 h-full">
        
        {/* Grammar Tip Card */}
        {data.content.grammarTip && (
           <div className="bg-white rounded-3xl shadow-lg border border-ocean-100 overflow-hidden shrink-0">
              <div className="bg-ocean-600 text-white p-3 text-center">
                 <h3 className="text-lg font-bold uppercase tracking-wider">{data.content.grammarTip.title}</h3>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                    <h4 className="text-green-800 font-bold mb-2 border-b border-green-200 pb-1">{data.content.grammarTip.positive.title}</h4>
                    <ul className="text-sm font-mono text-slate-700 space-y-1">
                      {data.content.grammarTip.positive.examples.map((ex: string, i: number) => <li key={i}>{ex}</li>)}
                    </ul>
                 </div>
                 <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                    <h4 className="text-red-800 font-bold mb-2 border-b border-red-200 pb-1">{data.content.grammarTip.negative.title}</h4>
                    <ul className="text-sm font-mono text-slate-700 space-y-1">
                      {data.content.grammarTip.negative.examples.map((ex: string, i: number) => <li key={i}>{ex}</li>)}
                    </ul>
                 </div>
                 <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <h4 className="text-blue-800 font-bold mb-2 border-b border-blue-200 pb-1">{data.content.grammarTip.question.title}</h4>
                    <ul className="text-sm font-mono text-slate-700 space-y-1">
                      {data.content.grammarTip.question.examples.map((ex: string, i: number) => <li key={i}>{ex}</li>)}
                    </ul>
                 </div>
                 <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                    <h4 className="text-yellow-800 font-bold mb-2 border-b border-yellow-200 pb-1">{data.content.grammarTip.timeExpressions.title}</h4>
                    <div className="flex flex-wrap gap-2">
                       {data.content.grammarTip.timeExpressions.list.map((item: string, i: number) => (
                         <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-yellow-200 text-slate-600 shadow-sm">{item}</span>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-ocean-100 flex flex-col h-full overflow-y-auto">
            <h3 className="text-2xl font-bold text-ocean-800 mb-4 flex items-center gap-2">
              <span>❓</span> Ask your partner:
            </h3>
            <ul className="space-y-4 flex-1">
              {data.content.prompts.map((p: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-lg md:text-xl text-slate-700 bg-slate-50 p-3 rounded-lg">
                  <span className="text-ocean-500 font-bold mt-0.5 shrink-0">Q:</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ocean-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col h-full overflow-y-auto">
            <div className="absolute top-0 right-0 w-48 h-48 bg-ocean-700 rounded-full -mr-12 -mt-12 opacity-50"></div>
            <h3 className="text-2xl font-bold mb-4 text-ocean-100 relative z-10 flex items-center gap-2">
               <span>💬</span> Answer examples:
            </h3>
            <div className="space-y-4 relative z-10 flex-1">
              {data.content.examples.map((ex: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-gold-500 font-bold mt-0.5 shrink-0 text-xl">A:</span>
                  <p className="text-lg md:text-xl italic text-ocean-50">"{ex}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Drill Slide ---
export const DrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const checkAnswers = () => setChecked(true);

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-50">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-ocean-100 mt-8">
            <h2 className="text-3xl font-bold text-ocean-900 mb-2">{data.title}</h2>
            <p className="text-slate-500 mb-8">{data.subtitle}</p>

            <div className="space-y-4">
                {data.content.drills.map((drill: DrillItem) => {
                    const userVal = inputs[drill.id] || "";
                    const isCorrect = userVal.trim().toLowerCase() === drill.correctAnswer.toLowerCase();

                    return (
                        <div key={drill.id} className="bg-ocean-50 p-4 rounded-xl border border-ocean-100 flex flex-col md:flex-row items-center gap-4">
                            <div className="bg-white px-3 py-1 rounded border border-ocean-200 text-sm font-mono text-ocean-600 font-bold whitespace-nowrap min-w-[150px] text-center">
                                {drill.prompt}
                            </div>
                            <div className="flex-1 text-lg md:text-xl flex flex-wrap items-center gap-2 justify-center md:justify-start">
                                <span>{drill.part1}</span>
                                <input 
                                    type="text" 
                                    value={userVal}
                                    onChange={(e) => {
                                        setChecked(false);
                                        setInputs(prev => ({...prev, [drill.id]: e.target.value}));
                                    }}
                                    className={`border-b-2 bg-transparent w-32 px-2 text-center font-bold focus:outline-none transition-colors ${
                                        checked 
                                        ? (isCorrect ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700') 
                                        : 'border-slate-400 focus:border-ocean-500'
                                    }`}
                                />
                                <span>{drill.part2}</span>
                                {checked && (
                                    isCorrect 
                                    ? <span className="text-green-500 text-xl">✓</span> 
                                    : <span className="text-red-500 text-sm font-bold ml-2">({drill.correctAnswer})</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-center">
                <button 
                    onClick={checkAnswers}
                    className="bg-ocean-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-ocean-700 transition-transform active:scale-95"
                >
                    Check Answers
                </button>
            </div>
        </div>
    </div>
  );
};

// --- Grammar Bank Slide ---
export const GrammarBankSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const getKey = (sectionId: number, itemId: number, answerIndex: number) => `${sectionId}-${itemId}-${answerIndex}`;

  const checkAnswers = () => setChecked(true);

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-100">
        <div className="max-w-5xl w-full space-y-8 pb-10 mt-4">
            <div className="text-center">
                 <h2 className="text-3xl font-bold text-ocean-900">{data.title}</h2>
                 <p className="text-slate-500">{data.subtitle}</p>
            </div>

            {data.content.sections.map((section: GrammarBankSection) => (
                <div key={section.id} className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
                    <h3 className="text-xl font-bold text-ocean-800 mb-2 border-b border-ocean-100 pb-2">{section.title}</h3>
                    <p className="text-sm text-slate-500 italic mb-4 bg-yellow-50 p-2 rounded inline-block">Instruction: {section.instruction}</p>
                    
                    <div className="space-y-4">
                        {section.items.map((item: GrammarBankItem) => (
                            <div key={item.id} className="flex flex-wrap items-center gap-1 text-lg leading-loose">
                                <span className="font-bold text-slate-400 w-8">{item.id}.</span>
                                {item.answers.map((ans, idx) => {
                                    const key = getKey(section.id, item.id, idx);
                                    const val = inputs[key] || "";
                                    const isCorrect = val.trim().toLowerCase() === ans.toLowerCase();
                                    
                                    return (
                                        <React.Fragment key={idx}>
                                            <span dangerouslySetInnerHTML={{ __html: item.segments[idx] }}></span>
                                            <div className="relative inline-flex items-center">
                                                <input 
                                                    type="text"
                                                    value={val}
                                                    onChange={(e) => {
                                                        setChecked(false);
                                                        setInputs(prev => ({...prev, [key]: e.target.value}));
                                                    }}
                                                    style={{ width: `${Math.max(ans.length * 14, 60)}px` }}
                                                    className={`border-b-2 bg-slate-50 px-1 text-center font-bold focus:outline-none transition-colors mx-1 rounded-t ${
                                                        checked 
                                                        ? (isCorrect ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800') 
                                                        : 'border-slate-300 focus:border-ocean-500'
                                                    }`}
                                                />
                                            </div>
                                            {checked && !isCorrect && <span className="text-xs text-red-500 font-bold mr-1">({ans})</span>}
                                        </React.Fragment>
                                    );
                                })}
                                <span dangerouslySetInnerHTML={{ __html: item.segments[item.segments.length - 1] }}></span>
                                {checked && item.answers.every((ans, idx) => (inputs[getKey(section.id, item.id, idx)]||"").trim().toLowerCase() === ans.toLowerCase()) && (
                                    <span className="text-green-500 ml-2 text-xl">✓</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-center pb-8">
                <button 
                    onClick={checkAnswers}
                    className="bg-ocean-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-ocean-700 transition-transform active:scale-95 text-lg"
                >
                    Check All Answers
                </button>
            </div>
        </div>
    </div>
  );
};

// --- Media Slide ---
export const MediaSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    return (
        <div className="h-full flex flex-col p-4 overflow-y-auto bg-slate-900">
             <div className="max-w-[1600px] w-full mx-auto my-auto">
                <div className="text-center mb-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
                    <p className="text-slate-400">{data.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.content.items.map((item: any, idx: number) => (
                        <div 
                            key={idx}
                            onClick={() => setSelectedItem(item)} 
                            className="group relative aspect-square bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:ring-4 ring-ocean-500 transition-all shadow-lg"
                        >
                            {item.type === 'video' ? (
                                <div className="w-full h-full flex items-center justify-center bg-black relative">
                                    <span className="text-4xl relative z-10">▶️</span>
                                    {/* Try to extract ID or show placeholder */}
                                    {item.src.includes('v=') ? (
                                        <img 
                                            src={`https://img.youtube.com/vi/${item.src.split('v=')[1]}/hqdefault.jpg`} 
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                            alt={item.caption}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-slate-700 opacity-60"></div>
                                    )}
                                </div>
                            ) : (
                                <img src={item.src} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p className="text-white font-bold text-sm">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             {/* Lightbox / Viewer */}
             {selectedItem && (
                 <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedItem(null)}>
                     <div className="max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                         <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px]">
                            {selectedItem.type === 'video' ? (
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    className="aspect-video"
                                    src={selectedItem.src.replace('watch?v=', 'embed/')} 
                                    title={selectedItem.caption}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedItem.src} alt={selectedItem.caption} className="max-h-[70vh] w-auto object-contain" />
                            )}
                         </div>
                         <div className="w-full md:w-80 bg-slate-800 p-6 flex flex-col">
                             <h3 className="text-xl font-bold text-white mb-2">{selectedItem.caption}</h3>
                             <div className="h-1 w-10 bg-ocean-500 mb-4"></div>
                             <p className="text-slate-300 leading-relaxed text-sm md:text-base overflow-y-auto">{selectedItem.description}</p>
                             <div className="mt-auto pt-6">
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                             </div>
                         </div>
                     </div>
                 </div>
             )}
        </div>
    );
};
