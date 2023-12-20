import { useSelector } from "react-redux";

export default function Display() {
   let  name=[]
    const tree = useSelector((state) =>state.avl

    );
    console.log(tree)
    const greetMessage = () => tree.state.display();
    //console.log(greetMessage())

  

  return (
    <div >
        {
            name.map((name)=>(
                <div key={name}>
                    {name}
                </div>
            ))
        }
      
    </div>
  )
}
