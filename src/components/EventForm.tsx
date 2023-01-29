/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import titleImage from '../image/passport.svg';
import { CalendarContext } from './CalendarContext';
import deleteImage from '../image/delete.svg';
import { DateInputError } from './DateInputError';

export const EventForm = () => {
  const {
    showEventForm,
    eventDays,
    setShowEventForm,
    saveEventDays,
    editForm,
    propsToEdit,
    setEditForm,
    setPropsToEdit,
    setEventDays,
  } = useContext(CalendarContext);

  const [dateError, setDateError] = useState(false);
  const [disabletSubmit, setDisabletSubmit] = useState(!editForm);
  const [date, setDate] = useState(editForm
    ? propsToEdit?.date || ''
    : '');
  const [title, setTitle] = useState(editForm
    ? propsToEdit?.title
    : '');
  const [description, setDescription] = useState(editForm
    ? propsToEdit?.description
    : '');
  const [time, setTime] = useState(editForm
    ? propsToEdit?.time
    : '');

  const inputChange = (
    event: React.ChangeEvent<HTMLInputElement>, prevLength: number,
  ) => {
    const query = event.target.value;
    let stringDate = '';

    if ((isNaN(+query[query.length - 1]) && prevLength < query.length)
      || query[query.length - 1] === ' ') {
      setDateError(true);

      return;
    }

    if (query[0] > '3' || (query[0] === '3' && query[1] > '1')) {
      setDateError(true);

      return;
    }

    if (query[0] === '0' && query[1] === '0') {
      setDateError(true);

      return;
    }

    if (query[3] > '1' || (query[3] === '1' && query[4] > '2')) {
      setDateError(true);

      return;
    }

    if (query[3] === '0' && query[4] === '0') {
      setDateError(true);

      return;
    }

    for (let i = 0; i < query.length; i += 1) {
      stringDate += query[i];

      if ((i === 1 && prevLength < query.length)
        && (!query[2] || (query[2] && query[2] !== '.'))) {
        stringDate += '.';
      }

      if ((i === 4 && prevLength < query.length)
        && (!query[5] || (query[5] && query[5] !== '.'))) {
        stringDate += '.';
      }
    }

    stringDate = stringDate.slice(0, 10);

    setDate(stringDate);
  };

  const closeOnEscapeKeyDown = (event: KeyboardEvent) => {
    if ((event.charCode || event.keyCode) === 27) {
      setShowEventForm(false);
      setEditForm(false);
      setPropsToEdit(null);
    }
  };

  const getLocalDate = (localDate: Date) => {
    let result = '';

    if (localDate.toLocaleDateString('de-DE')
      .split('.')[1].length < 2) {
      result += localDate.toLocaleDateString('de-DE')
        .split('.')[0];
      result += `.0${localDate.toLocaleDateString('de-DE')
        .split('.')[1]}`;
      result += `.${localDate.toLocaleDateString('de-DE')
        .split('.')[2]}`;
    } else {
      result = localDate.toLocaleDateString('de-DE');
    }

    result += ` ${localDate.getHours()}:${localDate.getMinutes()}`;

    return result;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editForm) {
      if (propsToEdit?.createdAt && title && date) {
        const currTime = new Date();

        const updatedAt = getLocalDate(currTime);

        saveEventDays({
          id: propsToEdit.id,
          date,
          title,
          description,
          time,
          createdAt: propsToEdit?.createdAt,
          updatedAt,
        });
      }
    } else if (title && date) {
      const id = eventDays.length
        ? Math.max(...eventDays.map(item => item.id)) + 1
        : 1;

      const currTime = new Date();

      const createdAt = getLocalDate(currTime);

      saveEventDays({
        id,
        date,
        title,
        description,
        time,
        createdAt,
      });
    }

    setShowEventForm(false);
    setEditForm(false);
    setPropsToEdit(null);
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);

    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    if (date.length < 10) {
      setDisabletSubmit(true);
    }

    if (date.length >= 10) {
      setDisabletSubmit(false);
    }

    setDateError(false);
  }, [date.length]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={showEventForm}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div
        className="add-event"
        onClick={() => setShowEventForm(false)}
      >
        <div className="add-event__content">
          <form
            className="event-form"
            onClick={event => event.stopPropagation()}
            onSubmit={onSubmit}
          >
            <div className="event-form__content">
              <div className="event-form__header">
                <div className="event-form__legend">
                  <p className="event-form__name">
                    {editForm
                      ? 'Edit idea item'
                      : 'Add new idea form'}
                  </p>
                  <button
                    className="event-form__close"
                    type="button"
                    onClick={() => setShowEventForm(false)}
                  >
                    &#10005;
                  </button>
                </div>
                {editForm && (
                  <p className="event-form__created">
                    {`Created at: ${propsToEdit?.createdAt}`}
                  </p>
                )}
              </div>
              <div className="event-form__add">
                <label
                  className="event-form__title-box"
                >
                  Title*
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Add your title"
                    className="event-form__title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <img
                    src={titleImage}
                    alt="passport"
                    className="event-form__title-image"
                  />
                </label>
                <label
                  className="event-form__description-box"
                >
                  Description
                  <textarea
                    name="description"
                    className="event-form__description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                  />
                </label>
                <div className="event-form__time">
                  <label
                    className="event-form__date-box"
                    onClick={(event) => event.preventDefault()}
                  >
                    Date
                    <button
                      type="button"
                      onClick={() => setDate(
                        getLocalDate(new Date()).slice(0, 10),
                      )}
                      className="event-form__date__today"
                    >
                      today
                    </button>
                    <input
                      onChange={(event) => inputChange(event, date.length)}
                      value={date}
                      type="text"
                      className="event-form__date"
                      name="date"
                      placeholder="DD.MM.YY"
                      required
                    />
                    {dateError && (
                      <DateInputError
                        clearErrorMessage={() => setDateError(false)}
                      />
                    )}
                  </label>
                  <label
                    className="event-form__hour-box"
                  >
                    Begin time
                    <input
                      type="time"
                      className="event-form__hour"
                      name="time"
                      value={time}
                      onChange={event => setTime(event.target.value)}
                    />
                  </label>
                </div>
                <div className="event-form__save-box">
                  {editForm && (
                    <button
                      type="button"
                      className="event-form__delete"
                      onClick={() => {
                        const newEvents = eventDays
                          .filter(event => {
                            return event.id !== propsToEdit?.id;
                          });

                        setEventDays(newEvents);

                        localStorage.setItem('event',
                          JSON.stringify([...newEvents]));

                        setEditForm(false);
                        setShowEventForm(false);
                      }}
                    >
                      <img
                        src={deleteImage}
                        alt="delete"
                        className="event-form__delete-image"
                      />
                    </button>
                  )}
                  <button
                    className={classNames('event-form__save', {
                      'event-form__save--active': editForm,
                    })}
                    disabled={disabletSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root') as Element | DocumentFragment,
  );
};
