
const NFTs = document.querySelectorAll(".flip-card-back");

async function get_NFT_data() {
  const options = {
    method: "GET",
    headers: { "x-cg-demo-api-key": "CG-NhdhrCZRnCSqdjMyf3XUu9k4" },
  };

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_usd_asc&per_page=250', options);
    const data = await response.json();
  
   for(let i=0;i<NFTs.length;i++) {
        NFTs[i].firstElementChild.innerHTML=`${data[i].name}`;
        NFTs[i].firstElementChild.nextElementSibling.innerHTML=`Asset Platform ID: ${data[i].asset_platform_id}`;
        NFTs[i].lastElementChild.innerHTML=`Symbol: ${data[i].symbol}`;
    }

  } catch (error) {
    console.log(error);
  }
}

get_NFT_data();