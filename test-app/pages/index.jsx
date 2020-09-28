import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Table, Collapse, Button } from 'reactstrap'
import { useEffect, useState } from 'react';
import { GiWireframeGlobe } from 'react-icons/gi';
import { BsPencil } from 'react-icons/bs';
import { RiSuitcaseLine, RiMoneyDollarBoxLine } from 'react-icons/ri';
import { BiMessageDetail, BiSupport } from 'react-icons/bi';
import { MdPeopleOutline } from 'react-icons/md';
import { GrDocumentPerformance } from 'react-icons/gr';

function Home({ data }) {
    const [collapsed, setCollapsed] = useState(true);
    const [peopleData, setpeopleData] = useState([]);
    const [allPeople, setallPeople] = useState({ page: 1, result: [] });
    const [CurrentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")
    const router = useRouter();
    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (data) {
            let infoPersons = data.data
            setpeopleData(infoPersons)
        }
    }, [data])

    const inputHandler = (e) => {
        let lowerCase = e.toLowerCase();
        setSearch(lowerCase)
    }

    const getSearch = (e) => {
        e.preventDefault();
        if (search.length > 0) {
            peopleData.forEach(person => {
                if (search === person.last_name.toLowerCase() || search === person.first_name.toLowerCase()) {
                    setpeopleData([person])
                }
            })
        } else {
            setpeopleData(data.data)
        }
    }
    const handleClose = () => {
        setSearch("")
        setpeopleData(data.data)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const nextHandler = () => {
        let next = CurrentPage + 1
        setCurrentPage(next)
    }

    useEffect(() => {
        router.push(`/?page=${CurrentPage}`)
    }, [CurrentPage])

    let pageNumber = []

    for (let i = 1; i <= data.total; i++) {
        pageNumber.push(i)
    }

    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </Head>
            <Container style={{
                maxWidth: "100%",
                minWidth: "100%"
            }}>
                <Row>
                    <Col xs="2" style={{ marginTop: "4%" }}>
                        <div className="sidenav">
                            <div className="profile-card">
                                <div className="parent">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Circle_frame.svg/600px-Circle_frame.svg.png" alt="circle" style={{ maxWidth: "120px" }} className="circle" />
                                    <span className="initial">UP</span>
                                </div>
                                <p>Username Profile</p>
                                <p>Username Email</p>
                            </div>
                            <Row>
                                <a href="#"><GiWireframeGlobe /></a>
                                <a href="#">OVERVIEW</a>
                            </Row>
                            <Row>
                                <a href="#"><RiSuitcaseLine /></a>
                                <a href="#">BUSINESS</a>
                            </Row>
                            <Row>
                                <a href="#"><BiMessageDetail /></a>
                                <a href="#">INBOX</a>
                            </Row>
                            <Row>
                                <a href="#"><MdPeopleOutline /></a>
                                <a href="#">COLLABORATORS</a>
                            </Row>
                            <Row>
                                <a href="#"><GrDocumentPerformance /></a>
                                <a href="#" onClick={toggleNavbar} style={{ color: "gray" }}>PERFOMANCE</a>
                            </Row>
                            <Collapse isOpen={!collapsed} >
                                <ul>
                                    <li>
                                        <a href="#">SUMMARY</a>
                                    </li>
                                    <li>
                                        <a href="#">CREDITS</a>
                                    </li>
                                    <li>
                                        <a href="#">INTERSTED USERS</a>
                                    </li>
                                </ul>
                            </Collapse>
                            <Row>
                                <a href="#"><RiMoneyDollarBoxLine /></a>
                                <a href="#">BILLING</a>
                            </Row>
                            <Row>
                                <a href="#"><BiSupport /></a>
                                <a href="#">SUPPORTS</a>
                            </Row>
                        </div>
                    </Col>
                    <Col xs="10" style={{ marginTop: "4%" }}>
                        <div>
                            <Row>
                                <i><BsPencil /></i>
                                <Col >
                                    <p className="lead" style={{ marginBottom: "0", }}>Perfomance</p>
                                    <h2 style={{ fontWeight: "400" }}>Intersted users</h2>
                                </Col>
                                <form className="applelike" onSubmit={(e) => getSearch(e)}>
                                    <span id="zoom">&#128269;</span>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={(e) => inputHandler(e.target.value)}
                                    />
                                    <span id="close" ><a href="#" onClick={handleClose}> &#10006;</a></span>
                                    <Button type="submit" style={{ display: "none" }}></Button>
                                </form>
                            </Row>
                        </div>
                        <h4 style={{ fontWeight: "bold" }}>INTRESTED USERS</h4>
                        <Table borderless>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                </tr>
                            </thead>

                            {
                                peopleData.map((person, index) => {
                                    return (
                                        <tbody key={index} >
                                            <tr className="spacer" ></tr>
                                            <tr className="table-data">
                                                <th scope="row">{person.id}</th>
                                                <td>{person.email}</td>
                                                <td>{person.first_name} {person.last_name}</td>
                                            </tr>
                                            <tr className="spacer" ></tr>
                                        </tbody>
                                    )
                                })
                            }

                        </Table>
                        <div className="w3-bar">
                            <a className="w3-button">&laquo;</a>
                            {pageNumber.map((number) => {
                                return <a onClick={() => paginate(number)} className="w3-button" key={number} style={{ backgroundColor: +CurrentPage === +number ? "#7DB7B4" : "Window" }}>
                                    {number}
                                </a>
                            })}
                            <a className="w3-button" onClick={nextHandler}>&raquo;</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const res = await fetch(`https://reqres.in/api/users?page=${context.query.page}`)
    const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
}

export default Home;