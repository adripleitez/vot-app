import { React, useState } from 'react';
import {
    Button,
    Modal,
    Card,
    CardBody,
    FormGroup,
    Input,
    Row,
    Col,
} from "reactstrap";

const ModalComponentChecks = (props) => {

    // const defaultChecks = {
    //     radioLlanta: "Si",
    //     radioMica: "Si",
    //     radiollave: "Si",
    //     radioherramienta: "Si",
    //     radioTriangulo: "Si",
    //     radioAntena: "Si",
    //     radioInterior: "Si",
    //     radioExterior: "Si",
    //     radioRuedas: "Si",
    //     radioAdornos: "Si",
    //     radioBrazos: "Si",
    //     radioExtinguidor: "Si",
    //     radioLoderas: "Si",
    //     radioRespaldo: "Si",
    //     radioTarjeta: "Si",
    //     radioCasetera: "Si",
    //     radioCricos: "Si",
    //     radioLuces: "Si",
    //     radioAire: "Si",
    //     radioBateria: "Si",
    //     OT_id: ""
    // };

    // const [checks, setChecks] = useState(defaultChecks);
    const checks = props.checks;
    const setChecks = props.setChecks;

    const handleChecksChange = (e) => {
        const { name, value } = e.target;
        setChecks({ ...checks, [name]: value })
        console.log(name, value);
    };

    //save client
    const handleChecks =  async(e) => {
        e.preventDefault();
        console.log(checks);
        props.close(false);
    };

    // const handleClose = (e) => {
    //     e.preventDefault();
    //     props.close(false);
    // }

    return (
        <>
            <Modal size="lg" className="modal-dialog-centered"
                isOpen={props.open}>
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={handleChecks}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body mt--4">
                    <Row className="ml--2 mr--2">
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardBody>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Llanta de Respuesto </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLlanta" defaultChecked={checks.radioLlanta === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLlanta" value="No" defaultChecked={checks.radioLlanta === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Mica </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioMica" defaultChecked={checks.radioMica === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioMica" value="No" defaultChecked={checks.radioMica === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Llave de ruedas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radiollave" defaultChecked={checks.radiollave === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radiollave" value="No" defaultChecked={checks.radiollave === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Herramientas varias </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioherramienta" defaultChecked={checks.radioherramienta === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioherramienta" value="No" defaultChecked={checks.radioherramienta === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Triángulos </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTriangulo" defaultChecked={checks.radioTriangulo === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTriangulo" value="No" defaultChecked={checks.radioTriangulo === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Antena </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAntena" defaultChecked={checks.radioAntena === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAntena" value="No" defaultChecked={checks.radioAntena === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Espejo Interior </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioInterior" defaultChecked={checks.radioInterior === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioInterior" value="No" defaultChecked={checks.radioInterior === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Espejo Exterior </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExterior" defaultChecked={checks.radioExterior === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExterior" value="No" defaultChecked={checks.radioExterior === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Copas de ruedas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRuedas" defaultChecked={checks.radioRuedas === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRuedas" value="No" defaultChecked={checks.radioRuedas === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Adornos/Emblemas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAdornos" defaultChecked={checks.radioAdornos === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAdornos" value="No" defaultChecked={checks.radioAdornos === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Brazos de escobillas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBrazos" defaultChecked={checks.radioBrazos === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBrazos" value="No" defaultChecked={checks.radioBrazos === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Extinguidor </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExtinguidor" defaultChecked={checks.radioExtinguidor === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioExtinguidor" value="No" defaultChecked={checks.radioExtinguidor === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Loderas </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLoderas" defaultChecked={checks.radioLoderas === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLoderas" value="No" defaultChecked={checks.radioLoderas === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Respaldo de asiento </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRespaldo" defaultChecked={checks.radioRespaldo === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioRespaldo" value="No" defaultChecked={checks.radioRespaldo === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Tarjeta de circulacion </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTarjeta" defaultChecked={checks.radioTarjeta === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioTarjeta" value="No" defaultChecked={checks.radioTarjeta === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Radio Casetera </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCasetera" defaultChecked={checks.radioCasetera === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCasetera" value="No" defaultChecked={checks.radioCasetera === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Cricos </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCricos" defaultChecked={checks.radioCricos === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioCricos" value="No" defaultChecked={checks.radioCricos === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Luces </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLuces" defaultChecked={checks.radioLuces === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioLuces" value="No" defaultChecked={checks.radioLuces === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Aire Acondicionado </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAire" defaultChecked={checks.radioAire === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioAire" value="No" defaultChecked={checks.radioAire === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                                <Row className="justify-content-left">
                                    <Col lg="4"><label className="form-control-label"> Batería </label></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBateria" defaultChecked={checks.radioBateria === "Si"} value="Si" onChange={handleChecksChange}/>{' '} Si </FormGroup></Col>
                                    <Col lg="4"><FormGroup check><Input type="radio" name="radioBateria" value="No" defaultChecked={checks.radioBateria === "No"} onChange={handleChecksChange}/>{' '} No </FormGroup></Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    {/* <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={handleClose}
                    >
                        Cerrar
                    </Button> */}
                    <Button color="primary" type="button" onClick={handleChecks}>
                        Guardar
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalComponentChecks;