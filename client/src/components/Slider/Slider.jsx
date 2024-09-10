import React, { useState, useRef, useEffect } from 'react';
import './slider.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import ButtonSlide from '../../components/ButtonSlide/ButtonSlide.jsx';
const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    // Fetch slides data from JSON file
    const fetchSlides = async () => {
      try {
        const response = await fetch('./slides.json');
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error('Error fetching slides data:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const handleAnimationEnd = () => {
      slider.classList.remove('next', 'prev');
    };

    slider.addEventListener('animationend', handleAnimationEnd);
    return () => slider.removeEventListener('animationend', handleAnimationEnd);
  }, []);

  const moveSlider = (direction) => {
    const slider = sliderRef.current;
    const sliderList = listRef.current;
    const thumbnail = thumbnailRef.current;
    const sliderItems = Array.from(sliderList.children);
    const thumbnailItems = Array.from(thumbnail.children);

    const updateSlide = (newIndex) => {
      setCurrentSlide((prevSlide) => (prevSlide + newIndex + sliderItems.length) % sliderItems.length);
    };

    if (direction === 'next') {
      sliderList.appendChild(sliderItems[0]);
      thumbnail.appendChild(thumbnailItems[0]);
      slider.classList.add('next');
      updateSlide(1);
    } else if (direction === 'prev') {
      sliderList.prepend(sliderItems[sliderItems.length - 1]);
      thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
      slider.classList.add('prev');
      updateSlide(-1);
    }
  };

  return (
    <div className="slider relative w-full h-screen overflow-hidden mt-0" ref={sliderRef}>
      <div className="list" ref={listRef}>
        {slides.map((slide) => (
          <div className="item" key={slide.id}>
            <img src={slide.image} alt={slide.type} />
            <div className="content">
              <div className="title">{slide.title}</div>
              <div className="type">{slide.type}</div>
              <div className="description">{slide.description}</div>
              <div className="button">
                <Link
                  to='/search'
                >
                  <button className=''>Ver publicaciones</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="thumbnail" ref={thumbnailRef}>
        {slides.map((slide) => (
          <div className="item" key={slide.id}>
            <img src={slide.image} alt={slide.type} />
          </div>
        ))}
      </div>

      <div className="arrowButtons thumbnail ">
        <button className="next" onClick={() => moveSlider('next')}>
          <div className="button-box">
            <span className="button-elem">
              <svg viewBox="0 0 46 40">
                <path
                  d="M0 20.038c0 .7.3 1.5.8 2.1l16 17c1.1 1 3.2 1.4 4.4.3 1.2-1.1 1.2-3.3 0-4.4l-11.3-11.9H43c1.7 0 3-1.3 3-3s-1.3-3-3-3H9.9l11.3-11.9c1-1 1.2-3.3 0-4.4-1.2-1.1-3.3-.8-4.4.3l-16 17c-.5.5-.8 1.1-.8 1.9z"
                ></path>
              </svg>
            </span>
          </div>
        </button>
        <button className="prev" onClick={() => moveSlider('prev')}>
          <div className="button-box">
            <span className="button-elem-2">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
          </div>
        </button>


      </div>
    </div>
  );
};

export default Slider;
