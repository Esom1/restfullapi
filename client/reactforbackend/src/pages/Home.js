import React, {useEffect,useState} from 'react';
import axios from 'axios'

const Home = () => {
  const [data,setData] = useState([])
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('')
  let url = 'http://localhost:7070/posts/allPosts'
  const getFetchedData = async()=>{
    let fetchedUrl = await axios (url);
    // let res = await fetchUrl.json
    console.log(fetchedUrl.data);
    setData(fetchedUrl.data)
  }
  useEffect(()=>{
    getFetchedData()
  },[])
  function handlePost(e){
    e.preventDefault()
    console.log('christy');
    axios.post ('http://localhost:7070/posts/create',{title:title, description:description})
    window.location.reload()
  }

  function handleDelete(id){
    axios.delete(`http://localhost:7070/posts/delete/${id}`)
    window.location.reload()
  }

  return (
    <div className='container text-center'>
      <h2>Home Page</h2>
      <div>
            <form className='border border-5 w-50 m-auto' >
                <label htmlFor="title">title:</label>
                <input type="text" onChange={(e)=> setTitle(e.target.value)} id='title' /><br /><br />
                <label htmlFor="description">description:</label>
                <input type="text" id='description'  onChange={(e)=> setDescription(e.target.value)}/><br /><br />
                <button onClick={handlePost} className='btn btn-primary text-white'>post</button>

            </form>
        </div>
      {data.map((datum) => {
        let { _id, title, description } = datum;
        return (
          <div key={_id}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={()=>handleDelete(_id)} className='btn btn-danger'>delete item</button>
          </div>
        );
      })}
    </div>
  )
}

export default Home