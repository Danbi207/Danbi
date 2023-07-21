import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./router";
import store from "./store"
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
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
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
