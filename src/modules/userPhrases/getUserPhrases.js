import UserPhrase from './Model'

export default function getUserPhrases(req, res) {
  UserPhrase
    .find()
    .exec()
    .then(result => {
      res.status(203).json(result);
    })
    .catch(err => {
      res.status(403).json("User`s phrases get all error")
    })
    .finally(() => {
      console.log("User`s phrases get all END");
    })
}