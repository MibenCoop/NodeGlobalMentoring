import jwt from 'jsonwebtoken';


export function checkToken(req, res, next) {
    let token = req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
           if (err) {
               console.error(err);
               next();
           } else {
               next();
           }
        });
    }
}

