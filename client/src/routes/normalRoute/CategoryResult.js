import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CATEGORY_FIND_REQUEST } from '../../redux/types';
import PostCardOne from '../../components/post/PostCardOne';
import { Col, Row } from 'reactstrap';

const CategoryResult = () => {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);

  console.log(categoryFindResult);
  console.log(categoryName);

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  return (
    <div>
      <Col
        className="d-flex justify-content-center p-3"
        md={{ size: 6, offset: 3 }}
      >
        <Link to="/" className="btn btn-primary btn-block">
          Home
        </Link>
      </Col>

      <h1>Category: "{categoryName}"</h1>
      <Row>
        <PostCardOne posts={categoryFindResult.posts} />
      </Row>
    </div>
  );
};

export default CategoryResult;
