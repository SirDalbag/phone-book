import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form } from "../components/Form";

export default function Page() {
  return (
    <div className="p-4">
      <Header />
      <main className="flex justify-center">
        <Form buttonText="Save" url="api/person/add/" method="post"></Form>
      </main>
      <Footer />
    </div>
  );
}
