import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_LOADING_REQUEST } from '../../redux/types';
import { Helmet } from 'react-helmet';
import { Alert, Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/spinner/Spinner';
import PostCardOne from '../../components/post/PostCardOne';
import Category from '../../components/post/Category';

const PostCardList = () => {
  // posts =>  initailstate에서 post의 값 ,post => index에서 reducer를 post로 명명함
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  ///////////////////// infinite scroll div감지 callback
  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = postCount - 6;

  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (loading) return;
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let remainPostCount = postCountRef.current - skipNumberRef.current;
        if (remainPostCount >= 0) {
          dispatch({
            type: POST_LOADING_REQUEST,
            payload: skipNumberRef.current + 6,
          });
          skipNumberRef.current += 6;
        } else {
          endMsg.current = true;
        }
      }
    });
    if (observer.current) observer.current.disconnect();

    if (node) {
      console.log(node);
      observer.current.observe(node);
    }
  });
  /////////////////////
  return (
    <>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>{posts ? <PostCardOne posts={posts} /> : <GrowingSpinner />}</Row>
      <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
      {loading ? (
        ''
      ) : endMsg ? (
        <div>
          <Alert color="danger" className="text-center font-weight-bolder">
            더 이상 게시물이 존재하지 않습니다.
          </Alert>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default PostCardList;
