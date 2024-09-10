import React, { FC } from 'react';
import Typography from '@mui/joy/Typography';
import { useSelector, useDispatch } from 'react-redux'
import { politicalParties } from '../../common-library/political-parties';
import { specifyStateStatus } from '../../reducers/stateStatus.ts';
import { electoralVotesMap } from '../../common-library/electoralVotes.ts';
import Card from '@mui/joy/Card';
import Avatar from '@mui/joy/Avatar';
import Fab from '@mui/material/Fab';
import DemocraticIcon from "../../images/Democratic_Disc.png"
import RepublicanIcon from "../../images/Republican_Disc.png"
import GreenIcon from "../../images/Green_Disc.png"
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';


interface StateRadioButtonProps {
  stateName: string,
  title?: string
}

const StateRadioButton: FC<StateRadioButtonProps> = (props) => {
  const stateStatus = useSelector((state: any) => {
    return state.stateStatus[props.stateName]
  })
  const dispatch = useDispatch()

  function fabBackgroundColor(party:number){
    if (party == stateStatus) {
      return "##ffffff"
    }
    return 'background.paper'
  }

  return (
    <Box>
    <Card size="sm" variant='soft'>
      <Typography
        sx={{ color:'text.contrastText', fontWeight: 'lg', fontSize: 'sm' }}
      >
        {props.title ? props.title : (props.stateName + "(" + electoralVotesMap[props.stateName]) +")"}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fab size="small" sx={{
          bgcolor: fabBackgroundColor(politicalParties.democrat),
          p: 3,
        }}
        onClick={()=>{
          dispatch(specifyStateStatus({ stateName: props.stateName, politicalParty: "D" }))
        }}
        >
          <Avatar variant="solid" src={DemocraticIcon}></Avatar>
        </Fab>
        <Fab size="small" sx={{
          bgcolor: fabBackgroundColor(politicalParties.republican),
          p: 3,
        }}
        onClick={()=>{
          dispatch(specifyStateStatus({ stateName: props.stateName, politicalParty: "R" }))
        }}>
          <Avatar variant="solid" src={RepublicanIcon}></Avatar>
        </Fab>
        <Fab size="small" sx={{
          bgcolor: fabBackgroundColor(politicalParties.thirdParty),
          p: 3,
        }}
        onClick={()=>{
          dispatch(specifyStateStatus({ stateName: props.stateName, politicalParty: "3rd" }))
        }}>
          <Avatar variant="solid" src={GreenIcon}></Avatar>
        </Fab>
      </Stack>
    </Card>
    </Box>
  )
};

interface StateRadioButtonProps {
  stateName: string,
}

export default StateRadioButton;
