import { useForm, type SubmitHandler } from "react-hook-form"
import z, { minLength } from 'zod'


const FormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string().optional(),
  shortdesc: z.string().min(10, "Description must be at least 10 characters"),
  story: z.string().min(20, "Story must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
});

// extract the inferred type
type FormValues = z.infer<typeof FormSchema>;


const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
            title: "",
      image: "",
      shortdesc: "",
      story: "",
      category: "",

    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form 
    className="flex flex-col  gap-4 justify-center items-start w-full h-full px-8 py-3 sm:px-16 sm:py-6 md:px-32 md:py-9 lg:px-64 lg:py-12  "
    onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-5xl font-bold">
        Write a story
      </h2>
      <div className="w-full flex flex-col gap-2  ">

     
      <input
        id="title"
        type="text"
        aria-invalid={errors.title ? "true" : "false"}
        placeholder="Title ..."
        className="px-6 py-4 rounded-2xl active:ring-purple-200 active:ring-1 ring-1 ring-[#E0DBEA] bg-[#FCF9F3] placeholder-gray-500 placeholder:font-semibold"
        {...register("title")}
        />
       {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}

        </div>


        <div className="w-full flex flex-col gap-2  ">

      
      <input
        id="shortdesc"
        type="text"
        aria-invalid={errors.title ? "true" : "false"}
        placeholder="short excerpt"
        className="px-6 py-6 rounded-2xl active:ring-purple-200 active:ring-1 ring-1 ring-[#E0DBEA] bg-[#FCF9F3] placeholder-gray-500 placeholder:font-semibold"
        {...register("title")}
        />
      {errors.title && <p role="alert">{errors.title.message}</p>}

        </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Write