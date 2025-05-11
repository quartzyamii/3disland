import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';

import StarBottleScene from '/assets/3d/StarBottle.gltf?url';  

const StarBottle = (props) => { 
     const StarBottleRef = useRef(); 
  
    const { nodes, materials } = useGLTF(StarBottleScene);  
    console.log(nodes, materials);

  return (
    <a.group ref={StarBottleRef} {...props}> 
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BottleLid.geometry}
        material={materials.BottleLid}
        position={[0, 1.833, 0]}
        scale={[0.251, 0.207, 0.251]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Star.geometry}
        material={materials.Star}
        position={[0.026, 0.357, -0.393]}
        rotation={[1.773, -0.236, 0.169]}
        scale={0.358}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BottlePaper.geometry}
        material={materials.BottlePaper}
        position={[0.171, 0.018, -0.041]}
        rotation={[0, 0, 0.214]}
        scale={[0.46, 0.615, 0.457]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PaperString.geometry}
        material={materials.PaperString}
        position={[0.03, 0.639, -0.04]}
        rotation={[-0.023, 0.029, 0.23]}
        scale={0.163}
      />
    </a.group>
  )
}

export default StarBottle;

//useGLTF.preload('/StarBottle.gltf')