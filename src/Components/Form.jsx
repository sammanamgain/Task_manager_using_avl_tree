/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function Form(props) {
  let [updated, setupdated] = useState(0);
  let [name, setname] = useState([]);
  const [select, setselect] = useState(false);

  useEffect(() => {
    console.log(updated);
    let t = [];
    if (updated === 0) {
      console.log("did it entered inside useffect more")
      props.data.inOrderTraversal((node) => {
     
        let temp = [
          {
            name: node.name,
            priority: node.priority,
            status: node.completed,
            order: node.order,
          },
        ];
        t = [...t, ...temp];
      });

      setname(() => [ ...t]);

      setupdated((value) => value + 1);
      console.log("inside the useeffect")
      
    }
  }, [updated]);


  console.log(name);
  name.sort((a, b) => b.priority - a.priority);

  const [formData, setdata] = useState({ name: "", priority: 1 });
  const handlechange = (e) => {
    setdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    console.log("handlesubmit triggered");
    e.preventDefault();
    let finalData = { ...formData, priority: parseInt(formData.priority) };

    await props.data.insert(finalData);
    
    setupdated(0);
    console.log("state updated");
  };

  const handlesuccess = (n) => {
    setselect(!select);
    if (select === true) {
      let value = n;
      name = name.filter((item) => item.name !== n.name);

      const nodeNameToDelete = n.name;
      props.data.deleteNodeByName(nodeNameToDelete);
      console.log("printing modifying obj");
      console.log(value);
      value.status = true;
      console.log("after");
      console.log(value);
      props.data.insert(value);
      setupdated((value) => value + 1);

      console.log(name);
    } else {
      let value = n;
      name = name.filter((item) => item.name !== n.name);

      const nodeNameToDelete = n.name;
      props.data.deleteNodeByName(nodeNameToDelete);
      console.log("printing modifying obj");
      console.log(value);
      value.status = false;
      console.log("after");
      console.log(value);
      props.data.insert(value);
      setupdated((value) => value + 1);

      console.log(name);
    }
  };



  const handledelete=(n)=>{
  
  console.log("did it triggered")
  const nodeNameToDelete = n.name;
  props.data.deleteNodeByName(nodeNameToDelete);
  name = name.filter((item) => item.name !== n.name);
  console.log(name)
  setname(name);
  setupdated(updated++)
  }




  return !updated ? (
    <div> fuck u loading</div>
  ) : (
    <>
      {console.log("did it rendered again")}
      <div className="mt-12 flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl"> Add a Task</h1>

        <form
          className="flex flex-col gap-3 text-2xl justify-center"
          onSubmit={handlesubmit}
        >
          <div className="flex gap-5">
            <label htmlFor="name">Task Name: </label>
            <input
              onChange={handlechange}
              className="bg-slate-700"
              id="name"
              type="text"
            ></input>
          </div>
          <div className="flex gap-3">
            <label htmlFor="name">Task Priority: </label>
            <select
              onChange={handlechange}
              className="bg-slate-700"
              id="priority"
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div className="flex justify-center ">
            <button type="submit" className="bg-red-500 w-[50%] text-center">
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className=" m-5  p-5 flex flex-col  gap-5 justify-center items-center">
        <h1 className="text-4xl"> Current Task</h1>

        <div className="flex gap-10 text-2xl border-2 w-[25vw]">
          <h1 className="w-[100%]">Name</h1>
          <h1 className="w-[100%]"> priority </h1>
          <h1 className="w-[100%]">Completetion</h1>
          <h1 className="w-[250%]">Delete Task</h1>
        </div>
        <div className="border-2 w-[25vw]">
          {name.map((name) => (
            <div key={name.order + name.name} className="flex gap-10 text-2xl">
              {console.log(name.name)}
              <h1 className="w-[250%]">{name.name}</h1>
              <h1 className="">{name.priority}</h1>
              <h1 className="w-full">{name.status.toString()}</h1>

              <input
                type="checkbox"
                id="success"
                checked={name.status}
                onChange={() => handlesuccess(name)}
              ></input>
              <button  onClick={()=>handledelete(name)}> Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
