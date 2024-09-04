import React from 'react';
import PropTypes from 'prop-types';
import USAMap from '../USAMap/USAMap';
import { useSelector, useDispatch } from 'react-redux'
import { nextStateStatus } from '../../reducers/stateStatus.ts';
import { useState } from 'react';
import { stateList } from '../../common-library/stateList.ts';
import { politicalParties } from '../../common-library/political-parties.js';
import SelectorListView from '../SelectorListView/SelectorListView.tsx';
import Stack from '@mui/joy/Stack';
import VoteTracker from '../VoteTracker/VoteTracker.tsx';
import VotePercentageModal from '../VotePercentageModal/VotePercentageModal.tsx';
import { swingStateList } from '../../common-library/swingStateList.ts';
import CongressionalDistrictStatesModal from '../CongressionalDistrictStates/CongressionalDistrictStates.tsx';
import { congressionalElectoralStatesList, congressionalElectoralStateData } from '../../common-library/congressionalElectoralStates.ts';
import BottomAppBar from '../BottomAppBar/BottomAppBar.tsx';
import Button from '@mui/joy/Button';
import { Container } from '@mui/material';
import { Grid } from '@mui/joy';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import IntroModal from '../IntroModal/IntroModal.tsx';
import SettingsModal from '../SettingsModal/SettingsModal.tsx';
import { congressionalElectoralDistricts } from '../../common-library/congressionalElectoralStates.ts'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { smallStateList } from '../../common-library/smallStateList.ts'




const MainControl = () => {
  const [updatedState, setUpdatedState] = useState("");
  const [open, setOpen] = useState(true);
  const [openCongressionalElectoralModal, setOpenCongressionalElectoralModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(true);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const stateStatus = useSelector((state) => state)
  const statePercentageBreakdown = useSelector((state) => state.stateStatus[updatedState + " breakdown"])
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  console.log(mode)

  function stateClickedHandler(event) {
    setUpdatedState(event.target.dataset.name)

  }

  function swingStateModalOnClick(event) {
    setUpdatedState(event.target.dataset.name)
    setOpen(true)
  }

  function congressionalElectoralStateModalOnClick(event) {
    setUpdatedState(event.target.dataset.name)
    setOpenCongressionalElectoralModal(true)
  }

  function renderCongressionalElectoralModal() {
    if (updatedState == "" || congressionalElectoralStatesList.includes(updatedState) == false) {
      return
    }
    return (
      <CongressionalDistrictStatesModal
        openCongressionalElectoralModal={openCongressionalElectoralModal}
        setOpenCongressionalElectoralModal={setOpenCongressionalElectoralModal}
        stateName={updatedState}
        numDistricts={congressionalElectoralStateData[updatedState].numDistricts}
      >

      </CongressionalDistrictStatesModal>
    )
  }

  function displaySwingStateModal(stateName) {
    if (swingStateList.includes(stateName)) {
      return <VotePercentageModal
        stateName={stateName}
        open={open}
        setOpen={setOpen}
        statePercentageBreakdown={statePercentageBreakdown}
      >
      </VotePercentageModal>
    }

  }

  function customize(stateStatus) {
    var customizeMap = {}
    for (var i = 0; i < stateList.length; ++i) {
      if (stateStatus.stateStatus[stateList[i]] == politicalParties.republican) {
        customizeMap[stateList[i]] = { fill: "#FF3333" }
      }
      else if (stateStatus.stateStatus[stateList[i]] == politicalParties.democrat) {
        customizeMap[stateList[i]] = { fill: "#0092CC" }
      }
      else if (stateStatus.stateStatus[stateList[i]] == politicalParties.thirdParty) {
        customizeMap[stateList[i]] = { fill: "#779933" }
      }
    }
    for (var i = 0; i < swingStateList.length; ++i) {
      if (swingStateList[i] in customizeMap) {
        customizeMap[swingStateList[i]]['clickHandler'] = swingStateModalOnClick
      }
      else {
        customizeMap[swingStateList[i]] = { clickHandler: swingStateModalOnClick }
      }
    }
    for (var i = 0; i < congressionalElectoralStatesList.length; ++i) {
      if (congressionalElectoralStatesList[i] in customizeMap) {
        customizeMap[congressionalElectoralStatesList[i]]['clickHandler'] = congressionalElectoralStateModalOnClick
      }
      else {
        customizeMap[congressionalElectoralStatesList[i]] = { clickHandler: congressionalElectoralStateModalOnClick }
      }
    }
    return customizeMap
  }

  function updateStateStatus() {
    if (updatedState != "" && swingStateList.includes(updatedState) == false && congressionalElectoralStatesList.includes(updatedState) == false) {
      dispatch(nextStateStatus(updatedState))
      setUpdatedState("")
    }
  }

  const dispatch = useDispatch()
  updateStateStatus()
  console.log(mode)
  if (mode == 'light') {
    setJoyMode(mode === 'dark' ? 'light' : 'dark')
    setMaterialMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <Container maxWidth={false} disableGutters sx={{
      bgcolor: 'background.paper',
      height: '100%',
      minHeight: '100vh',
      py: '3%'
    }}>
      <SettingsModal open={openSettingsModal} setOpen={setOpenSettingsModal}></SettingsModal>
      <IntroModal open={openInfoModal} setOpen={setOpenInfoModal}></IntroModal>
      {renderCongressionalElectoralModal()}
      {displaySwingStateModal(updatedState)}
      <VoteTracker></VoteTracker>
      <BottomAppBar setOpenInfoModal={setOpenInfoModal} setOpenSettingsModal={setOpenSettingsModal} state={stateStatus}></BottomAppBar>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container direction={'row'} sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Grid>
            <USAMap
              title={""}
              onClick={stateClickedHandler}
              customize={customize(stateStatus)}
            />
          </Grid>
          <Tabs sx={{mt: "5vh",}}>
            <TabList
              tabFlex={"auto"}
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: 'xl',
                bgcolor: 'background.level1',
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: 'sm',
                  bgcolor: 'background.surface',
                },
              }}
            >
              <Tab
                variant="plain"
                color="neutral"
                disableIndicator>
                Small States
              </Tab>
              <Tab
                variant="plain"
                color="neutral"
                disableIndicator>
                All States
              </Tab>
            </TabList>
            <TabPanel value={0}>
              <SelectorListView stateList={smallStateList}></SelectorListView>
            </TabPanel>
            <TabPanel value={1}>
              <SelectorListView stateList={stateList.concat(congressionalElectoralDistricts)}></SelectorListView>
            </TabPanel>
          </Tabs>
        </Grid>

      </Stack>
    </Container>
  )
};

MainControl.propTypes = {};

MainControl.defaultProps = {};

export default MainControl;
