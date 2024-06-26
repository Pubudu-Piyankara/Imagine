# Imagine
## Introduction
This is an Image Processing Web App built with Next.js, Clerk, Cloudinary, Tailwind CSS, Stripe, and MongoDB. The app provides various image processing functionalities including image quality restoration, generative fill, object removal, color change, and background removal.

## Features
- Image Quality Restoration
- Generative Fill
- Object Removal
- Color Change
- Background Removal

## Technologies Used
- Next.js: A React framework for building server-side rendered (SSR) web applications.
- Clerk: A user authentication and identity management system.
- Cloudinary: A cloud-based image and video management solution.
- Tailwind CSS: A utility-first CSS framework for designing responsive and customizable UI components.
- Stripe: A payment processing platform for online transactions.
- MongoDB: A NoSQL database for storing application data.

## Installation
1. Clone the repository:
- git clone https://github.com/Pubudu-Piyankara/Imagine.git


2. Navigate to the project directory:
- cd imagine

3. Install dependencies:
- npm install


4. Create a `.env` file and fill in the required environment variables.

# clerk 
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=?
- CLERK_SECRET_KEY=?
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=?
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=?
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=?
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=?
- # clerk web hook secure key
- CLERK_WEBHOOK_SECRET_KEY=?

# mongodb
- MONGODB_URL=?
             
# cloudinary
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=?
- CLOUDINARY_API_KEY=?
- CLOUDINARY_API_SECRET=?

# stripe
- NEXT_PUBLIC_STRIPE_PUBLIC_KEY=?
- STRIPE_SECRET_KEY=?
- STRIPE_WEBHOOK_SECRET=?

## Usage
1. Start the development server:
- npm run dev

2. Open your browser and visit `http://localhost:3000` to access the web app.

## Configuration
- **Clerk**: Configure Clerk by setting up authentication methods, user roles, and permissions according to your requirements.
- **Cloudinary**: Set up your Cloudinary account and configure environment variables for Cloudinary API access.
- **Stripe**: Configure Stripe API keys and webhook endpoints for handling payments.

## Deployed Application
The application is deployed and accessible at [https://imagine-ten-wheat.vercel.app](https://imagine-ten-wheat.vercel.app).


## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- Next.js
- Clerk
- Cloudinary
- Tailwind CSS
- Stripe
- MongoDB

## Screenshots
![Finished App](https://github.com/Pubudu-Piyankara/Imagine/blob/main/public/assets/screenshots/1.jpeg)
![Finished App](https://github.com/Pubudu-Piyankara/Imagine/blob/main/public/assets/screenshots/2.jpeg)
![Finished App](https://github.com/Pubudu-Piyankara/Imagine/blob/main/public/assets/screenshots/3.jpeg)
![Finished App](https://github.com/Pubudu-Piyankara/Imagine/blob/main/public/assets/screenshots/4.jpeg)
![Finished App](https://github.com/Pubudu-Piyankara/Imagine/blob/main/public/assets/screenshots/final.jpeg)

-----