import './style.scss';
import Add from '../../../../shared/assets/icons/add.svg?react';
import { AddEditTaskModal } from '../AddEditTaskModal/AddEditTaskModal.tsx';
import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { DeleteModal } from '../DeleteModal/DeleteModal.tsx';
import { TaskCard } from '../TaskCard/TaskCard.tsx';
import { taskList } from '../../serverData/taskList.ts';
import { useState } from 'react';
import { TTask } from '../../models/types.tsx';


export const TodoList = () => {

    const [tasks, setTasks] = useState(taskList)

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const [taskToDelete, setTaskToDelete] = useState<null | TTask>(null)
    const [taskToEdit, setTaskToEdit] = useState<null | TTask>(null)

    const openAddModal = () => {
        setTaskToEdit(null)
        setIsOpenAddModal(true)
    }

    const openEditModal = (task: TTask): void => {
        setTaskToEdit(task)
        setIsOpenEditModal(true)
    }

    const closeAddEditModal = () => {
        setIsOpenAddModal(false)
        setIsOpenEditModal(false)
        setTaskToEdit(null)
    }

    const closeDeleteModal = () => {
        setIsOpenDeleteModal(false)
        setTaskToDelete(null)
    }

    const openDeleteModal = (task: TTask): void => {
        setIsOpenDeleteModal(true)
        setTaskToDelete(task)
    }


    const handleDeleteTask = () => {
        if (taskToDelete) {
            setTasks(prev =>
                prev.filter(task => task.id !== taskToDelete.id))

            closeDeleteModal()
        }
    }


    const handleAddTask = (taskData: Omit<TTask, "id" | "progress">) => {
        const newTask = {
            ...taskData,
            id: Date.now(),
            progress: 0
        }
        setTasks(prev => [newTask, ...prev])
        closeAddEditModal()
    }

    const handleEditTask = (taskData: TTask) => {
        setTasks(prev => prev.map(task =>
            task.id === taskData.id
                ? { ...task, ...taskData } : task
        ))
        closeAddEditModal()
    }


    return (
        <>
            <div className="page-wrapper">
                <div className="top-title">
                    <h2>Список задач</h2>
                    <Button title="Добавить задачу" icon={<Add/>} onClick={openAddModal}/>
                </div>
                <div className="task-container">
                    {tasks.map((task) => (
                        <TaskCard
                            task={task}
                            key={task.id}
                            onDelete={() => openDeleteModal(task)}
                            onEdit={() => openEditModal(task)}/>
                    ))}
                </div>
            </div>
            {(isOpenAddModal || isOpenEditModal &&
                <AddEditTaskModal 
                onClose={closeAddEditModal} 
                addTodo={handleAddTask} 
                editTodo={handleEditTask} 
                initialData={taskToEdit}
                isEditing={isOpenEditModal}
                />
                )}                   
            {isOpenDeleteModal &&
                <DeleteModal
                    onDelete={handleDeleteTask}
                    onClose={closeDeleteModal}
                />}
        </>
    );
};
