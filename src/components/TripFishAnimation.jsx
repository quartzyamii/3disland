import React from 'react';

const TripFishAnimation = () => {
  return (
    <>
      <style>
        {`
          @keyframes swim {
            0% {
              transform: translateX(100vw) translateY(0);
            }
            25% {
              transform: translateX(75vw) translateY(-20px);
            }
            50% {
              transform: translateX(50vw) translateY(0);
            }
            75% {
              transform: translateX(25vw) translateY(20px);
            }
            100% {
              transform: translateX(-100%) translateY(0);
            }
          }
          
          .swimming-fish {
            position: fixed;
            z-index: 2;
            animation: swim 15s linear infinite;
            pointer-events: none;
          }
        `}
      </style>
      <img 
        src="/assets/images/TripFish1.png" 
        alt="Swimming Fish"
        className="swimming-fish"
        style={{
          top: '30%',
          width: '420px',
          height: 'auto'
        }}
      />
      <img 
        src="/assets/images/TripFish2.png" 
        alt="Swimming Fish"
        className="swimming-fish"
        style={{
          top: '40%',
          width: '320px',
          height: 'auto',
          animationDelay: '3s'
        }}
      />

       <img 
        src="/assets/images/TripFish3.png" 
        alt="Swimming Fish"
        className="swimming-fish"
        style={{
          top: '30%',
          width: '320px',
          height: 'auto',
          animationDelay: '6s'
        }}
      />

      <img 
        src="/assets/images/TripFish4.png" 
        alt="Swimming Fish"
        className="swimming-fish"
        style={{
          top: '40%',
          width: '320px',
          height: 'auto',
          animationDelay: '8s'
        }}
      />
    </>
  );
};

export default TripFishAnimation;
