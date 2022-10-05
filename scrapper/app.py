
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

        # url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAt_xYc0cqWagkhalw2yhxCojfuYRWOJSk&cx=832efd0a197f0403d&q="+query_param

        # headers = {
        #     "user-agent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}

        # response = requests.request("GET", url, headers=headers, data={})

        # # print(response.text)

        # json_data = json.loads(response.text)
        # print(json_data)
        # external_links = []
        # # print(json_data[:100])
        # if(len(json_data['items']) > 2):
        #     len_links = 2
        # else:
        #     len_links = len(json_data['items'])

        # for i in range(0, len_links):
        #     external_links.append({
        #         'title': json_data['items'][i]['title'],
        #         'link': json_data['items'][i]['link']
        #     })

        # source_code = requests.get(external_links[0]['link'], headers=headers).text
        # # print(source_code)
        # tree = html.fromstring(source_code)
        # #json_obj = json.loads(tree.xpath('//div[@id="json"]/text()')[0])
        # data_list = tree.xpath('/html/body/div[3]/div[3]/div[5]/div[1]/p')
        # j = 0

        # def striphtml(data):
        #     p = re.compile(r'<.*?>')
        #     return p.sub('', data)

        # Information = ''

        # for i in data_list:
        #     if(j == 2):
        #         break
        #     link_str = str(etree.tostring(i))
        #     # print(str(striphtml(link_str))[1:].replace('\\n', ''))
        #     j += 1
        #     if(j == 2):
        #         Information = str(striphtml(link_str))[1:].replace('\\n', '')

        # # print(Information)

        # url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAsOv2Fs7JTEis2-K3yRVRPfXONJj--apA&cx=8554f52727b0f46c9&q="+query_param

        # payload = {}
        # headers = {}

        # response = requests.request("GET", url, headers=headers, data=payload)
        # extra_links = json.loads(response.text)

        # if(len(json_data['items']) > 2):
        #     len_links = 3
        # else:
        #     len_links = len(json_data['items'])

        # for i in range(0, len_links):
        #     external_links.append({
        #         'title': extra_links['items'][i]['title'],
        #         'link': extra_links['items'][i]['link']
        #     })

        # data_obj = {
        #     'title': external_links[0]['title'].split('-')[0],
        #     'information': Information,
        #     'link': external_links[0]['link'],
        #     'links': external_links[1:],
        #     'source': 'Wikipedia'
        # }
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
