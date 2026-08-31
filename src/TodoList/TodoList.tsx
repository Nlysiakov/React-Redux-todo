import './style.scss';
import Add from '../assets/icons/add.svg?react';
import { AddEditTaskModal } from '../AddEditTaskModal/AddEditTaskModal';
import { Button } from '../Button/Button';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { TaskCard } from '../TaskCard/TaskCard';
import { taskList } from '../serverData/taskList';
import { useState } from 'react';
import { TTask } from '../types/Types';


export const TodoList = () => {

  const [tasks, setTasks]=useState(taskList)

  const [statusAddEditModal, setStatusAddEditModal]=useState(false)
  const [statusDeleteModal, setStatusDeleteModal]=useState(false)

  const [taskToDelete, setTaskToDelete]=useState<null | TTask>(null)
  const [taskToEdit, setTaskToEdit]=useState<null | TTask>(null)

  const openAddModal=()=>{
    setTaskToEdit(null)
    setStatusAddEditModal(true)
  }

  const openEditModal=(task: TTask):void=>{
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

  const openDeleteModal=(task: TTask):void=>{
    setStatusDeleteModal(true)
    setTaskToDelete(task)
  }


  const handleDeleteTask=()=>{
    if(taskToDelete){
      setTasks(prev =>
      prev.filter(task=> Number(task.id) !== Number(taskToDelete.id)))

      closeStatusDeleteModal()
    }
  }

  const handleAddOrEditTask=(taskData : TTask) : void=>{
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
          <Button title="Добавить задачу" icon={<Add />} onClick={openAddModal} />
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
      />}
    </>
  );
};
