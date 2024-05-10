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
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Your message:</span>
          <textarea name="message" required></textarea>
        </label>
        <button>Submit</button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  );
}

export const contactAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };

  console.log(submission);
  if (submission.message.length < 10) {
    return { error: "Message must be over 10 chars long." };
  }
  
  return redirect("/");
};
