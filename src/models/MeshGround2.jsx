import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';

import MeshGround2Scene from "/assets/3d/MeshGround2.gltf?url";
import Glowstick from './glowstick'; 

const MeshGround = ({isRotating, setIsRotating, ...props}) => {
    const MeshGround2Ref = useRef();

    const { gl, viewport, camera } = useThree();
    const { nodes, materials } = useGLTF(MeshGround2Scene);

    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;


    const handleWheel = (e) => {
      e. preventDefault();

      const zoomSpeed = 0.05;
      camera.position.z += e.deltaY * zoomSpeed;

      if(camera.position.z < -5) camera.position.z = -5;
      if(camera.position.z > 7) camera.position.z = 7;
    }

    const handlePointerDown = (e) => {
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
        
        MeshGround2Ref.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
      
    }

    const handleKeyDown = (e) => {
      if(e.key === 'ArrowLeft') {
        if(!isRotating) setIsRotating(true);  
        MeshGround2Ref.current.rotation.y += 0.1;  
      } 
      else if(e.key === 'ArrowRight') {
        if(!isRotating) setIsRotating(true);  
        MeshGround2Ref.current.rotation.y -= 0.1; 
      }
    }

    const handleKeyUp = (e) => {
      if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setIsRotating(false);
      }
    }

    //움직이는 객체 설정시
  //   useFrame(() =>{
  //     if(!isRotating){
  //       rotationSpeed.current *= dampingFactor;

  //       if(Math.abs(rotationSpeed.current) < 0.001) {
  //         rotationSpeed.current = 0;
  //       }

  //       MeshGround2Ref.current.rotation.y += rotationSpeed.current;
  //     } else {
  //       const rotation = MeshGround2Ref.current.rotation.y;
  //     }
  //   }
  // )

    useEffect(() => {
      const canvas = gl.domElement;
      canvas.addEventListener('pointerdown', handlePointerDown);
      canvas.addEventListener('pointerup', handlePointerUp);
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('wheel', handleWheel);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return ()=> {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      }
    },[gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    console.log(nodes);

    return (
        <a.group ref={MeshGround2Ref} {...props}>
            {/* Start of Mesh Group */}
            <group 
            position={[0.294, 1.732, 0.383]} 
            scale={[0.166, 0.155, 0.166]}>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.구체004.geometry}
                material={materials['tree.003']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.구체004_1.geometry}
                material={materials['tree.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.구체004_2.geometry}
                material={materials['tree.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.구체004_3.geometry}
                material={materials['tree.004']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.구체004_4.geometry}
                material={materials['tree.005']}
            />
          </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch001.geometry}
                material={materials['tree2.001']}
                position={[0.223, 1.352, 0.167]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.024, -0.286, -0.024]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.wood.geometry}
                material={materials.매테리얼}
                position={[-0.138, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch.geometry}
                material={materials.tree2}
                position={[-0.869, 1.11, 0.737]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.014, -0.161, -0.014]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree.geometry}
                material={materials.tree}
                position={[-0.869, 1.393, 0.737]}
                scale={[0.172, 0.16, 0.172]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree001.geometry}
                material={materials['tree.010']}
                position={[-0.935, 1.026, -1.579]}
                scale={[0.1, 0.093, 0.1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch002.geometry}
                material={materials['tree2.006']}
                position={[-0.935, 0.861, -1.579]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.008, -0.093, -0.008]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree006.geometry}
                material={materials['tree.014']}
                position={[-1.806, 0.933, 2.264]}
                scale={[0.172, 0.16, 0.172]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch006.geometry}
                material={materials['tree2.010']}
                position={[-1.806, 0.65, 2.264]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.014, -0.161, -0.014]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree005.geometry}
                material={materials['tree.013']}
                position={[2.087, 0.938, -0.183]}
                scale={[0.093, 0.087, 0.093]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch005.geometry}
                material={materials['tree2.009']}
                position={[2.087, 0.784, -0.183]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.007, -0.087, -0.007]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch004.geometry}
                material={materials['tree2.008']}
                position={[2.482, 0.635, -0.807]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.014, -0.161, -0.014]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree004.geometry}
                material={materials['tree.012']}
                position={[2.482, 0.917, -0.807]}
                scale={[0.172, 0.16, 0.172]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree002.geometry}
                material={materials['tree.011']}
                position={[1.562, 1.117, -1.497]}
                scale={[0.172, 0.16, 0.172]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.tree_branch003.geometry}
                material={materials['tree2.007']}
                position={[1.562, 0.834, -1.497]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[-0.014, -0.161, -0.014]}
            />
            <Glowstick 
            position={[0, 1.11, 2]} 
            scale={[0.13, 0.13, 0.13]} 
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            castShadow
            receiveShadow
            />

            {/* End of Mesh Group */}
        </a.group>
    );
};

export default MeshGround;

// useGLTF.preload('/MeshGround.gltf')
