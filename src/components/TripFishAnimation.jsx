import React, { useState, useEffect } from 'react';

const TripFishAnimation = () => {
  // 컴포넌트가 마운트될 때마다 고유한 키를 생성하여 애니메이션 초기화
  const [animationKey, setAnimationKey] = useState(0);
  const [fishVisible, setFishVisible] = useState({
    fish1: false,
    fish2: false,
    fish3: false,
    fish4: false
  });
  
  useEffect(() => {
    // 컴포넌트 마운트 시 새로운 키 생성
    setAnimationKey(Math.random());
    
    // 각 물고기 애니메이션 시작 타이밍에 맞춰 가시성 설정
    setFishVisible({ fish1: false, fish2: false, fish3: false, fish4: false });
    
    const timer1 = setTimeout(() => setFishVisible(prev => ({ ...prev, fish1: true })), 0);
    const timer2 = setTimeout(() => setFishVisible(prev => ({ ...prev, fish2: true })), 3000);
    const timer3 = setTimeout(() => setFishVisible(prev => ({ ...prev, fish3: true })), 6000);
    const timer4 = setTimeout(() => setFishVisible(prev => ({ ...prev, fish4: true })), 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  
  return (
    <>
      <style>
        {`
          @keyframes swim {
            0% {
              opacity: 0;
              transform: translateX(110vw) translateY(0);
            }
            5% {
              opacity: 1;
              transform: translateX(100vw) translateY(0);
            }
            30% {
              transform: translateX(75vw) translateY(-20px);
            }
            55% {
              transform: translateX(50vw) translateY(0);
            }
            80% {
              transform: translateX(25vw) translateY(20px);
            }
            95% {
              opacity: 1;
              transform: translateX(-20vw) translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateX(-30vw) translateY(0);
            }
          }
          
          .swimming-fish {
            position: fixed;
            z-index: 2;
            pointer-events: none;
            will-change: transform, opacity;
          }
          
          .swimming-fish-animated {
            animation-name: swim;
            animation-duration: 20s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
          }
          
          .fish-hidden {
            display: none;
          }
        `}
      </style>
      <img 
        key={`fish1-${animationKey}`}
        src="/assets/images/TripFish1.png" 
        alt="Swimming Fish"
        className={`swimming-fish ${fishVisible.fish1 ? 'swimming-fish-animated' : 'fish-hidden'}`}
        style={{
          top: '30%',
          width: '420px',
          height: 'auto'
        }}
      />
      <img 
        key={`fish2-${animationKey}`}
        src="/assets/images/TripFish2.png" 
        alt="Swimming Fish"
        className={`swimming-fish ${fishVisible.fish2 ? 'swimming-fish-animated' : 'fish-hidden'}`}
        style={{
          top: '40%',
          width: '320px',
          height: 'auto'
        }}
      />

       <img 
        key={`fish3-${animationKey}`}
        src="/assets/images/TripFish3.png" 
        alt="Swimming Fish"
        className={`swimming-fish ${fishVisible.fish3 ? 'swimming-fish-animated' : 'fish-hidden'}`}
        style={{
          top: '30%',
          width: '320px',
          height: 'auto'
        }}
      />

      <img 
        key={`fish4-${animationKey}`}
        src="/assets/images/TripFish4.png" 
        alt="Swimming Fish"
        className={`swimming-fish ${fishVisible.fish4 ? 'swimming-fish-animated' : 'fish-hidden'}`}
        style={{
          top: '40%',
          width: '320px',
          height: 'auto'
        }}
      />
    </>
  );
};

export default TripFishAnimation;
