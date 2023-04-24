import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function Home() {

  const [files, setFiles] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const user = useSelector(state => state.user)

  useEffect(() => {
    async function fetchUploadedFiles() {
      const config = {
        method: "GET", // or 'PUT'
        headers: {credentials: 'include'},
      }

      try {
        const response = await fetch('/api/uploadFile', config);
        const resData = await response.json();
        setFiles(resData.files);
      } catch (error) {
        console.log({error})
      }
    }
    if(fileUploaded)setFileUploaded(false);
    fetchUploadedFiles();

  }, [fileUploaded, user.userId])

  console.log(files)

  const handleOnChange = async (e) => {
    const formData = new FormData()
    Array.from(e.target.files).forEach((file, index) => {
      formData.append(`file${index}`, file)
    })
    const config = {
      method: "POST", // or 'PUT'
      headers: {credentials: 'include'},
      body: formData,
    }

    try {
      const response = await fetch('/api/uploadFile', config);
      const resData = await response.json();
      setFileUploaded(true);
    } catch (error) {
      console.log({error})
    }
  };


  return (
    <>
      <h1 className="text-2xl font-bold underline text-center">
        Login, upload image and process it, all free !!!
      </h1>
      {user?.userId && <div>
        <div>
          <input type="file" name="theFiles" multiple={true} onChange={handleOnChange}/>
        </div>
        <div className="flex flex-wrap gap-3">
          {files?.length > 0 && files.map((image, index) => (
            <img key={image + index} src={`/uploads/${user.userId}/${image}`} alt={image} className="w-[350px] h-[350px] object-cover"/>
          ))}
        </div>
      </div>}
    </>
  )
}
