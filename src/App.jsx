import Navbar from "./components/Navbar";

import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./config/firebase";

import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

import { ToastContainer, toast } from "react-toastify";
import NotFoundCotact from "./components/NotFoundCotact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editedContact, setEditedContact] = useState({});
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const editContact = (contact) => {
    setEditedContact(contact);
    setIsUpdate(true);
  };

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filterdContact = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filterdContact);
      return filterdContact;
    });
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
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
              onChange={filterContacts}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? (
            <NotFoundCotact />
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-yellow flex justify-between items-center p-2 rounded-lg"
              >
                <div className="flex gap-2">
                  <HiOutlineUserCircle
                    className="text-4xl"
                    style={{ color: "orange" }}
                  />
                  <div>
                    <h2 className="font-medium">{contact.name}</h2>
                    <p className="text-sm">{contact.email}</p>
                  </div>
                </div>
                <div className="flex text-3xl gap-1">
                  <RiEditCircleLine
                    onClick={() => {
                      editContact(contact);
                      onOpen();
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <IoMdTrash
                    onClick={() => deleteContact(contact.id)}
                    style={{ color: "orange", cursor: "pointer" }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact
        isOpen={open}
        onClose={onClose}
        isUpdate={isUpdate}
        editedContact={editedContact}
      />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
