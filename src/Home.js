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
      <GarageContainer />
    </div>
  );
}

export default Home;
