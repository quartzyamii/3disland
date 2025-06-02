import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const TripPopup = ({ onClose }) => {
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
                src="/assets/images/trip.png"
                alt="Trip"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">여행의 추억</h2>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <p className="text-gray-600">
                잊을 수 없는 여행<br />
                이 여행 기념품은 특별한 여행의 순간들을 담고 있습니다. 
                새로운 곳에서 만난 사람들과 경험들이 소중한 추억으로 남아있습니다.
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

export default TripPopup;
