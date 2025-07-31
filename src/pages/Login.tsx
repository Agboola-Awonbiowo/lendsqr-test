import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import "../styles/Login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <div className="login__logo">
            <div className="logo">
              <Logo height={40} width={145} className="logo__image" />
            </div>
          </div>
          <div className="login__illustration">
            <div className="illustration">
              <div className="illustration__character">
                <div className="character">
                  <div className="character__head"></div>
                  <div className="character__body"></div>
                  <div className="character__briefcase"></div>
                </div>
              </div>
              <div className="illustration__shapes">
                <div className="shape shape--ring"></div>
                <div className="shape shape--pill"></div>
                <div className="shape shape--crescent"></div>
                <div className="shape shape--star"></div>
                <div className="shape shape--sphere"></div>
                <div className="shape shape--prism"></div>
              </div>
              <div className="illustration__speech-bubble">
                <div className="speech-bubble">
                  <div className="speech-bubble__line"></div>
                  <div className="speech-bubble__line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login__right">
          <div className="login__form-container">
            <h1 className="login__title">Welcome!</h1>
            <p className="login__subtitle">Enter details to login.</p>

            <form className="login__form" onSubmit={handleSubmit}>
              {error && <div className="login__error">{error}</div>}

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div className="login__forgot-password">
                <button type="button" className="forgot-password-link">
                  FORGOT PASSWORD?
                </button>
              </div>

              <button
                type="submit"
                className="btn btn--primary login__submit"
                disabled={isLoading}
              >
                {isLoading ? "LOGGING IN..." : "LOG IN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
