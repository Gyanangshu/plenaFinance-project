import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import { store } from './store';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './util/wagmiConfig';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

function App() {

  return (
    <Provider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Dashboard />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider >
  )
}

export default App
