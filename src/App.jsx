import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';

// 상수 정의
const ASSETS_TO_PRELOAD = [
  '/assets/images/SKY2.png',
  '/assets/images/BACKGROUND004.png',
];
const FADE_OUT_DURATION = 800;

const App = () => {
  // 상태 관리
  const [showLandingOverlay, setShowLandingOverlay] = useState(true);
  const [isLandingFadingOut, setIsLandingFadingOut] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  // 컴포넌트 마운트 시 에셋 로드
  useEffect(() => {
    preloadAssets();
  }, []);

  // 에셋 사전 로딩 함수
  const preloadAssets = async () => {
    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;

    const loadAsset = (assetUrl) => 
      new Promise((resolve) => {
        const img = new Image();
        const handleComplete = () => {
          loadedCount++;
          resolve();
        };
        
        img.onload = handleComplete;
        img.onerror = handleComplete;
        img.src = assetUrl;
      });

    try {
      await Promise.all(ASSETS_TO_PRELOAD.map(loadAsset));
    } catch (error) {
      console.error('Asset loading failed:', error);
    } finally {
      setIsAssetsLoaded(true);
    }
  };

  // 시작 버튼 클릭 핸들러
  const handleStartClick = () => {
    setIsLandingFadingOut(true);
    setTimeout(() => {
      setShowLandingOverlay(false);
      setIsLandingFadingOut(false);
    }, FADE_OUT_DURATION);
  };

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    setShowLandingOverlay(true);
  };

  // 통합된 스타일 정의
  const GlobalStyles = () => (
    <style>
      {`
        @font-face {
          font-family: 'Cafe24Meongi-B-v1.0';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Meongi-B-v1.0.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        .memory-island-text {
          font-family: 'Cafe24Meongi-B-v1.0', sans-serif;
        }
        
        /* 기본 플로트 애니메이션 */
        @keyframes float {
          0%, 100% { transform: scale(var(--scale, 1)) translateY(0); }
          50% { transform: scale(var(--scale, 1)) translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* 슬라이드업 애니메이션 */
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        /* 타이틀 이미지 전용 스타일 */
        .title-image {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          top: -100px;
          width: 80%;
          text-align: center;
          --scale: 0.8;
          opacity: 0;
        }
        
        /* 튜토리얼 이미지 전용 스타일 */
        .tutorial-image {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          top: 530px;
          width: 80%;
          max-width: 700px; /* 최대 너비 제한 */
          max-height: 400px; /* 최대 높이 제한 */
          text-align: center;
          --scale: 1;
          opacity: 0;
        }
        
        /* 시작 버튼 전용 스타일 */
        .start-button {
          cursor: grab;
          transition: all 0.3s ease;
          filter: drop-shadow(0 10px 25px rgba(0,0,0,0.3));
          max-width: 400px;
          height: auto;
          transform: scale(0.7) translateY(-30px);
        }

        .start-button:hover {
          transform: scale(0.8) translateY(-30px);
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.4));
        }
        
        /* 시작 버튼 컨테이너 */
        .start-button-container {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          opacity: 0;
        }
        
        /* 애니메이션 클래스 */
        .animate-title {
          animation: slideUp 1s ease-out 0s forwards; /* 0초 딜레이로 변경 (즉시 시작) */
        }
        
        .animate-tutorial {
          animation: slideUp 1s ease-out 1.5s forwards;
        }
        
        .animate-button {
          animation: slideUp 1s ease-out 3s forwards;
        }
      `}
    </style>
  );



  // 타이틀 이미지 컴포넌트
  const TitleImage = () => (
    <div className="title-image animate-title">
      <img 
        src="/assets/images/MemoryIsland001.png" 
        alt="memoryislandTitle"
        className="animate-float"
      />
    </div>
  );

  // 튜토리얼 이미지 컴포넌트
  const TutorialImage = () => (
    <div className="tutorial-image animate-tutorial">
      <img 
        src="/assets/images/Modal.png" 
        alt="정든 사울과의 이별, 추억의 아카이빙"
        className="animate-float"
      />
    </div>
  );

  // 시작 버튼 컴포넌트
  const StartButton = () => (
    <div className="start-button-container animate-button">
      <img 
        src="/assets/images/START001.png"
        alt="START"
        onClick={handleStartClick}
        className="start-button"
        draggable={false}
      />
    </div>
  );

  // 랜딩 오버레이 컴포넌트
  const LandingOverlay = () => (
    <div 
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-white transition-opacity duration-800 ${
        isLandingFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'url(/assets/images/BACKGROUND004.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <TitleImage />
      <TutorialImage /> 
      
      {isAssetsLoaded && <StartButton />}
    </div>
  );
  // 메인 렌더링
  return (
    <div className="relative">
      <GlobalStyles />
      <Navbar onLogoClick={handleLogoClick} />
      <Home />
      {showLandingOverlay && <LandingOverlay />}
    </div>
  );
};

export default App;
