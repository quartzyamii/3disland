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
  const [loadingProgress, setLoadingProgress] = useState(0);
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
          setLoadingProgress((loadedCount / totalAssets) * 100);
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
            transform: translateX(-50%) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 1s ease-out;
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
        }
        
        /* 튜토리얼 이미지 전용 스타일 */
        .tutorial-image {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          top: 300px;
          width: 80%;
          text-align: center;
          --scale: 0.5;
        }
        
        /* 시작 버튼 전용 스타일 */
        .start-button {
          cursor: pointer;
          transition: all 0.3s ease;
          filter: drop-shadow(0 10px 25px rgba(0,0,0,0.3));
          max-width: 400px;
          height: auto;
          transform: scale(0.7) translateY(-30px); /* 기본 상태 + 위로 30px 이동 */
        }

        .start-button:hover {
          transform: scale(0.8) translateY(-30px); /* 확대 + 위치 유지 */
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.4)); /* 그림자도 강화 */
        }
      `}
    </style>
  );



  // 타이틀 이미지 컴포넌트
  const TitleImage = () => (
    <div className="title-image animate-slide-up">
      <img 
        src="/assets/images/MemoryIsland001.png" 
        alt="memoryislandTitle"
        className="animate-float"
      />
    </div>
  );

  // 튜토리얼 이미지 컴포넌트
  const TutorialImage = () => (
    <div className="tutorial-image animate-slide-up">
      <img 
        src="/assets/images/Modal.png" 
        alt="정든 사울과의 이별, 추억의 아카이빙"
        className="animate-float"
      />
    </div>
  );

  // 시작 버튼 컴포넌트
  const StartButton = () => (
    <img 
      src="/assets/images/START001.png"
      alt="START"
      onClick={handleStartClick}
      className="start-button"
    />
  );

  // 로딩 진행률 컴포넌트
  const LoadingProgress = () => (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="w-full bg-white bg-opacity-30 rounded-full h-4 backdrop-blur-sm border border-white border-opacity-20">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
      <p className="text-lg text-white drop-shadow-lg font-medium">
        에셋 로딩 중... {Math.round(loadingProgress)}%
      </p>
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
      
      
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-10">
        {!isAssetsLoaded ? <LoadingProgress /> : <StartButton />}
      </div>
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
