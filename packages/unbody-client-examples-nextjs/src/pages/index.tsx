import { Unbody, NearTextArgsClass, WhereArgs} from "@unbody-io/ts-client";

export default function Home(props: any) {
  console.log(props)
  return (
    <>
      <main>
        hi
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const {UNBODY_API_KEY,UNBODY_LPE_PROJECT_ID} = process.env
  const client = new Unbody(
    UNBODY_API_KEY,
    UNBODY_LPE_PROJECT_ID
  )

  const res = await client.get.gdoc
    .where(
      WhereArgs.OR([
        WhereArgs.EQUAL(["title"], "Bitcoin"),
        WhereArgs.LIKE(["title"], "Ethereum"),
      ])
    )
    .nearText(
      NearTextArgsClass.concepts("cryptocurrency"),
    )
    .select('title')
    .exec();

  return {
    props: res
  }
}
