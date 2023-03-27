import Token from './model-token';

export default function deleteTokens(req, res) {
  Token
    .deleteMany()
    .exec()
    .then(result => {
      res.status(202).json(result);
    })
    .catch(err => {
      res.status(400).json("Tokens delete all error")
    })
    .finally(() => {
      console.log("Tokens delete all END");
    })
}