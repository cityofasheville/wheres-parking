import bc_logo_brand from './bc_logo_brand.png';
import city_logo_no_text from './city_logo_no_text.svg';

function GarageCard(props) {
  const link_href_local = `/${props.slug}`;

  return (
    <tr className="font-light text-lg sm:text-2xl">
      {props.available === undefined || props.coords === undefined ? (
        <td colSpan={2}>Loading...</td>
      ) : (
        <>
          <td className="p-0">
            <a
              className="h-full items-center flex gap-3 py-4 px-2 w-full decoration-none border-l-4 border-transparent hover:border-wp-blue-dark focus:border-wp-blue-dark focus-within:border-wp-blue-dark hover:text-slate-900 focus:text-slate-900 focus-within:text-slate-900 hover:bg-wp-blue-light focus:bg-wp-blue-light focus-within:bg-wp-blue-light"
              href={link_href_local}
              rel="noopener noreferrer"
            >
              <div className="min-w-8">
                <img
                  src={props.jurisdiction === 'city' ? city_logo_no_text : bc_logo_brand}
                  alt=""
                  className="w-8 h-8"
                />
                <span className="sr-only">
                  {props.jurisdiction === 'city'
                    ? 'Managed by City of Asheville'
                    : 'Managed by Buncombe County'}
                </span>
              </div>
              <span className="">
                {props.name}
                <span className="hidden"> garage</span>
                <br />
                <address className="text-sm font-light text-slate-600 not-italic">
                  {props.address}
                </address>
              </span>
            </a>
          </td>
          <td className="p-0" style={{ textAlign: 'center' }}>
            <div className="font-medium" style={{ padding: '1rem' }}>
              {props.available}
              <span className="hidden">open spaces</span>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

export default GarageCard;
