import React, { Suspense } from 'react';
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'

 
import Glowstick from '../models/glowstick';

// 가운데 상단에 팝업 코드
{/* <div className = "absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
            POPUP
            </di v> */}

const Home = () => {
    return (
        <section className = "w-full h-screen relative">
            {/* 3D 장면 */}
            <Canvas 
              className = "w-full h-screen bg transparent"
              camera = {{near : 0.1, far : 1000 ,position : [0,0,5],}}
            >
              <Suspense fallback ={<Loader />}>
                <directionalLight  />
                <ambientLight  />
                <pointLight  />
                <spotLight  />
                <hemisphereLight  />

                <Glowstick position={[0,0,0]}/>
              </Suspense>
            </Canvas>
        </section>
    )
}

export default Home;