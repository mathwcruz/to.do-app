import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) { //retornando false caso o input esteja vazio
      alert("Prencha o campo do todo");
      return;
    };

    const newTask = { //criando uma nova task com alguns dados pré-setados
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    };

    setTasks([...tasks, newTask]); //setando o novo valor na lista de tasks criado atráves do submit do input
    setNewTaskTitle(''); //limpando o valor do input, para experiência do usuário
  };

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const taskVerified = tasks.map(task => {
      return task.id === id ? {
        ...task,
        isComplete: !task.isComplete //invertendo o valor de true para false ou de false para true
      } : task //caso nao for o mesmo id, manterá o array original
    });

    setTasks(taskVerified); //atualizando os valores
  };

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    
    const filteredTasks = tasks.filter(task => { //filtrando apenas as tasks que não tenham esse id
      return task.id !== id;
    });

    setTasks(filteredTasks); //atualizando os valores do array de tasks
  };

  return (
    <section className="container task-list animate-appear">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group animate-ToptoBottom">
          <input 
            type="text"
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button 
            type="submit" 
            data-testid="add-task-button" 
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li className="animate-appear" key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};