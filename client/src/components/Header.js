import React from 'react';
import { Col, Row } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Arsenal Community</h1>
          <p>아스날 커뮤니티</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
