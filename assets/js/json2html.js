//función para leer el json
function json2html(url, padre){
	$.getJSON(url, function(data) {
		procesaHTML(data, $(padre));
	});
}

//funcion para procesar los elementos
function procesaHTML(objeto, padre){
	for (var tag in objeto){
		switch (tag){
			case '@attr':
				procesaAtributos(objeto[tag], padre);
			break;
			case '@value':
				procesaValores(objeto[tag], padre);
			break;
			default:
				var numerico = false;
				for (var x in objeto[tag]){  //si el hijo del tag es numérico, recorremos sus elementos y los creamos en el DOM
						if (!isNaN(x)){
							numerico = true;
							var elem = crearElemento(tag, padre);
							procesaHTML(objeto[tag][x], elem);
							padre.append(elem);

						}
				}
				// creamos los elementos no numéricos.
				if (isNaN(tag)){
					if (!numerico){
						var elem = crearElemento(tag, padre);
					}
				procesaHTML(objeto[tag], elem);
				padre.append(elem);
				}
			break;
		}
	}
}

//~ function miFuncion(cad1, cad2){
	//~ alert ('cadenas:\n-'+cad1+'\n -'+cad2);
//~ }

function procesaEvento(elem, evento, accion){
	elem.bind(evento, function(){
		eval(accion);
	});
}

function procesaAtributos(atributos, elemento){
	for (var atributo in atributos){
			if (atributo.substr(0, 2) == 'on'){
				var evento = atributo.substr(2).toLowerCase();
				var accion = atributos[atributo];
				procesaEvento(elemento, evento, accion);
			}else{
				elemento.attr(atributo, atributos[atributo]);
			}
	}
}

function procesaValores(valor, elemento){
	elemento.html(valor);
}

function crearElemento(etiqueta, padre){
	var elemento = $('<'+etiqueta+'></'+etiqueta+'>');
	//padre.append(elemento);
	return elemento;
}
