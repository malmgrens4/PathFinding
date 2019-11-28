import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {setIsEdit, setUnweightedGraphHistory, setUnweightedGraphNode} from "../actions";
import {aStar} from "../a_star/aStar";
import _ from 'lodash'

const NodeContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
`
const GraphNodeContainer = styled.rect`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  border: solid 1px black;
  fill: whitesmoke;
  stroke: black;
  & * {
    pointer-events: none;
  }
  
  
  &.isWall {
    fill: #282c34;
  }
  
  &.isSelected {
    fill: lightblue;
  }
  
  &.isStart {
    fill: forestgreen;
  }
  
  &.isNeighbor {
    fill: lightcoral;
  }
  
  &.isVisited {
    fill: dodgerblue; 
  }
  
  &.isCurrent {
    fill: orange;
  }
  
  &.isGoal {
    fill: firebrick;
  }
  
  &.isPath {
    fill: goldenrod;
  }
  
  transition: all .15s ease-in-out;
  transform-origin: center;
  
`

const GraphRow = styled.svg`
  display: flex;
  flex-grow: 1;
`

const Graph = styled.svg`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 1000px;
`



type GraphNodeProps = {
    node: any
    text: string
    x: number,
    y: number,
    onClick: any,
    onMouseDown: any
    onMouseUp: any
    onMouseEnter: any
    onMouseLeave: any
}

const GraphNode  = React.memo(function(props: GraphNodeProps) {

    return(
        <GraphNodeContainer
                            className={Object.keys(props.node).filter(key => props.node[key]).join(" ")}
                            x={props.x}
                            y={props.y}
                            width={50}
                            height={50}
                            onClick={props.onClick}
                            onMouseDown={props.onMouseDown}
                            onMouseUp={props.onMouseUp}
                            onMouseEnter={props.onMouseEnter}
                            onMouseLeave={props.onMouseLeave}
                            >

        </GraphNodeContainer>
    )

})

type UnweightedGraphProps = {
    updateNode: (node: any) => void
    unwGraph: any
    unwGraphHistory: any
    isEdit: boolean
    setEdit: (isEdit: boolean) => void
    setUnwGraphHistory: (history: any[]) => void
    historyIndex: number
}

const UnwGraphComponent = ({updateNode, setUnwGraphHistory, unwGraph,
                               unwGraphHistory, isEdit, setEdit, historyIndex}: UnweightedGraphProps) => {

    const [draggedNode, setDraggedNode] = useState()
    const [startNode, setStartNode] = useState({x: 0, y:0})
    const [goalNode, setGoalNode] = useState({x: 5, y: 5})
    const [mouseDown, setMouseDown] = useState(false)
    const [nodeBelow, setNodeBelow] = useState()

    const nodesSamePosition = (nodeA: any, nodeB: any) => {
        return nodeA.x === nodeB.x && nodeA.y === nodeB.y
    }

    const toggleIsWall = (node: any) => {
        if (!nodesSamePosition(node, startNode) && !nodesSamePosition(node, goalNode)) {
            let newNode = _.cloneDeep(node)
            newNode.isWall = !node.isWall
            updateNode(newNode)
        }
    }

    const getCurrentGraph = () => {
        if(isEdit){
            return unwGraph
        }
        if(historyIndex < unwGraphHistory.length){
            return unwGraphHistory[historyIndex]
        }
        else{
            return unwGraphHistory[unwGraphHistory.length - 1]
        }

    }

    const handleMouseOver = (node: any) => {
        if(!!draggedNode && mouseDown){
            setNodeBelow(node)
            let newNode = _.cloneDeep(node)
            if(draggedNode.isGoal && !newNode.isStart) {
                newNode.isGoal = true
                updateNode(newNode)
            }
            else {
                if (draggedNode.isStart && !newNode.isGoal) {
                    newNode['isStart'] = true
                    updateNode(newNode)
                }
                else {
                    if (draggedNode.isWall || !draggedNode.isWall) {
                        if(!newNode.isGoal && !newNode.isStart) {
                            newNode.isWall = !draggedNode.isWall
                            updateNode(newNode)
                        }
                    }
                }
            }

        }
    }

    const handleMouseUp = (node: any) => {
        if(!!draggedNode) {
            let newNode = _.cloneDeep(node)
            let newDragged = _.cloneDeep(draggedNode)
            if (draggedNode.isGoal) {
                newDragged.isGoal = false
                newNode.isGoal = true
                newNode.isWall = false
                if(newNode.isStart) {
                    //Node is overwritten by the goal before this shows up. So prevent overwriting in the mouseOver logic.
                    newDragged.isStart = true
                    newNode.isStart = false
                    setStartNode(newDragged)
                }
                setGoalNode(newNode)
                updateNode(newDragged)
                updateNode(newNode)
            }
            if (draggedNode.isStart) {
                newDragged.isStart = false
                newNode.isStart = true
                newNode.isWall = false
                if(newNode.isGoal) {
                    newDragged.isGoal = true
                    newNode.isGoal = false
                    setGoalNode(newDragged)
                }
                setStartNode(newNode)
                updateNode(newDragged)
                updateNode(newNode)
            }
            setDraggedNode(undefined)
        }
    }

    const handleMouseLeave = (node: any) => {
        if(!!draggedNode && mouseDown){
            let newNode = _.cloneDeep(node)

            if(draggedNode.isGoal) {
                newNode['isGoal'] = false
                updateNode(newNode)
            }
            else {
                if(draggedNode.isStart) {
                    newNode['isStart'] = false
                    updateNode(newNode)
                }
                else {
                    if(node === draggedNode){
                        newNode.isWall = !draggedNode.isWall
                    }
                }
            }
            updateNode(newNode)
        }
    }

    // need to be able to update the walls only once per node. Mouse Over will execute too many times.
    return (
        <>
            <Graph>
                {getCurrentGraph().map((row: any, i: number) => {
                    return (<GraphRow>
                                {row.map((node: any, j: number) => {
                                    return(
                                        <GraphNode
                                            node={node}
                                            text={`${node.x} ${node.y}`}
                                            key={`${node.x} ${node.y}`}
                                            x={node.x * 50}
                                            y={node.y * 50}
                                            onClick={() => {toggleIsWall(node)}}
                                            onMouseDown={() => {setMouseDown(true); setDraggedNode(node);}}
                                            onMouseUp={() => {handleMouseUp(node)}}
                                            onMouseEnter={() => handleMouseOver(node)}
                                            onMouseLeave={() => handleMouseLeave(node)}
                                        ></GraphNode>
                                    )
                                })}

                            </GraphRow>)
                })}
            </Graph>
            <div>{historyIndex}</div>
            <button onClick={() => setUnwGraphHistory(aStar(startNode, goalNode, unwGraph))}>Generate History</button>
            <button onClick={() => setEdit(!isEdit)}>Toggle Edit</button>
            <div> {mouseDown ? 'mouse down': 'mouse up'} </div>
            {draggedNode && <div> {`${draggedNode.isWall} ${draggedNode.x} ${draggedNode.y}` }</div>}
            {nodeBelow && <div> {`${nodeBelow.isWall} ${nodeBelow.x} ${nodeBelow.y} ${nodeBelow.isGoal ? 'goal' : 'n'} ${nodeBelow.isStart ? 'start' : 'n'}` }</div>}
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        unwGraph: state.unweightedGraph,
        unwGraphHistory: state.unweightedGraphHistory,
        isEdit: state.isEdit,
        historyIndex: state.historyIndex
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        updateNode: (node: any) => {
            dispatch(setUnweightedGraphNode(node))
        },
        setEdit: (isEdit: boolean) => {
            dispatch(setIsEdit(isEdit))
        },
        setUnwGraphHistory: (graphHistory: any) => {
            dispatch(setUnweightedGraphHistory(graphHistory))
        }
    }
}

export const UnwGraph = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnwGraphComponent)

