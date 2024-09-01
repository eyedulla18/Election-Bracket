import { stateList } from './stateList.ts'
import { electoralVotesMap } from './electoralVotes.ts'
import { politicalParties } from './political-parties'
import { congressionalElectoralStateData, congressionalElectoralStatesList } from './congressionalElectoralStates.ts'
export default function tallyCurrentResults(state){
    var democrat:number = 0
    var republican:number = 0
    var thirdParty:number = 0
    var neutral:number = 0

    for(var i=0; i<stateList.length; ++i){
        const stateName = stateList[i]
        const stateElectoralVotes = electoralVotesMap[stateName]
        const partySelection = state.stateStatus[stateName]

        if(partySelection==politicalParties.democrat){
            democrat += stateElectoralVotes
        }
        if(partySelection==politicalParties.republican){
            republican += stateElectoralVotes
        }
        if(partySelection==politicalParties.thirdParty){
            thirdParty += stateElectoralVotes
        }
        if(partySelection==politicalParties.neutral){
            neutral += stateElectoralVotes
        }
    }

    //account for states with special rules 
    for(var i=0; i<congressionalElectoralStatesList.length; ++i){
        const specialState = congressionalElectoralStatesList[i];
        const numberDistricts = congressionalElectoralStateData[specialState].numDistricts
        
        for(var district=1; district<=numberDistricts; ++district){
            const districtPartySelection = state.stateStatus[specialState+district]
            if(districtPartySelection==politicalParties.democrat){
                democrat += 1
            }
            if(districtPartySelection==politicalParties.republican){
                republican += 1
            }
            if(districtPartySelection==politicalParties.thirdParty){
                thirdParty += 1
            }
            if(districtPartySelection==politicalParties.neutral){
                neutral += 1
            }
        }
    }


    return {"Democrat":democrat, "Republican":republican, "Third Party": thirdParty, "None": neutral}
}