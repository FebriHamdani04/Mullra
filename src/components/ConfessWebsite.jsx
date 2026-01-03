import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { Heart, Mail, Music, Sparkles, Star, Volume2, ChevronDown } from 'lucide-react';

const ConfessWebsite = memo(() => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonRotation, setNoButtonRotation] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const contentRef = useRef(null);
  const confessionRef = useRef(null);


  const galleryPhotos = useMemo(() => [
    { id: 1, src: 'image.png', caption: 'Kenangan pertama kita bersama' },
    { id: 2, src: 'image1.png', caption: 'Saat aku tahu kamu spesial' },
    { id: 3, src: 'image2.png', caption: 'Momen yang ingin aku abadikan' },
    { id: 4, src: 'image3.png', caption: 'Bukti bahwa kita pantas bersama' },
    { id: 5, src: 'image4.png', caption: 'Setiap tawa bersamamu' },
    { id: 6, src: 'image5.png', caption: 'Selamanya denganmu' },
  ], []);


  const glueSongLyrics = useMemo(() => [
    'Finding the right words',
    'To use for this song',
    'I have you in mind',
    'So it won\'t take so long',
    'Never thought I would find you',
    'But you\'re here',
  ], []);


  const noButtonTexts = useMemo(() => [
    'TIDAK',
    'Yakin nih?',
    'Coba lagi dong',
    'Nggak bisa!',
    'Hmm... 🤔',
    'Gabisa dipencet!',
    'Serius nih?',
    'Mustahil! 😜',
    'Coba "YES"!',
    'Aku kabur! 🏃',
  ], []);


  useEffect(() => {
    if (envelopeOpen) {
      let lyricIndex = 0;
      let lyricIntervalId = null;
      let typeIntervalId = null;
      
      const typewriterEffect = (text, isLastLyric = false) => {
        setIsTyping(true);
        setTypedText('');
        let charIndex = 0;
        
        typeIntervalId = setInterval(() => {
          if (charIndex < text.length) {
            setTypedText(text.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typeIntervalId);
            setIsTyping(false);
            

            if (isLastLyric) {
              clearInterval(lyricIntervalId);
              setTimeout(() => {
                confessionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 500);
            }
          }
        }, 50);
      };
      

      const isFirst = glueSongLyrics.length === 1;
      typewriterEffect(glueSongLyrics[0] || '', isFirst);
      
      lyricIntervalId = setInterval(() => {
        if (lyricIndex < glueSongLyrics.length - 1) {
          lyricIndex++;
          setCurrentLyricIndex(lyricIndex);
          const isLast = lyricIndex === glueSongLyrics.length - 1;
          typewriterEffect(glueSongLyrics[lyricIndex] || '', isLast);
        }
      }, 3100);
      
      return () => {
        clearInterval(lyricIntervalId);
        clearInterval(typeIntervalId);
      };
    }
  }, [envelopeOpen, glueSongLyrics]);




  const handleEnvelopeClick = useCallback(() => {
    if (!envelopeOpen) {
      setEnvelopeOpen(true);
      

      if (audioRef.current) {
        audioRef.current.currentTime = 50;
        audioRef.current.play().catch(() => {
          setMusicPlaying(true);
        });
        setMusicPlaying(true);
      } else {
        setMusicPlaying(true);
      }
    }
  }, [envelopeOpen]);

  const handleNoClick = useCallback(() => {
    setNoClickCount(prev => prev + 1);
    setYesButtonScale(prev => Math.min(prev + 0.15, 2.5));
    
    const maxX = 150;
    const maxY = 100;
    
    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;
    const randomRotation = (Math.random() - 0.5) * 45;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonRotation(randomRotation);
  }, []);

  const handleYesClick = useCallback(() => {
    setYesClicked(true);
    setShowFireworks(true);

    setTimeout(() => setShowFireworks(false), 3000);
  }, []);


  const scrollToContent = useCallback(() => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-blush via-cream to-blush text-gray-800 min-h-screen overflow-x-hidden" ref={containerRef}>

      <audio
        ref={audioRef}
        src="glue-song.mp3"
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={() => {
          if (envelopeOpen) setMusicPlaying(true);
        }}
      />


      {envelopeOpen && musicPlaying && (
        <div className="fixed top-4 right-4 z-50 bg-white/30 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-white/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-coral to-blush rounded-full flex items-center justify-center animate-spin-slow">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-body font-semibold text-gray-800">Glue Song</span>
              <span className="text-xs text-gray-500">Beabadoobee</span>
            </div>
            <Volume2 className="w-4 h-4 text-coral animate-pulse" />
          </div>
        </div>
      )}


      {!envelopeOpen && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-xl md:text-2xl mb-4 text-gray-700 font-display font-semibold animate-fadeIn">
              Dikirim lewat jarak, tapi isinya serius 💌
            </p>
            <p className="text-sm md:text-base mb-8 text-gray-600 font-body animate-pulse">
              Tap to open
            </p>
            
            <div 
              className="inline-block cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={handleEnvelopeClick}
            >

              <div className="relative w-56 h-36 md:w-72 md:h-48">

                <div className="absolute inset-0 bg-coral/40 rounded-xl blur-2xl animate-pulse"></div>
                
                <div 
                  className="relative w-full h-full rounded-xl shadow-2xl flex items-center justify-center overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #FF9494 0%, #FFE5E5 50%, #FF9494 100%)',
                  }}
                >

                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-coral">
                      <Heart className="w-6 h-6 md:w-7 md:h-7 text-coral animate-heartbeat" fill="#FF9494" />
                    </div>
                  </div>
                  
                  <Mail className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg animate-pulse" />
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-sm text-gray-600 font-body flex items-center justify-center gap-2 animate-pulse">
              <Heart className="w-4 h-4 text-coral" fill="#FF9494" />
              Click the envelope
              <Heart className="w-4 h-4 text-coral" fill="#FF9494" />
            </p>
          </div>
        </div>
      )}


      {envelopeOpen && !yesClicked && (
        <div className="min-h-screen overflow-y-auto">

          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-bounce cursor-pointer" onClick={scrollToContent}>
            <div className="bg-white/30 backdrop-blur-md rounded-full p-2 border border-white/40">
              <ChevronDown className="w-6 h-6 text-coral" />
            </div>
          </div>


          <section className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">

            <div className="absolute inset-0 z-0 grid grid-cols-2 gap-1">
              {galleryPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative overflow-hidden"
                >
                  <img 
                    src={photo.src} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute inset-0 bg-gradient-to-b from-blush/30 via-transparent to-blush/30"></div>
            </div>
            
            <div className="max-w-2xl mx-auto w-full relative z-10 px-6 my-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
                

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${15 + (i * 20)}%`,
                        bottom: '-20px',
                        fontSize: '16px',
                        willChange: 'transform, opacity',
                        animation: `floatHeart ${5 + i}s ease-in-out ${i}s infinite`,
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
                
                <div className="text-center mb-6 relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Music className="w-6 h-6 text-coral animate-music-pulse" />
                    <h3 className="text-2xl md:text-3xl font-display text-coral font-semibold">
                      Glue Song
                    </h3>
                    <Music className="w-6 h-6 text-coral animate-music-pulse" />
                  </div>
                  <div className="w-20 h-0.5 bg-coral/50 mx-auto"></div>
                </div>
                
                <div className="space-y-5 relative z-10 py-4">
                  {glueSongLyrics.slice(0, currentLyricIndex + 1).map((lyric, index) => (
                    <div
                      key={index}
                      className="text-center transition-all duration-500"
                    >
                      {lyric ? (
                        <p className={`text-lg md:text-xl font-body py-1 ${
                          index === currentLyricIndex 
                            ? 'text-coral font-semibold' 
                            : 'text-gray-600 opacity-60'
                        }`}>

                          {index === currentLyricIndex ? (
                            <>
                              {typedText}
                              {isTyping && <span className="animate-blink">|</span>}
                            </>
                          ) : lyric}
                        </p>
                      ) : (
                        <div className="h-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          <section ref={confessionRef} className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100"></div>
            

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {['🌸', '🌷', '💐', '🌹', '🌺'].map((flower, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + i * 20}%`,
                    top: '-30px',
                    fontSize: '24px',
                    animation: `floatPetal ${6 + i}s ease-in-out ${i * 0.8}s infinite`,
                    willChange: 'transform',
                  }}
                >
                  {flower}
                </div>
              ))}
            </div>
            

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles 
                  key={i}
                  className="absolute text-coral/20 animate-pulse"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    width: '20px',
                    height: '20px',
                  }}
                />
              ))}
            </div>
            
            <div className="max-w-2xl mx-auto w-full relative z-10">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                

                <div className="absolute top-4 left-4 text-2xl">🌸</div>
                <div className="absolute top-4 right-4 text-2xl">🌸</div>
                <div className="absolute bottom-4 left-4 text-2xl">💕</div>
                <div className="absolute bottom-4 right-4 text-2xl">💕</div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Heart className="w-8 h-8 text-coral animate-heartbeat" fill="#FF9494" />
                    <h2 className="text-2xl md:text-4xl font-display text-gray-800">
                      Mau nggak jadi pacar aku?
                    </h2>
                    <Heart className="w-8 h-8 text-coral animate-heartbeat" fill="#FF9494" />
                  </div>
                  <p className="text-base md:text-lg text-gray-600 font-body italic mb-10">
                    "And so I love you..."
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[120px]">

                    <button
                      ref={noButtonRef}
                      onClick={handleNoClick}
                      className="px-8 py-4 bg-gray-200/80 backdrop-blur-sm hover:bg-gray-300 text-gray-700 rounded-full font-body text-lg font-medium transition-all duration-500 shadow-lg select-none"
                      style={{
                        transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) rotate(${noButtonRotation}deg)`,
                        transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                      }}
                    >
                      {noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]}
                    </button>
                    

                    <button
                      onClick={handleYesClick}
                      className="px-10 py-4 bg-gradient-to-r from-coral to-coral/90 text-white rounded-full font-body text-xl font-bold shadow-2xl transition-all duration-500 relative overflow-hidden group"
                      style={{
                        transform: `scale(${yesButtonScale})`,
                        boxShadow: yesButtonScale > 1.2 
                          ? `0 0 ${yesButtonScale * 25}px rgba(255, 148, 148, 0.6)` 
                          : '0 20px 40px rgba(255, 148, 148, 0.4)',
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5 animate-heartbeat" fill="white" />
                        YES
                        <Heart className="w-5 h-5 animate-heartbeat" fill="white" />
                      </span>
                      

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                  
                  {noClickCount > 2 && (
                    <p className="mt-6 text-sm text-gray-500 animate-fadeIn">
                      Hint: Tombol "TIDAK" tidak mau dipencet 😜
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}


      {yesClicked && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200"></div>
          

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: '-20px',
                  fontSize: '20px',
                  willChange: 'transform',
                  animation: `confettiFall ${3 + (i % 3)}s ease-out ${(i % 5) * 0.2}s infinite`,
                }}
              >
                {['🎉', '💖', '✨', '🌸', '💕'][i % 5]}
              </div>
            ))}
          </div>
          

          {showFireworks && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + (i * 4.5)}%`,
                    top: `${20 + (i % 4) * 15}%`,
                    fontSize: `${24 + (i % 3) * 8}px`,
                    animation: `firework ${0.8 + (i % 3) * 0.3}s ease-out ${i * 0.1}s both`,
                  }}
                >
                  {['🎆', '🎇', '✨', '💥', '⭐'][i % 5]}
                </div>
              ))}
            </div>
          )}
          

          <div className="absolute left-4 top-1/4 text-4xl animate-bounce">💝</div>
          <div className="absolute right-4 top-1/4 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>💝</div>
          <div className="absolute left-8 bottom-1/4 text-3xl animate-pulse">🌹</div>
          <div className="absolute right-8 bottom-1/4 text-3xl animate-pulse">🌹</div>
          
          <div className="max-w-md mx-auto w-full relative z-10 px-4">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none"></div>
              

              <div className="absolute top-3 left-3 text-2xl">🌷</div>
              <div className="absolute top-3 right-3 text-2xl">🌷</div>
              <div className="absolute bottom-3 left-3 text-2xl">🌸</div>
              <div className="absolute bottom-3 right-3 text-2xl">🌸</div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Sparkles className="w-10 h-10 text-coral animate-spin-slow" />
                  <h2 className="text-4xl md:text-5xl font-display text-gray-800 font-bold animate-bounce">
                    YAY! 🎉
                  </h2>
                  <Sparkles className="w-10 h-10 text-coral animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
                

                
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <h3 className="text-xl md:text-2xl font-display text-gray-800 mb-3">
                    Terima kasih
                  </h3>
                  <p className="text-base md:text-lg font-body text-gray-700">
                    sudah jadi "jawaban" dari semua kata yang aku cari.
                  </p>
                </div>
                

                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 mb-6 border border-pink-200">
                  <h4 className="text-lg font-display text-coral mb-2">💌 Pesan Spesial</h4>
                  <p className="text-base md:text-lg font-body text-gray-700 italic leading-relaxed">
                    "Kamu adalah hal terbaik yang pernah terjadi padaku. 
                    Setiap momen bersamamu adalah kenangan yang ingin aku simpan selamanya. 
                    Terima kasih sudah menjadi bagian dari hidupku. 
                    Aku mencintaimu, sekarang dan selamanya. 💕"
                  </p>
                </div>
                
                <p className="text-lg md:text-xl text-gray-700 italic font-display font-semibold mb-4">
                  "Aku janji akan selalu memilih kamu."
                </p>
                
                <div className="flex items-center justify-center gap-3">
                  <Heart className="w-8 h-8 text-coral animate-heartbeat" fill="#FF9494" />
                  <span className="text-3xl animate-bounce">💕</span>
                  <Heart className="w-8 h-8 text-coral animate-heartbeat" fill="#FF9494" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.15); }
          20%, 40% { transform: scale(1.05); }
        }
        
        @keyframes music-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes photoFlipIn {
          0% {
            opacity: 0;
            transform: perspective(1000px) rotateY(-60deg) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) rotateY(0) scale(1);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out both;
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.2s ease-in-out infinite;
        }
        
        .animate-music-pulse {
          animation: music-pulse 0.8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes kenangan-fade {
          0% {
            opacity: 0.7;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
        
        @keyframes floatHeart {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-400px) rotate(20deg);
            opacity: 0;
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 0.8s infinite;
          color: #FF9494;
          font-weight: bold;
        }
        
        @keyframes floatPetal {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(30px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh) rotate(360deg) translateX(-20px);
            opacity: 0;
          }
        }
        
        @keyframes firework {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          30% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          60% {
            transform: scale(2) rotate(360deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(3) rotate(540deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});

export default ConfessWebsite;
