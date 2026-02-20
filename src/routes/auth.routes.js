import express from 'express';

const router = express.Router();

router.post('/sign-up', (req, res) => {
    res.send('Sign-up response');
});
router.post('/sign-in', (req, res) => {
    res.send('Sign-in response');
});
router.post('/sign-out', (req, res) => {
    res.send('Sign-out response');
});

export default router;