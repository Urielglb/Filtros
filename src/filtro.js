let imagenRespaldo = new Image();//variable que guardará un respaldo de la imagén actual con la que se trabja para de esta forma recuperar los colores orginales de esta al querer borrar un filtro

/**
 * Método que se encargará de recibir el valor del select que pregunta el filtro que se desea aplicar a la imagen y de guardar los valores RGB de dicho filtro en un  arreglo que creará
 * Se ejecuta cuando se mande llamar dentro del método aplicaFiltro y regresará el arreglo donde guardó los valores del filtro a aplicar
 * @return {array} filtro 
 */

function recibeColor() {
	const color = document.getElementById("filtro");
	let filtro=[0,0,0];
	if(color.value=="red"){
		filtro[0] = 255;
	}else if(color.value=="green"){
		filtro[1] = 255;
	}else if(color.value=="blue"){
		filtro[2] = 255;
	}
	return filtro;
}

/**
 * Método para saber si el filtro que se desea aplicar en la imagen es el filtro mosaico
 * unicamente regresa si todos los valores del arreglo son iguales a cero
 * Se mandará llamar en el método aplicaFiltro y recibe el arreglo con los valores del filtro
 * @param {array} filtro
 * @return {boolean} mosaico
 */

function filtroMosaico(){
	const mosaico = (filtro[0] == 0 & filtro[1] == 0 & filtro[2] == 0);
	return mosaico;
}

/**
 * Método que regresa el contexto del canvas que guardará la imagen a la cual se le aplicará el filtro
 * @return {context} ctx
 */

function getContexto(){
	const canvas = document.getElementById("imagen");
	const ctx = canvas.getContext("2d");
	return ctx;
}

/**
 * Método que se encargará de recibir y leer la imagen con la cual se desea trabajar y la pondrá en el canvas del documento
 * Se ejecutara cuando el input de tipo files cambie
 * Antes de leer el archivo recibido se cerciora de que este sea de tipo imagen
 * @param {input} evento 
 */

function recibeImagen(evento){
	let archivo = evento.files[0];
	if(archivo.type.match('image.*')){
		let lector = new FileReader();
		lector.onload = (function() {
			  const ctx = getContexto();
			  const imagen = new Image();
			  imagenRespaldo = imagen;
			  imagen.src = lector.result;
			  ctx.canvas.width = imagen.naturalWidth;
			  ctx.canvas.height = imagen.naturalHeight;
			  ctx.drawImage(imagen,0,0);
			});
		lector.readAsDataURL(archivo);
	}
}

/**
 * Método que se encargará de aplicar el filtro deseado a la imagen seleccionada
 * Se ejecutará cuando el boton con valor "Aplica filtro" se presione
 */

function aplicaFiltro(){
	const ctx = getContexto();
	ctx.drawImage(imagenRespaldo,0,0);
	let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let filtro = recibeColor();
	if(!filtroMosaico(filtro)){
		for (let i = 0; i < imgData.data.length; i += 4) {
		  imgData.data[i] = filtro[0]-imgData.data[i];
		  imgData.data[i+1] = filtro[1]-imgData.data[i+1];
		  imgData.data[i+2] = filtro[2]-imgData.data[i+2];
		  imgData.data[i+3] = 255;
		}
	}
	
	ctx.putImageData(imgData, 0, 0);
}

/**
 * Método que se encargará de borrar la imagen que actualmente se encuentra en el canvas
 * Se ejecutará cuando el boton con valor "Borrar imagen actual" se presione
 */

function borraImagen(){
	const ctx = getContexto();
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}
/**
 * Método que se encargará de borrar el filtro que posee la imagen actualmente
 * Se ejecutará cuando el boton con valor "Borrar filtro actual" se presione
 */
function borraFiltro(){
	const ctx = getContexto();
	ctx.drawImage(imagenRespaldo,0,0);
}

