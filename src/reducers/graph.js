const SET_UNWEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_WEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_WEIGHTED_GRAPH_HISTORY = 'SET_WEIGHTED_GRAPH_HISTORY'
const SET_UNWEIGHTED_GRAPH_HISTORY = 'SET_UNWEIGHTED_GRAPH_HISTORY'
const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'

export const graphType = (state = [], action) => {
    switch(action.type) {
        case SET_GRAPH_TYPE:
            return [
                ...state,
                {
                    graphType: action.graphType
                }
            ]
    }
}

export const unweightedGraph = (state = [], action) => {
    switch(action.type) {
        case SET_UNWEIGHTED_GRAPH:
            return [
                ...state,
                {
                    unweightedGraph: action.unweightedGraph
                }
            ]
    }
}

export const unweightedGraphHistory = (state = [], action) => {
    switch(action.type) {
        case SET_UNWEIGHTED_GRAPH_HISTORY:
            return [
                ...state,
                {
                    unweightedGraphHistory: action.unweightedGraphHistory
                }
            ]
    }
}

export const weightedGraph = (state = [], action) => {
    switch(action.type) {
        case SET_WEIGHTED_GRAPH:
            return [
                ...state,
                {
                    weightedGraph: action.weightedGraph
                }
            ]
    }
}

export const weightedGraphHistory = (state = [], action) => {
    switch(action.type) {
        case SET_WEIGHTED_GRAPH_HISTORY:
            return [
                ...state,
                {
                    weightedGraphHistory: action.weightedGraphHistory
                }
            ]
    }
}