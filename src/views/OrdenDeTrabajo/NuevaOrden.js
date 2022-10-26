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
    Badge,
    Label
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import { useState } from "react";
import { db } from './../../firebase'
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
                <Row className="mb-3">
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Orden de trabajo</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#orden"
                                            size="sm"
                                        >
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="justify-content-left">
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-id-orden"
                                            >
                                                ID
                                            </label>
                                            <Input
                                                name="id"
                                                className="form-control-alternative"
                                                placeholder="OT-000000"
                                                id="input-id-orden"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-date"
                                            >
                                                Fecha Registrado
                                            </label>
                                            <Input
                                                name="date"
                                                className="form-control-alternative"
                                                id="input-date"
                                                defaultValue={date}
                                                type="date"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="order-xl-1 mb-3" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Datos del cliente</h3>
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
                                                        htmlFor="select"
                                                        className="form-control-label"
                                                    >
                                                        Selecciona tipo de Cliente
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                            onChange={handleClientChange}>
                                                        <option>Física</option>
                                                        <option>Jurídica</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dui"
                                                    >
                                                        DUI Persona / NIT Empresa
                                                    </label>
                                                    <Input
                                                        name="clientid"
                                                        className="form-control-alternative"
                                                        id="input-dui"
                                                        placeholder="Eg. 00000000-0"
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
                                                        htmlFor="input-name"
                                                    >
                                                        Nombre del cliente / empresa
                                                    </label>
                                                    <Input
                                                        name="name"
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        placeholder="Nombre"
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
                                                        htmlFor="input-tel"
                                                    >
                                                        Teléfono
                                                    </label>
                                                    <Input
                                                        name="tel"
                                                        className="form-control-alternative"
                                                        id="input-tel"
                                                        placeholder="2222-2222"
                                                        type="text"
                                                        onChange={handleClientChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Correo Electronico
                                                    </label>
                                                    <Input
                                                        name="email"
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        placeholder="example@gmail.com"
                                                        type="email"
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
                                                        htmlFor="input-name"
                                                    >
                                                        Nombre del representante
                                                    </label>
                                                    <Input
                                                        name="name"
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        placeholder="Nombre"
                                                        type="text"
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
                                        <h3 className="mb-0">Datos Vehiculo</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#vehiculo"
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
                                                        htmlFor="input-number-plate"
                                                    >
                                                        Placa
                                                    </label>
                                                    <Input
                                                        name="numberplate"
                                                        className="form-control-alternative"
                                                        id="input-number-plate"
                                                        placeholder="000000"
                                                        type="text"
                                                        onChange={handleVehicleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-num_motor"
                                                    >
                                                        Numero Motor
                                                    </label>
                                                    <Input
                                                        name="motor"
                                                        className="form-control-alternative"
                                                        id="input-num-motor"
                                                        placeholder="00000000000"
                                                        type="text"
                                                        onChange={handleVehicleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Año
                                                    </label>
                                                    <Input
                                                        name="year"
                                                        className="form-control-alternative"
                                                        id="input-year"
                                                        placeholder="2022"
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
                                                        htmlFor="input-brand"
                                                    >
                                                        Marca
                                                    </label>
                                                    <Input
                                                        name="brand"
                                                        className="form-control-alternative"
                                                        id="input-brand"
                                                        placeholder="Toyota"
                                                        type="text"
                                                        onChange={handleVehicleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-model"
                                                    >
                                                        Modelo
                                                    </label>
                                                    <Input
                                                        name="model"
                                                        className="form-control-alternative"
                                                        id="input-model"
                                                        placeholder="Corolla"
                                                        type="text"
                                                        onChange={handleVehicleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-color"
                                                    >
                                                        Color
                                                    </label>
                                                    <Input
                                                        name="color"
                                                        className="form-control-alternative"
                                                        id="input-color"
                                                        placeholder="Azul"
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
                                                        htmlFor="input-VIN"
                                                    >
                                                        Chasis VIN
                                                    </label>
                                                    <Input
                                                        name="vin"
                                                        className="form-control-alternative"
                                                        id="input-vin"
                                                        placeholder="00000000000000000"
                                                        type="text"
                                                        onChange={handleVehicleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-aseguradora"
                                                >
                                                    Aseguradora
                                                </label>
                                                <Input
                                                    name="insurance"
                                                    className="form-control-alternative"
                                                    defaultValue=""
                                                    id="input-aseguradora"
                                                    placeholder=""
                                                    type="text"
                                                    onChange = {handleDiagnosisChange}
                                                />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select-tipo-vehiculo"
                                                        className="form-control-label"
                                                    >
                                                        Selecciona tipo de Cliente
                                                    </label>
                                                    <Input type="select" name="type" id="select-tipo-vehiculo"
                                                            onChange={handleClientChange}>
                                                        <option>Particular</option>
                                                        <option>Autobus</option>
                                                        <option>Motocicleta</option>
                                                        <option>Camiones</option>
                                                    </Input>
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
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Diagnóstico</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#servicios"
                                            onClick={handleDiagnosis}
                                            size="sm"
                                        >
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                            <div className="pl-lg-4">
                                <Row>
                                <Col md="12">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-observaciontes-taller"
                                    >
                                        Observaciones del Taller
                                    </label>
                                    <Input
                                        name = "workshopRemarks"
                                        className="form-control-alternative"
                                        defaultValue=""
                                        id="input-observaciontes-taller"
                                        placeholder=""
                                        type="text"
                                        onChange = {handleDiagnosisChange}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                <Col md="12">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-observaciontes-cliente"
                                    >
                                        Observaciones del Cliente
                                    </label>
                                    <Input
                                        name="clientRemarks"
                                        className="form-control-alternative"
                                        defaultValue=""
                                        id="input-observaciontes-cliente"
                                        placeholder=""
                                        type="text"
                                        onChange = {handleDiagnosisChange}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-fecha-diag"
                                    >
                                        Fecha de Diagnóstico
                                    </label>
                                    <Input
                                        name="date"
                                        className="form-control-alternative"
                                        id="fecha-diag"
                                        defaultValue={date}
                                        type="date"
                                        onChange = {handleDiagnosisChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-km"
                                    >
                                        KMs Entrada
                                    </label>
                                    <Input
                                        name="kms"
                                        className="form-control-alternative"
                                        id="input-km"
                                        placeholder=""
                                        type="number"
                                        onChange = {handleDiagnosisChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-gasolina"
                                    >
                                        Gasolina de entrada
                                    </label>
                                    <Input
                                        name="gas"
                                        className="form-control-alternative"
                                        id="input-gasolina"
                                        placeholder=""
                                        type="number"
                                        onChange = {handleDiagnosisChange}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                            </div>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="order-xl-1" xl="12">
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
