import { createSlice } from '@reduxjs/toolkit'
import { politicalParties } from '../common-library/political-parties'
import type {PayloadAction} from "@reduxjs/toolkit"

export const stateSlice = createSlice({
  name: 'stateStatus',
  initialState: {
    "Alabama": politicalParties.republican,
    "Alaska": politicalParties.republican,
    "Arizona": politicalParties.neutral,
    "Arkansas": politicalParties.republican,
    "California": politicalParties.democrat,
    "Colorado": politicalParties.democrat,
    "Connecticut": politicalParties.democrat,
    "Delaware": politicalParties.democrat,
    "Florida": politicalParties.republican,
    "Georgia": politicalParties.neutral,
    "Hawaii": politicalParties.democrat,
    "Idaho": politicalParties.republican,
    "Illinois": politicalParties.democrat,
    "Indiana": politicalParties.republican,
    "Iowa": politicalParties.republican,
    "Kansas": politicalParties.republican,
    "Kentucky": politicalParties.republican,
    "Louisiana": politicalParties.republican,
    "Maine": politicalParties.democrat,
    "Maine1": politicalParties.democrat,
    "Maine2": politicalParties.republican,
    "Maryland": politicalParties.democrat,
    "Massachusetts": politicalParties.democrat,
    "Michigan": politicalParties.neutral,
    "Minnesota": politicalParties.democrat,
    "Mississippi": politicalParties.republican,
    "Missouri": politicalParties.republican,
    "Montana": politicalParties.republican,
    "Nebraska": politicalParties.republican,
    "Nebraska1": politicalParties.republican,
    "Nebraska2": politicalParties.democrat,
    "Nebraska3": politicalParties.republican,
    "Nevada": politicalParties.neutral,
    "New Hampshire": politicalParties.democrat,
    "New Jersey": politicalParties.democrat,
    "New Mexico": politicalParties.democrat,
    "New York": politicalParties.democrat,
    "North Carolina": politicalParties.neutral,
    "North Dakota": politicalParties.republican,
    "Ohio": politicalParties.republican,
    "Oklahoma": politicalParties.republican,
    "Oregon": politicalParties.democrat,
    "Pennsylvania": politicalParties.neutral,
    "Rhode Island": politicalParties.democrat,
    "South Carolina": politicalParties.republican,
    "South Dakota": politicalParties.republican,
    "Tennessee": politicalParties.republican,
    "Texas": politicalParties.republican,
    "Utah": politicalParties.republican,
    "Vermont": politicalParties.democrat,
    "Virginia": politicalParties.democrat,
    "Washington": politicalParties.democrat,
    "West Virginia": politicalParties.republican,
    "Wisconsin": politicalParties.neutral,
    "Wyoming": politicalParties.republican,
    "District of Columbia": politicalParties.democrat,
    "Arizona margin": 99,
    "Georgia margin": 99,
    "Michigan margin": 99,
    "Nevada margin": 99,
    "North Carolina margin": 99,
    "Pennsylvania margin": 99,
    "Wisconsin margin": 99,
    fillSolidState: true,
    email:""

  },
  reducers: {
    nextStateStatus: (state, action: PayloadAction<string>) => {
      const stateName:string = action.payload
      const currentState:number = state[stateName]
      if (currentState == politicalParties.neutral){
        state[stateName] = politicalParties.republican
      }
      else if (currentState == politicalParties.republican){
        state[stateName] = politicalParties.democrat
      }
      else if (currentState == politicalParties.democrat){
        state[stateName] = politicalParties.thirdParty
      }
      else if (currentState == politicalParties.thirdParty){
        state[stateName] = politicalParties.neutral
      }
      else{
        console.log("none of if statmeents hit")
      }
    },
    specifyStateStatus: (state, action: PayloadAction<{stateName:string, politicalParty:string}>) => {
      if(action.payload.politicalParty == 'R'){
        state[action.payload.stateName] = politicalParties.republican
      }
      if(action.payload.politicalParty == 'D'){
        state[action.payload.stateName] = politicalParties.democrat
      }
      if(action.payload.politicalParty == "3rd"){
        state[action.payload.stateName] = politicalParties.thirdParty
      }
      if(action.payload.politicalParty == "N"){
        state[action.payload.stateName] = politicalParties.neutral
      }
    },
    updateVotePercentage: (state, action: PayloadAction<{stateName:string, democrat:number, republican:number, thirdParty:number}>) => {
      state[action.payload.stateName +" breakdown"].Democrat = action.payload.democrat
      state[action.payload.stateName +" breakdown"].Republican = action.payload.republican
      state[action.payload.stateName +" breakdown"]["Third party"] = action.payload.thirdParty
    },
    updateMarginofVictory: (state, action: PayloadAction<{stateName:string, margin:number}>) => {
      state[action.payload.stateName +" margin"] = action.payload.margin
    },
    updateFillSolidState: (state) => {
      console.log("updating fill solid state")
      state.fillSolidState = !state.fillSolidState
    },
    updateEmail: (state, action: PayloadAction<{email:string}>) => {
      state.email = action.payload.email
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateEmail, nextStateStatus, specifyStateStatus, updateVotePercentage, updateFillSolidState, updateMarginofVictory } = stateSlice.actions

export default stateSlice.reducer