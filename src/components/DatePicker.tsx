import classNames from 'classnames';
import React, { useContext, useState, useId } from 'react';
import { useTransition, animated } from 'react-spring';
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
    showDatePicker,
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

  const transition = useTransition(showDatePicker, {
    from: { opacity: 0, transform: 'translateY(-50px)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0 },
    config: {
      duration: 100,
    },
  });

  return (
    transition((style, item) => (
      item ? (
        <animated.div style={{ ...style, position: 'relative', zIndex: 2, }}>
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
        </animated.div>) : null
    ))
  );
};
