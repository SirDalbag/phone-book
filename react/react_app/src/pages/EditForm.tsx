import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form } from "../components/Form";
import axios from "axios";

export default function Page() {
  const { id } = useParams();

  const [phoneBook, setPhoneBook] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/persons/${id}/`).then((response) => {
      setPhoneBook(response.data.data);
    });
  }, []);

  // @ts-ignore
  return (
    <div className="p-4">
      <Header />
      <main className="flex justify-center">
        <Form
          buttonText="Edit"
          nameValue={
            //@ts-ignore
            phoneBook.name
          }
          phoneNumberValue={
            //@ts-ignore
            phoneBook.phone_number
          }
          url={`api/person/edit/${id}/`}
          method="put"
        ></Form>
      </main>
      <Footer />
    </div>
  );
}
