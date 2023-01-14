import UserWord from './Model'
export default function getAllUserWords(req, res) {

  UserWord
    .find()
    .exec()
    .then(result => {
      res.status(202).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("User all words get all error")
    })
    .finally(() => {
      console.log("User all words get all END");
    })
}