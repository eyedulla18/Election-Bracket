import React, { FC } from 'react';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import { Typography } from '@mui/joy';
import FillSafeStates from '../FillSafeStates/FillSafeStates.tsx';

interface SettingsModalProps {
  open:boolean,
  setOpen
}

const SettingsModal: FC<SettingsModalProps> = (props) => {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          Settings
        </Typography>
        {/* <Typography id="modal-desc" textColor="text.tertiary">
        Click on a state to predict the presidential winner. Use the "fill solid states" toggle
         to automatically fill non-swing states. Predict vote breakdowns in swing states as 
         tiebreakers. For Nebraska and Maine, choose winners for each district and the state.
        </Typography> */}
        <FillSafeStates></FillSafeStates>
      </Sheet>
    </Modal>
  )
}
export default SettingsModal;
