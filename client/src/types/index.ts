type TypeUsersApp = {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
  getUsers: any;
  deleteUsers: any;
};

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
  id?:number | null;
  body: string;
  isDone: boolean;
  deadline: string;
  createdAt?: any;
  updatedAt?: Date;
};

type TypeMapStateToProps = (state: any) => string[];

interface IUsersState {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
}

interface ITasksState {
  tasks: TypeTask[];
  tempTask: TypeTask;
  isFetching: boolean;
  error: string | null | undefined | unknown;
  isEmpty: boolean;
  isOpenNewTask: boolean;
  isOpenUpdateTask: boolean;
}

enum EnumGender {
  male,
  female,
  other,
}

export type { IUsersState, ITasksState, ITasksApp, TypeMapStateToProps, TypeUsersApp, TypeUser, TypeTask };
