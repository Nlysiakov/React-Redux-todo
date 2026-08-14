import './style.scss';
import Add from '../assets/icons/add.svg?react';
import { AddEditTaskModal } from '../AddEditTaskModal/AddEditTaskModal';
import { Button } from '../Button/Button';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { TaskCard } from '../TaskCard/TaskCard';
import { taskList } from '../serverData/taskList';
import { useState } from 'react';

type Task={
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "progress" | "done";
  progress: number;
}

export const TodoList = () => {

  const [tasks, setTasks]=useState(taskList)

  const [statusAddEditModal, setStatusAddEditModal]=useState<boolean>(false)
  const [statusDeleteModal, setStatusDeleteModal]=useState<boolean>(false)

  const [taskToDelete, setTaskToDelete]=useState<null | Task>(null)
  const [taskToEdit, setTaskToEdit]=useState<null | Task>(null)

  const openAddModal=()=>{
    setTaskToEdit(null)
    setStatusAddEditModal(true)
  }

  const openEditModal=(task: Task):void=>{
    setTaskToEdit(task)
    setStatusAddEditModal(true)
  }

  const closeAddEditModal=()=>{
    setStatusAddEditModal(false)
    setTaskToEdit(null)
  }

  const closeStatusDeleteModal=()=>{
    setStatusDeleteModal(false)
    setTaskToDelete(null)
  }

  const openDeleteModal=(task: Task):void=>{
    setStatusDeleteModal(true)
    setTaskToDelete(task)
  }


  const handleDeleteTask=()=>{
    if(taskToDelete){
      setTasks(prev=>prev.filter(task=>task.id!==taskToDelete.id))
      closeStatusDeleteModal()
    }
  }

  const handleAddOrEditTask=(taskData:Task):void=>{
    if(taskData.id){
      setTasks(prev=>prev.map(task=>
        task.id===taskData.id ? {...task, ...taskData} : task
      ))
    }else{
      const newTask={
        ...taskData,
        id: Date.now(),
        progress: 0
      }
      setTasks(prev=>[newTask, ...prev])
    }
    closeAddEditModal()
  }



  return (
    <>
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Список задач</h2>
          <Button title="Добавить задачу" icon={<Add />} onClick={() => {openAddModal()}} />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard 
            task={task}
            key={task.id}
            onDelete={()=>openDeleteModal(task)}
            onEdit={()=>openEditModal(task)} />
          ))}
        </div>
      </div>
      {statusAddEditModal && <AddEditTaskModal onClose={closeAddEditModal} onSubmit={handleAddOrEditTask} initialData={taskToEdit}/>}
      {statusDeleteModal && 
      <DeleteModal 
      onDelete={handleDeleteTask} 
      onClose={closeStatusDeleteModal}
      taskTitle={taskToDelete?.title}/>}
    </>
  );
};
