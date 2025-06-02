import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const BottlePopup = ({ onClose }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 }
  });

  return (
    <animated.div 
      style={fadeIn}
      className="fixed right-0 top-2/3 left-1/2 transform -translate-y-1/2 -x-1/5 flex items-center justify-center z-50 mr-4"
    >
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-xl w-[600px]">
        <div className="flex gap-6">
          {/* 이미지 영역 */}
          <div className="w-1/3">
            <div className="w-full h-48 bg-gray-200 rounded-lg">
              <img 
                src="/assets/images/bottle.png"
                alt="Bottle"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">추억의 보틀</h2>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <p className="text-gray-600">
                특별한 순간을 담은 보틀<br />
                이 보틀은 소중한 추억과 함께 만들어진 작품입니다. 
                시간이 지나도 변하지 않는 소중한 기억들이 담겨있습니다.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-sky-600 transition-colors"
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
