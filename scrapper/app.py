
import requests
import json
from lxml import html

from flask import Flask, request

app = Flask(__name__, static_folder='templates/static',)


@app.route('/getData', methods=['POST'])
def data():
    if request.method == 'POST':
        args = request.args
        # print(request.get_json())
        query_param = args.get('query_param')
        print(query_param)

        sites = ["google", "twitter", "crunchbase"]

        final_list = {
            "google": [],
            "twitter": [],
            "crunchbase": []
        }
        for a in sites:
            url = 'https://www.google.com/search?q='+query_param+'+'+a+'&tbm=nws'
            payload = {}
            headers = {}
            news_url = []
            response = requests.request(
                "GET", url, headers=headers, data=payload).text

            tree = html.fromstring(response)

            data_list = tree.xpath(
                '//a/@href')
            # print(data_list)
            data_list.sort()
            for i in range(20, 26):
                if("support" not in data_list[i]):
                    data_list[i] = data_list[i].split("%3Futm", 1)[0]
                    data_list[i] = data_list[i].split("&sa=U&ved=", 1)[0]
                    final_list[a].append(
                        data_list[i].replace("/url?q=", ""))
                    
        return json.dumps(final_list, separators=(',', ':'))


if __name__ == '__main__':
    app.run(debug=True)
# print(companies)

'''
soup = bs(source_code.text, 'html.parser')
# print(soup.prettify())

body = soup.body
for child in body.descendants:
    print(child.text)
'''
