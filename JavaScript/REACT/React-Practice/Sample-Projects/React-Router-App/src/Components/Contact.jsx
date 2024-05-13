import { Form, redirect, useActionData } from "react-router-dom";

export default function Contact() {
  const data = useActionData();

  return (
    <div className="contact">
      <h3>Contact Us</h3>
      {/* only to access the method in our action a react doesnt handle sending any method */}
      {/* Action is a special func that fires when the form is submitted & here relative path is given so as to find the matching route so as to fire the action func */}
      <Form method="post" action="/help/contact">
        <label>
          <span>Your email:</span>
          <input type="email" name="email" />
        </label>
        <label>
          <span>Your message:</span>
          <textarea name="message"></textarea>
        </label>
        <button type="submit">Submit</button>
        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  );
}
//Action function
// Request object is a object wrapping all the form inputs
export const contactAction = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };
  if (!submission.email) {
    return { error: "Email is required." };
  }
  if (submission.message.length < 10) {
    return { error: "Message must be over 10 chars long." };
  }
  if (submission.message.length > 20) {
    return { error: "Message must be under 20 chars long." };
  }
    console.log(submission);
    return redirect("/");

};
