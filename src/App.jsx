import Navbar from "./components/Navbar";

import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { db } from "./config/firebase";

import {HiOutlineUserCircle} from 'react-icons/hi'
import {IoMdTrash} from 'react-icons/io';
import {RiEditCircleLine} from 'react-icons/ri'
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id))
    } catch (error) {
      console.error(error.message)
    }
  }

  const updateContact = (id) => {
    isOpen();

  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsRef);
        const contactLists = contactSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      } catch (error) {
        console.error(error.message);
      }
    };
    getContacts();
  }, []);
  return (
    <>
    <div className="max-w-[370px] mx-auto">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow">
          <FiSearch className="ml-1 text-3xl text-white absolute" />
          <input
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9"
          />
        </div>
        <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
      </div>

      <div className="mt-4 gap-3 flex flex-col">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-yellow flex justify-between items-center p-2 rounded-lg">
            <div className="flex gap-2">
              <HiOutlineUserCircle className="text-4xl" style={{color:'orange'}}/>
            <div>
              <h2 className="font-medium">{contact.name}</h2>
              <p className="text-sm">{contact.email}</p>
            </div>
            </div>
            <div className="flex text-3xl gap-1">
              <RiEditCircleLine onClick={() => updateContact(contact.id)} style={{cursor: "pointer"}} />
              <IoMdTrash onClick={() => deleteContact(contact.id)} style={{color:"orange", cursor: "pointer"}} />
            </div>
            
          </div>
        ))}
      </div>
    </div>
    <AddAndUpdateContact isOpen={open} onClose={onClose} isUpdate />
    </>
  );
}

export default App;
