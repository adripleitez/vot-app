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
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/HeaderGeneric.js";
  import { useState, useEffect } from "react";
  import { db } from '../../firebase'
  import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
  import Dropdown from 'react-dropdown';
  import '../dropdown.css';
  
  const Tables = () => {
  const [vehData, setVehData] = useState([]);
  const [search,setSearch]= useState("");
  const [filter,setFilter]= useState("Placa");

  const options = [
    'Placa', 'Marca', 'Modelo', 'Color', 'Año', 'Chasis VIN', 'Chasis Grabado', 'Numero de Motor'
  ];
  const defaultOption = options[0];
  var dFilter = 'Placa';


  const getVehicle = () => {
    onSnapshot(query(collection(db, "Vehiculos")), (querySnapshot) => {
        const services = [];
        querySnapshot.forEach((doc) => {
            services.push({ ...doc.data(), id: doc.id });
        });
        console.log(services);
        setVehData(services);
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

  let results = [];
  if(!search){
    results=vehData
}
else{
    if(filter === 'Placa') results=vehData.filter((dato)=> dato.placa.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Marca') results=vehData.filter((dato)=> dato.marca.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Modelo') results=vehData.filter((dato)=> dato.modelo.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Color') results=vehData.filter((dato)=> dato.color.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Año') results=vehData.filter((dato)=> dato.año.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Chasis VIN') results=vehData.filter((dato)=> dato.Chasis_VIN.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Chasis Grabado') results=vehData.filter((dato)=> dato.chasis_grabado.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Numero de Motor') results=vehData.filter((dato)=> dato.numero_motor.toLowerCase().includes(search.toLocaleLowerCase()));


    
    /*results = clientData.filter((dato)=>
    dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
    )*/
}

  useEffect(() => {
    getVehicle();
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
                  <h3 className="mb-0">Vehiculos</h3>
                  <div class="d-flex">
                  <input class="d-inline-block" style={{height: 'fit-content', padding: '10px'}} value={search} onChange={searcher} type="text" placeholder="Buscar..."></input>
                  <p class="d-inline-block" style={{padding: '10px'}}>Filtrar por:</p>
                  <Dropdown class="d-inline-block" options={options} onChange={selectAction} value={defaultOption} placeholder="Select an option" responsive/>
                  </div>                
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                        <th scope="col">Placa</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Color</th>
                        <th scope="col">Año</th>
                        <th scope="col">Chasis VIN</th>
                        <th scope="col">Chasis Grabado</th>
                        <th scope="col">Numero de Motor</th>
                        <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {results.map((s)=>{
                            return <tr key={s.id}>
                                    <th scope="row">{s.placa}</th>
                                    <td>{s.marca}</td>
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
                                        <td>{s.modelo}</td>
                                        <td>{s.color}</td>
                                        <td>{s.año}</td>
                                        <td>{s.chasis_VIN}</td>
                                        <td>{s.chasis_grabado}</td>
                                        <td>{s.numero_motor}</td>
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