import bcrypt from 'bcrypt'

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error("Password cannot be empty")
  }

  const salt = await bcrypt.genSalt(saltRounds);
  if (!salt) {
    throw new Error("Failed to generate salt")
  }

  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

