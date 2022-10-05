import { useState } from "react";
import { getLinkPreview } from "link-preview-js";

function Home() {
  const [query, setQuery] = useState("");

  const [result, setResult] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({
    google: [],
    twitter: [],
    crunchbase: [],
  });

  const handleSubmit = async (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    console.log(code);
    if (loading) return;
    if (code != 13) {
      //Enter keycode
      return;
    }

    e.preventDefault();

    if (!query) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/getData?query_param=${query}`);
      console.log(typeof query);
      const json = await res.json();
      console.log(json);
      // const { result } = JSON.parse(json);
      // console.log(json);
      let previews = {
        google: [],
        twitter: [],
        crunchbase: [],
      };

      // new Promise((resolve, reject) => {
      //   Object.keys(json.result).forEach(async (key) => {
      //     for (let i = 0; i < json.result[key].length; i++) {
      //       const element = json.result[key][i];
      //       try {
      //         const data = await getLinkPreview(element);
      //         data.isData = true;
      //         previews[key].push(data);
      //       } catch (error) {
      //         previews[key].push({ isData: false });
      //       }
      // .then((data) => {
      //   console.log(data);
      //   data.isData = true;
      //   setPreview((prev) => {
      //     return {
      //       ...prev,
      //       [key]: [...prev[key], data],
      //     };
      //   });
      //   // previews[key].push({...data,isData:true});
      // })
      // .catch((err) => {
      //   console.log(err);
      //   previews[key].push({ isData: false });
      //   setPreview((prev) => {
      //     return {
      //       ...prev,
      //       [key]: [{ isData: false }],
      //     };
      //   });
      //   // previews[key].push();
      // });
      //   }
      // });
      setResult(json);
      // if (previews) {
      // } else {
      //   const errorObject = {
      //     msg: "An error occured",
      //     error, //...some error we got back
      //   };
      //   setError(errorObject.msg);
      //   reject(errorObject);
      // }
      // });

      // setPreview(previews);
    } catch (error) {
      console.log("err");
      console.log(error);
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="">
      <div className="w-full h-[23rem] bg-red-500 background-image flex flex-col items-center justify-between">
        <div className="mt-10 flex flex-col justify-between h-full items-center">
          <h1 className="text-white sm:text-6xl font-semibold text-4xl drop-shadow-lg !opacity-100">
            SalesMINI
          </h1>
          <h1 className=" font-semibold text-xl drop-shadow-md mb-5 text-white ">
            Research on the go!
          </h1>
        </div>
        <div className="flex items-center shadow-md rounded-sm -mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-12 text-gray-600 bg-white   pl-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            className=" sm:w-[30rem] w-[20rem] outline-none px-3 py-3 "
            placeholder="Search by company name or person name..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </div>
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <></>
        )}

        {error ? <h1 className="text-red-500">{error}</h1> : <></>}

        {result ? (
          Object.keys(result.result).map((key) => {
            console.log("key", key);

            return (
              <div
                key={key}
                className="flex flex-col items-start sm:max-w-6xl sm:mx-auto space-y-4 px-5 mb-10"
              >
                {key == "google" ? (
                  <img src="/google.png" className="h-10" />
                ) : key == "twitter" ? (
                  <img src="/twitter.png" className="h-10" />
                ) : (
                  <img src="/crunchbase.png" className="h-10" />
                )}

                <div className="flex flex-col  items-start space-y-4 ">
                  {result.result[key] ? (
                    result.result[key].map((item, ind) => {
                      let p;
                      if (key == "google") {
                        p = preview.google;
                      } else if (key == "twitter") {
                        p = preview.twitter;
                      } else if (key == "crunchbase") {
                        p = preview.crunchbase;
                      }
                      return (
                        <div
                          key={item}
                          className="w-full border p-2 border-gray-100 rounded-md"
                        >
                          <a
                            href={item}
                            className="text-blue-500 hover:underline break-words block w-80 sm:w-full"
                          >
                            • {item}
                          </a>

                          {/* {preview[key].length > 0 ?? p[ind].isData == true ? (
                            <div className="flex flex-col space-y-2 bg-gray-200 ml-4 p-2 rounded-md shadow-inner">
                              <a
                                href={p[ind].url}
                                className="text-blue-500 hover:underline break-words block w-80 sm:w-full"
                              >
                                {p[ind].title}
                              </a>
                              <div className="flex w-full space-x-2">
                                <img
                                  src={p[ind].images ? p.images[0] : ""}
                                  className="w-20 h-20 rounded-md object-cover"
                                />
                                <p className="text-gray-700 block ">
                                  {p[ind].description}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <>{console.log(p[ind])}</>
                          )} */}
                          {/* <div className="h-px w-full bg-gray-500"></div> */}
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Home;
