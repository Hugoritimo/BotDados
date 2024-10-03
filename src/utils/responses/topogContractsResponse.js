import axios from "axios";

export const topogContractsResponse = async () => {
    let contracts = {};

    await axios.get('http://127.0.0.1:8000/rdos/topography/contracts')
    .then(function (response) {
        contracts = response.data
    })
    .catch(function (error) {
    console.log(error);
    })

    const header =  `*Selecione um contrato:*
    
        *0* - *Todos*
    ` 
    let body = ''
    contracts.forEach((element, index) => {
        body += `
        *${index+1}* - *${element['CONTRATO']}*
        `
        
    });

    const completeMessage = header + body

    return completeMessage

}
