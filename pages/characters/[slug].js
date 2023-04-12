import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function Character() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error, isLoading } = useSWR(
    `https://swapi.dev/api/people/${slug}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);
  console.log(slug);
  // const id = 1;
  {
    return (
      <Layout>
        <Card
          id={slug}
          name={data.name}
          height={data.height}
          eyeColor={data.eye_color}
          birthYear={data.birth_year}
        />
      </Layout>
    );
  }
}
