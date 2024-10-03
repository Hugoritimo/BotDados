import tempfile

import pandas as pd
from smb.SMBConnection import SMBConnection


def extract_production_data(username:str, password:str, server='', share_name=''):
    
    conn = SMBConnection(username, password, 'BOT', server, use_ntlm_v2=True, is_direct_tcp=True)
    conn.connect(server, 445)
   
    file_path = ''

    file_obj = tempfile.NamedTemporaryFile()
    conn.retrieveFile(share_name, file_path, file_obj)
    
    df = pd.read_excel(file_obj, skiprows=4)
    df = df.drop('Unnamed: 0', axis=1)
    
    conn.close()
    return df

def pending_status_filter(df): return df[df['RDO FÍSICO'] != 'ok'] 