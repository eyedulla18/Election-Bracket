import React, { FC } from 'react';
import { Grid, Chip } from '@mui/joy';
import { politicalParties } from '../../common-library/political-parties.js';



interface CongressionalDistrictStatusProps {
  districtInfo
}

const CongressionalDistrictStatus: FC<CongressionalDistrictStatusProps> = (props) => {
  function createChips(){
    var chips:any = []
    for(var districtName in props.districtInfo){
      var color = ""
      if(props.districtInfo[districtName] === politicalParties.democrat){
        color = "#0092CC"
      }
      else if(props.districtInfo[districtName] === politicalParties.republican){
        color = "#FF3333"
      } 
      else if(props.districtInfo[districtName] === politicalParties.thirdParty){
        color = "#779933"
      } 
      chips.push(
        <Grid sx={{p:1}}><Chip sx={{bgcolor:color}}>
          {districtName}
        </Chip></Grid>
      )
    }
    return chips
  }
  return(
      createChips()
  );
}

export default CongressionalDistrictStatus;
