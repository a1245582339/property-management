import { Order } from "../page/Order/Order"

type UserInfo = {}
type SetOrderAction = {
    type: 'SET_ORDER_LIST'
    payload: Order[]
}

type LoadMoreOrderAction = {
    type: 'MORE_ORDER_LIST',
    payload: Order[]
}

export type Action = SetOrderAction | LoadMoreOrderAction

export type State = {
    orderList: Order[]
}

const init = {
    orderList: [] as Order[]
}


export default (state = init, action: Action) => {
    switch (action.type) {
        case 'SET_ORDER_LIST':
            return { ...state, orderList: action.payload }
        case 'MORE_ORDER_LIST':
            return { ...state, orderList: { ...state.orderList, ...action.payload } }
        default:
            return state
    }
}