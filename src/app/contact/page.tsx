import ContactForm from "@/components/forms/contact-form";
export default function Contact() {
  return (
  <div className="min-h-lvh flex flex-row flex-wrap justify-center items-center border-amber-100 border-2 rounded gap-4 ">
        <div className="p-30 m-30 flex flex-row border-2 border-amber-400 items-center justify-center rounded">
            <ContactForm />
        </div>
    </div>
  );
}