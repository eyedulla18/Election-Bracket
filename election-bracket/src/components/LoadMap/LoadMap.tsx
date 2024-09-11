import React, { FC } from 'react';
import { useSearchParams } from "react-router-dom";
import { getSubmission } from '../../common-library/requestHandler.ts'
import { useEffect, useState } from 'react';
import { stateList } from '../../common-library/stateList.ts';
import { politicalParties } from '../../common-library/political-parties.js';
import { Grid, Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import USAMap from '../USAMap/USAMap';
import CongressionalDistrictStatus from '../CongressionalDistrictStatus/CongressionalDistrictStatus.tsx';
import { congressionalElectoralDistricts } from '../../common-library/congressionalElectoralStates.ts'
import { swingStateList } from '../../common-library/swingStateList.ts';
import MarginTable from '../MarginTable/MarginTable.tsx';
import VoteTracker from '../VoteTracker/VoteTracker.tsx';
import CircularProgress from '@mui/joy/CircularProgress';
import Snackbar from '@mui/joy/Snackbar';
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';


interface LoadMapProps { }


const LoadMap: FC<LoadMapProps> = () => {
  let [fetchedState, setFetchedState] = useState({})
  let [loaded, setLoaded] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams();
  let [submissionSuccess, setSubmissionSuccess] = useState(false)
  var successParam = false
  let [errorState, setErrorState] = useState(false)
  let [showCopyLinkSuccess, setShowCopyLinkSuccess] = useState(false)
  let [showCompetitionModal, setShowCompetitionModal] = useState(false)


  function successSnackbar() {
    return (
      <Snackbar
        open={submissionSuccess}
        autoHideDuration={7000}
        color="success"
        size="lg"
        onClose={(event, reason) => {
          console.log(event)
          console.log(reason)
          setSubmissionSuccess(false)
        }}
      >
        Submission Successful!
      </Snackbar>
    )
  }

  function failureSnackbar() {
    return (
      <Snackbar
        open={errorState}
        color="danger"
        size="lg"
        variant="solid"
        onClose={(event, reason) => {
          console.log(event)
          console.log(reason)
          setErrorState(false)
        }}
      >
        Load Failed. Submission may not exist, did not upload properly, or exceeded threshold
      </Snackbar>
    )  
  }

  function customize() {
    var customizeMap = {}
    stateList.forEach(stateName => {
      if (fetchedState[stateName] == politicalParties.republican) {
        customizeMap[stateName] = { fill: "#FF3333" }
      }
      else if (fetchedState[stateName] == politicalParties.democrat) {
        customizeMap[stateName] = { fill: "#0092CC" }
      }
      else if (fetchedState[stateName] == politicalParties.thirdParty) {
        customizeMap[stateName] = { fill: "#779933" }
      }
  
    });
    return customizeMap
  }
  
  function districtInfo() {
    var districtMap = {"DC(3)": fetchedState["District of Columbia"]}
    congressionalElectoralDistricts.forEach(districtName => {
      districtMap[districtName] = fetchedState[districtName]
    })
    return districtMap
  }
  
  function swingStateInfo() {
    var swingStateInfo = {}
    swingStateList.forEach(swingState => {
      swingStateInfo[swingState] = {"winner":fetchedState[swingState], "margin":fetchedState[swingState+" margin"] }
    })
    return swingStateInfo
  }
  useEffect(() => {
    if (searchParams.get("submissionId") !== null) {
      getSubmission(searchParams.get("submissionId")!)
        .then(response => {
          if(response.rc===0){
            console.log("use effect")
            setFetchedState(response["submissionMap"])
            setLoaded(true)
            setSubmissionSuccess(true && successParam)
          }
          else{
            setErrorState(true)
          }
        })
    }
    if(searchParams.get("submissionSuccess") !== null){
      console.log("success parameter found")
      successParam = true
    }
    else{
      setShowCompetitionModal(true)
      console.log("success parameter NOT found")
    }

  }, [])

  function renderHeader(){
    if (Object.keys(fetchedState).length===0){
      return
    }
    if(!loaded){
      return 
    }
    return (<VoteTracker currentState={fetchedState}></VoteTracker>)
  }

  function titleContent(){
    const email = fetchedState["email"]
    if(email!=""){
      return email+"'s submision"
    }

  }

  function shareFab(){
    return (
      <Fab color="primary" aria-label="add" 
      onClick={() => {
        navigator.clipboard.writeText("https://electoguess.gg"+"/#/loadmap?submissionId="+searchParams.get("submissionId")!)
        setShowCopyLinkSuccess(true)
      }}
      sx={{
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }}>
        <IosShareOutlinedIcon />
      </Fab>
    )
  }

  function copyLinkSnackbar(){
    return(
      <Snackbar
        autoHideDuration={5000}
        color="success"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showCopyLinkSuccess}
        onClose={(event, reason) => {
          setShowCopyLinkSuccess(false)
        }}
      sx={{textAlign:"center", display:'block'}}
      >
        Link copied to clipboard! Share your prediction with your friends!
      </Snackbar>
    )
  }

  function competitionModal(){
    return (
      <Modal open={showCompetitionModal} onClose={() => setShowCompetitionModal(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            color='success'
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            Welcome! Win $1,000!
          </Typography>
          <Typography id="modal-desc" color="neutral">
            Submit your own map, and after election day, the most accurate submission will
            receive $1,000! Click the icon on the top left to begin predicting.
          </Typography>
        </Sheet>
      </Modal>
    )
  }

  return (
    <Container maxWidth={false} disableGutters sx={{
      bgcolor: 'background.paper',
      height: '100%',
      minHeight: '100vh',
      py: '3%'
    }}>
      {shareFab()}
      {!loaded && !errorState && (<CircularProgress sx={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }} />)}

      {renderHeader()}
      {failureSnackbar()}
      
      {loaded && (<Grid container direction="row" sx={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      {competitionModal()}
      {successSnackbar()}
      {copyLinkSnackbar()}
      <Grid sx={{ pb:1}}>
        <USAMap customize={customize()} title={""}></USAMap>
        <Grid spacing={2} container justifyContent="center" sx={{ flexDirection: "row", flexWrap: "wrap" }}>
          <CongressionalDistrictStatus districtInfo={districtInfo()}></CongressionalDistrictStatus>
        </Grid>
      </Grid>
      <Grid>
        <MarginTable swingStateInfo={swingStateInfo()}></MarginTable>
      </Grid>
      {<Typography color="neutral" level="title-sm">
        {titleContent()}
      </Typography>}
    </Grid>)}
    </Container>
  )
}

export default LoadMap;
