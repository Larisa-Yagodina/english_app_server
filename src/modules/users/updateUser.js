import Order from './Model'
export default function updateUser(req, res) {

  const userId = req.params.userId;

  Order.findByIdAndUpdate(userId, req.body)
    .exec()
    .then(result => {
      res.status(202).json('Order was updated')
    })
    .catch(err => {
      res.status(402).send('Order was  not updated')
    })
}