/* eslint-disable react/button-has-type */
import { useContext, useEffect } from 'react';
import { CalendarContext } from './CalendarContext';
import calendarImg from '../image/calendar-image.svg';
import rightArrow from '../image/right-arrow.svg';
import leftArrow from '../image/left-arrow.svg';

export const NavBar = () => {
  const {
    setCurrYear,
    setCurrMonth,
    monthText,
    currYear,
    currMonth,
    setShowDatePicker,
    setShowEventForm,
    setEditForm,
  } = useContext(CalendarContext);

  const leftErrowClick = () => {
    setCurrMonth(prevMonth => (
      prevMonth - 1 > 0 ? prevMonth - 1 : 12));
    setCurrYear((prevYear => (
      currMonth === 1 ? prevYear - 1 : prevYear
    )));
    setShowDatePicker(false);
  };

  const rightErrowClick = () => {
    setCurrMonth(prevMonth => (prevMonth + 1) % 13 || 1);
    localStorage.setItem('month', String(currMonth));
    setCurrYear((prevYear => (
      currMonth === 12 ? prevYear + 1 : prevYear
    )));
    setShowDatePicker(false);
  };

  useEffect(() => {
    localStorage.setItem('year', String(currYear));
    localStorage.setItem('month', String(currMonth));
  }, [currMonth, currYear]);

  return (
    <div className="calendar__header">
      <button
        className="calendar__add-event"
        onClick={() => {
          setShowEventForm(prevState => !prevState);
          setShowDatePicker(false);
          setEditForm(false);
        }}
      >
        +
      </button>
      <div className="calendar__setting">
        <div className="calendar__month">
          <button
            className="calendar__month__swiper"
            onClick={leftErrowClick}
          >
            <img
              src={leftArrow}
              alt="leftArrow"
              className="calendar__month__swiper--img"
            />
          </button>
          <p className="calendar__month__text">{`${monthText} ${currYear}`}</p>
          <button
            className="calendar__month__swiper"
            onClick={rightErrowClick}
          >
            <img
              src={rightArrow}
              alt="rightArrow"
              className="calendar__month__swiper--img"
            />
          </button>
        </div>
        <button
          className="calendar__year"
          onClick={(event) => {
            event.stopPropagation();
            setShowDatePicker(prevState => !prevState);
          }}
        >
          <img
            className="calendar__year__image"
            src={calendarImg}
            alt="year"
          />
        </button>
      </div>
    </div>
  );
};
