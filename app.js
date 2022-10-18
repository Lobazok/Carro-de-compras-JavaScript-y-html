//Base de datos BD
//Base de datos productos stock
//aqui van los productos
const BDStockProductos = [
    {id: "ID00", Name: "Café espresso", Description: "un exquisito café simple, lo puedes acompañar con galletas o un biscocho", Precio: 5},
    {id: "ID01", Name: "Café doble", Description: "el doble de café el doble de energia", Precio: 8},
    {id: "ID02", Name: "Cafe americano", Description: "es un Café espresso rebajado con agua", Precio: 6},
    {id: "ID03", Name: "Café con leche", Description: "mitad café mitad leche, la leche es a elecion", Precio: 8},
    {id: "ID04", Name: "Café cortado", Description: "café con un poco de leche, la leche es a elecion", Precio: 7},
    {id: "ID05", Name: "Macchiato", Description: "café con una exquisita espuma", Precio: 8},
    {id: "ID06", Name: "espresso panna", Description: "espresso panna", Precio: 9},
    {id: "ID07", Name: "Cappuchino", Description: "café con leche y espuma por encima, la leche es a elecion", Precio: 12},
    {id: "ID08", Name: "Café latte", Description: "café con mucha leche y espuma por encima, la leche es a elecion", Precio: 12},
    {id: "ID09", Name: "Mocha", Description: "café con leche y un exquisito chocolate y espumapor encima", Precio: 12},
    {id: "ID10", Name: "Café con sprite", Description: "Nuestro mejor producto ,un exquisito café con sprite", Precio: 20}
]

//Base de datos productos
const BDProductos = {
    ID00: {id: "ID00", Name: "Café espresso", Description: "un exquisito café simple, lo puedes acompañar con galletas o un biscocho", Precio: 5},
    ID01: {id: "ID01", Name: "Café doble", Description: "el doble de café el doble de energia", Precio: 8},
    ID02: {id: "ID02", Name: "Cafe americano", Description: "es un Café espresso rebajado con agua", Precio: 6},
    ID03: {id: "ID03", Name: "Café con leche", Description: "mitad café mitad leche, la leche es a elecion", Precio: 8},
    ID04: {id: "ID04", Name: "Café cortado", Description: "café con un poco de leche, la leche es a elecion", Precio: 7},
    ID05: {id: "ID05", Name: "Macchiato", Description: "café con una exquisita espuma", Precio: 8},
    ID06: {id: "ID06", Name: "espresso panna", Description: "espresso panna", Precio: 9},
    ID07: {id: "ID07", Name: "Cappuchino", Description: "café con leche y espuma por encima, la leche es a elecion", Precio: 12},
    ID08: {id: "ID08", Name: "Café latte", Description: "café con mucha leche y espuma por encima, la leche es a elecion", Precio: 12},
    ID09: {id: "ID09", Name: "Mocha", Description: "café con leche y un exquisito chocolate y espumapor encima", Precio: 12},
    ID10: {id: "ID10", Name: "Café con sprite", Description: "Nuestro mejor producto ,un exquisito café con sprite", Precio: 20}
}

//carro
//Acualiza el carro (esto es para mas adelante)
function ActualizarTotal() {
    //cambia los datos de la tabla
    carroDIV = document.getElementById("contenT")
    carroDIV.querySelector("td.cantidadT").textContent ="" + Carro.length
    
    var total = 0;
    for(var i = 0; i < Carro.length; i++){
        const BDTem = Object.keys(BDProductos)
        const PositionVal = BDTem.indexOf(Carro[i])
        const ObjectTem = Object.values(BDProductos)[PositionVal]
        const Prece = ObjectTem.Precio
        total +=  Prece
    }
    carroDIV.querySelector("td.precioT").textContent ="" + total.toString()
}

//el array que contienen los datos del carro
let Carro = []
//crear tarjetas de productos   
BDStockProductos.forEach(element => {
    //variables
     //section de productos (aqui se colocan los teamples)
    const productoDIV = document.getElementById("productos");
    const fragment = document.createDocumentFragment();
    //Teplate de productos
    //se crean los productos con template y fragment
    const template = document.querySelector("#T_Productos").content;
    const DIVE =  template.querySelector("div")
    const IDe = "TR_" + element.id
    DIVE.setAttribute('id', IDe);
    template.querySelector("h3.titulo").textContent ="" + element.Name
    template.querySelector("p.description").textContent ="" + element.Description
    template.querySelector("p.precio").textContent ="" + element.Precio
    template.querySelector("button.buttonAgregarAlCarrito").setAttribute("onclick", "AgregarProductoAlCarrito(" +"BDProductos."+ element.id.toString() + ")")
      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
      productoDIV.appendChild(fragment)
 }
)

