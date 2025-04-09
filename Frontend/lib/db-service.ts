import { query } from './db';
import { hashPassword } from './passwordutils'; // Assuming hashPassword is imported from another file

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Add password to the interface for internal handling
  role?: string;
  created_at?: Date;
}

export async function getUsers(): Promise<User[]> {
  try {
    const users = await query(
      'SELECT id, first_name, last_name, email, role, created_at FROM users'
    );
    return users as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const users = (await query(
      'SELECT id, first_name, last_name, email, role, created_at FROM users WHERE id = ?',
      [id]
    )) as User[];
    return users.length ? (users[0] as User) : null;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
}

export async function createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
  try {
    // Hash the password before inserting it into the database
    if (!userData.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await hashPassword(userData.password);

    const result = await query(
      'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [userData.firstName, userData.lastName, userData.email, hashedPassword, userData.role || 'user']
    ) as { insertId: number };

    // Fetch the newly inserted user
    const newUser = await getUserById(result.insertId);
    return newUser as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
