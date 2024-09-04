import React, { FC } from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/joy/Modal'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSelector, useDispatch } from 'react-redux'
import {updateFillSolidState, specifyStateStatus} from '../../reducers/stateStatus.ts';
import { democratStates, republicanStates } from '../../common-library/statePoliticalParties.js';



interface FillSafeStatesProps { }

const FillSafeStates: FC<FillSafeStatesProps> = () => {
  // const [checked, setChecked] = React.useState<boolean>(true);
  const checked = useSelector((state:any) => state.stateStatus.fillSolidState)

  const [warningOpen, setWarningOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch()

  function closeWarningHandler() {
    console.log("close warning")
    setWarningOpen(false)
  }

  function updateStateDefault() {
    console.log("update state default")
    for(var i=0; i<democratStates.length; ++i){
      dispatch(specifyStateStatus({stateName:democratStates[i], politicalParty:"D"}))
    }
    for(var i=0; i<republicanStates.length; ++i){
      dispatch(specifyStateStatus({stateName:republicanStates[i], politicalParty:"R"}))
    }
  }

  function updateStateDefaultToEmpty() {
    console.log("update state default")
    for(var i=0; i<democratStates.length; ++i){
      dispatch(specifyStateStatus({stateName:democratStates[i], politicalParty:"N"}))
    }
    for(var i=0; i<republicanStates.length; ++i){
      dispatch(specifyStateStatus({stateName:republicanStates[i], politicalParty:"N"}))
    }
  }

  function acceptWarningHandler() {
    dispatch(updateFillSolidState())
    setWarningOpen(false)
    // setChecked(!checked)

    if(checked==false){
      updateStateDefault() 
    }
    else{
      updateStateDefaultToEmpty()
    }
  }

  function warningPopup() {
    return (
      <Modal open={warningOpen}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Alert
            key={'Warning'}
            sx={{ alignItems: 'flex-start' }}
            startDecorator={(<WarningIcon />)}
            variant="soft"
            color={'warning'}
          >
            <div>
              <Typography level="title-lg" color={'warning'}>
                Warning 
              </Typography>

              <Typography level="body-sm" color={'warning'}>
                Confirming may wipe out prior selections
              </Typography>
              <Box sx={{
                mt: 2, display: 'flex', justifyContent: "center",
                alignItems: "center", gap: 1
              }}>
                <IconButton variant="solid" color={'warning'}>
                  <CheckIcon onClick={() => acceptWarningHandler()} />
                </IconButton>
                <IconButton variant="outlined" color={'warning'}>
                  <CloseRoundedIcon onClick={() => closeWarningHandler()} />
                </IconButton>
              </Box>
            </div>
          </Alert>
        </Box>
      </Modal>
    );
  }

  function onChangeToggleHandler() {
    setWarningOpen(true)
  }

  function fillStateSwitch() {
    return (
      <Switch
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeToggleHandler()
        }
        sx={(theme: Theme) => ({
          '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '51px',
          '--Switch-trackHeight': '31px',
          '--Switch-trackBackground': theme.vars.palette.background.level3,
          [`& .${switchClasses.thumb}`]: {
            transition: 'width 0.2s, left 0.2s',
          },
          '&:hover': {
            '--Switch-trackBackground': theme.vars.palette.background.level3,
          },
          '&:active': {
            '--Switch-thumbWidth': '32px',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-trackBackground': 'rgb(48 209 88)',
            '&:hover': {
              '--Switch-trackBackground': 'rgb(48 209 88)',
            },
          },
        })}
      />
    );
  }

  return (
    <div>
      {warningPopup()}
      <Typography component="label" endDecorator={fillStateSwitch()}>
        Fill solid states
      </Typography>
    </div>
  );
};

export default FillSafeStates;
