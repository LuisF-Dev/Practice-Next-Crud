"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function CreateCategory() {
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
            <h1 className="text-4xl mb-8">Crear categoria </h1>
            <form
                className="bg-slate-800 p-8 flex flex-col rounded-md  sm:w-1/3 w-11/12 "
                onSubmit={async (e) => {
                    e.preventDefault();
                    const name = e.target.title.value;

                    fetch("../api/category", {
                        method: "POST",
                        headers: { "content-Type": "application/json" },
                        body: JSON.stringify({
                            name: name,
                        }),
                    }).then(() => {
                        setShow(true);

                        setTimeout(router.push("/tasks"), 1000);
                    });
                }}
            >
                <label htmlFor="titulo">Nombre</label>
                <input
                    type="text"
                    id="title"
                    className="my-4 w-full border border-gray-800 text-black p-2"
                    placeholder="Titulo"
                />

                <button
                    className="bg-orange-700 rounded-md p-2 mt-3 disabled:bg-orange-400"
                    disabled={!allow}
                >
                    Crear Nueva categoria{" "}
                </button>
            </form>
            {show && (
                <div className="bg-gray-700 text-white p-3 mt-4 text-md">
                    {show ? "La categoria fue creada exitosamente" : "Error"}
                </div>
            )}
        </div>
    );
}

export default CreateCategory;
