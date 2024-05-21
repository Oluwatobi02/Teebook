import requests
import pandas as pd
from articledb import add_new_article
response = requests.get('https://jsonplaceholder.typicode.com/posts')
data = response.text

df = pd.read_csv("example.csv")
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
df = df.loc[:, ~df.columns.str.contains('userId')]
df = df.loc[:, ~df.columns.str.contains('id')]
df['author'] = "Admin"
df.rename(columns={"body": "content"}, inplace=True)

d = df.to_dict()

def populate_articles():
    for i in range(0, 100):
        # print(f"title: {d["title"][i]}, content: {d["content"][i]}, author: {d["author"][i]}")
        add_new_article(d["title"][i], d["content"][i], d["author"][i])