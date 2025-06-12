import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  const [showLandingOverlay, setShowLandingOverlay] = useState(true);
  const [isLandingFadingOut, setIsLandingFadingOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    // 에셋 미리 로드
    preloadAssets();
  }, []);

  const preloadAssets = async () => {
    const assetsToLoad = [
      '/assets/images/SKY2.png',
      '/assets/images/BACKGROUND.png',
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    const loadPromises = assetsToLoad.map((assetUrl) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalAssets) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalAssets) * 100);
          resolve();
        };
        img.src = assetUrl;
      });
    });

    try {
      await Promise.all(loadPromises);
      setIsAssetsLoaded(true);
    } catch (error) {
      console.error('Asset loading failed:', error);
      setIsAssetsLoaded(true);
    }
  };

  const handleStartClick = () => {
    setIsLandingFadingOut(true);
    // 페이드 아웃 애니메이션이 완료된 후 오버레이를 제거
    setTimeout(() => {
      setShowLandingOverlay(false);
      setIsLandingFadingOut(false);
    }, 800); // 800ms 후에 완전히 제거
  };

  const handleLogoClick = () => {
    setShowLandingOverlay(true);
  };

  return (
    <div className="relative">
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
        `}
      </style>
      
      {/* Navbar */}
      <Navbar onLogoClick={handleLogoClick} />
      
      {/* Home 컴포넌트를 항상 렌더링 (백그라운드에서 3D 씬 준비) */}
      <Home />
      
      {/* Landing 오버레이 */}
      {showLandingOverlay && (
        <div 
          className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-white transition-opacity duration-800 ${
            isLandingFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: 'url(/assets/images/BACKGROUND001.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 상단 텍스트 박스 이미지 */}
          <div className="absolute top-90 left-1/2 transform -translate-x-1/2 z-20">
            <img 
              src="/assets/images/1PageTutorial.png" 
              alt="창든 사울과의 이별, 추억의 아카이빙"
              style={{ transform: 'scale(0.7)' }} // 60% 크기
            />
          </div>

          {/* Memory Island 텍스트 */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center gap-4"
            style={{ top: '20%' }} // 화면의 42% 위치로 조정
          >
            <h1 className="memory-island-text text-11xl font-bold text-white opacity-100 animate-bounce-slow-1"
                style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.9))' }}>
              Memory
            </h1>
            <h1 className="memory-island-text text-11xl font-bold text-white opacity-100 animate-bounce-slow-1"
                style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.9))' }}>
              Island
            </h1>
          </div>
          
          {/* 하단 버튼 영역 */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            {!isAssetsLoaded ? (
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
            ) : (
              <div className="animate-fadeIn">
                <img 
                  src="/assets/images/START.png"
                  alt="START"
                  onClick={handleStartClick}
                  className="cursor-pointer transition-all duration-300 transform hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.3))',
                    maxWidth: '400px',
                    height: 'auto'
                  }}
                />
              </div>
            )}
          </div>

          {/* <div className="absolute bottom-8 text-center text-white drop-shadow-lg relative z-10">
            <p className="text-sm opacity-90 font-medium">
              🖱️ 마우스로 오브젝트를 클릭하여 섬을 탐험하세요
            </p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default App;
