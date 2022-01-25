import { useContext } from "react"
import { TodosContext } from "../context/TodosContext"

export function useTodos() {
    return useContext(TodosContext)
}