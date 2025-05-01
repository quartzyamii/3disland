import { useRef, useEffect, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';
import * as THREE from 'three';

import IslandScene from "/assets/3d/Island.gltf?url";
import Glowstick from './glowstick'; 

const Island = forwardRef(({isRotating, setIsRotating, setShowPopup, circleRef, ...props}, ref) => {
    // ===== 상태 및 참조 =====
    const { gl, viewport, camera } = useThree();
    const { nodes, materials } = useGLTF(IslandScene);
    
    // 회전 관련 상태
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    // ===== 줌 제어 =====
    const handleWheel = (e) => {
        e.preventDefault();
        const zoomSpeed = 0.05;
        const minZoom = 1;  // 최소 줌 (가장 가까이)
        const maxZoom = 6.5;  // 최대 줌 (가장 멀리)
        
        camera.position.z += e.deltaY * zoomSpeed;
        
        // 줌 제한
        if (camera.position.z < minZoom) camera.position.z = minZoom;
        if (camera.position.z > maxZoom) camera.position.z = maxZoom;
    }

    // ===== 회전 제어 =====
    const handlePointerDown = (e) => {
        if (e.target === circleRef.current) return;
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true);

        const clientX = e.touches 
            ? e.touches[0].clientX 
            : e.clientX;

        lastX.current = clientX;
    }

    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false);
    }

    const handlePointerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(isRotating) {
            const clientX = e.touches 
                ? e.touches[0].clientX 
                : e.clientX;

            const delta = (clientX - lastX.current) / viewport.width;
            
            ref.current.rotation.y += delta * 0.01 * Math.PI;
            lastX.current = clientX;
            rotationSpeed.current = delta * 0.01 * Math.PI;

            // 회전값 출력 (라디안)
            console.log('Y Rotation (radians):', ref.current.rotation.y);
            // 회전값 출력 (도)
            console.log('Y Rotation (degrees):', THREE.MathUtils.radToDeg(ref.current.rotation.y));
        }
    }

    // 키보드 제어 
    const handleKeyDown = (e) => {
        if(e.key === 'ArrowLeft') {
            if(!isRotating) setIsRotating(true);  
            ref.current.rotation.y += 0.1;  
        } 
        else if(e.key === 'ArrowRight') {
            if(!isRotating) setIsRotating(true);  
            ref.current.rotation.y -= 0.1; 
        }
    }

    const handleKeyUp = (e) => {
        if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            setIsRotating(false);
        }
    }

    //  팝업 제어 
    const handleCircleClick = (e) => {
        e.stopPropagation();
        if (setShowPopup) {
            setShowPopup(true);
        }
    };

    // 이벤트 리스너 설정
    useEffect(() => {
        const canvas = gl.domElement;
        
        // 포인터 이벤트
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointermove', handlePointerMove);
        
        // 줌 이벤트
        canvas.addEventListener('wheel', handleWheel);
        
        // 키보드 이벤트
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            // 이벤트 리스너 정리
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    //렌더링 
  return (
    <a.group ref={ref} {...props}>

      <mesh castShadow receiveShadow geometry={nodes.Wood.geometry} material={materials.wood} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Road.geometry}
        material={materials.Road}
        position={[0, -0.058, 0]}
        scale={1.059}
      />
      <group position={[-0.937, 1.261, 1.074]} scale={[0.131, 0.148, 0.131]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowTree_1.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowTree_2.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowTree_3.geometry}
          material={materials.Glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.YellowTreeBranch.geometry}
        material={materials['MainTreeBranch.001']}
        position={[-0.939, 0.989, 1.082]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.033, -0.058, -0.033]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainTreeBranch001.geometry}
        material={materials['MainTreeBranch.002']}
        position={[1.18, 0.998, -0.547]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.057, -0.1, -0.057]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree001'].geometry}
        material={materials['Maintree.001']}
        position={[1.171, 1.029, -0.537]}
        scale={[0.232, 0.357, 0.232]}
      />
      <group
        position={[1.395, 0.949, -0.223]}
        rotation={[-2.95, -0.437, 3.086]}
        scale={[-0.054, -0.075, -0.075]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass001_1.geometry}
          material={materials['Glass.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass001_2.geometry}
          material={materials['Glass.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass001_3.geometry}
          material={materials['Glass.001']}
        />
      </group>
      <group
        position={[0.226, 0.594, 3.087]}
        rotation={[-0.974, -1.437, -0.943]}
        scale={[-0.042, -0.059, -0.059]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass002_1.geometry}
          material={materials['Glass.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass002_2.geometry}
          material={materials['Glass.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass002_3.geometry}
          material={materials['Glass.002']}
        />
      </group>
      <group
        position={[0.013, 0.563, 2.995]}
        rotation={[0.394, -0.136, -0.022]}
        scale={[0.17, 0.184, 0.167]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass_1.geometry}
          material={materials['mountainBig.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass_2.geometry}
          material={materials['mountainBig.013']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass_3.geometry}
          material={materials['mountainBig.014']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MiniGlass.geometry}
        material={materials['mountainBig.005']}
        position={[-0.764, 0.928, 0.909]}
        rotation={[0.112, -0.126, 0.022]}
        scale={[0.115, 0.114, 0.132]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SmallMountain001.geometry}
        material={materials['mountainBig.015']}
        position={[2.688, 0.24, 1.653]}
        rotation={[-0.027, -0.029, -0.253]}
        scale={[0.369, 0.654, 0.421]}
      />
      <group
        position={[-0.688, 1.032, 0.781]}
        rotation={[0.986, -1.365, 0.964]}
        scale={[-0.054, -0.075, -0.075]}>
        <mesh castShadow receiveShadow geometry={nodes.glass.geometry} material={materials.Glass} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.glass_1.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.glass_2.geometry}
          material={materials.Glass}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree'].geometry}
        material={materials.Maintree}
        position={[0.838, 1.156, 0.767]}
        scale={[0.232, 0.541, 0.232]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainTreeBranch.geometry}
        material={materials.MainTreeBranch}
        position={[0.847, 1.055, 0.758]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.057, -0.1, -0.057]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BigMountain.geometry}
        material={materials.mountainBig}
        position={[0.022, 0.717, 0.009]}
        scale={[1.325, 1.247, 0.572]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SmallMountain.geometry}
        material={materials.mountainBig}
        position={[1.312, 0.717, 0.267]}
        scale={[0.369, 0.654, 0.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SmallMountainLeft001.geometry}
        material={materials['mountainBig.006']}
        position={[-1.086, 0.848, -0.467]}
        scale={[0.305, 0.348, 0.348]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SmallMountainLeft.geometry}
        material={materials.mountainBig}
        position={[-1.086, 0.717, 0.267]}
        scale={[0.514, 0.51, 0.587]}
      />
      <group
        position={[-0.532, 0.984, -0.612]}
        rotation={[2.741, 0.223, -3.127]}
        scale={[0.171, 0.227, 0.174]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass001_1.geometry}
          material={materials['mountainBig.016']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass001_2.geometry}
          material={materials['mountainBig.017']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass001_3.geometry}
          material={materials['mountainBig.018']}
        />
      </group>
      <group
        position={[-1.562, 0.6, -2.458]}
        rotation={[2.732, -0.305, 2.933]}
        scale={[0.082, 0.11, 0.084]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass002_1.geometry}
          material={materials['mountainBig.020']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass002_2.geometry}
          material={materials['mountainBig.021']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass002_3.geometry}
          material={materials['mountainBig.022']}
        />
      </group>
      <group
        position={[-0.214, 1.038, -0.721]}
        rotation={[-2.613, -1.221, -2.777]}
        scale={[-0.054, -0.075, -0.075]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass010.geometry}
          material={materials['Glass.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass010_1.geometry}
          material={materials['Glass.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Glass010_2.geometry}
          material={materials['Glass.003']}
        />
      </group>
      <group
        position={[0.4, 0.765, -2.166]}
        rotation={[2.827, 0.378, -3.009]}
        scale={[0.082, 0.11, 0.084]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass003_1.geometry}
          material={materials['mountainBig.023']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass003_2.geometry}
          material={materials['mountainBig.024']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallGlass003_3.geometry}
          material={materials['mountainBig.025']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainTreeBranch004.geometry}
        material={materials['MainTreeBranch.005']}
        position={[3.14, 0.326, -1.503]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.039, -0.08, -0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree005'].geometry}
        material={materials['candytree.001']}
        position={[3.135, 0.419, -1.496]}
        scale={[0.156, 0.175, 0.156]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree006'].geometry}
        material={materials['candytree.001']}
        position={[3.135, 0.534, -1.496]}
        scale={[0.156, 0.197, 0.156]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree004'].geometry}
        material={materials['Maintree.004']}
        position={[-1.397, 0.94, -2.486]}
        scale={[0.232, 0.541, 0.232]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainTreeBranch003.geometry}
        material={materials['MainTreeBranch.004']}
        position={[-1.389, 0.839, -2.495]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.057, -0.21, -0.057]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree002'].geometry}
        material={materials.candytree}
        position={[3.135, 0.534, 1.456]}
        scale={[0.156, 0.197, 0.156]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['MainTree003'].geometry}
        material={materials.candytree}
        position={[3.135, 0.419, 1.456]}
        scale={[0.156, 0.175, 0.156]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainTreeBranch002.geometry}
        material={materials['MainTreeBranch.003']}
        position={[3.14, 0.326, 1.45]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.039, -0.08, -0.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.YellowTreeBranch001.geometry}
        material={materials['MainTreeBranch.006']}
        position={[-3.107, 0.537, -0.722]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[-0.033, -0.09, -0.033]}
      />
      <group position={[-3.105, 0.911, -0.73]} scale={[0.131, 0.179, 0.131]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowTree001_1.geometry}
          material={materials['Glass.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowTree001_2.geometry}
          material={materials['Glass.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.YellowTree001_3.geometry}
          material={materials['Glass.004']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SmallMountainLeft002.geometry}
        material={materials['mountainBig.026']}
        position={[-3.229, 0.199, -0.533]}
        rotation={[-0.056, 0.002, 0.354]}
        scale={[0.375, 0.371, 0.427]}
      />
      <Glowstick 
                position={[-0.4, 1.2, 2.9]} 
                scale={[0.13, 0.13, 0.13]} 
                rotation={[Math.PI / 1.2, Math.PI / 1.4, 2]}
                castShadow
                receiveShadow
            />

            {/* 클릭 감지용 원형 메쉬 */}
            <mesh
                ref={circleRef}
                position={[-0.3, 1.12, 2.47]}
                scale={[0.9, 0.9, 0.9]}
                rotation={[Math.PI / 2.1, Math.PI / 2.2, 2.9]}
                onClick={handleCircleClick}
            >
                <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
                <meshBasicMaterial 
                    color="white" 
                    transparent 
                    opacity={0} 
                    side={THREE.DoubleSide}
                />
            </mesh>
    </a.group>
  )
});
Island.displayName = 'Island';

export default Island;

useGLTF.preload('/Island.gltf')
