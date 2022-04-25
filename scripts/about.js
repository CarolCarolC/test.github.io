addLoadEvent(prepareInternalnav);

function prepareInternalnav() {
    //check if browser understand this DOM
    if (!document.getElementsByTagName) return false;

    //find out all links in "nav" from article
    var articleEle = document.getElementsByTagName("article");
    if (articleEle.length ==0) return false;
    var navEle = articleEle[0].getElementsByTagName("nav");
    if (navEle.length==0) return false;
    var links = navEle[0].getElementsByTagName("a");
    if (links.length==0) return false;


    for (var i=0; i<links.length; i++) {
        //tranfer the href to id
        var currentID = links[i].getAttribute("href").split("#")[1];
        
        //hidden the sections which already has a links in nav. 
        if (!document.getElementById(currentID)) continue;
        document.getElementById(currentID).style.display = "none";

        //triggered the "showSection" function from global.js to active the clicked section
        links[i].destination = currentID;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}