import express from 'express';
const router = express.Router();

import Post from '../../models/post';

router.get('/:searchTerm', async (req, res, next) => {
  try {
    const result = await Post.find({
      title: {
        $regex: req.params.searchTerm,
        $options: 'i', // insensitive 대문자 소문자 구별 x
      },
    });
    console.log(result, 'Search result');
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
