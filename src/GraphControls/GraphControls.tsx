import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {number} from "prop-types";
import {setHistoryIndex} from "../actions";
import {connect} from "react-redux";


const GraphControlsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
`

const ControlContainer = styled.div`
  display: flex;
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
            if(!isEdit) {
                setIndex(index + 1)
            }
        }, playback);


        return () => clearTimeout(timer);
    })

    return (
        <GraphControlsContainer>
            <ControlContainer>
                <div>{`Current index: ${index}`}</div>
                <button onClick={() => setIndex(index - 1)}>-1</button>
                <button onClick={() => setIndex(index + 1)}>+1</button>
                <input onChange={(event) => setPlayback(parseInt(event.target.value))} value={playback} type="number"></input>
                <button onClick={togglePlaybackMode}>Toggle Playback {`${isPlayback}`}</button>
            </ControlContainer>
        </GraphControlsContainer>
    )

}

const mapStateToProps = (state: any) => {
    return {
        index: state.historyIndex,
        isEdit: state.isEdit
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setIndex: (index: number) => {
            dispatch(setHistoryIndex(index))
        },
    }
}

export const GraphControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphControlsComponent)

