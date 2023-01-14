import UserWord from './Model'
export default function getUserWordsByUserId(req, res) {

  const userId = req.params.userId;

  UserWord
    .find({userId: userId})
    .exec()
    .then(result => {
      res.status(202).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("User words by userID get all error")
    })
    .finally(() => {
      console.log("User words get all END");
    })
}