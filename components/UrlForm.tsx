import { Formik, Form } from "formik";
import { urlSchema } from "../utils/validation";
import { trpc } from "../utils/trpc";
import UrlInput from "./UrlInput";

const UrlForm = ({ id, user }: { id: string; user: any }) => {
  const mutation = trpc.shortenUrl.useMutation({
    onSettled: () => {
      console.log("settled");
      user.refetch();
    },
  });

  return (
    <Formik
      initialValues={{ url: "" }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await mutation.mutate({ url: values.url, id });
          resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
      validationSchema={urlSchema}
    >
      {(props) => (
        <Form className="form-control gap-4 group hover:cursor-pointer">
          <UrlInput
            label="Enter Url"
            name="url"
            type="text"
            loader={props.isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UrlForm;
