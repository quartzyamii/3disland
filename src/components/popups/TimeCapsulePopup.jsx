import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const TimeCapsulePopup = ({ onClose, isClosing = false }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: isClosing ? 0 : 1 },
    config: { duration: 600 },
  });

  // 슬라이드 애니메이션 추가
  const slideUp = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { 
      opacity: isClosing ? 0 : 1, 
      transform: isClosing ? 'translateY(50px)' : 'translateY(0px)' 
    },
    delay: isClosing ? 0 : 300,
    config: { duration: 600 },
  });
  
  // ICANDOIT 이미지를 위한 페이드인 애니메이션 (뿅 효과 제거)
  const fadeInImage = useSpring({
    from: { 
      opacity: 0
    },
    to: { 
      opacity: isClosing ? 0 : 1
    },
    delay: isClosing ? 0 : 600, // 다른 애니메이션 이후에 나타나도록
    config: { 
      duration: 800 // 부드러운 페이드인
    },
  });



  return (
    <>
      <style>
        {`
          @font-face {
            font-family: 'Cafe24Meongi-B-v1.0';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Meongi-B-v1.0.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          .timecapsule-year {
            font-family: 'Cafe24Meongi-B-v1.0', sans-serif !important;
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

          /* 이미지 애니메이션 */
          @keyframes float-image {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float-image {
            animation: float-image 5s ease-in-out infinite;
          }
          
          /* ICANDOIT 이미지 위아래로만 동동 떠다니는 애니메이션 */
          @keyframes float-icandoit {
            0% { transform: translateY(0); }
            25% { transform: translateY(2px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(2px); }
            100% { transform: translateY(0); }
          }
          
          .animate-float-only {
            animation: float-icandoit 5s ease-in-out infinite;
          }
          

        `}
      </style>
      
      {/* 2019 년도 텍스트 */}
      <animated.div 
        style={fadeIn}
        className="fixed top-48 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex justify-center items-center gap-2">
          <h1 className="timecapsule-year text-10xl font-bold text-white opacity-100 animate-bounce-slow-1"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            2
          </h1>
          <h1 className="timecapsule-year text-10xl font-bold text-white opacity-100 animate-bounce-slow-2"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            0
          </h1>
          <h1 className="timecapsule-year text-10xl font-bold text-white opacity-100 animate-bounce-slow-3"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            1
          </h1>
          <h1 className="timecapsule-year text-10xl font-bold text-white opacity-100 animate-bounce-slow-4"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(56, 189, 248, 0.6))' }}>
            9
          </h1>
        </div>
      </animated.div>
      
      {/* ICANDOIT 이미지 추가 - 페이드인 후 위아래로만 동동 떠다님 */}
      <animated.div 
        style={fadeInImage}
        className="fixed top-[30%] left-1/2 transform -translate-x-1/2 z-50"
      >
        <img
          src="/assets/images/ICANDOIT001.png"
          alt="ICANDOIT"
          className="w-[320px] h-auto animate-float-only"
          style={{ 
            // filter: 'drop-shadow(0px 10px 25px rgba(56, 189, 248, 0.5))',
            marginLeft: '-10px' // 이미지를 왼쪽으로 이동
          }}
        />
      </animated.div>

    {/* 이미지 추가 */}
          {/* TimeCapule 팝업 */}
          <animated.div 
            style={slideUp}
            className="fixed top-[60%] inset-x-0 z-50 flex justify-center"
          >
            <div className="relative">
              <img
                src="/assets/images/TimeCapsulePopup.png"
                alt="TimeCapsulePopup"
                className="rounded-xl w-[630px] h-auto animate-float-image"
              />
              
              {/* 닫기 버튼 - 이미지 내부에 위치 */}
              <button
                onClick={onClose}
                className="absolute top-14 right-12 hover:bg-opacity-40 transition-all duration-300 animate-float-image "
              >
                <img 
                  src="/assets/images/CloseButton001.png" 
                  alt="Close" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E";
                  }}
                />
              </button>
            </div>
          </animated.div>
    </>
  );
};

export default TimeCapsulePopup;
