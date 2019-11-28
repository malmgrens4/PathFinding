const SET_HISTORY_INDEX = 'SET_HISTORY_INDEX'

export const historyIndex = (state = 0, action) => {
    switch(action.type) {
        case SET_HISTORY_INDEX:
            return action.historyIndex

        default:
            return state
    }
}