import requests
from requests.api import get

def get_current_season():
    endpoint = "http://ergast.com/api/f1/current.json"
    data = requests.get(endpoint).json()
    data = data['MRData']['RaceTable']
    

    return data

print(get_current_season())