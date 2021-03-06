import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import Error from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { SIGNIN_MUTATION } from "./SignIn";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  const [
    signin,
    { data: signInData, loading: signInLoading, error: signInError },
  ] = useMutation(SIGNIN_MUTATION, {
    variables: { email: inputs.email, password: inputs.password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch(console.error);
    if (res?.data?.createUser) {
      await signin().catch(console.error);
      resetForm();
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <Error error={error || signInError} />
      <fieldset disabled={loading || signInLoading}>
        {data?.createUser && (
          <SuccessMessage text="Success!">
            Signed up and signed in with {data.createUser.email} - You are being
            redirected to the home page
          </SuccessMessage>
        )}
        <label htmlFor="email">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
