import React, { useState, useRef, useEffect } from 'react';
import './slider.scss';

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
                <button>SEE MORE</button>
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
      <div className="arrowButtons">
        <button className="prev" onClick={() => moveSlider('prev')}>{'<'}</button>
        <button className="next" onClick={() => moveSlider('next')}>{'>'}</button>
      </div>
    </div>
  );
};

export default Slider;
