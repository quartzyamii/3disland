import React, { useState, Suspense, useRef, useEffect } from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import Loader from '../components/Loader';
import * as THREE from 'three';
import Popup from '../components/Popup';
import Star from '../components/Star';

// import Sky from '../models/sky';
import Island from '../models/Island';
import Glowstick from '../models/glowstick';
import Cloud from '../models/Cloud';

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
    const canvas = document.getElementById('three-canvas');
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

  // 커스텀 이징 함수: 초~중반은 S-curve, 0.3~1은 S-curve와 power5를 부드럽게 보간
  function customEase(t) {
    const s = t * t * t * (t * (t * 6 - 15) + 10);
    const power5 = 1 - Math.pow(1 - t, 5);
    if (t < 0.3) {
      return s;
    } else {
      const lerp = (t - 0.3) / 0.7;
      return s + (power5 - s) * lerp;
    }
  }

  const ANIMATION_DURATION = 2500; // ms, 더 부드럽게
  const animationStart = useRef(null);

  const animateRotation = (timestamp) => {
    if (!IslandRef.current) return;
    if (!animationStart.current) animationStart.current = timestamp;

    const elapsed = timestamp - animationStart.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    const easedProgress = customEase(progress);
    const newRotation = initialRotation.current + (targetRotation - initialRotation.current) * easedProgress;
    IslandRef.current.rotation.y = newRotation;

    if (progress > 0.7 && !popupShown.current) {
      setShowPopup(true);
      popupShown.current = true;
    }

    if (progress < 1) {
      animationFrame.current = requestAnimationFrame(animateRotation);
    } else {
      IslandRef.current.rotation.y = targetRotation;
      setIsRotating(false);
      animationStart.current = null;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    }
  };

  const handleCanvasClick = (e) => {
    if (isRotating) return;
    if (isIntersecting && !showPopup && IslandRef.current) {
      const current = IslandRef.current.rotation.y;
      const normalizedCurrent = ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const normalizedTarget = ((targetRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      if (Math.abs(normalizedCurrent - normalizedTarget) < 0.001) return;

      setIsRotating(true);
      setIsIntersecting(false);
      popupShown.current = false;
      initialRotation.current = current;
      animationStart.current = null;
      requestAnimationFrame(animateRotation);

      // 클릭 이벤트를 한 번 더 강제로 발생시키는 부분 주석 처리
      // const canvas = document.getElementById('three-canvas');
      // if (canvas) {
      //   canvas.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      // }
    }
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
        animationFrame.current = null;
      }
    };
  }, []);

  return (
    <section className="w-full h-screen relative"
    style={{
      backgroundImage: 'url("/assets/images/SKY.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      <Star />

      {showPopup && (
        <Popup onClose={handleClosePopup} />
      )}

      <Canvas 
        id="three-canvas"
        className={`w-full h-screen bg-transparent ${isIntersecting ? 'cursor-grab' : 'cursor-default'}`}
        camera={{near: 0.1, far: 1000, position: [0,0,5]}}
        shadows
        gl={{ antialias: true }}
        onClick={handleCanvasClick}
        style={{ zIndex: 2 }}
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
          <Cloud 
          position={[0, -10, -48]} 
          scale={[12,12,12]}
          // rotation={[0, Math.PI, 0]}
          />
          
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;