
import { EPriority } from "./enum"
import { EStatus } from "./enum"


export const statusMap: Record<EStatus, string> = {
    todo: "Новая",
    progress: "В процессе",
    done: "Сделано"
}

export const priorityMap: Record<EPriority, string> = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий"
}