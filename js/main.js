const mainElement= document.querySelector("main");
const bodyElement= document.querySelector("body");
let deleteteIdSelection=-1;
let films=[];
let myToast = new bootstrap.Toast(document.getElementById('myToast'));
let myToastConfirm = new bootstrap.Toast(document.getElementById('myToastConfirm'));

const saveLS=()=>{
    let filmsAsString = JSON.stringify(films);
    localStorage.setItem("films", filmsAsString);
}

const getPageRequest=(url)=>{  
    const xhr=new XMLHttpRequest;
        xhr.open("get",`../pages/${url}.html`);
        xhr.onreadystatechange = function () {
           //State 4 to verify request complete and status 200 for successful
            if (xhr.readyState == 4 && xhr.status == 200) {
                //Shows hashtag page in url
                url!="home"? location.hash=url:location.hash="";
                mainElement.innerHTML="";
                const div=document.createElement("div");
                div.innerHTML=xhr.response;
                mainElement.appendChild(div);
                                     
                switch (url) {
                    case "home":
                        jsFile="films";
                        loadFilmsStore();
                        break;
                    case "addFilm":                        
                        if(deleteteIdSelection!=-1)
                        {
                            document.getElementById("btnAddFilm").textContent ="Guardar Cambios";
                            document.getElementById("btnBack").textContent ="Cancelar Cambios";
                            loadFilmEdition();
                        }else
                        {
                            document.getElementById("btnAddFilm").textContent ="Agregar Película";
                            document.getElementById("btnBack").textContent ="Volver";
                        }
                        break;
                }               
            }
        };
        xhr.send();       
}

window.addEventListener("popstate",
    ()=>{        
        const {hash}=location;
        const parseHash=hash.slice(1);  
        getPageRequest(parseHash||"home");
    });

document.addEventListener("DOMContentLoaded",
    getPageRequest("home")
);

const addFilm=(event)=>{
    getPageRequest("addFilm");
}

const editFilm=(event)=>{
    deleteteIdSelection=event.target.id;
    getPageRequest("addFilm",false);
}

const deleteFilm=(idFilm)=>{
    var newFilmsList = films.filter(function(objeto) {
        return objeto.imdbID != idFilm;
    });
    films=newFilmsList;
}

const deleteFilmConfirmation=(e)=>{
    deleteteIdSelection=e.target.id;
    let selectedFilm = films.find(function(objeto) {
        return objeto.imdbID == e.target.id;
      });
    let idMsgToastConfirmDiv=document.getElementById("idMsgToastConfirmDiv");
    idMsgToastConfirmDiv.innerHTML=`Esta seguro que desea Eliminar la película <br><strong>${selectedFilm.Title}</strong> (${selectedFilm.Year})?`;
    myToastConfirm.show();   
}

const cancelDelete=()=>{
    deleteteIdSelection=-1;
    myToastConfirm.hide();
}

const cancel=()=>{
    deleteteIdSelection=-1;
    history.back();
    window.scrollY=0;
}

const confirmDelete=()=>{
    myToastConfirm.hide();
    deleteFilm(deleteteIdSelection); 
    saveLS();    
    searchFilm();
    showMessageToast("Película eliminada exitosamente...");
}

const showMessageToast=(msg)=>{
    let msgToast =document.getElementById("idMsgToast");
    msgToast.innerHTML=msg;
    myToast.show();
}

