import { createSlice } from '@reduxjs/toolkit';
import AVLTree from '../../Components/test.js';
const avlTree = new AVLTree();
avlTree.insert({ name: "Learn DSA", priority: 2 });
avlTree.insert({ name: "do a project", priority: 3});
avlTree.insert({ name: "Go for a run", priority: 1 });
avlTree.insert({ name: "Inform HR", priority: 3 });
const initialState = {
    state:avlTree
};

const treeSlice = createSlice({
    name: 'avl',
    initialState,
    reducers: {
        
    },
});

export default treeSlice.reducer;