"use client";

import clsx from "clsx";

import { useState, useEffect, Suspense } from "react";
import { poppins } from "../fonts";
import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";
import Categories from "../components/Category";
import Task from "../components/Task";

function TasksPage() {
    const [categoryActive, setCategoryActive] = useState(null);
    const [tasks, SetTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reload, setReload] = useState(0);

    const router = useRouter();

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
        if (isLoaded && !categoryActive) {
            setCategoryActive(categories[0].id);
        }
    }, [categories, isLoaded, categoryActive]);
    const filteredTasks = tasks.filter(
        (task) => task.category_id == categoryActive
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
                            className="bg-slate-800 rounded-md p-5 me-3"
                            onClick={() => {
                                router.push("tasks/new");
                            }}
                        >
                            Crear
                        </button>
                        <div className="p-2"></div>
                        <button
                            className="bg-slate-800 rounded-md p-5"
                            onClick={() => setReload(reload + 1)}
                        >
                            Recargar
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
                                    <Categories
                                        category={category}
                                        categoryActive={categoryActive}
                                        onClick={() =>
                                            setCategoryActive(category.id)
                                        }
                                        key={category.id}
                                    />
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
                                    <Task
                                        setReload={() => setReload()}
                                        key={task.id}
                                        task={task}
                                    />
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
