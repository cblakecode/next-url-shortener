import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import UrlForm from "../components/UrlForm";

const Home: NextPage = () => {
  const user = trpc.userWithUrls.useQuery();

  return (
    <main className="grid grid-flow-dense place-content-center">
      <div className="flex flex-col gap-4 p-2">
        <h1 className="font-bold text-7xl text-center">Url Shortener</h1>
        <UrlForm id={user.data?.id!} user={user} />
      </div>
      <div className="p-x-4">
        <table className="table table-normal w-full table-auto text-ellipsis">
          <thead>
            <tr>
              <th></th>
              <th>Original</th>
              <th>Shortened</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {/* {!user.data && <Loading />} */}
            {user.data?.urls.map((url, index) => {
              return (
                <tr className="table-row" key={index}>
                  <th>{index + 1}</th>
                  <td className="table-cell text-center">{url.original}</td>
                  <td className="table-cell text-center">{url.short}</td>
                  <td className="table-cell text-center">{url.clicks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Home;
