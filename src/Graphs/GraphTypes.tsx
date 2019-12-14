export type WGraphNeighbor = {
    node: WGraphNode
    weight: number
}

export type WGraphNode = {
    id: string
    isStart: boolean
    isGoal: boolean
    isVisited: boolean
    isCurrent: boolean
    isNeighbor: boolean
    neighbors: Record<string, WGraphNeighbor>
    parent: WGraphNode | null
}

export type WGraphI = Record<string, WGraphNode>

export type GraphType = 'WEIGHTED' | 'UNWEGIHTED'
