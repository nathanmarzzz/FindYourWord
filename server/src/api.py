from flask import Flask
import json, os
from dotenv import load_dotenv
import http.client
from urllib.parse import urlencode


load_dotenv() # load .env into os with export probly
API_KEY = os.environ.get('words_api_key')

''' for words api ''' 
conn = http.client.HTTPSConnection("wordsapiv1.p.rapidapi.com")
param = {'regex': ''} 
headers = {
        'X-RapidAPI-Host': "wordsapiv1.p.rapidapi.com",
        'X-RapidAPI-Key': API_KEY
}
numbers = ''.join([str(i) for i in range(10)])
# print('nums: ', numbers)
app = Flask(__name__)

def getWords(param):
    pattern = urlencode(param).split("=").pop()
    url = f'/words/?letterPattern={pattern}&limit=100&page=1'

    conn.request(
        'GET',
        url,
        headers=headers
    )

    res = conn.getresponse()
    data = res.read().decode("utf-8")
    code = res.getcode()
    return data, code



@app.route('/wordle/<letters>')
def getWordleWords(letters):
    param['regex'] = '^[^' + letters + numbers + " "+ ']+[^' + letters + numbers + " "+ ']+[^' + letters + numbers + " "+ ']+[^' + letters + numbers + " "+ ']+[^' + letters + numbers + " "+ ']$'
    resp, code = getWords(param)
    
    resp = json.loads(resp)
    print('resp: ', resp)
    words = resp["results"]["data"]

    return {
        'wordle': 'from wordle api', 
        'letters to exclude': letters,
        "words": words,
        "code": code
        }


@app.route('/wordscape/<letters>')
def getWorsdcapeWords(letters):
    seen = set()
    words = []
    try:
        three = '^[' + letters +']+[' + letters +']+[' + letters +']$'
        four =  '^[' + letters +']+[' + letters +']+[' + letters +']+[' + letters +']$'
        five =  '^[' + letters +']+[' + letters +']+[' + letters +']+[' + letters +']+[' + letters +']$'
        
        params = [three, four, five]
        cnt = 3
        for regex in params:
            param['regex'] =  regex
            resp, code = getWords(param)
            resp = json.loads(resp)
            print(f'resp from {cnt}: ', resp)
            cnt +=1

            for word in resp["results"]["data"]:
                if word not in seen:
                    words.append(word)
                    seen.add(word)
            print('words: ', words)
        return {
            'wordscape': 'success from wordscape api',
            'letters to include': letters,
            "words": words,
            "code": code # code only handles one response
        }
    except Exception as e:
        print('ERROR: something went wrong; ', e)
        return{
            'wordscape': 'failed from wordscape api',
            'letters to include': letters,
            "words": [],
            "code": 404
        }
