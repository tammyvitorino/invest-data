$(document).ready(function () {
  async function tesouroSearch(bondName, key = "untrRedVal") {
    let srcURL =
      "http://localhost:3000/tesourodireto";
    fetch(srcURL)
      .then((response) => response.json())
      .then((jsondata) => {
        let parsedData = jsondata.response;

        for (let bond of parsedData.TrsrBdTradgList) {
          let currBondName = bond.TrsrBd.nm;
          if (currBondName.toLowerCase() === bondName.toLowerCase()) {
            if (bond.TrsrBd.hasOwnProperty(key)) {
              console.log(bond.TrsrBd[key]);
              return;
            } else {
              throw new Error("Chave não encontrada nos dados do título.");
            }
          }
        }
        throw new Error("Título não encontrado.");
      })
      .catch((error) => console.error(error));
  }

  async function tesouroData() {
    let srcURL = "http://localhost:3000/tesourodireto";
    try {
      let response = await fetch(srcURL);
      let jsondata = await response.json();
      return jsondata.response.TrsrBdTradgList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function displayBonds() {
    let bondsList = await tesouroData();
    let bondsDiv = document.getElementById("bondsList");

    bondsDiv.innerHTML = '';

    for (let bond of bondsList) {
      let p = document.createElement("p");
      p.textContent = bond.TrsrBd.nm;
      bondsDiv.appendChild(p);
    }
  }

  displayBonds();
});
