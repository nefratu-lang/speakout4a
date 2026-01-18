import React, { useState, useEffect } from 'react';
import { SLIDES, LESSON_TITLE } from './constants';
import { SlideType } from './types';
import { 
  CoverSlide, 
  ObjectivesSlide, 
  VocabularySlide,
  ReadingSlide,
  GrammarSlide,
  MatchingSlide,
  DrillSlide
} from './components/SlideComponents';
import AITutor from './components/AITutor';

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showTutor, setShowTutor] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // Tam Ekran Durumu

  const currentSlide = SLIDES[currentSlideIndex];
  
  // Progress calculation
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // --- FULLSCREEN TOGGLE ---
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Fullscreen error: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [currentSlideIndex]);

  const renderSlideContent = () => {
    switch(currentSlide.type) {
      // Kapak Sayfasına onNext prop'unu iletiyoruz
      case SlideType.COVER:
        return <CoverSlide data={currentSlide} onNext={nextSlide} />;
      case SlideType.OBJECTIVES:
        return <ObjectivesSlide data={currentSlide} />;
      case SlideType.VOCABULARY:
        return <VocabularySlide data={currentSlide} />;
      case SlideType.READING:
        return <ReadingSlide data={currentSlide} />;
      case SlideType.GRAMMAR:
        return <GrammarSlide data={currentSlide} />;
      case SlideType.MATCHING:
        return <MatchingSlide data={currentSlide} />;
      case SlideType.DRILL:
        return <DrillSlide data={currentSlide} />;
      default:
        return <div className="p-10 text-center">Slide type not supported</div>;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-100 font-sans overflow-hidden text-slate-800 relative">
      
      {/* --- FULLSCREEN BUTTON (Sağ Üst) --- */}
      <button 
        onClick={toggleFullscreen}
        className="fixed top-3 right-4 z-50 p-2 bg-white/90 hover:bg-white backdrop-blur-sm text-slate-700 rounded-full shadow-lg border border-slate-200 transition-all active:scale-95"
        title="Toggle Fullscreen"
      >
        {isFullscreen ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        )}
      </button>

      {/* Header (Hidden on Cover) */}
      {currentSlide.type !== SlideType.COVER && (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm shrink-0 z-20">
           <div className="flex items-center gap-3">
              <span className="text-2xl">⚓</span>
              <h1 className="font-bold text-slate-800 uppercase tracking-widest text-sm md:text-base">
                {LESSON_TITLE}
              </h1>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="text-slate-500 font-mono text-sm bg-slate-100 px-3 py-1 rounded mr-12 md:mr-0">
                {currentSlideIndex + 1} / {SLIDES.length}
              </div>
              <button 
                onClick={() => setShowTutor(!showTutor)}
                className={`
                  p-2 rounded-full transition-all duration-300
                  ${showTutor ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-500 hover:bg-indigo-100'}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
           </div>
        </header>
      )}

      {/* Progress Bar */}
      {currentSlide.type !== SlideType.COVER && (
        <div className="h-1 bg-slate-200 w-full shrink-0 z-20">
           <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
           />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {renderSlideContent()}
        
        {/* AI Tutor Overlay */}
        <AITutor 
          isOpen={showTutor} 
          onClose={() => setShowTutor(false)} 
          currentSlide={currentSlide}
        />
      </main>

      {/* Navigation Footer (Hidden on Cover) */}
      {currentSlide.type !== SlideType.COVER && (
        <footer className="bg-white border-t border-slate-200 px-6 py-4 shrink-0 z-20 flex justify-between items-center">
           <button 
             onClick={prevSlide}
             disabled={currentSlideIndex === 0}
             className="px-6 py-3 rounded-lg font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center gap-2"
           >
             ← BACK
           </button>

           <div className="hidden md:flex gap-1.5">
              {SLIDES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentSlideIndex ? 'bg-indigo-600 w-4' : 'bg-slate-300'}`}
                />
              ))}
           </div>

           <button 
             onClick={nextSlide}
             disabled={currentSlideIndex === SLIDES.length - 1}
             className="px-8 py-3 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2 transform active:scale-95"
           >
             NEXT →
           </button>
        </footer>
      )}
    </div>
  );
};

export default App;
