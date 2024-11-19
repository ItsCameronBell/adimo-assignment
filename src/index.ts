import axios from 'axios';
import { JSDOM } from 'jsdom';

const imagePath = 'https://cdn.adimo.co/clients/Adimo/test/';

axios
  .get<string>('https://cdn.adimo.co/clients/Adimo/test/index.html')
  .then((response) => {
    if (response.status != 200) {
      throw new Error('Unsuccessful website response');
    }
    const dom: JSDOM = new JSDOM(response.data);
    const products: HTMLCollection =
      dom.window.document.getElementsByClassName('item');

    for (const product of products) {
      const heading = product.querySelector('h1');
      if (heading) {
        const title: string = heading.innerHTML;
        console.log(title);
      }
      const img = product.querySelector('img');
      if (img) {
        const imgURL: string = img.src;
        console.log(imagePath.concat(imgURL));
      }
      const priceWithCurrency = product.querySelector('.price');
      if (priceWithCurrency) {
        const price: number = +priceWithCurrency.innerHTML.replace('£', '');
        console.log(price);
      }
    }
  })
  .catch((error: unknown) => {
    console.log(error);
  });
