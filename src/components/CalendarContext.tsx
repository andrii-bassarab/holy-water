import React, { useState } from 'react';
import { EventDays } from '../types/EventDays';

type Props = {
  children: React.ReactNode;
};

interface CalendarContextInterface {
  propsToEdit: EventDays | null,
  setPropsToEdit: React.Dispatch<React.SetStateAction<EventDays | null>>,
  saveEventDays: (event: EventDays) => void,
  eventDays: EventDays[],
  setEventDays: React.Dispatch<React.SetStateAction<EventDays[]>>,
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>,
  showDatePicker: boolean,
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>,
  editForm: boolean,
  setShowEventForm: React.Dispatch<React.SetStateAction<boolean>>,
  showEventForm: boolean,
  setCurrYear: React.Dispatch<React.SetStateAction<number>>,
  setCurrMonth: React.Dispatch<React.SetStateAction<number>>,
  monthText: string,
  currYear: number,
  currMonth: number,
  day: string,
  days: string[],
  months: string[],
  month: string,
  year: string,
}

export const CalendarContext = React.createContext<CalendarContextInterface>({
  propsToEdit: null,
  setPropsToEdit: () => { },
  saveEventDays: () => { },
  eventDays: [],
  setEventDays: () => {},
  setShowDatePicker: () => { },
  showDatePicker: false,
  setEditForm: () => { },
  editForm: false,
  setShowEventForm: () => { },
  showEventForm: false,
  setCurrYear: () => { },
  setCurrMonth: () => { },
  monthText: '',
  currYear: 0,
  currMonth: 0,
  day: '',
  year: '',
  days: [],
  month: '',
  months: [],
});

export const CalendarProvider: React.FC<Props> = ({ children }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const [day, month, year] = new Date().toLocaleDateString().split('.');

  const [eventDays, setEventDays] = useState<EventDays[]>(
    JSON.parse((localStorage.getItem('event') || '[]')),
  );

  const saveEventDays = (event: EventDays) => {
    if (eventDays.some(eventToCheck => eventToCheck.id === event.id)) {
      const filteredEvents = eventDays
        .filter(eventToCheck => eventToCheck.id !== event.id);

      const newEvents = [...filteredEvents, event];

      setEventDays(newEvents);

      localStorage.setItem('event', JSON.stringify(newEvents));

      return;
    }

    const newEvents = [...eventDays, event];

    setEventDays(newEvents);

    localStorage.setItem('event', JSON.stringify(newEvents));
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [currYear, setCurrYear] = useState(
    Number(localStorage.getItem('year')) || Number(year),
  );
  const [currMonth, setCurrMonth] = useState(
    Number(localStorage.getItem('month')) || Number(month),
  );
  const monthText = months[currMonth - 1];
  const [propsToEdit, setPropsToEdit] = useState<EventDays | null>(null);

  const contextValue = {
    propsToEdit,
    setPropsToEdit,
    saveEventDays,
    eventDays,
    setEventDays,
    showDatePicker,
    setShowDatePicker,
    showEventForm,
    setShowEventForm,
    editForm,
    setEditForm,
    setCurrYear,
    setCurrMonth,
    monthText,
    currYear,
    currMonth,
    day,
    days,
    month,
    months,
    year,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
