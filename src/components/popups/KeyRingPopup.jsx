import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const KeyRingPopup = ({ onClose }) => {
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
                src="/assets/images/keyring.png"
                alt="KeyRing"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          {/* 감성 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-sky-800 mb-4 tracking-wide">
                마법의 열쇠
              </h2>
              <div className="w-full h-px bg-sky-200 mb-4"></div>
              <p className="text-sky-700 leading-relaxed text-base whitespace-pre-line">
                소중한 순간들을 열어주는 특별한 열쇠.  
                언제나 함께하며 기억 속 문을 열고  
                따뜻한 추억을 간직하고 있는  
                나만의 보물.
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

export default KeyRingPopup;
