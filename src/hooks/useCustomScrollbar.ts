import { useRef, useEffect, useCallback, RefObject } from "react";

const defaultOptions = {
  minThumbWidth: 30,
  maxThumbWidth: 100,
};

export const useCustomScrollbar = (
  containerRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  thumbRef: RefObject<HTMLElement | null>
) => {
  const { minThumbWidth, maxThumbWidth } = defaultOptions;

  const isDragging = useRef(false);
  const startX = useRef(0);
  const initialScrollLeft = useRef(0);

  const updateScrollbarThumb = useCallback(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (!container || !thumb || !track) return;

    const { scrollLeft, scrollWidth, clientWidth: containerWidth } = container;
    const trackWidth = track.clientWidth;
    const isScrollable = scrollWidth > containerWidth;

    if (isScrollable) {
      const proportionalThumbWidth = (containerWidth / scrollWidth) * trackWidth;

      const maxWidthConstrained = Math.min(proportionalThumbWidth, maxThumbWidth);
      const finalThumbWidth = Math.max(maxWidthConstrained, minThumbWidth);

      const maxScrollLeft = scrollWidth - containerWidth;
      const maxThumbX = trackWidth - finalThumbWidth;
      const scrollPercentage = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0;
      const thumbX = scrollPercentage * maxThumbX;

      thumb.style.width = `${finalThumbWidth}px`;
      thumb.style.transform = `translateX(${thumbX}px)`;
      thumb.style.display = "block";
    } else {
      thumb.style.display = "none";
    }
  }, [containerRef, trackRef, thumbRef, minThumbWidth, maxThumbWidth]);

  // --- Mouse Drag Handlers ---
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging.current || !containerRef.current || !trackRef.current || !thumbRef.current) return;
      event.preventDefault();

      const container = containerRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;

      const { scrollWidth, clientWidth: containerWidth } = container;
      const trackWidth = track.clientWidth;
      const thumbWidth = thumb.offsetWidth;
      const maxScrollLeft = scrollWidth - containerWidth;
      const maxThumbX = trackWidth - thumbWidth;

      if (maxThumbX <= 0) return;

      const currentX = event.clientX;
      const deltaX = currentX - startX.current;
      const scrollRatio = maxScrollLeft / maxThumbX;
      const deltaScroll = deltaX * scrollRatio;
      let newScrollLeft = initialScrollLeft.current + deltaScroll;
      newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
      container.scrollLeft = newScrollLeft;
    },
    [containerRef, thumbRef, trackRef]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    }
  }, [handleMouseMove]);

  const handleThumbMouseDown = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      isDragging.current = true;
      startX.current = event.clientX;
      initialScrollLeft.current = container.scrollLeft;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    },
    [containerRef, handleMouseMove, handleMouseUp]
  );

  // --- Touch Drag Handlers ---
  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (
        !isDragging.current ||
        !containerRef.current ||
        !trackRef.current ||
        !thumbRef.current ||
        event.touches.length === 0
      )
        return;

      const container = containerRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;

      const { scrollWidth, clientWidth: containerWidth } = container;
      const trackWidth = track.clientWidth;
      const thumbWidth = thumb.offsetWidth;
      const maxScrollLeft = scrollWidth - containerWidth;
      const maxThumbX = trackWidth - thumbWidth;

      if (maxThumbX <= 0) return;

      const currentX = event.touches[0].clientX;
      const deltaX = currentX - startX.current;
      const scrollRatio = maxScrollLeft / maxThumbX;
      const deltaScroll = deltaX * scrollRatio;
      let newScrollLeft = initialScrollLeft.current + deltaScroll;
      newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
      container.scrollLeft = newScrollLeft;
    },
    [containerRef, thumbRef, trackRef]
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    }
  }, [handleTouchMove]);

  const handleThumbTouchStart = useCallback(
    (event: TouchEvent) => {
      const container = containerRef.current;
      if (!container || event.touches.length === 0) return;

      isDragging.current = true;
      startX.current = event.touches[0].clientX;
      initialScrollLeft.current = container.scrollLeft;
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchcancel", handleTouchEnd);
    },
    [containerRef, handleTouchMove, handleTouchEnd]
  );

  // --- Effect for Scroll Events ---
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      updateScrollbarThumb(); // Initial update
      container.addEventListener("scroll", updateScrollbarThumb, { passive: true });
      return () => container.removeEventListener("scroll", updateScrollbarThumb);
    }
  }, [containerRef, updateScrollbarThumb]);

  // --- Effect for Resize Events ---
  useEffect(() => {
    const container = containerRef.current;

    const track = trackRef.current;
    if (container) {
      const elementsToObserve = [container];
      if (track) elementsToObserve.push(track);

      const resizeObserver = new ResizeObserver(() => {
        updateScrollbarThumb();
      });
      elementsToObserve.forEach((el) => resizeObserver.observe(el));
      return () => resizeObserver.disconnect();
    }
  }, [containerRef, trackRef, updateScrollbarThumb]);

  // --- Effect to Attach Drag Start Listeners to Thumb ---
  useEffect(() => {
    const thumb = thumbRef.current;
    if (thumb) {
      const downHandler = (e: MouseEvent) => handleThumbMouseDown(e);
      const touchHandler = (e: TouchEvent) => handleThumbTouchStart(e);

      thumb.addEventListener("mousedown", downHandler);
      thumb.addEventListener("touchstart", touchHandler, { passive: true });

      return () => {
        thumb.removeEventListener("mousedown", downHandler);
        thumb.removeEventListener("touchstart", touchHandler);
      };
    }
  }, [thumbRef, handleThumbMouseDown, handleThumbTouchStart]);

  // --- Effect for Global Drag Listener Cleanup on Unmount ---
  useEffect(() => {
    const cleanup = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    };
    return cleanup;
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);
};
