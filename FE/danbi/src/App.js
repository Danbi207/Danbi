import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./router";
import store from "./store";
import {dark,light} from "./style/theme.js";
import { ThemeProvider } from '@tanstack/react-query-devtools/build/lib/theme';
import { CookiesProvider } from 'react-cookie';
const queryClient = new QueryClient();
function App() {
  const theme = themeMode === 'light' ? light : dark;
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <div className="App">
              <BrowserRouter>
                <Routes>
                  {routes.map((e) => {
                    return (
                      <Route
                        key={e.path}
                        path={e.path}
                        element={<e.compoonent />}
                      />
                    );
                  })}
                </Routes>
              </BrowserRouter>
            </div>
          </ThemeProvider>
        </CookiesProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
