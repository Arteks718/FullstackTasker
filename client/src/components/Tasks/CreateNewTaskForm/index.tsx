import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import {
  createTaskThunk,
  isOpenNewTaskWindow,
} from "../../../store/slices/tasksSlice";
import { TypeTask, TypeMapStateToProps } from "../../../types";
import styled from "./CreateNewTaskForm.module.sass";

const TaskFormSchema = yup.object().shape({
  body: yup
    .string()
    .min(3, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  isDone: yup.boolean().default(false),
  deadline: yup.date().required("Required").min(new Date()),
});

type TypeCreateTaskForm = {
  createTask: any;
  isNewTask: any;
};

function CreateTaskForm({ createTask, isNewTask }: TypeCreateTaskForm) {
  const handleSubmit = (values: TypeTask, formikBag?: any) => {
    createTask(values);
    formikBag.resetForm();
    isNewTask();
  };
  return (
    <div>
      <Formik
        initialValues={{
          body: "",
          isDone: false,
          deadline: new Date().toLocaleString('uk-UA'),
        }}
        validationSchema={TaskFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styled.formWindow}>
            <label htmlFor="body">
              <span>Body</span>
              <Field id="body" name="body" placeholder="Homework" />
              {errors.body && touched.body ? (
                <div className={styled.error}>{errors.body}</div>
              ) : null}
            </label>

            <label htmlFor="isDone">
              <span>isDone</span>
              <Field type="checkbox" id="isDone" name="isDone" />
            </label>

            <label htmlFor="deadline">
              <span>Deadline</span>
              <Field type="datetime-local" name="deadline" />
              {errors.deadline && touched.deadline ? (
                <div className={styled.error}>{String(errors.deadline)}</div>
              ) : null}
            </label>

            <div className={styled.formButtons}>
              <button type="submit">OK</button>
              <button onClick={isNewTask}>CANCEL</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

type TypeMapDispatchToProps = (dispatch: any) => {
  createTask: (task: TypeTask) => void;
  isNewTask: () => void;
};

const mapStateToProps: TypeMapStateToProps = (state) => state.tasksData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch: any) => ({
  createTask: (task) => dispatch(createTaskThunk(task)),
  isNewTask: () => dispatch(isOpenNewTaskWindow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
