import axios from "axios";

export async function rdoPendente(contrato) {
    let rdosPendentes = [];

    await axios.get(`http://127.0.0.1:8000/rdos/topography/pending?contrato=${contrato}`)
    .then(function (response) {
        rdosPendentes = response.data
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    
    const header = `======== *RDOs Pendentes* ========`
    let body = ''
    rdosPendentes.forEach(element => {
        body += `
        
        ================================
        *Responsavel*: ${element['LÍDER EQUIPE']}
        *Data*: ${element['DATA RDO']} 
        *Dia da semana*: ${element['DIA DA SEMANA']} 
        *Contrato*: ${element['CONTRATO']} `
        
    });

    const completeMessage = header + body

    return completeMessage
}