from datetime import datetime as dt
import datetime
from db import main
articledb = main.article
from bson import ObjectId
from userdb import get_user_by_id



def add_new_article(title, content, author):
     day, month, year = dt.now().strftime("%d-%m-%Y").split('-')
     date_obj = datetime.date(int(year), int(month), int(day))
     datetime_obj = datetime.datetime.combine(date_obj, datetime.time.min)   
     res = articledb.insert_one({
          "title": title,
          "content": content,
          "author": ObjectId(author),
          "likes": 0,
          "liked_by": [],
          "date": datetime_obj

     })
     return str(res.inserted_id)
     


def get_article_by_id(id):
    return articledb.find_one({"_id": ObjectId(id)})

def get_article_by_title(title):
    return articledb.find_one({"title": title})

def get_articles_by_author(author):
    return articledb.find({"author": author})

def get_all_articles(user_id, offset, limit):
    result = []
    articles = list(articledb.find().sort([('date', -1)]).skip(int(offset)).limit(limit))
    # print(articles)
    for article in range(len(articles)):
        articles[article]["_id"] = str(articles[article]['_id'])
        articles[article]['date'] = convert_date(str(articles[article]['date']))
        articles[article]["liked_by"] = [str(user) for user in articles[article]["liked_by"]]
        if user_has_liked(user_id, str(articles[article]['_id'])):
            articles[article]["liked"] = True
        else:
            articles[article]["liked"] = False
        # print(articles[article]["author"])
        articles[article]["author"] = get_user_by_id(str(articles[article]["author"]))['name']
        result.append(articles[article])
    return result

def get_post(user_id,post_id):
    article = articledb.find_one({'_id': ObjectId(post_id)})
    article['_id'] = str(article['_id'])
    article['liked_by'] = [str(get_user_by_id(user)['name']) for user in article["liked_by"]]
    article["author"] = get_user_by_id(str(article["author"]))['name']
    if user_has_liked(user_id, article['_id']):
        article["liked"] = True
    else:
        article["liked"] = False
    return article

def like_article(user_id,post_id):
    articledb.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": 1}})
    articledb.update_one({"_id": ObjectId(post_id)}, {"$push": {"liked_by": ObjectId(user_id)}})

def unlike_article(user_id, post_id):
    articledb.update_one({"_id": ObjectId(post_id)}, {"$inc": {"likes": -1}})
    articledb.update_one({"_id": ObjectId(post_id)}, {"$pull": {"liked_by": ObjectId(user_id)}})

def user_has_liked(user_id, post_id):
    return bool(articledb.find_one({"_id": ObjectId(post_id), "liked_by": ObjectId(user_id)}))


def delete_article(id):
    articledb.delete_one({"id": ObjectId(id)})

def get_admin_articles():
    userid = ObjectId("663f8016e127d2bcd3f1673d")
    return list(articledb.find({"author": userid}))
    
def get_all_articles_with_author(user_id):
    pipeline = [
        {
            "$lookup": {
                "from" : "article",
                "localField": "author",
                "foreignField": "_id",
                "as": "author_info"
            }
        },
        {
            "$unwind": "$author_info" 
        },
        {
          "$project": {
                "_id": 1,
                "title": 1,
                "content": 1,
                "date": 1,
                "liked_by": 1,
                "liked": {
                    "$in": [ObjectId(user_id), "$liked_by"]
                },
                "author": "$author_info.name"
        }
        }
    ]
    return list(articledb.aggregate(pipeline))
# print(get_all_articles_with_author('6632b492d30b47d3c677308a'))
# print(get_post('66328c6ee4bed132ba351782','6632b492d30b47d3c677308a'))
def convert_date(date_str):
    # Convert the date string to a datetime object
    date_obj = dt.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    
    # Get the day as a number
    day_number = date_obj.day
    
    # Get the month as words
    month_words = date_obj.strftime("%B")
    
    return f'{day_number} {month_words}'