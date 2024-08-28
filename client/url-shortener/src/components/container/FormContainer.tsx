import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constant.ts";

interface IFormContainerProps {
  updateReloadState: ()=> void;
}


const FormContainer:React.FunctionComponent<IFormContainerProps>= (props) => {
  const {updateReloadState} = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
        await axios.post(`${serverUrl}/shortUrl`,{
            fullUrl: fullUrl
        });
        setFullUrl("");
        updateReloadState();
    } catch (error) {
        console.log(error); 
    }

  }
  return (
    <div className="container mx-auto p-2">
      <div className="bg-teal-600 my-8 rounded-xl bg-cover ">
        <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
          <h2 className="text-white text-4xl text-center p-4">URL SHORTENER</h2>
          <p className="text-white text-xl text-center pb-2 font-light">
            paste your untidy link to shorten it
          </p>
          <p className="text-white text-sm text-center pb-4 font-light">
            free tool to shorten a URL or reduce link, Use our Shortener to
            create a shortened & neat
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  urlshortener.link
                </div>
                <input
                  type="text"
                  placeholder="add your link"
                  required
                  className="block w-full p-4 text-gray-900 ps-32 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e)=> setFullUrl(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Shorten URL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
