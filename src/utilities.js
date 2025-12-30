async function fetchAllGarageData() {
  let all_garage_data = [];

  try {
    const [cityData, collegeJSON, coxeJSON] = await Promise.all([
      fetch('https://s3.amazonaws.com/avl-parking-decks/spaces.json').then((res) => res.json()),
      fetch('https://s3.amazonaws.com/bc-parking-decks/164College').then((res) => res.json()),
      fetch('https://s3.amazonaws.com/bc-parking-decks/40Coxe').then((res) => res.json()),
    ]);

    cityData.decks.forEach((garage) => {
      if (garage.name.includes('Wall')) {
        garage.address = '45 Wall St, Asheville, NC 28801';
        garage.coords = [35.59463097210988, -82.55698255217752];
      } else if (garage.name.includes('Biltmore')) {
        garage.name = 'Biltmore Avenue Garage';
        garage.address = '61 S Lexington Ave, Asheville, NC 28801';
        garage.coords = [35.592505193480854, -82.55159180267485];
      } else if (garage.name.includes('Harrah')) {
        garage.address = '68 Rankin Ave, Asheville, NC 28801';
        garage.coords = [35.59670054502899, -82.55416494084967];
      } else if (garage.name.includes('Rankin')) {
        garage.name = 'Rankin Avenue Garage';
        garage.address = '12 Rankin Ave, Asheville, NC 28801';
        garage.coords = [35.59574383564083, -82.5538445980123];
        // EXAMPLE: to indicate a garage as closed, do it like this:
        // garage.available = 'closed';
      }

      all_garage_data.push({
        ...garage,
        slug: slugify(garage.name.replace('Garage', '').replace('Deck', '')),
        jurisdiction: 'city',
      });
    });

    const college_spaces = collegeJSON?.decks?.[0]?.available ?? 'NA';
    const coxe_spaces = coxeJSON?.decks?.[0]?.available ?? 'NA';

    all_garage_data.push({
      name: 'College Street',
      available: college_spaces,
      coords: [35.597220568749506, -82.54918944554281],
      slug: 'college-street',
      jurisdiction: 'county',
      address: '164 College St, Asheville, NC 28801',
    });

    all_garage_data.push({
      name: 'Coxe/Sears Alley',
      available: coxe_spaces,
      coords: [35.59364815599471, -82.55473928784323],
      slug: 'coxe-avenue',
      jurisdiction: 'county',
      address: '11 Sears Alley, Asheville, NC 28801',
    });

    return sortGarages(all_garage_data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchConsolidatedGarageData() {
  let all_garage_data = [];
  try {
    const garage_data = await fetch('https://s3.amazonaws.com/avl-parking-decks/all-spaces.json');
    const garage_data_json = await garage_data.json();
    all_garage_data = garage_data_json.decks;
    return sortGarages(all_garage_data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function sortGarages(garage_data) {
  garage_data.sort(function (a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });
  return garage_data;
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return str;
}

export { fetchAllGarageData, fetchConsolidatedGarageData };
