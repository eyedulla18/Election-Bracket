import React, { FC } from 'react';
import Button from '@mui/joy/Button';
import tallyCurrentResults from '../../common-library/voteCounter.ts';


interface SubmitButtonProps { 
  state:any
}

const SubmitButton: FC<SubmitButtonProps> = (props) => {

  function disabledButtonState(){
    if(props.state === undefined){
      return false
    }
    const results = tallyCurrentResults(props.state)
    if(results.None==0){
      return false
    }
    return true

  }

  return (
    <Button
      disabled={disabledButtonState()}
      onClick={function () { }}
      size="md"
      variant="soft"
    >
      submit
    </Button>
  )
};

export default SubmitButton;
