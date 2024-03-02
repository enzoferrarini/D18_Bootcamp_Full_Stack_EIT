let validForm;
const completeSelectYear=(films)=>{
    let select=document.getElementById("idSelectYear");
    let selectOptions="<option selected value='-1'>Año</option>";   
    let yearsFound=[];
    for (var i = 0; i < films.length; i++) {
        var valorActual = films[i].Year;
        yearsFound.push(valorActual);       
    }
    
    //Ordeno los años encontrados en las peliculas de menor a mayor
    yearsFound.sort(function(a, b) {return a - b;});
    //Quito duplicados
    yearsFound=Array.from(new Set(yearsFound));
    yearsFound.forEach(function(y) {
        selectOptions+=`<option value='${y}'>${y}</option>`
      });
    select.innerHTML=selectOptions;
}

const creatFilm=(element)=>{
    let value=`<tr  id="${element.imdbID}">
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2 text-start d-blue text-wrap">${element.Title}</td>
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2 align-middle text-center">${element.Year}</td>           
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2 align-middle text-center">${element.imdbID}</td>           
        <td class="pt-2 pb-2 align-middle text-center">            
            <i id="${element.imdbID}" class="edit fa-solid fa-pen-to-square"></i>
            <i id="${element.imdbID}" class="delete fa-regular fa-trash-can m-1"></i>
        </td>      
    </tr>
    <tr  id=d${element.imdbID} class='fadeInRow hidden ' >
        <td colspan="4" class="filmDescription p-3" style='min-height: 50px; background-color: aliceblue; border-radius:2px;'>
            <div style="width: inherit; text-align: right;">
                <button type="button" class="btn-close" aria-label="Close" onclick="closeDescBox('d${element.imdbID}')"></button><br>
            </div>
            <div class="d-flex align-items-center">
                <div class="p-2">
                    <img class="rounded img__desc--height" alt="Imagen no encontrada" src='${element.Poster}'>                    
                </div>
                <div class="pe-2 ps-2">
                    <strong>Título de la Película: </strong>${element.Title}<br>
                    <strong>Año de la Película: </strong>${element.Year}<br>               
                    <strong>Tipo: </strong>${element.Type}<br>
                    <strong>Poster: </strong><a href='${element.Poster}' target='_blank'>Ver Poster Big Size</a>
                    <hr>
                    <strong>Descripción: </strong>${element.descFilm}                   
                </div>
            </div>
        </td>
    </tr>`;
    return value;
}

const showFilms=(films)=>{ 
    films.sort(function(a, b) {
        return a.Title.localeCompare(b.Title);
      });
    let count=0;
    let myFilmtContainer=document.getElementById("myFilmtContainer");
    let listProducts="";

    films.forEach(function(objeto) {
        count++;
        listProducts+=creatFilm(objeto);
    });
    
    if(films.length==0)
    {
        myFilmtContainer.innerHTML='<div class="alert alert-info text-center" role="alert">No se han encontrado Películas para la busqueda o en la biblioteca</div>';
    }
    else
    {
        myFilmtContainer.innerHTML=`
        <div class="table-responsive">
            <table class="table table-hover table-sm">
                <thead>
                    <tr class=" fw-normal fs-6 ">
                        <th scope="col" class="text-wrap">Título</th>
                        <th scope="col" class="text-center">Año</th>
                        <th scope="col" class="text-center">ImdbID</th>
                        <th scope="col" class="text-center">Acciones</th>
                    </tr>                
                </thead>
                <tbody>
                    ${listProducts}
                </tbody>
            </table>
            <div  class="form-text text-start text-secondary">${count} película/s</div>
            
        </div>`;  
        
        let fiDeleteCollection=document.getElementsByClassName("delete");
        for (let index = 0; index < fiDeleteCollection.length; index++) {
            fiDeleteCollection[index].addEventListener('click', deleteFilmConfirmation);
        }

        let fiEditCollection=document.getElementsByClassName("edit");
        for (let index = 0; index < fiEditCollection.length; index++) {
            fiEditCollection[index].addEventListener('click', editFilm);
        }
    }
}

const loadFilmsStore=()=>{
    if(localStorage.getItem("films")){
        films=JSON.parse(localStorage.getItem("films"));         
        completeSelectYear(films);
        showFilms(films);
    }
    else{
        let filmsAsString = JSON.stringify(filmsStore);
        localStorage.setItem("films", filmsAsString);
        loadFilmsStore();
    }
}

const closeDesc=(element)=>{   
    element.classList.add("hidden");
}

const openDesc=(element)=>{   
    element.classList.remove("hidden");
}

const showFilmDescription=(e)=>{
    let filmDescriptionCollection=Array.from(document.getElementsByClassName("filmDescription"));
    filmDescriptionCollection.forEach(elto => {
        closeDesc(elto.parentNode);
    });
    const descElement=document.getElementById("d"+e.parentNode.id);
    openDesc(descElement);   
}

const closeDescBox=(valor)=>{
    closeDesc(document.getElementById(valor));   
}

