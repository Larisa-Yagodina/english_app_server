

function apiNotFound(req, res) {
  res.status(400).json({
    res: 'API not found',
    recommend: 'Try /userWords or  /statuses'
  });
}

export default function errorHandler(app) {
  app.use(apiNotFound);

}