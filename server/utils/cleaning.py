def get_day_of_year(file_name):
    MONTH_NUMBER = {'August' : 80, 'September' : 90, 'Octuber' : 100, 'October': 100}
    DAYS_IN_PREV_MONTH = {'August' : 31, 'September' : 31, 'Octuber' : 30, 'October': 30}
    #file_name = file_name.split('.')[0]
    #TODO: Delete this shit
    if 'HD' in file_name: 
        file_name = file_name[:-5]
    if 'Copy' in file_name: 
        return 1000
        
    date, month = file_name.split(' ')
    if date[:2].isdigit(): 
        date = int(date[:2])
    else: 
        date = int(date[0])
    month_number = MONTH_NUMBER[month]
    days_in_prev_month = DAYS_IN_PREV_MONTH[month]
    return date + (month_number-1) * days_in_prev_month




def get_duration(entry):
    from datetime import datetime
    entry = str(entry)
    try:
        start, end = get_start_N_end(entry)
        return duration(start, end)
    except:
        if 'min' in entry: 
            minutes = entry[ : entry.find('min')]
            minutes = int(minutes.strip())
            return minutes / 60

def get_starting_time(entry):
    from datetime import datetime
    entry = str(entry)
    try:
        start, _ = get_start_N_end(entry)
        return start
    except: 
        return float('NaN')

def get_start_N_end(time_range):
    from datetime import datetime
    time_range = str(time_range)
    if '-' in time_range: 
        time_start, time_end = time_range.split('-')
        if not time_end: 
            time_end = time_start
        return time_start.strip(), time_end.strip()
    return None

def duration(start_time, end_time):
    from datetime import datetime
    FMT = '%I:%M %p'
    if not start_time or not end_time: 
        return None
    timedelta = datetime.strptime(end_time, FMT) - datetime.strptime(start_time, FMT) 
    hours_passed = timedelta.seconds / 3600
    return hours_passed

    

