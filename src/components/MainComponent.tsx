import React from 'react';
import GuestList from '../components/GuestList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch } from '../store/hooks';
import { moveAcrossList, reorderList } from '../store/guestListSlice';
import { FINAL_LIST_NAME } from '../utils/constants';

const MainComponent = () => {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Within the same list
    if (destination.droppableId === source.droppableId) {
      dispatch(
        reorderList({
          listName: source.droppableId,
          guestId: draggableId,
          srcIndex: source.index,
          destIndex: destination.index,
        })
      );
    } else {
      dispatch(
        moveAcrossList({
          srcIndex: source.index,
          destIndex: destination.index,
          srcListName: source.droppableId,
          destListName: destination.droppableId,
          guestId: draggableId,
        })
      );
    }
  };
  return (
    <div className="p-4">
      <header>
        <h1 className="text-4xl text-center">Guest list</h1>
      </header>
      {/* Container */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <GuestList name="Brit Brit" />
          <GuestList name={FINAL_LIST_NAME} />
          <GuestList name="Nathan" />
        </DragDropContext>
      </div>
    </div>
  );
};

export default MainComponent;
