import React, { useState } from 'react'
import { deleteTodo, updateTodo, toggleTodo } from "../todo/TodoSlice"
import { useDispatch } from "react-redux"

function TodoItem({ todo }) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(todo.text)

    const handleSave = () => {
        if (!text.trim()) return
        dispatch(updateTodo({ id: todo.id, text: text.trim() }))
        setIsEditing(false)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isEditing ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={!isEditing}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                type="button"
                onClick={() => {
                    if (isEditing) {
                        handleSave()
                    } else {
                        setIsEditing(true)
                    }
                }}
            >
                {isEditing ? "💾" : "✏️"}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                type="button"
                onClick={() => dispatch(deleteTodo(todo.id))}
            >
                ❌
            </button>
        </div>
    )
}

export default TodoItem