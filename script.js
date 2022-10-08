let botonComenzar = document.getElementById('comenzar');        //para propio.html

let pantalla = document.querySelector("canvas");
let ctx = pantalla.getContext("2d");

let guardarPalabra = document.getElementById('guardarPalabra');     //para palabra.html
let resetCache = document.getElementById('resetCache'); 
let palabraIn = document.getElementById('palabra');
let letraInput = document.getElementById('char');
let cargarchar = document.getElementById('cargarChar');

let buffer = [      //cargo el buffer de palabras en cache
    "VIVO",
    "CASA",
    "GATO",
    "FRUTA",
    "PERRO",
    "LINCE",
    "ESPADA",
    "BANANA",
    "ESPOSA",
    "CIRCULO",
    "ORBITAR",
    "REBOZAR",
    "AMORCITO",
    "FRANCESA",
    "RASCARSE"
];
let palabras =[];
let flagVerificador = true;
for(var contador = 0; contador < 15; contador++) {
    flagVerificador = true;
    for(var verificador = 1; verificador < 15; verificador ++) {
        if(buffer[contador] == localStorage.getItem("d"+verificador)) {
            flagVerificador = false;
        }
    }
    if(flagVerificador) {
        localStorage.setItem(("d"+ contador), buffer[contador]);        //cargo la palabra del buffer en cache si es que no esta repetida
        //console.log(localStorage.getItem(("d"+ contador)));
    }
}

let long = 0; //longitud del vector palabras[]

let pagina = window.location.href;      //esto es para ver en que pagina estoy usando el mismo script
let pattern = /propio/;
let result = pattern.test(pagina);

let palabra = "";       //declaro palabra secreta y long de palabra como variables globales
let n = 0;
let listacharCorrectos = [];       //aca guardo las letras que componen la palabra, para no escribirlas de nuevo
let listacharIncorrectos = []       //aca guardo las letras incorrectas para no repetirlas
let listacharRepetidos = []     //guarda los repetidos en los intentos correctos
let intentosCorrectos = 0;
let intentosIncorrectos = 0;

const espacio = 10;     //aca seteo las variables de posicion para letras y renglones, declaradas global para usar en las distintas funciones
const renglon = 30;
let distancia = 300;

let finDeJuego = false;

function sortearPosicion(maximo) {              //genera un numero aleatorio entre 0 y un maximo
    return Math.floor(Math.random()*maximo);
}

function palabraSecreta(){                      //selecciona palabra aleatoria dentro del array

    var palabra = palabras[sortearPosicion(long)];
    return palabra;

}

function guardarPalabraNueva() {                  //guarda las palabras que se graban en la pagina 'palabra'

    var palabranueva = palabraIn.value;
    var tamaño = localStorage.length + 1;       //aca guardo la posicion que sigue al tamaño de cache
    palabranueva = palabranueva.toUpperCase();
    flagVerificador = true;
    if(palabranueva.length > 3) {
        for(var contador = 0; contador<palabranueva.length; contador++) {
            if(!((palabranueva[contador]>='A') && (palabranueva[contador]<='Z'))) {
                flagVerificador = false;  //verifico que no tenga caracteres especiales ni numeros
            }        
        };
    }
    else {
        flagVerificador = false;
    }

    if(flagVerificador) {
        localStorage.setItem(("d"+ tamaño), palabranueva);
        alert("Palabra agregada!");
    }
    else {
        alert("Palabra no permitida!");
    }

    palabraIn.value = "";

    //debug
    //for(var contador = 0; contador < (localStorage.length + 1); contador++) {
    //    console.log(contador, localStorage.getItem("d"+contador)); 
    //}

}

function borrarCache() {    //para borrar cache
    localStorage.clear();
    alert("Restablecido a valores por defecto");

    //debug
    //for(var contador = 0; contador < (localStorage.length + 1); contador++) {
    //    console.log(contador, localStorage.getItem("d"+contador)); 
    //}
}

function dibujarlineas(n) {     //n es la cantidad de letras de la palabra

    var paso = 0;       // aca veo cuantos espacios tengo que crear, y si la palabra es par o no
    var espar = true;
    distancia = 300;

    if (n % 2 == 0){
        paso = n / 2;
    }
    else {
        paso = (n-1) / 2;
        espar = false;
    }

    ctx.strokeStyle = 'black';        //color y ancho de linea
    ctx.lineWidth = 5;

    var i;      //aca dibujo las lineas con un for

    if (espar) {
        distancia = distancia + (espacio/2);
        for ( i = 0; i<paso; i++) {
            ctx.beginPath();
            ctx.moveTo(distancia, 300);
            distancia = distancia + renglon;
            ctx.lineTo(distancia, 300);
            ctx.stroke();
            distancia = distancia + espacio;
        }
        distancia = 300 - (espacio/2);
        for ( i = 0; i<paso; i++) {             //replico todo en negativo para dibujar lineas en espejo
            ctx.beginPath();
            ctx.moveTo(distancia, 300);
            distancia = distancia - renglon;
            ctx.lineTo(distancia, 300);
            ctx.stroke();
            distancia = distancia - espacio;
        }
    }
    else {
        ctx.beginPath();
        ctx.moveTo(distancia, 300);
        distancia = distancia + (renglon/2);
        ctx.lineTo(distancia, 300);
        ctx.stroke();
        distancia = distancia + espacio;
        for ( i = 0; i<paso; i++) {
            ctx.beginPath();
            ctx.moveTo(distancia, 300);
            distancia = distancia + renglon;
            ctx.lineTo(distancia, 300);
            ctx.stroke();
            distancia = distancia + espacio;
        }
        distancia = 300;
        ctx.beginPath();                    //espejo de lineas
        ctx.moveTo(distancia, 300);
        distancia = distancia - (renglon/2);
        ctx.lineTo(distancia, 300);
        ctx.stroke();
        distancia = distancia - espacio;
        for ( i = 0; i<paso; i++) {
            ctx.beginPath();
            ctx.moveTo(distancia, 300);
            distancia = distancia - renglon;
            ctx.lineTo(distancia, 300);
            ctx.stroke();
            distancia = distancia - espacio;        //aca queda seteada la distancia inicial para la primer letracorrecta a escribir
        }
    }

}

function cargarLetrasCorrectas() {      //carga el vector de letras que componen la palabra para verificacion

    var i;
    var j;
    var largo = 0;
    var flagCarga = true;      //flag para ver si se repite un caracter
    listacharCorrectos.push(palabra[0]);
    for( i = 1; i < n; i++) {
        flagCarga = true;
        for( j = 0; j < largo; j++) {
            if(palabra[i] == listacharCorrectos[j]) {
                flagCarga = false;
            }
        };
        if(flagCarga) {
            listacharCorrectos.push(palabra[i]);
            largo = listacharCorrectos.length;
        }
    }
}

function controlarletra(x) {        //controla si la letra esta en la palabra y devuelve true o false si no esta
    var resultado = false;
    var i;
    for( i = 0; i < n; i++) {
        if(palabra[i] == x) {
            resultado = true;
        }
    }
    return resultado;
}

function dibujarPatibulo(caso)
{   
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'F8C471';
    switch(caso){
        case 0:
            ctx.strokeStyle = 'black';
            ctx.moveTo(300, 50);
            ctx.lineTo(300, 20);
            ctx.stroke();
            ctx.lineWidth = 5;
            ctx.lineTo(200, 20);
            ctx.lineTo(200, 200);
            ctx.moveTo(250, 220);
            ctx.lineTo(250, 200);
            ctx.lineTo(150, 200);
            ctx.lineTo(150, 220);
            ctx.stroke();
            break;

        case 1:
            ctx.fillStyle = '#E2B265';     
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.fill();
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.moveTo(312, 65);
            ctx.arc(308, 65, 4, 0, 6.28);
            ctx.moveTo(296, 65);
            ctx.arc(292, 65, 4, 0, 6.28);
            ctx.moveTo(296, 83);
            ctx.lineTo(304, 83);
            ctx.stroke();
            break;

        case 2:
            ctx.fillStyle = '#E2B265';     
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.fill();
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.moveTo(312, 65);
            ctx.arc(308, 65, 4, 0, 6.28);
            ctx.moveTo(296, 65);
            ctx.arc(292, 65, 4, 0, 6.28);
            ctx.moveTo(296, 83);
            ctx.lineTo(304, 83);
            ctx.moveTo(300, 90);
            ctx.lineTo(300,130);
            ctx.stroke();
            break;

        case 3:
            ctx.fillStyle = '#E2B265';     
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.fill();
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.moveTo(312, 65);
            ctx.arc(308, 65, 4, 0, 6.28);
            ctx.moveTo(296, 65);
            ctx.arc(292, 65, 4, 0, 6.28);
            ctx.moveTo(296, 83);
            ctx.lineTo(304, 83);
            ctx.moveTo(300,130);
            ctx.lineTo(280,160);
            ctx.stroke();
            break;

        case 4:
            
            ctx.fillStyle = '#E2B265';      //cambia la carita
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.fill(); 
            ctx.fillStyle = 'black';    
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.moveTo(312, 65);
            ctx.arc(308, 65, 4, 0, 6.28);
            ctx.moveTo(296, 65);
            ctx.arc(292, 65, 4, 0, 6.28);
            ctx.moveTo(297, 70);
            ctx.lineTo(303, 70);
            

            ctx.moveTo(300,130);
            ctx.lineTo(320,160);
            ctx.stroke();
            break;

        case 5:

            ctx.fillStyle = '#E2B265';      //cambia la carita
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.fill();   
            ctx.fillStyle = 'black';  
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.moveTo(312, 65);
            ctx.arc(308, 65, 4, 0, 6.28);
            ctx.moveTo(296, 65);
            ctx.arc(292, 65, 4, 0, 6.28);
            ctx.moveTo(300, 82);
            for(var i = 1; i<6; i++)
            {
                ctx.arc(300, 82, i, 0, 6.28);
            }
    
            ctx.moveTo(300,95);
            ctx.lineTo(280,125);
            ctx.stroke();
            break;

        case 6:

            ctx.fillStyle = '#E2B265';      //cambia la carita
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.fill(); 
            ctx.fillStyle = 'black';    
            ctx.moveTo(320, 70);
            ctx.arc(300, 70, 20, 0, 6.28);
            ctx.moveTo(311, 65);
            ctx.lineTo(306,61);
            ctx.moveTo(311, 61);
            ctx.lineTo(306,65);
            ctx.moveTo(294, 65);
            ctx.lineTo(289,61);
            ctx.moveTo(294, 61);
            ctx.lineTo(289,65);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300, 82);            
            ctx.arc(300, 82, 6, 0, 6.28);
            ctx.fill();
            ctx.moveTo(300,95);
            ctx.lineTo(320,125);
            ctx.stroke()

            break;
    }

    
}

