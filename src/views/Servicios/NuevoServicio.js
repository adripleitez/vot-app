import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
    Row,
    Col,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

const Profile = () => {

    var curr = new Date();
    curr.setDate(curr.getDate());

    const defaultService = {
        servicioid: "",
        seccion: "Neumáticos",
        descripcion: "",
        costo: "",
        comision: "",
        impuesto: "",
        observaciones: "",
        tipo: "",
        taller: "",
        estatus: false
    };


    const [service, setService] = useState(defaultService);
    const [servData, setServData] = useState([]);
    const [search,setSearch]= useState("");

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value })
        console.log(name, value);
    };


    //save service
    const handleService = async (e) => {
        e.preventDefault();
        console.log(service);
        await addDoc(collection(db, 'Servicio'), service);
    };

    //read service
    const getServices = () => {
        onSnapshot(query(collection(db, "Servicio")), (querySnapshot) => {
            const services = [];
            querySnapshot.forEach((doc) => {
                services.push({ ...doc.data(), id: doc.id });
            });
            console.log(services);
            setServData(services);
        });
    }

    const searcher = (e) =>{
        setSearch(e.target.value)
        //captura los caracteres que se van typeando
        console.log(e.target.value)
    
      }
    
      let results = [];
      if(!search){
        results=servData
    }
    else{
    
        results=servData.filter((dato)=> dato.descripcion.toLowerCase().includes(search.toLocaleLowerCase())||
        dato.costo.toLowerCase().includes(search.toLocaleLowerCase()));
        
        /*results = clientData.filter((dato)=>
        dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
        )*/
    }

    useEffect(() => {
        getServices();
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
                                        <h3 className="mb-0">Agregar Servicio</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#cliente"
                                            onClick={handleService}
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
                                                        htmlFor="input-codigo"
                                                    >
                                                        Código de Servicio
                                                    </label>
                                                    <Input
                                                        name="servicioid"
                                                        className="form-control-alternative"
                                                        id="input-codigo"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select"
                                                        className="form-control-label"
                                                    >
                                                        Sección
                                                    </label>
                                                    <Input type="select" name="seccion" id="select"
                                                        onChange={handleServiceChange}>
                                                        <option>Neumáticos</option>
                                                        <option>Revisiones</option>
                                                        <option>Baterías / Arranques</option>
                                                        <option>Frenos</option>
                                                        <option>Reparación Motor</option>
                                                        <option>Reparación Caja</option>
                                                        <option>Amortiguadores</option>
                                                        <option>Accesorios de tienda y alfombrilla</option>
                                                        <option>Sonido y multimedia</option>
                                                        <option>Reparación Carrocería</option>
                                                        <option>Reparación Mecánica</option>
                                                        <option>Otro</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-descripcion"
                                                    >
                                                        Descripción
                                                    </label>
                                                    <Input
                                                        name="descripcion"
                                                        className="form-control-alternative"
                                                        id="input-descripcion"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select-type"
                                                        className="form-control-label"
                                                    >
                                                        Tipo de Servicio
                                                    </label>
                                                    <Input type="select" name="tipo" id="select-type"
                                                        onChange={handleServiceChange}>
                                                        <option>Interno</option>
                                                        <option>Externo</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select-taller"
                                                        className="form-control-label"
                                                    >
                                                        Taller
                                                    </label>
                                                    <Input type="select" name="taller" id="select-taller"
                                                        onChange={handleServiceChange}>
                                                        <option>LA CHOLA</option>
                                                        <option>123 TALLER</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-costo"
                                                    >
                                                        Costo
                                                    </label>
                                                    <Input
                                                        name="costo"
                                                        className="form-control-alternative"
                                                        id="input-costo"
                                                        placeholder="$0.00"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-impuesto"
                                                    >
                                                        Impuesto
                                                    </label>
                                                    <Input
                                                        name="impuesto"
                                                        className="form-control-alternative"
                                                        id="input-impuesto"
                                                        placeholder="%"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-commission"
                                                    >
                                                        Comisión
                                                    </label>
                                                    <Input
                                                        name="comision"
                                                        className="form-control-alternative"
                                                        id="input-commission"
                                                        placeholder="%"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-observaciones"
                                                    >
                                                        Observaciones
                                                    </label>
                                                    <Input
                                                        name="observaciones"
                                                        className="form-control-alternative"
                                                        id="input-observaciones"
                                                        type="textarea"
                                                        onChange={handleServiceChange}
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
                                        <h3 className="mb-0">Listado de servicios</h3>
                                        <input value={search} onChange={searcher} type="text"></input>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                            <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio base</th>
                        <th scope="col">Sección</th>
                        <th scope="col">Observaciones</th>
                        <th scope="col">Impuestos</th>
                        <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {results.map((s)=>{
                            return <tr key={s.id}>
                                    <th scope="row">{s.descripcion}</th>
                                    <td>{s.costo}</td>
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
                                        <td>{s.seccion}</td>
                                        <td>{s.observaciones}</td>
                                        <td>{s.impuesto}</td>
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

export default Profile;
