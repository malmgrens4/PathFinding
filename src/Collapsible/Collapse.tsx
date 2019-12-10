import React, {ReactElement, useEffect, useState} from 'react'
import styled from 'styled-components'

import DragHandleIcon from '@material-ui/icons/DragHandle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

type CollapseProps = {
    children: any
}

const CollapseStyle = styled.div`
  display: flex;
  flex-flow: column;
`

const TopBar = styled.div`
    display: flex;
    flex-grow: 1;
    border: 2px solid white;
`

const CollapseContent = styled.div`
  flex-grow: 9;
  width: 100%;
`

const DragSection = styled.div`
  display: flex;
  flex-grow: 9;
`


const CollapseHandle = styled.div`
  flex-grow: 0;
  border: 2px solid blue;
  
`

export const Collapse = (props: CollapseProps) => {
    const [open, setOpen] = useState(true)

    return(
        <CollapseStyle>
            <TopBar >
                <DragSection className="handle">
                <DragHandleIcon/>
                </DragSection>
                <CollapseHandle>
                    {open ? <ArrowDropUpIcon onClick={() => setOpen(false)}/> :
                            <ArrowDropDownIcon onClick={() => setOpen(true)}/>}
                </CollapseHandle>
            </TopBar>
                <CollapseContent>
                    {open &&
                    props.children}
                </CollapseContent>

        </CollapseStyle>
    )
}