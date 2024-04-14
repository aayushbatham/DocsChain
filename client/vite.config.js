<<<<<<< HEAD
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();
>>>>>>> 603d547fa4f40fec8dce2ab9baefb1d9fa0f7330

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
});
=======
  define: {
      'process.env.clientId' : JSON.stringify(process.env.clientId)
  }
})
>>>>>>> 603d547fa4f40fec8dce2ab9baefb1d9fa0f7330
