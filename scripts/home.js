addLoadEvent(prepareSlideshowHome);


function prepareSlideshowHome() {
    //check if browser understand this DOM
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    if (!document.getElementsByTagName) return false;
    //alert("check done!");

    //creat a div named slideshow which includes all image nodes
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");

    /* creat a frame on the slideshow,
       debugging was unsuccessful!!!
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame2.png");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
    */

    var slideshow_image = document.createElement("img");
    slideshow_image.setAttribute("src","images/slideshow.png");
    slideshow_image.setAttribute("alt","overview picture of each pages");
    slideshow_image.setAttribute("id","preview");
    slideshow.appendChild(slideshow_image);
    //alert("slideshow has been created in index.html");
    

    //find out the element which slideshow should insert after it
    var intro = document.getElementById("intro");
    insertAfter(slideshow, intro);

    //determain the onmouseover link in "intro" and slideshow move to the relative img page. 
    var link = document.getElementsByTagName("a");
    //alert(link.length);
    var destination;
    for (var i=0; i<link.length; i++) {
        link[i].onmouseover = function() {
            destination = this.getAttribute("href");
            //alert(destination);
            //alert(destination.indexOf("about.html"));
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                //alert("true");
                moveElement("preview", -600, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -1200, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -1800, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -2400, 0, 5);
            }
        }
    }

}