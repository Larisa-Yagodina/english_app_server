import UserPhrase from './Model'

export default function postUserPhrase(req, res) {

  const newUserPhrase = new UserPhrase({
    english:  req.body.english,
    russian: req.body.russian,
    note:   req.body.note,
    isStudied: req.body.isStudied,
    userId: req.body.userId,
  })

  newUserPhrase
    .save()
    .then(responce => {
      res.status(203).json(`User's phrase ${req.body.name} is created`);
    })
    .catch(err => {
      res.status(403).json(`User's phrase was not created`);
    })
}