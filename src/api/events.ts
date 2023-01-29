import { EventDays } from '../types/EventDays';
import { client } from '../utils/fetch';

export const getEvents = () => {
  return client.get<EventDays[]>('');
};

export const createEvents = async (
  id: number,
  date: string,
  title: string,
  createdAt: string,
  description?: string,
  time?: string,
  updatedAt?: string,
) => {
  const newTodo = await client.post<EventDays>('', {
    id,
    date,
    title,
    description,
    time,
    createdAt,
    updatedAt,
  });

  return newTodo;
};

export const removeEvent = (
  id: number,
) => {
  return client.delete(`/${id}`);
};

export const updateEvent = async (
  id: number,
  date: string,
  title: string,
  createdAt: string,
  description?: string,
  time?: string,
  updatedAt?: string,
) => {
  const newTodo = await client.patch<EventDays>(`/${id}`, {
    date,
    title,
    description,
    time,
    createdAt,
    updatedAt,
  });

  return newTodo;
};
