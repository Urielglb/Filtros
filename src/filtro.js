let filtro;
let imagen = new Image();

function recibeColor(color){
        filtro = color.value;
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
	
	var c = document.getElementById("imagen");
	var ctx = c.getContext("2d");
	var imgData = ctx.getImageData(0, 0, c.width, c.height);
	
	// invert colors
	for (var i = 0; i < imgData.data.length; i += 4) {
	  imgData.data[i] = 255-imgData.data[i];
	  imgData.data[i+1] = 255-imgData.data[i+1];
	  imgData.data[i+2] = 255-imgData.data[i+2];
	  imgData.data[i+3] = 255;
	}
	
	ctx.putImageData(imgData, 0, 0); 

}

function borraImagen(){
	let canvas = document.getElementById("imagen");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
}
