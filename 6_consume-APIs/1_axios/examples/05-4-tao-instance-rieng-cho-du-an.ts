// api/client.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // .env: VITE_API_URL=https://api.example.com
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})
