import UserPhrase from './Model'
export default function updateUserPhrase(req, res) {

  const userPhraseId = req.params.userPhraseId;

  UserPhrase.findByIdAndUpdate(userPhraseId, req.body)
    .exec()
    .then(result => {
      res.status(202).json('User`s phrase was updated')
    })
    .catch(err => {
      res.status(402).send('User`s phrase was not updated')
    })
}