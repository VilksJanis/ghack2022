import random
import json

import flask
from flask import request, jsonify


from google.cloud import pubsub_v1
publisher = pubsub_v1.PublisherClient()
topic_name = publisher.topic_path("hackathons-348619", "article_data")

app = flask.Flask(__name__)

@app.route("/get/article/footprint/<article_id>")
def get_article_footprint(article_id):
    return jsonify(random.randint(0,2))


@app.route("/post/article/<article_id>", methods=["POST"])
def post_articles(article_id):
    if request.method == 'POST':
        data = request.form # a multidict containing POST data
        json_data = json.loads(data)
        json_data["article_id"] = article_id
        publisher.publish(topic_name, data=bytes(json.dumps(json_data), "utf-8"))

    return jsonify(1)


@app.route("/")
def root():
    return jsonify("Extension Gateway")


if __name__ == "__main__":
    # Used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host="localhost", port=8080)