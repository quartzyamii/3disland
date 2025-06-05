import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const SightPopup = ({ onClose }) => {
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
          .sight-year {
            font-family: 'Cafe24Meongi-B-v1.0', sans-serif;
          }
          .sight-text {
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
          
          /* 부드러운 펄스 애니메이션 */
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 4s ease-in-out infinite;
          }
          
          /* 물고기 위아래 움직임 애니메이션 */
          @keyframes fish-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          .animate-fish-float {
            animation: fish-float 2.5s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* 2021 년도 텍스트 */}
      <animated.div 
        style={fadeIn}
        className="fixed top-48 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex justify-center items-center gap-2">
          <h1 className="sight-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-1"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            2
          </h1>
          <h1 className="sight-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-2"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            0
          </h1>
          <h1 className="sight-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-3"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            1
          </h1>
          <h1 className="sight-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-4"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            5
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

         {/*  물고기 장식 */}
        <img
          src="/assets/images/GreenFish.png"
          alt="Fish"
          className="absolute top-[-80px] left-[-80px] w-36 animate-fish-float opacity-100"
        />
        <img
          src="/assets/images/BlueFish.png"
          alt="Fish"
          className="absolute top-[230px] left-[580px] w-36 animate-fish-float opacity-100"
        />

 {/* 닫기 버튼 - 우측 상단 꼭짓점 */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-3 rounded-full hover:bg-black hover:text-white transition-all shadow z-10"
        >
          X
        </button>

        <div className="flex gap-6">
           {/* 둥근 사각형 이미지 영역 */}
  <div className="w-1/3 relative">
    <div className="w-full h-48 rounded-3xl overflow-hidden border-2 border-white/40 shadow-inner">
      <img
        src="/assets/images/Sight.png"
        alt="Sheep"
        lassName="w-[85%] h-[85%] object-cover opacity-90"
      />
    </div>
  </div>

          {/* 감성 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="sight-text text-3xl font-bold text-black mb-4 tracking-wide">
                풍경 만들기 
              </h2>
              <div className="w-full h-px bg-white mb-4"></div>
              <p className="sight-text text-black leading-relaxed text-base whitespace-pre-line">
                초등학교 6학년, 미술학원에서 보내는 마지막 겨울방학 시간에 단짝친구와 함께 방학 특강으로 풍경을 만들었다. 직접 모양을 빚고 그 위에 물감을 칠하는 과정이 정말 즐거웠다. 이 풍경에 먼지가 가득 쌓였지만 이따금 꺼내 흔들어볼 때 나는 소리는 여전히 청량감이 가득하다.
              </p>
            </div>
            <div className="flex justify-end mt-3">
            </div>
          </div>
        </div>
      </div>
    </animated.div>
    </>
  );
};

export default SightPopup;
