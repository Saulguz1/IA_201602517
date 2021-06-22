function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
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
    var moves = obtenerjugadasperm(matriz,turno)
    console.log(moves)
    //elije posicion al azar
    var elije=   Math.floor(Math.random() * moves.length);
    console.log(elije)
    return moves[elije];
}
function obtenerjugadasperm(matriz,turno){
    var jugadas = [];
    var jugadasposibles = obterposiciones(matriz,turno);
    console.log(jugadasposibles)
    var posi = 0
    while(posi < jugadasposibles.length){
        var posi2 = 0
        var verifica = verificarjugada(jugadasposibles[posi],matriz,turno)
        while(posi2 < verifica.length){
            if(verifica[posi2]==true){
                jugadas.push(jugadasposibles[posi])
            }
            posi2++;
        }
        posi++;
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
function verificarjugada(posi,matriz,turno){
    var eslegal = [false,false,false,false,false,false,false,false]
    if( matriz[posi] != 2){
        return eslegal
    }
    var fila,columna =0;
    fila = Math.trunc(posi/8);
    columna = posi%8;
    var cont = 1;
    var result = 0;
    if(columna >1){
        
        while(cont < parseInt(columna)+1){
            result = verifica(matriz[posi-cont],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result == 2){
                eslegal[0] =true
                console.log(eslegal[0], "a")
                break;
            }else{
                break;
            }
            
        }
    }
    if(columna < 6){
        cont = 1
        while(cont < 8-columna){
            result = verifica(matriz[parseInt(posi)+cont],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result == 2){
                eslegal[1] =true
                console.log(eslegal[1], "b")
                break;
            }else{
                break;
            }
            
        }
    }
    if(fila >1){
        cont=1;
        while(cont < parseInt(fila)+1){
            result = verifica(matriz[posi-cont*8],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result == 2){
                eslegal[2] =true
                break;
            }else{
                break;
            }
            
        }
    }
    if(fila < 6){
        cont = 1
        while(cont < 8-columna){
            result = verifica(matriz[parseInt(posi)+cont*8],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result == 2){
                eslegal[3] =true
                break;
            }else{
                break;
            }
            
        }
    }
    var cont = 1;
    if(columna >1 && fila >1){
        while(cont < Math.min(columna,fila)+1){
            result = verifica(matriz[posi-cont*9],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result == 2){
                eslegal[4] =true
                break;
            }else{
                break;
            }
            
        }
    }
    if(columna < 6 && fila >1){
        cont = 1
        while(cont < Math.min(Math.abs(columna-7),fila)+1){
            result = verifica(matriz[parseInt(posi)-cont*7],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result = 2){
                eslegal[5] ==true
                break;
            }else{
                break;
            }
            
        }
    }
    var cont = 1;
    if(columna >1 && fila < 6){
        while(cont < Math.min(columna,Math.abs(fila-7))+1){
            result = verifica(matriz[parseInt(posi)+cont*7],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result = 2){
                eslegal[4] ==true
                break;
            }else{
                break;
            }
            
        }
    }
    if(columna < 6 && fila <6){
        cont = 1
        while(cont <Math.min(Math.abs(columna-7),Math.abs(fila-7))+1){
            result = verifica(matriz[parseInt(posi)+cont*9],cont,turno);
            if (result == 1){
                cont++;
                continue;
            }else if (result == 2){
                eslegal[5] =true
                break;
            }else{
                break;
            }
            
        }
    }
    return eslegal;

}
function verifica(espacio,cont,turno){
    if(espacio == turno){
        return 1;
    }
    else if (espacio == 2){
        return 0;
    }
    else if (cont > 1){
        return 2;
    } 
    return 0;
}
