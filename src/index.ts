import axios from 'axios';
import { JSDOM } from 'jsdom';

import * as fs from 'fs';

import { Product } from './types';

const imagePath = 'https://cdn.adimo.co/clients/Adimo/test/';

axios
  .get<string>('https://cdn.adimo.co/clients/Adimo/test/index.html')
  .then((response) => {
    if (response.status != 200) {
      throw new Error('Unsuccessful website response');
    }
    const dom: JSDOM = new JSDOM(response.data);
    const items: HTMLCollection =
      dom.window.document.getElementsByClassName('item');

    const json = [];

    let averagePrice = 0;

    const products: Product[] = [];
    for (const item of items) {
      const product: Product = {};
      const heading = item.querySelector('h1');
      if (heading) {
        const title: string = heading.innerHTML;
        product.title = title;
      }
      const img = item.querySelector('img');
      if (img) {
        const imgURL: string = img.src;
        product.imgURL = imagePath.concat(imgURL);
      }
      const priceWithCurrency = item.querySelector('.price');
      if (priceWithCurrency) {
        const price: number = +priceWithCurrency.innerHTML.replace('£', '');
        product.price = price;
        averagePrice += price;
      }
      products.push(product);
    }

    json.push({
      noOfProducts: items.length,
      averagePrice: averagePrice / items.length,
    });
    json.push(products);

    fs.writeFile(
      './data/results.json',
      JSON.stringify(json),
      'utf8',
      (error: unknown) => {
        if (error) {
          console.error('Error writing to file', error);
        } else {
          console.log('Results written to file');
        }
      }
    );
  })
  .catch((error: unknown) => {
    console.log(error);
  });
