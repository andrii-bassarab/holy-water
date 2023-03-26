import { useContext, useEffect } from 'react';
import { CalendarContext } from './CalendarContext';
import calendarImg from '../image/calendar-image.svg';
import rightArrow from '../image/right-arrow.svg';
import leftArrow from '../image/left-arrow.svg';
import styles from '../styles/NavBar.module.scss';

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
    setCurrYear((prevYear => (
      currMonth === 12 ? prevYear + 1 : prevYear
    )));
    setShowDatePicker(false);
  };

  useEffect(() => {
    if (currYear) {
      localStorage.setItem('year', JSON.stringify(currYear));
    }
    if (currMonth) {
      localStorage.setItem('month', JSON.stringify(currMonth));
    }
  }, [currMonth, currYear]);

  return (
    <div className={styles.calendar__header}>
      <button
        className={(styles['calendar__add-event'])}
        onClick={() => {
          setShowEventForm(prevState => !prevState);
          setShowDatePicker(false);
          setEditForm(false);
        }}
      >
        +
      </button>
      <div className={styles.calendar__setting}>
        <div className={styles.calendar__month}>
          <button
            className={styles.calendar__month__swiper}
            onClick={leftErrowClick}
          >
            <img
              src={leftArrow}
              alt="leftArrow"
              className={styles['calendar__month__swiper--img']}
            />
          </button>
          <p className={styles.calendar__month__text}>
            {`${monthText} ${currYear}`}
          </p>
          <button
            className={styles.calendar__month__swiper}
            onClick={rightErrowClick}
          >
            <img
              src={rightArrow}
              alt="rightArrow"
              className={styles['calendar__month__swiper--img']}
            />
          </button>
        </div>
        {/* <label className="checkbox">
          <input type="checkbox" />
          <span className="checkmark" />
          Checkbox Label
        </label> */}
        <button
          className={styles.calendar__year}
          onClick={(event) => {
            event.stopPropagation();
            setShowDatePicker(prevState => !prevState);
          }}
        >
          <img
            className={styles.calendar__year__image}
            src={calendarImg}
            alt="year"
          />
        </button>
      </div>
    </div>
  );
};
