import React, { FC } from 'react';
import SlotCounter from 'react-slot-counter';
import voteCounter from '../../common-library/voteCounter.ts'
import { useSelector } from 'react-redux'
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import AppBar from '@mui/material/AppBar';
import ElectoGuessLogo from "../../images/electo_guess_logo.png"
import { Link, useNavigate } from "react-router-dom";



interface VoteTrackerProps {
  currentState
}

const VoteTracker: FC<VoteTrackerProps> = (props) => {
  const stateStatus = props.currentState
  const currentResults = voteCounter(stateStatus);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" elevation={0} style={{ background: 'transparent', boxShadow: 'none'}}>
          <Box sx={{ ml: "2vw", mt:"2vh" }}>
          <Link to='/'>
            <img width="100vw" src={ElectoGuessLogo} alt="Electo Guess logo"></img>
            </Link>
          </Box>
      </AppBar>

      <AppBar position="fixed" elevation={0} style={{ background: 'transparent', boxShadow: 'none' }} sx={{ mt: "4vh" }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: {xs:"flex-end", md:"space-evenly"},
            alignItems: "center",
            color: 'text.contrastText'
          }}
        >
          <Box sx={{ p: 1, borderRadius: 5, bgcolor: 'background.paper', color: "#0092CC" }}><SlotCounter value={currentResults.Democrat} /></Box>
          <Box sx={{ p: 1, borderRadius: 5, bgcolor: 'background.paper', color: "#FF3333" }}><SlotCounter value={currentResults.Republican} /></Box>
          <Box sx={{ p: 1, borderRadius: 5, bgcolor: 'background.paper', color: "#779933" }}><SlotCounter value={currentResults['Third Party']} /></Box>
          <Box sx={{ p: 1, borderRadius: 5, bgcolor: 'background.paper' }}><SlotCounter value={currentResults.None} /></Box>
        </Stack>
      </AppBar>
    </Box>
  )
};

export default VoteTracker;
