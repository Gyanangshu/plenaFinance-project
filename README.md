# Token Portfolio Tracker  

A responsive web application for tracking cryptocurrency portfolios with real-time wallet integration and portfolio analytics.  

🌐 **Live Demo**  
[View Live Application](https://tokenportfolio.netlify.app)  

---

## 📋 Table of Contents  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Performance Optimizations](#-performance-optimizations)  
- [Technology Choices](#-technology-choices)   

---

## ✨ Features  
- 🔗 **Wallet Integration** - Connect multiple wallets using WalletConnect and RainbowKit  
- 📊 **Portfolio Analytics** - Visual charts and portfolio breakdowns  
- 📱 **Responsive Design** - Optimized for desktop and mobile devices  
- 🔍 **Token Search** - Real-time search functionality for cryptocurrencies  
- 🔄 **Live Data Updates** - Real-time price updates and portfolio tracking  
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations  

---

## 🛠 Tech Stack  
- **Frontend:** React 18  
- **Styling:** Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Wallet Integration:** wagmi + RainbowKit  
- **Charts:** Chart.js  
- **Icons:** React Icons  
- **Build Tool:** Vite  

---

## ⚡ Performance Optimizations  

### Code Splitting  
- Implemented lazy and suspense for route components   
- Reduced initial bundle size for faster load times  

### useMemo Implementation  
- Memoized chart colors  

### Additional Optimizations (future scope)  
- Debounce for search list with 1000+ entries

---

## 🎯 Technology Choices  

### Why React (JavaScript) Instead of TypeScript?  
I chose to develop this project using plain React with JavaScript rather than TypeScript for the following reasons:  

- **Learning Curve:** As someone fairly new to TypeScript with only one code-along project under my belt, using it would have significantly slowed down development  
- **Development Speed:** Focusing on core functionality and features rather than type definitions allowed for faster iteration  
- **Project Scope:** For this portfolio project, the benefits of TypeScript didn't outweigh the additional development time  
- **Future Consideration:** TypeScript integration is planned for future versions as my expertise grows  

This decision allowed me to focus on implementing clean architecture, proper state management, and excellent user experience without the overhead of learning TypeScript simultaneously.  