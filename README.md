বাজার দর (Bazar Dor)
Bazar Dor is a responsive web application that helps users explore everyday market products and compare prices. The interface is designed to make product and price information easy to browse in Bangla.
Features
- Responsive design: Works on mobile, tablet, and desktop screens.
- Product browsing: View available products and their market prices.
- Category browsing: Explore products by category.
- Product details: Open a product to see more information, including price details.
- Price comparison: Review current and previous price information when provided by the API.
- User authentication: Create an account and sign in with email and password.
- Social sign-in: Google and GitHub sign-in, when OAuth credentials are configured.
- Profile management: View account information and update your name.
- Bangla interface: User-facing text is presented in Bangla where appropriate.
Technologies Used
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- Lucide React
- Bazar Dor REST API
API
The application uses the Bazar Dor API:
https://api.api-store.workers.dev/api/bazardor
The API provides category and product data, including endpoints for listing categories, retrieving a category, listing products, filtering products by category, and retrieving an individual product.
Getting Started
Prerequisites
- Node.js (a current LTS version is recommended)
- npm
- A MongoDB database for authentication
- Google and/or GitHub OAuth credentials if you want social sign-in
1. Clone the repository
git clone https://github.com/tasmiachowdhury1/assignment-7
cd assignment-7
Replace the placeholders with your repository URL and project folder name.
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the project root, beside package.json. Add the variables your authentication configuration uses:
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
Replace each placeholder with your own value. Configure only the social providers you intend to use, and make sure the server configuration matches the variable names above.
Security: Never commit .env to Git or share your database connection string, OAuth client secrets, or authentication secret. Ensure .env is listed in .gitignore.
For local OAuth development, configure the callback URLs in the provider dashboards as required by Better Auth:
- Google: http://localhost:3000/api/auth/callback/google
- GitHub: http://localhost:3000/api/auth/callback/github
4. Start the development server
npm run dev
Open http://localhost:3000 in your browser.
5. Build for production
npm run build
npm run start
Project Structure
Your exact structure may differ, but the main parts of the application may include:
src/
└── app/
    ├── api/
    │   └── auth/
    │       └── [...all]/
    │           └── route.ts
    ├── lib/
    │   ├── api.ts
    │   ├── auth.ts
    │   └── auth-client.ts
    ├── sign-in/
    │   └── page.tsx
    ├── sign-up/
    │   └── page.tsx
    ├── profile/
    │   └── page.tsx
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
Available Scripts
The following scripts are typical for a Next.js project. Check package.json for the exact scripts available in your project.
- npm run dev — start the development server.
- npm run build — build the production application.
- npm run start — start the production server.
- npm run lint — run lint checks if a lint script is configured.
Deployment
Deploy the application to a platform that supports Next.js, such as Vercel.
Before deploying:
1. Add the required environment variables in the hosting platform's project settings.
2. Update BETTER_AUTH_URL to your production site URL.
3. Add the production OAuth callback URLs to the Google and GitHub provider settings.
4. Configure your MongoDB network access to allow the deployed server to connect securely.
5. Run npm run build and resolve any errors before deployment.
Author
Developed as a web development project.
Note: Features that depend on authentication or third-party OAuth credentials will work only after the corresponding services are configured.
