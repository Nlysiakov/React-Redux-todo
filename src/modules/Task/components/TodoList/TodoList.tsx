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

    const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false) // Лучше разделить 
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const [taskToDelete, setTaskToDelete] = useState<null | TTask>(null)
    const [taskToEdit, setTaskToEdit] = useState<null | TTask>(null)

    const openAddModal = () => {
        setTaskToEdit(null)
        setIsOpenAddEditModal(true)
    }

    const openEditModal = (task: TTask): void => {
        setTaskToEdit(task)
        setIsOpenAddEditModal(true)
    }

    const closeAddEditModal = () => {
        setIsOpenAddEditModal(false)
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

    // const handleAddOrEditTask = (taskData: TTask): void => {
    //     if (taskData.id) {
    //         setTasks(prev => prev.map(task =>
    //             task.id === taskData.id ? { ...task, ...taskData } : task
    //         ))
    //     } else {
    //         const newTask = {
    //             ...taskData,
    //             id: Date.now(),
    //             progress: 0
    //         }
    //         setTasks(prev => [newTask, ...prev])
    //     }
    //     closeAddEditModal()
    // }

    const handleAddTask = (taskData: Omit<TTask, "id" | "progress">) => {
        const newTask = {
            ...taskData,
            id: Date.now(),
            progress: 0
        }
        setTasks(prev => [newTask, ...prev]) // Ошибка из-за того, что в newTask у тебя тип id: number из-за Date.now(), а в TTask id: string
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
            {isOpenAddEditModal &&
                <AddEditTaskModal onClose={closeAddEditModal} onSubmit={taskToEdit ? handleEditTask : handleAddTask}
                                  initialData={taskToEdit}/>}
            {isOpenDeleteModal &&
                <DeleteModal
                    onDelete={handleDeleteTask}
                    onClose={closeDeleteModal}
                />}
        </>
    );
};
