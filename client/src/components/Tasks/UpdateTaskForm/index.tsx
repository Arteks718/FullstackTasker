import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
import * as yup from "yup";
import { TypeMapStateToProps, TypeTask } from "../../../types";
import { isOpenUpdateTaskWindow, selectInitialValues, updateTaskThunk } from "../../../store/slices/tasksSlice";
import styled from "./UpdateTaskForm.module.sass";
import { useSelector } from "react-redux";

type TypeUpdateTaskForm = {
  tempTask: TypeTask;
  updateTask: any;
  isUpdateTask: any;
};

const TaskFormSchema = yup.object().shape({
  body: yup
    .string()
    .min(3, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  isDone: yup.boolean().default(false),
  deadline: yup.date().required("Required").min(new Date()),
});

function UpdateTaskForm({ tempTask, updateTask, isUpdateTask }: TypeUpdateTaskForm) {
  const initialValues:TypeTask = useSelector(selectInitialValues)
  const handleSubmit = (values: TypeTask, formikBag?: any) => {
    updateTask(values)
    formikBag.resetForm();
    isUpdateTask()
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize = { true }
        validationSchema={TaskFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className={styled.formWindow}>
            <label htmlFor="body">
              <span>Body</span>
              <Field id="body" name="body" placeholder="Homework" />
              {errors.body && touched.body ? (
                <div className={styled.error}></div>
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
              <button onClick={isUpdateTask}>CANCEL</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps: TypeMapStateToProps = (state) => state.tasksData;
const mapDispatchToProps = (dispatch: any) => ({
  updateTask: (task: TypeTask) => dispatch(updateTaskThunk(task)),
  isUpdateTask: () => dispatch(isOpenUpdateTaskWindow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);
