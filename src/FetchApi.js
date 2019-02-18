const api = "https://api.foursquare.com/v2/venues/";
const clientId = "OP2DMM25VI5LYWWYPTBK1IZUEICXH3KLIH1DGY4BWM0LHDYQ";
const clientSecret = "Z4FBTHDAAMZ21ZFS5QDE2NUWT52WOIPBWMKJ3TBHBYMU54QY";

export const getUniversityDetailById = universityId =>
  fetch(
    `${api}${universityId}?&v=20190218&client_id=${clientId}&client_secret=${clientSecret}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.meta.code === 200) {
        let newData = { status: "success", content: data.response.venue };
        return newData;
      } else {
        return {
          status: "error",
          content: data.meta.code
        };
      }
    })
    .catch(e => {
      return e;
    });
