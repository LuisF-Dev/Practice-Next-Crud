"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Task({ task, setReload }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputsValue, setInputsValue] = useState({
        title: task.title,
        description: task.description,
    });
    const [newTask, setNewTask] = useState(task);

    useEffect(() => {
        const modifyData = async () => {
            await fetch(`../api/tasks/${task.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newTask),
            });
        };
        modifyData();
    }, [task.id, newTask]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={newTask.id}
            className="bg-cyan-700 m-3 p-3 rounded-md transition "
        >
            <div className="bg-cyan-600 rounded-md m-1 p-2">
                Titulo:{" "}
                {isEditing ? (
                    <input
                        type="text"
                        className="text-black"
                        value={inputsValue.title}
                        id="input"
                        onChange={(e) => {
                            setInputsValue({
                                ...inputsValue,
                                title: e.target.value,
                            });
                        }}
                    />
                ) : (
                    <h2>{newTask.title}</h2>
                )}
            </div>
            <div className="bg-cyan-600 rounded-md m-1 p-2">
                Descripcion:{" "}
                {isEditing ? (
                    <textarea
                        name=""
                        className="text-black"
                        id="description"
                        value={inputsValue.description}
                        onChange={(e) => {
                            setInputsValue({
                                ...inputsValue,
                                description: e.target.value,
                            });
                        }}
                    ></textarea>
                ) : (
                    <p>{newTask.description}</p>
                )}
            </div>
            <button
                onClick={async () => {
                    if (isEditing) {
                        setNewTask({
                            ...newTask,
                            title: inputsValue.title,
                            description: inputsValue.description,
                        });
                        setIsEditing(false);
                    } else {
                        setIsEditing(true);
                    }
                }}
                className={"bg-teal-600 rounded-md m-2 p-2"}
            >
                {isEditing ? "Guardar" : "Editar"}
            </button>
            <button
                className="bg-teal-600 rounded-md m-2 p-2"
                onClick={async () => {
                    await fetch(`../api/tasks/${newTask.id}`, {
                        method: "DELETE",
                    });
                    setReload();
                }}
            >
                Eliminar
            </button>
        </motion.div>
    );
}

export default Task;
