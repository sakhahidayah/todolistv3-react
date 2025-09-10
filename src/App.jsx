import { TrashSimpleIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function App() {
  // Mengambil value dari input
  const input = useRef();
  // state untuk menyimpan data ( Task )
  const [tasks, setTask] = useState(() => {
    return JSON.parse(localStorage.getItem("TodoList")) || [];
  });

  // Handling untuk Add ( Task )
  const HandleAdd = (event) => {
    // Validasi button / key
    if (event.key == "Enter" || event.type == "click") {
      event.preventDefault();
      // Validasi value dari inputan user
      if (input.current.value !== "") {
        const data = input.current.value.trim();
        const getTask = JSON.parse(localStorage.getItem("TodoList")) || [];
        getTask.push({ id: Date.now(), task: data, done: false });
        setTask(getTask);
        localStorage.setItem("TodoList", JSON.stringify(getTask));
        toast.success("Task has been successfully added.");
        input.current.value = "";
      } else {
        toast.error("Task cannot be empty. Please enter a valid task.");
      }
    }
  };

  // Handling Delete ( Task ) berdasarkan ID
  const handleDelete = (id) => {
    const updated = tasks.filter((res) => res.id !== id);
    setTask(updated);
    toast.success("🗑️ Task has been removed successfully.");
    localStorage.setItem("TodoList", JSON.stringify(updated));
  };

  // Handling Delete All data
  const handleDeleteAll = () => {
    if (tasks.length == 0) {
      toast.error("🗑️ Nothing to delete, your list is already empty.");
    } else {
      localStorage.removeItem("TodoList");
      toast.success("🧹 All tasks have been cleared successfully.");
      setTask([]);
    }
  };

  return (
    <>
      <div className="w-screen  h-screen justify-center items-center bg-[#e9eaf0] text-black flex flex-col ">
        <div className="px-14 flex gap-5  flex-col items-center w-[700px] h-96">
          <h1 className="font-bold text-[#636eee] text-5xl self-center mb-5">TODO APP</h1>
          <div className="flex flex-row justify-between  gap-5  w-full">
            <button onClick={HandleAdd} className="px-4 py-2 bg-[#636eee] rounded-full text-white hover:bg-[#7c7eff] h transition-all duration-200 font-semibold">
              Add Task
            </button>
            <input ref={input} onKeyDown={HandleAdd} className="px-4 py-1 rounded-full basis-1/2 border" type="text" placeholder="Input new task.." />
            <button onClick={handleDeleteAll} className="px-4 py-2 bg-[#fb7185] hover:bg-[#fda4af] rounded-full text-white font-semibold transition-all duration-200">
              Delete All
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 p-4 border rounded-lg bg-[#edeef9]">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <>
                  <div key={index} className="w-full cursor-pointer flex flex-row justify-between px-3 py-3 rounded-lg bg-[#fefffd]">
                    <p className="font-xs text-slate-400 font-semibold">{task.task}</p>
                    <div className="flex flex-col gap-2">
                      <button className="px-3 py-1 group  rounded-lg bg-[#f0f0f0] font-semibold text-slate-500">
                        <TrashSimpleIcon
                          size={20}
                          onClick={() => {
                            handleDelete(task.id);
                          }}
                          className="group-hover:text-black  transition-all duration-200"
                        />
                      </button>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="w-full cursor-pointer flex flex-row  px-3 py-3 rounded-lg text-black bg-[#fefffd]">
                <p className="self-center font-semibold text-sm">No tasks available. Please add a new task to get started 😊.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
