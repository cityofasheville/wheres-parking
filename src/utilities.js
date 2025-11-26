async function fetchAllGarageData() {
  let all_garage_data = [];

  // addresses:
  // 45 Wall St, Asheville, NC 28801 (Wall)
  // 61 S Lexington Ave, Asheville, NC 28801 (Biltmore Ave)
  // 68 Rankin Ave, Asheville, NC 28801 (Harrah's)
  // 12 Rankin Ave, Asheville, NC 28801 (Rankin)
  // 52 Coxe Ave, Asheville, NC 28801
  // 164 College St, Asheville, NC 28801 (College Street)

  try {
    const [cityData, collegeJSON, coxeJSON] = await Promise.all([
      fetch('https://s3.amazonaws.com/avl-parking-decks/spaces.json').then((res) => res.json()),
      fetch('https://s3.amazonaws.com/bc-parking-decks/164College').then((res) => res.json()),
      fetch('https://s3.amazonaws.com/bc-parking-decks/40Coxe').then((res) => res.json()),
    ]);

    cityData.decks.forEach((garage) => {
      if (garage.name.includes('Wall')) {
        garage.address = '45 Wall St, Asheville, NC 28801';
      } else if (garage.name.includes('Biltmore')) {
        garage.address = '61 S Lexington Ave, Asheville, NC 28801';
      } else if (garage.name.includes('Harrah')) {
        garage.address = '68 Rankin Ave, Asheville, NC 28801';
      } else if (garage.name.includes('Rankin')) {
        garage.address = '12 Rankin Ave, Asheville, NC 28801';
      }

      all_garage_data.push({
        ...garage,
        // if a garage needs to be marked closed, do it like this:
        // available: garage.name === "Wall Street Garage" ? 'closed' : garage.available,
        slug: slugify(garage.name),
        jurisdiction: 'city',
      });
    });

    all_garage_data.push({
      name:
        collegeJSON.decks && collegeJSON.decks.length > 0 ? 'College Street' : '164 College Street',
      available:
        collegeJSON.decks && collegeJSON.decks.length > 0
          ? collegeJSON.decks[0].available
          : 'Unable to determine',
      coords:
        collegeJSON.decks && collegeJSON.decks.length > 0
          ? collegeJSON.decks[0].coords
          : [35.591976, -82.545413],
      slug: 'college-street',
      jurisdiction: 'county',
      address: '164 College St, Asheville, NC 28801',
    });

    all_garage_data.push({
      name: coxeJSON.decks && coxeJSON.decks.length > 0 ? coxeJSON.decks[0].name : '52 Coxe Avenue',
      available:
        coxeJSON.decks && coxeJSON.decks.length > 0
          ? coxeJSON.decks[0].available
          : 'Unable to determine',
      coords: coxeJSON.decks && coxeJSON.decks.length > 0 ? coxeJSON.decks[0].coords : [0, 0],
      slug: 'coxe-avenue',
      jurisdiction: 'county',
      address: '52 Coxe Ave, Asheville, NC 28801',
    });

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

export { fetchAllGarageData };
