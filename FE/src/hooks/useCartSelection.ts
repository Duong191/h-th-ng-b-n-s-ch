import { useEffect, useMemo, useState } from 'react';
import type { CartItemWithDetails } from '../types/bookstore.types';

interface UseCartSelectionResult {
  selectedItems: Record<string, boolean>;
  selectedItemIds: string[];
  selectedCount: number;
  subtotal: number;
  allSelected: boolean;
  toggleItem: (bookId: string) => void;
  toggleSelectAll: () => void;
}

/**
 * Quản lý trạng thái chọn sản phẩm trong giỏ hàng.
 * - Lưu map `bookId -> selected` để truy cập nhanh khi render từng item.
 * - Tính toán tổng số dòng đã chọn + tổng tiền của các dòng đã chọn.
 * - Cung cấp hàm chọn/bỏ chọn từng dòng và chọn/bỏ chọn toàn bộ danh sách.
 */
export function useCartSelection(items: CartItemWithDetails[]): UseCartSelectionResult {
  /**
   * State chọn theo từng `bookId`.
   * Giữ nguyên hành vi cũ: khi số lượng dòng cart thay đổi (`items.length`), reset về trạng thái chọn tất cả.
   */
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      initial[item.bookId] = true;
    });
    setSelectedItems(initial);
    /**
     * Chủ đích chỉ phụ thuộc `items.length` để giữ đúng behavior hiện tại:
     * - Chỉ reset selection khi số dòng cart thay đổi (thêm/xóa item).
     * - KHÔNG reset khi object/reference của `items` đổi do re-render hay cập nhật field khác.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  /** Danh sách id sách đang được chọn (hữu ích cho checkout/analytics). */
  const selectedItemIds = useMemo(() => {
    return Object.keys(selectedItems).filter((bookId) => selectedItems[bookId]);
  }, [selectedItems]);

  /** Tổng số dòng cart đang được chọn. */
  const selectedCount = useMemo(() => {
    return selectedItemIds.length;
  }, [selectedItemIds]);

  /** Tổng tiền chỉ tính trên các dòng đang chọn. */
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      if (selectedItems[item.bookId]) return sum + item.total;
      return sum;
    }, 0);
  }, [items, selectedItems]);

  /** Trạng thái "chọn tất cả". */
  const allSelected = items.length > 0 && items.every((item) => selectedItems[item.bookId]);

  /** Bật/tắt chọn cho 1 dòng theo bookId. */
  const toggleItem = (bookId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  /** Chọn hoặc bỏ chọn toàn bộ danh sách tùy theo trạng thái hiện tại. */
  const toggleSelectAll = () => {
    const next: Record<string, boolean> = {};
    items.forEach((item) => {
      next[item.bookId] = !allSelected;
    });
    setSelectedItems(next);
  };

  return {
    selectedItems,
    selectedItemIds,
    selectedCount,
    subtotal,
    allSelected,
    toggleItem,
    toggleSelectAll,
  };
}

