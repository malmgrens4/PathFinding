import { combineReducers } from "redux"
import { graphType, isEdit, unweightedGraph,
    unweightedGraphHistory, weightedGraph,
    weightedGraphHistory} from "./graph"

export default combineReducers({
    graphType,
    isEdit,
    unweightedGraph,
    unweightedGraphHistory,
    weightedGraph,
    weightedGraphHistory
})
