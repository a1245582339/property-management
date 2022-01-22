import { AdminUserInfo } from "../page/Dashboard"

type SetAdminUserAction = {
    type: 'SET_ADMIN'
    payload: AdminUserInfo
}

type ClearAdminUserAction = {
    type: 'CLEAR_ADMIN'
}

export type Action = SetAdminUserAction | ClearAdminUserAction

export type State = {
    adminUserInfo: AdminUserInfo
}

const init = {
    adminUserInfo: {
        _id: '',
        email: '',
        name: '',
        role: 0
    }
}


export default (state = init, action: Action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return { ...state, adminUserInfo: action.payload }
        case 'CLEAR_ADMIN':
            return { ...state, adminUserInfo: init.adminUserInfo }
        default:
            return state
    }
}