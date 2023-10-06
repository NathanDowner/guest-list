import { Provider } from 'react-redux';
import { store } from './store/store';
import GuestList from './components/GuestList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {
  const handleDragEnd = (result: DropResult) => {};

  return (
    <>
      <Provider store={store}>
        <div className="p-4">
          <header>
            <h1 className="text-4xl text-center">Guest list</h1>
          </header>
          {/* Container */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <GuestList name="Brit Brit" />
              <GuestList />
              <GuestList name="Nathan" />
            </DragDropContext>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
