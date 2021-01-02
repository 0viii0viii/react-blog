import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_LOADING_REQUEST } from '../../redux/types';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/spinner/Spinner';
import PostCardOne from '../../components/post/PostCardOne';

const PostCardList = () => {
  // posts =>  initailstate에서 post의 값 ,post => index에서 reducer를 post로 명명함
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Helmet title="Home" />
      <Row>{posts ? <PostCardOne posts={posts} /> : <GrowingSpinner />}</Row>
    </>
  );
};

export default PostCardList;
