import "./app.css";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [inputData, setInputData] = useState("");
  const [tasks, setTasks] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditTask, setIsEditTask] = useState(null);

  const handleInputChange = (value) => {
    setInputData(value);
  };

  const addItem = () => {
    if (!inputData) {
      toast.error("Please add task");
    } else if (tasks.some((task) => task.name === inputData)) {
      toast.error("Task Already exists");
    } else if (inputData && !toggleBtn) {
      setTasks(
        tasks.map((task) => {
          if (task.id === isEditTask) {
            return { ...task, name: inputData };
          }
          return task;
        })
      );
      setToggleBtn(true);
      setInputData("");
      setIsEditTask(null);
      toast.success("Task updated successfully");
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setTasks([...tasks, allInputData]);
      setInputData("");
      toast.success("Task added successfully");
    }
  };

  const deleteTask = (index) => {
    const updatedTask = tasks.filter((task) => {
      return index !== task.id;
    });
    setTasks(updatedTask);
    toast.info("Task deleted");
  };

  const editTask = (id) => {
    const newEditTask = tasks.find((task) => {
      return task.id === id;
    });
    console.log(newEditTask);
    setToggleBtn(false);
    setInputData(newEditTask.name);
    setIsEditTask(id);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const removeAll = () => {
    setTasks([]);
    toast.info("All tasks removed");
  };

  return (
    <div className="container  mw-100 mh-100 bg-black text-white d-flex justify-content-center align-items-center">
      <div className="inner-container ">
        <h1 className="my-5">Todo App</h1>
        <div className="bg-transparent input-div ">
          <input
            type="text"
            placeholder="Enter your tasks here ..."
            className="border-0 bg-transparent text-light fs-4 "
            value={inputData}
            onChange={(event) => handleInputChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          {toggleBtn ? (
            <FaPlus className=" fs-4 ms-3 icon-add" onClick={addItem} />
          ) : (
            <FaEdit
              className=" fs-4 ms-3 icon-add text-success"
              onClick={addItem}
            />
          )}
        </div>

        {tasks.map((task) => {
          return (
            <>
              <div
                className="d-flex align-items-center justify-content-between btn-container "
                key={task.id}
              >
                <p>{task.name}</p>
                <div className=" d-flex gap-3">
                  <FaEdit
                    onClick={() => editTask(task.id)}
                    className="text-success"
                  />
                  <RiDeleteBin6Line
                    onClick={() => deleteTask(task.id)}
                    className="text-danger"
                  />
                </div>
              </div>
            </>
          );
        })}
        <div className="my-5">
          {tasks.length > 0 && (
            <button onClick={removeAll} className="btn-rm">
              REMOVE ALL
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default App;
