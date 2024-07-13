const users=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.UserRegister=async(req,res)=>{
const {FName,LName,email,Gender,Add,DOB,Ph,Pass}=req.body
// console.log(FName+LName+email+Gender+Add+DOB+Ph+Pass);
// console.log(image);
// console.log("Came in Backend")
// console.log(FName)
const image = req.file;
// console.log(image)
    if(!FName||!LName||!email||!Gender||!Add||!DOB||!Ph||!Pass)
        {
            res.status(400).json({error:"Please Enter All Input Data"})
        }
    else{
        try{
            const PreUser=await users.findOne({email:email})
            if(PreUser)
                {
                    res.status(400).json({error:"This User Already exits in Our DataBase"})
                }
            else{
                    const HashedPassword=await bcrypt.hash(Pass,10)
                    const NewUser=new users({
                        FirstName:FName,
                        LastName:LName,
                        email:email,
                        Gender:Gender,
                        Address:Add,
                        DOB:DOB,
                        Phone:Ph,
                        Password:HashedPassword,
                        photo:image?image.path:null
                    })
                    const StoreData=await NewUser.save()
                    res.status(200).json(StoreData)
                }
        }
        catch(err){
            res.status(400).json({err:"Invalid Details",err})
        }
}
}


exports.userlogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const validUser=await users.findOne({email:email})
        if(!validUser)
            {
                return res.status(400).json({error:"Invalid Email"})
            }
            else{
            const validPassword=await bcrypt.compare(password,validUser.Password)
           
            if(!validPassword)
                {
                   return res.status(400).json({error:"Invalid Password"})
                }
            else{
                // Generate a token
            const token = jwt.sign({ name: validUser.FirstName,photo:validUser.photo,email:validUser.email}, 'fghjklihkuyjthgg798', { expiresIn: '1h' });
            return res.status(200).json({message:'Success',token})
            }
            }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}


exports.editProfile = async (req, res) => {
    console.log("Edit Backend Called")
    const {FName,LName,email,Gender,Add,DOB,Ph,Pass} = req.body;
    const image = req.file;
    // console.log(image)
    try {
        // Find the user by email
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  else{
        // Update the user's details
        if (FName) user.FirstName = FName;
        if (LName) user.LastName = LName;
        if (Gender) user.Gender = Gender;
        if (Add) user.Address = Add;
        if (DOB) user.DOB = DOB;
        if (Ph) user.Phone = Ph;
        if (Pass) user.Password = await bcrypt.hash(Pass, 10);
        if (image) user.photo = image.path;
  
        // Save the updated user to the database
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    }
} catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  exports.deleteAccount=async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'fghjklihkuyjthgg798'); // Verify and decode JWT token
      const userEmail = decoded.email; // Extract email from decoded token
  
      // Find user by email and delete account
      const deletedUser = await users.findOneAndDelete({ email: userEmail });
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Account deleted successfully', user: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };