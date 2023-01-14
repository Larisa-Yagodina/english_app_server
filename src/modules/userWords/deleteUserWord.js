import UserWord from './Model';

export default function deleteUserWord(req, res) {

  const userWordId = req.params.userWordId;

  UserWord.deleteOne({_id: userWordId})
    .exec()
    .then(result => {
      res.status(202).json( 'User`s word was deleted' );
    })
    .catch(err => {
      console.log(err);
      res.status(402).send('User`s word was not deleted')
    })

}