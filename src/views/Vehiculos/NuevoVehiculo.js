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
    Col,
    Button,
    CardBody,
    Form,
    FormGroup,
    Input
  } from "reactstrap";
  // core components
  import Header from "components/Headers/HeaderGeneric.js";
  import { useState, useEffect } from "react";
  import { db } from '../../firebase'
  import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
  
  const Tables = () => {
    const defaultVehicle = {
        Chasis_VIN: "",
        año: "",
        chasis_grabado: "",
        color: "",
        marca: "",
        modelo: "",
        numero_motor: "",
        placa: "",
        
    };

  const [vehicle, setVehicle] = useState(defaultVehicle);
  const [vehData, setVehData] = useState([]);
  const [search,setSearch]= useState("");

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value })
    console.log(name, value);
};

//save vehicle
const handleVehicle = async (e) => {
    e.preventDefault();
    console.log(vehicle);
    await addDoc(collection(db, 'Vehiculos'), vehicle);
};



  const getVehicle = () => {
    onSnapshot(query(collection(db, "Vehiculos")), (querySnapshot) => {
        const vehicles = [];
        querySnapshot.forEach((doc) => {
            vehicles.push({ ...doc.data(), id: doc.id });
        });
        console.log(vehicles);
        setVehData(vehicles);
    });
  }
  const searcher = (e) =>{
    setSearch(e.target.value)
    //captura los caracteres que se van typeando
    console.log(e.target.value)

  }

  let results = [];
  if(!search){
    results=vehData
}
else{

    results=vehData.filter((dato)=> dato.placa.toLowerCase().includes(search.toLocaleLowerCase())||
    dato.marca.toLowerCase().includes(search.toLocaleLowerCase()) ||
    dato.modelo.toLowerCase().includes(search.toLocaleLowerCase()));
    
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
            <Row className="px-4">
                <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Agregar Vehiculo</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button
                                        color="primary"
                                        href="#cliente"
                                        onClick={handleVehicle}
                                        size="sm"
                                    >
                                        Guardar
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
                                                    htmlFor="input-chasisVin"
                                                >
                                                    Chasis_VIN
                                                </label>
                                                <Input
                                                    name="Chasis_VIN"
                                                    className="form-control-alternative"
                                                    id="input-chasisVin"
                                                    type="text"
                                                    onChange={handleVehicleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    htmlFor="select"
                                                    className="form-control-label"
                                                >
                                                    Color
                                                </label>
                                                <Input type="select" name="color" id="select"
                                                    onChange={handleVehicleChange}>
                                                    <option>Rojo</option>
                                                    <option>Azul</option>
                                                    <option>Morado</option>
                                                    <option>Amarillo</option>
                                                    <option>Naranja</option>
                                                    <option>Negro</option>
                                                    <option>Blanco</option>
                                                    <option>Verde</option>
                                                    <option>Dorado</option>
                                                    <option>Plateado</option>
                                                    <option>Café</option>
                                                    <option>Otro</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-año"
                                                >
                                                    año
                                                </label>
                                                <Input
                                                    name="año"
                                                    className="form-control-alternative"
                                                    id="input-año"
                                                    type="text"
                                                    onChange={handleVehicleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                        <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-chasisGrabado"
                                                >
                                                    Chasis grabado
                                                </label>
                                                <Input
                                                    name="chasis_grabado"
                                                    className="form-control-alternative"
                                                    id="input-chasisGrabado"
                                                    type="text"
                                                    onChange={handleVehicleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                        <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-marca"
                                                >
                                                    Marca
                                                </label>
                                                <Input
                                                    name="marca"
                                                    className="form-control-alternative"
                                                    id="input-marca"
                                                    type="text"
                                                    onChange={handleVehicleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="4">
                                        <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-modelo"
                                                >
                                                    Modelo
                                                </label>
                                                <Input
                                                    name="modelo"
                                                    className="form-control-alternative"
                                                    id="input-modelo"
                                                    type="text"
                                                    onChange={handleVehicleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                        <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-NumerodeMotor"
                                                >
                                                    Número de motor
                                                </label>
                                                <Input
                                                    name="numero_motor"
                                                    className="form-control-alternative"
                                                    id="input-numeroMotor"
                                                    type="text"
                                                    onChange={handleVehicleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                        <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-placa"
                                                >
                                                    Placa
                                                </label>
                                                <Input
                                                    name="placa"
                                                    className="form-control-alternative"
                                                    id="input-placa"
                                                    type="text"
                                                    onChange={handleVehicleChange}
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
            <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Vehiculos</h3>
                  <input value={search} onChange={searcher} type="text" placeholder="Placa, Modelo o marca"></input>
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