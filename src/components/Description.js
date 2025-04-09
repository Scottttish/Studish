import React, { useState, useEffect, useRef } from "react";
import "../styles/Description.css";

const Description = () => {
  const canvasRef = useRef(null);
    const particlesRef = useRef([]);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    
      class Particle {
        constructor(x, y, radius, color, velocity, angle) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.color = color;
          this.velocity = velocity;
          this.angle = angle;
        }
    
        draw() {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 4, false);
          ctx.fill();
          ctx.closePath();
        }
    
        update() {
          this.angle += 0.008;
          this.x += Math.cos(this.angle) * this.velocity.x;
          this.y += Math.sin(this.angle) * this.velocity.y;
          this.draw();
        }
      }
    
      function initParticles() {
        particlesRef.current = [];
        const colors = [
          "rgba(241, 150, 4, 0.8)",
          "rgba(229, 144, 25, 0.85)",
          "rgba(255, 140, 0, 0.75)"
        ];
        const numParticles = 20; 
    
        const centerX = canvas.width / 2; 
        const centerY = canvas.height / 2; 
    
        for (let i = 0; i < numParticles; i++) {
          const radius = Math.random() * 1050 + 100; 
          const x = centerX + (Math.random() - 0.5) * 600; 
          const y = centerY + (Math.random() - 0.5) * 600;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const velocity = {
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4,
          };
          const angle = Math.random() * Math.PI * 20;
          particlesRef.current.push(new Particle(x, y, radius, color, velocity, angle));
        }
      }
    
      function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current.forEach((particle) => particle.update());
      }
    
      initParticles();
      animate();
    }, []);
  

  return (
    <div className="description-container">
      <canvas ref={canvasRef}/>
      <div className="header-text">
        <h2>Наши плюсы</h2>
        <p>Мы гордимся тем, что предоставляем нашим клиентам уникальные <br />преимущества, которые делают нас лучшими в своем деле.</p>
      </div>
      <div className="content-container">
        <div className="plus-container">
          <img className="description-image" src="/images/Description/suitcase.png" />
          <div className="text-container">
            <h2>5 лет работы</h2>
            <p>С учетом опыта мы предлагаем удобный сайт с рецептами, сочетающий простоту поиска и разнообразие блюд.</p>
          </div>
        </div>
        <div className="plus-container">
          <img className="description-image" src="/images/Description/ingredients.png" />
          <div className="text-container">
            <h2>Широкий выбор рецептов</h2>
            <p>Мы предлагаем разнообразие рецептов для любых вкусов и предпочтений, которые регулярно обновляются.</p>
          </div>
        </div>
        <div className="plus-container">
          <img className="description-image" src="/images/Description/favorite.png" />
          <div className="text-container">
            <h2>Избранные рецепты</h2>
            <p>Сохраните любимые рецепты в разделе "Избранное", чтобы быстро возвращаться к ним и не тратить время на поиск.</p>
          </div>
        </div>
      </div>

      <div className="our-sponsor-section">
        <div className="sponsors-image">
          {[...Array(2)].map((_, i) => (
            <>
              <img key={`danone-${i}`} src="/images/Description/Danone.png" />
              <img key={`unilever-${i}`} src="/images/Description/Bayan-sulu.png" />
              <img key={`barilla-${i}`} src="/images/Description/Barilla.png" />
              <img key={`makfa-${i}`} src="/images/Description/La-molisana.png" />
              <img key={`makfa2-${i}`} src="/images/Description/Bonduelle.svg" />
              <img key={`hochland-${i}`} src="/images/Description/Hochland.png" />
              <img key={`rolton-${i}`} src="/images/Description/Prostokvashino.png" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