//se crean los producto
function AgregarProductoAlCarrito(element){
    //se comprueba si esta el elemento creado
    if(Carro.includes(element.id)){
        //ya esta el elemento creado, se aumenta la cantidad
        AumentarProducto(document.getElementById(element.id.toString()))
    }else{
        //no esta el elemento creado

        //se incluye el elemento en el array Carro
        Carro.push(element.id)

        carroDIV = document.getElementById("TBCarro");
        const fragment = document.createDocumentFragment();
        //Teplate de productos
        const template = document.querySelector("#T_Carro").content;
        const TRR = template.querySelector("tr.conten")
        //se crea el producto
        STETR = element.id.toString()
        TRR.setAttribute('id', STETR);
        template.querySelector("td.name").textContent ="" + element.Name
        template.querySelector("td.cantidad").textContent ="" + 1
        template.querySelector("td.precio").textContent ="" + element.Precio
        //botones de accion
        template.querySelector("td.tdPlus button").setAttribute("onclick", "AumentarProducto(" + element.id.toString() + ")")
        template.querySelector("td.tdLess button").setAttribute("onclick", "DisminuirProducto(" + "BDProductos."+ element.id.toString() + ")")
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        carroDIV.appendChild(fragment)
    }

    //se actualiza el total
    ActualizarTotal()
}

//se aumenta la cantidad de un producto
function AumentarProducto(element) {
    //se obtienen datos
    const ELid = element.id
    const BDTem = Object.keys(BDProductos)
    const PositionVal = BDTem.indexOf(ELid)
    const ObjectTem = Object.values(BDProductos)[PositionVal]
    const Prece = ObjectTem.Precio

    Carro.push(ELid)
    //se obtiene la cantidad de productos ya existentes
    var contador = 0;
    for(var i = 0; i < Carro.length; i++){
        if (Carro[i] == ELid) {
            contador++
        }
    }
    //se cambian los valores
    
    element.querySelector("td.cantidad").textContent ="" + contador
    element.querySelector("td.precio").textContent ="" + (contador * Number(Prece))
    //se actualiza el total
    ActualizarTotal()
}

//se disminuye o se borra productos del carro
function DisminuirProducto(element) {
    const ELid = element.id
    const obj = document.getElementById(ELid)

    //se obtiene la cantidad de productos ya existentes
    var contador = 0
    for(var i = 0; i < Carro.length; i++){
        if (Carro[i] == ELid) {
            contador++
        }
    }
    //se obtienen datos
    const BDTem = Object.keys(BDProductos)
    const PositionVal = BDTem.indexOf(ELid)
    const ObjectTem = Object.values(BDProductos)[PositionVal]
    const Prece = ObjectTem.Precio
    //se comprueba el numerp de productos ya existentes
   if(contador > 1){
    //hay mas de un producto ya existente, solo se cambia la cantidad
    Carro.pop(ELid)
    var contador = 0;
    for(var i = 0; i < Carro.length; i++){
        if (Carro[i] == ELid) {
            contador++
        }
    }
    //se cambian los datos
    obj.querySelector("td.cantidad").textContent ="" + contador
    obj.querySelector("td.precio").textContent ="" + (contador * Number(Prece))
   }else{
    //hay un solo producto, se borra
    obj.remove();
    Carro.pop(ELid)
   }
   //se actualiza el carro
   ActualizarTotal()
}

//vacia el carro
function VaciarCarro() {
    //encuentra el objecto donde esta el carro
    const carroDIV = document.getElementById("TBCarro")
    //un array sin datos repetidos
    let CARRITO = []
    //elimina datos repetidos del carro
    for(var i = 0; i < Carro.length; i++){
        if(CARRITO.includes(Carro[i])){}else{
            CARRITO.push(Carro[i])
        }
    }
    //borra el objecto del carro
    for(var i = 0; i < CARRITO.length; i++){
        const productos = carroDIV.querySelector("tr")
        console.log(i)
            
        productos.remove();    
        ActualizarTotal()
    }
    //vacia el array Carro
    Carro.length = 0
    ActualizarTotal()
}
