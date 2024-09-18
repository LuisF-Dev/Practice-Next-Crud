"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function CreateTasks() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [allow, setAllow] = useState(false);
    const [options, setOptions] = useState([
        { name: "Loading", id: "Loading" },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("../api/category");
            const data = await res.json();
            setOptions(data);
            setAllow(true);
        };
        fetchData();
    }, []);
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-8">Crear tarea</h1>
            <form
                className="bg-slate-800 p-8 flex flex-col rounded-md h-1/2 sm:w-1/3 w-11/12 "
                onSubmit={async (e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const description = e.target.description.value;
                    const categoryId = e.target.categoryId.value;
                    fetch("../api/tasks", {
                        method: "POST",
                        headers: { "content-Type": "application/json" },
                        body: JSON.stringify({
                            title: title,
                            description: description,
                            categoryId: categoryId,
                        }),
                    }).then(() => {
                        setShow(true);

                        setTimeout(router.push("/tasks"), 1000);
                    });
                }}
            >
                <label htmlFor="titulo">Titulo</label>
                <input
                    type="text"
                    id="title"
                    className="mb-auto w-full border border-gray-800 text-black p-2"
                    placeholder="Titulo"
                />
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                    name=""
                    id="description"
                    cols={4}
                    className="mb-auto w-full  border border-gray-800 h-full text-black p-2"
                    placeholder="Descripcion"
                ></textarea>
                <label htmlFor="categoria">Categoria</label>
                <select
                    name="categoria"
                    id="categoryId"
                    className="text-black p-2"
                >
                    {options.map((category) => {
                        return (
                            <option
                                value={category.id}
                                key={category.id}
                                className="text-black"
                            >
                                {category.name}
                            </option>
                        );
                    })}
                </select>
                <button
                    className="bg-orange-700 rounded-md p-2 mt-3 disabled:bg-orange-400"
                    disabled={!allow}
                >
                    Crear Nueva Tarea{" "}
                </button>
            </form>
            {show && (
                <div className="bg-gray-700 text-white p-3 mt-4 text-md">
                    {show ? "La tarea fue creada exitosamente" : "Error"}
                </div>
            )}
        </div>
    );
}

export default CreateTasks;