const searchFilm=()=>{     
    let yearSelection = document.getElementById("idSelectYear");     
    let searchInputWord=document.getElementById("idSearchTitle").value.trim();      
   
    let searchFilmResult = films.filter(function(objeto) {
        if(yearSelection.value==-1)
            return objeto.Title.toLowerCase().includes(searchInputWord.toLowerCase());
        else
        {
            return objeto.Title.toLowerCase().includes(searchInputWord.toLowerCase()) && objeto.Year==yearSelection.options[yearSelection.selectedIndex].text;
        }
    });    
    showFilms(searchFilmResult);  
}

const getNextID=()=>{
    let nextId=1;
    let bandera=true;
    while(bandera){

        if(!films.find(objeto => objeto.imdbID == (nextId*100).toString()))
        {
            bandera=false;
            return (nextId*100).toString()
        }
        else
            nextId++;
    }
}

const validateTitle = () => {
    let title=document.getElementById("idTitle");
    let idMsgTitle=document.getElementById("idMsgTitle");
    let titleValue=title.value; 
    if (verificarNoVacio(titleValue)){        
        if(validarLongitudCadena(titleValue, 3, 50)){
            cleanMsgError(title,idMsgTitle);
        }
        else {
            let msg="Mínimo 3 caracteres y Máximo 50";
            showMsgError(title,idMsgTitle,msg);
            validForm=false;
        }       
    }
    else
    {
        let msg="Campo Obligatorio";
        showMsgError(title,idMsgTitle,msg);
        validForm=false;
    }
}

const validateDesc = () => {
    let desc=document.getElementById("idDescTextarea");
    let idMsgDesc=document.getElementById("idMsgDesc");
    let descValur=desc.value; 
    if (verificarNoVacio(descValur)){        
        if(validarLongitudCadena(descValur, 10, 500)){
            cleanMsgError(desc,idMsgDesc);
        }
        else {
            let msg="Mínimo 10 caracteres y Máximo 500";
            showMsgError(desc,idMsgDesc,msg);
            validForm=false;
        }       
    }
    else
    {
        let msg="Campo Obligatorio";
        showMsgError(desc,idMsgDesc,msg);
        validForm=false;
    }
}

const validateType = () => {
    let select=document.getElementById("idSelectType");
    let idMsgSelectType=document.getElementById("idMsgSelectType");
    if(select.options[select.selectedIndex].value==-1){
        let msg="Campo Obligatorio";
        showMsgError(select,idMsgSelectType,msg);
        validForm=false;
    }
    else{
        cleanMsgError(select,idMsgSelectType);
    }    
}

const validateYear = () => {
    let idYear=document.getElementById("idYear");
    let idMsgYear=document.getElementById("idMsgYear");
    let yearValue=idYear.value; 
    if (verificarNoVacio(yearValue)){        
        if(validarLongitudCadena(yearValue,4,4)){
            if(validarNumeroEnteroTodos(yearValue,4,4)){
                cleanMsgError(idYear,idMsgYear);
            }
            else{
                let msg="Solo digitos numéricos";
                showMsgError(idYear,idMsgYear,msg);
                validForm=false;
            }
        }
        else {
            let msg="4 digitos numéricos (ej. 2024)";
            showMsgError(idYear,idMsgYear,msg);
            validForm=false;
        }       
    }
    else
    {
        let msg="Campo Obligatorio";
        showMsgError(idYear,idMsgYear,msg);
        validForm=false;
    }
}

const validFields=()=>{
    validForm=true;
    validateTitle();
    validateType();
    validateYear();
    validateDesc();    
    return validForm;
}

const saveFilm=()=>{
    if(validFields())
    {
        let indice = films.findIndex(objeto => objeto.imdbID == deleteteIdSelection);
        let s=document.getElementById("idSelectType");
        if (indice !== -1) {
            films[indice].Title = document.getElementById("idTitle").value;
            films[indice].Year = document.getElementById("idYear").value;
            films[indice].descFilm = document.getElementById("idDescTextarea").value.trim();
            films[indice].Type = s.options[s.selectedIndex].text.toLowerCase();
            saveLS();
            cancel();
            showMessageToast("Película editada exitosamente...");
        }
        else{            
            let newObject = {
                Title: document.getElementById("idTitle").value,
                Year: document.getElementById("idYear").value,
                descFilm: document.getElementById("idDescTextarea").value.trim(),
                Type:s.options[s.selectedIndex].text.toLowerCase(),
                Poster: '../img/na.jpg',
                imdbID: getNextID()
            };
            films.push(newObject);
            saveLS();
            cancel();
            showMessageToast("Película agregada exitosamente...");
        }
    }
}

const loadFilmEdition=()=>{
    let selectedFilm = films.find(function(objeto) {
        return objeto.imdbID == deleteteIdSelection;
      });
    document.getElementById("idTitle").value=selectedFilm.Title;
    document.getElementById("idYear").value=selectedFilm.Year;
    document.getElementById("idDescTextarea").value=selectedFilm.descFilm;
    document.getElementById("idSelectType").value=selectedFilm.Type;
}