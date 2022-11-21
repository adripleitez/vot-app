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
                  
                  
                            <CardBody>
                
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
                                        
                                    </tr>
                            })}
                  </tbody> 
                </Table>
                </CardBody>

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