import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';

import CloudScene from '/assets/3d/Cloud.gltf?url';  

const Cloud = (props) => {  
  const CloudRef = useRef();  // CloudRef를 useRef로 정의

  const { nodes, materials } = useGLTF(CloudScene);  
  console.log(nodes, materials);

  return (
    <a.group ref={CloudRef} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloud1.geometry}
        material={materials.Cloude}
        position={[-2.05, -0.3, 2.9]}
        rotation={[0.113, -0.4, 0.071]}
        scale={[0.265, 0.222, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloud2.geometry}
        material={materials.Cloude}
        position={[-4.3, 0.13, -2.041]}
        rotation={[-2.596, -1.122, 0.642]}
        scale={[-0.437, -0.4, -0.35]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Center.geometry}
        material={materials.Cloude}
        scale={0.234}
      />
     </a.group>
  );
}

useGLTF.preload('/Cloud.gltf');  // 미리 로드

export default Cloud; 


useGLTF.preload('/Cloud.gltf')
