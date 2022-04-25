addLoadEvent(highlightPage);
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
//addLoadEvent(displayAbbreviation);
addLoadEvent(focusLabels);
addLoadEvent(prepareFormsEx);

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parentElement = targetElement.parentNode;
    if (parentElement.lastChild == targetElement) {
        parentElement.appendChild(newElement);
    } else {
        parentElement.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(ele, value) {
    if (!ele.className) {
        ele.className = value;
    } else {
        var newClassName = ele.className;
        newClassName += " ";
        newClassName += value;
        ele.className = newClassName;
    }
}

function highlightPage() {
    if (!document.getElementsByTagName) return false;

    var headerChildEle = document.getElementsByTagName("header");
    if (headerChildEle.length == 0) return false;
    var navele = headerChildEle[0].getElementsByTagName("nav");
    if (navele.length == 0) return false;
    var link = navele[0].getElementsByTagName("a");

    for (var i=0; i<link.length; i++) {
        var currUrl = link[i].getAttribute("href");
        if (window.location.href.indexOf(currUrl) !=-1) {
            link[i].className = "here";
            var linktxt = link[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktxt);
        }
    }
}

function moveElement(elementID, final_x, final_y, interval) {
    //make sure brower can understand this DOM
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;

    //find out the target element by using elementID
    var elem = document.getElementById(elementID);

    //check if the target element has been moved, and clear this movement. 
    if (elem.movement) {
        clearTimeout(elem.movement);
    }

    //find out the current position top and left
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);

    //compare the final position and current position. if not equal, update to the final position
    if (xpos==final_x && ypos==final_y) return true;
    if (xpos < final_x) {
        var delta = Math.ceil(final_x-xpos)/10;
        xpos += delta;
    }
    if (xpos > final_x) {
        var delta = Math.ceil(xpos-final_x)/10;
        xpos -= delta;
    }
    if (ypos < final_y) {
        var delta = Math.ceil(final_y-ypos)/10;
        ypos += delta;
    }
    if (ypos > final_y) {
        var delta = Math.ceil(ypos-final_y)/10;
        ypos -= delta;
    }

    //setTimeout 
    elem.style.left = xpos+"px";
    elem.style.top = ypos+"px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
    //check if browser understand this DOM
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    if (!document.getElementsByTagName) return false;
    //alert("check done!");

    //creat a div named slideshow which includes all image nodes
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
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
    var link = intro.getElementsByTagName("a");
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

function showSection(id) {
    if (!document.getElementsByTagName) return false;
    var sections = document.getElementsByTagName("section");
    if (sections.length==0) return false;

    for (var i=0; i<sections.length; i++) {
        //alert(sections[i].getAttribute("id"))
        if (sections[i].getAttribute("id") !=id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function showPic(whichPic) {
    //check if browser understand this DOM
    if (!document.getElementById) return false;
    if (!document.getElementById("placeholder")) return false;
    if (!document.getElementById("description")) return false;
    //alert("check done!")

    //replace the current placeholder src with the target href in a 
    if (!whichPic.getAttribute("href")) {
        alert("no href for this picture");
    }
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    //alert("placeholder has been found!")
    placeholder.setAttribute("src",source);
    //alert("img has been replaced!")

    //description replacement
    if (whichPic.getAttribute("title")) {
        var txt = whichPic.getAttribute("title");
        //alert(txt);
    } else {
        var txt = "";
        alert("no txt");
    }
    var description = document.getElementById("description");
    //alert("description has been found");
    if (description.firstChild.nodeType==3) {
        description.firstChild.nodeValue = txt;
    }
    return true;
}

function stripeTable() {
    //goal:creat an odd-even class on all rows from each table

    //check if browser can understand this DOM
    if (!document.getElementsByTagName) return false;
    //alert("check done!");

    //find out all rows in each table
    var tables = document.getElementsByTagName("table");
    if (tables.length==0) return false;
    //alert("all tables have been found, go to loop")

    for (var i=0; i<tables.length; i++) {
        var rows = tables[i].getElementsByTagName("tr");
        if (rows.length==0) return false;
        //alert(i);

        //assign a odd-even class to these rows
        var odd = false;
        for (var j=0; j<rows.length; j++) {
            //alert(j);
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
            //alert(rows[j].className)
        }
    }
}

function highlightRows() {
    //according the odd-even class update CSS when onmouse or outmouse

    //check if browser can understand this DOM
    if (!document.getElementsByTagName) return false;

    //find out all of rows
    var rows = document.getElementsByTagName("tr");
    if (rows.length==0) return false;

    //loop each table each rows. when onmouse, the class will be replaced. when mouse out, the class will be reseted.
    for (var i=0; i<rows.length; i++) {
        //oldClassName as the temporary storage to save the class of each row
        rows[i].oldClassName = rows.className;
        //onhold the class is changed
        rows[i].onmouseover = function() {
            addClass(this,"highlight");
        }
        //without onhold, className should be back to before by using that temporary storage "oldClassName", this.className important!!
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}

//re-code
function displayAbbreviation() {
    //**goal: find out all abbr with target calssName, creat dl element and dt element, append to body

    //**check if browser can understand this DOM
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    //alert("DOM check done!")

    //**findout all abbr with target className
    var abbrs = document.getElementsByTagName("abbr");
    if (abbrs.length<1) return false;
    //alert(abbrs.length);
    //alert("abbrs have been found");

    //**find the explanation that matches the abbreviation and store it in a new array named newList 
    var newList = new Array();
    var newGroups = new Array();
    var tagList = new Array();
    var keyList = new Array();

    for (var i=0; i<abbrs.length; i++) {
        //alert(i);
        var currentAbbr = abbrs[i];
        //alert(currentAbbr.childNodes.length);  //!!important childNodes with s!!!
        if (currentAbbr.childNodes.length<1) continue;
        var definition = currentAbbr.getAttribute("title");
        var key = currentAbbr.lastChild.nodeValue;
        var tagNames = currentAbbr.getAttribute("class");
        //alert(definition);
        //alert(key);
        //alert(tagNames);
        if (keyList.indexOf(key)==-1) {
            keyList.push(key);
            newList[key] = definition;
        }
        
        if (tagList.indexOf(tagNames)==-1) {
            tagList.push(tagNames);
            newGroups[tagNames.toString()] = key;
        }
        //alert(newGroups[tagNames]);
        //alert(newGroups.length);
    }
    //alert(tagList);
    //alert(keyList);
    //alert(newList);
    //alert(newGroups);

    //**loop this newList，build new dt and append to dl
    for (tagNames in newGroups) {
        //**first loop: findout all keys for each tageName;
        alert(tagNames);
        var key = newGroups[tagNames];
        alert(key);
        
        var divs = document.createElement("div");
        var cur_dl = document.createElement("dl");

        // creat a dt, and the textNode is key
        var definition = newList[key];
        var cur_dt=document.createElement("dt");
        var cur_dtTxt = document.createTextNode(key);
        cur_dt.appendChild(cur_dtTxt);
        //creat a dd, and the textNode is definition
        var cur_dd = document.createElement("dd")
        var cur_ddTxt = document.createTextNode(definition);
        cur_dd.appendChild(cur_ddTxt);
        //append dd to dt
        cur_dt.appendChild(cur_dd);
        //append dt to dl;
        cur_dl.appendChild(cur_dt);    

        var subheader = document.createElement("h4");
        var subheader_txt = document.createTextNode(tagNames);
        subheader.appendChild(subheader_txt);

        divs.appendChild(subheader);
        divs.appendChild(cur_dl);
    }
    
    //**build a header
    var header = document.createElement("h3");
    var headerTxt = document.createTextNode("Abbreviation:");
    header.appendChild(headerTxt);

 /*   //**append the header and dl to the end of artikel
    var articles = document.getElementsByTagName("article");
    if (container.length<1) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(divs);
*/

    document.body.appendChild(header);
    document.body.appendChild(divs);
}

function focuslabel() {
    //***marke sure browser can understand this DOM
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;

    //***find out all of label
    var labels = document.getElementsByTagName("label");
    if (labels.length<1) return false;

    //***loop to find out all of for attribute in each label
    for (var i=0; i<labels.length; i++) {
        if (!labels[i].getAnimations("for")) continue;
        //***if onclick then focus
        labels[i].onclick = function() {
            var curId = labels[i].getAnimations("for");
            if (!document.getElementById("id")) return false;
            var elem = document.getElementById(curId);
            elem.focus();
        }
        
    }
}

//***this func from web https://github.com/ILoveSilence/DOM--Chapter12/blob/master/scripts/global.js
function focusLabels(){
    var labels = document.getElementsByTagName("label");
    for(let i = 0;i < labels.length;i++){
      if(!labels[i].getAttribute("for")) continue;
      labels[i].onclick = function(){
        let id = this.getAttribute("for");
        if(!document.getElementById(id)) return false;
        let element = document.getElementById(id);
        element.focus();
      };
    }
  }

function resetFields(whichForm) {
    //***Check if the browser supports the placeholder attribute. If it does not, continue.
    alert("the resetFields functino has been triggered!");
    //if(modernizr-custom.input.placeholder) return;
   
    whichForm.focus = function() {
        alert(this.value);
        if (this.value == placeholders) {
            alert(true);
            this.className = "";
            this.value = "";
        }
    }

    whichForm.onblur = function() {
        if (this.value=="") {
            this.className = "placeholder";
            this.value = placeholders;
        }
    }

    //elem.onblur();
}

function prepareForms() {
    if (!document.getElementsByTagName) return false;
    //alert("check done!");

    var forms= document.getElementsByTagName("form");
    if (forms.length<1) return false;
    //alert(forms.length);


    for (var i=0; i<forms.length; i++) {
        var placeholders = forms[i].getAttribute("placeholder");
        if (placeholders.length<1) return false;

        for (var j=0; j<placeholders.length; j++) {
            var thisform = placeholders[j];
            //alert(thisform);
            resetFields(thisform);
        }
    }
}

