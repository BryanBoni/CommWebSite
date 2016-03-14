window.addEventListener("load", function () {
    /*
     * Containt all the code of the javascript file, load when the page showup. 
     */
    window.addEventListener("hashchange", display, false); //setting the event listener who will catch the moment when we change the url
    display();//first call of the function.

    function display() {
        /*
         * This function verify the current url and if we don't have an #[number] 
         * after index.html, we do an ajaxCall for "chapitre1.json",
         * else we take the number after the # and send in parameter for the function ajaxCall 
         */
        var CheminComplet = document.location.href;
        if ("index.html" !== CheminComplet.substring(CheminComplet.lastIndexOf("/") + 1)) {
            var CheminRepertoire = CheminComplet.substring(0, CheminComplet.lastIndexOf("#"));
            var jsonName = CheminComplet.substring(CheminComplet.lastIndexOf("#") + 1);
            ajaxCall(jsonName);
        } else {
            ajaxCall("Accueil");
        }
        function ajaxCall(jsonName) {
            /*
             * this function is used to make an ajaxcall to retrive a json file, the number
             * pass in parameter give the number of the "chapitre[number].json" file
             */
            var req = new XMLHttpRequest();
            var i = 0;
            var choices = "";
            req.open("GET", "./" + jsonName + ".json");
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200) { //status http (200 pour réussite 400 pour bad request
                        jsonObj = JSON.parse(req.responseText);

                        console.log(jsonObj.txt);//verify in the console the content of jsonObj.txt
                        document.getElementById("leText").innerHTML = jsonObj.txt;//Display the text of the current situation of the quest

                        /*while (i < jsonObj.links.length) {//if thera are more than one choice it loop until there no more choice left on the json file
                         choices += "<div class = \"choices\"><a href = \"" + jsonObj.links[i].link + "\"> " + jsonObj.links[i].txt + "</a></div>";
                         i++;
                         }
                         document.getElementById("choice").innerHTML = choices;
                         */
                    } else {
                        //in case the request is  not good, display an the console the error number . 
                        console.log("Error:" + req.status);
                    }
                }
            };
            req.send();
        }
    }

});
