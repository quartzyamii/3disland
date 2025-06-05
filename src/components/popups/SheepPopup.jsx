import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const SheepPopup = ({ onClose }) => {
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
          @font-face {
            font-family: 'Chilgok_Cye';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/Chilgok_Cye.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          .sheep-year {
            font-family: 'Cafe24Meongi-B-v1.0', sans-serif;
          }
          .sheep-text {
            font-family: 'DalseoHealingBold', sans-serif;
          }
          .sheep-wish {
            font-family: 'Chilgok_Cye', sans-serif;
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
          
          /* 양 통통 튀는 애니메이션 */
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-5px) scale(1.05); }
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 3s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* 2003 년도 텍스트 */}
      <animated.div 
        style={fadeIn}
        className="fixed top-48 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex justify-center items-center gap-2">
          <h1 className="sheep-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-1"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            2
          </h1>
          <h1 className="sheep-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-2"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            0
          </h1>
          <h1 className="sheep-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-3"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            0
          </h1>
          <h1 className="sheep-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-4"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            4
          </h1>
        </div>
      </animated.div>

      {/* 소원 텍스트 */}
      <animated.div 
        style={fadeIn}
        className="fixed top-[320px] left-[35%] transform -translate-x-1/2 z-50 animate-bounce-slow-1"
      >
        <p className="sheep-wish text-2xl text-white text-center opacity-90"
           style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 0, 0.5))' }}>
          똥강아지<br /> 건강해라<br /> 모든면에서 <br /> -큰이모가-
        </p>
      </animated.div>

      <animated.div 
        style={fadeIn}
        className="fixed top-[495px] left-[36%] transform -translate-x-1/2 z-50 animate-bounce-slow-1"
      >
        <p className="sheep-wish text-2xl text-white text-center opacity-90"
           style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 0, 0.5))' }}>
          민진아<br /> 예쁘게<br /> 건강하게 <br /> 자라렴 <br /> -몽실 이모가-
        </p>
      </animated.div>

      <animated.div 
        style={fadeIn}
        className="fixed top-[320px] left-[57%] transform -translate-x-1/2 z-50 animate-bounce-slow-1"
      >
        <p className="sheep-wish text-2xl text-white text-center opacity-90"
           style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 0, 0.5))' }}>
          이쁜 민진아. <br /> 더 이쁘고 참하고 <br /> 건강한 공주님 되세요 <br /> 이천사년 오월이십이일 <br /> 외할머니
        </p>
      </animated.div>

      <animated.div 
        style={fadeIn}
        className="fixed top-[550px] left-[55%] transform -translate-x-1/2 z-50 animate-bounce-slow-1"
      >
        <p className="sheep-wish text-2xl text-white text-center opacity-90"
           style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 0, 0.5))' }}>
          언능 언능 크거라 <br /> 많이 놀아줄게 <br /> -외삼촌, 외숙모가-
        </p>
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

         {/*  별 장식 */}
        {/* <img
          src="/assets/images/Turtle2.png"
          alt="Turtle"
          className="absolute top-[-100px] left-[-100px] w-36 animate-wiggle opacity-100"
        /> */}

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
    <div className="w-full h-48 rounded-3xl">
      <img
        src="/assets/images/Sheep2.png"
        alt="Sheep"
        lassName="w-[85%] h-[85%] object-cover opacity-90"
      />
    </div>
  </div>

          {/* 감성 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="sheep-text text-3xl font-bold text-black mb-4 tracking-wide">
                나의 탄생, 양 인형
              </h2>
              <div className="w-full h-px bg-white mb-4"></div>
              <p className="sheep-text text-black leading-relaxed text-base whitespace-pre-line">
                2004년, 나의 첫 돌을 맞이한 날 돌잔치가 열렸다. 돌잔치에 온 친척들이 내가 앞으로 잘 살길 바라는 마음을 담아 다들 한 문장씩 적어주셨다. 양 인형의 몸에는 그 문장들이 수놓아져있다. 그 양 인형은 나의 첫 번째 친구이자 선물이다.
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

export default SheepPopup;
