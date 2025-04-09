import React from 'react';
import '../styles/Reviews.css';

const reviews = [
  {
    id: 1,
    name: 'Сергей Сивохо',
    text: 'Продукция всегда на высоте. Мы сотрудничаем уже более пяти лет, и каждый заказ выполняется качественно и вовремя.',
    speciality: 'Петропавловское',
    image: '/images/Reviews/Сергей_Сивохо.jpg'
  },
  {
    id: 2,
    name: 'Алия Назарбаева',
    text: 'Качество на первом месте, всем рекомендую. Особенно радует индивидуальный подход и своевременная доставка.',
    speciality: 'Рахат',
    image: '/images/Reviews/Алия_Нарзабаева.jpeg'
  },
  {
    id: 3,
    name: 'Дарина Шмидт',
    text: 'Отличное сотрудничество! Всегда довольны результатом — продукция свежая, вкусная, идеально подходит нашим стандартам.',
    speciality: 'Жеміс',
    image: '/images/Reviews/Дарина_Щмидт.webp'
  },
  {
    id: 4,
    name: 'Светлана Ройз',
    text: 'Очень довольны сотрудничеством. Продукция всегда свежая, качественная, а обслуживание на высоком уровне.',
    speciality: 'Казмолпродукт',
    image: '/images/Reviews/Светлана_Ройз.webp'
  },
  {
    id: 5,
    name: 'Гульнару Оспанова',
    text: 'Работаем с ними много лет. Надёжный поставщик, всегда придерживается сроков и предлагает отличное качество.',
    speciality: 'Алтын Алма',
    image: '/images/Reviews/Гульнару_Оспанова.jpg'
  },
  {
    id: 6,
    name: 'Ирина Аллегрова',
    text: 'Очень хорошая компания! Продукция отвечает всем современным требованиям, приятно работать с профессионалами.',
    speciality: 'Казмолпродукт',
    image: '/images/Reviews/Ирина_Аллегрова.jpg'
  },
  {
    id: 7,
    name: 'Тимур Бекмамбетов',
    text: 'Сотрудничаем не первый год. Всегда на высоте, оперативно реагируют на запросы и доставляют качественные продукты.',
    speciality: 'Алма-Инвест',
    image: '/images/Reviews/Тимур_Бекмамбетов.webp'
  },
  {
    id: 8,
    name: 'Елена Блиновская',
    text: 'Прекрасное качество, отличное обслуживание, разумные цены. Полностью довольны нашим сотрудничеством.',
    speciality: 'Гормолзавод',
    image: '/images/Reviews/Елена_Блиновская.webp'
  },
  {
    id: 9,
    name: 'Алена Шишкова',
    text: 'Никогда не разочаровываемся. Продукция всегда поступает вовремя, свежая, с полным пакетом документов.',
    speciality: 'Палитра вкусов',
    image: '/images/Reviews/Алена_Шишкова.jpg'
  },
  {
    id: 10,
    name: 'Алина Кабаева',
    text: 'Работаем с ними уже много лет. Продукция всегда отличная, соответствующая заявленным стандартам качества.',
    speciality: 'Каримовские продукты',
    image: '/images/Reviews/Алина_Кабаева.jpeg'
  }
];


const Reviews = () => {
  const duplicatedReviews = [...reviews, ...reviews]; // дублируем

  return (
    <div className="reviews-container">
      <div className="section-header">
        <h2>Отзывы</h2>
        <p>Это помогает пользователям ознакомиться с множеством мнений о продуктах и услугах, <br /> что способствует формированию доверия и пониманию качества предложения</p>
      </div>
      <div className="reviews-track">
        <div className="reviews-content">
          {duplicatedReviews.map((review, index) => (
            <div className="review" key={index}>
              <img src={review.image} className="review-image" />
              <div className="review-text">
                <h3>{review.name}</h3>
                <h4>{review.speciality}</h4>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
