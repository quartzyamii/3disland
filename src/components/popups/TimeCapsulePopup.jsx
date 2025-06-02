import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const TimeCapsulePopup = ({ onClose }) => {
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
                src="/assets/images/timecapsule.png"
                alt="TimeCapsule"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* 텍스트 영역 */}
          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">시간 캡슐</h2>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <p className="text-gray-600">
                미래로 보내는 메시지<br />
                이 시간 캡슐에는 현재의 꿈과 희망이 담겨있습니다. 
                언젠가 다시 열어볼 그날을 기다리며 소중히 보관하고 있습니다.
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

export default TimeCapsulePopup;
