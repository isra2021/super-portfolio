export default function Page({params}: {params: {id: string}}) {
  return <h1>Project {params.id}</h1>;
}
