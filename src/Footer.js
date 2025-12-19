import city_logo from './city_logo.svg';
import bc_logo from './bc_logo.png';

function Footer() {
  return (
    <footer className="">
      <div className="flex flex-col justify-center items-center gap-4 py-6">
        <img src={city_logo} alt="City of Asheville logo" className="w-60" />
        <div>
          <div className="italic text-lg">in cooperation with</div>
        </div>
        <img src={bc_logo} alt="Buncombe County logo" className="w-60" />
      </div>
      <div className="w-full text-center pb-4 text-sm">
        It's open source! Fork it on{' '}
        <a href="https://github.com/cityofasheville/wheres-parking" className="text-link">
          GitHub<i className="bi bi-github ml-1" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
