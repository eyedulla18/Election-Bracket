import React, { FC } from 'react';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateEmail } from '../../reducers/stateStatus.ts';
import {submitMap} from '../../common-library/requestHandler.ts'
import Snackbar from '@mui/joy/Snackbar';
import { useNavigate } from "react-router-dom";


interface SubmissionModalProps {
  open: boolean,
  setOpen
}

const SubmissionModal: FC<SubmissionModalProps> = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const currentState = useSelector((state) => state)
  const [submissionId, setSubmissionId] = useState("");
  const [submissionRequestLoading, setSubmissionRequestLoading] = useState(false);
  const navigate = useNavigate();


  function handleInputChange(event) {
    setEmail(event.target.value)
    dispatch(updateEmail({ email: event.target.value }))
  }

  function submitClickHandler(event){
    event.preventDefault();
    console.log("submit")
    setSubmissionRequestLoading(true)
    submitMap(currentState)
      .then(response => {
        console.log(response)
        if(response.rc === 0){
          setSubmissionId(response["submissionId"])
          //redirect to submission page 
          navigate("/loadmap?submissionSuccess&submissionId="+response["submissionId"])
        }
        else{
          setDisplayErrorMessage(true)
        }
        setSubmissionRequestLoading(false)
      })
  }

  function errorSnackbar() {
    return (
      <Snackbar
        open={displayErrorMessage}
        autoHideDuration={7000}
        color="danger"
        size="lg"
        variant="solid"
        onClose={(event, reason) => {
          console.log(event)
          console.log(reason)
          setDisplayErrorMessage(false)
        }}
      >
        Submission failed. Please try again later. 
      </Snackbar>
    )
  }

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        {errorSnackbar()}

        <ModalClose variant="plain" />
        <form onSubmit={submitClickHandler}>
        <Input placeholder="email" required onChange={handleInputChange}
          type="email"
          endDecorator={
            <Button disabled={submissionRequestLoading} type="submit">Submit</Button>
          }
        />
        </form>
      </Sheet>
    </Modal>
  )
};

export default SubmissionModal;
