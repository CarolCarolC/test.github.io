addLoadEvent(displayAbbreviations);

function displayAbbreviations() {
    //if (!document.getElementsByTagName) return false;
    //if (!document.createElement) return false;
    //if (!document.createTextNode) return false;

    var ele_abbr = document.getElementsByTagName("abbr");
    var list_abbre = document.createElement("dl");


    //if (ele_abbr.length<1) return false;
    for (var i=0; i<ele_abbr.length; i++) {

        var ele_curr = ele_abbr[i];
        var key = ele_curr.lastChild.nodeValue;
        var txt = ele_curr.getAttribute("title");

        var ele_dt= document.createElement("dt");
        var dt_txt= document.createTextNode(key);
        ele_dt.appendChild(dt_txt);

        var ele_dd = document.createElement("dd");
        var dd_txt = document.createTextNode(txt);
        ele_dd.appendChild(dd_txt);

        ele_dt.appendChild(ele_dd);
        list_abbre.appendChild(ele_dt);
    }

    var ele_header = document.createElement("h2");
    var hearder_txt = document.createTextNode("Abbreviations");
    ele_header.appendChild(hearder_txt);

    document.body.appendChild(ele_header);
    document.body.appendChild(list_abbre);
}


