import { Route, Switch } from 'wouter';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import GaragePage from './GaragePage';
import './tw/tw-output.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative w-full  bg-wp-blue-light border-b border-wp-blue-dark/20 mb-6">
        <Header />
      </header>

      <main id="main-content" className="flex-grow">
        <div className="mb-12 max-w-screen-sm mx-auto px-3">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/:garage" component={GaragePage} />
            <Route>Path not found</Route>
          </Switch>
        </div>
      </main>

      <div className="bg-wp-blue-light border-t border-wp-blue-dark/20">
        <Footer />
      </div>
    </div>
  );
}

export default App;
