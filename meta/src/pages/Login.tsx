import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const VALID_EMAIL =
  "admin@metaconsultoria.com";

const VALID_PASSWORD =
  "Meta#123";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { darkMode, toggleTheme } =
    useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      email === VALID_EMAIL &&
      password === VALID_PASSWORD
    ) {
      login(email);
      navigate("/adm");
    } else {
      setError("Credenciais inválidas");
    }
  }

  return (
  <div
    className={`
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      ${
        darkMode
          ? "bg-slate-900"
          : "bg-slate-100"
      }
    `}
  >
    <div
      className={`
        w-full
        max-w-md
        p-10
        rounded-2xl
        shadow-2xl
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-[#080808] text-white"
            : "bg-slate-50 text-slate-900"
        }
      `}
    >
      <div className="flex justify-between items-center mb-8">
        <h1
          className={`
            text-4xl
            font-bold
            ${
              darkMode
                ? "text-white"
                : "text-violet-700"
            }
          `}
        >
          Login
        </h1>

        <button
          type="button"
          onClick={toggleTheme}
          className="
            text-sm
            px-3
            py-2
            rounded-full
            bg-violet-600
            text-white
            hover:bg-violet-700
            transition
          "
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className={`
            w-full
            h-12
            px-4
            rounded-full
            border
            transition-all
            focus:outline-none
            focus:ring-2
            focus:ring-violet-500
            ${
              darkMode
                ? "bg-transparent text-white border-violet-500 placeholder:text-slate-400"
                : "bg-slate-200 text-slate-900 border-violet-500 placeholder:text-slate-500"
            }
          `}
        />

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className={`
              w-full
              h-12
              px-4
              pr-24
              rounded-full
              border
              transition-all
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
              ${
                darkMode
                  ? "bg-transparent text-white border-violet-500 placeholder:text-slate-400"
                  : "bg-slate-200 text-slate-900 border-violet-500 placeholder:text-slate-500"
              }
            `}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className={`
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-sm
              font-medium
              ${
                darkMode
                  ? "text-violet-300 hover:text-white"
                  : "text-violet-700 hover:text-violet-900"
              }
            `}
          >
            {showPassword
              ? "Ocultar"
              : "Mostrar"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-full
            font-semibold
            text-white
            bg-gradient-to-r
            from-violet-600
            to-purple-500
            hover:scale-[1.02]
            transition-all
            duration-200
          "
        >
          ENTRAR
        </button>
      </form>
    </div>
  </div>
);
}