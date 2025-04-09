import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "../styles/FAQ.css";

const faqs = [
  { question: "Как отметить рецепт как любимый?", answer: "Нажмите на кнопку с сердечком рядом с рецептом, чтобы добавить его в раздел 'Любимые'." },
  { question: "Как оставить отзыв о рецепте?", answer: "Для оставления отзыва прокрутите страницу рецепта вниз и используйте форму 'Оставить отзыв'." },
  { question: "Что делать, если не могу найти нужный рецепт?", answer: "Вы можете оставить запрос через форму 'Обратной связи'." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-container">
      <div className="faq-box">
        <h2 className="faq-title">Часто задаваемые вопросы</h2>
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <ChevronDown
                  className={`faq-icon ${openIndex === index ? "rotate" : ""}`}
                />
              </button>
              {openIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
