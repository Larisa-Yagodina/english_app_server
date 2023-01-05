import UserPhrase from './Model';

export default function deleteUserPhrase(req, res) {

  const userPhraseId = req.params.userPhraseId;

  UserPhrase.deleteOne({_id: userPhraseId})
    .exec()
    .then(result => {
      res.status(203).json( 'User`s phrase was deleted successfully' );
    })
    .catch(err => {
      res.status(403).send('User`s phrase was not deleted')
    })

}