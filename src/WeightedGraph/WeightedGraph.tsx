import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {WGraphNeighbor, WGraphNode, WGraphI} from "../Graphs/GraphTypes";
import { connect } from 'react-redux'
import Draggable from 'react-draggable';
import {setWeightedGraphNode} from "../actions";

const GraphNode = styled.div`
    border: 2px solid;
`

const GraphContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const GraphNodeContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
`


type Dimension = {
    w: number,
    h: number
}

type WeightedGraphProps = {
    wGraph: WGraphI,
    wGraphHistory: WGraphI[],
    isEdit: any,
    historyIndex: number
}

const WeightedGraph = ({wGraph, wGraphHistory, isEdit, historyIndex}: WeightedGraphProps) => {
    const getGraph = () => {
        if(isEdit){
            return wGraph
        }
        return wGraph
    }
    
    const [graph, setGraph] = useState(getGraph())

    return(
        <GraphContainer>
            {Object.keys(getGraph()).map((nodeId: string, i: number) => {
                return(
                    <GraphNodeContainer>
                        <Draggable>
                            <GraphNode>{nodeId}</GraphNode>
                        </Draggable>
                    </GraphNodeContainer>
                )
            })}
        </GraphContainer>
    )
}

const mapStateToProps = (state: any) => {
    return {
        wGraph: state.weightedGraph,
        wGraphHistory: state.weightedGraphHistory,
        isEdit: state.isEdit,
        historyIndex: state.historyIndex
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        updateNode: (node: any) => {
            dispatch(setWeightedGraphNode(node))
        },

    }
}

export const WGraph = connect(
    mapStateToProps,
    mapDispatchToProps
)(WeightedGraph)
