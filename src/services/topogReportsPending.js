import { contractsData } from "../data/contractsData.js";
import { topogContractsResponse } from "../utils/responses/topogContractsResponse.js";
import { rdoPendente } from "../utils/responses/topogReportsResponse.js";

const regexNumero = /^\d$/;
let stage = 0

const topogReportsPending = async (msg) => {

    if(msg.body === '!statusrdo' && stage === 0){
        const contratos = await topogContractsResponse()
        msg.reply(contratos)
        stage = 1
    }

    if(regexNumero.test(msg.body) && stage === 1){
        const contratos = await contractsData()
        const contractNumber = parseInt(msg.body)

        if(contractNumber < contratos.length+1 && contractNumber != 0){
            const reportsPending = await rdoPendente(contratos[contractNumber-1]['CONTRATO'])
            msg.reply(reportsPending)
        }
        else if (contractNumber === 0) {
            const reportsPending = await rdoPendente('')
            msg.reply(reportsPending)
        }
        else{
            msg.reply('contrato *NÃO* está na lista')
        }
        stage = 0
    }
}

export default topogReportsPending