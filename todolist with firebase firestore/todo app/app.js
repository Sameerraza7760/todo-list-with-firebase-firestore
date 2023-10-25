


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,updateEmail,deleteUser  }  from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore,collection,addDoc,getDocs,setDoc,doc,updateDoc ,arrayUnion,arrayRemove,increment,onSnapshot,deleteDoc  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCkOaafmzhKaSSpY2Kgy2_FSqThqDjRY6Q",
    authDomain: "authentication-247ce.firebaseapp.com",
    projectId: "authentication-247ce",
    storageBucket: "authentication-247ce.appspot.com",
    messagingSenderId: "1066835457540",
    appId: "1:1066835457540:web:62c4a8ff35ee65fdb8a751",
    measurementId: "G-SHP1Z40XXW"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app); 

const auth = getAuth(app);
const db = getFirestore(app);
var list=document.getElementById("list")
document.getElementById('addtodo').addEventListener("click",async()=>{
    try {
    var todoitem=document.getElementById("todo-item").value
   
       
    const docRef = await addDoc(collection(db, "todo"), {
     todoitem:todoitem,

   });
 
 console.log("added")
 
 
  
    } catch (error) {
       alert(error.messege)
    }

})

const getTodos = () => {
    onSnapshot(collection(db, 'todo'), (querySnapshot) => {
        list.innerHTML = ''; // Clear the existing list
        querySnapshot.forEach((doc) => {
            const todoitem = doc.data().todoitem;
            const li = document.createElement('li');
            li.classList.add('lii')
            li.appendChild(document.createTextNode(todoitem));
            const delbtn = document.createElement('button');
            delbtn.classList.add('btn');
            delbtn.textContent = 'Delete';
            delbtn.onclick = () => delebtn(doc.id); // Adjust this based on your data structure
            const editbtn=document.createElement('button')
            editbtn.classList.add('edbtn')

            editbtn.textContent='EDIT'
            editbtn.onclick = () => ubdateTodo(doc.id);

            li.appendChild(delbtn);
               li.appendChild(editbtn)
            list.appendChild(li);
        });
    });
};

getTodos();
const delebtn = async (docId) => {
    console.log(docId)
  try {
    // Get a reference to the document
    const todoRef = doc(db, "todo", docId);

    // Delete the document
    await deleteDoc(todoRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};


const ubdateTodo=async(docID)=>{
    var todoitem =prompt('enter a ubdated value')
    try {
        const todoRef = doc(db, "todo", docID);
        await updateDoc(todoRef, {
            todoitem:todoitem
          });
          alert("ubdated")
    } catch (error) {
        alert(error.messege)
    }
   

}

document.getElementById('deleteALL').addEventListener("click", async () => {
  const querySnapshot = await getDocs(collection(db, 'todo'));
  try {
      querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref ); // Use doc.ref to get the document reference
          console.log(doc.ref.id)
      });
      console.log("Deleted all documents");
  } catch (error) {
      console.error("Error deleting documents:", error.message);
  }
});
