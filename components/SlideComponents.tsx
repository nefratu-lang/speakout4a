import React, { useState, useEffect, useRef } from 'react';
import { SlideData, MatchingItem, DrillItem } from '../types';

// --- Cover Slide ---
export const CoverSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data, onNext }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 text-white">
       <div className="absolute inset-0 z-0 opacity-40">
           <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
       </div>
       
       <div className="relative z-10 text-center px-4 max-w-5xl animate-in zoom-in duration-700">
          <div className="mb-8 flex justify-center">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber-500 flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-pulse">
                ⚓
             </div>
          </div>
          
          <div className="bg-slate-950/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
              <h1 className="text-5xl md:text-8xl font-serif font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 drop-shadow-sm uppercase tracking-tight">
                {data.title}
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 font-mono tracking-[0.3em] uppercase border-t border-slate-700 pt-6 mt-6">
                {data.subtitle}
              </p>
          </div>

          {/* TIKLANABİLİR BAŞLATMA ALANI */}
          <div 
            onClick={onNext}
            className="mt-16 animate-bounce cursor-pointer hover:scale-110 transition-transform active:scale-95 group"
          >
            <p className="text-sm md:text-base text-amber-500 font-mono font-black tracking-widest bg-slate-950/50 inline-block px-6 py-2 rounded-full border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                [ TAP TO START ]
            </p>
            <div className="mt-2 text-amber-500 text-3xl group-hover:text-amber-400">▼</div>
          </div>
       </div>
    </div>
  );
};

