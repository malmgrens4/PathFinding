import { combineReducers } from "redux"
import { graphType, isEdit, unweightedGraph,
    unweightedGraphHistory, weightedGraph,
    weightedGraphHistory} from "./graph"
import {historyIndex} from "./history";

export default combineReducers({
    graphType,
    isEdit,
    unweightedGraph,
    unweightedGraphHistory,
    weightedGraph,
    weightedGraphHistory,
    historyIndex
})
