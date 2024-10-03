import axios from "axios";

export const contractsData = async () => {
    let contracts = {};

    await axios.get('http://127.0.0.1:8000/rdos/topography/contracts')
    .then(function (response) {
        contracts = response.data
    })
    .catch(function (error) {
    console.log(error);
    })

    return contracts
}
