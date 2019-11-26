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
  & * {
    pointer-events: none;
  }
  &.isWall {
    background-color: #282c34;
  }
  
  &.isSelected {
    background-color: lightblue;
  }
  
  &.isStart {
    background-color: forestgreen;
  }
  
  &.isNeighbor {
    background-color: lightcoral;
  }
  
  &.isVisited {
    background-color: dodgerblue; 
  }
  
  &.isCurrent {
    background-color: orange;
  }
  
  &.isGoal {
    background-color: firebrick;
  }
  
  &.isPath {
    background-color: goldenrod;
  }
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

type UnweightedGraphProps = {
    updateNode: (node: any) => void
    unwGraph: any
    unwGraphHistory: any
    isEdit: boolean
    setEdit: (isEdit: boolean) => void
    setUnwGraphHistory: (history: any[]) => void
}

interface IGraphNode {
    node: any
    text: string
    x: number,
    y: number,
    fill: string,
    onClick: any,
    onMouseDown: any
    onDragEnter: any
}

class GraphNode extends React.Component<IGraphNode, IGraphNode> {

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        return !_.isEqual(this.props.node, nextProps.node)
    }

    render() {
        return(
            <GraphNodeContainer
                                className={Object.keys(this.props.node).filter(key => this.props.node[key]).join(" ")}
                                x={this.props.x}
                                y={this.props.y}
                                width={50}
                                height={50}
                                fill={this.props.fill}
                                stroke={'green'}
                                onClick={this.props.onClick}
                                onMouseDown={this.props.onMouseDown}
                                >

            </GraphNodeContainer>
        )
    }

}



const UnwGraphComponent = ({updateNode, setUnwGraphHistory, unwGraph,
                               unwGraphHistory, isEdit, setEdit}: UnweightedGraphProps) => {

    const [index, setIndex] = useState(0)
    const [draggedNode, setDraggedNode] = useState()
    const [startNode, setStartNode] = useState({x: 0, y:0})
    const [goalNode, setGoalNode] = useState({x: 5, y: 5})
    const [updateQueue, setUpdateQueue] = useState([])

    const updateDraggedNode = (node: any) => {
        const nodeClone = _.cloneDeep(node)
        setDraggedNode(nodeClone)
    }

    const toggleIsWall = (node: any) => {
        let newNode = _.cloneDeep(node)
        newNode.isWall = !node.isWall
        updateNode(newNode)
        return newNode
    }

    const getCurrentGraph = () => {
        if(isEdit){
            return unwGraph
        }
        return unwGraphHistory[index]
    }

    const handleDragEnter = (node: any) => {
        let newNode = node
        if(!!draggedNode){
            if(draggedNode.isGoal) {
                newNode['isGoal'] = true
            }
            else {
                if (draggedNode.isStart) {
                    newNode['isStart'] = true
                }
                else {
                    if (draggedNode.isWall || !draggedNode.isWall) {
                        if(!newNode.isGoal && !newNode.isStart) {
                            newNode.isWall = !draggedNode.isWall
                        }
                    }
                }
            }
            setUpdateQueue(updateQueue => updateQueue.concat(newNode))
        }
    }

    const handleDragLeave = (node: any) => {
        let newNode = _.cloneDeep(node)
        if(!!draggedNode){
            if(draggedNode.isGoal) {
                newNode['isGoal'] = false
            }
            else if(draggedNode.isStart) {
                newNode['isStart'] = false
            }
        }
        setUpdateQueue(updateQueue => updateQueue.concat(newNode))
    }

    const handleDrop = (node: any) => {
        if(!!draggedNode) {
            let newNode = _.cloneDeep(node)
            let newDragged = _.cloneDeep(draggedNode)
            if (newDragged.isGoal) {
                newDragged.isGoal = false
                newNode.isGoal = true
                newNode.isWall = false
                setGoalNode(newNode)
            }
            if (draggedNode.isStart) {
                newDragged.isStart = false
                newNode.isStart = true
                newNode.isWall = false
                setStartNode(newNode)
            }
            setUpdateQueue(updateQueue => updateQueue.concat(newNode))
            setUpdateQueue(updateQueue => updateQueue.concat(newNode))

            setDraggedNode(undefined)
        }
    }

    const handleDragOver = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    }

    const handleDragEnd = (node: any) => {
        let newNode = _.cloneDeep(node)
        return
    }

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
                                            fill={node.isStart ? 'green' : node.isGoal ? 'red' : node.isWall ? 'black' : 'white'}
                                            onClick={() => {updateNode(toggleIsWall(node))}}
                                            onMouseDown={() => setDraggedNode(node)}
                                            onDragEnter={() => handleDragEnter(node)}
                                        ></GraphNode>
                                    )
                                })}

                            </GraphRow>)
                })}
            </Graph>
            <div>{index}</div>
            <button onClick={() => setIndex(index - 1)}>Step Back</button>
            <button onClick={() => setIndex(index + 1)}>Step Forward</button>
            <button onClick={() => setUnwGraphHistory(aStar(startNode, goalNode, unwGraph))}>Generate History</button>
            <button onClick={() => setEdit(!isEdit)}>Toggle Edit</button>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        unwGraph: state.unweightedGraph,
        unwGraphHistory: state.unweightedGraphHistory,
        isEdit: state.isEdit
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

