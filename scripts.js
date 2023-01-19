

$(document).ready(function() {
  function TESOURODIRETO(bondName, key = "untrRedVal") {
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
  
  TESOURODIRETO("Tesouro Renda+ Aposentadoria Extra 2060", "untrInvstmtVal");
});
