/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import OrdenDeTrabajo from "views/OrdenDeTrabajo/Principal";
import NuevoServicio from "views/Servicios/NuevoServicio";
import Revisiones from "views/OrdenDeTrabajo/Revisiones";
import NuevaOrdenDeTrabajo from "views/OrdenDeTrabajo/NuevaOrden";
import ListaServicio from "views/Servicios/ListaServicio";
import ListaVehiculo from "views/Vehiculos/ListaVehiculo";
import NuevoVehiculo from "views/Vehiculos/NuevoVehiculo";
import ListaCliente from "views/Clientes/ListaCliente";
import ListaProveedor from "views/Proveedores/ListaProveedor";
import ListaFactura from "views/Facturas/ListaFactura";
import ListaProducto from "views/Productos/ListaProducto";
import NuevoProducto from "views/Productos/NuevoProducto";
import DasboardPage from "views/Dashboards/Principal";
import verOrden from "views/OrdenDeTrabajo/VerOrden";

var routes = [
  {
    path: "/nueva-orden",
    name: "Nueva orden",
    icon: "ni ni-single-02 text-white",
    component: NuevaOrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/ordenes-de-trabajo/orden/:id",
    name: "Orden",
    icon: "ni ni-single-02 text-white",
    component: verOrden,
    layout: "/admin"
  },
  {
    path: "/ordenes-de-trabajo",
    name: "Órdenes de Trabajo",
    icon: "ni ni-collection text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/vehiculos",
    name: "Vehículos",
    icon: "ni ni-bus-front-12 text-blue",
    component: NuevoVehiculo,
    layout: "/admin"
  },
  {
    path: "/servicios",
    name: "Servicios",
    icon: "ni ni-paper-diploma text-blue",
    component: NuevoServicio,
    layout: "/admin"
  },
  {
    path: "/productos",
    name: "Productos",
    icon: "ni ni-settings text-blue",
    component: NuevoProducto,
    layout: "/admin"
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: "ni ni-circle-08 text-blue",
    component: ListaCliente,
    layout: "/admin"
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    icon: "ni ni-delivery-fast text-blue",
    component: ListaProveedor,
    layout: "/admin"
  },
  {
    path: "/facturas",
    name: "Facturas",
    icon: "ni ni-credit-card text-blue",
    component: ListaFactura,
    layout: "/admin"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: DasboardPage,
    layout: "/admin"
  }
];
export default routes;
