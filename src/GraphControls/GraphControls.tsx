import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {
    setHistoryIndex,
    setIsEdit,
    setUnweightedGraph,
    setUnweightedGraphHistory,
} from "../actions";
import {connect} from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {aStar} from "../a_star/aStar";
import {bfs} from "../bfs/bfs";
import {dfs} from "../dfs/dfs";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import Button from "@material-ui/core/Button";
import Collapsible from 'react-collapsible';
import {cloneDeep} from "lodash";
import {bestFirstSearch} from "../bestFirstSearch/bestFirstSearch";


const GraphControlsContainer = styled(Paper)`
  display: flex;
  flex-flow: column;
  flex-grow: 9;
  padding: ${props => props.theme.minSpacing};
  overflow: hidden;
  &.MuiPaper-root {
    background-color: ${props => props.theme.secondaryColor} !important;
  }
  .handle{
    background-color: white;
  }
  .handle:hover {
    cursor: move;
  }
`

const ControlContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
`

const ControlSubsection = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column;
  align-self: center;
  justify-self: center;
  flex-grow: 1;
  width: 100%;
  padding: ${props => props.theme.minSpacing};
  border: 2px solid green;
`

const ControlSubTitle = styled.h3`
  color: ${props => props.theme.primaryColor};
  justify-self: center;
  align-self: center;
`

const PlayOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-self: center;
  align-self: center;
`

type GraphControlsProps = {
    controlsOpen: boolean
    index: number
    setIndex: (index: number) => void
    isEdit: boolean
    setEdit: (edit: boolean) => void
    unwGraph: any
    unwGraphHistory: any
    setUnwGraph: (graph: any) => void
    setUnwGraphHistory: (graphHistory: any) => void
}

const ControlParent = styled.div`
  display: flex;
  flex-flow: column;
`

const ControlHandleStyle = styled.div`
  display: flex;
  background-color: ${props => props.theme.primaryColor};
`

const CollapseToggle = styled(Collapsible)`
  display: flex;
  flex-grow: 1;
`

const CollapseHandle = () => {
    return (
        <ControlHandleStyle>Handle</ControlHandleStyle>
    )
}

const DragHandle = styled.div`
  display: flex;
  flex-grow: 1;
  border: 2px solid white;
`


const GraphControlsComponent = ({controlsOpen, index, setIndex, isEdit, setEdit, unwGraph, unwGraphHistory, setUnwGraph, setUnwGraphHistory}: GraphControlsProps) => {
    const [playback, setPlayback] = useState(100)
    const [isPlayback, setIsPlayback] = useState(true)

    const [algo, setAlgo] = useState("A*")
    const algoMap: any = {
                            "A*": aStar,
                            "Breadth First Search": bfs,
                            "Depth First Search": dfs,
                            "Best First Search": bestFirstSearch
                          }

    const playbackRates = [
        {
            label: 'Super Fast',
            value: '10',
        },
        {
            label: 'Pretty Fast',
            value: '100',
        },
        {
            label: 'Not Fast, But Not Slow Either',
            value: '500',
        },
        {
            label: 'Take It Easy',
            value: '1000',
        },
    ];

    const iconOptions: { [key: string]: string; } = {
        fontSize: "large"
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(index == unwGraphHistory.length){
                setIsPlayback(false)
            }
            if(!isEdit && isPlayback && index < unwGraphHistory.length) {
                updateGraphIndex(1)
            }
        }, playback);
        return () => clearTimeout(timer);
    })

    const updateGraphIndex = (increment: any) => {
        const maxIndex = unwGraphHistory.length
        setIndex(Math.max(0, Math.min(increment + index, maxIndex)))
    }

    const initHistoryMode = () => {
        if(isEdit) {
            setIndex(0)
            setUnwGraphHistory(algoMap[algo](unwGraph))
        }
        setEdit(false)
    }

    const playClick = () => {
        initHistoryMode()
        setIsPlayback(true)
    }

    const pauseClick = () => {
        setIsPlayback(false)
    }

    const skipBackClick = () => {
        setIsPlayback(false)
        updateGraphIndex(-1)
    }

    const skipForwardClick = () => {
        initHistoryMode()
        setIsPlayback(false)
        updateGraphIndex(1)
    }
    // effect to reset index whenever history changes

    const updateEditMode = () => {
        setIndex(0)
        setEdit(true)
    }

    const clearWalls = () => {
        if(isEdit) {
            const noWalls = cloneDeep(unwGraph)
            for (let i = 0; i < noWalls.length; i++) {
                for (let j = 0; j < noWalls[i].length; j++) {
                    noWalls[i][j].isWall = false
                }
            }
            setUnwGraph(noWalls)
        }
    }

    return (
        <ControlParent>
                <GraphControlsContainer>
                    <Typography >Controls</Typography>
                    <div>{`Step: ${index}/${unwGraphHistory.length}`}</div>
                    <ControlContainer>
                        <ControlSubsection>
                            <FormControl>
                                <InputLabel>Algorithm</InputLabel>
                                <Select
                                    value={algo}
                                    onChange={(event: any) => {
                                        setAlgo(event.target.value)
                                    }}
                                >
                                    {Object.keys(algoMap).map(algo => {
                                        return (<MenuItem value={algo}>{algo}</MenuItem>)
                                    })}

                                </Select>
                            </FormControl>
                        </ControlSubsection>
                        <ControlSubsection>
                            <FormControl>
                                <InputLabel>Playback Rate</InputLabel>
                                <Select
                                    value={playback}
                                    onChange={(event: any) => {
                                        setPlayback(event.target.value)
                                    }}>
                                    {playbackRates.map((opt: any) => {
                                        return <MenuItem value={opt.value}>{opt.label}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </ControlSubsection>
                        <ControlSubsection>
                            <PlayOptions>
                                <SkipPreviousIcon {...iconOptions} onClick={skipBackClick}/>
                                {(!isPlayback || isEdit) ? <PlayArrowIcon {...iconOptions} onClick={playClick}/>
                                    : <PauseIcon {...iconOptions} onClick={pauseClick}/>}
                                <SkipNextIcon {...iconOptions} onClick={skipForwardClick}/>
                            </PlayOptions>
                            <PlayOptions>
                                <Button onClick={updateEditMode}>Edit Mode</Button>
                                <Button onClick={clearWalls}>Clear Walls</Button>
                            </PlayOptions>
                        </ControlSubsection>
                    </ControlContainer>
                </GraphControlsContainer>
        </ControlParent>
        )
    }

const mapStateToProps = (state: any) => {
    return {
        isEdit: state.isEdit,
        index: state.historyIndex,
        unwGraph: state.unweightedGraph,
        unwGraphHistory: state.unweightedGraphHistory,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setIndex: (index: number) => {
            dispatch(setHistoryIndex(index))
        },
        setEdit: (isEdit: boolean) => {
            dispatch(setIsEdit(isEdit))
        },
        setUnwGraphHistory: (graphHistory: any) => {
            dispatch(setUnweightedGraphHistory(graphHistory))
        },
        setUnwGraph: (graph: any) => {
            dispatch(setUnweightedGraph(graph))
        }
    }
}

export const GraphControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphControlsComponent)

