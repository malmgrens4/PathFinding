import { combineReducers } from "redux"
import { graphType, unweightedGraph,
    unweightedGraphHistory, weightedGraph,
    weightedGraphHistory} from "./graph"

export default combineReducers({
    graphType,
    unweightedGraph,
    unweightedGraphHistory,
    weightedGraph,
    weightedGraphHistory
})
