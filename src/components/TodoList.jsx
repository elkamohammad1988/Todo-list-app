/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos }) {
  return (
    <AnimatePresence>
      {todos.map((todo) => (
       <motion
         .div
          key={todo.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
         className="
           mb-2
         "
       >
          <TodoItem todo={todo} setTodos={setTodos} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default React.memo(TodoList);
