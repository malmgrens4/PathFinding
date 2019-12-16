import React, {useEffect, useState} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { UnwGraph } from '../UnweightedGraph/Unweighted'
import { GraphControls } from "../GraphControls/GraphControls";
import { Collapse } from '../Collapsible/Collapse';
import Draggable from 'react-draggable';
import {dijkstras} from "../dijkstras/dijkstras";
import {connect} from "react-redux";
import {GraphType} from "../Graphs/GraphTypes";
import {WGraph} from "../WeightedGraph/WeightedGraph";

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

type HomeProps = {
    graphType: GraphType
}

const Home = ({graphType}: HomeProps) => {
    const [controlsOpen, setControlsOpen] = useState<boolean>(true)

    return (
        <ThemeProvider theme={theme}>
        <GridContainer>
            {graphType === 'WEIGHTED' ? <WGraph/> : <UnwGraph/>}
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

const mapStateToProps = (state: any) => {
    return {
        graphType: state.graphType
    }
}


export const HomeScreen = connect(
    mapStateToProps,
    null
)(Home)
