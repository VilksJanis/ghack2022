const __extension_carbon_footprint_assistant_init__ = async () => {
    console.log("Inject script initialized");
}

__extension_carbon_footprint_assistant_init__()
    .then(() => retreive_articles_from_html())
    .then((articles) => send_articles(articles))
    .catch((e) => {
        console.log(e)
    });



// Get data from Server
const retreive_articles_from_html = async () => {


    let articles = document.getElementsByTagName("article");
    let article_id = 2;

    // Read some data from server
    fetch(`https://hackathons-348619.ew.r.appspot.com/get/article/footprint/${article_id}`, { mode: 'no-cors' })
     .then(response => response.json())
     .then(data => {
         console.log(data.cbr_level);

        if (window.location.href.includes("producten/product")) {

            for (var i = 0; i < articles.length; i++) {

                if (data.cbr_level == 0) {
                    articles[i].style.background = "red";
                }
                else if (data.cbr_level == 1) {
                    articles[i].style.background = "yellow";
                }
                else if (data.cbr_level == 2) {
                    articles[i].style.background = "green";
                }
            }
        }
        else { console.log("You are not in a right page");
        }
    })

};



const send_articles = async (articles) => {

    var jsonld = JSON.stringify(JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText))
    console.log(jsonld);

    //Send data to server
    const SendItemsToServer = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          /* 'Access-Control-Allow-Origin': '*'*/
        },
        body: jsonld,
        mode: 'no-cors',
    };
    try {
        const fetchResponse = await fetch("https://hackathons-348619.ew.r.appspot.com/post/article/article_id", SendItemsToServer);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }    


  
    //var jsonld = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText);
    //console.log(jsonld);

    console.log("ARTICLES");
};
