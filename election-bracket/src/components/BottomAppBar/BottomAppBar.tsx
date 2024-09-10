import React, { FC } from 'react';
import Button from '@mui/joy/Button';
import tallyCurrentResults from '../../common-library/voteCounter.ts';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/joy/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Stack } from '@mui/joy';
import {submitMap} from '../../common-library/requestHandler.ts'
import { useState } from 'react';
import SubmissionModal from '../SubmissionModal/SubmissionModal.tsx';


interface BottomAppBarProps {
  state: string
  setOpenInfoModal
  setOpenSettingsModal
}

const BottomAppBar: FC<BottomAppBarProps> = (props) => {
  const [openSubmissionModal, setOpenSubmissionModal] = useState(false);

  function disabledButtonState() {
    if (props.state === undefined) {
      return false
    }
    const results = tallyCurrentResults(props.state["stateStatus"])
    if (results.None == 0) {
      return false
    }
    return true

  }

  function toolTipText() {
    if (disabledButtonState()) {
      return "finish selecting election results"
    }
  }

  return (
    <AppBar elevation={0} position="fixed" color="primary" style={{ background: 'transparent' }}
      sx={{ top: 'auto', bottom: "4vh", right: "4vw", justifyContent: "space-evenly", alignItems: "end" }}>
      <SubmissionModal open={openSubmissionModal} setOpen={setOpenSubmissionModal}></SubmissionModal>
      <Stack direction="row"
      >
        <IconButton onClick={()=>props.setOpenSettingsModal(true)}>
          <SettingsOutlinedIcon></SettingsOutlinedIcon>
        </IconButton>

        <IconButton onClick={()=>props.setOpenInfoModal(true)}>
          <InfoOutlinedIcon></InfoOutlinedIcon>
        </IconButton>
        <Tooltip
          size="sm"
          arrow={false}
          placement="top"
          variant="solid"
          title={toolTipText()}
        >
          <span>
            <Button
              disabled={disabledButtonState()}
              onClick={function () { setOpenSubmissionModal(true)}}
              size="md"
              variant="solid"
            >
              submit
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </AppBar>
  )
};

export default BottomAppBar;
