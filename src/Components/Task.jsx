import React from "react";
import Button from "./Button";
import { taskStyles } from "../Stylle/style";

const Task = ({ task, index, completeTask, removeTask }) => {
  return (
    <div style={taskStyles}>
      <span style={{ textDecoration: task.completed ? "line-through" : "none" ,
        opacity: task.completed? 0.3 : 1,
      }}>
        {task.text}
      </span>
      <div>
        <Button
          text={task.completed ? <i className="fas fa-undo"></i> : <i className="fas fa-check"></i>
          }
         
          onClick={() => completeTask(index)}
        />
        <Button
          text={<i className="fas fa-trash-alt"></i>}
          onClick={() => removeTask(index)}
        />
      </div>
    </div>
  );
};

export default Task;