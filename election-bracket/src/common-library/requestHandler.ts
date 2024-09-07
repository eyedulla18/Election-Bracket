import { stateList } from "./stateList.ts";
import { congressionalElectoralDistricts } from "./congressionalElectoralStates.ts"
import {swingStateList} from "./swingStateList.ts"
export function testApiCall() {
    // https://2r7fhg4206.execute-api.us-east-1.amazonaws.com/test
    fetch("https://2r7fhg4206.execute-api.us-east-1.amazonaws.com/test")
        .then(response => {
            console.log(response.json)
            return response.json()
        })
        .then(data => {
            console.log(data)
        }).catch(error => {
            console.error("eashan error")
            console.error('Error:', error);
        });
}

export function submitMap(state: any) {
    var mapJson = {}

    stateList.forEach((stateName) => {
        mapJson[stateName] = state.stateStatus[stateName]
    })

    congressionalElectoralDistricts.forEach((districtName) => {
        console.log(districtName)
        mapJson[districtName] = state.stateStatus[districtName]
    })

    swingStateList.forEach((swingState)=>{
        mapJson[swingState+" margin"] = state.stateStatus[swingState+" margin"]
    })


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Origin':"http://localhost:3000" },
        body: JSON.stringify({ submissionData: mapJson })
    };
    fetch("https://2r7fhg4206.execute-api.us-east-1.amazonaws.com/submitmap", requestOptions)
        .then(response => {
            console.log(response.json)
            return response.json()
        })
        .then(data => {
            console.log(data)
        }).catch(error => {
            console.error("eashan error")
            console.error('Error:', error);
        });
}