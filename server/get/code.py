def get_code():

    #WARNING : SPhagetti code. Fucking refactor this.
    import pandas as pd
    import os
    from utils.cleaning import get_day_of_year, get_duration


    TIME_SHEETS_PATH = './100 Days'

    # Each week folder contains the Time Sheets for that week
    week_folders = os.listdir(TIME_SHEETS_PATH)
    time_sheets = []
    df_dict = {}
    for week_folder in week_folders: 
        week_path = os.path.join(TIME_SHEETS_PATH, week_folder)
        if os.path.isdir(week_path):
            google_sheets_for_the_week = [f.split('.')[0] for f in os.listdir(week_path)]
            time_sheets.extend(google_sheets_for_the_week)
            for t in google_sheets_for_the_week: 
                df_dict[t] = os.path.join(week_path, t)

    df_list = []
    for x in sorted(time_sheets, key = get_day_of_year):
        aa = df_dict[x]
        y = aa.replace('\\', '/').replace('\\', '/')
        y += '.csv'
        df = pd.read_csv(y)
        df['date'] = df.iloc[:, 1].apply(lambda _ : x)
        df = df.iloc[1:]
        df_list.append(df)

    #Total time coding last 5 days
    code = []
    def is_code(x): 
        x = str(x)
        if 'CT' in x.upper() or 'code' in x.lower(): 
            return True
        return False

    durations = []
    for df in df_list: 
        df = df[df.iloc[:, 1].apply(is_code)]
        duration = df.iloc[:, 0].apply(get_duration)
        duration = duration.sum()
        durations.append(duration)

    last_week = sum(durations[-15:-8])
    this_week = sum(durations[-8:-1])
    percentage = this_week -  last_week / last_week
    code_data = {
        'today': round(durations[-1], 2), 
        'week': durations[-8:-1], 
        'percentage': round(percentage, 2)
    }

    return code_data
