🚀 Dashboard App
A React dashboard built with Vite and TypeScript, featuring state management and dynamic widgets.

✨ Features
🧠 Dashboard Context for efficient state management

🖥️ Main Dashboard displaying categorized widgets

📂 Category Sections to organize widgets logically

📊 Widget Cards showcasing charts and content

➕ Add Widget Modal to create new widgets dynamically

🛠️ Installation & Setup

# Create a new React project with Vite and TypeScript template
npm create vite@latest dashboard-app -- --template react-ts

# Navigate into the project directory
cd dashboard-app

# Install necessary dependencies
npm install recharts lucide-react @radix-ui/react-dialog @radix-ui/react-checkbox class-variance-authority tailwind-merge clsx tailwindcss-animate

# Initialize shadcn UI
npx shadcn-ui@latest init

# Add components from shadcn UI
npx shadcn-ui@latest add button card input dialog checkbox

# Start the development server
npm run dev
🚀 Usage
Run the development server and open the app in your browser. Use the dashboard to view widgets organized by category and add new widgets via the modal.
#
📄 License
MIT License © 2025 Rishi Ranjan Kumar
