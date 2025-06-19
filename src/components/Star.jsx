import React, { useRef, useEffect, useCallback } from 'react';

const NUM_STARS = 150;
const TRAIL_LENGTH = 250;

// 기본 별 색상
const DEFAULT_STAR_COLOR = '#f9fdff';

const Star = ({ color }) => {
  // 전달된 색상이 있으면 사용하고, 없으면 기본 색상 사용
  const starColorRef = useRef(color || DEFAULT_STAR_COLOR); // 목표 색상 (목표 값)
  const transitionColorRef = useRef(color || DEFAULT_STAR_COLOR); // 트랜지션용 색상 참조 (현재 보여지는 값)
  const animationIdRef = useRef(null);
  const transitionStartRef = useRef(null); // 트랜지션 시작 시간
  const transitionDurationRef = useRef(500); // 트랜지션 딜레이(ms), 0.5초로 설정 (배경 전환과 동일하게)
  
  // 현재 색상을 반환하는 함수 (useCallback으로 메모이제이션)
  const getStarColor = useCallback(() => {
    return color || DEFAULT_STAR_COLOR;
  }, [color]);
  
  // 현재 트랜지션 중인 색상을 계산하는 함수
  const getTransitionColor = useCallback((timestamp) => {
    // 최종 목표 색상과 트랜지션 중인 색상이 같으면 트랜지션 필요 없음
    if (transitionColorRef.current === starColorRef.current) {
      return starColorRef.current;
    }
    
    // 트랜지션 시작 시간 초기화
    if (!transitionStartRef.current) {
      transitionStartRef.current = timestamp;
      console.log('Transition started at timestamp:', timestamp);
      return transitionColorRef.current;
    }
    
    const elapsedTime = timestamp - transitionStartRef.current;
    const duration = transitionDurationRef.current;
    
    // 부드러운 이징 함수 적용 (easeOutQuad - 좀 더 빠르게 시작하고 부드럽게 끝나는 효과)
    let progress = Math.min(elapsedTime / duration, 1);
    progress = 1 - Math.pow(1 - progress, 2); // 시작 시 더 빠른 색상 변화를 위한 easeOutQuad
    
    // 트랜지션 완료 시
    if (progress >= 1) {
      console.log('Transition completed:', starColorRef.current);
      transitionColorRef.current = starColorRef.current;
      transitionStartRef.current = null; // 다음 트랜지션을 위해 초기화
      return starColorRef.current;
    }
    
    // 16진수 색상을 RGB로 변환
    const fromColor = transitionColorRef.current;
    const toColor = starColorRef.current;
    
    try {
      const fromRGB = hexToRgb(fromColor);
      const toRGB = hexToRgb(toColor);
      
      // 두 색상 사이를 이징 적용하여 보간
      const r = Math.round(fromRGB.r + (toRGB.r - fromRGB.r) * progress);
      const g = Math.round(fromRGB.g + (toRGB.g - fromRGB.g) * progress);
      const b = Math.round(fromRGB.b + (toRGB.b - fromRGB.b) * progress);
      
      return `rgb(${r}, ${g}, ${b})`;
    } catch (error) {
      console.error('Color transition error:', error);
      return starColorRef.current; // 오류 발생 시 기본값 반환
    }
  }, []);
  
  // 16진수 색상을 RGB로 변환하는 유틸리티 함수 (오류 처리 및 다양한 형식 지원)
  const hexToRgb = (color) => {
    // color가 이미 rgb 형식인 경우 처리 (예: rgb(255, 255, 255))
    if (color.startsWith('rgb')) {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        return {
          r: parseInt(rgbMatch[1], 10),
          g: parseInt(rgbMatch[2], 10),
          b: parseInt(rgbMatch[3], 10)
        };
      }
    }
    
    // 16진수 색상 처리
    try {
      // #으로 시작하면 제거
      let hex = color.replace(/^#/, '');
      
      // 3자리 헥스 코드를 6자리로 변환 (#rgb -> #rrggbb)
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      
      // 유효한 16진수 색상인지 확인
      if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        console.warn(`Invalid hex color: ${color}, falling back to white`);
        return { r: 255, g: 255, b: 255 };
      }
      
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    } catch (error) {
      console.error('Error parsing color:', color, error);
      return { r: 255, g: 255, b: 255 }; // 오류 발생 시 흰색 반환
    }
  };
  
  console.log('Star component rendered with color:', getStarColor());
  const canvasRef = useRef(null);
  const stars = useRef([]);

  // 색상이 변경될 때마다 로그 출력 및 참조 업데이트
  useEffect(() => {
    const newColor = getStarColor();
    console.log('Star color changed to:', newColor);
    
    // 트랜지션을 위해 이전 색상 저장 (현재 표시 중인 색상)
    if (starColorRef.current !== newColor) {
      console.log(`Star color transition: ${starColorRef.current} -> ${newColor}`);
      transitionColorRef.current = starColorRef.current; // 이전 색상 저장
      starColorRef.current = newColor; // 새 목표 색상 설정
      transitionStartRef.current = null; // 트랜지션 시작 시간 초기화
      console.log('Color transition starting from', transitionColorRef.current, 'to', starColorRef.current);
    }
    
    // 색상이 변경될 때마다 캔버스를 다시 그립니다.
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 별 초기화를 강제로 다시 수행
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
  }, [color, getStarColor]);

  // 별 초기화 함수를 외부로 빼서 재사용 가능하게 함
  const initStars = useCallback(() => {
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
  }, []);

  // 메인 렌더링 효과
  useEffect(() => {
    console.log('Star component mounted with initial color:', starColorRef.current);
    
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

    // 초기화
    initStars();
    window.addEventListener('resize', initStars);
    
    // 애니메이션 함수
    function draw(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 1.95;
      const now = Date.now();
      
      // 매 프레임마다 트랜지션을 적용한 색상 계산
      const transitionColor = getTransitionColor(timestamp);
      
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
            const alpha = (i / star.trail.length) * 0.2; // 투명도 20%
            ctx.strokeStyle = transitionColor; // 트랜지션 색상 사용
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
        ctx.fillStyle = transitionColor; // 트랜지션 색상 사용
        ctx.globalAlpha = 0.2; // 투명도 20%
        ctx.fill();
        ctx.globalAlpha = 1; // 다른 그림 요소에 영향을 주지 않도록 초기화
      });
      
      // 다음 프레임 요청
      animationId = requestAnimationFrame(timestamp => draw(timestamp));
      animationIdRef.current = animationId; // 참조 갱신
    }
    // 애니메이션 시작 및 참조 저장
    animationId = requestAnimationFrame(timestamp => draw(timestamp));
    animationIdRef.current = animationId;

    return () => {
      console.log('Star component unmounting, cleaning up resources');
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', initStars);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      // 트랜지션 관련 참조 정리
      transitionStartRef.current = null;
    };
  }, [initStars]);

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