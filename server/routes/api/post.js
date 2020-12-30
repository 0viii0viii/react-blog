import express from 'express';
import auth from '../../middleware/auth';

// Model
import Post from '../../models/post';

const router = express.Router()

// api/post
router.get('/', async(req, res)=> {
    const postFindResult = await Post.find()
    console.log(postFindResult, 'Got all the post')
    res.json(postFindResult)

})

router.post('/', auth, async(req, res, next) =>  {
    try{
        console.log(req, "req")
        const { title, contents, fileUrl, creator } = req.body
        const newPost = await Post.create({ 
            title, 
            contents, 
            fileUrl, 
            creator
        });
        res.json(newPost);
    }catch(e){
        console.log(e)
    }
});

export default router;
