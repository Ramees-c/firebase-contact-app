import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

function AddAndUpdateContact({ isOpen, onClose, isUpdate, editedContact }) {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  // console.log(contact.name, "contact")
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: editedContact.name,
                  email: editedContact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            // console.log(values)
            isUpdate
              ? updateContact(values, editedContact.id)
              : addContact(values);
          }}
        >
          <Form>
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                style={{ border: "1px solid black", height: "40px" }}
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                style={{ border: "1px solid black", height: "40px" }}
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "orange",
                padding: "10px 20px",
                borderRadius: "8px1",
                width: "100%",
              }}
            >
              {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default AddAndUpdateContact;
