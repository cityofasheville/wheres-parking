import { Link } from 'wouter';
import city_logo_no_text from './city_logo_no_text.svg';

function Header() {
  return (
    <nav className="w-full max-w-screen-sm mx-auto min-h-20 px-4 py-6">
      <Link href="/">
        <div className="flex align-baseline gap-4">
          <img src={city_logo_no_text} className="w-20" alt="City of Asheville logo" />
          <div className="">
            <h1 className="text-4xl font-light text-wp-blue-dark mb-1">Where's Parking?</h1>
            <p className="text-lg font-light text-wp-blue-dark">
              Open spots in Asheville parking decks
            </p>
          </div>
        </div>
      </Link>
    </nav>
  );
}

export default Header;
