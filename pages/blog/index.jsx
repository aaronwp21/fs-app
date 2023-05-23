import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@/components/mui";
import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import { AllPosts } from "@/lib/hygraph/queries";

export default function Blog({ ssd = [] }) {
  console.log("ssd", ssd);
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Blog List</Heading>
        <List component={"ol"} sx={{ listStyle: "none" }}>
          {ssd.map(({ id, title, slug, heroImage: { url } }) => (
            <ListItem key={id}>
              <Card component={"article"} sx={{ width: "100%" }}>
                <CardMedia sx={{ display: "grid", placeContent: "center" }}>
                  <Image alt={title} src={url} width="200" height="200" />
                </CardMedia>
                <CardContent>
                  <Heading component="h2">{title}</Heading>
                </CardContent>
                <CardActions>
                  <Link href={`/blog/${slug}`}>Read more...</Link>
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": `application/json; charset="UTF-8`,
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: AllPosts,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  console.log(allPosts);
  const posts = allPosts.data.blogPosts;
  console.log(posts);
  return {
    props: {
      ssd: posts,
    },
  };
};