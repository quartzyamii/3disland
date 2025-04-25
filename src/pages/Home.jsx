import React, { useState, Suspense } from 'react';
import {Canvas} from '@react-three/fiber';
import Loader from '../components/Loader';

// import Sky from '../models/sky';
import MeshGround2 from '../models/MeshGround2';
import Glowstick from '../models/glowstick';

// 가운데 상단에 팝업 코드
{/* <div className = "absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            POPUP
            </di v> */}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
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

    return (
        <section className = "w-full h-screen relative">
            {/* 3D 장면 */}
            <Canvas 
              className = {"w-full h-screen bg transparent ${isRotating ? 'cursor-grabbing : 'cursor-grab'}"}
              camera = {{near : 0.1, far : 1000 ,position : [0,0,5]}}
              shadows
              gl={{ antialias: true }}
            >
              <Suspense fallback ={<Loader />}>
                <directionalLight 
                position={[1,0.7,1]} 
                intensity={1} 
                castShadow 
                shadow-mapSize-width={1024}  // 그림자 맵의 해상도를 높임
                shadow-mapSize-height={1024}
                shadow-camera-left={-50}   // 그림자 카메라 범위 설정
                shadow-camera-right={50}   // 그림자 카메라 범위 설정
                shadow-camera-top={50}     // 그림자 카메라 범위 설정
                shadow-camera-bottom={-50} // 그림자 카메라 범위 설정
                shadow-camera-near={0.1}   // 그림자 카메라 근거리
                shadow-camera-far={500}    // 그림자 카메라 원거리
                shadow-bias={-0.001}  // 그림자 위치 
                />
                
                <ambientLight intensity={0.3} />
                {/* <pointLight  />
                <spotLight  /> */}
                <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={0.5} />
                
                {/* <Sky /> */}

                <MeshGround2 
                position={MeshGroundPosition} 
                scale={MeshGroundScale} 
                rotation = {MeshGroundRotation}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
                />
              </Suspense>
            </Canvas>
        </section>
    )
}

export default Home;