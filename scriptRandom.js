let botonComenzar = document.getElementById('comenzarRandom');        //para propio.html
let letraInput = document.getElementById('char');
let cargarchar = document.getElementById('cargarChar');

let pantalla = document.querySelector("canvas");
let ctx = pantalla.getContext("2d");

let palabra = "";       //palabra a adivinar, variable global
let n = 0;      //length de palabra
let finDeJuego = false;

let charIncorrectos = 0;
let listacharCorrectos = [];
let listacharIncorrectos = [];
let intentosCorrectos = 0;
let intentosIncorrectos = 0;

const espacio = 10;     //aca seteo las variables de posicion para letras y renglones, declaradas global para usar en las distintas funciones
const renglon = 30;
let distancia = 300;

function leerPalabra() {        //guarda la palabra a adivinar
    var palabraTemp = prompt("Ingrese la palabra a adivinar:");
    var charTemp = '';
    var flagPalabra = true;

    palabraTemp = palabraTemp.toUpperCase();
    for(var i = 0; i < palabraTemp.length; i++) {
        charTemp = palabraTemp[i];
        if(!((charTemp >= 'A') && (charTemp <= 'Z'))) {     //verifica que no teng nummeros ni chars especiales
            flagPalabra = false;
        }
    }

    if(flagPalabra) {
        palabra = palabraTemp;
    }
    else {
        alert("Error! Ingrese una nueva palabra sin números ni caracteres especiales");
    }
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

function leerLetra(x) {
    var charCapturado = x.toUpperCase();

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

    letraInput.value = '';
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

function sortearPosicion(maximo) {              //genera un numero aleatorio entre 0 y un maximo
    return Math.floor(Math.random()*maximo);
}

function ahorcar() {                            //funcion principal, va dibujando el ahorcado

    finDeJuego = false;
    leerPalabra();
    n = palabra.length;
    ctx.clearRect(0, 0, 600, 400);       //limpia pantalla en caso de mas de una partida
    charIncorrectos = 0;        //resetea caracteres incorrectos
    listacharIncorrectos = [];
    listacharCorrectos = [];
    listacharRepetidos = [];
    intentosCorrectos = 0;      //inicializo intentos en cero
    intentosIncorrectos = 0;
    cargarLetrasCorrectas();

    //debug
    //console.log(palabra);
    //console.log(n);
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font='italic 30px Arial';
    ctx.fillText('Letras Incorrectas:', 10,380);
    dibujarlineas(n);
    dibujarPatibulo(0);

    // Add event listener on keydown
    letraInput.addEventListener('keydown', (e) => {
        leerLetra(e.key);
      });

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

botonComenzar.addEventListener( "click",ahorcar,true);