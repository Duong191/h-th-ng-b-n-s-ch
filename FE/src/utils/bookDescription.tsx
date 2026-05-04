import type { ReactNode } from 'react';

/**
 * Chuyển mô tả sách thành các node React.
 * - Xuống dòng: dùng Enter trong textarea; phần hiển thị cần CSS `white-space: pre-line`.
 * - In đậm: bọc `**như thế này**` (markdown tối giản). Nội dàng dán từ Word không giữ đậm — cần bọc thủ công.
 */
export function bookDescriptionToElements(text: string): ReactNode[] {
  if (!text) return [];

  const nodes: ReactNode[] = [];
  const re = /\*\*([\s\S]+?)\*\*/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={`t-${key++}`}>{text.slice(last, m.index)}</span>);
    }
    nodes.push(<strong key={`b-${key++}`}>{m[1]}</strong>);
    last = m.index + m[0].length;
  }

  if (last < text.length) {
    nodes.push(<span key={`t-${key++}`}>{text.slice(last)}</span>);
  }

  return nodes.length ? nodes : [<span key="e">{text}</span>];
}
