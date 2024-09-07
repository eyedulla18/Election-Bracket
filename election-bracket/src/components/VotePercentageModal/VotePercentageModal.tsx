import React, { FC } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux'
import StateRadioButton from '../StateRadioButton/StateRadioButton.tsx';
import MarginOfVictoryInput from '../MarginOfVictoryInput/MarginOfVictoryInput.tsx';


interface VotePercentageModalProps {
  stateName: string
  open: Boolean
  setOpen,
  statePercentageBreakdown,
}

const VotePercentageModal: FC<VotePercentageModalProps> = (props) => {
  const dispatch = useDispatch()
  const stateName = props.stateName

  function closeModalHandler() {
    props.setOpen(false)
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
        <ModalClose variant="plain" />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
          {props.stateName} prediction
        </Typography>
        <StateRadioButton stateName={stateName} title={' '}></StateRadioButton>
        <MarginOfVictoryInput stateName={props.stateName}></MarginOfVictoryInput>

      </Sheet>
    </Modal>
  )
};

export default VotePercentageModal;
