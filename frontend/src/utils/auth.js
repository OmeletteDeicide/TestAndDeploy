// Exemple de fonction verifyPassword
import bcrypt from 'bcrypt';

export async function verifyPassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false; // Retourne false en cas d'erreur
  }
}
