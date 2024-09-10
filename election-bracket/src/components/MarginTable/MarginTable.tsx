import React, { FC } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import DemocraticIcon from "../../images/Democratic_Disc.png"
import RepublicanIcon from "../../images/Republican_Disc.png"
import GreenIcon from "../../images/Green_Disc.png"
import Avatar from '@mui/joy/Avatar';
import { green } from '@mui/material/colors';
import { politicalParties } from '../../common-library/political-parties.js';



interface MarginTableProps { 
  swingStateInfo
}


const MarginTable: FC<MarginTableProps> = (props) => {
  function generateRows(){
    var rows:any = []
    for (var swingState in props.swingStateInfo) {
      var icon = GreenIcon
      if(props.swingStateInfo[swingState]["winner"]===politicalParties.democrat){
        icon = DemocraticIcon
      }
      else if(props.swingStateInfo[swingState]["winner"]===politicalParties.republican){
        icon = RepublicanIcon
      }
      rows.push(
        <tr>
          <td>{swingState}</td>
          <td><Avatar variant="solid" src={icon}></Avatar></td>
          <td>{props.swingStateInfo[swingState]["margin"]}</td>
        </tr>
      )
    }
    return rows
  }


  return (
    <Sheet sx={{ maxHeight: "50vh", overflow: 'auto' }}>
    <Table aria-label="basic table" stickyHeader>
      <thead>
        <tr>
          <th>State</th>
          <th>Winner</th>
          <th>Margin of Victory %</th>
        </tr>
      </thead>
      <tbody>
        {generateRows()}
      </tbody>
    </Table>
    </Sheet>
  )
}

export default MarginTable;
