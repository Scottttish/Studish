import React, { useState } from "react";
import "../styles/Navigation.css";

function Navigation() {
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [error, setError] = useState("");

  const handleFavoriteClick = async () => {
    if (showRecipes) {
      setShowRecipes(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/favorites");
      if (!response.ok) throw new Error("Ошибка при получении избранных рецептов");
      const data = await response.json();

      const favoriteRecipeIds = data.map(fav => fav.recipeId);
      setFavorites(favoriteRecipeIds);

      const [allResponse, newResponse, newPopularResponse, popularResponse] = await Promise.all([
        fetch("http://localhost:3001/all_receipt"),
        fetch("http://localhost:3001/new_recipe"),
        fetch("http://localhost:3001/new_popular_recipe"),
        fetch("http://localhost:3001/popular_recipe")
      ]);

      const [allRecipes, newRecipes, newPopularRecipes, popularRecipes] = await Promise.all([
        allResponse.json(),
        newResponse.json(),
        newPopularResponse.json(),
        popularResponse.json()
      ]);

      const combinedRecipes = [...allRecipes, ...newRecipes, ...newPopularRecipes, ...popularRecipes];
      const filteredRecipes = combinedRecipes.filter(recipe => favoriteRecipeIds.includes(recipe.id));

      if (filteredRecipes.length === 0) {
        setError("Нет избранных рецептов для отображения");
      } else {
        setRecipes(filteredRecipes);
        setError("");
        setShowRecipes(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Функция прокрутки к секции
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav className="navigation-section">
        <div className="navigation-block">
          <img className="logo" onClick={() => scrollToSection("home")} src="/images/Navigation/logo.png" alt="Logo" />

          <div className="nav-links">
            <p onClick={() => scrollToSection("home")}>Главная</p>
            <p onClick={() => scrollToSection("about")}>О нас</p>
            <p onClick={() => scrollToSection("receipt")}>Рецепты</p>
            <p onClick={() => scrollToSection("reviews")}>Отзывы</p>
            <p onClick={() => scrollToSection("faq")}>FAQ</p>
          </div>

          <button className={`favorite-btn ${showRecipes ? "active" : ""}`} onClick={handleFavoriteClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff6b00" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          <button className="register-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </nav>

      {error && <div style={{ color: "red", padding: "10px", textAlign: "center" }}>{error}</div>}

      {showRecipes && (
        <div className="recipe-favorites-list">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-favorites">
              <img src={recipe.image} alt={recipe.title} className="recipe-favorites-image" />
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navigation;
