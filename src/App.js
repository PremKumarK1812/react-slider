import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import professionals from './data';
import css from './index.css';

const App = () => {
  const [users, setUsers] = useState(professionals);
  const [index, setIndex] = useState(0);

  const prevUserHandler = () => {
    const lastIndex = users.length - 1;
    if (index === 0) {
      setIndex(lastIndex);
    } else {
      setIndex((index) => index - 1);
    }
  };

  const nextUserHandler = () => {
    const lastIndex = users.length - 1;
    if (index === lastIndex) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
  };

  useEffect(() => {
    const changeSlide = setInterval(() => {
      const lastIndex = users.length - 1;
      if (index === lastIndex) {
        setIndex(0);
      } else {
        setIndex((index) => index + 1);
      }
    }, 5000);
    return () => clearInterval(changeSlide);
  });

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>About Me
        </h2>
      </div>
      <div className='section-center'>
        {users.map((user, position) => {
          const { id, image, name, title, quote } = user;
          let placement = 'nextSlide';
          if (position === index) {
            placement = 'activeSlide';
          } else if (
            position === index - 1 ||
            (index === 0 && position === professionals.length - 1)
          ) {
            placement = 'previousSlide';
          }

          return (
            <article key={id} className={placement}>
              <img src={image} alt={name} className='person-image' />
              <h4 className='person-name'>{name.toUpperCase()}</h4>
              <p className='role'>{title}</p>
              <p className='description'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
        <button className='previous-button' onClick={prevUserHandler}>
          <FiChevronLeft />
        </button>
        <button className='next-button' onClick={nextUserHandler}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default App;
