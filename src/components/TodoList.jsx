import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos }) {
  return (
    <div
      className="
        space-y-2
      "
    >
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem todo={todo} setTodos={setTodos} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// PropTypes for better maintainability
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      done: PropTypes.bool,
      category: PropTypes.string,
      time: PropTypes.string,
    })
  ).isRequired,
  setTodos: PropTypes.func,
};

// React.memo for performance optimization
export default React.memo(TodoList);