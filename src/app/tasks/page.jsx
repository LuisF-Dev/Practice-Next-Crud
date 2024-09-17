"use client";

import clsx from "clsx";
import next from "next";

import { useState, useEffect, Suspense } from "react";
import { poppins } from "../fonts";

function TasksPage() {
    const [categoryId, setCategoryId] = useState();
    const [tasks, SetTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isloaded, setIsLoaded] = useState(false);
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
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-2 place-items-center">
                <div className="grid grid-cols-3 col-span-3 grid-flow-col w-full place-items-center">
                    <div> </div>
                    <h1
                        className={clsx(
                            "text-2xl col-span-1 ",
                            poppins.className
                        )}
                    >
                        Categorias
                    </h1>{" "}
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
                    {isloaded ? (
                        categories.map((category) => {
                            return (
                                <div
                                    className="bg-cyan-700 rounded-md p-4 m-2"
                                    key={category.id}
                                >
                                    {category.name}
                                </div>
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
                </div>

                <div className="grid grid-cols-3"></div>
            </div>
            <div className="grid grid-cols-3 grid-rows-6 place-items-center">
                <h1 className={clsx("text-2xl col-span-1 ", poppins.className)}>
                    Tareas
                </h1>{" "}
            </div>
        </>
    );
}

export default TasksPage;
