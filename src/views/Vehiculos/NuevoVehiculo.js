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
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import Dropdown from 'react-dropdown';
import '../dropdown.css';

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
  const [search, setSearch] = useState("");
  const [filter,setFilter]= useState("Placa");

  const options = [
    'Placa', 'Marca', 'Modelo', 'Color', 'Año', 'Chasis VIN', 'Chasis Grabado', 'Numero de Motor'
  ];
  const defaultOption = options[0];
  var dFilter = 'Placa';

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
    console.log(name, value);
  };

  //save vehicle
  const handleVehicle = async (e) => {
    e.preventDefault();
    console.log(vehicle);
    await addDoc(collection(db, "Vehiculos"), vehicle);
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
  };
  const searcher = (e) => {
    setSearch(e.target.value);
    //captura los caracteres que se van typeando
    console.log(e.target.value);
  };

  const selectAction = (e) => {
    setFilter(e.value);
    }

  let results = [];
  if (!search) {
    results = vehData;
  } else {
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
                          <Input
                            type="text"
                            name="color"
                            id="select"
                            list="color"
                            onChange={handleVehicleChange}
                          />
                        <datalist id="color">
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
                        </datalist>

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
        <Row className="p-4">
          <Col className="order-xl-1 mb-3" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Listado de vehículos</h3>
                    <div class="d-flex">
                    <input class="d-inline-block" style={{height: 'fit-content', padding: '10px'}} value={search} onChange={searcher} type="text" placeholder="Buscar..."></input>
                    <p class="d-inline-block" style={{padding: '10px'}}>Filtrar por:</p>
                    <Dropdown class="d-inline-block" options={options} onChange={selectAction} value={defaultOption} placeholder="Select an option" responsive/>
                    </div>                
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
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
                    {results.map((s) => {
                      return (
                        <tr key={s.id}>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
