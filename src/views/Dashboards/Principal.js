import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Table,
    Button,
    Input,
    FormGroup,
    CardTitle,
    Form
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";


import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, query, onSnapshot } from "firebase/firestore";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2"
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";

const Tables = () => {
    const [otData, setotData] = useState([]);
    const [search, setSearch] = useState("");
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    const getOrder = () => {
        onSnapshot(query(collection(db, "Orden_trabajo")), (querySnapshot) => {
            const workorders = [];
            querySnapshot.forEach((doc) => {
                workorders.push({ ...doc.data(), id: doc.id });
            });
            console.log(workorders);
            setotData(workorders);
        });
    }


    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    useEffect(() => {
        getOrder();
    }, []);


    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1 mb-3" xl="2">
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Ordenes
                                            </CardTitle>
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Activas
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                350,897
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                <i className="fas fa-check" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Servicios
                                            </CardTitle>
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Realizados
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                350,897
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                                <i className="fas fa-wrench" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Productos
                                            </CardTitle>
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Vendidos
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                350,897
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                <i className="fas fa-chart-bar" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Ingresos
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                350,897
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                                <i className="fas fa-dollar-sign" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>

                    <Col className="order-xl-1" xl="10">
                        <Row className="h-100">
                            <Col>
                                <Row className="mb-2">
                                    <Col lg="6" className="mr-n3 ml-2">
                                        <Card className="bg-default shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            Overview
                                                        </h6>
                                                        <h2 className="text-white mb-0">Sales value</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample1[chartExample1Data]}
                                                        options={chartExample1.options}
                                                        getDatasetAtEvent={(e) => console.log(e)}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="6">
                                        <Card className="shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            Overview
                                                        </h6>
                                                        <h2 className="text-white mb-0">Sales value</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample1[chartExample1Data]}
                                                        options={chartExample1.options}
                                                        getDatasetAtEvent={(e) => console.log(e)}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col lg="6" className="mr-n3 ml-2">
                                        <Card className="bg-default shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            Overview
                                                        </h6>
                                                        <h2 className="text-white mb-0">Sales value</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample1[chartExample1Data]}
                                                        options={chartExample1.options}
                                                        getDatasetAtEvent={(e) => console.log(e)}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="6">
                                        <Card className="bg-gradient-default shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            Overview
                                                        </h6>
                                                        <h2 className="text-white mb-0">Sales value</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample1[chartExample1Data]}
                                                        options={chartExample1.options}
                                                        getDatasetAtEvent={(e) => console.log(e)}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default Tables;