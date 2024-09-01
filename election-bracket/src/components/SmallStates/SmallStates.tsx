import React, { FC } from 'react';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { smallStateList } from '../../common-library/smallStateList.ts';
import StateRadioButton from '../StateRadioButton/StateRadioButton.tsx';

interface SmallStatesProps { }
function renderSmallStateRadioButtons(){
  var radioList: any = []
  for (var i = 0; i < smallStateList.length; ++i) {
    radioList.push(<StateRadioButton stateName={smallStateList[i]}></StateRadioButton>)
  }
  return radioList
}

const SmallStates: FC<SmallStatesProps> = () => {
  const [justify, setJustify] = React.useState('');
  return (<div>
    {renderSmallStateRadioButtons()}
  </div>
  )
};

export default SmallStates;
