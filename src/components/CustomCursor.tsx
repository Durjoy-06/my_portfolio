import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Custom brutalist cursor: a small crosshair that scales up and shows "VIEW"
// on hoverable elements. Disabled on touch devices (caller controls mount).
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');

    let pendingX = 0;
    let pendingY = 0;

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!visible) setVisible(true);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          x.set(pendingX);
          y.set(pendingY);
          rafRef.current = 0;
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (target.closest('a, button, [data-cursor="hover"]')) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const size = variant === 'view' ? 96 : variant === 'hover' ? 48 : 16;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: variant === 'view' ? '#FF3B00' : 'rgba(10,10,10,0)',
        borderColor: variant === 'view' ? '#FF3B00' : '#0A0A0A',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.4 }}
    >
      {variant === 'default' && (
        <>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
          <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-ink" />
        </>
      )}
      {variant === 'view' && (
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-bone">
          View
        </span>
      )}
    </motion.div>
  );
}
