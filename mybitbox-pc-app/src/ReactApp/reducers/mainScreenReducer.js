import {
    TOGGLE_SCREEN
} from '../const/index'

const MainScreenReducer = (screen='mywallet', action) => {
    console.log(action);
    switch (action.type) {
        case TOGGLE_SCREEN:
            return action.screen
        default:
            return screen
    }
}

export default MainScreenReducer