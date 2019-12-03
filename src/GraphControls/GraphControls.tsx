import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {setHistoryIndex, setIsEdit, setUnweightedGraphHistory} from "../actions";
import {connect} from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {aStar} from "../a_star/aStar";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from "@material-ui/core/Button";

const GraphControlsContainer = styled(Paper)`
  display: flex;
  flex-flow: column;
  padding: ${props => props.theme.minSpacing};
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
  flex-flow: column;
  align-self: center;
  justify-self: center;
  padding: ${props => props.theme.minSpacing};
`

const ControlSubTitle = styled.h3`
  color: ${props => props.theme.primaryColor};
`

const PlayOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-self: center;
  align-self: center;
`

type GraphControlsProps = {
    index: number
    setIndex: (index: number) => void
    isEdit: boolean
    setEdit: (edit: boolean) => void
    unwGraph: any
    unwGraphHistory: any
    setUnwGraphHistory: (graphHistory: any) => void
}

const GraphControlsComponent = ({index, setIndex, isEdit, setEdit, unwGraph, unwGraphHistory, setUnwGraphHistory}: GraphControlsProps) => {
    const [playback, setPlayback] = useState(100)
    const [isPlayback, setIsPlayback] = useState(true)
    const [algo, setAlgo] = useState("A*")
    const algoMap: any = {"A*": aStar}

    const playbackRates = [
        {
            label: 'Super Fast',
            value: '50',
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

    const togglePlaybackMode = () => {
        setIndex(0)
        setIsPlayback(!isPlayback)
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

    const playClick = () => {
        if(isEdit) {
            setIndex(0)
            setUnwGraphHistory(algoMap[algo](unwGraph))
        }
        setEdit(false)
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
        setIsPlayback(false)
        updateGraphIndex(1)
    }
    // effect to reset index whenever history changes

    const updateEditMode = () => {
        setIndex(0)
        setEdit(true)
    }

    const clearWalls = () => {

    }

    return (
        <GraphControlsContainer>
            <Typography className="handle">Controls</Typography>
            <div>{`Step: ${index}/${unwGraphHistory.length}`}</div>
            <ControlContainer>
                {/*{TODO set playback to off when mnaually incremented}*/}
            <ControlSubsection>
                <ControlSubTitle>Play</ControlSubTitle>
                <PlayOptions>
                    <SkipPreviousIcon {...iconOptions} onClick={skipBackClick}/>
                    {(!isPlayback || isEdit) ? <PlayArrowIcon {...iconOptions} onClick={playClick}/> : <PauseIcon {...iconOptions} onClick={pauseClick}/>}
                    <SkipNextIcon {...iconOptions} onClick={skipForwardClick}/>
                </PlayOptions>
                <PlayOptions>
                    <Button onClick={updateEditMode}>Edit Mode</Button>
                    <Button onClick={clearWalls}>Clear Walls</Button>
                </PlayOptions>
            </ControlSubsection>
            <ControlSubsection>
                <Select
                    value={playback}
                    onChange={(event: any) => {setPlayback(event.target.value)}}>
                    {playbackRates.map((opt: any) => {
                        return <MenuItem value={opt.value}>{opt.label}</MenuItem>
                    })}
                </Select>
            </ControlSubsection>
            </ControlContainer>
            <ControlSubsection>
                <FormControl>
                    <InputLabel>Algorithm</InputLabel>
                    <Select
                        value={algo}
                        onChange={(event: any) => {setAlgo(event.target.value)}}
                    >
                        <MenuItem value="A*">A*</MenuItem>
                    </Select>
                </FormControl>
            </ControlSubsection>
        </GraphControlsContainer>
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
        }
    }
}

export const GraphControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphControlsComponent)

