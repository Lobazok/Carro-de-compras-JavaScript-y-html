//Base de Datos
const BD = {
    ID00: {id: "ID00", name: "name 00", description: "description 00", price: 1},
    ID01: {id: "ID01", name: "name 01", description: "description 01", price: 1},
    ID02: {id: "ID02", name: "name 02", description: "description 02", price: 2},
    ID03: {id: "ID03", name: "name 03", description: "description 03", price: 3},
    ID04: {id: "ID04", name: "name 04", description: "description 04", price: 4},
    ID05: {id: "ID05", name: "name 05", description: "description 05", price: 5},
    ID06: {id: "ID06", name: "name 06", description: "description 06", price: 6},
    ID07: {id: "ID07", name: "name 07", description: "description 07", price: 7},
    ID08: {id: "ID08", name: "name 08", description: "description 08", price: 8},
    ID09: {id: "ID09", name: "name 09", description: "description 09", price: 9},
}
//la variable del carro, donde estara listado el contenido
var carro = []

function ActualizarTotal() {
    //cambia los datos de la tabla
    carroDIV = document.getElementById("contenT")
    carroDIV.querySelector("td.cantidadT").textContent ="" + carro.length

	//calculamos el total con un ciclo for
    var total = 0;
    for(var i = 0; i < carro.length; i++){
		//obtenemos el elemento
        id = carro[i]
		//obtenemos la ubicacion del elemento en la base de datos
		indexBD = Object.keys(BD).findIndex((a) => a == id)
		//obtenemos el elemento
		element = Object.values(BD)[indexBD]
		//obtenemos el precio
		Price = element.price
		//sumamos el total del precio
        total +=  Price
    }

	//mostramos el precio
    carroDIV.querySelector("td.precioT").textContent = total + ""
}

//aumenta la cantidad de un producto en el carro
const aumentarCantidad = (element) =>{
	//se aumenta la cantidad en el carro
	carro.push(element.id)

	//se obtiene el elemento del DOM
	const producto = document.getElementById("carro_" + element.id)

	//se obtiene la cantidad del producto
	cantidad = carro.filter((carro) => carro.startsWith(element.id)).length

	//modificamos los valores
	producto.querySelector("td.cantidad").textContent = cantidad
    producto.querySelector("td.price").textContent =element.price * cantidad

	//actualizamos el total
	ActualizarTotal()
}

//aumenta la cantidad de un producto en el carro
const disminuirCantidad = (element) =>{
	//se disminuye la cantidad en el carro
	carro.pop(element.id)

	//se obtiene el elemento del DOM
	const producto = document.getElementById("carro_" + element.id)

	//se obtiene la cantidad del producto
	cantidad = carro.filter((carro) => carro.startsWith(element.id)).length

	//se comprueba si 
	if(cantidad == 0){
		producto.remove()
	}else{
		//modificamos los valores
	    producto.querySelector("td.cantidad").textContent = cantidad
        producto.querySelector("td.price").textContent =element.price * cantidad
	}

	//actualizamos el total
	ActualizarTotal()
}

//funcion para agregar un producto al carro
const agregarAlCarro = (element)=>{
	//se comprueba si el elemento ya esta en el carro
	if(carro.includes(element.id)){
		//si esta incluido, se llama a la funcion aumentarCantidad
		aumentarCantidad(element)
	}else{
		//no esta incluido en el carro, se agrega al carro

		//se agrega el producto al carro
		carro.push(element.id)

	     //variables
         //section de productos (aqui se colocan los teamples)
         const productosContenedor = document.getElementById("TBCarro");
    
         //se crea el fragment
         const fragment = document.createDocumentFragment();
    
         //Teplate de productos
         //se crean los productos con template y fragment
         const template = document.querySelector("#T_producto").content;
    
         //se seleciona el contenedor
         const DIVE =  template.querySelector("tr.conten")
         //se le agrega un ID, en este caso es TR_ + 
         const IDe = "carro_" + element.id
         DIVE.setAttribute('id', IDe);
    
         //se edita el contenido del producto
         template.querySelector("td.name").textContent ="" + element.name
         template.querySelector("td.cantidad").textContent = "1"
         template.querySelector("td.price").textContent ="" + element.price
    
         //se agrega funcinalidad al boton
	     //llama a la funcion agregarAlCarro, esta funcion requiere el ID del objecto
         template.querySelector("td.tdPlus button").setAttribute("onclick", "agregarAlCarro(BD." + element.id + ")")
		 template.querySelector("td.tdLess button").setAttribute("onclick", "disminuirCantidad(BD." + element.id + ")")
    
         //se agrega el fragment al contenedor
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        productosContenedor.appendChild(fragment)

	    //actualizamos el total
	    ActualizarTotal()
	    }
}


//se crea los articulos
//se transforma la base de datos de un object a un array para poder usar forEach
Object.values(BD).forEach(element => {
	//variables
	//section de productos (aqui se colocan los teamples)
	const productosContenedor = document.getElementById("productos");

	//se crea el fragment
	const fragment = document.createDocumentFragment();

	//Teplate de productos
	//se crean los productos con template y fragment
	const template = document.querySelector("#T_article").content;

	//se seleciona el contenedor
	const DIVE =  template.querySelector("article")
	//se le agrega un ID, en este caso es TR_ + 
	const IDe = "Producto_" + element.id
	DIVE.setAttribute('id', IDe);

	//se edita el contenido del producto
	template.querySelector("h3.title").textContent ="" + element.name
	template.querySelector("p.description").textContent ="" + element.description
	template.querySelector("p.price").textContent ="" + element.price

	//se agrega funcinalidad al boton
	//llama a la funcion agregarAlCarro, esta funcion requiere el ID del objecto
	template.querySelector("button.buttonAgregarAlCarrito").setAttribute("onclick", "agregarAlCarro(BD." + element.id + ")")

	//se agrega el fragment al contenedor
   const clone = template.cloneNode(true)
   fragment.appendChild(clone)
   productosContenedor.appendChild(fragment)
}
)

const VaciarCarro = ()=>{
	//encuentra el objecto donde esta el carro
    const carroDIV = document.getElementById("TBCarro")

    //un array sin datos repetidos
    let CARRITO = []
    //crea un array sin elementos repetidos
    for(var i = 0; i < carro.length; i++){
        if(CARRITO.includes(carro[i])){}else{
            CARRITO.push(carro[i])
        }
    }

    //borra los objecto del carro
    for(var i = 0; i < CARRITO.length; i++){
        const productos = carroDIV.querySelector("tr")
            
        productos.remove();    
        ActualizarTotal()
    }
	
    //vacia el array Carro
    carro.length = 0
    ActualizarTotal()
}

//llamamos a la funcion ActualizarTotal
ActualizarTotal()
