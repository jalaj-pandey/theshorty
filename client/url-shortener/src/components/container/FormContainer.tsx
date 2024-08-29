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
          <h2 className="text-yellow-300 text-4xl text-center p-4">URL SHORTENER</h2>
          <p className="text-white text-xl text-center pb-2 font-light">
            Transform your long, messy URLs into sleek, easy-to-share links with our free URL shortener.
          </p>
          <p className="text-white text-md text-center pb-4 font-light">
            Paste your long link below, and we'll create a concise, professional URL in seconds. Ideal for sharing on social media.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  theshorty.io/
                </div>
                <input
                  type="text"
                  placeholder="add your link"
                  required
                  className="block w-full p-4 text-gray-900 ps-24 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e)=> setFullUrl(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-yellow-300 rounded-lg hover:bg-yellow-500 hover:text-teal-600 border border-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"
                >
                  Short
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
