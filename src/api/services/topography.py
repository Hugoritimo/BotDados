import datetime
import locale


def topography_status(df):
    locale.setlocale(locale.LC_TIME, 'pt_BR.UTF-8')
    actual_data = datetime.datetime.now()
    actual_month_name = actual_data.strftime('%B').capitalize()
    df_data_filtered = df[df['CICLO'] == actual_month_name] 
    df_area_filtered = df_data_filtered[df_data_filtered['ÁREA'] == 'Topografia'] 
    return df_area_filtered