import React, { FC } from 'react';
import SlotCounter from 'react-slot-counter';
import voteCounter from '../../common-library/voteCounter.ts'
import { useSelector } from 'react-redux'
import Stack from '@mui/joy/Stack';


interface VoteTrackerProps { }

const VoteTracker: FC<VoteTrackerProps> = () => {
  const stateStatus = useSelector((state) => state)
  const currentResults = voteCounter(stateStatus);
  return (

    <Stack
      direction="row"
      spacing={8}
      sx={{
        justifyContent: "space-evenly",
        alignItems: "center",
        color: 'text.primary'
      }}
    >
      <SlotCounter value={currentResults.Democrat} />
      <SlotCounter value={currentResults.Republican} />
      <SlotCounter value={currentResults['Third Party']} />
      <SlotCounter value={currentResults.None} />
    </Stack>
  )
};

export default VoteTracker;
