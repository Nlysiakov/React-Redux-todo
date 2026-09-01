
import { EPriority } from "./enum"
import { EStatus } from "./enum"


export const statusMap: Record<EStatus, string> = { // можно вынести в отдельный файл constants.ts
    todo: "Новая",
    progress: "В процессе",
    done: "Сделано"
}

export const priorityMap: Record<EPriority, string> = { // можно вынести в отдельный файл constants.ts
    low: "Низкий",
    medium: "Средний",
    high: "Высокий"
}