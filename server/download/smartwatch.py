def download_smartwatch(): 

    #BAD BAD Code
    from googleapiclient.http import MediaIoBaseDownload
    from googleapiclient.discovery import build
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    import io
    import os
    import pickle

    SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

    FOLDER_NAME = 'Smartwatch Stats'
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=1337)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token, protocol=0)
    service = build('drive', 'v3', credentials=creds)

    folder_id = ''
    location = ''
    folder = service.files().list(
            q=f"name contains '{FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder'",
            fields='files(id, name, parents)').execute()

    total = len(folder['files'])
    print(folder)
    folder_id = folder['files'][0]['id']
    FOLDER_NAME = folder['files'][0]['name']
    download_folder(service, folder_id, location, FOLDER_NAME)

def get_full_path(service, folder):
    if not 'parents' in folder:
        return folder['name']
    files = service.files().get(fileId=folder['parents'][0], fields='id, name, parents').execute()
    path = files['name'] + ' > ' + folder['name']
    while 'parents' in files:
        files = service.files().get(fileId=files['parents'][0], fields='id, name, parents').execute()
        path = files['name'] + ' > ' + path
    return path

def download_folder(service, folder_id, location, FOLDER_NAME):

    if not os.path.exists(location + FOLDER_NAME):
        os.makedirs(location + FOLDER_NAME)
    location += FOLDER_NAME + '/'

    result = []
    page_token = None
    while True:
        files = service.files().list(
                q=f"'{folder_id}' in parents",
                fields='nextPageToken, files(id, name, mimeType)',
                pageToken=page_token,
                pageSize=1000).execute()
        result.extend(files['files'])
        page_token = files.get("nextPageToken")
        if not page_token:
            break

    result = sorted(result, key=lambda k: k['name'])

    total = len(result)
    current = 1
    for item in result:
        file_id = item['id']
        filename = item['name']
        mime_type = item['mimeType']
        print(f'{file_id} {filename} {mime_type} ({current}/{total})')
        if mime_type == 'application/vnd.google-apps.folder':
            download_folder(service, file_id, location, filename)
        elif not os.path.isfile(location + filename):
            download_file(service, file_id, location, filename, mime_type)
        current += 1

def download_file(service, file_id, location, filename, mime_type):

    if 'vnd.google-apps' in mime_type:
        request = service.files().export_media(fileId=file_id,
                mimeType='text/csv')
        filename += '.csv'
    else:
        request = service.files().get_media(fileId=file_id)
    fh = io.FileIO(location + filename, 'wb')
    downloader = MediaIoBaseDownload(fh, request, 1024 * 1024 * 1024)
    done = False
    while done is False:
        try:
            status, done = downloader.next_chunk()
        except:
            fh.close()
            os.remove(location + filename)
        print(f'\rDownload {int(status.progress() * 100)}%.', end='')
    print('')


if __name__ == '__main__': 
    download_all_worksheets()