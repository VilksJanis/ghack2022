const __extension_carbon_footprint_assistant_init__ = async () => {
    console.log("gggggg");
}

__extension_carbon_footprint_assistant_init__()
    .then(() => retreive_articles())
    .then(() => send_articles())
    .catch((e) => {
        console.log(e)
    });


const retreive_articles = async () => {
    let articles = document.getElementsByTagName("article");

    for (var i = 0; i < articles.length; i++) {
        articles[i].style.background = "red";
    }
};

const send_articles = async () => {
    console.log("ARTICLES");
};
