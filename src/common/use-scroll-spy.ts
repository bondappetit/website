import { useState, useEffect, useCallback, useRef } from 'react';
import { useMountedState } from 'react-use';

export const useScrollSpy = ({
  activeSectionDefault = '',
  offsetPx = 0,
  sectionElements
}: {
  activeSectionDefault?: string;
  offsetPx?: number;
  sectionElements: string;
}) => {
  const [activeSection, setActiveSection] = useState(activeSectionDefault);
  const sectionElementsRef = useRef<Element[]>([]);

  const mounted = useMountedState();

  const handle = useCallback(() => {
    let currentSectionId = activeSection;

    sectionElementsRef.current.forEach((section) => {
      if (!section || !(section instanceof Element)) return;

      if (section.getBoundingClientRect().top - offsetPx < 0) {
        currentSectionId = section.id;
      }
    });

    setActiveSection(currentSectionId);
  }, [activeSection, offsetPx]);

  useEffect(() => {
    if (mounted()) {
      sectionElementsRef.current = [
        ...document.querySelectorAll(sectionElements)
      ];
    }

    handle();

    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, [offsetPx, handle, sectionElements, mounted]);

  return activeSection;
};
