import React, {useEffect, useState} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { UnwGraph } from '../UnweightedGraph/Unweighted'
import { GraphControls } from "../GraphControls/GraphControls";
import { Collapse } from '../Collapsible/Collapse';
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
  right: 10%;
  top: 0;
  background-color: ${props => props.theme.secondaryColor};
`

const BodyStyle = styled.div`
  overflow: hidden;
`

export const HomeScreen = () => {
    const [controlsOpen, setControlsOpen] = useState<boolean>(true)

    return (
        <ThemeProvider theme={theme}>
        <GridContainer onMouseDown={event => setControlsOpen(false)} onMouseUp={event => setControlsOpen(true)}>
            <UnwGraph/>
        </GridContainer>
        <Draggable handle=".handle" >
            <ControlsContainer>
                <Collapse>
                    <GraphControls controlsOpen={controlsOpen}/>
                </Collapse>
            </ControlsContainer>
        </Draggable>
        </ThemeProvider>
    )
}