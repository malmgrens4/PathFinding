const SET_UNWEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_WEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_WEIGHTED_GRAPH_HISTORY = 'SET_WEIGHTED_GRAPH_HISTORY'
const SET_UNWEIGHTED_GRAPH_HISTORY = 'SET_UNWEIGHTED_GRAPH_HISTORY'
const SET_UNWEIGHTED_GRAPH_NODE = 'SET_UNWEIGHTED_GRAPH_NODE'
const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'
const SET_IS_EDIT = 'SET_IS_EDIT'

export const graphType = (graphType: string) => ({
    type: SET_GRAPH_TYPE,
    graphType
})

export const setIsEdit = (isEdit: boolean) => ({
    type: SET_IS_EDIT,
    isEdit
})

export const setUnweightedGraph = (unweightedGraph: any) => ({
    type: SET_UNWEIGHTED_GRAPH,
    unweightedGraph
})

export const setUnweightedGraphNode = (node: any) => ({
    type: SET_UNWEIGHTED_GRAPH_NODE,
    node
})

export const setUnweightedGraphHistory = (unweightedGraphHistory: any) => ({
    type: SET_UNWEIGHTED_GRAPH_HISTORY,
    unweightedGraphHistory
})

export const setWeightedGraph = (weightedGraph: any) => ({
    type: SET_WEIGHTED_GRAPH,
    weightedGraph
})

export const setWeightedGraphHistory = (weightedGraphHistory: any) => ({
    type: SET_WEIGHTED_GRAPH_HISTORY,
    weightedGraphHistory
})

export const setHistoryIndex = (historyIndex: number) => ({
    type: "SET_HISTORY_INDEX",
    historyIndex
})



