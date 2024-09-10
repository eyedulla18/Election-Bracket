import { stateList } from "./stateList.ts";
import { congressionalElectoralDistricts } from "./congressionalElectoralStates.ts"
import {swingStateList} from "./swingStateList.ts"

export function submitMap(state: any) {
    var mapJson = {}

    stateList.forEach((stateName) => {
        mapJson[stateName] = state.stateStatus[stateName]
    })

    congressionalElectoralDistricts.forEach((districtName) => {
        mapJson[districtName] = state.stateStatus[districtName]
    })

    swingStateList.forEach((swingState)=>{
        mapJson[swingState+" margin"] = state.stateStatus[swingState+" margin"]
    })

    mapJson["email"] = state.stateStatus["email"]

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionData: mapJson })
    };
    return fetch("https://2r7fhg4206.execute-api.us-east-1.amazonaws.com/submitmap", requestOptions)
        .then(response => {
            if(response.ok){
                return response.text()
            }
        })
        .then(text => {
            console.log(text)
            return {"rc":0, "submissionId":text}
        })
        .catch(error => {
            console.error('Error:', error);
            return {"rc":1}
        });
}

export function getSubmission(submissionId:string){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };    
    return fetch("https://2r7fhg4206.execute-api.us-east-1.amazonaws.com/getSubmission?submissionId="+submissionId, requestOptions)
        .then(response => {
            if(response.ok){
                return response.text()
            }
        })
        .then(text => {
            console.log(text)
            return {"rc":0, "submissionMap":JSON.parse(text!)}
        })
        .catch(error => {
            console.error('Error:', error);
            return {"rc":1}
        });
}