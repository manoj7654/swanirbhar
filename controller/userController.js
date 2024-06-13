const User=require("../modal/userModal");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
    
      const existingUser = await User.findOne({ email });
      console.log(existingUser)
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

       await User.create({ name, email, password: hashedPassword, role });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Server error' });
  };

}
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      console.log(user.role)
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token=jwt.sign({userId:user.id,role:user.role},process.env.secret );
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports={register,login}