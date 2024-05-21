import bs4
import requests
liclass = "lLd3Je"
ulclass = "spHGqe" 
link = "https://www.google.com/about/careers/applications/jobs/results/?category=MARKETING&location=United%20States"

data = requests.get(link).text
# print(data)

soup = bs4.BeautifulSoup(data, 'html.parser')
container = soup.find("ul", class_=ulclass)

container = container.find_all("li", class_=liclass)

test = container[0]
# print(test.prettify())

for job in container:
    title = job.find("h3", class_= "QJPWVe").text
    location = job.find("span", class_="r0wTof").text
    try:
        qualifications = job.find("div", class_="VfPpkd-IqDDtd").text
        qualifications = qualifications.split(";")
    except:
        qualifications = "No qualifications listed"
    # print(qualifications)
    minimum_qualifications = job.find("div", class_= "Xsxa1e")
    min_q = []
    for q in minimum_qualifications:
        w = q.text.split('\n')
        print(w)
        min_q.append(w)
    # print(min_q)


    
    
