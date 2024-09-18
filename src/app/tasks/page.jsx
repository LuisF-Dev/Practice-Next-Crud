"use client";

import clsx from "clsx";
import next from "next";

import { useState, useEffect, Suspense } from "react";
import { poppins } from "../fonts";
import { AnimatePresence, motion } from "framer-motion";

function TasksPage() {
    const [categoryId, setCategoryId] = useState(null);
    const [tasks, SetTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const catRes = await fetch("../api/category");
            const catJson = await catRes.json();
            const tasksRes = await fetch("../api/tasks");
            const tasksJson = await tasksRes.json();
            setCategories(catJson);
            SetTasks(tasksJson);
            setIsLoaded(true);
        };
        fetchData();
    }, [reload]);
    useEffect(() => {
        if (isLoaded && !categoryId) {
            setCategoryId(categories[0].id);
            console.log(categoryId);
        }
        console.log(categoryId);
    }, [categories, isLoaded, categoryId]);
    const filteredTasks = tasks.filter(
        (task) => task.category_id == categoryId
    );

    return (
        <>
            <div className="grid grid-cols-3 grid-rows-2 place-items-center">
                <div className="grid grid-cols-3 col-span-3 grid-flow-col w-full place-items-center">
                    <div></div>
                    <div className="w-full flex flex-row justify-center ">
                        <h1
                            className={clsx(
                                "text-2xl col-span-1",
                                poppins.className
                            )}
                        >
                            Categorias
                        </h1>{" "}
                    </div>
                    <div className="flex  justify-end w-full px-4">
                        <button
                            className="bg-slate-800 p-4 rounded-md col-span-1"
                            onClick={() => setReload(reload + 1)}
                        >
                            recargar
                        </button>
                    </div>
                </div>
                <div
                    className={`grid grid-flow-col w-full grid-cols-${
                        categories.length
                    } col-span-3 grid-rows-${Math.ceil(categories.length / 6)}`}
                >
                    {" "}
                    {isLoaded ? (
                        <AnimatePresence>
                            {categories.map((category) => {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        exit={{ opacity: 0 }}
                                        className={`cursor-pointer ${
                                            category.id == categoryId
                                                ? "bg-cyan-600"
                                                : "bg-cyan-700"
                                        } rounded-md p-4 bgc m-2 transition`}
                                        key={category.id}
                                        onClick={() =>
                                            setCategoryId(category.id)
                                        }
                                    >
                                        {category.name}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    ) : (
                        <h1
                            className={clsx(
                                "text-2xl col-span-3 my-5",
                                poppins.className
                            )}
                        >
                            Cargando...
                        </h1>
                    )}
                </div>

                <div className="grid grid-cols-3"></div>
            </div>
            <div className="flex flex-col w-full items-center justify-center">
                <h1
                    className={clsx(
                        "text-2xl col-span-3 my-12",
                        poppins.className
                    )}
                >
                    Tareas
                </h1>{" "}
            </div>
            <div className="grid grid-cols-3 grid-rows-3 place-items-center ">
                <div
                    className={`grid grid-cols-3 col-span-3 w-full grid-rows-${Math.ceil(
                        tasks.length / 6
                    )}`}
                >
                    <AnimatePresence>
                        {isLoaded ? (
                            filteredTasks.map((task) => {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        key={task.id}
                                        className="bg-cyan-700 m-3 p-3 rounded-md transition "
                                    >
                                        <div className="bg-cyan-600 rounded-md m-1 p-2">
                                            Titulo: <h2>{task.title}</h2>
                                        </div>
                                        <div className="bg-cyan-600 rounded-md m-1 p-2">
                                            Descripcion:{" "}
                                            <p>{task.description}</p>
                                        </div>
                                        <button className="bg-teal-600 rounded-md m-2 p-2">
                                            Editar
                                        </button>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <h1
                                className={clsx(
                                    "text-2xl col-span-3 my-5",
                                    poppins.className
                                )}
                            >
                                Cargando...
                            </h1>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default TasksPage;
