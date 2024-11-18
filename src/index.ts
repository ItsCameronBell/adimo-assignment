import axios from 'axios';
import { JSDOM } from 'jsdom';

axios
  .get<string>('https://cdn.adimo.co/clients/Adimo/test/index.html')
  .then((response) => {
    // HTML is inside response.data
    const dom: JSDOM = new JSDOM(response.data);
    console.log(dom);
    console.log('Hello, World!');
  })
  .catch((error: unknown) => {
    console.log(error);
  });