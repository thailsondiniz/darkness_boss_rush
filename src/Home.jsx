import React, { useState, useEffect, useRef } from "react";
import backgroundBoss01 from "./assets/background_boss_01.jpg";
import backgroundBoss02 from "./assets/background_boss_02.jpg";
import boss01 from "./assets/boss_01.png";
import boss02 from "./assets/boss_02.png";
import rankingModal from "./assets/ranking_modal.png";
import backgroundMusic from "./assets/bossfight_01.mp3";

const bosses = [
  {
    id: 1,
    nome: "TEMPLAR LORD OF DARKNESS",
    imagem: boss01,
    background: backgroundBoss01,
    vida: 500,
    frases: [
      { texto: "Você se atreve a me desafiar?", vidaMinima: 81 },
      { texto: "É só isso que você tem?", vidaMinima: 61 },
      { texto: "Você nunca vai me derrotar!", vidaMinima: 41 },
      { texto: "Eu vou te esmagar!", vidaMinima: 21 },
      { texto: "Isso ainda não acabou!", vidaMinima: 0 },
    ],
  },
  {
    id: 2,
    nome: "SHADOW KNIGHT",
    imagem: boss02,
    background: backgroundBoss02,
    vida: 500,
    frases: [
      { texto: "As trevas me obedecem!", vidaMinima: 121 },
      { texto: "Você é mais forte do que parece...", vidaMinima: 91 },
      { texto: "Não importa, você ainda vai cair!", vidaMinima: 61 },
      { texto: "Sinta o poder da escuridão!", vidaMinima: 31 },
      { texto: "Impossível... como você...?!", vidaMinima: 0 },
    ],
  },
];

const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    setDisplayedText("");
    if (!text) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return displayedText;
};

const Home = () => {
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isHit, setIsHit] = useState(false);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [life, setLife] = useState(bosses[0].vida);
  const [damageTexts, setDamageTexts] = useState([]);
  const [bloodSplatters, setBloodSplatters] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isDying, setIsDying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const audioRef = useRef(null);
  const damagePerClick = 20;
  
  const currentBoss = bosses[currentBossIndex];

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    const playAudio = () => {
      audioRef.current.play().catch(() => {});
    };
    
    document.addEventListener('click', playAudio, { once: true });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', playAudio);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const getFraseBoss = () => {
    return currentBoss.frases.find(frase => life >= frase.vidaMinima)?.texto || "";
  };
  
  const fraseBoss = getFraseBoss();
  const typedFrase = useTypewriter(fraseBoss, 50);

  const handleBossDeath = () => {
    setIsDying(true);
    
    setTimeout(() => {
      if (currentBossIndex < bosses.length - 1) {
        const nextIndex = currentBossIndex + 1;
        setCurrentBossIndex(nextIndex);
        setLife(bosses[nextIndex].vida);
        setIsDying(false);
      } else {
        setGameCompleted(true);
        setIsDying(false);
      }
    }, 1500);
  };

  const handleClick = (e) => {
    if (isDying || gameCompleted) return;
    
    setIsShaking(true);
    setIsHit(true);
    setIsScreenShaking(true);
    
    const newLife = Math.max(life - damagePerClick, 0);
    setLife(newLife);
    
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setIsHit(false), 200);
    setTimeout(() => setIsScreenShaking(false), 300);
    
    if (newLife <= 0) {
      handleBossDeath();
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setDamageTexts((prev) => [...prev, { id, x, y, damage: damagePerClick }]);

 
    const splatterId = Date.now() + Math.random();
    setBloodSplatters((prev) => [...prev, { id: splatterId, x: x - 50, y: y - 50 }]);

    setTimeout(() => {
      setDamageTexts((prev) => prev.filter((text) => text.id !== id));
    }, 1000);

    setTimeout(() => {
      setBloodSplatters((prev) => prev.filter((splatter) => splatter.id !== splatterId));
    }, 300);
  };

  return (
    <div
      className={`bg-cover h-screen flex justify-center items-center flex-col transition-all duration-500 ${isScreenShaking ? "screen-shake" : ""}`}
      style={{ backgroundImage: `url(${currentBoss.background})` }}
    >
      <button
        onClick={toggleMute}
        className="absolute top-5 right-5 z-50 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300"
        title={isMuted ? "Ativar som" : "Mutar som"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      
      {/* Indicador de Boss */}
      <div className="absolute top-5 left-5 bg-black/70 px-4 py-2 rounded-lg">
        <span className="text-white text-sm">Boss {currentBossIndex + 1} / {bosses.length}</span>
      </div>
      
      <img src={rankingModal} alt="Ranking Modal" className="absolute -top-10 right-10 w-80"/>
      
      {/* Barra de vida - Fixa no topo */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30">
        <h1 className="text-white mb-3 text-center">{currentBoss.nome}</h1>
        <div className="bg-[#1F2229] h-10 w-150 border-amber-50 border-2 rounded-2xl relative">
          <div
            className={`bg-[#B7182E] h-9 shadow-lg shadow-red-500/50 transition-all duration-200 ${
              life < currentBoss.vida ? "rounded-l-2xl" : "rounded-2xl"
            }`}
            style={{ width: `${(life / currentBoss.vida) * 100}%` }}
          />
          {/* Texto da vida fixo no centro da barra */}
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
            {life} / {currentBoss.vida}
          </span>
        </div>
      </div>
      
      {/* Tela de Vitória */}
      {gameCompleted && (
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-40">
          <h1 className="text-yellow-400 text-6xl font-bold mb-4 animate-pulse">VITÓRIA!</h1>
          <p className="text-white text-2xl mb-8">Você derrotou todos os bosses!</p>
          <button
            onClick={() => {
              setCurrentBossIndex(0);
              setLife(bosses[0].vida);
              setGameCompleted(false);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all"
          >
            Jogar Novamente
          </button>
        </div>
      )}
      
      <div className="relative mt-20">
        {/* Frase do boss - acima da imagem */}
        <div className="absolute -top-16 w-full flex justify-center">
          <h3 className="text-white text-center bg-black/70 px-4 py-2 rounded-lg min-h-[40px]">
              {typedFrase}
          </h3>
        </div>
        <img
          src={currentBoss.imagem}
          alt={currentBoss.nome}
          className={`cursor-pointer transition-all duration-300 ${isShaking ? "shake" : ""} ${isHit ? "hit-flash" : ""} ${isDying ? "boss-dying" : ""}`}
          onClick={handleClick}
        />
        {bloodSplatters.map((splatter) => (
          <div
            key={splatter.id}
            className="blood-splatter"
            style={{ left: splatter.x, top: splatter.y }}
          />
        ))}
        {damageTexts.map((text) => (
          <span
            key={text.id}
            className="damage-text absolute text-white text-2xl font-bold"
            style={{ left: text.x, top: text.y }}
          >
            -{text.damage}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
