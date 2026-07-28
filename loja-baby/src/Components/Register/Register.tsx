import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  endereco: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres")
});

type RegisterData = z.infer<typeof RegisterSchema>;

const Register: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  });

  const onSubmit = async (data: RegisterData) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      const base = (import.meta as any).env?.VITE_API_BASE || "";
      const url = base ? `${base.replace(/\/$/, "")}/cadastro` : "/cadastro";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        const message = body?.message || body?.error || "Erro ao cadastrar usuário";
        setServerError(message);
        return;
      }

      setSuccessMessage("Cadastro realizado com sucesso! Fazendo login automático...");
      const userData = {
        email: data.email,
        senha: data.senha
      };

      // Registrar e em seguida tentar logar automaticamente
      try {
        await login(userData);
      } catch (loginError: any) {
        console.warn("Falha no auto-login após cadastro:", loginError);
      }

      setTimeout(() => {
        setRedirecting(true);
        setTimeout(() => navigate("/"), 600);
      }, 2000);
    } catch (err: any) {
      setServerError(err?.message || "Erro de rede");
    }
  };

  return (
    <div className={`${styles.container} ${redirecting ? styles.redirecting : ""}`}>
      <h2 className={styles.title}>Criar Conta</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input {...register("nome")} placeholder="Nome" className={errors.nome ? styles.inputError : styles.input} />
          {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
        </div>

        <div className={styles.field}>
          <input {...register("email")} type="email" placeholder="E-mail" className={errors.email ? styles.inputError : styles.input} />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.field}>
          <input {...register("senha")} type="password" placeholder="Senha" className={errors.senha ? styles.inputError : styles.input} />
          {errors.senha && <span className={styles.error}>{errors.senha.message}</span>}
        </div>

        <div className={styles.field}>
          <textarea {...register("endereco")} placeholder="Endereço completo" className={errors.endereco ? styles.inputError : styles.input} />
          {errors.endereco && <span className={styles.error}>{errors.endereco.message}</span>}
        </div>

        {serverError && <div className={styles.serverError}>{serverError}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Register;
