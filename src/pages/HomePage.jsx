import {Container, Row, Col} from "react-bootstrap"
import HeroImage from "../assets/img/hero.png"

const HomePage = () => {
  return (
  <div className="homepage">
    <header className="w-100 min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="header-box d-flex align-items-center"> 
          <Col lg="6">
            <h1 className="mb-4">Temukan <br/> <span>Ide Kopi</span> <br/>di Cikopi!
            </h1>
            <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro vitae ipsam in consequuntur soluta enim doloremque minus inventore. Minus qui expedita quae quia modi ea ut delectus nesciunt veniam similique.
            </p>
            <button className="btn btn-danger btn-lg rounded me-2 mb-xs-0 mb-2">Cek Resep</button>
            <button className="btn btn-outline-danger btn-lg rounded mb-xs-0 mb-2">Racik</button>
          </Col>
          <Col lg="6" className="pt-lg-0 pt-5">
          <img src={HeroImage} alt="hero-img"/>
          </Col>
        </Row>
      </Container>
    </header>
    {/* <div className="kelas w-100 min-vh-100">
    <Container>
      <Row>
        <Col>
          <h1 className="text-center fw-bold">Resep kopi</h1>
          <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          
        </Col>
      </Row>
    </Container>
    </div> */}
  </div>
  );
};

export default HomePage;