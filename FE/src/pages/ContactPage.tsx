import { FormEvent } from 'react';

export default function ContactPage() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="contact-page">
      <div className="container" style={{ padding: 40 }}>
        <h1>Liên Hệ</h1>
        <div style={{ marginTop: 40 }}>
          <div style={{ marginBottom: 40 }}>
            <h2>Thông tin liên hệ</h2>
            <p>
              <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM<br />
              <strong>Điện thoại:</strong> 0932092002<br />
              <strong>Email:</strong> contact@bookarazi.com
            </p>
          </div>
          <form onSubmit={onSubmit} style={{ maxWidth: 600 }}>
            <h2>Gửi tin nhắn</h2>
            <div className="form-group">
              <label>Họ tên *</label>
              <input type="text" name="name" className="form-input" required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" className="form-input" required />
            </div>
            <div className="form-group">
              <label>Tiêu đề *</label>
              <input type="text" name="subject" className="form-input" required />
            </div>
            <div className="form-group">
              <label>Nội dung *</label>
              <textarea name="message" className="form-input" rows={6} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
