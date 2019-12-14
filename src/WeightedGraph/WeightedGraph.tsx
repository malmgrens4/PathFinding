import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {WGraphNeighbor, WGraphNode, WGraphI} from "../Graphs/GraphTypes";
import { connect } from 'react-redux'
import _ from 'lodash'
import ReactResizeDetector from "react-resize-detector";
import Draggable from 'react-draggable';
import {setWeightedGraphNode} from "../actions";
import {node} from "prop-types";
import {StyleSheet} from "react-native";


const GraphNode = styled.div`
    position: absolute;
    border: 2px solid;
    & * {
    pointer-events: none;
  }
  
  &.isWall {
    background: #282c34;
  }
  
  &.isSelected {
    background: lightblue;
  }
  
  &.isNeighbor {
    background: lightcoral;
  }
  
  &.isVisited {
    background: dodgerblue; 
  }
  
  &.isStart {
    background: forestgreen;
  }
  
  &.isCurrent {
    background: orange;
  }
  
  &.isGoal {
    background: firebrick;
  }
  
  &.isPath {
    background: goldenrod;
  }
`

const GraphContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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
    const [dimensions, setDimensions] = useState<Dimension>({w: 1920, h: 1080})
    const [radius, setRadius] = useState<number>(1920/6)
    const SPACING_CONSTANT: number = 2
    const WIDTH_SPLIT: number = 6
    const NODES_PER_ROW: number = Math.floor(WIDTH_SPLIT/SPACING_CONSTANT)

    useEffect(() => {
        setRadius(dimensions.w/WIDTH_SPLIT)
    }, [dimensions])

    const getGraph = () => {
        if(isEdit){
            return wGraph
        }
        return wGraph
    }

    const updateDimensions = (w: number, h: number) => {
        setDimensions({
            w,
            h
        })
    }

    return(
        <GraphContainer>
            <div>{radius}</div>

            <ReactResizeDetector handleWidth handleHeight onResize={updateDimensions}>
                {Object.keys(getGraph()).map((node: string, i: number) => {
                    return (
                        <Draggable key={node}  position={{x: (radius * ((i%NODES_PER_ROW) * SPACING_CONSTANT)), y: (radius * Math.floor((i/NODES_PER_ROW)) * SPACING_CONSTANT)}}>
                            <GraphNode style={{width: radius, height: radius}}>{node} x: {(radius * ((i%NODES_PER_ROW) * SPACING_CONSTANT))} y:{(radius * Math.floor((i/NODES_PER_ROW)) * SPACING_CONSTANT)} </GraphNode>
                        </Draggable>
                    )
                })}
            </ReactResizeDetector>
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
