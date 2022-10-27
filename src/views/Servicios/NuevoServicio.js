import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Table,
    Row,
    Col,
    Badge
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
        type: "Neumáticos",
        description: "",
        cost: "",
        commission: "",
        tax: "",
        observations: "",
        status: false
    };


    const [service, setService] = useState(defaultService);
    const [servData, setServData] = useState([]);

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
                                                    <Input type="select" name="type" id="select"
                                                        onChange={handleServiceChange}>
                                                        <option>Neumáticos</option>
                                                        <option>Revisiones</option>
                                                        <option>Baterías / Arranques</option>
                                                        <option>Frenos</option>
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
                                                        name="description"
                                                        className="form-control-alternative"
                                                        id="input-descripcion"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
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
                                                        name="cost"
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
                                                        name="tax"
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
                                                        name="commission"
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
                                                        name="observations"
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
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#servicos"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Agregar
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Descripcion</th>
                                            <th scope="col">Precio base</th>
                                            <th scope="col">Estatus</th>
                                            <th scope="col">Sección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servData.map((s) => {
                                            return <tr key={s.id}>
                                                <th scope="row">{s.description}</th>
                                                <td>{s.cost}</td>
                                                <td>
                                                    {s.status === false
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
                                                <td>{s.type}</td>
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
