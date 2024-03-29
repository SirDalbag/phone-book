import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";

export default function Page() {
  return (
    <div className="p-4">
      <Header />
      <main className="flex justify-center">
        <Table></Table>
      </main>
      <Footer />
    </div>
  );
}
