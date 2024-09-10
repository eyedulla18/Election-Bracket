import React, { FC } from 'react';
import { useSearchParams } from "react-router-dom";
import { getSubmission } from '../../common-library/requestHandler.ts'
import { useEffect, useState } from 'react';
import { stateList } from '../../common-library/stateList.ts';
import { politicalParties } from '../../common-library/political-parties.js';
import { Grid, Typography } from '@mui/joy';
import USAMap from '../USAMap/USAMap';
import CongressionalDistrictStatus from '../CongressionalDistrictStatus/CongressionalDistrictStatus.tsx';
import { congressionalElectoralDistricts } from '../../common-library/congressionalElectoralStates.ts'
import { swingStateList } from '../../common-library/swingStateList.ts';
import MarginTable from '../MarginTable/MarginTable.tsx';
import VoteTracker from '../VoteTracker/VoteTracker.tsx';
import CircularProgress from '@mui/joy/CircularProgress';
import Snackbar from '@mui/joy/Snackbar';
import { Container } from '@mui/material';


interface LoadMapProps { }


const LoadMap: FC<LoadMapProps> = () => {
  let [fetchedState, setFetchedState] = useState({})
  let [loaded, setLoaded] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams();
  let [submissionSuccess, setSubmissionSuccess] = useState(false)
  var successParam = false
  let [errorState, setErrorState] = useState(false)


  function successSnackbar() {
    return (
      <Snackbar
        open={submissionSuccess}
        autoHideDuration={7000}
        color="success"
        size="lg"
        variant="solid"
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
        Load Failed. Submission may not exist or did not upload properly. 
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
    var districtMap = {}
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

  console.log(errorState)
  return (
    <Container maxWidth={false} disableGutters sx={{
      bgcolor: 'background.paper',
      height: '100%',
      minHeight: '100vh',
      py: '3%'
    }}>
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
      {successSnackbar()}
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
