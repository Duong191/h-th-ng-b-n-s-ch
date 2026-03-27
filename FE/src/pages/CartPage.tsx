import { useState, useMemo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import { formatPrice, fixImagePath } from '../utils/format';

export default function CartPage() {
  const navigate = useNavigate();
  const { getCartItems, updateCartItem, removeFromCart } = useBookstore();
  const items = getCartItems();
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      initial[item.bookId] = true;
    });
    setSelectedItems(initial);
  }, [items.length]);

  const selectedCount = useMemo(() => {
    return Object.values(selectedItems).filter(Boolean).length;
  }, [selectedItems]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      if (selectedItems[item.bookId]) {
        return sum + item.total;
      }
      return sum;
    }, 0);
  }, [items, selectedItems]);

  const allSelected = items.length > 0 && items.every((item) => selectedItems[item.bookId]);

  const toggleSelectAll = () => {
    const newSelected: Record<string, boolean> = {};
    items.forEach((item) => {
      newSelected[item.bookId] = !allSelected;
    });
    setSelectedItems(newSelected);
  };

  const toggleItem = (bookId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const proceedToCheckout = () => {
    if (selectedCount === 0) return;
    const selected = items.filter((item) => selectedItems[item.bookId]);
    sessionStorage.setItem('checkoutItems', JSON.stringify(selected));
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-section">
        <div className="container">
          <div className="cart-layout empty-cart-layout">
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h2>Giỏ hàng trống</h2>
              <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
              <NavLink to="/shop" className="btn btn-primary">
                <i className="fas fa-shopping-bag"></i>
                Bắt đầu mua sắm
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <NavLink to="/">Trang chủ</NavLink>
          <span>/</span>
          <span>Giỏ hàng</span>
        </div>
      </div>

      {/* Cart Section */}
      <section className="cart-section">
        <div className="container">
          <div className="cart-header">
            <h1>GIỎ HÀNG ({items.length} sản phẩm)</h1>
          </div>

          <div className="cart-layout">
            {/* Cột trái: Danh sách sản phẩm */}
            <div className="cart-main">
              {/* Header: Checkbox chọn tất cả */}
              <div className="cart-header-row">
                <input type="checkbox" id="selectAll" checked={allSelected} onChange={toggleSelectAll} />
                <label htmlFor="selectAll">
                  Chọn tất cả ({items.length} sản phẩm)
                </label>
              </div>

              {/* Container danh sách sản phẩm */}
              <div className="cart-items">
                {items.map((item) => {
                  const isSelected = selectedItems[item.bookId] || false;
                  const imgRaw = (item.book as any).images?.[0] || item.book.image;
                  const img = fixImagePath(imgRaw);
                  const originalPrice =
                    item.book.discount > 0
                      ? Math.round(item.book.price / (1 - item.book.discount / 100))
                      : item.price;

                  return (
                    <div key={item.bookId} className={`cart-item ${isSelected ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        className="item-checkbox"
                        checked={isSelected}
                        onChange={() => toggleItem(item.bookId)}
                      />

                      <div className="item-image">
                        <img src={img} alt={item.book.title} />
                      </div>

                      <div className="item-details">
                        <h3 className="item-title">{item.book.title}</h3>
                        <p className="item-author">{item.book.author}</p>
                        {item.book.discount > 0 && (
                          <span className="item-discount-badge">-{item.book.discount}%</span>
                        )}
                      </div>

                      <div className="item-price">
                        <span className="current-price">{formatPrice(item.price)}</span>
                        {item.book.discount > 0 && (
                          <span className="original-price">{formatPrice(originalPrice)}</span>
                        )}
                      </div>

                      <div className="item-quantity">
                        <button
                          className="quantity-btn"
                          onClick={() => updateCartItem(item.bookId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            updateCartItem(item.bookId, Math.max(1, Math.min(item.book.stock, val)));
                          }}
                          min="1"
                          max={item.book.stock}
                        />
                        <button
                          className="quantity-btn"
                          onClick={() => updateCartItem(item.bookId, item.quantity + 1)}
                          disabled={item.quantity >= item.book.stock}
                        >
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        <span className="total-price">{formatPrice(item.total)}</span>
                      </div>

                      <button className="item-remove" onClick={() => removeFromCart(item.bookId)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cột phải: Tổng tiền và thanh toán */}
            <div className="cart-sidebar">
              <div className="cart-summary">
                <h3 className="summary-title">Tóm tắt đơn hàng</h3>

                <div className="summary-row">
                  <span className="summary-label">Thành tiền:</span>
                  <span className="summary-value">{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row summary-total">
                  <span className="summary-label">Tổng Số Tiền (gồm VAT):</span>
                  <span className="summary-value">{formatPrice(subtotal)}</span>
                </div>

                <button
                  className="checkout-btn"
                  onClick={proceedToCheckout}
                  disabled={selectedCount === 0}
                >
                  THANH TOÁN
                </button>

                <div className="checkout-note">(Giảm giá trên web chỉ áp dụng cho bán lẻ)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
