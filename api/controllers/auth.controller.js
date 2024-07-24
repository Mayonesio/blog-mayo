
import User from '../models/user.model.js';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
      ) {
       return res.status(400).json({message : 'Rellena todos los campos'});
      }

      const newUser = new User({
        username,
        email,
        password,
      });

      await newUser.save();
      res.json({message : 'Registro completado'});
}  