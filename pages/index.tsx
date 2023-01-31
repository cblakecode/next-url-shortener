import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import UrlForm from "../components/UrlForm";
import { useRef, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import UrlTable from "../components/UrlTable";

const Home: NextPage = () => {
  const [alert, setAlert] = useState(false);
  const [info, setInfo] = useState("success");
  const [message, setMessage] = useState("");

  const user = trpc.crud.readWithUrls.useQuery();
  const deleteUrl = trpc.crud.delete.useMutation();
  const deleteAll = trpc.crud.deleteAll.useMutation();

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 4000);
    }
  }, [alert]);

  return (
    <main className="grid grid-flow-dense place-content-center">
      <div className="flex flex-col gap-4 p-2">
        <h1 className="font-bold text-7xl text-center">Url Shortener</h1>
        <UrlForm id={user.data?.id!} user={user} />
      </div>
      <div className="p-x-4 overflow-x-scroll md:overflow-hidden overflow-y-hidden">
        <UrlTable
          urls={user.data?.urls!}
          deleteUrl={deleteUrl}
          deleteAll={deleteAll}
          user={user}
          setAlert={setAlert}
          setMessage={setMessage}
          setInfo={setInfo}
        />
      </div>
      <Modal
        mutate={() =>
          deleteAll.mutate(
            { userId: user.data?.id! },

            {
              onSuccess: () => {
                setMessage("Deleted All");
                setAlert(true);
                setInfo("success");
                user.refetch();
              },
              onError: () => {
                setMessage("Something Went Wrong");
                setAlert(true);
                setInfo("error");
              },
            }
          )
        }
      />
      {alert && <Alert info={info} message={message} />}
    </main>
  );
};

export default Home;
