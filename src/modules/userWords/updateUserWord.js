import UserWord from './Model'
export default function updateUserWord(req, res) {

  const userWordId = req.params.userWordId;

  UserWord.findByIdAndUpdate(userWordId, req.body)
    .exec()
    .then(result => {
      res.status(202).json('User`s word was updated')
    })
    .catch(err => {
      console.log(err);
      res.status(402).send('User`s word was not updated')
    })
}