import GuestList from '../components/GuestList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  createLists,
  moveAcrossList,
  populateMasterList,
  reorderList,
} from '../store/guestListSlice';
import {
  bulkAddContributors,
  selectContributors,
} from '../store/contributorSlice';
import { Contributor } from '../models/contributor.interface';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetList } from '@/lib/firebase';
import MasterList from '@/components/MasterList';

const GuestListBuilderPage = () => {
  const { listId } = useParams();
  const [list, isLoadingList, error] = useGetList(listId!);
  const contributors = useAppSelector(selectContributors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!list) return;
    // hydrate the store with the list from firestore
    const contributorList: Contributor[] = Object.entries(
      list.contributors,
    ).map(([_, contr]) => contr);

    dispatch(bulkAddContributors(contributorList));
    dispatch(populateMasterList(list.guests));
    dispatch(createLists(contributorList));
  }, [list]);

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
      {isLoadingList ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <MasterList />
        </DragDropContext>
      )}
    </div>
  );
};

export default GuestListBuilderPage;
