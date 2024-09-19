const { AnimatePresence, motion } = require("framer-motion");

function Category({ categoryActive, onClick, category }) {
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
        </motion.div>
    );
}

export default Category;
