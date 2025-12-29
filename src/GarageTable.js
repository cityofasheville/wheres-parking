import GarageCard from './GarageCard';

function GarageTable({ garages }) {
  return (
    <div>
      <table>
        <caption className="sr-only text-left mb-2">
          <i className="bi bi-info-circle mr-1" aria-hidden="true"></i>Click on a parking deck below
          for additional information.
        </caption>
        <thead className="">
          <tr className="text-lg sm:text-xl bg-wp-blue-light text-wp-blue-dark">
            <th className="p-3 font-normal text-left">Garage name</th>
            <th className="p-3 w-24 font-normal text-center">Open spaces</th>
          </tr>
        </thead>
        <tbody>
          {garages.map((deck) => (
            <GarageCard
              key={deck.name}
              name={deck.name}
              slug={deck.slug}
              available={deck.available}
              coords={deck.coords}
              jurisdiction={deck.jurisdiction}
              address={deck.address}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default GarageTable;
