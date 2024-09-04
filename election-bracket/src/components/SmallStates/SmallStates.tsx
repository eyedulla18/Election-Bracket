import React, { FC } from 'react';
import { smallStateList } from '../../common-library/smallStateList.ts';
import StateRadioButton from '../StateRadioButton/StateRadioButton.tsx';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { Grid } from '@mui/joy';

interface SmallStatesProps { }
function renderSmallStateRadioButtons() {
  var radioList: any = []
  for (var i = 0; i < smallStateList.length; ++i) {
    radioList.push(<Grid><StateRadioButton stateName={smallStateList[i]}></StateRadioButton></Grid>)

  }
  return radioList
}

const SmallStates: FC<SmallStatesProps> = () => {

  return (
    <Grid height={"80vh"} wrap='nowrap' container justifyContent="center" spacing={2} style={{maxHeight: '100vh', overflow: 'auto'}}
     sx={{ pb:"5vh",
     flexDirection: { xs: "row", md: "column"},
      flexWrap:{ xs: "wrap", md: "nowrap"},
      height:{ xs: "30vh", md: "80vh"}
      }}>
      {renderSmallStateRadioButtons()}
    </Grid>
  )
};

export default SmallStates;
