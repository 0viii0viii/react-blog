import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  USER_LOADING_REQUEST,
} from '../../redux/types';
import { Col, Row, Button } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Link } from 'react-router-dom';

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);
  console.log(req);

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  }, []);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params._id,
        token: localStorage.getItem('token'),
      },
    });
  };

  const EditButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>

        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit post
          </Link>
        </Col>

        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const HomeButton = (
    <>
      <Row className="d-flex- justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </>
  );

  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border_bottom border-top border-primary p-3 mb-3 justify-content-between">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <>
                <div className="font-weight-bold text-big">
                  <span className="mr-3">
                    <Button color="info">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end">{postDetail.creator.name}</div>
              </>
            );
          }
        })()}
      </Row>
    </>
  );
  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? 'sibakl' : Body}
    </div>
  );
};

export default PostDetail;
