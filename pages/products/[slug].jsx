import { inspect } from 'node:util';
import Head from 'next/head';
import { slugify } from '@/lib/utils/formatters';
import {
  fetchProducts,
  fetchProduct,
} from '@/lib/api-functions/server/products/queries';
import Layout from '@/components/Layout';
import Product from '@/components/Product';

export default function SingleProduct({ ssd = {} }) {
  return (
    <>
      <Head>
        <title>{ssd.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Product product={ssd} headingLevel={1} />
      </Layout>
    </>
  );
}

export const getStaticPaths = async () => {
  const products = await fetchProducts().catch((err) => console.log(err));
  console.log('products', products);
  const paths = products.map((product) => ({
    params: {
      slug: slugify(product.title, product._id),
    },
  }));
  console.log(
    'paths',
    inspect(paths, { showHidden: true, depth: null, colors: true }),
  );
  return { paths, fallback: 'blocking' };
};

export async function getStaticProps({ params: { slug } }) {
  console.log('slug', slug);
  const id = slug.split('-').at(-1);
  const product = await fetchProduct(id).catch((err) => console.log(err));
  console.log('product', product);
  return { props: { ssd: JSON.parse(JSON.stringify(product)) } };
}
