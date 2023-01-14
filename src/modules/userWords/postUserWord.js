import UserWord from './Model'

export default function postUserWord(req, res) {

  const newUserWord = new UserWord({
    word: req.body.word,
    partOfSpeech: req.body.partOfSpeech,
    definition: req.body.definition,
    russianEquivalent: req.body.russianEquivalent,
    isStudied: req.body.isStudied,
    userId: req.body.userId,
  })
  newUserWord
    .save()
    .then(responce => {
      res.status(202).json(`Word «${req.body.word}» is created`);
    })
    .catch(err => {
      console.log(err);
      res.status(402).json(`Word was not created`);
    })
    .finally(() => {
      console.log("END");
    })
}