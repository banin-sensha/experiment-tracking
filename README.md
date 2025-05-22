
# ML Insights Hub – Frontend

This is the frontend application for the **ML Insights Hub**, a machine learning experiment tracking platform. The frontend is built using [React.js](https://reactjs.org/) and communicates with a FastAPI backend to manage users, projects, experiments, metrics, and model files.

---

## 🚀 Features

- JWT-based user authentication (login/register)
- Project and experiment dashboard with metric tracking
- Real-time charts for accuracy, precision, recall, and loss using Recharts
- Secure file upload for trained models
- User profile and API key management
- Resource usage tracking and visual summary
- Modular component-based architecture with Redux state management

---

## 📦 Tech Stack

- **React.js** (UI library)
- **Redux** (state management)
- **Axios** (HTTP client)
- **Recharts** (data visualization)
- **React Router** (client-side routing)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/banin-sensha/experiment-tracking.git
cd experiment-tracking/frontend
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the `frontend/` folder:

```env
REACT_APP_API_URL=http://localhost:8000
```

Adjust the URL to match your backend host and port.

### 4. Run the Development Server

```bash
npm start
```

The application will start on [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── actions/             # Redux actions (e.g., login, register, experiments)
├── reducers/            # Redux reducers
├── components/          # Shared UI components
├── constants/           # Action types and API endpoints
├── MetricChart/         # Charts for metrics visualization
├── Dashboard/, Profile/, Projects/, Experiments/  # Page views
├── Login/, Signup/      # Authentication screens
├── utils/               # Helper functions (e.g., token decoding)
├── style/               # CSS and theming
├── App.js               # Main app layout and route manager
├── index.js             # Entry point
├── store.js             # Redux store config
```

---

## 🔐 Authentication

Authentication is based on JWT tokens:
- Tokens are stored in `localStorage`
- Axios interceptors attach tokens to each protected request
- Route access is gated by authentication state

---

## 🧪 Testing

Manual testing was conducted using:

- Chrome DevTools (Network tab)
- Axios logs
- Redux DevTools for debugging store actions

---

## 🙌 Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.
