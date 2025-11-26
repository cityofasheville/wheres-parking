import ReactGA from 'react-ga';
import GarageContainer from './GarageContainer';

function Home() {
  if (window.location.href.indexOf('cityofasheville.github.io') > -1) {
    ReactGA.initialize('UA-137810331-1');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  return (
    <div className="">
      <p className="mb-6">
        <i className="bi bi-info-circle mr-1"></i>Click on a parking deck below for directions and
        more information.
      </p>
      <GarageContainer />
    </div>
  );
}

export default Home;
