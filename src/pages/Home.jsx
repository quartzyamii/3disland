import React, { useState, Suspense, useRef, useEffect } from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {Stats} from '@react-three/drei';
import Loader from '../components/Loader';
import * as THREE from 'three';
import Popup from '../components/Popup';
import BottlePopup from '../components/popups/BottlePopup';
import SheepPopup from '../components/popups/SheepPopup';
import KeyRingPopup from '../components/popups/KeyRingPopup';
import TimeCapsulePopup from '../components/popups/TimeCapsulePopup';
import TripPopup from '../components/popups/TripPopup';
import SightPopup from '../components/popups/SightPopup';
import Star from '../components/Star';

// import Sky from '../models/sky';
import Island from '../models/Island';
import Glowstick from '../models/glowstick';
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

// RaycasterHelper for visual debugging
const RaycasterHelper = ({ showHelper = false }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const lineRef = useRef();
  
  useEffect(() => {
    if (!showHelper) return;
    
    const handleMouseMove = (event) => {
      const canvas = document.getElementById('three-canvas');
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.current.setFromCamera({ x, y }, camera);
      
      if (lineRef.current) {
        const points = [
          raycaster.current.ray.origin,
          raycaster.current.ray.origin.clone().add(raycaster.current.ray.direction.clone().multiplyScalar(50))
        ];
        lineRef.current.geometry.setFromPoints(points);
      }
    };
    
    const canvas = document.getElementById('three-canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      return () => canvas.removeEventListener('mousemove', handleMouseMove);
    }
  }, [camera, showHelper]);
  
  if (!showHelper) return null;
  
  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="red" />
    </line>
  );
};

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hoveredObject, setHoveredObject] = useState(null);
  const [showRayHelper, setShowRayHelper] = useState(false);
  const [currentPopupObject, setCurrentPopupObject] = useState(null); // 현재 팝업 오브젝트 추가 // 레이 헬퍼 표시 여부
  const [frameRate, setFrameRate] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  
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
    bottle: -0.41703602386703703,   // bottle이 정면에 오는 각도 (-23.89도)
    sheep: -1.0099029536450916,     // sheep이 정면에 오는 각도 (-57.86도)
    keyRing: -1.5594924094309397,   // keyRing이 정면에 오는 각도 (-89.35도)
    timeCapsule: -2.1106584060172398, // timeCapsule이 정면에 오는 각도 (-120.93도)
    trip: -2.914987524164666,       // trip이 정면에 오는 각도 (-167.02도)
    sight: -4.070481939678125,      // sight가 정면에 오는 각도 (-233.22도)
    glowstick: -6.311178841895803   // glowstick가 정면에 오는 각도 (-361.60도)
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
    let rotation = [0.1, 4.7, 0 ];

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

  // 프레임율 계산
  useEffect(() => {
    const updateFrameRate = () => {
      frameCount.current++;
      const now = performance.now();
      const delta = now - lastTime.current;
      
      if (delta >= 1000) { // 1초마다 업데이트
        const fps = Math.round((frameCount.current * 1000) / delta);
        setFrameRate(fps);
        frameCount.current = 0;
        lastTime.current = now;
      }
      
      requestAnimationFrame(updateFrameRate);
    };
    
    const animationId = requestAnimationFrame(updateFrameRate);
    
    return () => {
      cancelAnimationFrame(animationId);
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

      {/* Debug Controls */}
      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 p-4 rounded text-white">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={showRayHelper}
              onChange={(e) => setShowRayHelper(e.target.checked)}
            />
            Show Ray Helper
          </label>
          {hoveredObject && (
            <div className="text-sm">
              Hovered: <span className="text-green-400">{hoveredObject}</span>
              <br />
              Target Rotation: <span className="text-yellow-400">
                {targetRotations[hoveredObject]?.toFixed(3)} rad
              </span>
            </div>
          )}
          {/* 프레임율 표시 */}
          <div className="text-sm border-t border-gray-600 pt-2 mt-2">
            <div className="text-cyan-400">
              FPS: <span className="font-mono">{frameRate}</span>
            </div>
          </div>
        </div>
      </div>

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
          <RaycasterHelper showHelper={showRayHelper} />
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