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
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";


import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";


const Tables = () => {
  const [otData, setotData] = useState([]);
  const [search,setSearch]= useState("");

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

  let results = [];
  if(!search){
    results=otData
}

else{

  results=otData.filter((dato)=> dato.OT_id.toLowerCase().includes(search.toLocaleLowerCase())||
  dato.estado.toLowerCase().includes(search.toLocaleLowerCase()) ||
  dato.empleado.toLowerCase().includes(search.toLocaleLowerCase()));
  
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
                <h3 className="mb-0">Órdenes de trabajo</h3>
                <input value={search} onChange={searcher} type="text" placeholder="Buscar"></input>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">No Orden</th>
                    <th scope="col">Presupuesto</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Empleado</th>
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
                                        <td>{s.empleado}</td>
                                        <td>{s.vehiculo}</td>
                                        <td>{s.fecha_inicio}</td>
                                        <td>{s.fecha_cierre}</td>
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