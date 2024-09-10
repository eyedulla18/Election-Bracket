import React, { FC } from 'react';
import { useSearchParams } from "react-router-dom";
import { getSubmission } from '../../common-library/requestHandler.ts'
import { useEffect, useState } from 'react';
import { stateList } from '../../common-library/stateList.ts';
import { politicalParties } from '../../common-library/political-parties.js';
import { Grid } from '@mui/joy';
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
          console.log("use effect")
          setFetchedState(response["submissionMap"])
          setLoaded(true)
          setSubmissionSuccess(true && successParam)
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

  return (
    <Container maxWidth={false} disableGutters sx={{
      bgcolor: 'background.paper',
      height: '100%',
      minHeight: '100vh',
      py: '3%'
    }}>
      {!loaded && (<CircularProgress sx={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }} />)}
      {renderHeader()}
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
    </Grid>)}
    </Container>
  )
}

export default LoadMap;
