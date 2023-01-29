/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import calendarImg from './image/calendar-image.svg';
import { CalendarContext } from './components/CalendarContext';
import { DatePicker } from './components/DatePicker';
import { EventForm } from './components/EventForm';
import { CellDay } from './components/CellDay';

function App() {
  const {
    setCurrYear,
    setCurrMonth,
    monthText,
    currYear,
    currMonth,
    days,
    showDatePicker,
    setShowDatePicker,
    showEventForm,
    setShowEventForm,
    setEditForm,
  } = useContext(CalendarContext);

  function getDaysInMonth(monthToCreate: number, yearToCreate: number) {
    const date = new Date(yearToCreate, monthToCreate, 1);
    const firstDay = date.toDateString().split(' ')[0].slice(0, 2);
    const daysArr = [];
    const daysToAdd = days.indexOf(firstDay) - 1;

    while (date.getMonth() === monthToCreate) {
      const fullDate = new Date(date).toDateString();
      const dayInMonth = fullDate.split(' ')[2];
      const dayInWeek = fullDate.split(' ')[0].slice(0, 2);

      daysArr.push({
        key: fullDate,
        dayInMonth,
        dayInWeek,
        active: true,
      });
      date.setDate(date.getDate() + 1);
    }

    for (let i = 0; i >= -daysToAdd; i -= 1) {
      const dateToUnshift = new Date(yearToCreate, monthToCreate, 1);

      dateToUnshift.setDate(i);
      const fullDate = dateToUnshift.toDateString();
      const dayInMonth = fullDate.split(' ')[2];
      const dayInWeek = fullDate.split(' ')[0].slice(0, 2);

      daysArr.unshift({
        key: fullDate,
        dayInMonth,
        dayInWeek,
        active: false,
      });
    }

    if (daysArr.length > 35) {
      const daysToPush = 42 - daysArr.length;

      for (let i = 0; i < daysToPush; i += 1) {
        const fullDate = new Date(date).toDateString();
        const dayInMonth = fullDate.split(' ')[2];
        const dayInWeek = fullDate.split(' ')[0].slice(0, 2);

        daysArr.push({
          key: fullDate,
          dayInMonth,
          dayInWeek,
          active: false,
        });
        date.setDate(date.getDate() + 1);
      }
    } else {
      const daysToPush = 35 - daysArr.length;

      for (let i = 0; i < daysToPush; i += 1) {
        const fullDate = new Date(date).toDateString();
        const dayInMonth = fullDate.split(' ')[2];
        const dayInWeek = fullDate.split(' ')[0].slice(0, 2);

        daysArr.push({
          key: fullDate,
          dayInMonth,
          dayInWeek,
          active: false,
        });
        date.setDate(date.getDate() + 1);
      }
    }

    return daysArr;
  }

  const [calendar, setCalendar] = useState(
    getDaysInMonth(Number(currMonth) - 1, Number(currYear)),
  );

  useEffect(() => {
    setCalendar(getDaysInMonth(Number(currMonth) - 1, Number(currYear)));
  }, [currMonth, currYear]);

  return (
    <section className="calendar">
      <div className="calendar__container">
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
                onClick={() => {
                  setCurrMonth(prevMonth => (
                    prevMonth - 1 > 0 ? prevMonth - 1 : 12));
                  setCurrYear((prevYear => (
                    currMonth === 1 ? prevYear - 1 : prevYear
                  )));
                  localStorage.setItem('year', String(currYear));
                  localStorage.setItem('month', String(currMonth));
                  setShowDatePicker(false);
                }}
              >
                &#60;
              </button>
              <p className="calendar__month__text">{`${monthText} ${currYear}`}</p>
              <button
                className="calendar__month__swiper"
                onClick={() => {
                  setCurrMonth(prevMonth => (prevMonth + 1) % 13 || 1);
                  localStorage.setItem('month', String(currMonth));
                  setCurrYear((prevYear => (
                    currMonth === 12 ? prevYear + 1 : prevYear
                  )));
                  localStorage.setItem('year', String(currYear));
                  setShowDatePicker(false);
                }}
              >
                &#62;
              </button>
            </div>
            <button
              className="calendar__year"
              onClick={() => setShowDatePicker(prevState => !prevState)}
            >
              <img
                className="calendar__year__image"
                src={calendarImg}
                alt="year"
              />
            </button>
          </div>
        </div>
        <div className="calendar__layout">
          {showDatePicker && <DatePicker />}
          {showEventForm && <EventForm />}
          {calendar.map(dayCell => (
            <CellDay cell={dayCell} key={dayCell.key} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
