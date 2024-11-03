// utils/api.ts

import { Expense } from "../interfaces/Expense";
import { Money } from "../interfaces/Money";

const API_URL = 'https://9antu983ph.execute-api.us-east-2.amazonaws.com/dev'; // Cambia esto si cambias de URL

// Funciones para manejar las solicitudes a la API

// Funciones para Expenses
export const getExpenses = async (user:string): Promise<Expense[]> => {
  const response = await fetch(`${API_URL}/expenses?user=${user}`);
  if (!response.ok) throw new Error('Error fetching expenses');
  return await response.json();
};

export const createExpense = async (expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!response.ok) throw new Error('Error creating expense');
  return await response.json();
};

export const updateExpense = async (id: number, expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!response.ok) throw new Error('Error updating expense');
  return await response.json();
};

export const deleteExpense = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting expense');
};

// Funciones para Money
export const getMoneyEntries = async (user:string): Promise<Money[]> => {
  const response = await fetch(`${API_URL}/money?user=${user}`);
  if (!response.ok) throw new Error('Error fetching money entries');
  return await response.json();
};

export const createMoneyEntry = async (money: Omit<Money, 'id' | 'created_at'>): Promise<Money> => {
  const response = await fetch(`${API_URL}/money`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(money),
  });
  if (!response.ok) throw new Error('Error creating money entry');
  return await response.json();
};

export const updateMoneyEntry = async (id: number, money: Omit<Money, 'id' | 'created_at'>): Promise<Money> => {
  const response = await fetch(`${API_URL}/money/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(money),
  });
  if (!response.ok) throw new Error('Error updating money entry');
  return await response.json();
};

export const deleteMoneyEntry = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/money/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting money entry');
};
