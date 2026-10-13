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
https://openapi.programming-hero.com/api/bazardor
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
    │
    ├── category/
    │   └── [slug]/
    │       └── page.tsx
    │
    ├── components/
    │   ├── AllProducts.tsx
    │   ├── AuthMenu.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── Navbar.tsx
    │   ├── PriceDecreased.tsx
    │   ├── PriceIncrease.tsx
    │   ├── PriceTricker.tsx
    │   └── ProductsByCategory.tsx
    │
    ├── lib/
    │   ├── api.ts
    │   ├── auth-client.ts
    │   └── auth.ts
    │
    ├── products/
    │   └── [id]/
    │       └── page.tsx
    │
    ├── profile/
    │   └── page.tsx
    │
    ├── sign-in/
    │   └── page.tsx
    │
    ├── sign-up/
    │   └── page.tsx
    │
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
