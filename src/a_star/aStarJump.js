import {cloneDeep} from "lodash";

let graphHistory = []

export const aStarJump = (_graph) => {
    let graph = cloneDeep(_graph)
    graphHistory = []
    let startNode = {}
    let goalNode = {}
    for (let y = 0; y < graph.length; y++) {
        for (let x = 0; x < graph[y].length; x++) {
            if (graph[y][x].isStart) {
                startNode = graph[y][x]
            }
            if (graph[y][x].isGoal) {
                goalNode = graph[y][x]
            }
        }
    }
    if (!startNode || !goalNode) {
        console.log("Need a start and goal node.")
        return
    }
}