// --- Objectives Slide ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-slate-50 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <div className="flex flex-col justify-center">
                <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black font-mono uppercase tracking-widest mb-6 w-fit border border-blue-200">
                    Mission Briefing
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 leading-tight">
                    {data.title}
                </h2>
                <div className="space-y-6">
                    {data.content.objectives?.map((obj: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-black font-mono text-sm shadow-lg shadow-blue-200">
                                {idx + 1}
                            </span>
                            <p className="text-lg text-slate-700 font-medium leading-relaxed pt-0.5">{obj}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center relative">
                 <div className="relative z-10 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl rotate-3 border-4 border-slate-800">
                    <h3 className="text-amber-500 font-mono font-black text-xl mb-6 uppercase tracking-widest border-b border-slate-700 pb-4">
                        Target Vocabulary
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {["Travel", "Exploration", "History", "Navigation", "Culture"].map((tag, i) => (
                            <span key={i} className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-bold border border-slate-700 text-slate-300">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-700">
                        <div className="flex items-center gap-3 text-slate-400 text-sm font-mono">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            System Status: READY
                        </div>
                    </div>
                 </div>
                 {/* Back card for depth */}
                 <div className="absolute inset-0 bg-amber-500 rounded-[2.5rem] -rotate-3 opacity-20 scale-95 z-0"></div>
            </div>
        </div>
    </div>
  );
};

// --- Vocabulary Slide ---
export const VocabularySlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-900 p-6 md:p-10 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-4">{data.title}</h2>
                    <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.content.vocabulary?.map((vocab, idx) => (
                        <div key={idx} className="group bg-slate-800 rounded-2xl p-1 border border-slate-700 hover:border-amber-500 transition-colors duration-300">
                            <div className="bg-slate-900 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl font-black text-white group-hover:opacity-20 transition-opacity">
                                    {idx + 1}
                                </div>
                                <h3 className="text-2xl font-bold text-amber-400 mb-2 group-hover:translate-x-2 transition-transform">{vocab.word}</h3>
                                <p className="text-slate-400 text-sm italic mb-4 border-b border-slate-800 pb-2">{vocab.pronunciation}</p>
                                <p className="text-slate-300 font-medium leading-relaxed mb-4 flex-grow">{vocab.definition}</p>
                                <div className="bg-slate-800/50 p-3 rounded-lg border-l-2 border-blue-500">
                                    <p className="text-slate-400 text-xs italic">"{vocab.context}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Reading Slide ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full flex flex-col lg:flex-row bg-[#fdfbf7]">
            <div className="lg:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar border-r border-stone-200">
                <div className="max-w-2xl mx-auto">
                    <span className="text-amber-600 font-black font-mono text-xs uppercase tracking-widest mb-4 block">Historical Archive</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-stone-900 mb-8 leading-tight">{data.title}</h2>
                    
                    <div className="prose prose-lg prose-stone">
                        {data.content.text.split('\n\n').map((para, idx) => (
                            <p key={idx} className="text-stone-700 leading-loose first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-stone-900">
                                {para.trim()}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="lg:w-1/2 bg-stone-100 relative overflow-hidden group">
                 {data.content.image && (
                     <>
                        <img 
                            src={data.content.image} 
                            alt="Reading Context" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100" 
                        />
                        <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-sm border-l-4 border-amber-600 max-w-md shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                            <p className="text-stone-800 font-serif italic text-lg">"History is not just about the past, it is the map of our future."</p>
                        </div>
                     </>
                 )}
            </div>
        </div>
    );
};

// --- Grammar Slide ---
export const GrammarSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-indigo-50 p-6 md:p-12 overflow-y-auto custom-scrollbar flex items-center justify-center">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-16">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-200">Grammar Focus</span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-2">{data.title}</h2>
                    <p className="text-xl text-slate-500 font-serif italic">Structure & Usage Patterns</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-lg">Aa</span>
                            Explanation
                        </h3>
                        <ul className="space-y-4">
                            {data.content.grammarPoints?.map((point, i) => (
                                <li key={i} className="flex gap-4 text-slate-600 leading-relaxed">
                                    <span className="text-indigo-500 text-xl mt-0.5">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        {data.content.examples?.map((ex, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-purple-500 flex items-center gap-6 transform hover:-translate-x-2 transition-transform duration-300">
                                <div className="text-4xl text-purple-200 font-serif font-black">“</div>
                                <div>
                                    <p className="text-lg font-medium text-slate-800">{ex.sentence}</p>
                                    <p className="text-sm text-slate-400 mt-1 uppercase tracking-wide font-bold text-[10px]">{ex.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Matching Slide ---
export const MatchingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    
    // Correct pair check: leftId === rightId (based on data structure)
    const handleLeftClick = (id: number) => {
        if (matchedPairs.includes(id)) return;
        setSelectedLeft(id);
    };

    const handleRightClick = (id: number) => {
        if (matchedPairs.includes(id)) return;
        if (selectedLeft === id) {
            setMatchedPairs([...matchedPairs, id]);
            setSelectedLeft(null);
        } else {
            // Error handling could go here (shake animation etc.)
            setSelectedLeft(null);
        }
    };

    return (
        <div className="h-full w-full bg-slate-100 p-6 flex flex-col items-center justify-center overflow-hidden">
             <div className="max-w-5xl w-full h-full flex flex-col">
                <div className="text-center mb-8 shrink-0">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tight">{data.title}</h2>
                    <p className="text-slate-500 mt-2 font-mono text-sm">Connect the pairs correctly</p>
                </div>

                <div className="flex-1 flex gap-8 md:gap-20 items-stretch justify-center min-h-0">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col justify-center gap-4 overflow-y-auto custom-scrollbar p-2">
                        {data.content.pairs?.map((pair: MatchingItem) => {
                             const isMatched = matchedPairs.includes(pair.id);
                             const isSelected = selectedLeft === pair.id;
                             return (
                                <button
                                    key={`L-${pair.id}`}
                                    onClick={() => handleLeftClick(pair.id)}
                                    disabled={isMatched}
                                    className={`
                                        w-full p-6 rounded-xl text-left border-2 transition-all duration-300 relative overflow-hidden group
                                        ${isMatched 
                                            ? 'bg-green-100 border-green-500 text-green-800 shadow-none' 
                                            : isSelected
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105 z-10'
                                                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <span className="font-bold text-lg">{pair.left}</span>
                                    {isMatched && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-xl font-black">✓</span>}
                                </button>
                             );
                        })}
                    </div>

                    {/* Right Column (Shuffled visually in a real app, but simplified here) */}
                    <div className="flex-1 flex flex-col justify-center gap-4 overflow-y-auto custom-scrollbar p-2">
                         {/* Note: In a real game, you'd shuffle these right items. Here we just render them but logic checks ID match */}
                         {[...data.content.pairs].sort((a,b) => a.id - b.id).map((pair: MatchingItem) => { // Simple sort to keep order or use a shuffle util
                             const isMatched = matchedPairs.includes(pair.id);
                             return (
                                <button
                                    key={`R-${pair.id}`}
                                    onClick={() => handleRightClick(pair.id)}
                                    disabled={isMatched}
                                    className={`
                                        w-full p-6 rounded-xl text-right border-2 transition-all duration-300 relative
                                        ${isMatched 
                                            ? 'bg-green-100 border-green-500 text-green-800 opacity-50' 
                                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    <span className="font-medium text-lg">{pair.right}</span>
                                </button>
                             );
                        })}
                    </div>
                </div>
             </div>
        </div>
    );
};

// --- Drill Slide ---
export const DrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [revealed, setRevealed] = useState(false);
    
    const items = data.content.drills || [];
    const currentItem = items[currentStep];

    const nextDrill = () => {
        if (currentStep < items.length - 1) {
            setCurrentStep(p => p + 1);
            setRevealed(false);
        }
    };

    return (
        <div className="h-full w-full bg-indigo-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
            {/* Background noise texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            
            <div className="relative z-10 w-full max-w-3xl">
                <div className="text-center mb-12">
                     <h2 className="text-4xl font-black uppercase tracking-widest text-indigo-300">{data.title}</h2>
                     <div className="flex justify-center gap-2 mt-4">
                        {items.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} />
                        ))}
                     </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative min-h-[300px] flex flex-col justify-center items-center">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl border-4 border-indigo-900 shadow-xl">
                        {currentStep + 1}
                     </div>
                     
                     <h3 className="text-3xl md:text-5xl font-bold mb-10 leading-snug">{currentItem.question}</h3>
                     
                     {revealed ? (
                         <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                             <p className="text-2xl md:text-3xl text-green-400 font-bold bg-black/30 px-6 py-3 rounded-xl inline-block border border-green-500/50">
                                {currentItem.answer}
                             </p>
                             {currentStep < items.length - 1 && (
                                 <button onClick={nextDrill} className="block mx-auto mt-8 text-sm uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Next Challenge →</button>
                             )}
                         </div>
                     ) : (
                         <button 
                            onClick={() => setRevealed(true)}
                            className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-indigo-100 hover:scale-105 transition-all shadow-lg active:scale-95"
                         >
                            Reveal Answer
                         </button>
                     )}
                </div>
            </div>
        </div>
    );
};
