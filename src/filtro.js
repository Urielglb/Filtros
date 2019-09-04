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
        
}
function borraImagen(){
	let canvas = document.getElementById("imagen");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
}