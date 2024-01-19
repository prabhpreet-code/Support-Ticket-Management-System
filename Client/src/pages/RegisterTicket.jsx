import TicketForm from "../components/TicketForm/TicketForm";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const RegisterTicket = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4">
        <Banner />
        <TicketForm />
        <hr className="mt-6" />
        <Footer />
      </div>
    </div>
  );
};

export default RegisterTicket;
