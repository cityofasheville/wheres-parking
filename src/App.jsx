import { Route, Switch } from 'wouter';
import ReactGA from 'react-ga4';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import GaragePage from './GaragePage';
import './tw/tw-output.css';

if (window.location.href.indexOf('wheresparking.ashevillenc.gov') > -1) {
  ReactGA.initialize('G-E39GD4ZFLV');
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: 'Wheres Parking',
  });
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative w-full  bg-wp-blue-light border-b border-wp-blue-dark/20 mb-6">
        <Header />
      </header>

      <main id="main-content" className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/:garage" component={GaragePage} />
          <Route>Path not found</Route>
        </Switch>
      </main>

      <div className="bg-wp-blue-light border-t border-wp-blue-dark/20">
        <Footer />
      </div>
    </div>
  );
}

export default App;
