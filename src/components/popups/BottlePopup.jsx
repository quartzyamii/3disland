import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const BottlePopup = ({ onClose }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 600 },
  });

  return (
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
                src="/assets/images/bottle.png"
                alt="Bottle"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          {/* 감성 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-sky-800 mb-4 tracking-wide">
                별이 담긴 병
              </h2>
              <div className="w-full h-px bg-sky-200 mb-4"></div>
              <p className="text-sky-700 leading-relaxed text-base whitespace-pre-line">
                깊은 바다에서 발견된 신비로운 병.  
                안에는 작은 별들이 반짝이고 있어.  
                어둠 속에서도 희망을 잃지 않게 해주는  
                나만의 작은 우주.
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
  );
};

export default BottlePopup;
