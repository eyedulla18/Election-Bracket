import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateMarginofVictory } from '../../reducers/stateStatus.ts';
import Input from '@mui/joy/Input';
import { Box } from '@mui/joy';
import Typography from '@mui/joy/Typography';




interface MarginOfVictoryInputProps {
  stateName: string
  title?: string
}

const MarginOfVictoryInput: FC<MarginOfVictoryInputProps> = (props) => {
  const dispatch = useDispatch()
  const currentMargin = useSelector((state: any) => state.stateStatus[props.stateName + " margin"])

  function defaultValue(){
    return currentMargin
  }

  return (
    <Box>
      <Typography
        sx={{ color: 'text.contrastText', fontWeight: 'lg', fontSize: 'sm' }}
      >
        {props.title ? props.title : "margin of victory %"}
      </Typography>
      <Input
        type="number"
        defaultValue={defaultValue()}
        slotProps={{
          input: {
            min: 0,
            max: 20,
            step: 0.01,
          },
        }}
        onChange={(event) => {
          dispatch(updateMarginofVictory({ stateName: props.stateName, margin: Number(event.target.value) }))
        }}
      />
    </Box>
  )
};

export default MarginOfVictoryInput;
