import { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { resetPasswordByEmailRequest } from '../api/authApi';
import { useBookstore } from '../context/BookstoreContext';
import { useAuth } from '../hooks/useAuth';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login, register } = useAuth();
  const { showToast } = useBookstore();

  useEffect(() => {
    if (params.get('tab') === 'register') setTab('register');
  }, [params]);

  useAuthRedirect(currentUser, location.state?.from?.pathname);

  /** Đăng nhập và quay lại trang user đang đứng trước khi bị chặn auth. */
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

  /** Quên mật khẩu: reset theo email về mật khẩu mặc định từ backend. */
  async function onForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = (fd.get('forgotEmail') as string)?.trim() || '';
    if (!email) {
      showToast('Vui lòng nhập email.', 'error');
      return;
    }
    try {
      await resetPasswordByEmailRequest(email);
      showToast('Đã đặt lại mật khẩu. Đăng nhập bằng mật khẩu mặc định: 1', 'success');
      setShowForgotPassword(false);
      setTab('login');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không thể đặt lại mật khẩu.';
      showToast(msg, 'error');
    }
  }

  /** Đăng ký tài khoản mới và tự đăng nhập ngay sau khi tạo thành công. */
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
    <div className="lg-page">
      {/* Vòng blur trang trí phong cách Liquid Glass */}
      <div className="lg-blob lg-blob-1" />
      <div className="lg-blob lg-blob-2" />
      <div className="lg-blob lg-blob-3" />

      <div className="lg-card">
        {/* Segmented control kiểu iOS - data-tab điều khiển thanh trượt CSS */}
        <div className="lg-segmented" data-tab={tab} role="tablist">
          <button
            type="button"
            className={`lg-segment ${tab === 'login' ? 'is-active' : ''}`}
            onClick={() => setTab('login')}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            className={`lg-segment ${tab === 'register' ? 'is-active' : ''}`}
            onClick={() => setTab('register')}
          >
            Đăng Ký
          </button>
        </div>

        {tab === 'login' ? (
          <div id="loginForm" className="lg-auth-panel">
            <h2 className="lg-title">Đăng Nhập</h2>
            <p className="lg-subtitle">Chào mừng bạn quay trở lại Bookarazi</p>

            <form onSubmit={onLogin}>
              <div className="lg-group">
                <label className="lg-label" htmlFor="loginEmail">Email *</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  className="lg-input"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="lg-group">
                <label className="lg-label" htmlFor="loginPassword">Mật khẩu *</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  className="lg-input"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="lg-submit">
                <i className="fas fa-sign-in-alt" /> Đăng Nhập
              </button>
              <div className="lg-forgot-wrap">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="lg-forgot-link"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </form>

            <div className="lg-demo-panel">
              <h3>Tài khoản demo (mật khẩu: 1)</h3>
              <div className="lg-demo-item"><strong>Admin:</strong> admin@bookstore.com</div>
              <div className="lg-demo-item"><strong>Staff:</strong> staff@bookstore.com</div>
              <div className="lg-demo-item"><strong>User:</strong> user@example.com</div>
            </div>
          </div>
        ) : (
          <div id="registerForm" className="lg-auth-panel">
            <h2 className="lg-title">Đăng Ký</h2>
            <p className="lg-subtitle">Tạo tài khoản mới</p>

            <form onSubmit={onRegister}>
              <div className="lg-group">
                <label className="lg-label" htmlFor="registerName">Họ và tên *</label>
                <input
                  type="text"
                  id="registerName"
                  name="name"
                  className="lg-input"
                  required
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="lg-group">
                <label className="lg-label" htmlFor="registerEmail">Email *</label>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  className="lg-input"
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="lg-group">
                <label className="lg-label" htmlFor="registerPhone">Số điện thoại</label>
                <input
                  type="tel"
                  id="registerPhone"
                  name="phone"
                  className="lg-input"
                  placeholder="09xx xxx xxx"
                />
              </div>
              <div className="lg-group">
                <label className="lg-label" htmlFor="registerPassword">Mật khẩu *</label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  className="lg-input"
                  required
                  minLength={6}
                  placeholder="Tối thiểu 6 ký tự"
                />
              </div>
              <div className="lg-group">
                <label className="lg-label" htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="lg-input"
                  required
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
              <button type="submit" className="lg-submit">
                <i className="fas fa-user-plus" /> Đăng Ký
              </button>
            </form>
          </div>
        )}
      </div>

      <NavLink to="/" className="lg-home-link">← Về trang chủ</NavLink>

      {/* Modal quên mật khẩu - click backdrop để đóng, stopPropagation ở card */}
      {showForgotPassword && (
        <div
          className="lg-modal-backdrop"
          onClick={() => setShowForgotPassword(false)}
        >
          <div
            className="lg-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Quên Mật Khẩu</h2>
            <p style={{ marginTop: 10 }}>
              Nhập email đã đăng ký. Mật khẩu sẽ được đặt lại thành <strong>1</strong> (giống tài khoản demo).
            </p>
            <form onSubmit={onForgotPassword} style={{ marginTop: 20 }}>
              <div className="lg-group">
                <label className="lg-label" htmlFor="forgotEmail">Email *</label>
                <input
                  type="email"
                  id="forgotEmail"
                  name="forgotEmail"
                  className="lg-input"
                  required
                  autoComplete="email"
                  autoFocus
                  placeholder="you@example.com"
                />
              </div>
              <div className="lg-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="lg-btn-secondary"
                >
                  Hủy
                </button>
                <button type="submit" className="lg-submit" style={{ marginTop: 0 }}>
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
