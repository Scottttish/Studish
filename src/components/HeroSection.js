import React, { useEffect } from "react";
import "../styles/HeroSection.css";


function HeroSection() {
  useEffect(() => {
    let last_scroll_position = 0;

    const scroll_changes = () => {
      let current_scroll_position = window.pageYOffset || document.documentElement.scrollTop;

      document.querySelectorAll('.ingredient-section').forEach((element, index) => {
        let translateValue = 0;
  
        if (current_scroll_position > last_scroll_position) {
          translateValue = (index + 1) * 15;  
          element.style.transform = `translateY(-${translateValue}px)`;
        } else {
          element.style.transform = `translateY(0)`;
        }
      });

      last_scroll_position = current_scroll_position <= 0 ? 0 : current_scroll_position;
    };

    window.addEventListener('scroll', scroll_changes);

    return () => {
      window.removeEventListener('scroll', scroll_changes);
    };
  }, []); 

  return (
    <div className="greeting-section">
      <div className="text-section">
        <h2>Пора готовить</h2>
        <h2>Вкусно прямо сейчас!</h2>
        <p>Собери своих друзей и близких, чтобы приготовить вкусные блюда вместе.<span>Свежие рецепты с простыми шагами, чтобы создать настоящие кулинарные шедевры!</span></p>

          <button className="view-recipe-button">Посмотреть все рецепты</button>

      </div>
      <div className="ingredient-section garlic">
  <img src="/images/HeroSection/garlic.png" className="ingredient" />
</div>
<div className="ingredient-section lettuce1">
  <img src="/images/HeroSection/lettuce_one.avif" className="ingredient" />
</div>
<div className="ingredient-section lettuce2">
  <img src="/images/HeroSection/lettuce_two.avif" className="ingredient" />
</div>
<div className="ingredient-section mushroom1">
  <img src="/images/HeroSection/mushroom_one.png" className="ingredient" />
</div>
<div className="ingredient-section mushroom2">
  <img src="/images/HeroSection/mushroom_two.png" className="ingredient" />
</div>
<div className="ingredient-section olive1">
  <img src="/images/HeroSection/olive_one.png" className="ingredient" />
</div>
<div className="ingredient-section olive2">
  <img src="/images/HeroSection/olive_two.png" className="ingredient" />
</div>
<div className="ingredient-section pepper">
  <img src="/images/HeroSection/pepper.avif" className="ingredient" />
</div>
<div className="ingredient-section tomato1">
  <img src="/images/HeroSection/tomato_one.png" className="ingredient" />
</div>
<div className="ingredient-section tomato2">
  <img src="/images/HeroSection/tomato_two.png" className="ingredient" />
</div>
      <img src="/images/HeroSection/rounded_boul.png" className="rounded_boul" />
    </div>
  );
}

export default HeroSection;