function letraCorrecta(letra) {     //dibuja la letra correcta en su posicion
    var posicionLetra = 0;
    ctx.font = '30px arial'; 

    var i;
    var banderaChar = false;     //flag para verificar si la letra no se repite

    for( i = 0; i < listacharRepetidos.length; i++) {
        if(listacharRepetidos[i] == letra) {
            banderaChar = true;  
            break;          
        }
    }

    if(!(finDeJuego) && !(banderaChar)) {
        for( i = 0; i < n; i++) {
            if(palabra[i] == letra) {
                ctx.fillStyle = 'blue';
                posicionLetra = distancia + espacio * 1.5 + i * (espacio + renglon);
                ctx.fillText(letra, posicionLetra, 290);
                intentosCorrectos += 1;
                listacharRepetidos.push(letra);
            }
        }
    }

    if(intentosCorrectos == n)
        {
            cartelFinJuego(true);
        }

}

function letraIncorrecta(letra) {     //dibuja la letra incorrecta en su posicion
    
    ctx.font='italic 20px Arial'; 

    var dist = 270 + intentosIncorrectos * 30;

    var i;
    var banderaChar = true;     //flag para verificar si la letra no se repite

    for( i = 0; i < listacharIncorrectos.length; i++) {
        if(listacharIncorrectos[i] == letra) {
            banderaChar = false;  
            break;          
        }
    }

    if (banderaChar && !(finDeJuego)) {
        ctx.fillStyle = 'red';
        if (intentosIncorrectos != 0) {     //si no es el primer error escribe una coma y despues la letra
            ctx.fillText(', ', dist-10,380);
            ctx.fillText(letra, dist,380);
        }
        else {
            ctx.fillText(letra, 270,380);       //si es el primer error escribe la letra
        }
    
        listacharIncorrectos.push(letra);       //agrego la letra incorrecta
        intentosIncorrectos += 1;
        dibujarPatibulo(intentosIncorrectos);

        if(intentosIncorrectos == 6)
        {
            cartelFinJuego(false);
        }
    }

}

function cartelFinJuego(x) {        //escribe si ganaste o perdiste, 0 perde o 1 gana
    ctx.font='italic 80px Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    if(x) {
        ctx.fillStyle = 'green';
        alert("Ganaste!");
        ctx.strokeText("Ganaste!", 150,125);
        ctx.fillText("Ganaste!", 150,125);        
        finDeJuego =true;
    }
    else {
        ctx.fillStyle = 'red';
        alert("Perdiste!");
        ctx.strokeText("Perdiste!", 150,125);
        ctx.fillText("Perdiste!", 150,125);
        finDeJuego =true;
    }
}

function cargarLetra(){             //para cargar letra con teclado virtual
    var entrada = letraInput.value;
    leerLetra(entrada);
    letraInput.value = "";
}

