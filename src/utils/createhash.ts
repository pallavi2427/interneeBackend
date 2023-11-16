import * as bcrypt from "bcrypt";

// create user password hash
const createHash = async (password: any) => {
  try {
    // generate password hash
    const saltRounds = Math.floor(Math.random() * 10) + 5;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt); // Generate the hash
    return hash;
  } catch (err) {
    console.error(err);
  }
};

export default createHash;
