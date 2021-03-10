import { TaskList } from './components/TaskList';
import { Header } from "./components/Header";
import './styles/global.scss';
import './styles/animations.scss';


export function App() {
  return (
    <>
      <Header />
      <TaskList />
    </>
  );
};