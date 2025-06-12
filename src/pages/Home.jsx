import React, { useState, Suspense, useRef, useEffect } from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import Loader from '../components/Loader';
import * as THREE from 'three';
import Popup from '../components/popups/Popup';
import BottlePopup from '../components/popups/BottlePopup';
import SheepPopup from '../components/popups/SheepPopup';
import KeyRingPopup from '../components/popups/KeyRingPopup';
import TimeCapsulePopup from '../components/popups/TimeCapsulePopup';
import TripPopup from '../components/popups/TripPopup';
import SightPopup from '../components/popups/SightPopup';
import Star from '../components/Star';

// import Sky from '../models/sky';
import Island from '../models/Island';
// import Glowstick from '../models/glowstick';
import Cloud from '../models/Cloud';

// 가운데 상단에 팝업 코드
{/* <div className = "absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            POPUP
            </di v> */}

const RaycasterHandler = ({ objectRefs, setIsIntersecting, setHoveredObject }) => {
  const { camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  const handleMouseMove = (event) => {
    // objectRefs가 유효한지 확인
    if (!objectRefs || !camera) return;
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.current.setFromCamera({ x, y }, camera);

    // 모든 오브젝트 감지 (원형 메쉬 포함)
    const objects = Object.values(objectRefs || {}).filter(ref => ref && ref.current);
    let isObjectIntersecting = false;
    let hoveredObjectName = null;

    if (objects.length > 0) {
      const intersects = raycaster.current.intersectObjects(objects.map(ref => ref.current), true);
      if (intersects.length > 0) {
        isObjectIntersecting = true;
        
        // 오브젝트 이름을 찾기 위한 로직
        const intersectedObject = intersects[0].object;
        let objectName = intersectedObject.name || intersectedObject.parent?.name;
        
        // 만약 name이 없다면 ref와 매칭하여 찾기
        if (!objectName || objectName === '') {
          const refEntries = Object.entries(objectRefs);
          for (const [key, ref] of refEntries) {
            if (ref.current && (
              ref.current === intersectedObject ||
              ref.current === intersectedObject.parent ||
              ref.current.children.includes(intersectedObject)
            )) {
              objectName = key;
              break;
            }
          }
        }
        
        hoveredObjectName = objectName || 'Unknown';
        console.log('Hovered object:', hoveredObjectName, intersectedObject);
      }
    }

    setIsIntersecting(isObjectIntersecting);
    setHoveredObject(hoveredObjectName);
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
  const [hoveredObject, setHoveredObject] = useState(null);
  const [currentPopupObject, setCurrentPopupObject] = useState(null); // 현재 팝업 오브젝트 추가
  
  // 6개 오브젝트 각각의 ref
  const bottleRef = useRef();
  const sheepRef = useRef();
  const keyRingRef = useRef();
  const timeCapsuleRef = useRef();
  const tripRef = useRef();
  const sightRef = useRef();
  
  const circleRef = useRef();
  const IslandRef = useRef();
  const animationFrame = useRef(null);
  
  // 각 오브젝트별 목표 회전 각도 설정
  const targetRotations = {
    glowstick: 1.019497, // -210.88°
    bottle: 1.925523, // -158.97°
    timeCapsule: 2.873209, // -104.67°
    trip: 3.693562, // -57.66°
    sight: 4.790555, // 5.19°
    keyRing: 5.578019, // 50.31°
    sheep: 6.277909, // 90.41°
  };
  
  const [currentTargetRotation, setCurrentTargetRotation] = useState(null);
  const rotationSpeed = 0.02;
  const popupShown = useRef(false);
  const initialRotation = useRef(0);

  // 오브젝트 refs를 객체로 묶기
  const objectRefs = {
    bottle: bottleRef,
    sheep: sheepRef,
    keyRing: keyRingRef,
    timeCapsule: timeCapsuleRef,
    trip: tripRef,
    sight: sightRef,
    glowstick: circleRef
  };

  //화면위치,스케일조정(편집중)
  const adjustIslandForScreensize = () => {
    let screenScale = null;
    let screenPosition = [0, -7, -48];
    let rotation = [0.1, 0, 0 ];

    if (window.innerWidth < 768) {
      screenScale = [11,11,11];
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

  // 커스텀 이징 함수
  function customEase(t) {
    const s = t * t * t * (t * (t * 6 - 15) + 10);
    const power5 = 1 - Math.pow(1 - t, 5);
    if (t < 0.3) {
      return s;
    } else {
      const lerp = (t - 0.3) / 0.7;
      return s + (power5 - s) * Math.pow(lerp, 10);
    }
  }

  const ANIMATION_DURATION = 1000; // ms, 더 부드럽게
  const animationStart = useRef(null);

  const animateRotation = (timestamp, clickedObjectName) => {
    if (!IslandRef.current || !currentTargetRotation) return;
    if (!animationStart.current) animationStart.current = timestamp;

    const elapsed = timestamp - animationStart.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    const easedProgress = customEase(progress);
    const newRotation = initialRotation.current + (currentTargetRotation - initialRotation.current) * easedProgress;
    IslandRef.current.rotation.y = newRotation;

    if (progress > 0.7 && !popupShown.current) {
      setShowPopup(true);
      setCurrentPopupObject(clickedObjectName); // 클릭된 오브젝트 이름 직접 사용
      popupShown.current = true;
    }

    if (progress < 1) {
      animationFrame.current = requestAnimationFrame((ts) => animateRotation(ts, clickedObjectName));
    } else {
      IslandRef.current.rotation.y = currentTargetRotation;
      setIsRotating(false);
      animationStart.current = null;
      setCurrentTargetRotation(null);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    }
  };

  const handleCanvasClick = (e) => {
    if (isRotating || showPopup) return;
    
    console.log('Canvas clicked!', e.target);
    
    // 간단한 방법: 현재 호버된 오브젝트가 있는지 확인
    if (isIntersecting && hoveredObject && IslandRef.current) {
      console.log('Clicked object:', hoveredObject);
      
      // 목표 회전 각도 결정
      const targetRotation = targetRotations[hoveredObject];
      
      if (targetRotation === undefined) {
        console.log('No target rotation for:', hoveredObject);
        return;
      }
      
      const current = IslandRef.current.rotation.y;
      
      // getOptimizedRotation 함수를 사용하여 최적화된 회전 계산
      const optimizedTarget = getOptimizedRotation(current, targetRotation);
      
      console.log('Current rotation:', current, 'Target:', optimizedTarget);
      
      // 현재 위치와 목표 위치가 거의 같으면 회전하지 않음
      if (Math.abs(current - optimizedTarget) < 0.001) {
        console.log('Already at target position');
        return;
      }
      
      setCurrentTargetRotation(optimizedTarget);
      setIsRotating(true);
      setIsIntersecting(false);
      popupShown.current = false;
      initialRotation.current = current;
      animationStart.current = null;
      
      requestAnimationFrame((ts) => animateRotation(ts, hoveredObject));
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentPopupObject(null); // 팝업 오브젝트 초기화
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    // 회전 초기화 제거 - 현재 위치 그대로 유지
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
      backgroundImage: 'url("/assets/images/SKY2.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      <Star />

      {/* Popup 렌더링 - currentPopupObject에 따라 다른 팝업을 렌더링 */}
      {showPopup && currentPopupObject && (
        <>
          {currentPopupObject === 'bottle' && <BottlePopup onClose={handleClosePopup} />}
          {currentPopupObject === 'sheep' && <SheepPopup onClose={handleClosePopup} />}
          {currentPopupObject === 'keyRing' && <KeyRingPopup onClose={handleClosePopup} />}
          {currentPopupObject === 'timeCapsule' && <TimeCapsulePopup onClose={handleClosePopup} />}
          {currentPopupObject === 'trip' && <TripPopup onClose={handleClosePopup} />}
          {currentPopupObject === 'sight' && <SightPopup onClose={handleClosePopup} />}
          {currentPopupObject === 'glowstick' && <Popup onClose={handleClosePopup} />}
        </>
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
            objectRefs={objectRefs}
            setIsIntersecting={setIsIntersecting}
            setHoveredObject={setHoveredObject}
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
            bottleRef={bottleRef}
            sheepRef={sheepRef}
            keyRingRef={keyRingRef}
            timeCapsuleRef={timeCapsuleRef}
            tripRef={tripRef}
            sightRef={sightRef}
          />
          <Cloud 
          position={[0, -11, -48]} 
          scale={[12,12,12]}
          // rotation={[0, Math.PI, 0]}
          />
          
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;