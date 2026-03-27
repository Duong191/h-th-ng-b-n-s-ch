import { NavLink } from 'react-router-dom';

export default function Footer() {
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
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/icon/Social/tik-tok.png" alt="TikTok" className="social-icon" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/icon/Social/youtube.png" alt="YouTube" className="social-icon" />
              </a>
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
                <a href="#">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#">Phương thức thanh toán</a>
              </li>
              <li>
                <a href="#">Vận chuyển</a>
              </li>
              <li>
                <a href="#">Câu hỏi thường gặp</a>
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
                <i className="fas fa-phone" /> 0932092002
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
