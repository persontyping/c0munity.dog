"use client";

import { useState } from "react";

export default function ContactForm() {
    const [form, setForm] = useState({
        intent: "say-hi",
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = (await res.json()) as { error?: string };
                throw new Error(data.error ?? "Unable to send message.");
            }

            setStatus("success");
            setForm({ intent: "say-hi", name: "", email: "", message: "" });
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Unexpected error occurred."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="p-15">
            <div className=" px-4 py-10 mx-auto flex flex-col">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 text-3xl">
                    <div className="flex gap-9">
                        <label className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="intent"
                                value="say-hi"
                                checked={form.intent === "say-hi"}
                                onChange={handleChange}
                                className="w-7 h-7 accent-[#b9ff66]"
                            />
                            <span className="justify-start text-3xl font-normal">
                                Say Hi
                            </span>
                        </label>

                        <label className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="intent"
                                value="get-a-quote"
                                checked={form.intent === "get-a-quote"}
                                onChange={handleChange}
                                className="w-7 h-7 accent-[#b9ff66]"
                            />
                            <span className="justify-start text-3xl font-normal">
                                Get a Quote
                            </span>
                        </label>
                    </div>

                    <div className="w-full flex flex-col justify-start items-start gap-6">

                        <div className="w-full">
                            <label className="text-3xl font-normal leading-7">
                                Name*
                            </label>
                            <input
                                placeholder=""
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="mt-2 w-full px-6 py-4 bg-white rounded-xl outline-1 -outline-offset-1 outline-black overflow-hidden text-[#898989] text-3xl font-normal"
                            />
                        </div>

                        <div className="w-full">
                            <label className="dark:text-white text-3xl font-normal leading-7">
                                Email*
                            </label>
                            <input
                                placeholder=""
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-2 w-full px-6 py-4 text-3xl rounded-xl outline-1 -outline-offset-1 outline-black overflow-hidden text-[#898989] font-normal"
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-3xl  font-normal leading-7">
                                Message*
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="mt-2 w-full resize-none px-6 py-4 bg-white rounded-xl outline-1 -outline-offset-1 outline-black overflow-hidden text-[#898989] text-3xl font-normal"
                                placeholder=""
                                cols={40}
                                rows={10}
                            />
                        </div>

                    </div>

                    {status === "success" ? (
                        <p className="rounded-md bg-green-50 px-3 py-2 text-3xl text-green-800">
                            Message sent. We will get back to you soon.
                        </p>
                    ) : null}

                    {status === "error" ? (
                        <p className="rounded-md bg-red-50 px-3 py-2 text-3xl text-red-700">
                            {errorMessage}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-9 py-5 text-3xl rounded-2xl text-white border-2 border-pink-600 font-normal leading-7 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                </form>
            </div>
        </section>


    );
}