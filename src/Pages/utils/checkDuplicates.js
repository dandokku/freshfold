export const checkDuplicates = (items) => {
    const priceNames = {};
    const duplicates = [];
  
    for (const item of items) {
      const label = item.selectedOption?.label;
      if (!label) continue;
      if (priceNames[label]) {
        if (!duplicates.includes(label)) {
          duplicates.push(label);
        }
      } else {
        priceNames[label] = true;
      }
    }
  
    return duplicates;
  };
  