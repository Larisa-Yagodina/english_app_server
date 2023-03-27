import User from './Model'

export default function getUser(req, res) {
  User
    .find()
    .exec()
    .then(result => {
      res.status(202).json(result);
    })
    .catch(err => {
      res.status(400).json("Orders get all error")
    })
    .finally(() => {
      console.log("Orders get all END");
    })
}