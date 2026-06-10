import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    Todos: [{ id: 1, text: "todo Msg", completed: false }]
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.Todos.push(todo)
        },
        deleteTodo: (state, action) => {
            state.Todos = state.Todos.filter(
                (todo) => todo.id !== action.payload
            )
        },
        updateTodo: (state, action) => {
            state.Todos = state.Todos.map((todo) => (
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo
            ))
        },

        toggleTodo: (state, action) => {
            state.Todos = state.Todos.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        }
    }
})

export const { addTodo, deleteTodo, updateTodo, toggleTodo } = TodoSlice.actions

export default TodoSlice.reducer