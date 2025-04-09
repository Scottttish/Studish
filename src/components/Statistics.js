import React, { useRef, useEffect, useState } from "react";
import "../styles/Statistics.css";

const Cloud = ({ children, positionClass }) => {
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
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
      for (let i = 0; i < 10; i++) {
        const radius = Math.random() * 700 + 100;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocity = {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4,
        };
        const angle = Math.random() * Math.PI * 2;
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
    <div className={`Cloud ${positionClass}`} style={{ position: "relative", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

const Statistics = () => {
  const [visits, setVisits] = useState(0);
  const [recipesCount, setRecipesCount] = useState(0);

  const fetchStatistics = async () => {
    try {
      const response = await fetch("http://localhost:3001/statistics");
      const data = await response.json();
      setVisits(data.siteViews);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  const incrementVisits = async () => {
    // Проверяем, было ли посещение ранее
    if (localStorage.getItem("visited")) {
      return; // Если посещение было, то не увеличиваем счетчик
    }
  
    try {
      // Увеличиваем количество посещений
      const response = await fetch("http://localhost:3001/statistics", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteViews: visits + 1, // здесь visits может быть старым значением
        }),
      });
  
      if (response.ok) {
        setVisits(prevVisits => prevVisits + 1); // Используем предыдущие значение для обновления
        localStorage.setItem("visited", "true"); // Запоминаем, что посещение произошло
      }
    } catch (error) {
      console.error("Error updating visits:", error);
    }
  };

  const fetchRecipesCount = async () => {
    try {
      const [allRecipes, newRecipes, popularRecipes, newPopularRecipes] = await Promise.all([
        fetch("http://localhost:3001/all_receipt"),
        fetch("http://localhost:3001/new_recipe"),
        fetch("http://localhost:3001/popular_recipe"),
        fetch("http://localhost:3001/new_popular_recipe"),
      ]);

      const allData = await Promise.all([ 
        allRecipes.json(),
        newRecipes.json(),
        popularRecipes.json(),
        newPopularRecipes.json(),
      ]);

      const totalRecipes = allData.reduce((total, recipes) => total + recipes.length, 0);
      setRecipesCount(totalRecipes);
    } catch (error) {
      console.error("Error fetching recipes count:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchRecipesCount();

    // Увеличиваем посещения только если это первое посещение
    incrementVisits();

    const interval = setInterval(() => {
      fetchStatistics();
      fetchRecipesCount();
    }, 1000);

    return () => clearInterval(interval);
  }, [visits]);

  const categories = [
    { id: 1, name: '🍖 Мясо' },
    { id: 2, name: '🍲 Супы' },
    { id: 3, name: '🥗 Салаты' },
    { id: 4, name: '🍰 Десерты' },
    { id: 5, name: '🥤 Напитки' },
    { id: 6, name: '🐟 Рыба' },
    { id: 7, name: '🥐 Выпечка' },
    { id: 8, name: '🍚 Гарниры' },
    { id: 9, name: '🍿 Закуски' },
    { id: 10, name: '🍝 Паста' }
  ];
  

  return (
    <div className="statistics-outer">
      <div className="header-text">
        <h2>Статистика</h2>
        <p>Показывает количество пользователей, просмотры страниц и <br />активность на сайте — помогает понять поведение аудитории.</p>
      </div>

      <div className="statistics-container">
        <div className="statistics-left">
          <div>
            <Cloud positionClass="for-left">
            <div className="category-sections">
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
  <div className="category-items">
    <p>🍖 Мясо</p>
    <p>🍲 Супы</p>
    <p>🥗 Салаты</p>
    <p>🍰 Десерты</p>
    <p>🥤 Напитки</p>
    <p>🐟 Рыба</p>
    <p>🥐 Выпечка</p>
    <p>🍚 Гарниры</p>
    <p>🍿 Закуски</p>
    <p>🍝 Паста</p>
  </div>
</div>
            </Cloud>
            <p className="text-in-container">Более 20+ категорий</p>
          </div>
        </div>

        <div className="statistics-right">
          <div>
            <Cloud positionClass="for-right"><h2>{visits}+</h2></Cloud>
            <p className="text-in-container">Количество посещений</p>
          </div>
          <div>
            <Cloud positionClass="for-right"><h2>0%</h2></Cloud>
            <p className="text-in-container">Процент зарегистрированных пользователей</p>
          </div>
          <div>
            <Cloud positionClass="for-right"><h2>1325+</h2></Cloud>
            <p className="text-in-container">Пользователей сейчас</p>
          </div>
          <div>
            <Cloud positionClass="for-right"><h2>{recipesCount}+</h2></Cloud>
            <p className="text-in-container">Количество рецептов</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
