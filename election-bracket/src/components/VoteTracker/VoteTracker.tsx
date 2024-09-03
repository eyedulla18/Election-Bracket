import React, { FC } from 'react';
import SlotCounter from 'react-slot-counter';
import voteCounter from '../../common-library/voteCounter.ts'
import { useSelector } from 'react-redux'
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import AppBar from '@mui/material/AppBar';


interface VoteTrackerProps { }

const VoteTracker: FC<VoteTrackerProps> = () => {
  const stateStatus = useSelector((state) => state)
  const currentResults = voteCounter(stateStatus);
  return (
    <Box sx={{flexGrow: 1 }}>
    <AppBar  elevation={0} style={{ background: 'transparent', boxShadow: 'none'}} sx={{mt:"4vh"}}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
          color: 'text.primary'
        }}
      >
        <Box sx={{p:1, borderRadius: 5, bgcolor:'background.paper', color: "#0092CC" }}><SlotCounter value={currentResults.Democrat} /></Box>
        <Box sx={{p:1, borderRadius: 5, bgcolor:'background.paper', color: "#FF3333" }}><SlotCounter value={currentResults.Republican} /></Box>
        <Box sx={{p:1, borderRadius: 5, bgcolor:'background.paper', color: "#779933" }}><SlotCounter value={currentResults['Third Party']} /></Box>
        <Box sx={{p:1, borderRadius: 5, bgcolor:'background.paper' }}><SlotCounter value={currentResults.None} /></Box>
      </Stack>
    </AppBar>
    </Box>
  )
};

export default VoteTracker;
