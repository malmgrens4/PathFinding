import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {setIsEdit, setUnweightedGraphHistory, setUnweightedGraphNode} from "../actions";
import {aStar} from "../a_star/aStar";

const GraphNode = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  border: solid 1px black;
  
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
  width: 500px;
  height: 500px;
`

type UnweightedGraphProps = {
    onNodeClick: (node: any) => void
    unwGraph: any
    unwGraphHistory: any
    isEdit: boolean
    setEdit: (isEdit: boolean) => void
    setUnwGraphHistory: (history: any[]) => void
}
const UnwGraphComponent = ({onNodeClick, setUnwGraphHistory, unwGraph,
                               unwGraphHistory, isEdit, setEdit}: UnweightedGraphProps) => {

    const [index, setIndex] = useState(0)

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


    const onNodeSelect = () => {
        // mouse still down
        // are you on the start or goal node?
        // if yes I want to start dragging whichever node it is
        // set a state that lets the view know to set the node state on mouse over (and reset on mouse exit)

        
        // did you start dragging?
        //
    }

    return (
        <>
            <Graph>
                {getCurrentGraph().map((row: any, i: number) => {
                    return (<GraphRow key={i}>
                                {row.map((node: any) => {
                                    return(
                                        <GraphNode className={Object.keys(node).filter(key => node[key]).join(" ")}
                                                   key={`${node.x} ${node.y}`}
                                                   onClick={() => onNodeClick(toggleIsWall(node))}>
                                                <div>
                                                {node.x}, {node.y}
                                                </div>
                                                <div>
                                                f={node.f}, g={node.g}
                                                </div>
                                        </GraphNode>
                                    )
                                })}
                            </GraphRow>)
                })}
            </Graph>
            <div>{index}</div>
            <button onClick={() => setIndex(index - 1)}>Step Back</button>
            <button onClick={() => setIndex(index + 1)}>Step Forward</button>
            <button onClick={() => setUnwGraphHistory(aStar({x: 0, y:0},{x: 5, y: 5}, unwGraph))}>Generate History</button>
            <button onClick={() => setEdit(!isEdit)}>Toggle Edit</button>
        </>
    )
}

const mapStateToProps = (state: any) => {
    console.dir(state)
    return {
        unwGraph: state.unweightedGraph,
        unwGraphHistory: state.unweightedGraphHistory,
        isEdit: state.isEdit
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        onNodeClick: (node: any) => {
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

