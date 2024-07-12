// import React, { useEffect, useState } from 'react';
// import { Data } from './EmployeeData';
// import './App.css'; // Import the CSS file

// function App() {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [id, setId] = useState(0);
//   const [isUpdate, setIsUpdate] = useState(false);

//   useEffect(() => {
//     setData(Data);
//   }, []);

//   const handleEdit = (id) => {
//     const dt = data.find(item => item.id === id);
//     if (dt) {
//       setIsUpdate(true);
//       setId(id);
//       setTitle(dt.title);
//       setDescription(dt.description);
//       setDate(dt.date);
//     }
//   };

//   const handleDelete = (id) => {
//     if (id > 0) {
//       if (window.confirm("Are you sure you want to delete this record?")) {
//         const dt = data.filter(item => item.id !== id);
//         setData(dt);
//       }
//     }
//   };

//   const handleSave = () => {
//     const newData = {
//       id: data.length + 1,
//       title,
//       description,
//       date,
//     };
//     setData([...data, newData]);
//     handleClear();
//   };

//   const handleClear = () => {
//     setId(0);
//     setTitle('');
//     setDescription('');
//     setDate('');
//     setIsUpdate(false);
//   };

//   const handleUpdate = () => {
//     const index = data.findIndex(item => item.id === id);
//     if (index >= 0) {
//       const updatedData = [...data];
//       updatedData[index].title = title;
//       updatedData[index].description = description;
//       updatedData[index].date = date;

//       setData(updatedData);
//     }
//     handleClear();
//   };

//   return (
//     <>
//     {/* nav */}

//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <a className="navbar-brand">Task Management</a>
//     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     </div>
//   </div>
// </nav>


//  <div className="container p-5 d-flex flex-column align-items-start">
//   <div className="d-flex justify-content-between">
//     <label className="w-30">
//       Title:
//       <input type="text" className="form-control" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} value={title} />
//     </label>
//     <label className="w-30">
//       Description:
//       <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} value={description} />
//     </label>
//     <label className="w-30">
//       Date:
//       <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
//     </label>
//   </div>
  
//   <div className="mt-3">
//     {!isUpdate ? (
//       <button className='btn btn-primary me-2' onClick={handleSave}>Save</button>
//     ) : (
//       <button className='btn btn-primary me-2' onClick={handleUpdate}>Update</button>
//     )}
//     <button className='btn btn-danger' onClick={handleClear}>Clear</button>
//   </div>
// </div>


//       <div className="card-container">
//         {data.map((item, index) => (
//           <div key={index} className="card">
//             <div className="card-body">
//               <h5 className="card-title">ID: {item.id}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">Title: {item.title}</h6>
//               <p className="card-text">Description: {item.description}</p>
//               <p className="card-text">Date: {item.date}</p>
//               <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>  &nbsp;
//               <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './API';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await fetchTasks();
    setData(result.data);
  };

  const handleEdit = (id) => {
    const task = data.find(item => item._id === id);
    if (task) {
      setIsUpdate(true);
      setId(id);
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await deleteTask(id);
        loadTasks();
      }
    }
  };

  const handleSave = async () => {
    const newTask = { title, description, date };
    await createTask(newTask);
    loadTasks();
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setTitle('');
    setDescription('');
    setDate('');
    setIsUpdate(false);
  };

  const handleUpdate = async () => {
    const updatedTask = { title, description, date };
    await updateTask(id, updatedTask);
    loadTasks();
    handleClear();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Task Management</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
      </nav>

      <div className="container p-5 d-flex flex-column align-items-center ">
        <div className="d-flex justify-content-between">
          <label className="w-30">
            Title:
            <input type="text" className="form-control" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} value={title} />
          </label>
          <label className="w-30">
            Description:
            <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} value={description} />
          </label>
          <label className="w-30">
            Date:
            <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
          </label>
        </div>

        <div className="mt-3">
          {!isUpdate ? (
            <button className='btn btn-primary me-2' onClick={handleSave}>Save</button>
          ) : (
            <button className='btn btn-primary me-2' onClick={handleUpdate}>Update</button>
          )}
          <button className='btn btn-danger' onClick={handleClear}>Clear</button>
        </div>
      </div>

      <div className="card-container p-3">
        {data.map((item) => (
          <div key={item._id} className="card">
            <div className="card-body">
              {/* <h5 className="card-title">ID: {item._id}</h5> */}
              <h6 className="card-subtitle mb-2 text-muted">Title: {item.title}</h6>
              <p className="card-text">Description: {item.description}</p>
              <p className="card-text">Date: {item.date}</p>
              <button className='btn btn-primary' onClick={() => handleEdit(item._id)}>Edit</button>  &nbsp;
              <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
