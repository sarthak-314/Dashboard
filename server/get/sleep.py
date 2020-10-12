def get_sleep(): 

    #No

    import pandas as pd
    import os
    from utils.cleaning import get_day_of_year, get_duration


    TIME_SHEETS_PATH = './100 Days'
    SMARTWATCH_SHEETS = './Smartwatch Stats'

    week_folders = os.listdir(TIME_SHEETS_PATH)
    time_sheets = []
    for week_folder in week_folders: 
        week_path = os.path.join(TIME_SHEETS_PATH, week_folder)
        if os.path.isdir(week_path):
            google_sheets_for_the_week = [f.split('.')[0] for f in os.listdir(week_path)]
            time_sheets.extend(google_sheets_for_the_week)

    smarts = os.listdir(SMARTWATCH_SHEETS)

    def get_week(x): 
        x = x.split('.')[0]
        x = x.split(' ')[1]
        return int(x)
    brr = sorted(smarts, key=get_week)

    sleep = {}
    for b in brr: 
        path_o = os.path.join(SMARTWATCH_SHEETS, b)
        df  = pd.read_csv(path_o)
        daada = df.iloc[:, 1].apply(get_duration)
        dateasi = df.iloc[:, 0]
        sleepli = []
        dateli = []
        for i in daada.iteritems():
            sleepai = i[1]
            sleepli.append(sleepai)
        for i in dateasi.iteritems(): 
            dateai = i[1]
            dateli.append(dateai)
        
        for dait, slip in zip(dateli, sleepli): 
            sleep[dait] = slip

    sleeps = []
    for ai in sorted(time_sheets, key = get_day_of_year):
        if not ai in sleep:
            continue
        sleeps.append(sleep[ai])

    last_week = sum(sleeps[-15:-8])
    this_week = sum(sleeps[-8:-1])
    percentage = (this_week - last_week) / last_week * 100
    sleep_data = {
        'today': sleeps[-1], 
        'week': sleeps[-8:-1], 
        'percentage': round(percentage, 2)
    }

    return sleep_data

if __name__ == '__main__': 
    get_sleep()