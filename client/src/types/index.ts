type TypeUsersApp = {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
  getUsers: any;
  deleteUsers: any;
};

<<<<<<< HEAD
interface ITasksApp {
  tasks: TypeTask[];
  isFetching: boolean;
  error: string | null | undefined;
  isEmpty: boolean;
  isOpenNewTask: boolean;
  isOpenUpdateTask: boolean;
  getTasks: any;
  deleteTask: any;
  deleteAllTasks: any;
  isNewTask: any;
  isUpdateTask: any;
  updateShowTask: any;
=======
type TypeTasksApp = {
  tasks: TypeTask[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
  getTasks: any;
>>>>>>> 2e1a96d (Add component tasks+slice)
};

type TypeUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  birthday?: string;
  gender?: EnumGender;
};

type TypeTask = {
<<<<<<< HEAD
  id?:number | null;
  body: string;
  isDone: boolean;
  deadline: string;
  createdAt?: any;
  updatedAt?: Date;
};

type TypeMapStateToProps = (state: any) => string[];
=======
  id:number;
  body: string;
  isDone: boolean;
  deadline: string;
};
>>>>>>> 2e1a96d (Add component tasks+slice)

interface IUsersState {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
}

interface ITasksState {
  tasks: TypeTask[];
<<<<<<< HEAD
  tempTask: TypeTask;
  isFetching: boolean;
  error: string | null | undefined | unknown;
  isEmpty: boolean;
  isOpenNewTask: boolean;
  isOpenUpdateTask: boolean;
=======
  isFetching: boolean;
  error: string | null | undefined | unknown;
>>>>>>> 2e1a96d (Add component tasks+slice)
}

enum EnumGender {
  male,
  female,
  other,
}

<<<<<<< HEAD
export type { IUsersState, ITasksState, ITasksApp, TypeMapStateToProps, TypeUsersApp, TypeUser, TypeTask };
=======
export type { IUsersState, ITasksState, TypeUsersApp, TypeTasksApp, TypeUser };
>>>>>>> 2e1a96d (Add component tasks+slice)
