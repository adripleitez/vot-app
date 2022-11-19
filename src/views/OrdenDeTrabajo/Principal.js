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
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Button,
  Container,
  Row
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import {useHistory} from 'react-router-dom';

import "@fortawesome/fontawesome-free";

import { useState, useEffect } from "react";

import { db } from '../../firebase'
import { collection, query, onSnapshot } from "firebase/firestore";
import Dropdown from 'react-dropdown';
import '../dropdown.css';



const Tables = () => {
  const [otData, setotData] = useState([]);
  const [search,setSearch]= useState("");
  const [filter,setFilter]= useState("No Orden");

  const options = [
    'No Orden', 'Presupuesto', 'Estado', 'Encargado', 'Vehiculo', 'Fecha Inicio', 'Fecha Cierre'
  ];
  const defaultOption = options[0];

  const history = useHistory();

  const getOrder = () => {
    onSnapshot(query(collection(db, "Orden_trabajo")), (querySnapshot) => {
        const workorders = [];
        querySnapshot.forEach((doc) => {
          workorders.push({ ...doc.data(), id: doc.id });
        });
        console.log(workorders);
        setotData(workorders);
    });
  }

  const searcher = (e) =>{
    setSearch(e.target.value)
    //captura los caracteres que se van typeando
    console.log(e.target.value)

  }

  const selectAction = (e) => {
    setFilter(e.value);
    }

  const handleBtn = (id, e) => {
    e.preventDefault()
    history.push('/admin/ordenes-de-trabajo/orden/'+ id);
  }

  let results = [];
  if(!search){
    results=otData
  }

else{

  if(filter === 'No Orden') results=otData.filter((dato)=> dato.OT_id.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Presupuesto') results=otData.filter((dato)=> dato.presupuesto.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Estado') results=otData.filter((dato)=> dato.estado.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Encargado') results=otData.filter((dato)=> dato.encargado.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Fecha Inicio') results=otData.filter((dato)=> dato.fecha_inicio.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Vehiculo') results=otData.filter((dato)=> dato.vehiculo_id.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  else if(filter==='Fecha Cierre') results=otData.filter((dato)=> dato.fecha_cierre.toString().toLowerCase().includes(search.toLocaleLowerCase()));
  
  /*results = clientData.filter((dato)=>
  dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
  )*/
}

useEffect(() => {
  getOrder();
}, []);


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
                <div class="d-flex">
                    <input class="d-inline-block" style={{ height: 'fit-content', padding: '9px', borderColor: '#ffffff5c', borderStyle: "groove"}}  value={search} onChange={searcher} type="text" placeholder="Buscar orden..."></input>
                    <p class="d-inline-block" style={{padding: '10px'}}>Filtrar por:</p>
                    <Dropdown class="d-inline-block" options={options} onChange={selectAction} value={defaultOption} placeholder="Select an option" responsive/>
                </div> 
               </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">No Orden</th>
                    <th scope="col">Presupuesto</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Encargado</th>
                    <th scope="col">Vehículo</th>
                    <th scope="col">Fecha inicio</th>
                    <th scope="col">Fecha cierre</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {results.map((s)=>{
                            return <tr key={s.id}>
                                    <th scope="row">{s.OT_id}</th>
                                    <td>{s.presupuesto}</td>
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
                                        <td>{s.estado}</td>
                                        <td>{s.encargado}</td>
                                        <td>{s.vehiculo_id}</td>
                                        <td>{s.fecha_inicio}</td>
                                        <td>{s.fecha_cierre}</td>
                                        <td><Button color="primary" className="btn-icon-only" type="button" onClick={e => handleBtn(s.OT_id, e)}> <i className="fas fa-eye"></i> </Button></td>
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