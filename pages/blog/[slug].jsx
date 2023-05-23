import Head from 'next/head';
import Image from 'next/image';
import Markdown from 'marked-react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@/components/mui';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import { AllPosts, SinglePost } from '@/lib/hygraph/queries';

export default function BlogPost({ ssd = {} }) {
  const {
    title,
    body,
    heroImage: { url },
  } = ssd;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Single Post</Heading>
        <Card component={'article'} sx={{ width: '100%' }}>
          <CardMedia sx={{ display: 'grid', placeContent: 'center' }}>
            <Image alt={title} src={url} width="200" height="200" />
          </CardMedia>
          <CardContent>
            <Heading component="h2">{title}</Heading>
            <Markdown>{body}</Markdown>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
}

export const getStaticPaths = async () => {
  const allPosts = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: AllPosts,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data.blogPosts);
      return res.data.blogPosts;
    })
    .catch((err) => console.log(err));
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { blogPost: post } = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: SinglePost,
      variables: { slug: params.slug },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { props: { ssd: post } };
}
