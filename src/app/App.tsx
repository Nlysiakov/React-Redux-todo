import './App.scss';
import { TodoList } from '../modules/Task/components/TodoList/TodoList.tsx';

const App = () => {
  return (
    <div className="container">
      <TodoList />
    </div>
  );
};

export default App;
