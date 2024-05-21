from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://olola73:olola73@cluster0.rhbybqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

main = client.main