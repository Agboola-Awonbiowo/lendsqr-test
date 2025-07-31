# Lendsqr Frontend Engineering Test

A React TypeScript application built for the Lendsqr Frontend Engineering assessment. This application replicates the Lendsqr Admin Console with pixel-perfect design fidelity and comprehensive functionality.

## 🚀 Features

### Pages Implemented

1. **Login Page** - Authentic login interface with illustration
2. **Dashboard** - Overview with statistics cards
3. **Users Page** - Complete user management with 500 mock records
4. **User Details Page** - Comprehensive user information with tabs

### Key Features

- **Pixel-perfect design** matching Figma specifications
- **Mobile responsive** design across all pages
- **Mock API** with 500 user records
- **Local storage** integration for user details persistence
- **Authentication system** with protected routes
- **Advanced filtering** and pagination
- **Status management** (Activate/Blacklist users)
- **TypeScript** throughout the application
- **SCSS** for advanced styling

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **React Router DOM** for navigation
- **SCSS** for styling
- **Local Storage** for data persistence
- **Responsive Design** with mobile-first approach

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lendsqr-fe-test
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔐 Authentication

**Login Credentials (Assessment Mode):**

For testing purposes, you can login with:

- **Any valid email format** (e.g., `test@example.com`, `user@gmail.com`)
- **Any password with 8 or more characters**

**Examples:**

- Email: `tester@example.com` | Password: `password123`
- Email: `admin@lendsqr.com` | Password: `adminpass`
- Email: `user@gmail.com` | Password: `mypassword`

**Validation Messages:**

- ❌ **Invalid Email**: "Please enter a valid email address"
- ❌ **Short Password**: "Password must be at least 8 characters long"
- ✅ **Success**: Redirects to dashboard

_Note: This is a mock authentication system for assessment purposes. In production, this would be replaced with real backend authentication._

## 📱 Pages Overview

### Login Page

- Two-column layout with illustration
- Form validation
- Password visibility toggle
- Responsive design

### Dashboard

- Statistics cards showing user metrics
- Navigation to other sections
- Real-time data from mock API

### Users Page

- Table with 500 user records
- Advanced filtering system
- Pagination (10, 25, 50, 100 items per page)
- Status badges (Active, Inactive, Pending, Blacklisted)
- User actions (View Details, Blacklist, Activate)

### User Details Page

- Comprehensive user information
- Tabbed interface (General Details, Documents, Bank Details, etc.)
- Local storage integration
- Status management
- Responsive layout

## 🎨 Design System

### Colors

- Primary: `#39cdcc`
- Secondary: `#213f7d`
- Success: `#39cd62`
- Warning: `#e9b200`
- Danger: `#e4033b`

### Typography

- Font Family: Inter, system fonts
- Consistent spacing and sizing
- Responsive text scaling

### Components

- Reusable button components
- Status badges
- Form inputs
- Cards and containers

## 📊 Data Management

### Mock API

- 500 user records generated dynamically
- Realistic data with various organizations
- Status distribution across users
- Local storage persistence

### User Data Structure

```typescript
interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  // ... additional fields
}
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🧪 Testing

The application includes:

- TypeScript for type safety
- Error boundaries
- Loading states
- Form validation
- Responsive testing

## 🚀 Deployment

The application can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Heroku

## 📝 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx
│   └── Sidebar.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.tsx
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── UserDetails.tsx
├── services/           # API services
│   └── api.ts
├── styles/             # SCSS stylesheets
│   ├── index.scss
│   ├── App.scss
│   ├── Login.scss
│   ├── Dashboard.scss
│   ├── Users.scss
│   ├── UserDetails.scss
│   ├── Header.scss
│   └── Sidebar.scss
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main App component
└── index.tsx           # Entry point
```

## 🎯 Assessment Requirements Met

✅ **Visual Fidelity** - Pixel-perfect implementation matching Figma design
✅ **Code Quality** - Well-structured TypeScript React application
✅ **Best Practices** - Modern React patterns and architecture
✅ **Mobile Responsive** - Fully responsive across all devices
✅ **Mock API** - 500 user records with realistic data
✅ **Local Storage** - User details persistence
✅ **Authentication** - Protected routes and login system
✅ **SCSS** - Advanced styling with variables and mixins
✅ **TypeScript** - Full type safety throughout

## 🔄 State Management

- React Context for authentication
- Local state for component-specific data
- Local Storage for persistence
- Mock API for data fetching

## 🎨 UI/UX Features

- Smooth transitions and hover effects
- Loading states and error handling
- Intuitive navigation
- Consistent design language
- Accessibility considerations

## 📈 Performance

- Lazy loading of components
- Optimized re-renders
- Efficient data filtering
- Minimal bundle size

## 🔒 Security

- Protected routes
- Input validation
- XSS prevention
- Secure authentication flow

## 📞 Support

For any questions or issues, please refer to the assessment requirements or contact the development team.

---

**Built with ❤️ for Lendsqr Frontend Engineering Assessment**
