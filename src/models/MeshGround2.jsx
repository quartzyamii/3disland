import { useRef, useEffect, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';
import * as THREE from 'three';

import MeshGround2Scene from "/assets/3d/MeshGround2.gltf?url";
import Glowstick from './glowstick'; 

const MeshGround = forwardRef(({isRotating, setIsRotating, setShowPopup, circleRef, ...props}, ref) => {
    // ===== 상태 및 참조 =====
    const { gl, viewport, camera } = useThree();
    const { nodes, materials } = useGLTF(MeshGround2Scene);
    
    // 회전 관련 상태
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    // ===== 줌 제어 =====
    const handleWheel = (e) => {
        e.preventDefault();
        const zoomSpeed = 0.05;
        const minZoom = 1;  // 최소 줌 (가장 가까이)
        const maxZoom = 7;  // 최대 줌 (가장 멀리)
        
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

    // ===== 키보드 제어 =====
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

    // ===== 팝업 제어 =====
    const handleCircleClick = (e) => {
        e.stopPropagation();
        if (setShowPopup) {
            setShowPopup(true);
        }
    };

    // ===== 이벤트 리스너 설정 =====
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

    // ===== 렌더링 =====
    return (
        <a.group ref={ref} {...props}>
            {/* 메인 메쉬 그룹 */}
            <group position={[0.294, 1.732, 0.383]} scale={[0.166, 0.155, 0.166]}>
                <mesh castShadow receiveShadow geometry={nodes.구체004.geometry} material={materials['tree.003']} />
                <mesh castShadow receiveShadow geometry={nodes.구체004_1.geometry} material={materials['tree.001']} />
                <mesh castShadow receiveShadow geometry={nodes.구체004_2.geometry} material={materials['tree.002']} />
                <mesh castShadow receiveShadow geometry={nodes.구체004_3.geometry} material={materials['tree.004']} />
                <mesh castShadow receiveShadow geometry={nodes.구체004_4.geometry} material={materials['tree.005']} />
            </group>

            {/* 나무 가지 메쉬들 */}
            <mesh castShadow receiveShadow geometry={nodes.tree_branch001.geometry} material={materials['tree2.001']} 
                position={[0.223, 1.352, 0.167]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.024, -0.286, -0.024]} />
            <mesh castShadow receiveShadow geometry={nodes.wood.geometry} material={materials.매테리얼} 
                position={[-0.138, 0, 0]} />
            <mesh castShadow receiveShadow geometry={nodes.tree_branch.geometry} material={materials.tree2} 
                position={[-0.869, 1.11, 0.737]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.014, -0.161, -0.014]} />
            <mesh castShadow receiveShadow geometry={nodes.tree.geometry} material={materials.tree} 
                position={[-0.869, 1.393, 0.737]} scale={[0.172, 0.16, 0.172]} />
            <mesh castShadow receiveShadow geometry={nodes.tree001.geometry} material={materials['tree.010']} 
                position={[-0.935, 1.026, -1.579]} scale={[0.1, 0.093, 0.1]} />
            <mesh castShadow receiveShadow geometry={nodes.tree_branch002.geometry} material={materials['tree2.006']} 
                position={[-0.935, 0.861, -1.579]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.008, -0.093, -0.008]} />
            <mesh castShadow receiveShadow geometry={nodes.tree006.geometry} material={materials['tree.014']} 
                position={[-1.806, 0.933, 2.264]} scale={[0.172, 0.16, 0.172]} />
            <mesh castShadow receiveShadow geometry={nodes.tree_branch006.geometry} material={materials['tree2.010']} 
                position={[-1.806, 0.65, 2.264]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.014, -0.161, -0.014]} />
            <mesh castShadow receiveShadow geometry={nodes.tree005.geometry} material={materials['tree.013']} 
                position={[2.087, 0.938, -0.183]} scale={[0.093, 0.087, 0.093]} />
            <mesh castShadow receiveShadow geometry={nodes.tree_branch005.geometry} material={materials['tree2.009']} 
                position={[2.087, 0.784, -0.183]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.007, -0.087, -0.007]} />
            <mesh castShadow receiveShadow geometry={nodes.tree_branch004.geometry} material={materials['tree2.008']} 
                position={[2.482, 0.635, -0.807]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.014, -0.161, -0.014]} />
            <mesh castShadow receiveShadow geometry={nodes.tree004.geometry} material={materials['tree.012']} 
                position={[2.482, 0.917, -0.807]} scale={[0.172, 0.16, 0.172]} />
            <mesh castShadow receiveShadow geometry={nodes.tree002.geometry} material={materials['tree.011']} 
                position={[1.562, 1.117, -1.497]} scale={[0.172, 0.16, 0.172]} />
            <mesh castShadow receiveShadow geometry={nodes.tree_branch003.geometry} material={materials['tree2.007']} 
                position={[1.562, 0.834, -1.497]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.014, -0.161, -0.014]} />

            {/* 야광팔찌 */}
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
    );
});

MeshGround.displayName = 'MeshGround';

export default MeshGround;

// useGLTF.preload('/MeshGround.gltf')
