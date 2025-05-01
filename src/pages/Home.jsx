import React, { useState, Suspense, useRef, useEffect } from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import Loader from '../components/Loader';
import * as THREE from 'three';
import Popup from '../components/Popup';

// import Sky from '../models/sky';
import Island from '../models/Island';
import Glowstick from '../models/glowstick';

// 가운데 상단에 팝업 코드
{/* <div className = "absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            POPUP
            </di v> */}

const RaycasterHandler = ({ circleRef, setIsIntersecting }) => {
  const { camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  const handleMouseMove = (event) => {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.current.setFromCamera({ x, y }, camera);
  
    if (circleRef.current) {
      const intersects = raycaster.current.intersectObject(circleRef.current);
      setIsIntersecting(intersects.length > 0);
    }
  };

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return null;
};

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const circleRef = useRef();
  const IslandRef = useRef();
  const animationFrame = useRef(null);
  const targetRotation = 6.256991860863604; // 351.9130464139269 degrees
  const rotationSpeed = 0.02;
  const popupShown = useRef(false);
  const initialRotation = useRef(0);

  //화면위치,스케일조정(편집중)
  const adjustIslandForScreensize = () => {
    let screenScale = null;
    let screenPosition = [0, -7, -48];
    let rotation = [0.1, 4.7, 0 ];

    if (window.innerWidth < 768) {
      screenScale = [8,8,8];
    } else {
      screenScale = [12,12,12];
    }

    if (window.innerHeight < 600) {
      screenPosition = [0, -5, -40];
    } else if (window.innerHeight < 800) {
      screenPosition = [0, -6, -45];
    } else {
      screenPosition = [0, -7, -50];
    }

    return [ screenScale, screenPosition, rotation];
  }

  const [IslandScale, IslandPosition, IslandRotation ] = adjustIslandForScreensize();

  const getOptimizedRotation = (current, target) => {
    // 현재 각도와 목표 각도를 0~2π 범위로 정규화
    const normalizedCurrent = ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const normalizedTarget = ((target % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    // 두 각도 사이의 차이 계산
    let diff = normalizedTarget - normalizedCurrent;
    
    // 최단 경로 계산
    if (Math.abs(diff) > Math.PI) {
      diff = diff > 0 ? diff - 2 * Math.PI : diff + 2 * Math.PI;
    }
    
    return current + diff;
  };
  const handleCanvasClick = (e) => {
    if (isIntersecting && !showPopup && IslandRef.current) {  
      // ref.current가 정의되었는지 확인
      setIsRotating(true);
      popupShown.current = false;
      initialRotation.current = IslandRef.current.rotation.y;  
      // ref.current로 접근
      animateRotation();
    }
  };
  
  const animateRotation = () => {
    if (!IslandRef.current) return;  
    // IslandRef.current가 정의되어 있지 않으면 종료
  
    const currentRotation = IslandRef.current.rotation.y;
    const optimizedTarget = getOptimizedRotation(currentRotation, targetRotation);
    const diff = optimizedTarget - currentRotation;
    
    // 진행률 계산 (초기 위치에서 현재까지의 진행률)
    const totalDistance = Math.abs(optimizedTarget - initialRotation.current);
    const currentDistance = Math.abs(currentRotation - initialRotation.current);
    const progress = currentDistance / totalDistance;
    
    // 회전이 70% 이상 완료되었을 때 팝업 표시
    if (progress > 0.7 && !popupShown.current) {
      setShowPopup(true);
      popupShown.current = true;
    }
    
    if (Math.abs(diff) < 0.001) {
      IslandRef.current.rotation.y = targetRotation;  
      // IslandRef.current에 접근
      setIsRotating(false);
      return;
    }
  
    IslandRef.current.rotation.y += diff * rotationSpeed;  
    // IslandRef.current에 접근
    animationFrame.current = requestAnimationFrame(animateRotation);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    if (Island.current) {
      Island.current.rotation.y = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <section className="w-full h-screen relative">
      {showPopup && (
        <Popup onClose={handleClosePopup} />
      )}

      <Canvas 
        className={`w-full h-screen bg-transparent ${isIntersecting ? 'cursor-grab' : 'cursor-default'}`}
        camera={{near: 0.1, far: 1000, position: [0,0,5]}}
        shadows
        gl={{ antialias: true }}
        onClick={handleCanvasClick}
      >
        <Suspense fallback={<Loader />}>
          <RaycasterHandler 
            circleRef={circleRef}
            setIsIntersecting={setIsIntersecting}
          />
          
          <directionalLight 
            position={[1,0.7,1]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
            shadow-camera-near={0.1}
            shadow-camera-far={500}
            shadow-bias={-0.001}
          />
          
          <ambientLight intensity={0.3} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={0.5} />

          <Island
            ref={IslandRef}
            position={IslandPosition} 
            scale={IslandScale} 
            rotation={IslandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setShowPopup={setShowPopup}
            circleRef={circleRef}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;