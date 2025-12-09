import React, { useState, useEffect } from "react";
import backgroundBoss from "./assets/background.jpg";
import boss from "./assets/boss.png";
import rankingModal from "./assets/ranking_modal.png";

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
  const [isShaking, setIsShaking] = useState(false);
  const [life, setLife] = useState(100);
  const [damageTexts, setDamageTexts] = useState([]);
  const damagePerClick = 10;
  const frasesBoss = [
    { texto: "Você se atreve a me desafiar?", vidaMinima: 81 },
    { texto: "É só isso que você tem?", vidaMinima: 61 },
    { texto: "Você nunca vai me derrotar!", vidaMinima: 41 },
    { texto: "Eu vou te esmagar!", vidaMinima: 21 },
    { texto: "Isso ainda não acabou!", vidaMinima: 0 },   
  ]

  const getFraseBoss = () => {
    return frasesBoss.find(frase => life >= frase.vidaMinima)?.texto || "";
  };
  
  const fraseBoss = getFraseBoss();
  const typedFrase = useTypewriter(fraseBoss, 50);

  const handleClick = (e) => {
    setIsShaking(true);
    setLife((prevLife) => Math.max(prevLife - damagePerClick, 0));
    setTimeout(() => setIsShaking(false), 500);
    frasesBoss.find(frase => life <= frase.vidaMinima)?.texto;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setDamageTexts((prev) => [...prev, { id, x, y, damage: damagePerClick }]);

    setTimeout(() => {
      setDamageTexts((prev) => prev.filter((text) => text.id !== id));
    }, 1000);
  };

  return (
    <div
      className="bg-cover h-screen flex justify-center items-center flex-col"
      style={{ backgroundImage: `url(${backgroundBoss})` }}
    >
       <img src={rankingModal} alt="Ranking Modal" className="absolute -top-10 right-10 w-80"/>
      <h1 className="text-white mb-5">TEMPLAR LORD OF DARKNESS</h1>
      <div className="bg-[#1F2229] h-10 w-150 border-amber-50 border-2 rounded-2xl">
        <div
          className={`bg-[#B7182E] h-9 flex items-center justify-center shadow-lg shadow-red-500/50 ${
            life < 100 ? "rounded-l-2xl" : "rounded-2xl"
          }`}
          style={{ width: `${life}%` }}
        ></div>
      </div>
      <div className="relative">
        <div className="absolute mt-15 w-full flex justify-center">
          <h3 className="text-white text-center bg-black/70 px-4 py-2 rounded-lg">
              {typedFrase}
          </h3>
        </div>
        <img
          src={boss}
          alt="Boss"
          className={`cursor-pointer ${isShaking ? "shake" : ""}`}
          onClick={handleClick}
        />
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
