"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Input, Button } from "@/components/ui";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error al enviar el mensaje");
    }
  };

  const contactMethods = [
    {
      href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || ""}?text=${encodeURIComponent("Hola, me gustaría recibir más información.")}`,
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: "WhatsApp",
      desc: "Respuesta rápida y directa",
      bg: "bg-green-500/10 border-green-500/20",
      hover: "hover:border-green-500/30",
      textHover: "group-hover:text-green-400",
    },
    {
      href: null,
      icon: (
        <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: "Email",
      desc: "contacto@perfumesexclusivos.mx",
      bg: "bg-gold-500/10 border-gold-500/20",
      hover: "",
      textHover: "",
    },
    {
      href: null,
      icon: (
        <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: "Ubicación",
      desc: "Ciudad de México, México",
      bg: "bg-gold-500/10 border-gold-500/20",
      hover: "",
      textHover: "",
    },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Contacto
          </h1>
          <p className="text-midnight-300 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos a la brevedad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nombre"
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Teléfono (opcional)"
                id="phone"
                name="phone"
                type="tel"
                placeholder="+52 55 1234 5678"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="w-full">
                <label htmlFor="message" className="block text-sm font-medium text-midnight-200 mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Escribe tu mensaje..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-midnight-800/80 border border-midnight-600 rounded-lg text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500/50 transition-all duration-200 resize-none"
                />
              </div>
              <Button type="submit" size="lg" loading={status === "loading"}>
                Enviar Mensaje
              </Button>
              {status === "success" && (
                <p className="text-green-400 text-sm">Mensaje enviado correctamente. Te contactaremos pronto.</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactMethods.map((method, i) => {
              const content = (
                <div className={`flex items-center gap-4 p-6 bg-midnight-800/40 border border-midnight-700/50 rounded-xl ${method.hover} transition-colors group`}>
                  <div className={`w-12 h-12 rounded-lg ${method.bg} flex items-center justify-center shrink-0`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className={`font-serif text-lg text-white ${method.textHover} transition-colors`}>{method.label}</h3>
                    <p className="text-midnight-400 text-sm">{method.desc}</p>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  {method.href ? (
                    <a href={method.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
