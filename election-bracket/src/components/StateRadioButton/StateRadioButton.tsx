import React, { FC } from 'react';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
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

  const stateStatusToToggleStatus = (stateStatus: number) => {
    if (stateStatus == politicalParties.neutral) {
      return ""
    }
    else if (stateStatus == politicalParties.democrat) {
      return "D"
    }
    else if (stateStatus == politicalParties.republican) {
      return "R"
    }
    else if (stateStatus == politicalParties.thirdParty) {
      return "3rd"
    }
  }

  function fabBackgroundColor(party:number){
    if (party == stateStatus) {
      return "##ffffff"
    }
    return 'background.paper'
  }

  return (
    <Box>
    <Card size="sm" variant='soft' sx={{backgroundColor:"var(--joy-palette-neutral-800, #171A1C)"}}>
      <Typography
        sx={{ color:'text.contrastText', fontWeight: 'lg', fontSize: 'sm' }}
      >
        {props.title ? props.title : (props.stateName + "(" + electoralVotesMap[props.stateName]) +")"}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-end",
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

  return (
    <div>
      <Typography
        sx={{ fontWeight: 'lg', fontSize: 'sm' }}
      >
        {props.title ? props.title : (props.stateName + " " + electoralVotesMap[props.stateName])}
      </Typography>
      <RadioGroup
        orientation="horizontal"
        name="justify"
        value={stateStatusToToggleStatus(stateStatus)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(specifyStateStatus({ stateName: props.stateName, politicalParty: event.target.value }))
        }
        sx={{
          minHeight: 36,
          padding: '4px',
          borderRadius: '12px',
          bgcolor: 'neutral.softBg',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
        }}
      >
        {['R', 'D', "3rd"].map((item) => (
          <Radio
            key={item}
            color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{ px: 2, alignItems: 'center' }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: 'background.surface',
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </div>
  )
};

interface StateRadioButtonProps {
  stateName: string,
}

export default StateRadioButton;
