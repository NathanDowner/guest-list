import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGuest, selectList } from '../store/guestListSlice';
import { Guest } from '../models/guest.interface';
import { createUUID } from '../utils';
import { Droppable } from 'react-beautiful-dnd';
import GuestCard from './GuestCard';
import { Contributor } from '../models/contributor.interface';

interface GuestListProps {
  contributor: Contributor;
}

const GuestList = ({ contributor: { name } }: GuestListProps) => {
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

  return (
    <div className="text-center w-[250px] flex-shrink-0">
      <header>
        <h2 className="">{name}'s List</h2>
      </header>
      <div className="border border-gray-300 rounded-md p-4">
        <Droppable droppableId={name}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {guestList.map((guest, index) => (
                <GuestCard key={guest.id} guest={guest} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

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
    </div>
  );
};

export default GuestList;
