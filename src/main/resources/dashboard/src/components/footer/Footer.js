import React, {Component} from "react";
import {Col, Container, Navbar} from "react-bootstrap";

const style = {
  float: "right",
};
class Footer extends Component {
  render() {
    let fullYear = new Date().getFullYear();
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Col lg={12} className="tect-center text-muted">
              <div style={style}>
                {fullYear} - All Rights Reserved by AutoCVF
              </div>
            </Col>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
