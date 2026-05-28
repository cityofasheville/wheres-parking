async function fetchConsolidatedGarageData() {
  let all_garage_data = [];
  try {
    const garage_data = await fetch('https://s3.amazonaws.com/avl-parking-decks/all-spaces.json');
    const garage_data_json = await garage_data.json();
    const decks = Array.isArray(garage_data_json.decks) ? garage_data_json.decks : [];
    all_garage_data = decks.map((deck) => {
      if (deck && typeof deck.available === 'number' && deck.available < 0) {
        return { ...deck, available: '-' };
      }

      return deck;
    });

    console.log('Garage data fetched successfully', all_garage_data);
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

export { fetchConsolidatedGarageData };
