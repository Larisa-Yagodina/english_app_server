import Order from './Model';

export default function deleteUser(req, res) {

  const userId = req.params.userId;

  Order.deleteOne({_id: userId})
    .exec()
    .then(result => {
      res.status(202).json('User was deleted');
    })
    .catch(err => {
      res.status(402).send('User was not deleted')
    })

}