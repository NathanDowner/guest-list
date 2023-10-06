import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGuest, selectList } from '../store/guestListSlice';
import { Guest } from '../models/guest.interface';
import { createUUID } from '../utils';
import { Droppable } from 'react-beautiful-dnd';
import GuestCard from './GuestCard';

interface GuestListProps {
  name?: string;
}

const GuestList = ({ name = '' }: GuestListProps) => {
  const [newName, setNewName] = useState('');

  const dispatch = useAppDispatch();
  const selectNamedList = selectList(name);
  const guestList = useAppSelector(selectNamedList);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGuest: Guest = { name: newName, id: createUUID() };
    dispatch(addGuest({ listName: name, guest: newGuest }));
    setNewName('');
  };

  const droppableId = name || 'finalList';

  return (
    <div className="text-center last:text-right first:text-left">
      <header>
        <h2 className="">{name ? `${name}'s List` : 'Final List'}</h2>
      </header>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="border border-gray-300 rounded-md p-4"
          >
            {guestList.map((guest, index) => (
              <GuestCard key={guest.id} guest={guest} index={index} />
            ))}
            {provided.placeholder}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter a name.."
                className="border w-full rounded-md p-1"
              />
            </form>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default GuestList;
