import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {setIsEdit, setUnweightedGraphHistory, setUnweightedGraphNode} from "../actions";
import {aStar} from "../a_star/aStar";

const GraphNodeContainer = styled.div`
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

const GraphRow = styled.div`
  display: flex;
  flex-grow: 1;
`

const Graph = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
`

type UnweightedGraphProps = {
    updateNode: (node: any) => void
    unwGraph: any
    unwGraphHistory: any
    isEdit: boolean
    setEdit: (isEdit: boolean) => void
    setUnwGraphHistory: (history: any[]) => void
}


const getDeepCopyGraph = (graph: any) => {
    return graph.slice().map((row: any) => {
        return row.slice().map((node: any) => {
            let target = JSON.parse(JSON.stringify(node))
            return target
        })
    })
}

interface IGraphNode {
    node: any
    text: string
    onClick: any
    onDragStart: any
    onDragEnter: any
    onDragLeave: any
    onDrop: any
    draggable: boolean
    onDragOver: any
}

class GraphNode extends React.PureComponent<IGraphNode, IGraphNode> {

    // shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
    //     if(!!nextState){
    //         return nextProps.node != nextState.node
    //     }
    //     return true
    // }

    render() {
        return(
            <GraphNodeContainer
                                onClick={this.props.onClick}
                                onDragStart={this.props.onDragStart}
                                onDragEnter={this.props.onDragEnter}
                                onDragLeave={this.props.onDragLeave}
                                onDrop={this.props.onDrop}
                                className={Object.keys(this.props.node).filter(key => this.props.node[key]).join(" ")}
                                onDragOver={this.props.onDragOver}
                                draggable>
                {this.props.text}
            </GraphNodeContainer>
        )
    }

}



const UnwGraphComponent = ({updateNode, setUnwGraphHistory, unwGraph,
                               unwGraphHistory, isEdit, setEdit}: UnweightedGraphProps) => {

    const [index, setIndex] = useState(0)
    const [draggedNode, setDraggedNode] = useState()
    const [startNode, setStartNode] = useState({x: 0, y:0})
    const [goalNode, setGoalNode] = useState({x: 5, y:5})
    const [graph, setGraph] = useState()

    const toggleIsWall = (node: any) => {
        let newNode = node
        newNode.isWall = !node.isWall
        return newNode
    }

    const getCurrentGraph = () => {
        if(isEdit){
            return unwGraph
        }
        return unwGraphHistory[index]
    }

    const handleDragEnter = (node: any) => {
        if(!!draggedNode){
            if(draggedNode.isGoal) {
                node['isGoal'] = true
            }
            else {
                if (draggedNode.isStart) {
                    node['isStart'] = true
                }
                else {
                    if (draggedNode.isWall || !draggedNode.isWall) {
                        node.isWall = !draggedNode.isWall
                    }
                }
            }
            updateNode(node)
        }
    }

    const handleDragLeave = (node: any) => {
        if(!!draggedNode){
            if(draggedNode.isGoal) {
                node['isGoal'] = false
            }
            else if(draggedNode.isStart) {
                node['isStart'] = false
            }
        }
        updateNode(node)
    }

    const handleDrop = (node: any) => {
        console.log(`${node.x} ${node.y}`)
        if(!!draggedNode) {
            if (draggedNode.isGoal) {
                draggedNode.isGoal = false
                node.isGoal = true
                setGoalNode(node)
            }
            if (draggedNode.isStart) {
                draggedNode.isStart = false
                node.isStart = true
                setStartNode(node)
            }
        }
        setDraggedNode(undefined)
        updateNode(node)
        updateNode(draggedNode)
        // this is when we update all the nodes we touched

    }

    const onDragOver = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <>
            <Graph>
                {getCurrentGraph().map((row: any, i: number) => {
                    return (<GraphRow key={i}>
                                {row.map((node: any) => {
                                    return(
                                        <GraphNode
                                                    node={node}
                                                    text={`${node.x} ${node.y}`}
                                                   key={`${node.x} ${node.y}`}
                                                   onClick={() => updateNode(toggleIsWall(node))}
                                                   onDragStart={() => {console.log("drag start"); setDraggedNode(node)}}
                                                   onDragEnter={() => {handleDragEnter(node)}}
                                                   onDragLeave={() => {handleDragLeave(node)}}
                                                   onDrop={() => {handleDrop(node)}}
                                                    onDragOver={onDragOver}
                                                   draggable/>
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

