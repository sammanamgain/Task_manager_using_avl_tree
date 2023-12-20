
import Welcome from './Components/welcome'
import Form from './Components/Form'
import AVLTree from './Components/test'
import './App.css'
import Display from './Components/Display';
function App() {
const avlTree = new AVLTree();
avlTree.insert({ name: "Learn DSA", priority: 2 });
avlTree.insert({ name: "do a project", priority: 3});
avlTree.insert({ name: "Go for a run", priority: 1 });
avlTree.insert({ name: "Inform HR", priority: 3 });
  

  return (
    <>
      <Welcome />
      <Form data={avlTree}/>
      <Display data={avlTree}/>
    </>
  )
}

export default App
