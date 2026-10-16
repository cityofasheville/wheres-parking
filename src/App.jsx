import { Route, Switch } from 'wouter';
import ReactGA from 'react-ga4';
import { useEffect, useState } from 'react';
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

const isEmbedded = window.parent !== window;

function App() {
  const [parentOrigin, setParentOrigin] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.source === window.parent &&
        event.origin !== 'null' &&
        event.data?.type === 'HANDSHAKE'
      ) {
        setParentOrigin(event.origin);
      }
    };

    window.addEventListener('message', handleMessage);

    // Parent origin is unknown yet, so '*' is used; the message carries no data.
    if (isEmbedded) {
      window.parent.postMessage({ type: 'REACT_APP_READY' }, '*');
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!parentOrigin) {
      return;
    }

    let lastHeight = null;

    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;

      if (height === lastHeight) {
        return;
      }

      lastHeight = height;
      window.parent.postMessage({ type: 'REACT_APP_RESIZE', height }, parentOrigin);
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [parentOrigin]);

  return (
    <div className={`${isEmbedded ? '' : 'min-h-screen'} flex flex-col bg-white`}>
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
