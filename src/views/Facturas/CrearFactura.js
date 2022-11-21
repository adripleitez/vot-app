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
// reactstrap components

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Col,
    FormGroup,
    Input,
    CardBody,
    Button,
    Form
  } from "reactstrap";
  // core components
  import Header from "components/Headers/HeaderGeneric.js";
  import { React, useState, useEffect ,ref} from 'react';
  import { db } from '../../firebase'
  import { collection, addDoc, getDocs, query, onSnapshot,where } from "firebase/firestore";
  import Dropdown from 'react-dropdown';
  import '../dropdown.css';
import { async } from "@firebase/util";
import { event } from "jquery";




  const Tables = () => {
   
//Para la suma de costos 
const [costos,setCostos] = useState(0);
     //Para agregar el dropdown de Servicios
     
  const [servData, setServData] = useState([]);
   
  
  //Para agregar el dropdown de productos
  const [prodData, setProdData] = useState([]);
// Para jalar la orden de trabajo al dropdown
const [otData, setotData] = useState([]);

  const [clientData, setClientData] = useState([]);
  const [search,setSearch]= useState("");
  const [filter,setFilter]= useState("Codigo Factura");
 
  const defaultFactura = {
    codigo_factura:"",
    fecha_factura: "",
    id_orden_de_trabajo:"",
    nombre_cliente:"",
    total:"",
    vehiculo:""
  };
   //Para llenar la factura 
   const [factura,setFactura] = useState(defaultFactura)



  const options = [
    'Codigo Factura', 'Fecha Factura', 'ID Orden de Trabajo', 'Cliente', 'Total', 'Vehiculo'
  ];
  const defaultOption = options[0];
  var dFilter = 'Codigo Factura';

//Para capturar el evento ( id) 
const handleChanges = async (event) =>{
  console.log(event.target.value)
  setCostos(0);
//setSelectedOption(event.target.value)
await getServicesByFilter(event.target.value)
await getProductByFilter(event.target.value )


};


// read Orders
const getOrder = async () => {
  await onSnapshot(query(collection(db, "Orden_trabajo")), (querySnapshot) => {
  
      const workorders = [];
      querySnapshot.forEach((doc) => {
        workorders.push({ ...doc.data(), id: doc.id });
      });
      console.log(workorders);
      setotData(workorders);
  });
}
  const getClient = async () => {
    await onSnapshot(query(collection(db, "Facturas")), (querySnapshot) => {  //Aun no creado
        const clients = [];
        querySnapshot.forEach((doc) => {
            clients.push({ ...doc.data(), id: doc.id });
        });
        console.log(clients);
        setClientData(clients);
    });
  }

  // Para hallar los servicios filtrados por la OT_id
  const getServicesByFilter = async (id)=>{
    try {
      let servicesFiltered = [];
      const q = query(
        collection(db,"ServiciosRealizados"),
        where("OT_id" , "==",id)
      );
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((element)=>{
        let ServiceFiltered = {id: element.id, ...element.data()};
        servicesFiltered = [ ...servicesFiltered, ServiceFiltered]
      });
      setServData(servicesFiltered);
      console.log(servicesFiltered);
      
    } catch (error) {
     console.log(error);
    }
  }

  // Para hallar los productos filtrados por la OT_id
  const getProductByFilter = async (id)=>{
    try {
      let productsFiltered = [];
      const q = query(
        collection(db,"ProductosVendidos"),
        where("OT_id" , "==",id)
      );
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((element)=>{
        let ProductsFiltered = {id: element.id, ...element.data()};
        productsFiltered = [ ...productsFiltered, ProductsFiltered]
      });
      setProdData(productsFiltered);
      console.log(productsFiltered);
      
    } catch (error) {
     console.log(error);
    }
  }
  
  const searcher = (e) =>{
    setSearch(e.target.value)
    //captura los caracteres que se van typeando
    console.log(e.target.value)

  }
// Toda la parte de agregar factura 
  const handleFacturaChanges = (e) => {
    const { name, value } = e.target;
    setFactura({ ...factura, [name]: value });
    console.log(name, value);
  };

  const handleFactura = async (e) => {
    e.preventDefault();
    console.log(factura);
    await addDoc(collection(db, "Facturas"), factura);
  };



  const selectAction = (e) => {
    setFilter(e.value);
    }

  let results = [];
  if(!search){
    results=clientData
}
else{

  if(filter === 'Codigo Factura') results=clientData.filter((dato)=> dato.codigo_factura.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Fecha Factura') results=clientData.filter((dato)=> dato.fecha_factura.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='ID Orden de Trabajo') results=clientData.filter((dato)=> dato.id_orden_de_trabajo.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Cliente') results=clientData.filter((dato)=> dato.nombre_cliente.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Total') results=clientData.filter((dato)=> dato.total.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Vehiculo') results=clientData.filter((dato)=> dato.vehiculo.toString().toLowerCase().includes(search.toLocaleLowerCase()));

    /*results = clientData.filter((dato)=>
    dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
    )*/
}

useEffect(() => {
  (async () => {
    await getClient();
     await getOrder();
  })();

}, []);

/*
  useEffect( () => {
     
  }, []);
*/
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
            
              <Card className="shadow">
              <CardHeader className="border-0">
                  <h3 className="mb-0">Facturas</h3>
                  <div className="d-flex">
                    <input className="d-inline-block" style={{height: 'fit-content', padding: '10px'}} value={search} onChange={searcher} type="text" placeholder="Buscar..."></input>
                    <p className="d-inline-block" style={{padding: '10px'}}>Filtrar por:</p>
                    <Dropdown class="d-inline-block" options={options} onChange={selectAction} value={defaultOption} placeholder="Select an option" responsive/>
                  </div>                   
                  </CardHeader>
                  
                  <Row className="justify-content-left">
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-id-orden"
                                                    >
                                                        Seleccionar Orden de trabajo
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                        onChange={async (evt) => {await handleChanges (evt) }}
                                                        
                                                        >
                                                          <option> seleccione la orden</option>
                                                        {otData.map((s) => {
                                                            return <option key={s.OT_id} value={s.OT_id}>{s.OT_id}</option>
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <CardBody>
                                        <h3 className="mb-0">Listado de servicios Vendidos</h3>
                                        
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Descripcion</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Sección</th>
                                            <th scope="col">Observaciones</th>
                                            <th scope="col">Impuestos</th>
                                            <th scope="col">Aplicable</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {/* tabla de servicios acm1pt */}
                                        {servData.map((s, i) => {
                                            return <tr key={i}>
                                                <th scope="row">{s.descripcion}</th>
                                                <td>{s.costo}</td>
                                                <td>
                                                    {s.estatus === false
                                                        ? <Badge color="" className="badge-dot mr-4">
                                                            <i className="bg-success" />
                                                            Pendiente
                                                        </Badge>
                                                        : <Badge color="" className="badge-dot mr-4">
                                                            <i className="bg-warning" />
                                                            Realizado
                                                        </Badge>
                                                    }
                                                </td>
                                                <td>{s.seccion}</td>
                                                <td>{s.observaciones}</td>
                                                <td>{s.impuesto}</td>
                                                <td> <button onClick={()=>setCostos(costos+Number(s.costo)+Number(s.impuesto))}> Agregar </button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardBody>
                              <h3> Lista de Productos Vendidos</h3>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Costo</th>
                      <th scope="col">Seccion</th>
                      <th scope="col">Aplicable</th>
                      
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {prodData.map((s) => {
                      return (
                        <tr key={s.OT_id}>
                          <th scope="row">{s.nombre}</th>
                          <td>{s.cantidad}</td>
                          <td>{s.costo_unitario}</td>
                          <td>{s.seccion}</td>
                          <td> <button onClick={()=>setCostos(costos+Number(s.costo_unitario))}> Agregar </button></td>
                          <td className="text-right">

                          
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Editar
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Eliminar
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <h4 className="mb-0"> Total a facturar en dolares</h4>
                                        {JSON.stringify(costos)}
                <Row className="px-4">
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Agregar Factura</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#cliente"
                      onClick={handleFactura}
                      size="sm"
                    >
                      Agregar factura
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-codigo_factura"
                          >
                            Código Factura
                          </label>
                          <Input
                            name="codigo_factura"
                            className="form-control-alternative"
                            id="input-codigo_factura"
                            type="text"
                            onChange={handleFacturaChanges}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fecha_factura"
                          >
                            Fecha de la factura
                          </label>
                          <Input
                            name="fecha_factura"
                            className="form-control-alternative"
                            id="input-fecha_factura"
                            type="text"
                            onChange={handleFacturaChanges}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-id_orden_de_trabajo"
                          >
                            ID de la orden de trabajo
                          </label>
                          <Input
                            name="id_orden_de_trabajo"
                            className="form-control-alternative"
                            id="input-id_orden_de_trabajo"
                            type="text"
                            onChange={handleFacturaChanges}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nombre_cliente"
                          >
                           Nombre del cliente
                          </label>
                          <Input
                            name="nombre_cliente"
                            className="form-control-alternative"
                            id="input-nombre_cliente"
                            type="text"
                            onChange={handleFacturaChanges}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-total"
                          >
                            Total a facturar
                          </label>
                          <Input
                            name="total"
                            className="form-control-alternative"
                            id="input-total"
                            type="text"
                            onChange={handleFacturaChanges}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-vehiculo"
                          >
                            Vehiculo
                          </label>
                          <Input
                            name="vehiculo"
                            className="form-control-alternative"
                            id="input-vehiculo"
                            type="text"
                            onChange={handleFacturaChanges}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
              </CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                        <th scope="col">Codigo Factura</th>
                        <th scope="col">Fecha Factura</th>
                        <th scope="col">ID Orden de Trabajo</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Total</th>
                        <th scope="col">Vehiculo</th>
                        <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {results.map((s)=>{
                            return <tr key={s.id}>
                                    <th scope="row">{s.codigo_factura}</th>
                                    <td>{s.fecha_factura}</td>
                                        <td>{s.id_orden_de_trabajo}</td>
                                        <td>{s.nombre_cliente}</td>
                                        <td>{s.total}</td>
                                        <td>{s.vehiculo}</td>
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                className="btn-icon-only text-light"
                                                href="#pablo"
                                                role="button"
                                                size="sm"
                                                color=""
                                                onClick={(e) => e.preventDefault()}
                                                >
                                                <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                            })}
                  </tbody> 
                </Table>

              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Tables;