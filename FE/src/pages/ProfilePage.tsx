import { FormEvent, useState } from 'react';
import { useBookstore } from '../context/BookstoreContext';

export default function ProfilePage() {
  const { currentUser, updateUserProfile, showToast } = useBookstore();
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (!currentUser) return <div className="container" style={{ padding: 60 }}>Loading...</div>;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const updated = await Promise.resolve(
      updateUserProfile(currentUser.id, {
        firstName: fd.get('firstName') as string,
        lastName: fd.get('lastName') as string,
        phone: fd.get('phone') as string,
        gender: fd.get('gender') as string,
        birthday: {
          day: fd.get('birthdayDay') as string,
          month: fd.get('birthdayMonth') as string,
          year: fd.get('birthdayYear') as string,
        },
        address: {
          street: fd.get('street') as string,
          city: fd.get('city') as string,
          state: fd.get('state') as string,
          zipCode: fd.get('zipCode') as string,
          country: 'Vietnam',
        },
      })
    );
    if (updated) showToast('Cập nhật thông tin thành công', 'success');
  };

  const onChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Đổi mật khẩu qua API sẽ được bổ sung sau. Có thể reset mật khẩu trong database nếu cần.', 'info');
  };

  return (
    <>
      <section className="profile-section">
        <div className="container">
          <div className="profile-wrapper">
            <div className="profile-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <h1 className="profile-title">Hồ sơ cá nhân</h1>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowChangePassword(true)}
              >
                <i className="fas fa-key"></i> Đổi mật khẩu
              </button>
            </div>

            <form onSubmit={onSubmit} className="profile-form">
              {/* Họ */}
              <div className="profile-form-row">
                <label htmlFor="firstName" className="profile-label">
                  Họ<span className="required">*</span>
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="profile-input"
                    defaultValue={currentUser.firstName}
                    required
                  />
                </div>
              </div>

              {/* Tên */}
              <div className="profile-form-row">
                <label htmlFor="lastName" className="profile-label">
                  Tên<span className="required">*</span>
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="profile-input"
                    defaultValue={currentUser.lastName}
                    required
                  />
                </div>
              </div>

              {/* Số điện thoại */}
              <div className="profile-form-row">
                <label htmlFor="phone" className="profile-label">
                  Số điện thoại
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="profile-input"
                    defaultValue={currentUser.phone}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="profile-form-row">
                <label htmlFor="email" className="profile-label">
                  Email
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="email"
                    id="email"
                    className="profile-input"
                    defaultValue={currentUser.email}
                    disabled
                  />
                </div>
              </div>

              {/* Giới tính */}
              <div className="profile-form-row">
                <label className="profile-label">
                  Giới tính<span className="required">*</span>
                </label>
                <div className="profile-input-wrapper">
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        className="radio-input"
                        defaultChecked={currentUser.gender === 'Nam'}
                        required
                      />
                      <span className="radio-custom"></span>
                      <span className="radio-text">Nam</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        className="radio-input"
                        defaultChecked={currentUser.gender === 'Nữ'}
                        required
                      />
                      <span className="radio-custom"></span>
                      <span className="radio-text">Nữ</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Birthday */}
              <div className="profile-form-row">
                <label className="profile-label">
                  Ngày sinh<span className="required">*</span>
                </label>
                <div className="profile-input-wrapper">
                  <div className="birthday-group">
                    <input
                      type="text"
                      id="birthdayDay"
                      name="birthdayDay"
                      className="profile-input birthday-input"
                      placeholder="Ngày"
                      maxLength={2}
                      defaultValue={currentUser.birthday?.day}
                      required
                    />
                    <input
                      type="text"
                      id="birthdayMonth"
                      name="birthdayMonth"
                      className="profile-input birthday-input"
                      placeholder="Tháng"
                      maxLength={2}
                      defaultValue={currentUser.birthday?.month}
                      required
                    />
                    <input
                      type="text"
                      id="birthdayYear"
                      name="birthdayYear"
                      className="profile-input birthday-input"
                      placeholder="Năm"
                      maxLength={4}
                      defaultValue={currentUser.birthday?.year}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Địa chỉ */}
              <div className="profile-form-row">
                <label htmlFor="street" className="profile-label">
                  Địa chỉ
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className="profile-input"
                    defaultValue={currentUser.address?.street}
                  />
                </div>
              </div>

              {/* Thành phố */}
              <div className="profile-form-row">
                <label htmlFor="city" className="profile-label">
                  Thành phố
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="profile-input"
                    defaultValue={currentUser.address?.city}
                  />
                </div>
              </div>

              {/* Tỉnh/Thành */}
              <div className="profile-form-row">
                <label htmlFor="state" className="profile-label">
                  Tỉnh/Thành
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="profile-input"
                    defaultValue={currentUser.address?.state}
                  />
                </div>
              </div>

              {/* Mã bưu điện */}
              <div className="profile-form-row">
                <label htmlFor="zipCode" className="profile-label">
                  Mã bưu điện
                </label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="profile-input"
                    defaultValue={currentUser.address?.zipCode}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="profile-form-row">
                <div className="profile-submit-wrapper">
                  <button type="submit" className="btn-profile-save">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

      {/* Change Password Modal */}
      {showChangePassword && (
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
            onClick={() => setShowChangePassword(false)}
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
              <h2>Đổi Mật Khẩu</h2>
              <form onSubmit={onChangePassword} style={{ marginTop: 20 }}>
                <div className="form-group">
                  <label>Mật khẩu cũ *</label>
                  <input type="password" name="oldPassword" className="form-input" required autoFocus />
                </div>
                <div className="form-group">
                  <label>Mật khẩu mới *</label>
                  <input type="password" name="newPassword" className="form-input" required minLength={6} />
                  <small style={{ color: '#666', fontSize: '0.85rem' }}>Tối thiểu 6 ký tự</small>
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu mới *</label>
                  <input type="password" name="confirmPassword" className="form-input" required minLength={6} />
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button
                    type="button"
                    onClick={() => setShowChangePassword(false)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    <i className="fas fa-save"></i> Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
}
