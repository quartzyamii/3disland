import React, { useRef, useEffect } from 'react';

const NUM_STARS = 150;
const TRAIL_LENGTH = 250;

const STAR_COLOR = '#cae9fa';

const Star = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 별 초기화
    function initStars() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      stars.current = Array.from({ length: NUM_STARS }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.001 + Math.random() * 0.0005;
        const radius = Math.min(w, h) * (0.2 + Math.random() * 0.5);
        return {
          angle,
          speed,
          radius,
          trail: [],
        };
      });
    }
    initStars();
    window.addEventListener('resize', initStars);
    

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 1.95;
      const now = Date.now();

      stars.current.forEach(star => {
        // 각도 업데이트
        star.angle += star.speed;
        if (star.angle > Math.PI * 2) star.angle -= Math.PI * 2;

        // 현재 위치 계산
        const x = centerX + star.radius * Math.cos(star.angle);
        const y = centerY + star.radius * Math.sin(star.angle);
        star.trail.push({ x, y, timestamp: now });
        if (star.trail.length > TRAIL_LENGTH) star.trail.shift();

        // 궤적 그리기
        if (star.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(star.trail[0].x, star.trail[0].y);
          for (let i = 1; i < star.trail.length; i++) {
            const point = star.trail[i];
            const alpha = i / star.trail.length;
            ctx.strokeStyle = STAR_COLOR;
            ctx.globalAlpha = alpha;
            ctx.lineTo(point.x, point.y);
          }
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // 별 그리기
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = STAR_COLOR;
        ctx.globalAlpha = 1;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', initStars);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default Star; 