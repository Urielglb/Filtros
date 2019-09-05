let filtro = [255,0,0];
let imagen = new Image();
let mosaico = false;
function recibeColor(color){
		filtro=[0,0,0];
        if(color.value=="red"){
			filtro[0] = 255;
		}else if(color.value=="green"){
			filtro[1] = 255;
		}else if(color.value=="blue"){
			filtro[2] = 255;
		}else{
			mosaico = true;
		}
}
function recibeImagen(evento){
	let archivo = evento.files[0];
	if(archivo.type.match('image.*')){
		let lector = new FileReader();
		lector.onload = (function() {
			return function(e) {
			  let canvas = document.getElementById("imagen");
			  let ctx = canvas.getContext("2d");
			  imagen.src = e.target.result;
			  ctx.canvas.width = imagen.naturalWidth;
			  ctx.canvas.height = imagen.naturalHeight;
			  ctx.drawImage(imagen,0,0);
			};
		})(archivo);
		lector.readAsDataURL(archivo);
	}
}
function aplicaFiltro(){
	let c = document.getElementById("imagen");
	let ctx = c.getContext("2d");
	let imgData = ctx.getImageData(0, 0, c.width, c.height);
	
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
	let canvas = document.getElementById("imagen");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function borraFiltro(){
	let canvas = document.getElementById("imagen");
	let ctx = canvas.getContext("2d");
	ctx.drawImage(imagen)
}