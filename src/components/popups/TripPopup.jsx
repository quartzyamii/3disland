import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const TripPopup = ({ onClose }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 600 },
  });

  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'DalseoHealingBold';
            src: url('/assets/fonts/DalseoHealingBold.otf') format('opentype');
            font-weight: bold;
            font-style: normal;
          }
          @font-face {
            font-family: 'Cafe24Meongi-B-v1.0';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Meongi-B-v1.0.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          .trip-year {
            font-family: 'Cafe24Meongi-B-v1.0', sans-serif;
          }
          .trip-text {
            font-family: 'DalseoHealingBold', sans-serif;
          }
          
          /* 부드러운 위아래 움직임 애니메이션 */
          @keyframes float-1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes float-3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes float-4 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-bounce-slow-1 {
            animation: float-1 3s ease-in-out infinite;
          }
          .animate-bounce-slow-2 {
            animation: float-2 3.5s ease-in-out infinite 0.2s;
          }
          .animate-bounce-slow-3 {
            animation: float-3 2.8s ease-in-out infinite 0.4s;
          }
          .animate-bounce-slow-4 {
            animation: float-4 3.2s ease-in-out infinite 0.6s;
          }
        `}
      </style>
      
      {/* 2016 년도 텍스트 */}
      <animated.div 
        style={fadeIn}
        className="fixed top-48 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex justify-center items-center gap-2">
          <h1 className="trip-year text-9xl font-bold text-white opacity-100 drop-shadow-lg animate-bounce-slow-1">
            2
          </h1>
          <h1 className="trip-year text-9xl font-bold text-white opacity-100 drop-shadow-lg animate-bounce-slow-2">
            0
          </h1>
          <h1 className="trip-year text-9xl font-bold text-white opacity-100 drop-shadow-lg animate-bounce-slow-3">
            1
          </h1>
          <h1 className="trip-year text-9xl font-bold text-white opacity-100 drop-shadow-lg animate-bounce-slow-4">
            6
          </h1>
        </div>
      </animated.div>

    <animated.div
      style={fadeIn}
      className=" fixed top-[63%] 
                  left-1/2 
                  transform 
                  -translate-x-1/2 
                  z-50 
                  mb-4
                  flex 
                  items-center 
                  justify-center"
    >
      <div className="relative 
                bg-white/20 
                backdrop-blur-md
                rounded-3xl 
                border-2 border-white/50 
                p-8 
                w-[640px] 
                shadow-[0_0_40px_20px_rgba(255,255,255,0.2)]">

        {/* 반짝이는 별 장식 */}
        <img
          src="/assets/images/star.png"
          alt="star"
          className="absolute top-4 left-4 w-6 animate-pulse opacity-80"
        />

        <div className="flex gap-6">
          {/* 둥근 이미지 영역 */}
          <div className="w-1/3 relative">
            <div className="w-full h-48 rounded-full overflow-hidden border-2 border-white/40 shadow-inner">
              <img
                src="/assets/images/trip.png"
                alt="Trip"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          {/* 감성 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-sky-800 mb-4 tracking-wide">
                기억의 창
              </h2>
              <div className="w-full h-px bg-sky-200 mb-4"></div>
              <p className="trip-text text-sky-700 leading-relaxed text-base whitespace-pre-line">
                처음 도착한 바다, 처음 산 이 키링.  
                그날의 햇살과 파도 소리가 아직도 선명해.  
                이 조그만 유리창을 통해  
                다시 그 섬의 공기를 느껴.
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="bg-sky-500 text-white py-2 px-6 rounded-full hover:bg-sky-600 transition-all shadow"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
    </>
  );
};

export default TripPopup;
