import { EPriority, EStatus } from '../models/enum.ts';
import { TTask } from "../models/types.tsx";

export const taskList: Array<TTask> = [
    {
        id: 1,
        title: 'Выучить React state',
        priority: EPriority.HIGH,
        status: EStatus.TODO,
        progress: 0,
    },
    {
        id: 2,
        title: 'Читать книгу',
        priority: EPriority.LOW,
        status: EStatus.DONE,
        progress: 100,
    },
    {
        id: 3,
        title: 'Сходить в магазин',
        priority: EPriority.MEDIUM,
        status: EStatus.PROGRESS,
        progress: 50,
    },
    {
        id: 4,
        title: 'Заплатить за квартиру',
        priority: EPriority.HIGH,
        status: EStatus.DONE,
        progress: 100,
    },
    {
        id: 5,
        title: 'Написать статью',
        priority: EPriority.MEDIUM,
        status: EStatus.PROGRESS,
        progress: 50,
    },
];
