import React, { useEffect, useRef } from "react";
import "../styles/Description.css";

const Description = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y *= -1;
        }

        this.draw();
      }
    }

    const particles = [];
    const colors = [
      "rgba(241, 150, 4, 0.8)",
      "rgba(229, 144, 25, 0.85)",
      "rgba(255, 140, 0, 0.75)"
    ];

    for (let i = 0; i < 30; i++) {
      const radius = Math.random() * 20 + 10;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      };
      particles.push(new Particle(x, y, radius, color, velocity));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => particle.update());
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="description-container">
      <canvas ref={canvasRef} className="description-canvas" />
      <div className="header-text">
        <h2>Наши плюсы</h2>
        <p>Мы гордимся тем, что предоставляем нашим клиентам уникальные <br />преимущества, которые делают нас лучшими в своем деле.</p>
      </div>
      <div className="content-container">
        <div className="plus-container">
          <img className="description-image" src="/images/Description/suitcase.png" alt="suitcase" />
          <div className="text-container">
            <h2>5 лет работы</h2>
            <p>С учетом опыта мы предлагаем удобный сайт с рецептами, сочетающий простоту поиска и разнообразие блюд.</p>
          </div>
        </div>
        <div className="plus-container">
          <img className="description-image" src="/images/Description/ingredients.png" alt="ingredients" />
          <div className="text-container">
            <h2>Широкий выбор рецептов</h2>
            <p>Мы предлагаем разнообразие рецептов для любых вкусов и предпочтений, которые регулярно обновляются.</p>
          </div>
        </div>
        <div className="plus-container">
          <img className="description-image" src="/images/Description/favorite.png" alt="favorite" />
          <div className="text-container">
            <h2>Избранные рецепты</h2>
            <p>Сохраните любимые рецепты в разделе "Избранное", чтобы быстро возвращаться к ним и не тратить время на поиск.</p>
          </div>
        </div>
      </div>

      <div className="our-sponsor-section">
        <div className="sponsors-image">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <img src="images/Description/Danone.png" alt="Danone" />
              <img src="/images/Description/Bayan-sulu.png" alt="Bayan-sulu" />
              <img src="/images/Description/Barilla.png" alt="Barilla" />
              <img src="/images/Description/La-molisana.png" alt="La-molisana" />
              <img src="/images/Description/Bonduelle.svg" alt="Bonduelle" />
              <img src="/images/Description/Hochland.png" alt="Hochland" />
              <img src="/images/Description/Prostokvashino.png" alt="Prostokvashino" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
