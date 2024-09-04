import React, { FC } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import StateRadioButton from '../StateRadioButton/StateRadioButton.tsx';
import Grid from '@mui/joy/Grid';

interface CongressionalDistrictStatesModalProps {
  openCongressionalElectoralModal:boolean,
  setOpenCongressionalElectoralModal
  numDistricts:number
  stateName:string
 }

const CongressionalDistrictStatesModal: FC<CongressionalDistrictStatesModalProps> = (props) => {

  function renderSegmentedControl(){
    var segmentedControls = [<Grid><StateRadioButton stateName={props.stateName} title={"Popular Vote"}></StateRadioButton></Grid>]
    for(var i=1; i<=props.numDistricts; ++i){
      segmentedControls.push(<Grid><StateRadioButton stateName={props.stateName+i} title={"District "+i}></StateRadioButton></Grid>)
    }
    return (
      <Grid container spacing={1} justifyContent="center" sx={{ flexGrow: 1, mt:1 }}>
        {segmentedControls}
      </Grid>
    )
  }


  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.openCongressionalElectoralModal}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClose={() => props.setOpenCongressionalElectoralModal(false)}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }}/>
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
           {props.stateName} Electoral College Breakdown
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Select the winner of each of the congressional districts and the state popular vote
        </Typography>
        {renderSegmentedControl()}
      </Sheet>
    </Modal>
  )
};

export default CongressionalDistrictStatesModal;
