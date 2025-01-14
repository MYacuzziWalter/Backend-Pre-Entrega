const socket = io();

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = "";
    productos.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML = `
                            <p>${item.title}</p>
                            <p>${item.description}</p>
                            <p>${item.price}</p>
                            <p>${item.stock}</p>
                            <button> Eliminar </button>
                        `
        contenedorProductos.appendChild(card);               
        
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id)
        })
    });
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

socket.on("productos", (data) => {
    renderProductos(data);
})


// renderizar los productos
document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto()
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        status: document.getElementById("status").value === "true",
    }

    socket.emit("agregarProducto", producto);
}