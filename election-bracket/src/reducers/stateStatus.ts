import { createSlice } from '@reduxjs/toolkit'
import { politicalParties } from '../common-library/political-parties'
import type {PayloadAction} from "@reduxjs/toolkit"

export const stateSlice = createSlice({
  name: 'stateStatus',
  initialState: {
    "Alabama": politicalParties.neutral,
    "Alaska": politicalParties.neutral,
    "Arizona": politicalParties.neutral,
    "Arkansas": politicalParties.neutral,
    "California": politicalParties.neutral,
    "Colorado": politicalParties.neutral,
    "Connecticut": politicalParties.neutral,
    "Delaware": politicalParties.neutral,
    "Florida": politicalParties.neutral,
    "Georgia": politicalParties.neutral,
    "Hawaii": politicalParties.neutral,
    "Idaho": politicalParties.neutral,
    "Illinois": politicalParties.neutral,
    "Indiana": politicalParties.neutral,
    "Iowa": politicalParties.neutral,
    "Kansas": politicalParties.neutral,
    "Kentucky": politicalParties.neutral,
    "Louisiana": politicalParties.neutral,
    "Maine": politicalParties.neutral,
    "Maine1": politicalParties.neutral,
    "Maine2": politicalParties.neutral,
    "Maryland": politicalParties.neutral,
    "Massachusetts": politicalParties.neutral,
    "Michigan": politicalParties.neutral,
    "Minnesota": politicalParties.neutral,
    "Mississippi": politicalParties.neutral,
    "Missouri": politicalParties.neutral,
    "Montana": politicalParties.neutral,
    "Nebraska": politicalParties.neutral,
    "Nebraska1": politicalParties.neutral,
    "Nebraska2": politicalParties.neutral,
    "Nebraska3": politicalParties.neutral,
    "Nevada": politicalParties.neutral,
    "New Hampshire": politicalParties.neutral,
    "New Jersey": politicalParties.neutral,
    "New Mexico": politicalParties.neutral,
    "New York": politicalParties.neutral,
    "North Carolina": politicalParties.neutral,
    "North Dakota": politicalParties.neutral,
    "Ohio": politicalParties.neutral,
    "Oklahoma": politicalParties.neutral,
    "Oregon": politicalParties.neutral,
    "Pennsylvania": politicalParties.neutral,
    "Rhode Island": politicalParties.neutral,
    "South Carolina": politicalParties.neutral,
    "South Dakota": politicalParties.neutral,
    "Tennessee": politicalParties.neutral,
    "Texas": politicalParties.neutral,
    "Utah": politicalParties.neutral,
    "Vermont": politicalParties.neutral,
    "Virginia": politicalParties.neutral,
    "Washington": politicalParties.neutral,
    "West Virginia": politicalParties.neutral,
    "Wisconsin": politicalParties.neutral,
    "Wyoming": politicalParties.neutral,
    "District of Columbia": politicalParties.neutral,
    "Arizona margin": 99,
    "Georgia margin": 99,
    "Michigan margin": 99,
    "Nevada margin": 99,
    "North Carolina margin": 99,
    "Pennsylvania margin": 99,
    "Wisconsin margin": 99,
    fillSolidState: false,
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