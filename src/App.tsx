import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import { CalendarContext } from './components/CalendarContext';
import { DatePicker } from './components/DatePicker';
import { EventForm } from './components/EventForm';
import { CellDay } from './components/CellDay';
import { NavBar } from './components/NavBar';

function App() {
  const {
    currYear,
    currMonth,
    days,
    showDatePicker,
    showEventForm,
    setShowDatePicker,
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
    <main
      onClick={() => setShowDatePicker(false)}
    >
      <section
        className="calendar"
      >
        <div className="calendar__container">
          <NavBar />
          <DatePicker />
          <EventForm />
          <div className="calendar__layout">
            {calendar.map(dayCell => (
              <CellDay cell={dayCell} key={dayCell.key} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
