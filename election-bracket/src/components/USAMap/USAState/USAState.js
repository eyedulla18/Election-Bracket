import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/joy/Tooltip';
import { electoralVotesMap } from '../../../common-library/electoralVotes.ts';
import {congressionalElectoralStateData} from '../../../common-library/congressionalElectoralStates.ts';
const USAState = (props) => {

  function toolTipGenerator(){
    var numberVotes = electoralVotesMap[props.state]
    if(props.state in congressionalElectoralStateData){
      numberVotes += congressionalElectoralStateData[props.state].numDistricts
    }
    return props.state + " " + numberVotes
  }

  return (
    <Tooltip
      arrow={false}
      placement="bottom"
      variant="solid"
      title = {toolTipGenerator()}
    >
      <path d={props.dimensions} fill={props.fill} data-name={props.state} className={`${props.state} state`} onClick={props.onClickState}>
        <title></title>
      </path>
    </Tooltip>
  );
}

USAState.propTypes = {};

USAState.defaultProps = {};

export default USAState;
