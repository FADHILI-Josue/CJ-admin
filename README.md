# Credit Jambo - Admin/Management Application

A comprehensive management interface for Credit Jambo Ltd administrators to oversee customer accounts, device verifications, and system operations.

## Features

- 🔐 **Admin Authentication**: Secure login for management personnel
- 👥 **Customer Management**: View all customer accounts and balances
- 📱 **Device Verification**: Approve or reject customer device access requests
- 📊 **Transaction Monitoring**: Real-time view of all customer transactions
- 🎛️ **System Administration**: Full control over user accounts and device management
- 📈 **Analytics Dashboard**: Key metrics and system statistics

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Prerequisites

- Node.js 18+
- pnpm package manager
- Backend API running (see backend README)
- Admin credentials

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FADHILI-Josue/CJ-admin.git admin-app
   cd admin-app/frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:5002/api
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3001`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components (Dashboard, Customers, etc.)
│   ├── services/      # API services
│   ├── store/         # Zustand stores
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── dist/              # Build output
```

## Key Features Implementation

### Admin Authentication
- Secure login with role-based access control
- JWT token management
- Automatic logout on session expiry

### Device Management
- **Pending Devices**: View all unverified device requests
- **Approval Process**: One-click approval/rejection of devices
- **Device History**: Track all device verification activities

### Customer Oversight
- **Customer List**: Comprehensive view of all registered customers
- **Account Details**: Balance and transaction history access
- **User Management**: Account status and information management

### System Monitoring
- **Transaction Logs**: Real-time transaction monitoring
- **System Metrics**: Key performance indicators
- **Audit Trail**: Complete activity logging

## API Integration

The admin frontend communicates with the admin backend API at `/api`:

- `POST /api/auth/login` - Admin authentication
- `GET /api/devices/pending` - Get pending device verifications
- `POST /api/devices/:id/verify` - Approve device
- `POST /api/devices/:id/reject` - Reject device
- `GET /api/users` - Get all customers

## Development Guidelines

### Security First
- Implement proper authentication checks
- Validate all user inputs
- Use HTTPS in production
- Implement proper error handling

### Code Quality
- TypeScript for type safety
- Clean, maintainable code structure
- Comprehensive error handling
- Proper state management

### UI/UX Standards
- Consistent design language
- Intuitive navigation
- Responsive design
- Accessibility compliance

## Deployment

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Serve the dist folder**
   ```bash
   pnpm preview
   ```

For production deployment, serve the `dist` folder with any static file server.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Admin backend API base URL | `http://localhost:5002/api` |

## Admin Setup

### Creating Admin Users
Admin users must be created directly in the database with `role: 'ADMIN'`.

### Device Verification Process
1. Customer registers and device is marked as 'PENDING'
2. Admin reviews device request in the management interface
3. Admin approves or rejects the device
4. Customer can login only with verified devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style and architecture
2. Implement comprehensive testing
3. Update documentation for any new features
4. Ensure security best practices are maintained

## Security Considerations

- Admin interface should only be accessible over HTTPS
- Implement proper session management
- Regular security audits recommended
- Monitor for suspicious activities

## License

This project is part of Credit Jambo Ltd's internal systems.

## Support

For technical support, contact the development team at Credit Jambo Ltd.

---

**Credit Jambo Ltd**  
NM 233 St, Nyamagumba  
Musanze – Rwanda  
+250 788 268 451  
hello@creditjambo.com  
www.creditjambo.com