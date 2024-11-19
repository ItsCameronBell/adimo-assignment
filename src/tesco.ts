// import axios from 'axios';
// import { JSDOM } from 'jsdom';

// const headers = {
//   'User-Agent':
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
//   timeout: 10000,
// };

// const query = 'nestle';
// const count = 25;
// let page = 1;

// let flag = true;

// while (flag) {
//   axios
//     .get<string>(
//       `https://www.tesco.com/groceries/en-GB/search?query=${query}${page == 0 ? '' : `&page=${page}`}&count=${count}`,
//       { headers }
//     )
//     .then((response) => {
//       console.log(response.status);
//       if (response.status == 429) {
//         throw new Error('Rate limited');
//       }

//       if (response.status != 200) {
//         throw new Error('Unsuccessful website response');
//       }

//       const dom: JSDOM = new JSDOM(response.data);
//       const items: HTMLCollection =
//         dom.window.document.getElementsByClassName('LD7hL');

//       if (items.length == 0) {
//         flag = false;
//         return;
//       }

//       console.log(items.length);

//       for (const item of items) {
//         console.log(item);
//       }

//       page++;
//     })
//     .catch((error: unknown) => {
//       console.log(error);
//     });
// }
