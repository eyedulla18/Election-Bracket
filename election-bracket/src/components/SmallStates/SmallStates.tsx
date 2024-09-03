import React, { FC } from 'react';
import { smallStateList } from '../../common-library/smallStateList.ts';
import StateRadioButton from '../StateRadioButton/StateRadioButton.tsx';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

interface SmallStatesProps { }
function renderSmallStateRadioButtons() {
  var radioList: any = []
  for (var i = 0; i < smallStateList.length; ++i) {
    radioList.push(<ListItem><StateRadioButton stateName={smallStateList[i]}></StateRadioButton></ListItem>)
  }
  return radioList
}

const SmallStates: FC<SmallStatesProps> = () => {
  return (<div style={{maxHeight: '90vh', overflow: 'auto'}}>
    <List variant="outlined"
      sx={{
        "--List-radius": "8px",
      }}>
      {renderSmallStateRadioButtons()}
    </List>
  </div>
  )
};

export default SmallStates;
