addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function preparePlaceholder() {
    //check if browser understand this DOM
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    //alert("check done")

    //create an img element
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/photospage/doraPicnic.jpg");
    placeholder.setAttribute("alt","A picnic image");
    //alert("img elem has been created")
    
    //create a txt element
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var descripTxt = document.createTextNode("Please choose an image above");
    description.appendChild(descripTxt)
    //alert("txt elem has been created")

    //append the description element to artikel after ul with id="imagegallery", then img
    var gallery = document.getElementById("imagegallery");
    //alert("gallery element has been found")
    insertAfter(description,gallery);
    //alert("description has been inserted")
    insertAfter(placeholder, description);
    //alert("placeholder has been inserted")
}

function prepareGallery() {
    //check if browser understand this DOM
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    if (!document.getElementsByTagName) return false;
    //alert("check done!");

    //find out all target gallery (a/href)
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    //alert("links have been found!");

    //onclick image replace by using showPic function in global.js
    if (links.length==0) return false;
    //alert(links.length);
    for (var i=0; i<links.length; i++) {
        links[i].onclick = function() {
            //alert("start to run showPic function");
            return showPic(this)?false:true; //return false 阻止默认onlick后跳转，详见 https://www.runoob.com/note/56608
        }
    }

} 