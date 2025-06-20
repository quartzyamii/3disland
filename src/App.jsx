import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';

// 상수 정의
const ASSETS_TO_PRELOAD = [
  '/assets/images/SKY2.png',
  '/assets/images/BACKGROUND004.png',
];
const FADE_OUT_DURATION = 300; // 더 빠른 애니메이션을 위해 1200에서 800ms로 변경

const App = () => {
  // 상태 관리
  const [showLandingOverlay, setShowLandingOverlay] = useState(true);
  const [isLandingFadingOut, setIsLandingFadingOut] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로드 상태 추적

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
    // 페이드 아웃 애니메이션이 완료된 후 오버레이 숨기기
    setTimeout(() => {
      setShowLandingOverlay(false);
      setIsLandingFadingOut(false);
      // setIsInitialLoad(false); // 초기 로드가 아님을 표시
    }, FADE_OUT_DURATION);
  };

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    // 애니메이션 없이 즉시 랜딩 오버레이 표시
    setShowLandingOverlay(true);
    setIsLandingFadingOut(false);
    // // 초기 로드가 아님을 명시하여 애니메이션이 적용되지 않도록 함
    // setIsInitialLoad(false);
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
        
        /* 페이드아웃 애니메이션 - 더 빠르게 적용 */
        @keyframes fadeOutBlur {
          0% {
            opacity: 1;
            filter: blur(0);
          }
          50% {
            opacity: 0.5;
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            filter: blur(5px);
          }
        }
        
        /* 페이드인 애니메이션 - 빠르고 부드럽게 */
        @keyframes fadeInBlur {
          0% {
            opacity: 0;
            filter: blur(5px);
          }

          25%
          {
            opacity: 1;
            filter: blur(2px);
          }
          50% {
            opacity: 1;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
        
        /* 타이틀 이미지 전용 스타일 */
        .title-image {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          top: -20px; /* 더 위로 올림 */
          width: 80%;
          text-align: center;
          --scale: 0.8;
        }
        
        .animate-title {
          opacity: 0;
        }
        
        /* 반응형 타이틀 위치 */
        @media (max-height: 800px) {
          .title-image {
            top: -10px; /* 더 위로 올림 */
            width: 70%;
          }
        }
        
        @media (max-height: 600px) {
          .title-image {
            top: -5px; /* 더 위로 올림 */
            width: 60%;
          }
        }
        
        /* 튜토리얼 이미지 전용 스타일 */
        .tutorial-image {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          top: calc(40% - 50px); /* 화면 중앙보다 약간 위에 위치 */
          width: 80%;
          max-width: 700px; /* 최대 너비 제한 */
          max-height: 350px; /* 최대 높이 제한 */
          text-align: center;
          --scale: 1.1;
        }
        
        .animate-tutorial {
          opacity: 0;
        }
        
        /* 시작 버튼 전용 스타일 */
        .start-button {
          cursor: grab;
          transition: all 0.3s ease;
          filter: drop-shadow(0 10px 25px rgba(0,0,0,0.3));
          max-width: 300px; /* 버튼 크기 약간 축소 */
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
          bottom: 8%;  /* 화면 하단에서 8% 위치에 배치 */
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          margin-top: 30px; /* 튜토리얼 이미지와의 최소 간격 */
        }
        
        /* 반응형 규칙: 화면 높이가 작을 때 겹침 방지 */
        @media (max-height: 800px) {
          .tutorial-image {
            top: 30%;
            max-height: 280px;
          }
          
          .start-button-container {
            bottom: 5%; 
          }
        }
        
        /* 매우 작은 화면에서의 규칙 */
        @media (max-height: 600px) {
          .tutorial-image {
            top: 20%;
            max-height: 220px;
          }
          
          .start-button-container {
            bottom: 3%;
          }
          
          .start-button {
            max-width: 250px;
          }
        }
        
        .animate-button {
          opacity: 0;
        }
        
        /* 애니메이션 클래스 */
        .animate-title {
          animation: slideUp 1s ease-out 0.3s forwards, none; /* 0초 딜레이로 변경 (즉시 시작) */
        }
        
        .animate-tutorial {
          animation: slideUp 1s ease-out 1.3s forwards, none;
        }
        
        .animate-button {
          animation: slideUp 1s ease-out 2.3s forwards, none;
        }
      `}
    </style>
  );



  // 타이틀 이미지 컴포넌트
  const TitleImage = () => (
    <div className={`title-image opacity-100`}>
      <img 
        src="/assets/images/MemoryIsland001.png" 
        alt="memoryislandTitle"
        className="animate-float"
      />
    </div>
  );

  // 튜토리얼 이미지 컴포넌트
  const TutorialImage = () => (
    <div className={`tutorial-image opacity-100`}>
      <img 
        src="/assets/images/Modal2.png" 
        alt="정든 사울과의 이별, 추억의 아카이빙"
        className="animate-float"
      />
    </div>
  );

  // 시작 버튼 컴포넌트
  const StartButton = () => (
    <div className={`start-button-container opacity-100`}>
      <img 
        src="/assets/images/START001.png"
        alt="START"
        onClick={handleStartClick}
        className="start-button"
        draggable={false}
      />
    </div>
  );

  // 랜딩 오버레이 컴포넌트 //속도적용
  const LandingOverlay = () => (
    <div 
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-white transition-all duration-[300ms] ease-in-out ${
        isLandingFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'url(/assets/images/BACKGROUND004.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        animation: isLandingFadingOut 
          ? 'fadeOutBlur 0.3s ease-in-out forwards' 
          : 'none' // 모든 페이드인 애니메이션 제거
      }}
    >
      <div className="w-full h-full flex flex-col items-center relative">
        {isInitialLoad && !isLandingFadingOut ? (
          <>
            {/* 타이틀 이미지 - 위에 배치 */}
            <div className="title-image animate-title">
              <img 
                src="/assets/images/MemoryIsland001.png" 
                alt="memoryislandTitle"
                className="animate-float"
              />
            </div>
            
            {/* 컨텐츠 컨테이너 - 튜토리얼과 시작 버튼을 감싸는 컨테이너 */}
            <div className="flex flex-col items-center justify-center h-full w-full" style={{ paddingTop: '120px' }}>
              <div className="tutorial-image animate-tutorial">
                <img 
                  src="/assets/images/Modal2.png" 
                  alt="정든 사울과의 이별, 추억의 아카이빙"
                  className="animate-float"
                />
              </div>
              
              {/* 시작 버튼은 항상 튜토리얼 이미지 아래에 위치 */}
              {isAssetsLoaded && (
                <div className="start-button-container animate-button">
                  <img 
                    src="/assets/images/START001.png"
                    alt="START"
                    onClick={handleStartClick}
                    className="start-button"
                    draggable={false}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          // 로고 클릭 시 즉시 표시되는 컴포넌트들 (애니메이션 없음)
          <>
            {/* 타이틀 이미지 - 위에 배치 */}
            <div className="title-image">
              <img 
                src="/assets/images/MemoryIsland001.png" 
                alt="memoryislandTitle"
                className="animate-float"
              />
            </div>
            
            {/* 컨텐츠 컨테이너 - 튜토리얼과 시작 버튼을 감싸는 컨테이너 */}
            <div className="flex flex-col items-center justify-center h-full w-full" style={{ paddingTop: '120px' }}>
              <div className="tutorial-image">
                <img 
                  src="/assets/images/Modal2.png" 
                  alt="정든 사울과의 이별, 추억의 아카이빙"
                  className="animate-float"
                />
              </div>
              
              {/* 시작 버튼은 항상 튜토리얼 이미지 아래에 위치 */}
              {isAssetsLoaded && (
                <div className="start-button-container">
                  <img 
                    src="/assets/images/START001.png"
                    alt="START"
                    onClick={handleStartClick}
                    className="start-button"
                    draggable={false}
                  />
                </div>
              )}
            </div>
          </>
        )}
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
