const express = require('express');
const router = express.Router();
//const actions = require('../actions/db');
// var stream = require('../common/fileHandler')
const { fork } = require('child_process');

router.use('/', function(req, res, next) {
    if (req.url === '/')
        {
             let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    // if (context.url) {
    //   return res.redirect(302, context.url);
    // }

    if (context.is404) {
      status = 404;
    }
  }

    res.status(status).render('index', { markup });
        }
        else{
            if(req.url==='/incidents')
                {
                  //this.sendData(req, res);
                    res.setHeader('Content-Type', 'text/plain');
                    //res.write(actions.numberOfUSersInDB().toString());
                    res.write('Yo data is about to come!');
                    res.end();
                }
        }
  next();
});

/* GET home page. */
// sendData(req, res)
// {
//   res.setHeader('Content-Type', 'text/plain');
//   //res.write(actions.numberOfUSersInDB().toString());
//   res.write('Yo data is about to come!');
//   res.end();
//   //next();
// };

// universal routing and rendering
// sendUI(req, res) 
// {
//   let markup = '';
//   let status = 200;

//   if (process.env.UNIVERSAL) {
//     const context = {};
//     markup = renderToString(
//       <Router location={req.url} context={context}>
//         <App />
//       </Router>,
//     );

//     // context.url will contain the URL to redirect to if a <Redirect> was used
//     if (context.url) {
//       return res.redirect(302, context.url);
//     }

//     if (context.is404) {
//       status = 404;
//     }
//   }

//    return res.status(status).render('index', { markup });
//   //next();
// };


router.get('/file', (req, res)=>{

   const child = fork( [__dirname + '/fileHandler.js'],
    { stdio:'inherit'});

    child.send('start');

    res.writeHead(200, {'content-type':'text/plain'});

    child.on('message', (data)=>
    {
        return res.end(data);
    })

  //  child.stdin.write('Start');

  //  child.stdout.on('data', (data)=>{
  //    console.log(`Got d data ${data}`);
  //    res.end(data);
  //  })

  //  child.stderr.on('error', (msg)=> {
  //    console.log(err);
  //   res.write(`Error occurred = ${msg}`);
  // } )

    child.on('exit', (code)=>{
      res.end(`EOF reached`);
    })

})

module.exports = router