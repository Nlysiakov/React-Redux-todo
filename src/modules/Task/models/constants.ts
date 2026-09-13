
import { EPriority } from "./enum"
import { EStatus } from "./enum"



export const priorityMap:Record<EPriority, string>={
    [EPriority.HIGH]: "Высокий",
    [EPriority.MEDIUM]: "Средний",
    [EPriority.LOW]: "Низкий"
}

export const statusMap: Record<EStatus, string>={
    [EStatus.DONE]: "Сделано",
    [EStatus.PROGRESS]: "В процессе",
    [EStatus.TODO]: "Новая"
}