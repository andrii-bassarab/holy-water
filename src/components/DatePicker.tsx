/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { CalendarContext } from './CalendarContext';

export const DatePicker = () => {
  const {
    months,
    currYear,
    currMonth,
    setCurrMonth,
    setCurrYear,
    monthText,
    year,
    month: todayMonth,
    setShowDatePicker,
  } = useContext(CalendarContext);

  const [electYear, setElectYear] = useState(currYear);

  const currDate = new Date().toDateString().slice(0, 15);

  return (
    <div
      className="date-picker"
    >
      <p className="date-picker__description">
        {'Current date: '}
        <button
          className="date-picker__current-date"
          onClick={() => {
            setElectYear(Number(year));
            setCurrYear(Number(year));
            localStorage.setItem('year', String(year));
            setCurrMonth(Number(todayMonth));
            localStorage.setItem('month', String(currMonth));
            setShowDatePicker(false);
          }}
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
              className={classNames('date-picker__month', {
                'date-picker__month--active': monthText === month
                  && currYear === electYear,
              })}
              onClick={() => {
                setCurrMonth(months.indexOf(month) + 1);
                localStorage.setItem('month', String(currMonth));
                setCurrYear(electYear);
                localStorage.setItem('year', String(electYear));
                setShowDatePicker(false);
              }}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
