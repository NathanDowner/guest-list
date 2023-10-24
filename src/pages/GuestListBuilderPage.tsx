import GuestList from '../components/GuestList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moveAcrossList, reorderList } from '../store/guestListSlice';
import { FINAL_LIST_NAME } from '../utils/constants';
import { selectContributors } from '../store/contributorSlice';
import { Contributor } from '../models/contributor.interface';

const NOT_A_CONTRIBUTOR: Contributor = {
  email: 'not-a-contributor',
  name: FINAL_LIST_NAME,
};

const GuestListBuilderPage = () => {
  const contributors = useAppSelector(selectContributors);
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
        }),
      );
    } else {
      dispatch(
        moveAcrossList({
          srcIndex: source.index,
          destIndex: destination.index,
          srcListName: source.droppableId,
          destListName: destination.droppableId,
          guestId: draggableId,
        }),
      );
    }
  };
  return (
    <div
      className={`mt-4 flex gap-4 overflow-x-auto ${
        contributors.length <= 2 && 'justify-evenly'
      }`}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <GuestList contributor={contributors[0]} />
        <GuestList contributor={NOT_A_CONTRIBUTOR} />
        {contributors.slice(1).map((contributor) => (
          <GuestList contributor={contributor} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default GuestListBuilderPage;
