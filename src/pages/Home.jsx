import React, { Suspense } from 'react';
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'

import MeshGround2 from '../models/MeshGround2';
import Glowstick from '../models/glowstick';

// 가운데 상단에 팝업 코드
{/* <div className = "absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            POPUP
            </di v> */}

const Home = () => {
  //화면위치,스케일조정(편집중)
  // const adjustGlowstickForScreensize = () => {
  //   let screenScale, screenPosition;
  // }

  // if (window.innerWidth < 768) {
  //   screenScale = [0.9,0.9,0.9];
  //   screenPosition = [0,-6.5,-4.3];
  // } else {
  //   screenScale = [1,1,1];
  //   screenPosition = [0,-6.5,-4.3];
  // }
    return (
        <section className = "w-full h-screen relative">
            {/* 3D 장면 */}
            <Canvas 
              className = "w-full h-screen bg transparent"
              camera = {{near : 0.1, far : 1000 ,position : [0,0,5]}}
            >
              <Suspense fallback ={<Loader />}>
                <directionalLight  />
                <ambientLight  />
                <pointLight  />
                <spotLight  />
                <hemisphereLight  />
                <Glowstick position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
                <MeshGround2 position={[0, 0, 0]} scale={[1, 1, 1]} />
              </Suspense>
            </Canvas>
        </section>
    )
}

export default Home;