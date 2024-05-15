import Link from "next/link";

const Contact = () => {
  return (
    <div>
      <Link href={"/contacts/faq"}>Faq</Link>
      <Link href={"/contacts/help"}>Help</Link>
    </div>
  );
};

export default Contact;
