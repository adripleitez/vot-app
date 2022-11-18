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
    CardBody
  } from "reactstrap";
  // core components
  import Header from "components/Headers/HeaderGeneric.js";
  import { React, useState, useEffect ,ref} from 'react';
  import { db } from '../../firebase'
  import { collection, doc, getDocs, query, onSnapshot,where } from "firebase/firestore";
  import Dropdown from 'react-dropdown';
  import '../dropdown.css';
import { async } from "@firebase/util";
import { event } from "jquery";




  const Tables = () => {

     //Para agregar el dropdown de Servicios
  const [servData, setServData] = useState([]);
  //Para agregar el dropdown de productos
  const [prodData, setProdData] = useState([]);
// Para jalar la orden de trabajo al dropdown
const [otData, setotData] = useState([]);

  const [clientData, setClientData] = useState([]);
  const [search,setSearch]= useState("");
  const [filter,setFilter]= useState("Codigo Factura");
  
  



  const options = [
    'Codigo Factura', 'Fecha Factura', 'ID Orden de Trabajo', 'Cliente', 'Total', 'Vehiculo'
  ];
  const defaultOption = options[0];
  var dFilter = 'Codigo Factura';

//Para capturar el evento ( id) 
const handleChanges = async (event) =>{console.log(event.target.value)
//setSelectedOption(event.target.value)
await getServicesByFilter(event.target.value)
await getProductByFilter(event.target.value )

};





  //read service
  const getServices = () => {
    onSnapshot(query(collection(db, "ServiciosRealizados")), (querySnapshot) => {
        const services = [];
        querySnapshot.forEach((doc) => {
            services.push({ ...doc.data(), id: doc.id });
        });
        setServData(services);
    });
}

  //read products
  const getProducts = async () => {
    await onSnapshot(query(collection(db, "ProductosVendidos")), (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id });
        });
        setProdData(products);
    });
}
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

  const selectAction = (e) => {
    setFilter(e.value);
    }

  let results = [];
  if(!search){
    results=clientData
}
else{

  if(filter === 'Codigo Factura') results=clientData.filter((dato)=> dato.codigo_factura.toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Fecha Factura') results=clientData.filter((dato)=> dato.fecha_factura.toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='ID Orden de Trabajo') results=clientData.filter((dato)=> dato.id_orden_de_trabajo.toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Cliente') results=clientData.filter((dato)=> dato.nombre_cliente.toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Total') results=clientData.filter((dato)=> dato.total.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Vehiculo') results=clientData.filter((dato)=> dato.vehiculo.toLowerCase().includes(search.toLocaleLowerCase()));

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
                                                <td> <button> Agregar </button></td>
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
                          <td><button>Agregar</button></td>
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
                                    {/* <td>
                                                        {s.status == false 
                                                            ?   <Badge color="" className="badge-dot mr-4">
                                                                <i className="bg-success" />
                                                                        Pendiente
                                                                </Badge>
                                                            :   <Badge color="" className="badge-dot mr-4">
                                                                    <i className="bg-warning" />
                                                                        Realizado
                                                                </Badge>
                                                        }
                                                    </td> */}
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
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Tables;