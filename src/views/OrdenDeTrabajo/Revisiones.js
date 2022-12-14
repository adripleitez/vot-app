import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import {useHistory} from 'react-router-dom';
import { useState } from "react";
import { db } from '../../firebase'
import { collection, addDoc } from "firebase/firestore";

const Revisiones = () => {

    const defaultChecks = {
        radioLlanta: "Si",
        radioMica: "Si",
        radiollave: "Si",
        radioherramienta: "Si",
        radioTriangulo: "Si",
        radioAntena: "Si",
        radioInterior: "Si",
        radioExterior: "Si",
        radioRuedas: "Si",
        radioAdornos: "Si",
        radioBrazos: "Si",
        radioExtinguidor: "Si",
        radioLoderas: "Si",
        radioRespaldo: "Si",
        radioTarjeta: "Si",
        radioCasetera: "Si",
        radioCricos: "Si",
        radioLuces: "Si",
        radioAire: "Si",
        radioBateria: "Si"
    };

    const [checks, setChecks] = useState(defaultChecks);

    const history = useHistory();

    const handleChecksChange = (e) => {
        const { name, value } = e.target;
        setChecks({ ...checks, [name]: value })
        console.log(name, value);
    };

    //open checks window
    const handleBtnOrder = () => history.push('/revisiones');

    //save client
    const handleChecks =  async(e) => {
        e.preventDefault();
        console.log(checks);
        //await addDoc(collection(db, 'Revisiones'), checks);
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
                                        <h3 className="mb-0">Orden de trabajo Revisiones</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#orden"
                                            size="sm"
                                            onClick={handleChecks}
                                        >
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Llanta de Respuesto </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLlanta" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLlanta" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Mica </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioMica" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioMica" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Llave de ruedas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radiollave" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radiollave" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Herramientas varias </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioherramienta" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioherramienta" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Tri??ngulos </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTriangulo" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTriangulo" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Antena </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAntena" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAntena" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Espejo Interior </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioInterior" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioInterior" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Espejo Exterior </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExterior" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExterior" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Copas de ruedas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRuedas" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRuedas" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Adornos/Emblemas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAdornos" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAdornos" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Brazos de escobillas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBrazos" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBrazos" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Extinguidor </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExtinguidor" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExtinguidor" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Loderas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLoderas" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLoderas" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Respaldo de asiento </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRespaldo" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRespaldo" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Tarjeta de circulacion </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTarjeta" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTarjeta" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Radio Casetera </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCasetera" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCasetera" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Cricos </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCricos" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCricos" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Luces </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLuces" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLuces" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Aire Acondicionado </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAire" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAire" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Bater??a </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBateria" defaultChecked={true} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBateria" value="No" onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Revisiones;
