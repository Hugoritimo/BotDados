import json
from typing

import Union

import pandas as pd
from fastapi import FastAPI
from services.data import extract_production_data, pending_status_filter
from services.topography import topography_status

app = FastAPI()


@app.get("/rdos/topography/pending")
def rdos_topography(contrato: Union[str, None] = None):
    data = extract_production_data('','')
    data = topography_status(data)
    data = pending_status_filter(data)
    data = data[['DATA RDO', 'DIA DA SEMANA', 'CONTRATO', 'LÍDER EQUIPE']]
    data['DATA RDO'] = data['DATA RDO'].dt.strftime('%d/%m/%Y')
    data = data.fillna('')
    if(contrato != None and contrato != ''):
        data = data[data['CONTRATO'] == contrato]
        response_data = data.to_dict('records')
    else: response_data = data.to_dict('records')
    
    return response_data

@app.get("/rdos/topography/contracts")
def topography_contracts():
    data = extract_production_data('','')
    data = topography_status(data)
    data = pending_status_filter(data)
    uniques_contracts = data['CONTRATO'].unique()
    data = pd.DataFrame()
    data['CONTRATO'] = uniques_contracts
    response_data = data.to_dict('records')
    
    return response_data