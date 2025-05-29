import React, { useRef, useEffect, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import * as THREE from 'three';

// Bottle.glb 파일 경로
import BottleScene from '/assets/3d/Bottle.gltf?url';  

const Bottle = forwardRef((props, ref) => {
  // GLTF 모델 로딩
  const { nodes, materials } = useGLTF(BottleScene);  
  console.log(nodes, materials);

  // 환경 맵(반사와 굴절을 위해 필요)
  const envMap = new THREE.CubeTextureLoader().load([
    '/path_to_posx.jpg', '/path_to_negx.jpg',
    '/path_to_posy.jpg', '/path_to_negy.jpg',
    '/path_to_posz.jpg', '/path_to_negz.jpg',
  ]);
  

  return (
    <a.group ref={ref} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottle.geometry}
        material={
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff,    // 유리의 색
            roughness: 0.05,    // 표면의 거칠기 (거의 매끄러운 표면)
            metalness: 0,       // 금속성 (유리에는 필요 없음)
            transmission: 0.85, // 유리 효과 (투명도)
            thickness: 0.15,
            opacity: 0.5,       // 투명도
            transparent: true,  // 투명하게 설정
            envMap: envMap,     // 환경 맵을 반사에 사용
            specularIntensity: 1.5,   // 하이라이트 강도 증가
            clearcoat: 3.0,     // 추가 반사 레이어 강도
            clearcoatRoughness: 0.05, // 추가 반사 레이어의 거칠기 (매끄럽게)
          })
        }
        position={[0, 0.63, 0]}
        scale={[0.554, 0.644, 0.554]}
      />
    </a.group>
  );
});

Bottle.displayName = 'Bottle';

export default Bottle;

useGLTF.preload('/Bottle.gltf');
