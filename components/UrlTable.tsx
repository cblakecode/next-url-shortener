import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRef } from "react";

const UrlTable = (props: any) => {
  const refs = useRef<HTMLTableCellElement[]>([]);

  const getRedirectUrl = (url: string): string => {
    if (process.env.VERCEL_URL) {
      return `${process.env.VERCEL_URL}/api/redirect/${encodeURIComponent(
        url
      )}`;
    }
    return `http://localhost:3000/api/redirect/${encodeURIComponent(url)}`;
  };

  const handleCopy = (index: number) => {
    const type = "text/html";
    const blob = new Blob([refs.current[index].innerHTML!], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.permissions
      .query({ name: "persistent-storage" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          return navigator.clipboard.write(data).then(
            () => {
              props.setMessage("Coppied!");
              props.setAlert(true);
            },
            () => {
              props.setMessage("something went wrong");
              props.setAlert(true);
            }
          );
        }
        console.log("Not Permitted!");
      });
  };

  if (props.user.isLoading) {
    return <Skeleton />;
  }

  if (props.urls.length === 0) {
    return <h3 className="text-center text-xl pt-4">No Links Yet</h3>;
  }

  return (
    <table className="table table-compact w-full table-auto max-w-lg">
      <thead>
        <tr>
          <th></th>
          <th>Original</th>
          <th>Shortened</th>
          <th>Clicks</th>
          <th className="flex items-center justify-center">
            <div className="tooltip tooltip-bottom" data-tip="delete all">
              <label
                htmlFor="delete-modal"
                className="btn btn-square btn-sm btn-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </label>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.urls.map((url: any, index: number) => {
          return (
            <tr className="table-row" key={index}>
              <th>{index + 1}</th>
              <td className="table-cell text-center text-ellipsis">
                {url.original}
              </td>
              <td
                className="table-cell text-center text-ellipsis"
                ref={(ref) =>
                  refs.current.indexOf(ref!) === -1
                    ? refs?.current?.push(ref!)
                    : null
                }
              >
                <a href={getRedirectUrl(url.short)}>{url.short}</a>
              </td>
              <td className="table-cell text-center">{url.clicks}</td>
              <th>
                <div className="flex justify-center items-center w-full h-full gap-1">
                  <div className="tooltip tooltip-top" data-tip="delete">
                    <button
                      className="btn btn-square btn-sm btn-error"
                      onClick={() =>
                        props.deleteUrl.mutate(
                          { urlId: url.id },
                          {
                            onSuccess: () => {
                              props.setMessage("Deleted");
                              props.setAlert(true);
                              props.setInfo("success");
                              props.user.refetch();
                            },
                            onError: () => {
                              props.setMessage("Something Went Wrong");
                              props.setAlert(true);
                              props.setInfo("error");
                            },
                          }
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="tooltip tooltip-top" data-tip="copy">
                    <button
                      className="btn btn-square btn-sm"
                      onClick={() => handleCopy(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UrlTable;
