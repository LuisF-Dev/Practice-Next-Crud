"use client";

import { useState } from "react";

const { AnimatePresence, motion } = require("framer-motion");

function Category({ categoryActive, onClick, category }) {
    const [reload, setReload] = useState(0);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className={`cursor-pointer ${
                category.id == categoryActive ? "bg-cyan-600" : "bg-cyan-700"
            } rounded-md p-4 bgc m-2 transition`}
            key={category.id}
            onClick={onClick}
        >
            {category.name}
            <button
                className="text-black text-lg m-4 hover:bg-gray-700 p-2 rounded-md"
                onClick={async (e) => {
                    const res = await fetch(`../api/category/${category.id}`, {
                        method: "DELETE",
                    });

                    const data = await res.json();
                    console.log(data);
                    setReload(reload + 1);
                }}
            >
                X
            </button>
        </motion.div>
    );
}

export default Category;
