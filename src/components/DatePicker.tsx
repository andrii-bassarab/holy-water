/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { CalendarContext } from './CalendarContext';

export const DatePicker = () => {
  const {
    months,
    currYear,
    setCurrMonth,
    setCurrYear,
    monthText,
    year,
    month: todayMonth,
    setShowDatePicker,
  } = useContext(CalendarContext);

  const [electYear, setElectYear] = useState(currYear);

  const currDate = new Date().toDateString().slice(0, 15);

  const choseCurrentDate = () => {
    setElectYear(Number(year));
    setCurrYear(Number(year));
    setCurrMonth(Number(todayMonth));
    setShowDatePicker(false);
  };

  const choseDate = (month: string) => {
    setCurrMonth(months.indexOf(month) + 1);
    setCurrYear(electYear);
    setShowDatePicker(false);
  };

  return (
    <div
      className="date-picker"
      onClick={event => event.stopPropagation()}
    >
      <p className="date-picker__description">
        {'Current date: '}
        <button
          className="date-picker__current-date"
          onClick={choseCurrentDate}
        >
          {currDate}
        </button>
      </p>
      <div className="date-picker__box">
        <div className="date-picker__year">
          <p className="date-picker__year-current">{electYear}</p>
          <div className="date-picker__year-swiper-box">
            <button
              className="date-picker__year-swiper"
              onClick={() => setElectYear(prevYear => prevYear + 1)}
            >
              &#8593;
            </button>
            <button
              className="date-picker__year-swiper"
              onClick={() => setElectYear(prevYear => prevYear - 1)}
            >
              &#8595;
            </button>
          </div>
        </div>
        <div className="date-picker__months">
          {months.map(month => (
            <button
              key={month}
              className={classNames('date-picker__month', {
                'date-picker__month--active': monthText === month
                  && currYear === electYear,
              })}
              onClick={() => choseDate(month)}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
