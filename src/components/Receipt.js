import React, { useState, useEffect } from "react";
import "../styles/Receipt.css";

const fetchReviewsCount = async (recipeId) => {
  try {
    const response = await fetch(`http://localhost:3001/reviews?recipeId=${recipeId}`);
    if (!response.ok) throw new Error("Ошибка загрузки отзывов");
    const reviews = await response.json();
    return reviews.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const fetchAverageRating = async (recipeId) => {
  try {
    const response = await fetch(`http://localhost:3001/reviews?recipeId=${recipeId}`);
    if (!response.ok) throw new Error("Ошибка загрузки отзывов");
    const reviews = await response.json();
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    return averageRating;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const save_favorite_recipe = async (recipe) => {
  try {
    const recipeData = { recipeId: recipe.id };

    const response = await fetch(
      `http://localhost:3001/favorites?recipeId=${recipe.id}`
    );
    const existingFavorite = await response.json();

    if (existingFavorite.length > 0) {
      const deleteResponse = await fetch(
        `http://localhost:3001/favorites/${existingFavorite[0].id}`,
        {
          method: "DELETE",
        }
      );
    } else {
      const addResponse = await fetch("http://localhost:3001/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
    }
  } catch (error) {
    console.error("Ошибка при сохранении рецепта:", error);
    alert("Произошла ошибка, попробуйте позже.");
  }
};

const RecipeList = ({ title, recipes, onRecipeClick }) => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  let interval = null;

  const nextSlide = () => setIndex((prev) => (prev + 1) % totalPages);
  const prevSlide = () => setIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const startAutoNext = () => {
    interval = setInterval(() => nextSlide(), 300);
  };
  const stopAutoNext = () => clearInterval(interval);

  const [reviewCounts, setReviewCounts] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const counts = {};
      const ratings = {};
      for (const recipe of recipes) {
        ratings[recipe.id] = await fetchAverageRating(recipe.id);
        counts[recipe.id] = await fetchReviewsCount(recipe.id);
      }
      setAverageRatings(ratings);
      setReviewCounts(counts);
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:3001/favorites`);
        const favoritesData = await response.json();
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Ошибка загрузки избранных рецептов:", error);
      }
    };

    fetchAllReviews();
    fetchFavorites();
  }, [recipes]);

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.recipeId === recipeId);
  };

  const handleFavoriteClick = (recipe, e, button) => {
    const svg = button.querySelector("svg");
    if (!svg) return;

    const isFilled = svg.classList.contains("heart-filled");

    if (isFilled) {
      svg.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
      save_favorite_recipe(recipe);
    } else {
      svg.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart heart-filled"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
      save_favorite_recipe(recipe);
    }

    e.stopPropagation();
  };

  return (
    <div className="recipe-section">
      <h2 className="section-title">{title}</h2>
      <div className="slider-container">
        <button className="nav-button" onClick={prevSlide} style={{ visibility: index === 0 ? "hidden" : "visible" }}>
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="recipe-list">
          {recipes.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage).map((recipe, idx) => (
            <div key={recipe.id || idx} className="recipe-card" onClick={() => onRecipeClick(recipe)}>
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="recipe-image" 
                style={{ width: "190px", height: "150px", objectFit: "cover" }} 
              />
              <span className="reviews">
                {(averageRatings[recipe.id] || 0).toFixed(1)}⭐ ({reviewCounts[recipe.id] || 0})
              </span>
              <button
                className="favorite-button"
                onClick={(e) => handleFavoriteClick(recipe, e, e.currentTarget)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill={isFavorite(recipe.id) ? "white" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart-icon lucide-heart">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </button>
              <div className="recipe-info">
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-category">{recipe.category}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="nav-button"
          onMouseDown={startAutoNext}
          onMouseUp={stopAutoNext}
          onMouseLeave={stopAutoNext}
          onClick={nextSlide}
          style={{ visibility: index === totalPages - 1 ? "hidden" : "visible" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}></span>
        ))}
      </div>
    </div>
  );
};


  
  

const fetchReviews = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3001/reviews?recipeId=${recipeId}`);
      if (!response.ok) throw new Error("Ошибка загрузки отзывов");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const postReview = async (reviewData) => {
    try {
      const response = await fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error("Ошибка добавления отзыва");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  const Modal = ({ recipe, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [newReview, setNewReview] = useState("");

    

  
    useEffect(() => {
      fetchReviews(recipe.id).then(setReviews);
    }, [recipe.id]);
  
    const handleReviewSubmit = async () => {
      if (newReview.trim() === "") return;
      const newReviewData = await postReview({ 
        recipeId: recipe.id, 
        text: newReview, 
        rating: selectedRating 
      });
      if (newReviewData) {
        setReviews([...reviews, newReviewData]);
        setNewReview("");
        setSelectedRating(null); 
      }
    };

    const getRatingClass = (rating) => {
      if (rating <= 4) return "red";
      if (rating <= 6) return "gray";
      return "green";
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-left">
          <div className="modal-image">
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <div className="modal-review-and-category" style={{ position: 'relative'}}>
        <iframe
          src="https://www.youtube.com/embed/10_RpjZMX4c"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
          </div>
          <div className="modal-info">
            <h2>{recipe.title}</h2>
            <p className="recipe-description" dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
          </div>

          <div className="review-section">
            <textarea
              type="text" 
              value={newReview} 
              onChange={(e) => setNewReview(e.target.value)} 
              placeholder="Оставьте отзыв..." 
            />
          <div className="rating-buttons">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i + 1}
                className={`rating-button ${getRatingClass(i + 1)}`}
                onClick={() => setSelectedRating(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
            <button onClick={handleReviewSubmit}>Добавить</button>
          </div>
          <div className="modal-reviews">
  {reviews.length > 0 ? (
    reviews.map((review, index) => (
      <div key={index} className="review-container">
        <p>{review.text}</p>
        <p>{review.rating}</p>
      </div>
    ))
  ) : (
    <p>Пока нет отзывов</p>
  )}
</div>
          <button className="modal-close" onClick={onClose}>x</button>
        </div>
      </div>
    );
  };

  const Recipe = () => {
    const [allReceipt, setAllReceipt] = useState([]);
    const [newRecipe, setNewRecipe] = useState([]);
    const [newPopularRecipe, setNewPopularRecipe] = useState([]);
    const [popularRecipe, setPopularRecipe] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const allReceiptResponse = await fetch("http://localhost:3001/all_receipt");
          const newRecipeResponse = await fetch("http://localhost:3001/new_recipe");
          const newPopularRecipeResponse = await fetch("http://localhost:3001/new_popular_recipe");
          const popularRecipeResponse = await fetch("http://localhost:3001/popular_recipe");
  
          const allReceiptData = await allReceiptResponse.json();
          const newRecipeData = await newRecipeResponse.json();
          const newPopularRecipeData = await newPopularRecipeResponse.json();
          const popularRecipeData = await popularRecipeResponse.json();
  
          setAllReceipt(allReceiptData);
          setNewRecipe(newRecipeData);
          setNewPopularRecipe(newPopularRecipeData);
          setPopularRecipe(popularRecipeData);
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      };
  
      fetchData();
    }, []);

    return (
      <div className="container">
        <h3>Все рецепты</h3>
        <RecipeList recipes={allReceipt} onRecipeClick={setSelectedRecipe} />
        <h3>Новые рецепты</h3>
        <RecipeList recipes={newRecipe} onRecipeClick={setSelectedRecipe} />
        <h3>Рецепты по отзывам</h3>
        <RecipeList recipes={newPopularRecipe} onRecipeClick={setSelectedRecipe} />
        <h3>Рецепты по оценкам</h3>
        <RecipeList recipes={popularRecipe} onRecipeClick={setSelectedRecipe} />
        {selectedRecipe && <Modal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      </div>
    );
  };

export default Recipe;