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
import NuevaOrdenDeTrabajo from "views/OrdenDeTrabajo/NuevaOrden";

var routes = [
  {
    path: "/nueva-orden",
    name: "Nueva orden",
    icon: "ni ni-single-02 text-white",
    component: NuevaOrdenDeTrabajo,
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
    icon: "ni ni-collection text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/servicios",
    name: "Servicios",
    icon: "ni ni-planet text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/productos",
    name: "Productos",
    icon: "ni ni-bullet-list-67 text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: "ni ni-key-25 text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/facturas",
    name: "Facturas",
    icon: "ni ni-circle-08 text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: OrdenDeTrabajo,
    layout: "/admin"
  },
];
export default routes;
