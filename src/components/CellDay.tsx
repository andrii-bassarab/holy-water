/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { useContext } from 'react';
import { CalendarItem } from '../types/CalendarItem';
import { CalendarContext } from './CalendarContext';

type Props = {
  cell: CalendarItem,
};

export const CellDay: React.FC<Props> = ({ cell }) => {
  const {
    eventDays,
    months,
    setEditForm,
    setShowEventForm,
    setPropsToEdit,
  } = useContext(CalendarContext);

  const events = eventDays.filter(event => (
    event.date.slice(0, 2) === cell.key.slice(8, 10)
    && Number(event.date.slice(3, 5)) === months.findIndex(
      month => month.includes(cell.key.slice(4, 7)),
    ) + 1
    && event.date.slice(-4) === cell.key.slice(-4)
  ));

  return (
    <div className="calendar__item">
      <div
        className={classNames('calendar__day', {
          'calendar__day--current': cell.active,
          'calendar__day--active': cell.active
            && new Date().toDateString() === cell.key,
        })}
      >
        <div className="calendar__day-info">
          <div className="calendar__dayInMonth">{cell.dayInMonth}</div>
          <div className="calendar__dayInWeek">{cell.dayInWeek}</div>
        </div>

        {eventDays.length > 0 && (
          events.map(event => (
            <button
              key={event.id}
              className="calendar__day-title"
              onClick={() => {
                setShowEventForm(true);
                setEditForm(true);
                setPropsToEdit(event);
              }}
            >
              {event.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
