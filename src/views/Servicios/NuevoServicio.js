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
import { useState } from "react";
import { db } from '../../firebase'
import { collection, addDoc } from "firebase/firestore";

const Profile = () => {

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    const defaultClient = {
        clientid: "",
        name: "",
        lastname: "",
        tel: "",
        email: "",
        type: "Física",
    };
    const defaultVehicle = {
        numberplate: "",
        type: "",
        motor: "",
        year: "",
        brand: "",
        model: "",
        color: "",
        vin: "",
    };

    const defaultDiagnosis = {
        workshopRemarks: "",
        clientRemarks: "",
        date: date,
        kms: "",
        gas: "",
        insurance: ""
    };

    const [client, setClient] = useState(defaultClient);

    const [vehicle, setVehicle] = useState(defaultVehicle);

    const [diagnosis, setDiagnosis] = useState(defaultDiagnosis);

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value })
        console.log(name, value);
    };

    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value })
        console.log(name, value);
    };

    const handleDiagnosisChange = (e) => {
        const { name, value } = e.target;
        setDiagnosis({ ...diagnosis, [name]: value })
        console.log(name, value);
    };

    //save client
    const handleClient =  async(e) => {
        e.preventDefault();
        console.log(client);
        await addDoc(collection(db, 'Cliente'), client);
    };

    //save vehicle
    const handleVehicle = async (e) => {
        e.preventDefault();
        console.log(vehicle);
        await addDoc(collection(db, 'Vehiculos'), vehicle);
    };

    //save diagnosis
    const handleDiagnosis = async (e) => {
        e.preventDefault();
        console.log(diagnosis);
        await addDoc(collection(db, 'Diagnostico'), diagnosis);
    };

    

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1 mb-3" xl="6">
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
                                            onClick={handleClient}
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
                                            <Col lg="6">
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
                                                        onChange={handleClientChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select"
                                                        className="form-control-label"
                                                    >
                                                        Sección
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                            onChange={handleClientChange}>
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
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-descripcion"
                                                    >
                                                        Descripción
                                                    </label>
                                                    <Input
                                                        name="name"
                                                        className="form-control-alternative"
                                                        id="input-descripcion"
                                                        type="text"
                                                        onChange={handleClientChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
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
                                                        onChange={handleClientChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
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
                                                        onChange={handleClientChange}
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
                                                        onChange={handleClientChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1 mb-3" xl="6">
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
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-success" />
                                                    Realizado
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
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
