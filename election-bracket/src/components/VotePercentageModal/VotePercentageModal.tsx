import React, { FC } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Slider from '@mui/joy/Slider';
import SlotCounter from 'react-slot-counter';
import { useDispatch } from 'react-redux'
import {specifyStateStatus} from '../../reducers/stateStatus.ts';
import { updateVotePercentage } from '../../reducers/stateStatus.ts';


interface VotePercentageModalProps {
  stateName:string
  open:Boolean
  setOpen,
  statePercentageBreakdown,
 }
const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 75,
    label: '75',
  },
  {
    value: 100,
    label: '100',
  },
];

const VotePercentageModal: FC<VotePercentageModalProps> = (props) => {
  const dispatch = useDispatch()
  const republicanPercentage:number = props.statePercentageBreakdown.Republican
  const democratPercentage:number = props.statePercentageBreakdown.Democrat
  const thirdPartyPercentage:number = props.statePercentageBreakdown["Third party"]
  const stateName = props.stateName

  function closeModalHandler(){

    if(republicanPercentage> democratPercentage && republicanPercentage> thirdPartyPercentage){
      dispatch(specifyStateStatus({stateName, politicalParty: "R"}))
    }
    else if(democratPercentage>republicanPercentage && democratPercentage>thirdPartyPercentage){
      dispatch(specifyStateStatus({stateName, politicalParty: "D"}))
    }
    else if(thirdPartyPercentage>democratPercentage && thirdPartyPercentage>republicanPercentage){
      dispatch(specifyStateStatus({stateName, politicalParty: "3rd"}))
    }
    else{
      dispatch(specifyStateStatus({stateName, politicalParty: "N"}))
      console.log(republicanPercentage, democratPercentage, thirdPartyPercentage)
      console.log("could not find the party with the highest vote total. probably a tie need to handle")
    }

    dispatch(updateVotePercentage({stateName:stateName, democrat:democratPercentage, republican:republicanPercentage, thirdParty:thirdPartyPercentage}))

    props.setOpen(false)
  }

  function percentageTotal(){
    return Math.round(((republicanPercentage+democratPercentage+thirdPartyPercentage)*1000))/1000
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => closeModalHandler()}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
          {props.stateName} Vote Breakdown Prediction
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Make sure to use <code>aria-labelledby</code> on the modal dialog with an
          optional <code>aria-describedby</code> attribute. Current vote total: 
          <SlotCounter value={percentageTotal()} />%
          </Typography>
        <Slider
          aria-label="Always visible"
          color="primary"
          defaultValue={props.statePercentageBreakdown.Democrat}
          step={0.010}
          marks={marks}
          valueLabelDisplay="auto"
          onChangeCommitted={(event, newValue)=>{
            dispatch(updateVotePercentage({stateName:stateName, democrat:newValue as number, republican:republicanPercentage, thirdParty:thirdPartyPercentage}))
          }}
        />
        <Slider
          aria-label="Always visible"
          color="danger"
          defaultValue={props.statePercentageBreakdown.Republican}
          step={0.010}
          marks={marks}
          valueLabelDisplay="auto"
          onChangeCommitted={(event, newValue)=>{
            dispatch(updateVotePercentage({stateName:stateName, democrat:democratPercentage, republican:newValue as number, thirdParty:thirdPartyPercentage}))
          }}
        />
        <Slider
          aria-label="Always visible"
          color="success"
          defaultValue={props.statePercentageBreakdown["Third party"]}
          step={0.010}
          marks={marks}
          valueLabelDisplay="auto"
          onChangeCommitted={(event, newValue)=>{
            dispatch(updateVotePercentage({stateName:stateName, democrat:democratPercentage, republican:republicanPercentage, thirdParty:newValue as number}))
          }}
        />

      </Sheet>
    </Modal>
  )
};

export default VotePercentageModal;
