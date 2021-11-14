import { Action } from 'redux'

export interface ITask<T> {
  payload: T
}

export interface TaskAction<T> extends Action, ITask<T> {
  type: string
}
