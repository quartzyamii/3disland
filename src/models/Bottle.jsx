import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import * as THREE from 'three';

// Bottle.glb 파일 경로
import BottleScene from '/assets/3d/Bottle.gltf?url';  

const Bottle = (props) => {
  const BottleRef = useRef();  

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
    <a.group ref={BottleRef} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottle.geometry}
        material={
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff, // 유리의 색
            roughness: 0,  // 표면의 거칠기 (거칠면 유리처럼 반사 덜 됨)
            metalness: 0,    // 금속성 (유리는 금속이 아니므로 0)
            transmission: 0.85, // 유리 효과 (1로 설정하면 투명하고 빛을 통과시킴)
            opacity: 1,    // 투명도 (0은 완전 투명, 1은 불투명)
            transparent: true, // 투명하게 설정
            envMap: envMap,   // 환경 맵을 반사에 사용
          })
        }
        position={[0, 0.63, 0]}
        scale={[0.554, 0.644, 0.554]}
      />
    </a.group>
  );
}

export default Bottle;

useGLTF.preload('/Bottle.gltf');
