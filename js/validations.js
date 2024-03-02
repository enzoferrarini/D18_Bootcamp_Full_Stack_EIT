//Función que verifica si cadena es vacia
const verificarNoVacio = (cadena) => {   
    if (cadena.trim() !== '') {
      return true; 
    } else {
      return false; 
    }
}

//Función que verifica que una cadena solo contanga 
//caracteres alfabéticos y espacios
const verificarCaracteresAlfabeticos = (cadena) => {
    const regex = new RegExp("^[a-zA-ZñÑ ]*$");
    return regex.test(cadena);
}

//Idem anterior, pero no permite espacios
const verificarCaracteresAlfabeticos_SE = (cadena) => {
    const regex = new RegExp("^[a-zA-ZñÑ]*$");
    return regex.test(cadena);
}

//Idem anterior, pero no permite espacios y primer letra Mayuscula o minuscula
const verificarCaracteresAlfabeticos_LM = (cadena) => {
    const regex = new RegExp("^[A-ZÑa-zñ][a-zñ]*$");
    return regex.test(cadena);
}


const verificarCaracteresAlfabeticos_LM_Espacio = (cadena) => {
    const regex = new RegExp("^[A-ZÑa-zñ][a-zñ]*(\\s[A-ZÑa-zñ][a-zñ]*)*$");
    return regex.test(cadena);
}

//Idem verificarCaracteresAlfabeticos_SE, pero no permite espacios
// y se añade caracteters especiales
const verificarCaracteresAlfabeticos_SE_caracteres = (cadena) => {
    const regex = new RegExp("^[a-zA-ZñÑÁÉÍÓÚÜÑáéíóú']*$");
    return regex.test(cadena);
}

const verificarCaracteresAlfabeticos_SE_caracteres_Espacio = (cadena) => {
    const regex = new RegExp("^[a-zA-ZñÑÁÉÍÓÚÜÑáéíóú']+(\\s[a-zA-ZñÑÁÉÍÓÚÜÑáéíóú']+)*$");
    return regex.test(cadena);
}

//Función que verifica un valor numerico
const validarNumeroEnteroTodos = (cadena) => {
    const regex = new RegExp("^([0-9])*$");
    return regex.test(cadena);
}

//Función que verifica un valor entero (positivo negativo o cero)
const validarNumeroEntero = (cadena) => {
    const regex = new RegExp("^-?\d+$");
    return regex.test(cadena);
}

//Función que verifica un valor entero (positivo o cero)
const validarNumeroEnteroPositivo = (cadena) => {
    const regex = new RegExp("^[1-9]([0-9])*$");
    return regex.test(cadena);
}

//Función que valida longitud minima y maxima de cadena
const validarLongitudCadena = (cadena, minimo, maximo) => {
    const longitud = cadena.length;
    return longitud >= minimo && longitud <= maximo;
}

//Función que valida numeros decimales
const validarNumeroDecimal = (numero) => {
    const regex = new RegExp("^(([1-9]{1,3}(\.[0-9]{3})*)|([0-9]+))(,[0-9]{1,2})?$");
    // const regex = new RegExp("^[1-9]{1,3}(\.[1-9]{3})*(,[1-9]{1,2})?$");
    return regex.test(numero);
}

//Función que valida File Selected
const fileSelected = (inputFile) => {
    if(inputFile.files[0])
        return true;
    else
        return false;
}

//Función que valida email
const validarEmail = (email) => {
    const regexEmail = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
     return regexEmail.test(email);
}

const validarDoc =(string) => {
    // alert();
    const regexEmail = new RegExp("^(?:[1-9]([0-9]?)(\\.[0-9]{3}){2}|[1-9]([0-9]{6,7}))$");
    // ([1-9]([0-9]?)(\\.[0-9]{3}){2})     
    // ([1-9]([0-9]{6,7}))
    return regexEmail.test(string);    
}

const validarCuil =(string) => {
    // alert();
    const regexEmail = new RegExp("^(?:[1-9][0-9][-][0-9]{8}[-][0-9]|[1-9]([0-9]{10}))$");
    // ([1-9]([0-9]?)(\\.[0-9]{3}){2})     
    // [1-9]([0-9]{10})
    return regexEmail.test(string);    
}

const convertStringToNumber = (st) =>{
    let newValue = st.replace(".", "");
    newValue = Number(newValue.replace(",", "."));
    return newValue;
}

const convertNumberToString = (num) =>{   
    if(num!=0)
    {
        var partes = num.toFixed(2).toString().split(".");
        var parteEntera = partes[0];
        var parteDecimal = partes[1] || "";
        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parteEntera + (parteDecimal.length ? "," + parteDecimal : "");
    }
    else
        return  0;
   
}

const showMsgError = (htmlElement,htmlElementMsg, msg) => {
    cleanMsgError(htmlElement,htmlElementMsg);
    if(htmlElement)
        htmlElement.setAttribute('aria-invalid', 'true');
    htmlElementMsg.innerText = msg;
    htmlElementMsg.style.display = "block";
    validForm = false;
    htmlElementMsg.classList.remove("hidden");
    htmlElementMsg.classList.add("animation");
}

const cleanMsgError = (htmlElement,htmlElementMsg) => {
    if(htmlElement)
        htmlElement.setAttribute('aria-invalid', 'false');
    htmlElementMsg.innerText = "";
    htmlElementMsg.style.display = "none";
    htmlElementMsg.classList.remove("animation");
    htmlElementMsg.classList.add("hidden");
}