export default function cors (app){
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header({
      'Access-Control-Allow-Credentials': true,
      // 'origin': process.env.CLIENT_URL,
      'Access-Control-Allow-Origin': process.env.CLIENT_URL || 'https://english-up.netlify.app/',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept, Z-Key',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    });
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === "OPTIONS"){
      res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
      return res.status(200).json({})
    }
    next();
  });
}

// 'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'