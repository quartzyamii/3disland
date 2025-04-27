import React, { useState, Suspense, useRef, useEffect } from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import Loader from '../components/Loader';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Popup from '../components/Popup';

// import Sky from '../models/sky';
import MeshGround2 from '../models/MeshGround2';
import Glowstick from '../models/glowstick';

// 가운데 상단에 팝업 코드
{/* <div className = "absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            POPUP
            </di v> */}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const circleRef = useRef();
  const controlsRef = useRef();
  const cameraRef = useRef();
  const meshGroundRef = useRef();
  const raycaster = useRef(new THREE.Raycaster());

  // 마우스 이동 이벤트 핸들러
  const handleMouseMove = (event) => {
    if (!controlsRef.current?.object) return;
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // 레이캐스터 업데이트
    raycaster.current.setFromCamera({ x, y }, controlsRef.current.object);
    
    // 원형 메쉬와의 교차 감지
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

  //화면위치,스케일조정(편집중)
  const adjustMeshGround2ForScreensize = () => {
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

  const [MeshGroundScale, MeshGroundPosition, MeshGroundRotation ] = adjustMeshGround2ForScreensize();

  const handleCanvasClick = (e) => {
    if (isIntersecting && !showPopup) {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // 카메라 초기화 애니메이션
    if (controlsRef.current) {
      const targetPosition = new THREE.Vector3(0, 0, 5);
      const targetRotation = new THREE.Euler(0, 0, 0);
      
      // 현재 카메라 위치와 회전값 저장
      const currentPosition = controlsRef.current.object.position.clone();
      const currentRotation = controlsRef.current.object.rotation.clone();
      
      // 애니메이션 시작 시간
      const startTime = Date.now();
      const duration = 1000; // 1초 동안 애니메이션
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 부드러운 이동을 위한 easing 함수
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        // 위치 보간
        controlsRef.current.object.position.lerpVectors(
          currentPosition,
          targetPosition,
          easedProgress
        );
        
        // 회전 보간
        controlsRef.current.object.rotation.x = THREE.MathUtils.lerp(
          currentRotation.x,
          targetRotation.x,
          easedProgress
        );
        controlsRef.current.object.rotation.y = THREE.MathUtils.lerp(
          currentRotation.y,
          targetRotation.y,
          easedProgress
        );
        controlsRef.current.object.rotation.z = THREE.MathUtils.lerp(
          currentRotation.z,
          targetRotation.z,
          easedProgress
        );
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  };

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
          {/* <pointLight  />
          <spotLight  /> */}
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={0.5} />
          
          {/* <Sky /> */}

          <OrbitControls 
            ref={controlsRef}
            enableZoom={false} 
          />

          <MeshGround2 
            ref={meshGroundRef}
            position={MeshGroundPosition} 
            scale={MeshGroundScale} 
            rotation={MeshGroundRotation}
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