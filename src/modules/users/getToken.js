import Token from './model-token';

export default function getToken(req, res) {
  Token
    .find()
    .exec()
    .then(result => {
      res.status(202).json(result);
    })
    .catch(err => {
      res.status(400).json("Tokens get all error")
    })
    .finally(() => {
      console.log("Tokens get all END");
    })
}