import React, {useEffect, useState} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { UnwGraph } from '../UnweightedGraph/Unweighted'
import {GraphControls} from "../GraphControls/GraphControls";
import Draggable from 'react-draggable';

const theme = {
    primaryColor: "blue",
    secondaryColor: "rgba(0, 0, 0, .2)",
    minSpacing: '.8em',
    maxSpacing: '2em',
}

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
`

const ControlsContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 25%;
  background-color: ${props => props.theme.secondaryColor};
`

export const HomeScreen = () => {

    return (
        <ThemeProvider theme={theme}>
        <GridContainer>
            <UnwGraph/>
        </GridContainer>
        <Draggable handle=".handle" >
            <ControlsContainer>
                <GraphControls/>
            </ControlsContainer>
        </Draggable>
        </ThemeProvider>
    )
}