import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {setUnweightedGraphNode} from "../actions";

const SET_UNWEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'

const GraphNode = styled.div`
  display: flex;
  flex-grow: 1;
  border: solid 1px black;
  
  &.wall {
    background-color: #282c34;
  }
  
  &.isSelected {
    background-color: deepskyblue;
  }
  
  &.isGoal {
    background-color: firebrick;
  }
  
  &.isStart {
    background-color: forestgreen;
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
    onNodeClick: Function,
    unwGraph: any
}
const UnwGraphComponent = ({onNodeClick, unwGraph}: UnweightedGraphProps) => {
    const toggleIsWall = (node: any) => {
        node.isWall = !node.isWall
        return node
    }

    const getClassList = () => {

    }

    return (
        <Graph>
            {unwGraph.map((row: any, i: number) => {
                return (<GraphRow key={i}>
                            {row.map((node: any) => {
                                return(
                                    <GraphNode className={Object.keys(node).filter(key => node[key]).join(" ")}
                                               key={`${node.x} ${node.y}`}
                                               onClick={() => onNodeClick(toggleIsWall(node))}>
                                        {node.x}, {node.y}
                                    </GraphNode>
                                )
                            })}
                        </GraphRow>)
            })}
        </Graph>
    )
}

const mapStateToProps = (state: any) => {
    console.dir(state)
    return {
        unwGraph: state.unweightedGraph
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        onNodeClick: (node: any) => {
            dispatch(setUnweightedGraphNode(node))
        }
    }
}

export const UnwGraph = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnwGraphComponent)

