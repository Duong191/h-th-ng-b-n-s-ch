import { NavLink } from 'react-router-dom';
import type { CSSProperties } from 'react';

export default function Footer() {
  const placeholderLinkButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    color: 'inherit',
    font: 'inherit',
    textAlign: 'left',
    cursor: 'pointer',
  };

  const socialPlaceholderButtonStyle: CSSProperties = {
    ...placeholderLinkButtonStyle,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Về Bookarazi</h3>
            <p>
              Chúng tôi cung cấp hàng ngàn đầu sách chất lượng với giá tốt nhất. Mang tri thức đến gần hơn với mọi
              người.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/no.coten.7773" target="_blank" rel="noopener noreferrer">
                <img src="/icon/Social/facebook.png" alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com/no.coten.7773" target="_blank" rel="noopener noreferrer">
                <img src="/icon/Social/instagram.png" alt="Instagram" className="social-icon" />
              </a>
              {/* Placeholder mạng xã hội: chưa có URL chính thức nên dùng button để đúng accessibility. */}
              <button type="button" aria-label="TikTok (sắp cập nhật)" style={socialPlaceholderButtonStyle}>
                <img src="/icon/Social/tik-tok.png" alt="TikTok" className="social-icon" />
              </button>
              {/* Placeholder mạng xã hội: chưa có URL chính thức nên dùng button để đúng accessibility. */}
              <button type="button" aria-label="YouTube (sắp cập nhật)" style={socialPlaceholderButtonStyle}>
                <img src="/icon/Social/youtube.png" alt="YouTube" className="social-icon" />
              </button>
            </div>
          </div>
          <div className="footer-col">
            <h3>Liên Kết</h3>
            <ul>
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/about">Giới thiệu</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Cửa hàng</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Liên hệ</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Hỗ Trợ</h3>
            <ul>
              <li>
                {/* Link placeholder: giữ text UI, chưa có route thực tế. */}
                <button type="button" style={placeholderLinkButtonStyle}>
                  Chính sách đổi trả
                </button>
              </li>
              <li>
                {/* Link placeholder: giữ text UI, chưa có route thực tế. */}
                <button type="button" style={placeholderLinkButtonStyle}>
                  Phương thức thanh toán
                </button>
              </li>
              <li>
                {/* Link placeholder: giữ text UI, chưa có route thực tế. */}
                <button type="button" style={placeholderLinkButtonStyle}>
                  Vận chuyển
                </button>
              </li>
              <li>
                {/* Link placeholder: giữ text UI, chưa có route thực tế. */}
                <button type="button" style={placeholderLinkButtonStyle}>
                  Câu hỏi thường gặp
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Liên Hệ</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt" /> 123 Đường ABC, Quận 1, TP.HCM
              </li>
              <li>
                <i className="fas fa-phone" /> 0586612788
              </li>
              <li>
                <i className="fas fa-envelope" /> contact@bookarazi.com
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Bookarazi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
