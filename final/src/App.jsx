import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { db } from "../firebase.ts";
import { addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const [count, setCount] = useState(0);
  const [docRef, setDocRef] = useState(null);
  const [loading, setLoading] = useState(true);//to avoid race condition

  useEffect(() => {
    const loadCollection = async () => {
      setLoading(true);
      const collectionRef = collection(db, "test");
      const snap = await getDocs(collectionRef);

      if (snap.empty) {
        const newDoc = await addDoc(collectionRef, {
          uid: "test",
          createdAt: new Date(),
          count: 0,
        });
        setDocRef(newDoc);
        setCount(0);
        setLoading(false);
        return;
      }

      if (snap.docs.length > 1) {
        console.log("two documents");
        const firstDoc = snap.docs[0];
        setDocRef(firstDoc.ref);
        setCount(firstDoc.data().count);
        
        for(let i = 1; i < snap.docs.length; i++){
          await deleteDoc(snap.docs[i].ref);
        }
        setLoading(false);
        return;
      }

      const firstDoc = snap.docs[0];
      setCount(firstDoc.data().count);
      setDocRef(firstDoc.ref);
      setLoading(false);
    };

    loadCollection();
  },[]);

  useEffect(() => {
    if (!docRef) return;

    const update = async () => {
      await updateDoc(docRef, { count });
    };

    update();
  }, [count]);

  const incrementButton = async () => {
    setCount((prev) => prev + 1);
  };
  
  const deleteButton = async () => {
    if (docRef) {
      setLoading(true);
      await deleteDoc(docRef);
      setDocRef(null);
      setCount(0);
      const collectionRef = collection(db, "test");
      const newDoc = await addDoc(collectionRef, {
        uid: "test",
        createdAt: new Date(),
        count: 0,
      });
      setDocRef(newDoc);
      setCount(0);
      const snap = await getDocs(collectionRef);
      if (snap.docs.length > 1) {
        const firstDoc = snap.docs[0];
        setDocRef(firstDoc.ref);
        setCount(firstDoc.data().count);
        
        for(let i = 1; i < snap.docs.length; i++){//autoclicker can bug out the first condition of the function, so i have add a second checker
          await deleteDoc(snap.docs[i].ref);
        }
        return;
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Final Project</h1>
      <div className="card">
        <button onClick={incrementButton} disabled={loading}>
          {loading ? "Loading..." : `count is ${count}`}
        </button>
        <button onClick={deleteButton} disabled={loading}>
          Delete
        </button>
      </div>
      <p className="read-the-docs">
        Counter will be kept on cloud
      </p>
    </>
  );
}

export default App;
