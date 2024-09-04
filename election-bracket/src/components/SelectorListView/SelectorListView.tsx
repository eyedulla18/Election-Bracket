import React, { FC } from 'react';
import StateRadioButton from '../StateRadioButton/StateRadioButton.tsx';
import { Grid } from '@mui/joy';
import Box from '@mui/joy/Box';


interface SelectorListViewProps { 
  stateList
}
function renderSmallStateRadioButtons(stateList) {
  var radioList: any = []
  for (var i = 0; i < stateList.length; ++i) {
    radioList.push(<Grid><StateRadioButton stateName={stateList[i]}></StateRadioButton></Grid>)
  }
  return radioList
}

const SelectorListView: FC<SelectorListViewProps> = (props) => {

  return (
    <Box style={{overflow: 'auto'}}
      sx={{height: { xs: "50vh", md: "75vh" }}}
    >
      <Grid container justifyContent="center" spacing={1} 
        sx={{
          flexDirection: { xs: "row", md: "column" },
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}>
        {renderSmallStateRadioButtons(props.stateList)}
      </Grid>
    </Box>
  )
};

export default SelectorListView;
