import { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, currentUser, showToast } = useBookstore();

  useEffect(() => {
    if (params.get('tab') === 'register') setTab('register');
  }, [params]);

  useEffect(() => {
    if (currentUser) {
      const to = location.state?.from?.pathname || '/';
      navigate(to, { replace: true });
    }
  }, [currentUser, navigate, location.state]);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get('email') as string;
    const password = fd.get('password') as string;
    const success = await Promise.resolve(login(email, password));
    if (success) {
      const to = location.state?.from?.pathname || '/';
      navigate(to, { replace: true });
    }
  }

  function onForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showToast('Quên mật khẩu: liên hệ quản trị hoặc reset mật khẩu trong database.', 'info');
    setShowForgotPassword(false);
    setTab('login');
  }

  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pw = fd.get('password') as string;
    const cpw = fd.get('confirmPassword') as string;
    const email = fd.get('email') as string;
    const name = fd.get('name') as string;
    const phone = (fd.get('phone') as string) || '';

    if (pw !== cpw) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    const r = await Promise.resolve(register(name, email, pw, phone));

    if (r.success && r.userId) {
      showToast('Đăng ký và đăng nhập thành công!', 'success');
      navigate('/', { replace: true });
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-section">
        <div className="container">
          <div className="auth-wrapper">
            <div className="auth-card">
              <div className="auth-tabs">
                <button type="button" className={`tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  className={`tab-btn ${tab === 'register' ? 'active' : ''}`}
                  onClick={() => setTab('register')}
                >
                  Đăng Ký
                </button>
              </div>

              {tab === 'login' ? (
                <div id="loginForm" className="auth-form active">
                  <div className="form-header">
                    <h2 className="auth-title">Đăng Nhập</h2>
                    <p className="auth-subtitle">Chào mừng bạn quay trở lại Bookarazi</p>
                  </div>
                  <form className="auth-form-body" onSubmit={onLogin}>
                    <div className="form-group">
                      <label htmlFor="loginEmail">Email *</label>
                      <input type="email" id="loginEmail" name="email" className="form-input" required autoComplete="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Mật khẩu *</label>
                      <input
                        type="password"
                        id="loginPassword"
                        name="password"
                        className="form-input"
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block auth-submit-btn">
                      <i className="fas fa-sign-in-alt" /> Đăng Nhập
                    </button>
                    <div style={{ textAlign: 'center', marginTop: 15 }}>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                  </form>
                  <div className="demo-accounts">
                    <h3>Tài khoản demo</h3>
                    <div className="demo-account">
                      <strong>Admin:</strong> admin@bookstore.com / admin123
                    </div>
                    <div className="demo-account">
                      <strong>User:</strong> user@example.com / user123
                    </div>
                  </div>
                </div>
              ) : (
                <div id="registerForm" className="auth-form active">
                  <div className="form-header">
                    <h2 className="auth-title">Đăng Ký</h2>
                    <p className="auth-subtitle">Tạo tài khoản mới</p>
                  </div>
                  <form className="auth-form-body" onSubmit={onRegister}>
                    <div className="form-group">
                      <label htmlFor="registerName">Họ và tên *</label>
                      <input type="text" id="registerName" name="name" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerEmail">Email *</label>
                      <input type="email" id="registerEmail" name="email" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerPhone">Số điện thoại</label>
                      <input type="tel" id="registerPhone" name="phone" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerPassword">Mật khẩu *</label>
                      <input type="password" id="registerPassword" name="password" className="form-input" required minLength={6} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                      <input type="password" id="confirmPassword" name="confirmPassword" className="form-input" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block auth-submit-btn">
                      <i className="fas fa-user-plus" /> Đăng Ký
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="container" style={{ textAlign: 'center', marginBottom: 40 }}>
        <NavLink to="/">Về trang chủ</NavLink>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowForgotPassword(false)}
        >
          <div
            style={{
              background: 'white',
              padding: 40,
              borderRadius: 10,
              maxWidth: 500,
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Quên Mật Khẩu</h2>
            <p style={{ color: '#666', marginTop: 10 }}>
              Nhập email của bạn để nhận mật khẩu mới
            </p>
            <form onSubmit={onForgotPassword} style={{ marginTop: 20 }}>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" className="form-input" required autoFocus />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Reset mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
