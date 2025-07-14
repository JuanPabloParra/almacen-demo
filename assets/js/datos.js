// assets/js/datos.js

// Leer productos desde localStorage
function leerProductos() {
  return JSON.parse(localStorage.getItem('productos')) || [];
}

// Insertar un nuevo producto
function insertarProducto(producto) {
  const productos = leerProductos();
  producto.id = Date.now();
  producto.fecha_ingreso = new Date().toISOString().split('T')[0];
  productos.push(producto);
  localStorage.setItem('productos', JSON.stringify(productos));
  registrarMovimiento('INGRESO', producto.nombre, localStorage.getItem('admin-user') || 'Desconocido');
  return { success: true, mensaje: 'Producto insertado', id: producto.id };
}

// Eliminar un producto por ID
function eliminarProducto(id) {
  let productos = leerProductos();
  const producto = productos.find(p => p.id === id);
  if (!producto) return false;

  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));
  registrarMovimiento('ELIMINACIÓN', producto.nombre, localStorage.getItem('admin-user') || 'Desconocido');
  return true;
}

// Validar credenciales de admin (sin base de datos)
function validarAdmin(correo, contrasena) {
  const usuarios = [
    { correo: 'admin@demo.com', contrasena: '1234', nombre: 'Administrador' }
  ];
  const admin = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
  return admin ? admin.nombre : null;
}

// Registrar movimiento
function registrarMovimiento(tipo, nombre_producto, realizado_por) {
  const movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
  movimientos.push({
    tipo,
    nombre_producto,
    realizado_por,
    fecha: new Date().toISOString()
  });
  localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

// Obtener historial de movimientos
function obtenerMovimientos() {
  return JSON.parse(localStorage.getItem('movimientos')) || [];
}
