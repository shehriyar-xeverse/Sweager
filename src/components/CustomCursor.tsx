import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging springs
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover interactions (i.e. is a desktop)
    const mediaQuery = window.matchMedia('(any-hover: hover)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, select, input, textarea, [role="button"], .hoverable, img'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Listen for mouse movements and key activations
    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Set up initial listeners and run a periodic poll to catch dynamically rendered elements
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Lagging outer circular ring */}
      <motion.div
        id="custom-cursor-outer"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 52 : isClicking ? 20 : 36,
          height: isHovered ? 52 : isClicking ? 20 : 36,
          borderColor: isHovered ? '#34D399' : '#10B981',
          backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 0, 0, 0)',
        }}
        className="fixed top-0 left-0 rounded-full border-2 pointer-events-none z-50 mix-blend-difference hidden md:block"
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      {/* Precision inner core dot */}
      <motion.div
        id="custom-cursor-inner"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.3 : isClicking ? 0.5 : 1,
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-luxury-bronze rounded-full pointer-events-none z-50 hidden md:block"
      />
    </>
  );
}
