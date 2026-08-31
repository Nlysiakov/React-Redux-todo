import { EPriority, EStatus } from '../models/enum.ts';
import { TTask } from "../models/types.tsx";

export const taskList: Array<TTask> = [
    {
        id: '01',
        title: 'Выучить React state',
        priority: EPriority.HIGH,
        status: EStatus.TODO,
        progress: 0,
    },
    {
        id: '02',
        title: 'Читать книгу',
        priority: EPriority.LOW,
        status: EStatus.DONE,
        progress: 100,
    },
    {
        id: '03',
        title: 'Сходить в магазин',
        priority: EPriority.MEDIUM,
        status: EStatus.PROGRESS,
        progress: 50,
    },
    {
        id: '04',
        title: 'Заплатить за квартиру',
        priority: EPriority.HIGH,
        status: EStatus.DONE,
        progress: 100,
    },
    {
        id: '05',
        title: 'Написать статью',
        priority: EPriority.MEDIUM,
        status: EStatus.PROGRESS,
        progress: 50,
    },
];
