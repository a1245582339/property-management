import { Dispatch } from 'react'
import { useDispatch as originUseDispatch, useSelector as originUseSelector } from 'react-redux'
import { createStore, compose } from 'redux'
//处理redux的异步任务的中间件
import reducer, { Action, State } from './reducer'

export const store = createStore(reducer, compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
))

export const useSelector = <T>(selector: (state: State) => T): T => {
    return originUseSelector(selector)
}

export const useDispatch: () => Dispatch<Action> = () => {
    return originUseDispatch()
}
