import {timeout} from './LoadingContainer';

const api = "https://api.foursquare.com/v2/venues/";
const clientId = "OP2DMM25VI5LYWWYPTBK1IZUEICXH3KLIH1DGY4BWM0LHDYQ";
const clientSecret = "Z4FBTHDAAMZ21ZFS5QDE2NUWT52WOIPBWMKJ3TBHBYMU54QY";

export const getUniversityDetailById = universityId =>
  _fetch(fetch(
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
      }),timeout);

function _fetch(fetch_promise, timeout) {
    var abort_fn = null;

    //这是一个可以被reject的promise
    var abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
            reject('abort promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function() {
        abort_fn();
    }, timeout);

    return abortable_promise;
}
