import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setUnweightedGraphNode } from "../actions";
import _ from 'lodash'
import ReactResizeDetector from "react-resize-detector";
import {cloneDeep} from "@babel/types";

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
  
  &.isNeighbor {
    fill: lightcoral;
  }
  
  &.isVisited {
    fill: dodgerblue; 
  }
  
  &.isStart {
    fill: forestgreen;
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
  height: 100%;
`



type GraphNodeProps = {
    node: any
    nodeWidth: number,
    nodeHeight: number,
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
                            width={props.nodeWidth}
                            height={props.nodeHeight}
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
    historyIndex: number
}

const UnwGraphComponent = ({updateNode, unwGraph,
                               unwGraphHistory, isEdit, historyIndex}: UnweightedGraphProps) => {

    const [draggedNode, setDraggedNode] = useState()
    const [startNode, setStartNode] = useState({x: 0, y:0})
    const [goalNode, setGoalNode] = useState({x: 5, y: 5})
    const [mouseDown, setMouseDown] = useState(false)
    const [nodeBelow, setNodeBelow] = useState()
    const [nodeDimension, setNodeDimension] = useState(50)


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

    const handleMouseEnter = (node: any) => {
        if(!!draggedNode && mouseDown){
            let newNode = _.cloneDeep(node)
            if(draggedNode.isGoal && !newNode.isStart) {
                setNodeBelow(node)
                newNode.isGoal = true
                updateNode(newNode)
            }
            else {
                if (draggedNode.isStart && !newNode.isGoal) {
                    setNodeBelow(node)
                    newNode['isStart'] = true
                    updateNode(newNode)
                }
                else {
                    if(!newNode.isGoal && !newNode.isStart) {
                        setNodeBelow(node)
                        newNode.isWall = !draggedNode.isWall
                        updateNode(newNode)
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

    const handleMouseDown = (node: any) => {
        if(!draggedNode) {
            setMouseDown(true);
            setDraggedNode(node);
        }
    }

    const updateNodeDimensions = (width: number, height: number) => {
        if(!!unwGraph) {
            if(unwGraph.length > 0 ) {
                setNodeDimension(width / unwGraph[0].length)
            }
        }
    }

    return (
        <div style={{width: '100%', height: '1000px'}}>
            <ReactResizeDetector handleWidth handleHeight onResize={updateNodeDimensions}>
                <Graph>
                    {getCurrentGraph().map((row: any) => {
                        return (<GraphRow>
                                    {row.map((node: any) => {
                                            return isEdit ?
                                                <GraphNode
                                                    node={node}
                                                    text={`${node.x} ${node.y}`}
                                                    key={`${node.x} ${node.y}`}
                                                    x={node.x * nodeDimension}
                                                    y={node.y * nodeDimension}
                                                    nodeWidth={nodeDimension}
                                                    nodeHeight={nodeDimension}
                                                    onClick={() => {
                                                        toggleIsWall(node)
                                                    }}
                                                    onMouseDown={() => {
                                                        handleMouseDown(node)
                                                    }}
                                                    onMouseUp={() => {
                                                        handleMouseUp(node)
                                                    }}
                                                    onMouseEnter={() => handleMouseEnter(node)}
                                                    onMouseLeave={() => handleMouseLeave(node)}
                                                ></GraphNode>
                                                : <GraphNodeContainer
                                                        className={Object.keys(node).filter(key => node[key]).join(" ")}
                                                        x={node.x * nodeDimension}
                                                        y={node.y * nodeDimension}
                                                        width={nodeDimension}
                                                        height={nodeDimension}
                                                ></GraphNodeContainer>
                                        })
                                    })}
                                </GraphRow>)

                    })}
                </Graph>
            </ReactResizeDetector>
        </div>
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

    }
}

export const UnwGraph = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnwGraphComponent)

