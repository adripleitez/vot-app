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

const Profile = () => {
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Datos del cliente</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
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
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dui"
                                                    >
                                                        DUI
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-dui"
                                                        placeholder="00000000-0"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-name"
                                                    >
                                                        Nombres
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        placeholder="Nombre"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-lastname"
                                                    >
                                                        Apellidos
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-lastname"
                                                        placeholder="Apellidos"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-tel"
                                                        placeholder="2222-2222"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        placeholder="example@gmail.com"
                                                        type="email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="order-xl-1" xl="6">
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
                                            onClick={(e) => e.preventDefault()}
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
                                                        className="form-control-alternative"
                                                        id="input-number-plate"
                                                        placeholder="000000"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-num-motor"
                                                        placeholder="00000000000"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-year"
                                                        placeholder="2022"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-brand"
                                                        placeholder="Toyota"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-model"
                                                        placeholder="Corolla"
                                                        type="text"
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
                                                        className="form-control-alternative"
                                                        id="input-color"
                                                        placeholder="Azul"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-VIN"
                                                    >
                                                        Chasis VIN
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-vin"
                                                        placeholder="00000000000000000"
                                                        type="text"
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
                <Row className="mt-3">
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
                                            onClick={(e) => e.preventDefault()}
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
                                        className="form-control-alternative"
                                        defaultValue=""
                                        id="input-observaciontes-taller"
                                        placeholder=""
                                        type="text"
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
                                        className="form-control-alternative"
                                        defaultValue=""
                                        id="input-observaciontes-cliente"
                                        placeholder=""
                                        type="text"
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
                                        className="form-control-alternative"
                                        id="fecha-diag"
                                        placeholder="XX-XX-XXXX"
                                        type="text"
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
                                        className="form-control-alternative"
                                        id="input-km"
                                        placeholder=""
                                        type="number"
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
                                        className="form-control-alternative"
                                        id="input-gasolina"
                                        placeholder=""
                                        type="number"
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                <Col md="6">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-aseguradora"
                                    >
                                        Aseguradora
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        defaultValue=""
                                        id="input-aseguradora"
                                        placeholder=""
                                        type="text"
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
                                            <th scope="row">
                                                Cambio de aceite
                                            </th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-success" />
                                                    Realizado
                                                </Badge>
                                            </td>

                                            <td>
                                                Sección 1
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Cambio de aceite
                                            </th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>
                                                Sección 1
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Cambio de aceite
                                            </th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>
                                                Sección 1
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                Cambio de aceite
                                            </th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>
                                                Sección 1
                                            </td>
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
