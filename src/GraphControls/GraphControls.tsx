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

const GraphControlsContainer = styled(Paper)`
  display: flex;
  flex-flow: column;
  padding: ${props => props.theme.minSpacing};
  &.MuiPaper-root {
    background-color: ${props => props.theme.secondaryColor} !important;
  }
`

const ControlContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

type GraphControlsProps = {
    index: number
    setIndex: (index: number) => void
    isEdit: boolean
}

const GraphControlsComponent = ({index, setIndex, isEdit}: GraphControlsProps) => {
    const [playback, setPlayback] = useState(100)
    const [isPlayback, setIsPlayback] = useState(true)

    const togglePlaybackMode = () => {
        setIndex(0)
        setIsPlayback(!isPlayback)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(!isEdit && isPlayback) {
                setIndex(index + 1)
            }
        }, playback);


        return () => clearTimeout(timer);
    })


    // effect to reset index whenever history changes


    return (
        <GraphControlsContainer>
            <Typography>Controls</Typography>
            <div>{`Current index: ${index}`}</div>
            <ControlContainer>

                <button onClick={() => setIndex(index - 1)}>-1</button>
                <button onClick={() => setIndex(index + 1)}>+1</button>
                <input onChange={(event) => setPlayback(parseInt(event.target.value))} value={playback} type="number"></input>
                <button onClick={togglePlaybackMode}>Toggle Playback {`${isPlayback}`}</button>
                <button onClick={() => setUnwGraphHistory(aStar(unwGraph))}>Generate History</button>
                <button onClick={() => setEdit(!isEdit)}>Toggle Edit</button>
            </ControlContainer>
            <FormControl>
                <InputLabel>Algorithm</InputLabel>
                <Select
                    value={"A*"}
                    onChange={(event: any) => {console.log(event.target.value)}}
                >
                    <MenuItem value="A*">A*</MenuItem>
                </Select>
            </FormControl>
        </GraphControlsContainer>
    )

}

const mapStateToProps = (state: any) => {
    return {
        index: state.historyIndex,
        isEdit: state.isEdit,
        historyIndex: state.historyIndex
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

