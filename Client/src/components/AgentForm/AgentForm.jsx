import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentApi } from "./../../utils/agentApi.js";
import { agentValidation } from "../../validations/agentValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AgentForm() {
  const success = () => toast.success("Support Agent Successfully Registered");

  const error = () => toast.error("Error");

  const form = useForm({
    resolver: zodResolver(agentValidation),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      description: "",
    },
  });
  const { register, handleSubmit, formState, trigger } = form;

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const result = await agentApi(data);
      if (result.status === true) {
        console.log(result);
        success();
      }
    } catch (err) {
      error();
    }
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Become a Support Agent
          </h2>

          <form
            action="#"
            method="POST"
            className="mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Name:{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter your Name:"
                    {...register("name")}
                  ></input>
                  <p className="text-[red]">{errors.name?.message}</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  ></input>
                  <p className="text-[red]">{errors.email?.message}</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Phone{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="tel"
                    placeholder="Enter the phone number:"
                    {...register("phone")}
                  ></input>
                  <p className="text-[red]">{errors.phone?.message}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Description:{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter the description"
                    {...register("description")}
                  ></textarea>
                  <p className="text-[red]">{errors.description?.message}</p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => trigger()}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Register <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
