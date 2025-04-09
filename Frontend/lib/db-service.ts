// lib/db-service.ts
import { query } from './db';

export interface User {
  id?: number;
  name: string;
  email: string;
  role?: string;
  created_at?: Date;
}

export async function getUsers(): Promise<User[]> {
  try {
    const users = await query(
      'SELECT id, name, email, role, created_at FROM users'
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
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
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
    const result = await query(
      'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.role || 'user']
    ) as { insertId: number };
    
    const newUser = await getUserById(result.insertId);
    return newUser as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}