function leerLetra(x) {
    var charCapturado = x.toUpperCase();

    if((charCapturado.length) == 1) {       //debug para android
        if (!((charCapturado >= 'A') && (charCapturado <= 'Z'))) {
            alert("caracter no permitido!");
        }
        else {
            if(controlarletra(charCapturado)) {
                letraCorrecta(charCapturado);
            }
            else {
               letraIncorrecta(charCapturado);
            }
        }
    }

}

function capturarCaracter() {       //Captura la letra ingresada y verifica que sea una letra

    var name = event.key;
    name = name.toUpperCase();
    var asci = name.charCodeAt(0);
    if (!((asci >= 65) && (asci <= 90))) {
        alert("caracter no permitido!");
    }
    else {
        if(controlarletra(name)) {
            letraCorrecta(name);
        }
        else {
           letraIncorrecta(name);
        }
    }

}

function ayuda(evento){       //carga una letra correcta cada vez que se presiona
    var x = evento.pageX - pantalla.offsetLeft;
	var y = evento.pageY - pantalla.offsetTop;
    var xAleatorio = 60;        //x,y del cenro del circulo, codigo reciclado del practico de dianas 
    var yAleatorio = 150;
    var radio = 50;
	// calculo distancia desde el centro al radio usando r2 = [d2] = [(x -x0)2 + (y-y0)2]
	var d2;
	var r1 = radio * radio;		//radio interno cuadrado

    var charSorteado = '';
    var validador = true;

	if (x <= xAleatorio) {
		if (y <= yAleatorio) {
			d2 = ((xAleatorio - x) * (xAleatorio - x)) + ((yAleatorio - y) * (yAleatorio - y));
		}
		else {
			d2 = ((xAleatorio - x) * (xAleatorio - x)) + ((y - yAleatorio) * (y - yAleatorio));
		}
	}
	if (x > xAleatorio) {
		if (y <= yAleatorio) {
			d2 = ((x - xAleatorio) * (x - xAleatorio)) + ((yAleatorio - y) * (yAleatorio - y));
		}
		else {
			d2 = ((x - xAleatorio) * (x - xAleatorio)) + ((y - yAleatorio) * (y - yAleatorio));
		}
	}
    var wewewe = 0;

	if((!(finDeJuego)) && (d2 <= r1)) {
        do {
            wewewe = sortearPosicion(n-1);
            validador = true;
            charSorteado = listacharCorrectos[wewewe];
            for(var i=0; i<listacharRepetidos.length; i++) {
                if (charSorteado == listacharRepetidos[i]) {
                    validador = false;
                }
            }
        }
        while(!(validador))
		letraCorrecta(charSorteado);
	}
}

function ahorcar() {                            //funcion principal, va dibujando el ahorcado

    var palabraTemp = "";
    for(var contador = 0; contador <(localStorage.length + 1); contador++) {
        palabraTemp = localStorage.getItem("d"+contador);
        if((!(Object.is(palabraTemp, null))) && palabraTemp.length >3) {
            palabras.push(palabraTemp);        //genero el array de palabras, eliminando cualquier dato menor a 3 caracteres
        }
    }

    long = palabras.length - 1

    finDeJuego = false;
    palabra = palabraSecreta();

    //debug
    //console.log(palabras);
    //console.log(palabra);

    n = palabra.length;
    ctx.clearRect(0, 0, 600, 400);       //limpia pantalla en caso de mas de una partida
    charIncorrectos = 0;        //resetea caracteres incorrectos
    listacharIncorrectos = [];
    listacharCorrectos = [];
    listacharRepetidos = [];
    intentosCorrectos = 0;      //inicializo intentos en cero
    intentosIncorrectos = 0;
    cargarLetrasCorrectas();
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font='italic 30px Arial';
    ctx.fillText('Letras Incorrectas:', 10,380);
    dibujarlineas(n);
    dibujarPatibulo(0);

    // Add event listener on keydown
    document.addEventListener('keydown', (e) => {
        leerLetra(e.key);
    });
    cargarchar.addEventListener( "click",cargarLetra,true);     //para teclado virtual

    ctx.beginPath();
    ctx.fillStyle = '#ADB5BD';      //circulo de ayuda
    ctx.moveTo(110, 150);
    ctx.arc(60, 150, 50, 0, 6.28);
    ctx.fill();
    ctx.beginPath();
    ctx.font='italic 40px Arial';
    ctx.fillStyle = 'blue';
    ctx.fillText("Tip!", 27,162);

    pantalla.onclick = ayuda;
}

if (result) {       //flag para propio.html

    botonComenzar.addEventListener( "click",ahorcar,true);

} 
else {            //flag para palabra.html

    guardarPalabra.addEventListener( "click",guardarPalabraNueva,true);
    resetCache.addEventListener( "click",borrarCache,true);
}