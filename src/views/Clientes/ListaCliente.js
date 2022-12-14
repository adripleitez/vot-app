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
    Row
  } from "reactstrap";
  // core components
  import Header from "components/Headers/HeaderGeneric.js";
  import { useState, useEffect } from "react";
  import { db } from '../../firebase'
  import { collection, query, onSnapshot } from "firebase/firestore";
  import Dropdown from 'react-dropdown';
  import '../dropdown.css';

  
  const Tables = () => {
  const [clientData, setClientData] = useState([]);
  const [search,setSearch]= useState("");
  const [filter,setFilter]= useState("Dui");

  const options = [
    'Dui', 'Nombres', 'Apellidos', 'Email', 'Telefono', 'Tipo de Cliente'
  ];
  const defaultOption = options[0];

  const getClient = () => {
    onSnapshot(query(collection(db, "Cliente")), (querySnapshot) => {
        const clients = [];
        querySnapshot.forEach((doc) => {
            clients.push({ ...doc.data(), id: doc.id });
        });
        console.log(clients);
        setClientData(clients);
    });
  }
  const searcher = (e) =>{
    setSearch(e.target.value);
    //captura los caracteres que se van typeando
  }

  const selectAction = (e) => {
    setFilter(e.value);
    }

  let results = [];
  if(!search){
    results=clientData
}
else{
    if(filter === 'Dui') results=clientData.filter((dato)=> dato.dui.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter === 'Nombres') results=clientData.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter === 'Email') results=clientData.filter((dato)=> dato.email.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter === 'Apellidos') results=clientData.filter((dato)=> dato.lastname.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter === 'Telefono') results=clientData.filter((dato)=> dato.tel.toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter === 'Tipo de Cliente') results=clientData.filter((dato)=> dato.type.toLowerCase().includes(search.toLocaleLowerCase()));
    
    /*results = clientData.filter((dato)=>
    dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
    )*/
}

  useEffect(() => {
    getClient();
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
                  <input class="d-inline-block" style={{ height: 'fit-content', padding: '9px', borderColor: '#ffffff5c', borderStyle: "groove"}} value={search} onChange={searcher} type="text" placeholder="Buscar Cliente..."></input>
                  <p class="d-inline-block" style={{padding: '10px'}}>Filtrar por:</p>
                  <Dropdown class="d-inline-block" options={options} onChange={selectAction} value={defaultOption} placeholder="Select an option" responsive/>
                  </div>                
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                        <th scope="col">Dui</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Tipo de Cliente</th>
                        <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>

                     {results.map((s)=>{
                            return <tr key={s.id}>
                                    <th scope="row">{s.dui}</th>
                                    <td>{s.name}</td>
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
                                        <td>{s.lastname}</td>
                                        <td>{s.email}</td>
                                        <td>{s.tel}</td>
                                        <td>{s.type}</td>
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