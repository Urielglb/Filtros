let filtro;

function recibeColor(color){
	filtro = color.value;
}
function recibeImagen(){
	let input = document.getElementById("files");
	let archivo = input.files[0];
	let imagen = new Image();
	imagen.src = archivo.name;
	let canvas = document.getElementById("imagen");
	let ctx = canvas.getContext("2d");
	imagen.onload = function(){
		ctx.canvas.width = imagen.naturalWidth;
		ctx.canvas.height = imagen.naturalHeight;
		ctx.drawImage(imagen,0,0);
}
function aplicaFiltro(){
	}
}