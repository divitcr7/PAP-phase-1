# Pick - A - Pad (PAP)

Rental applications built with React, TypeScript, and Vite.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Routes](#routes)
- [Form Schemas](#form-schemas)
- [UI Components](#ui-components)
- [Development Progress](#development-progress)
- [API Integration](#api-integration)
- [Contributing](#contributing)

## Overview

The Pick - A - Pad (PAP) is a comprehensive web application designed to streamline the property rental application process. It provides an intuitive interface with
 property listings.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd PAP-phase-1

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
PAP-phase-1/
├── public/                 # Static assets
│   └── images/             # Image assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Common components (Header, Footer, etc.)
│   │   ├── modals/         # Modal components
│   │   │   └── RentalApplyForm/ # Rental application form components
│   │   ├── property/       # Property-related components
│   │   └── ui/             # UI library components (shadcn/ui)
│   ├── constants/          # Application constants
│   ├── data/               # Mock data for development
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── schemas/            # Zod validation schemas
│   │   └── ApplyForm/      # Rental application form schemas
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main application component
├── .gitignore              # Git ignore file
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Project dependencies
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app configuration
├── tsconfig.node.json      # TypeScript node configuration
└── vite.config.ts          # Vite configuration
```

## Key Features

1. **Property Listings** - Browse available properties with detailed information
2. **Rental Application** - Multi-step application form with validation
3. **User Authentication** - Secure login and registration

## Routes

The application uses React Router for navigation:

- `/` - Home page with featured properties
- `/properties` - Property listings
- `/properties/:id` - Individual property details
- `/apply/:propertyId` - Rental application form
- `/login` - User login
- `/register` - User registration

## Form Schemas

The application uses Zod for form validation. Key schemas include:

- **Authentication**
  - `loginSchema` - Login form validation
  - `signupSchema` - Registration form validation

- **Rental Application**
  - `applyFormSchema` - Main application schema
  - `applicantSchema` - Applicant information
  - `occupantSchema` - Occupant information
  - Step-specific schemas:
    - `stepOne` - Personal information
    - `stepTwo` - Employment and background
    - `stepThree` - References and vehicles
    - `stepFour` - Special provisions
    - `stepFive` - Disclosures
    - `stepSix` - Signature

## UI Components

The project uses a combination of custom components and [shadcn/ui](https://ui.shadcn.com/) for the user interface:

- **Layout Components**
  - Header with navigation
  - Footer
  - Mobile navigation

- **Form Components**
  - Input fields
  - Checkboxes
  - Select dropdowns
  - Multi-step form navigation

- **Property Components**
  - Property cards
  - Property details
  - Image galleries

## Development Progress

### Completed ✅

- Project setup with Vite, React, TypeScript
- UI component library integration (shadcn/ui)
- Form validation schemas with Zod
- Multi-step rental application form
- Property listing and detail pages
- User authentication UI

### In Progress 🔄

- Dashboard implementation
- Form submission handling
- State management refinement
- Unit testing
- Responsive design

### Todo 📝

- API integration (see [API Integration](#api-integration))
- Admin dashboard
- User profile management
- Notification system
- Payment integration
- Deployment pipeline

## API Integration

API integration is pending. The following endpoints will be implemented:

- **Authentication**
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/logout`

- **Properties**
  - `GET /api/properties`
  - `GET /api/properties/:id`
  - `POST /api/properties` (admin)
  - `PUT /api/properties/:id` (admin)

- **Applications**
  - `POST /api/applications`
  - `GET /api/applications/:id`
  - `GET /api/applications/user/:userId`
  - `PUT /api/applications/:id/status`

- **Users**
  - `GET /api/users/profile`
  - `PUT /api/users/profile`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request