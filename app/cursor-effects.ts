/**
 * Enhanced cursor effects for the OmniChannel landing page
 * Provides a smooth cursor follower effect with adaptive behavior
 */

export const initCursorEffects = (): void => {
  if (typeof window === 'undefined') return;
  
  // Get the cursor follower element
  const cursorFollower = document.getElementById('cursor-follower');
  if (!cursorFollower) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show cursor follower when mouse moves
    cursorFollower.style.opacity = '0.6';
  });
  
  // Handle mouse leaving the window
  document.addEventListener('mouseout', () => {
    cursorFollower.style.opacity = '0';
  });
  
  // Enhanced hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, [data-hover-effect]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursorFollower.style.mixBlendMode = 'difference';
      cursorFollower.style.opacity = '0.9';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.mixBlendMode = 'screen';
      cursorFollower.style.opacity = '0.6';
    });
  });
  
  // Smooth cursor animation using requestAnimationFrame
  const smoothlyMoveCursor = () => {
    // Calculate smooth position with easing
    const easeFactor = 0.15;
    cursorX += (mouseX - cursorX) * easeFactor;
    cursorY += (mouseY - cursorY) * easeFactor;
    
    // Apply position
    if (cursorFollower) {
      cursorFollower.style.left = `${cursorX}px`;
      cursorFollower.style.top = `${cursorY}px`;
    }
    
    // Continue animation loop
    requestAnimationFrame(smoothlyMoveCursor);
  };
  
  // Start animation
  smoothlyMoveCursor();
};
