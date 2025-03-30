import React, { useEffect } from 'react';

function AnimationScript() {
  useEffect(() => {
    // Create a star field in the background
    const createStarryBackground = () => {
      const body = document.body;
      const starCount = 150; // Number of stars
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random star position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random star size
        const size = Math.random() * 2;
        
        // Random star opacity
        const opacity = Math.random() * 0.8 + 0.2;
        
        // Random animation duration
        const duration = Math.random() * 7 + 3;
        
        // Apply styles
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animationDuration = `${duration}s`;
        
        // Add to body
        body.appendChild(star);
      }
    };
    
    // Add CSS for the stars
    const addStarStyles = () => {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .star {
          position: fixed;
          background-color: white;
          border-radius: 50%;
          z-index: -1;
          animation: twinkle var(--duration, 5s) ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: var(--opacity, 0.5);
          }
          50% {
            opacity: 0.2;
          }
        }
      `;
      document.head.appendChild(styleElement);
    };
    
    // Parallax effect when scrolling
    const initParallaxEffect = () => {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Apply parallax to header
        const header = document.querySelector('header');
        if (header) {
          header.style.backgroundPositionY = `${scrollY * 0.5}px`;
        }
        
        // Apply slight parallax to stars - make them move slower than scroll
        const stars = document.querySelectorAll('.star');
        stars.forEach((star) => {
          star.style.transform = `translateY(${scrollY * 0.2}px)`;
        });
      });
    };
    
    // Highlight code syntax
    const highlightCode = () => {
      const codeBlocks = document.querySelectorAll('pre');
      
      codeBlocks.forEach(block => {
        // Apply basic highlighting for JavaScript syntax
        const text = block.innerHTML;
        
        // Highlight keywords
        const highlightedText = text
          .replace(/\b(const|let|var|function|return|if|else|for|while)\b/g, '<span style="color: #569CD6;">$1</span>')
          .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #569CD6;">$1</span>')
          .replace(/\b(await|async)\b/g, '<span style="color: #C586C0;">$1</span>')
          // Highlight strings
          .replace(/(["'])(.*?)\1/g, '<span style="color: #CE9178;">$1$2$1</span>')
          // Highlight comments
          .replace(/(\/\/.*)/g, '<span style="color: #6A9955;">$1</span>');
          
        block.innerHTML = highlightedText;
      });
    };
    
    // Add smooth hover effects to images
    const addImageHoverEffects = () => {
      const images = document.querySelectorAll('.apod-img, .rover-photo img, .epic-img');
      
      images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
          const { left, top, width, height } = img.getBoundingClientRect();
          const x = (e.clientX - left) / width;
          const y = (e.clientY - top) / height;
          
          img.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 5}deg) rotateX(${(y - 0.5) * -5}deg) scale(1.02)`;
          img.style.boxShadow = `
            ${(x - 0.5) * 20}px ${(y - 0.5) * 20}px 30px rgba(0, 0, 0, 0.3),
            0 8px 25px rgba(0, 0, 0, 0.4)
          `;
        });
        
        img.addEventListener('mouseleave', () => {
          img.style.transform = '';
          img.style.boxShadow = '';
        });
      });
    };
    
    // Initialize animation features
    const init = () => {
      addStarStyles();
      createStarryBackground();
      initParallaxEffect();
      highlightCode();
      
      // Add image hover effects after a delay to ensure images are loaded
      setTimeout(addImageHoverEffects, 2000);
    };
    
    init();
    
    // Cleanup on unmount
    return () => {
      const stars = document.querySelectorAll('.star');
      stars.forEach(star => star.remove());
      
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return null; // This component doesn't render anything
}

export default AnimationScript;