const __extension_carbon_footprint_assistant_init__ = async () => {
    console.log("Inject script initialized");
}

__extension_carbon_footprint_assistant_init__()
    .then(() => retreive_articles_from_html())
    .then((articles) => send_articles(articles))
    .catch((e) => {
        console.log(e)
    });


const retreive_articles_from_html = async () => {
    let articles = document.getElementsByTagName("article");

    for (var i = 0; i < articles.length; i++) {
        articles[i].style.background = "red";
    }
    
    return articles
};

const send_articles = async (articles) => {
    console.log("ARTICLES");
};
