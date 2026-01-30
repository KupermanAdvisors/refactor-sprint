"use client";

import { useEffect, useRef } from "react";

export default function NeuralBraidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation state
    let animationFrameId: number;
    let time = 0;

    // Stream A: The Human (Organic, slow, warm)
    class HumanStream {
      particles: Array<{
        x: number;
        y: number;
        age: number;
        size: number;
      }> = [];

      update(time: number, canvasWidth: number, canvasHeight: number) {
        // Add new particles at bottom
        if (Math.random() < 0.3) {
          this.particles.push({
            x: canvasWidth / 2,
            y: canvasHeight,
            age: 0,
            size: 2 + Math.random() * 3,
          });
        }

        // Update particles
        this.particles.forEach((p, index) => {
          p.age += 0.01;
          p.y -= 1.5; // Slow upward movement
          
          // Calculate progress from bottom to top (1 = bottom, 0 = top)
          const progress = p.y / canvasHeight;
          
          // Amplitude decay: wide at bottom, narrow at top, zero at convergence
          const maxAmplitude = 150;
          const amplitude = maxAmplitude * progress;
          
          // Double helix: sin(t) phase for Stream A
          const helixPhase = p.age * 2;
          p.x = canvasWidth / 2 + Math.sin(helixPhase) * amplitude;

          // Remove old particles
          if (p.y < 0 || p.age > 10) {
            this.particles.splice(index, 1);
          }
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw glowing trail
        ctx.save();
        
        // Draw connections between nearby particles
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const p1 = this.particles[i];
            const p2 = this.particles[j];
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            
            if (dist < 80) {
              const opacity = (1 - dist / 80) * (1 - p1.age / 10) * 0.3;
              ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Draw particles with glow
        this.particles.forEach((p) => {
          const opacity = 1 - p.age / 10;
          
          // Outer glow
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `rgba(245, 158, 11, ${opacity * 0.8})`);
          gradient.addColorStop(0.5, `rgba(245, 158, 11, ${opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(245, 158, 11, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Core
          ctx.fillStyle = `rgba(251, 191, 36, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.restore();
      }
    }

    // Stream B: The AI (Precise, fast, electric)
    class AIStream {
      particles: Array<{
        x: number;
        y: number;
        age: number;
        size: number;
        speed: number;
      }> = [];

      update(time: number, canvasWidth: number, canvasHeight: number) {
        // Add new particles at bottom
        if (Math.random() < 0.5) {
          this.particles.push({
            x: canvasWidth / 2,
            y: canvasHeight,
            age: 0,
            size: 1 + Math.random() * 2,
            speed: 3 + Math.random() * 2,
          });
        }

        // Update particles
        this.particles.forEach((p, index) => {
          p.age += 0.015;
          p.y -= p.speed; // Fast upward movement
          
          // Calculate progress from bottom to top (1 = bottom, 0 = top)
          const progress = p.y / canvasHeight;
          
          // Amplitude decay: wide at bottom, narrow at top, zero at convergence
          const maxAmplitude = 150;
          const amplitude = maxAmplitude * progress;
          
          // Double helix: sin(t + PI) phase for Stream B (180 degrees out of phase)
          const helixPhase = p.age * 2;
          p.x = canvasWidth / 2 + Math.sin(helixPhase + Math.PI) * amplitude;

          // Jittery movement (high-frequency) - but smaller at top
          p.x += (Math.random() - 0.5) * 2 * progress;

          // Remove old particles
          if (p.y < 0 || p.age > 8) {
            this.particles.splice(index, 1);
          }
        });
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        
        // Draw grid lines between particles
        for (let i = 0; i < this.particles.length - 1; i++) {
          const p1 = this.particles[i];
          const p2 = this.particles[i + 1];
          const opacity = (1 - p1.age / 8) * 0.4;
          
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw particles with sharp glow
        this.particles.forEach((p) => {
          const opacity = 1 - p.age / 8;
          
          // Sharp glow
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
          gradient.addColorStop(0.7, `rgba(59, 130, 246, ${opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Core (sharp square for precision)
          ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        });
        
        ctx.restore();
      }
    }

    // The Singularity - convergence point at the top
    class Singularity {
      pulsePhase: number = 0;

      draw(ctx: CanvasRenderingContext2D, humanParticles: any[], aiParticles: any[], time: number, canvasWidth: number, canvasHeight: number) {
        const centerX = canvasWidth / 2;
        const singularityY = canvasHeight * 0.15; // Convergence point
        
        // Find particles near the singularity
        const nearSingularity = [...humanParticles, ...aiParticles].filter(
          p => p.y < canvasHeight * 0.25 && p.y > canvasHeight * 0.05
        );
        
        if (nearSingularity.length > 0) {
          // Pulse effect
          this.pulsePhase += 0.03;
          const pulseScale = 1 + Math.sin(this.pulsePhase) * 0.2;
          
          // Vertical beam converging upward
          const beamGradient = ctx.createLinearGradient(centerX, canvasHeight * 0.3, centerX, 0);
          beamGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          beamGradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.1)');
          beamGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
          beamGradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
          
          ctx.fillStyle = beamGradient;
          ctx.beginPath();
          ctx.moveTo(centerX - 60, canvasHeight * 0.3);
          ctx.lineTo(centerX - 15, singularityY);
          ctx.lineTo(centerX + 15, singularityY);
          ctx.lineTo(centerX + 60, canvasHeight * 0.3);
          ctx.closePath();
          ctx.fill();
          
          // Intense glowing core (The Singularity)
          const coreSize = 40 * pulseScale;
          
          // Outer glow layers
          for (let i = 3; i > 0; i--) {
            const glowGradient = ctx.createRadialGradient(
              centerX, singularityY, 0, 
              centerX, singularityY, coreSize * i
            );
            
            if (i === 3) {
              glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
              glowGradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.2)');
              glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            } else if (i === 2) {
              glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
              glowGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
              glowGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
            } else {
              glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              glowGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
              glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            }
            
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(centerX, singularityY, coreSize * i, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Bright white core
          const coreGradient = ctx.createRadialGradient(
            centerX, singularityY, 0,
            centerX, singularityY, 12 * pulseScale
          );
          coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          coreGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.8)');
          coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = coreGradient;
          ctx.beginPath();
          ctx.arc(centerX, singularityY, 12 * pulseScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const humanStream = new HumanStream();
    const aiStream = new AIStream();
    const singularity = new Singularity();

    // Animation loop
    const animate = () => {
      time += 0.016;

      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw streams
      humanStream.update(time, canvas.width, canvas.height);
      aiStream.update(time, canvas.width, canvas.height);
      
      // Set blend mode for additive color mixing at intersections
      ctx.globalCompositeOperation = 'lighter';
      
      humanStream.draw(ctx);
      aiStream.draw(ctx);
      
      ctx.globalCompositeOperation = 'source-over';
      
      singularity.draw(ctx, humanStream.particles, aiStream.particles, time, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      {/* Gradient mask to fade out behind text */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent 0%, transparent 30%, rgba(15, 23, 42, 0.5) 60%, rgba(15, 23, 42, 0.9) 80%, #0f172a 100%)',
          zIndex: 1
        }}
      />
    </>
  );
}
