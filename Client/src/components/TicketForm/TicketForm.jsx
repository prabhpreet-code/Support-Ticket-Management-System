import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketValidation } from "./../../validations/ticketValidation";
import { ticketApi } from "../../utils/ticketApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TicketForm() {
  const form = useForm({
    resolver: zodResolver(ticketValidation),
    defaultValues: {
      topic: "",
      description: "",
      severity: "",
      type: "",
    },
  });

  const { register, handleSubmit, formState, trigger } = form;

  const { errors } = formState;

  const success = () => toast.success("Support Agent Successfully Registered");

  const error = () => toast.error("Error");

  const onSubmit = async (data) => {
    try {
      const result = await ticketApi(data);
      if (result.status === true) {
        console.log(result);
        success();
      }
    } catch (err) {
      error();
    }

    console.log("Form submitted:", data);
  };
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-7xl py-12 md:py-24">
        <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="px-2 md:px-12">
              <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                Get in touch
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Our friendly team would love to hear from you.
              </p>

              <form
                action=""
                className="mt-8 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid w-full gap-y-4 md:gap-x-4 ">
                  <div className="grid w-full  items-center gap-1.5">
                    <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Topic
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border !text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="topic"
                      placeholder="What is the topic?"
                      {...register("topic")}
                    />
                    <p className="text-[red]">{errors.topic?.message}</p>
                  </div>
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border  !text-black  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    id="description"
                    placeholder="Tell us what your problem is about.."
                    {...register("description")}
                  />
                  <p className="text-[red]">{errors.description?.message}</p>
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label className="text-sm font-medium leading-none  text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Severity:
                  </label>
                  <select
                    id="severity"
                    {...register("severity")}
                    className="flex h-10 w-full rounded-md border !text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  >
                    <option defaultValue value="low">
                      Low
                    </option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                  <p className="text-[red]">{errors.severity?.message}</p>
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label className="text-sm font-medium leading-none  text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    {...register("type")}
                    className="flex h-10 w-full rounded-md border !text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  >
                    <option value="Complaint">Complaint</option>
                    <option value="Issue related to Instructor">
                      Issue related to Instructor
                    </option>
                    <option value="Enquiry">Enquiry</option>
                    <option value="Issues regarding Payment">
                      Issues regarding Payment
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={() => trigger()}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Send Ticket!
                </button>
              </form>
            </div>
          </div>
          <img
            alt="Contact us"
            className="hidden max-h-full w-full rounded-lg object-cover lg:block"
            src="https://cdn.discordapp.com/attachments/1064938077912567978/1197864065352077362/06_movie_tickets.png?ex=65bcd0d8&is=65aa5bd8&hm=9ec06d22b11b24258a6ea0ccc08e3ca3498e5ba2e863e55f371513acd52133d2&"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
