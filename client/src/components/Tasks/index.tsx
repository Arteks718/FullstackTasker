import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getTasksThunk,
  deleteTaskThunk,
  deleteAllTasksThunk,
  isOpenNewTaskWindow,
  isOpenUpdateTaskWindow,
  updateShowTask
} from "../../store/slices/tasksSlice";
import CreateTaskForm from "./CreateNewTaskForm";
import { ITasksApp, TypeMapStateToProps, TypeTask } from "../../types";
import styled from "./Tasks.module.sass";
import UpdateTaskForm from "./UpdateTaskForm";

function Tasks({
  tasks,
  isFetching,
  error,
  isEmpty,
  isOpenNewTask,
  isOpenUpdateTask,
  getTasks,
  deleteTask,
  deleteAllTasks,
  isNewTask,
  isUpdateTask,
  updateShowTask
}: ITasksApp) {
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className={styled.container}>
      <h1>Tasks</h1>
      {error && <div>Error! {error}</div>}
      {isFetching && <div>Loading...</div>}
      {isEmpty && <div>Empty Tasks</div>}
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Body</th>
            <th>isDone</th>
            <th>Deadline</th>
            <th>Created</th>
          </tr>
        </thead>

        {tasks.map((task, index) => (
          <tbody key={task.id}>
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.body}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => {}}
                />
              </td>
              <td>{new Date(task.deadline).toLocaleString("uk-UA")}</td>
              <td>{new Date(task.createdAt).toLocaleString("uk-UA")}</td>
              <td>
                <button onClick={() => deleteTask(task.id)}>DELETE</button>
              </td>
              <td>
                <button onClick={() => updateShowTask(task)}>UPDATE</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className={styled.buttons}>
        <div className={styled.newTask}>
          <button onClick={isNewTask}>CREATE NEW TASK</button>
          {isOpenNewTask && <CreateTaskForm />}
        </div>
        <div className={styled.deleteAllTasks}>
          <button onClick={deleteAllTasks}>DELETE ALL TASKS</button>
        </div>
        <div className={styled.updateTask}>
          <button onClick={isUpdateTask}>UPDATE TASK</button>
          {isOpenUpdateTask && (
            <UpdateTaskForm
              tempTask={{ body: "", isDone: false, deadline: new Date().toLocaleString('uk-UA') }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type TypeMapDispatchToProps = (dispatch: any) => {
  getTasks: () => void;
  deleteTask: (taskId: number) => void;
  deleteAllTasks: () => void;
  isNewTask: () => boolean;
  isUpdateTask: () => boolean;
  updateShowTask: (task: TypeTask) => void;
};

const mapStateToProps: TypeMapStateToProps = (state) => state.tasksData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksThunk()),
  deleteTask: (taskId) => dispatch(deleteTaskThunk(taskId)),
  deleteAllTasks: () => dispatch(deleteAllTasksThunk()),
  isNewTask: () => dispatch(isOpenNewTaskWindow()),
  isUpdateTask: () => dispatch(isOpenUpdateTaskWindow()),
  updateShowTask: (task) => dispatch(updateShowTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
