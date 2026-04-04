/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export default function TodoItem({ todo }) {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(todo.task);
  const [done, setDone] = useState(todo.done);
  const [expired, setExpired] = useState(false);
  /* check expiration */

  useEffect(() => {
    if (!todo.time) return;

    const checkExpire = () => {
      const now = new Date();

      const taskTime = new Date();

      const [h, m] = todo.time.split(":");

      taskTime.setHours(h);
      taskTime.setMinutes(m);

      if (taskTime < now && !done) {
        setExpired(true);
      }
    };

    checkExpire();

    const interval = setInterval(checkExpire, 60000);

    return () => clearInterval(interval);
  }, [todo.time, done]);

  /* update task */

  const update = async () => {
    await updateDoc(doc(db, "todos", todo.id), {
      task,
      done,
    });

    setEdit(false);
  };

  /* delete */

  const remove = async () => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  /* toggle done */

  const toggleDone = async () => {
    await updateDoc(doc(db, "todos", todo.id), {
      done: !done,
    });

    setDone(!done);
  };

  return (
    <div
      className={`
        flex justify-between items-center
        p-4
        rounded-xl
        shadow
        transition
        ${
          expired
            ? "bg-red-100 border border-red-400"
            : "bg-white dark:bg-gray-800"
        }
      `}
    >
      {edit ? (
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded w-3/4"
        />
      ) : (
        <div className={done ? "line-through text-gray-400" : ""}>
          <p
            className="
              font-semibold
            "
          >{todo.task}</p>

          <p
            className="
              text-sm text-gray-500
            "
          >
            {todo.time} | {todo.category}
            {expired && (
              <span
                className="
                  ml-3
                  text-red-600 font-bold
                "
              >Expired</span>
            )}
          </p>
        </div>
      )}

      <div
        className="
          flex
          gap-3
        "
      >
        {!edit && (
          <button onClick={() => setEdit(true)} className="text-blue-500">
            Edit
          </button>
        )}

        {edit && (
          <button
            onClick={update}
            className="
              text-green-500
            "
          >
            Save
          </button>
        )}

        <button
          onClick={remove}
          className="
            text-red-500
          "
        >
          Delete
        </button>

        <button
          onClick={toggleDone}
          className="
            text-yellow-500
          "
        >
          {done ? "Undo" : "Done"}
        </button>
      </div>
    </div>
  );
}
