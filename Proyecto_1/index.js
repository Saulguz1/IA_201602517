function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec('http://luisespino.com/temp/games/reversi/index.php?turno=1&estado=2222222222222222222222222221022222201222222222222222222222222222');
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var turnoac = getParameterByName('turno');
var estadoac = getParameterByName('estado');

console.log(turnoac);
console.log(estadoac);

var matriz = Array.from(estadoac).map(Number);

document.getElementById("algoritmo").textContent=generar(turnoac,matriz);

function generar(turno,matriz){
    console.log(matriz)
    return obterposiciones(matriz,turno);
}

function obtenerjugadasperm(matriz){
    var jugadas = [];
    var jugadasposibles = obterposiciones(matriz);
    console.log(jugadasposibles)
    for (posi in jugadasposibles){
       if (true in sepuede(jugadasposibles[posi],matriz)) {
           jugadas.push(jugadasposibles[posi])
       } 
    }
    return jugadas;
}

function obterposiciones(matriz,turno){
   var fila, columna = 0
   var jugadas = [].map(Number)
   //Agregar los espacios al rededor de la ficha de turno
    for ( var i in matriz.map(Number) ){
        if(matriz[i] !=2 && matriz[i] == turno){
            fila =  Math.trunc(i/8)
            columna = i%8;
            if(columna>0){
                jugadas.push(i - 1)
                if (fila > 0){
                    jugadas.push(i - 9)
                }
                if(fila < 7){
                    jugadas.push(parseInt(i) + 7)
                }
            }
            if(columna<7){
                jugadas.push(parseInt(i)+1)
                if (fila > 0){
                    jugadas.push(i-7)
                }
                if(fila<7){
                    jugadas.push(parseInt(i)+9)
                }
            }
            if(fila>0){
                jugadas.push(i-8)
            }
            if(fila<7){
                jugadas.push(parseInt(i)+8)
            }
        }
    }
    //Elimina los espacios donde ya hay ficha
    var cont = 0;
    var posibles =[]
    while(cont < jugadas.length){
        if(matriz[jugadas[cont]]==2){
            posibles.push(jugadas[cont]);
        }
        cont++;
    }
    
    return posibles;
}
function verificarjugada(posi,matriz){
    if( matriz[posi] != 2){
        return [false,false,false,false,false,false,false,false]
    }
    var fila,columna =0;
    fila = Math.trunc(posi);
    columna = posi%8;

}

