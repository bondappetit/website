import { useEffect, useRef } from 'react';

export const useBodyScrollLock = (locked: boolean) => {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = window.pageYOffset;
  });

  useEffect(() => {
    const bodyElement = document.body;

    const lock = () => {
      bodyElement.style.overflow = 'hidden';
      bodyElement.style.position = 'fixed';
      bodyElement.style.top = `-${ref.current}px`;
      bodyElement.style.width = '100%';
      bodyElement.style.height = '100%';
    };

    const unlock = () => {
      bodyElement.style.removeProperty('overflow');
      bodyElement.style.removeProperty('position');
      bodyElement.style.removeProperty('top');
      bodyElement.style.removeProperty('width');
      bodyElement.style.removeProperty('height');

      if (ref.current !== undefined) {
        window.scrollTo(0, ref.current);
      }
    };

    if (locked) {
      lock();
    } else {
      unlock();
    }

    return unlock;
  }, [locked]);
};
