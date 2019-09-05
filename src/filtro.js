let filtro = [255,0,0];
let imagenRespaldo = new Image();
let mosaico = false;
function recibeColor(color){
		filtro=[0,0,0];
        if(color.value=="red"){
			filtro[0] = 255;
		}else if(color.value=="green"){
			filtro[1] = 255;
		}else if(color.value=="blue"){
			filtro[2] = 255;
		}
}
function conseguirContexto(){
	const canvas = document.getElementById("imagen");
	const ctx = canvas.getContext("2d");
	return ctx;
}
function recibeImagen(evento){
	let archivo = evento.files[0];
	if(archivo.type.match('image.*')){
		let lector = new FileReader();
		lector.onload = (function() {
			return function(e) {
			  const ctx = conseguirContexto();
			  const imagen = new Image();
			  imagenRespaldo = imagen;
			  imagen.src = lector.result;
			  ctx.canvas.width = imagen.naturalWidth;
			  ctx.canvas.height = imagen.naturalHeight;
			  ctx.drawImage(imagen,0,0);
			};
		})(archivo);
		lector.readAsDataURL(archivo);
	}
}
function aplicaFiltro(){
	const ctx = conseguirContexto();
	ctx.drawImage(imagenRespaldo,0,0);
	let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	if(!mosaico){
		for (let i = 0; i < imgData.data.length; i += 4) {
		  imgData.data[i] = filtro[0]-imgData.data[i];
		  imgData.data[i+1] = filtro[1]-imgData.data[i+1];
		  imgData.data[i+2] = filtro[2]-imgData.data[i+2];
		  imgData.data[i+3] = 255;
		}
	}
	
	ctx.putImageData(imgData, 0, 0);
}
function borraImagen(){
	const ctx = conseguirContexto();
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

function borraFiltro(){
	const ctx = conseguirContexto();
	ctx.drawImage(imagenRespaldo,0,0);
}
