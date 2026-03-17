import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginData } from "../../types"; // O Schema que criamos antes!
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginPage.module.css";
import imgLogin from "../../assets/imgLoginPAge.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Configuração do Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema) // Aqui a mágica do Zod acontece
  });

  const onSubmit = async (dados: LoginData) => {
    try {
      await login(dados);
      navigate ("/")
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.imageSection}>
        <img src={imgLogin} alt="Família comprando roupas infantis" />
      </section>
      <section className={styles.loginSection}>
        <h1 className={styles.title}>Bem-vindo!</h1>
        
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          {/* Campo E-mail */}
          <div className={styles.inputGroup}>
            <input 
              {...register("email")} 
              type="email" 
              placeholder="E-mail" 
              className={errors.email ? styles.inputError : styles.input} 
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
          </div>

          {/* Campo Senha */}
          <div className={styles.inputGroup}>
            <input 
              {...register("senha")} 
              type="password" 
              placeholder="Senha" 
              className={errors.senha ? styles.inputError : styles.input} 
            />
            {errors.senha && <span className={styles.errorMessage}>{errors.senha.message}</span>}
          </div>

          <div className={styles.linksContainer}>
            <a href="#" className={styles.link}>Esqueci minha senha</a>
            <a href="#" className={styles.link}>Criar conta</a>
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </section>

    </div>
  );
};

export default LoginPage;