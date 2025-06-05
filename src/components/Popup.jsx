import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Popup = ({ onClose }) => {
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
                .bottle-year {
                  font-family: 'Cafe24Meongi-B-v1.0', sans-serif;
                }
                .bottle-text {
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
                
                /* 병 회전 애니메이션 */
                @keyframes spin-slow {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                
                .animate-spin-slow {
                  animation: spin-slow 4s linear infinite;
                }
              `}
            </style>
            
            {/* 2018 년도 텍스트 */}
            <animated.div 
              style={fadeIn}
              className="fixed top-48 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="flex justify-center items-center gap-2">
                <h1 className="bottle-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-1"
                    style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
                  2
                </h1>
                <h1 className="bottle-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-2"
                    style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
                  0
                </h1>
                <h1 className="bottle-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-3"
                    style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
                  2
                </h1>
                <h1 className="bottle-year text-9xl font-bold text-white opacity-100 animate-bounce-slow-4"
                    style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
                  4
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

       {/*  별 장식 */}
        <img
          src="/assets/images/Star.png"
          alt="Star"
          className="absolute top-[-90px] left-[-70px] w-36 animate-wiggle opacity-100"
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
    <div className="w-full h-48 rounded-3xl ">
      <img
        src="/assets/images/Glowstick2.png"
        alt="Sheep"
        lassName="w-[85%] h-[85%] object-cover opacity-90"
      />
    </div>
  </div>

          {/* 감성 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="bottle-text text-3xl font-bold text-black mb-4 tracking-wide">
                대학 축제, 야광팔찌
              </h2>
              <div className="w-full h-px bg-white mb-4"></div>
              <p className="bottle-text text-black leading-relaxed text-base whitespace-pre-line">
                대학 축제에서 친구들과 함께한 순간을 담고 있는 야광팔찌이다. 함께 늦은 밤 퍼레이드를 하는 친구들과 함께 퍼레이드 길을 따라 미술원까지 걷고 함께하는 경험은 잊지 못할 추억이 되었다. 지금은 더이상 빛나지 않지만, 이 팔찌를 볼 때 내 마음은 빛나는 그 때로 되돌아간다. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
    </>
  );
};

export default Popup; 