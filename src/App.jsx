import React, { useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Task from "./Components/Task";
import { appStyle, inputStyle } from "./Stylle/style";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [visibleTasks, setVisibleTasks] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false); // New state for active tab

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, { text: newTask, completed: false }];
        setVisibleTasks(5); // reset visible tasks when a new one is added
        setShowAll(false);  // reset show all toggle to 'Show More'
        return updatedTasks;
      });
      setNewTask("");
    }
  };

  // Toggle task completion
  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;  // Toggle completed status
    setTasks(updatedTasks);
  };

  // Remove task
  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);  // Remove task by index
      return updatedTasks;
    });
  };

  // Toggle visibility of tasks
  const toggleShowTasks = () => {
    if (showAll) {
      setVisibleTasks(5);  // Show only 5 tasks when collapsed
    } else {
      setVisibleTasks(tasks.length);  // Show all tasks
    }
    setShowAll(!showAll);  // Toggle the "show all" state
  };

  // Filter tasks based on view (all tasks or only completed tasks)
  const filteredTasks = viewCompleted
    ? tasks.filter((task) => task.completed)
    : tasks;

  // Calculate number of completed tasks
  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div style={appStyle}>
      <h1>
        Todo List <i className="fas fa-badge-check"></i>
      </h1>

      {/* Task completion count */}
      <div style={{ marginBottom: "10px", fontSize: "18px" , fontWeight: "bold"}}>
        Completed Tasks: {completedTasksCount} / {tasks.length}
      </div>

      {/* Tabs to switch between All Tasks and Completed Tasks */}
      <div style={{ marginBottom: "20px" }}>
        <Button
          onClick={() => setViewCompleted(false)}
          text="All Tasks"
          style={{
            backgroundColor: !viewCompleted ? "#9795f0" : "#f1f1f1",
            color: !viewCompleted ? "#fff" : "#000",
            padding: "10px 20px",
            marginRight: "10px",
          }}
        />
        <Button
          onClick={() => setViewCompleted(true)}
          text="Completed"
          style={{
            backgroundColor: viewCompleted ? "#9795f0" : "#f1f1f1",
            color: viewCompleted ? "#fff" : "#000",
            padding: "10px 20px",
          }}
        />
      </div>

      {/* Input form to add tasks */}
      <form onSubmit={addTask}>
        <div>
          <Input
            type="text"
            style={inputStyle}
            placeholder="Add a task"
            value={newTask}
            handleOnChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit" text={<i className="fas fa-plus"> Enter</i>} />
        </div>
      </form>

  

      {/* Task List */}
      <div
        style={{
          gap: "1em",
          borderRadius: "15px",
        }}
      >
        {filteredTasks.slice(0, visibleTasks).map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {tasks.length > 5 && (
        <Button
          onClick={toggleShowTasks}
          text={
            <>
              <i className="fas fa-list"></i>
              {showAll ? " Show Less" : " Show More"}
            </>
          }
        />
      )}
    </div>
  );
};

export default App;
