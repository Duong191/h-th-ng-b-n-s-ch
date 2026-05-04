-- Auto generated recovered seed (per-book, isolated batches separated by GO)
SET NOCOUNT ON;
GO

-- Mưa Đỏ
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12345-6';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Mưa Đỏ' AND author = N'Chu Lai';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12345-6', N'Mưa Đỏ', N'Chu Lai', N'Nhà xuất bản Văn học', 1, N'Những miền cảm xúc đan xen giữa nụ cười - nước mắt, nỗi đau - niềm vui, sự sống - cái chết, những thăng hoa - mất mát, sự hy sinh của những người cha, người chồng, người con, những người lính, những đồng chí, đồng đội đã không tiếc máu xương trong cuộc chiến đấu 81 ngày đêm bảo vệ thành Cổ Quảng Trị, bảo vệ Tổ quốc với những gian khổ, thiểu thốn lẫn những mất mát đau thương. Đó là một tiểu đội có 7 người lính với 7 tính cách, số phận, suy nghĩ và xuất thân khác nhau. Có người lãng tử, có người bộc trực, có anh lính nhút nhát, có anh lính gan dạ nhưng hơn tất cả họ là một gia đình, luôn có nhau dù đang giữa ranh giới mong manh sự sống và cái chết cận kề..', 184500, NULL, 0, 50, NULL, N'Tiếng Việt', 1, 0, 1, 0, 5, 1250, 609, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/muado.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chiến tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lịch sử', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Mưa Đỏ": ' + ERROR_MESSAGE();
END CATCH
GO

-- Hồ Điệp Và Kình Ngư
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12346-3';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Hồ Điệp Và Kình Ngư' AND author = N'Nguyễn Nhật Ánh';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12346-3', N'Hồ Điệp Và Kình Ngư', N'Nguyễn Nhật Ánh', N'Nhà xuất bản Trẻ', 1, N'Cuốn tiểu thuyết về tình bạn và những cuộc phiêu lưu kỳ diệu của những người bạn trẻ.', 111600, NULL, 0, 30, NULL, N'Tiếng Việt', 1, 0, 1, 0, 4.5, 890, 181, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/bia-2d_ho-diep-va-kinh-ngu_17307.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'phiêu lưu', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Hồ Điệp Và Kình Ngư": ' + ERROR_MESSAGE();
END CATCH
GO

-- Vạn Xuân
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12347-0';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Vạn Xuân' AND author = N'Yveline Féray';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12347-0', N'Vạn Xuân', N'Yveline Féray', N'Nhà xuất bản Văn học', 1, N'Vạn Xuân - Tập 1: Được sáng tác trong suốt 7 năm (1982-1988), Vạn Xuân của Yveline Féray không chỉ là một tiểu thuyết mà còn là một hành trình dài, đầy đủ chi tiết và sâu lắng về cuộc đời và sự nghiệp của Nguyễn Trãi - “một đại thi hào, một nhà văn cừ khôi, vừa là một chiến lược gia có tầm mắt viễn thấu, một nhà ngoại giao tài tình, một nhạc sĩ lịch lãm, một nhà địa lý thông thái và là một nhà sư phạm tuyệt vời”.Vượt lên khuôn khổ của một cuốn tiểu thuyết lịch sử thông thường - với độ dày gần 1200 trang - tác phẩm đồ sộ này gồm hai quyển, chia thành 9 tập nhỏ và được xem là một thiên sử thi bằng văn chương, không chỉ “phục hiện được cuộc đời và sự nghiệp của Nguyễn Trãi” mà còn có bức tranh toàn cảnh của Đại Việt thế kỷ XV - một giai đoạn huy hoàng nhưng cũng đầy bi tráng trong lịch sử dân tộc. Đó là bức tranh vô cùng chân thực và sâu sắc về những ngày tháng cuối thời Trần đang độ suy tàn; những dự định dựng xây triều mới của tướng quân Lê Quý Ly; những cuộc bình định phương Nam; sự gắn bó mật thiết giữa Nguyễn Trãi - Lê Lợi trong cuộc khởi nghĩa Lam Sơn và chiến thắng của quân dân Đại Việt trước quân Minh; những ngày hoảng loạn của Vương Thông cùng bè lũ xâm lược; rồi những xung đột lợi ích và âm mưu của bọn gian thần trong triều đình nhà Lê sau chiến thắng; nỗi đau đáu của Nguyễn Trãi về vận nước trong những tháng ngày ông ẩn cư ở Côn Sơn và đặc biệt là tấn bi kịch vườn Lệ Chi đầy oan khiên khiến gia đình Nguyễn Trãi bị kết án tru di tam tộc…Điều ấn tượng nhất của tác phẩm này chính là sự thấu hiểu sâu sắc mà tác giả người Pháp dành cho nhân vật, bà không chỉ tái hiện một cách trung thực bối cảnh lịch sử phức tạp của thời đại, mà còn lột tả được chiều sâu tâm lý của Nguyễn Trãi, từ những thành tựu rực rỡ đến những bi kịch nghiệt ngã.', 180000, NULL, 0, 25, NULL, N'Tiếng Việt', 1, 0, 0, 0, 4.3, 650, 320, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/van_xuan.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lịch sử', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'phong kiến', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Vạn Xuân": ' + ERROR_MESSAGE();
END CATCH
GO

-- Nhà Giả Kim
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12348-7';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Nhà Giả Kim' AND author = N'Paulo Coelho';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12348-7', N'Nhà Giả Kim', N'Paulo Coelho', N'Nhà xuất bản Hội nhà văn', 1, N'Cuốn tiểu thuyết nổi tiếng về hành trình tìm kiếm ý nghĩa cuộc sống.', 67000, NULL, 0, 40, NULL, N'Tiếng Việt', 1, 0, 1, 0, 4.8, 2100, 1500, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/nhagiakim.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'triết học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'cảm hứng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Nhà Giả Kim": ' + ERROR_MESSAGE();
END CATCH
GO

-- Lập Trình Sạch (Clean Code)
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12349-4';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Lập Trình Sạch (Clean Code)' AND author = N'Robert C. Martin';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12349-4', N'Lập Trình Sạch (Clean Code)', N'Robert C. Martin', N'AlphaBooks', 8, N'Cuốn sách hướng dẫn cách viết code sạch, dễ đọc và dễ bảo trì.', 280000, NULL, 0, 20, NULL, N'Tiếng Việt', 1, 0, 0, 1, 4.8, 950, 1200, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=L%E1%BA%ADp%20Tr%C3%ACnh%20S%E1%BA%A1ch%20(Clean%20Code)', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lập trình', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'công nghệ', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'phần mềm', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Lập Trình Sạch (Clean Code)": ' + ERROR_MESSAGE();
END CATCH
GO

-- Sapiens: Lược Sử Loài Người
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12351-7';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Sapiens: Lược Sử Loài Người' AND author = N'Yuval Noah Harari';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12351-7', N'Sapiens: Lược Sử Loài Người', N'Yuval Noah Harari', N'Nhà xuất bản Thế giới', 4, N'Cuốn sách về lịch sử loài người từ thời kỳ đồ đá đến nền văn minh hiện đại.', 168000, NULL, 0, 45, NULL, N'Tiếng Việt', 1, 1, 1, 0, 4.9, 3200, 2800, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=Sapiens%3A%20L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Lo%C3%A0i%20Ng%C6%B0%E1%BB%9Di', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lịch sử', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'khoa học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'nhân loại học', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Sapiens: Lược Sử Loài Người": ' + ERROR_MESSAGE();
END CATCH
GO

-- 4 Nguyên Tắc Thực Thi
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12352-4';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'4 Nguyên Tắc Thực Thi' AND author = N'Chris McChesney, Sean Covey, Jim Huling';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12352-4', N'4 Nguyên Tắc Thực Thi', N'Chris McChesney, Sean Covey, Jim Huling', N'Nhà xuất bản Thế giới', 2, N'Cuốn sách về cách thực hiện chiến lược và đạt được mục tiêu trong kinh doanh.', 195000, NULL, 0, 35, NULL, N'Tiếng Việt', 0, 1, 1, 0, 4.6, 1200, 890, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/4nguyentacthucthi.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh doanh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'quản trị', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chiến lược', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "4 Nguyên Tắc Thực Thi": ' + ERROR_MESSAGE();
END CATCH
GO

-- Bí Mật Tư Duy
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12353-1';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Bí Mật Tư Duy' AND author = N'Carol S. Dweck';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12353-1', N'Bí Mật Tư Duy', N'Carol S. Dweck', N'AlphaBooks', 7, N'Cuốn sách về mindset và cách phát triển tư duy tích cực để thành công.', 145000, NULL, 0, 28, NULL, N'Tiếng Việt', 0, 0, 1, 0, 4.4, 980, 650, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/bimattuduy.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'tâm lý', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'phát triển bản thân', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'tư duy', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Bí Mật Tư Duy": ' + ERROR_MESSAGE();
END CATCH
GO

-- Nghệ Thuật Đàm Phán
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12354-8';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Nghệ Thuật Đàm Phán' AND author = N'Roger Fisher, William Ury';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12354-8', N'Nghệ Thuật Đàm Phán', N'Roger Fisher, William Ury', N'Nhà xuất bản Thế giới', 2, N'Cuốn sách về kỹ năng đàm phán và thương lượng trong kinh doanh.', 175000, NULL, 0, 42, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.7, 1500, 1100, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/nghethuatdamphan.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh doanh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'đàm phán', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'thương lượng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Nghệ Thuật Đàm Phán": ' + ERROR_MESSAGE();
END CATCH
GO

-- Nhà Lãnh Đạo Không Chức Danh
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12355-5';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Nhà Lãnh Đạo Không Chức Danh' AND author = N'Robin Sharma';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12355-5', N'Nhà Lãnh Đạo Không Chức Danh', N'Robin Sharma', N'AlphaBooks', 2, N'Cuốn sách về cách trở thành nhà lãnh đạo hiệu quả mà không cần chức danh.', 165000, NULL, 0, 38, NULL, N'Tiếng Việt', 0, 0, 1, 0, 4.5, 1100, 750, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/Nhalanhdaokhongchucdanh.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lãnh đạo', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'quản trị', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'phát triển', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Nhà Lãnh Đạo Không Chức Danh": ' + ERROR_MESSAGE();
END CATCH
GO

-- Quản Lý Nghiệp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12356-2';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Quản Lý Nghiệp' AND author = N'Peter Drucker';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12356-2', N'Quản Lý Nghiệp', N'Peter Drucker', N'Nhà xuất bản Thế giới', 2, N'Cuốn sách kinh điển về quản lý và lãnh đạo trong tổ chức.', 225000, NULL, 0, 25, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.8, 1800, 1200, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/quanlynghiep.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'quản trị', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lãnh đạo', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh doanh', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Quản Lý Nghiệp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Vị Giám Đốc 1 Phút
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12357-9';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Vị Giám Đốc 1 Phút' AND author = N'Ken Blanchard, Spencer Johnson';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12357-9', N'Vị Giám Đốc 1 Phút', N'Ken Blanchard, Spencer Johnson', N'AlphaBooks', 2, N'Cuốn sách về cách quản lý hiệu quả trong thời gian ngắn.', 135000, NULL, 0, 33, NULL, N'Tiếng Việt', 0, 0, 1, 0, 4.3, 850, 580, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/vigiamdoc1phut.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'quản trị', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'hiệu quả', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'thời gian', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Vị Giám Đốc 1 Phút": ' + ERROR_MESSAGE();
END CATCH
GO

-- MBA
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12358-6';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'MBA' AND author = N'Peter Navarro';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12358-6', N'MBA', N'Peter Navarro', N'Nhà xuất bản Thế giới', 2, N'Cuốn sách tổng hợp kiến thức MBA cần thiết cho nhà quản lý.', 285000, NULL, 0, 20, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.7, 1200, 900, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/MBA.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'MBA', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'quản trị', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh doanh', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "MBA": ' + ERROR_MESSAGE();
END CATCH
GO

-- Một Đời Quản Trị
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12359-3';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Một Đời Quản Trị' AND author = N'Jack Welch';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12359-3', N'Một Đời Quản Trị', N'Jack Welch', N'AlphaBooks', 2, N'Cuốn sách về kinh nghiệm quản trị của cựu CEO General Electric.', 195000, NULL, 0, 30, NULL, N'Tiếng Việt', 0, 0, 1, 0, 4.6, 1400, 950, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/motdoiquantri.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'quản trị', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lãnh đạo', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh nghiệm', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Một Đời Quản Trị": ' + ERROR_MESSAGE();
END CATCH
GO

-- Ứng Dụng AI Vào Doanh Nghiệp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12360-0';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Ứng Dụng AI Vào Doanh Nghiệp' AND author = N'Thomas Davenport';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12360-0', N'Ứng Dụng AI Vào Doanh Nghiệp', N'Thomas Davenport', N'Nhà xuất bản Thế giới', 8, N'Cuốn sách về cách ứng dụng trí tuệ nhân tạo trong kinh doanh.', 245000, NULL, 0, 22, NULL, N'Tiếng Việt', 0, 0, 1, 1, 4.5, 650, 420, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/_ng-d_ng-ai-v_o-doanh-nghi_p_9.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'AI', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'công nghệ', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh doanh', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Ứng Dụng AI Vào Doanh Nghiệp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Vị Tu Sĩ
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12361-7';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Vị Tu Sĩ' AND author = N'Robin Sharma';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12361-7', N'Vị Tu Sĩ', N'Robin Sharma', N'AlphaBooks', 7, N'Cuốn sách về triết lý sống và cách tìm kiếm hạnh phúc.', 155000, NULL, 0, 35, NULL, N'Tiếng Việt', 0, 0, 1, 0, 4.4, 1100, 720, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/vitusi.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'triết lý', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'hạnh phúc', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'phát triển', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Vị Tu Sĩ": ' + ERROR_MESSAGE();
END CATCH
GO

-- Combo Sách Tri Thức
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12362-4';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Combo Sách Tri Thức' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12362-4', N'Combo Sách Tri Thức', N'Nhiều tác giả', N'Nhà xuất bản Thế giới', 8, N'Bộ sách tổng hợp kiến thức từ nhiều lĩnh vực khác nhau.', 450000, NULL, 0, 15, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.8, 800, 350, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/combosachtrithuc.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'combo', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'tri thức', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'tổng hợp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Combo Sách Tri Thức": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 16
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12363-1';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 16' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12363-1', N'Chú Thuật Hồi Chiến - Tập 16', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 16 của bộ truyện tranh nổi tiếng Chú Thuật Hồi Chiến. Tiếp tục cuộc phiêu lưu đầy kịch tính với những trận chiến mãnh liệt và những khám phá mới về thế giới chú thuật.', 35000, NULL, 0, 50, NULL, N'Tiếng Việt', 0, 0, 1, 1, 4.9, 1250, 890, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-16.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 16": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 17
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12364-8';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 17' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12364-8', N'Chú Thuật Hồi Chiến - Tập 17', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 17 của bộ truyện tranh Chú Thuật Hồi Chiến. Những bí mật về thế giới chú thuật dần được hé lộ, cùng những nhân vật mới và những trận chiến đầy căng thẳng.', 35000, NULL, 0, 45, NULL, N'Tiếng Việt', 0, 0, 1, 1, 4.8, 1100, 750, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-17.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 17": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 20
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12365-5';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 20' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12365-5', N'Chú Thuật Hồi Chiến - Tập 20', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 20 của bộ truyện tranh Chú Thuật Hồi Chiến. Cốt truyện ngày càng phức tạp với những tình tiết bất ngờ và những nhân vật đầy sức hút.', 35000, NULL, 0, 40, NULL, N'Tiếng Việt', 0, 1, 1, 0, 4.9, 1350, 1200, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-20.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 20": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 21
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12366-2';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 21' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12366-2', N'Chú Thuật Hồi Chiến - Tập 21', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 21 của bộ truyện tranh Chú Thuật Hồi Chiến. Những trận chiến đỉnh cao và những khoảnh khắc cảm động trong hành trình của các nhân vật.', 35000, NULL, 0, 38, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.7, 980, 680, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-21.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 21": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 22
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12367-9';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 22' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12367-9', N'Chú Thuật Hồi Chiến - Tập 22', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 22 của bộ truyện tranh Chú Thuật Hồi Chiến. Những bí mật về quá khứ và tương lai dần được tiết lộ, tạo nên những tình tiết hấp dẫn.', 35000, NULL, 0, 42, NULL, N'Tiếng Việt', 0, 0, 1, 1, 4.8, 1050, 820, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_mockup_tap-22.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 22": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12368-6';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12368-6', N'Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 25 của bộ truyện tranh Chú Thuật Hồi Chiến. Những sự kiện quan trọng diễn ra, đánh dấu bước ngoặt lớn trong cốt truyện.', 35000, NULL, 0, 35, NULL, N'Tiếng Việt', 0, 1, 1, 0, 4.9, 1450, 1100, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_tap-25_bia_card-pvc.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12369-3';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12369-3', N'Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 25 bản đặc biệt của bộ truyện tranh Chú Thuật Hồi Chiến. Bao gồm các trang minh họa đặc biệt và nội dung độc quyền.', 45000, NULL, 0, 25, NULL, N'Tiếng Việt', 0, 0, 1, 1, 5, 890, 650, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_tap-25_bia_card-pvc-copy-0.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)": ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 26
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12370-0';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 26' AND author = N'Gege Akutami';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12370-0', N'Chú Thuật Hồi Chiến - Tập 26', N'Gege Akutami', N'Nhà xuất bản Kim Đồng', 5, N'Tập 26 mới nhất của bộ truyện tranh Chú Thuật Hồi Chiến. Tiếp tục hành trình đầy thử thách với những tình tiết mới và những nhân vật đáng nhớ.', 35000, NULL, 0, 48, NULL, N'Tiếng Việt', 0, 1, 1, 1, 4.9, 1600, 1350, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/chu-thuat-hoi-chien_ban-thuong_tap-26_bia_obi_card-pvc.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'manga', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'comic', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện tranh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'chu-thuat-hoi-chien', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Chú Thuật Hồi Chiến - Tập 26": ' + ERROR_MESSAGE();
END CATCH
GO

-- Hồ Điệp Và Kình Ngư
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12371-7';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Hồ Điệp Và Kình Ngư' AND author = N'Nguyễn Nhật Ánh';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12371-7', N'Hồ Điệp Và Kình Ngư', N'Nguyễn Nhật Ánh', N'Nhà xuất bản Kim Đồng', 5, N'Câu chuyện cảm động về tình bạn và những kỷ niệm tuổi thơ đẹp đẽ. Một tác phẩm dành cho thiếu nhi với những bài học ý nghĩa về cuộc sống.', 85000, NULL, 0, 60, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.7, 890, 520, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/bia-2d_ho-diep-va-kinh-ngu_17307.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'tuổi thơ', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Hồ Điệp Và Kình Ngư": ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Cổ Tích Việt Nam
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12372-4';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Truyện Cổ Tích Việt Nam' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12372-4', N'Truyện Cổ Tích Việt Nam', N'Nhiều tác giả', N'Nhà xuất bản Kim Đồng', 5, N'Tuyển tập những câu chuyện cổ tích quen thuộc của Việt Nam, được minh họa đẹp mắt, phù hợp cho các em nhỏ.', 95000, NULL, 0, 45, NULL, N'Tiếng Việt', 0, 0, 1, 1, 4.8, 650, 380, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/image_186943.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'cổ tích', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học dân gian', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Truyện Cổ Tích Việt Nam": ' + ERROR_MESSAGE();
END CATCH
GO

-- Dế Mèn Phiêu Lưu Ký
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12373-1';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Dế Mèn Phiêu Lưu Ký' AND author = N'Tô Hoài';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12373-1', N'Dế Mèn Phiêu Lưu Ký', N'Tô Hoài', N'Nhà xuất bản Kim Đồng', 5, N'Tác phẩm kinh điển của nhà văn Tô Hoài kể về cuộc phiêu lưu của chú Dế Mèn. Một câu chuyện đầy ý nghĩa về tình bạn và lòng dũng cảm.', 75000, NULL, 0, 55, NULL, N'Tiếng Việt', 0, 1, 1, 0, 4.9, 1200, 890, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/image_232912.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'văn học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kinh điển', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Dế Mèn Phiêu Lưu Ký": ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12374-8';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12374-8', N'Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu', N'Nhiều tác giả', N'Nhà xuất bản Kim Đồng', 5, N'Khám phá vũ trụ qua những hình ảnh minh họa sống động và câu chuyện hấp dẫn. Giúp các em nhỏ hiểu thêm về thế giới xung quanh.', 68000, NULL, 0, 40, NULL, N'Tiếng Việt', 0, 0, 0, 1, 4.6, 420, 280, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/8935244869002.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'khoa học', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giáo dục', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu": ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Cổ Tích Thế Giới - Tập 1
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12375-5';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Truyện Cổ Tích Thế Giới - Tập 1' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12375-5', N'Truyện Cổ Tích Thế Giới - Tập 1', N'Nhiều tác giả', N'Nhà xuất bản Kim Đồng', 5, N'Tuyển tập những câu chuyện cổ tích nổi tiếng từ khắp nơi trên thế giới, được kể lại một cách sinh động và dễ hiểu cho các em nhỏ.', 88000, NULL, 0, 50, NULL, N'Tiếng Việt', 0, 1, 0, 0, 4.7, 780, 450, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/8935244872361.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'cổ tích', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'thế giới', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Truyện Cổ Tích Thế Giới - Tập 1": ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Tranh Lịch Sử Việt Nam
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-12376-2';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Truyện Tranh Lịch Sử Việt Nam' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-12376-2', N'Truyện Tranh Lịch Sử Việt Nam', N'Nhiều tác giả', N'Nhà xuất bản Kim Đồng', 5, N'Học lịch sử qua những câu chuyện được kể bằng hình ảnh sinh động. Giúp các em nhỏ yêu thích và hiểu rõ hơn về lịch sử dân tộc.', 92000, NULL, 0, 35, NULL, N'Tiếng Việt', 0, 0, 1, 1, 4.8, 560, 320, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/8935280900905.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện thiếu nhi', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'lịch sử', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giáo dục', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Truyện Tranh Lịch Sử Việt Nam": ' + ERROR_MESSAGE();
END CATCH
GO

-- Oxford English Grammar
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-0-19-431351-1';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Oxford English Grammar' AND author = N'John Eastwood';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-0-19-431351-1', N'Oxford English Grammar', N'John Eastwood', N'Oxford University Press', 6, N'Sách ngữ pháp tiếng Anh tổng quát, phù hợp cho học sinh, sinh viên và người đi làm muốn hệ thống lại kiến thức.', 180000, NULL, 0, 40, NULL, N'Tiếng Anh', 1, 1, 1, 0, 4.8, 980, 1200, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/9781009195119.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'grammar', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Oxford English Grammar": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học 2000 Từ Vựng Tiếng Anh
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8931805006084';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tự Học 2000 Từ Vựng Tiếng Anh' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8931805006084', N'Tự Học 2000 Từ Vựng Tiếng Anh', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Bộ từ vựng tiếng Anh thông dụng kèm ví dụ minh hoạ, giúp bạn ghi nhớ nhanh và áp dụng vào giao tiếp hằng ngày.', 120000, NULL, 0, 50, NULL, N'Tiếng Anh', 1, 0, 1, 1, 4.6, 450, 600, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/8931805006084.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tự Học 2000 Từ Vựng Tiếng Anh": ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Căn Bản Tiếng Anh
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8935343700565';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Ngữ Pháp Căn Bản Tiếng Anh' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8935343700565', N'Ngữ Pháp Căn Bản Tiếng Anh', N'Nhiều tác giả', N'NXB Giáo Dục', 6, N'Giáo trình ngữ pháp tiếng Anh căn bản, trình bày rõ ràng, nhiều ví dụ và bài tập ứng dụng.', 110000, NULL, 0, 60, NULL, N'Tiếng Anh', 0, 1, 0, 0, 4.5, 320, 700, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/8935343700565.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'grammar', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'căn bản', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Ngữ Pháp Căn Bản Tiếng Anh": ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Nâng Cao Tiếng Anh
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8935343700572';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Ngữ Pháp Nâng Cao Tiếng Anh' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8935343700572', N'Ngữ Pháp Nâng Cao Tiếng Anh', N'Nhiều tác giả', N'NXB Giáo Dục', 6, N'Tài liệu ngữ pháp tiếng Anh nâng cao dành cho học sinh khá giỏi và luyện thi chứng chỉ quốc tế.', 135000, NULL, 0, 45, NULL, N'Tiếng Anh', 0, 0, 1, 1, 4.4, 280, 520, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/8935343700572.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'grammar', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'nâng cao', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Ngữ Pháp Nâng Cao Tiếng Anh": ' + ERROR_MESSAGE();
END CATCH
GO

-- English Vocabulary In Use - Intermediate
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8936110989558';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'English Vocabulary In Use - Intermediate' AND author = N'Michael McCarthy';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8936110989558', N'English Vocabulary In Use - Intermediate', N'Michael McCarthy', N'Cambridge University Press', 6, N'Sách từ vựng tiếng Anh theo chủ đề, phù hợp cho trình độ trung cấp, kèm bài tập và đáp án.', 195000, NULL, 0, 35, NULL, N'Tiếng Anh', 1, 1, 1, 0, 4.9, 1200, 1500, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/8936110989558.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'vocabulary', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "English Vocabulary In Use - Intermediate": ' + ERROR_MESSAGE();
END CATCH
GO

-- Academic Writing Skills
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'9781009195119';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Academic Writing Skills' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'9781009195119', N'Academic Writing Skills', N'Nhiều tác giả', N'Cambridge University Press', 6, N'Tài liệu luyện kỹ năng viết học thuật tiếng Anh, chuẩn bị cho môi trường đại học và nghiên cứu.', 210000, NULL, 0, 30, NULL, N'Tiếng Anh', 0, 0, 1, 0, 4.3, 260, 430, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/9781009195119.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'writing', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'academic', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Academic Writing Skills": ' + ERROR_MESSAGE();
END CATCH
GO

-- Giáo Trình Tiếng Anh Căn Bản
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'9786043350296';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Giáo Trình Tiếng Anh Căn Bản' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'9786043350296', N'Giáo Trình Tiếng Anh Căn Bản', N'Nhiều tác giả', N'NXB Giáo Dục', 6, N'Giáo trình tiếng Anh căn bản cho người mới bắt đầu, bao gồm nghe, nói, đọc, viết.', 140000, NULL, 0, 55, NULL, N'Tiếng Anh', 1, 0, 1, 1, 4.5, 380, 680, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/9786043350296.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giáo trình', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Giáo Trình Tiếng Anh Căn Bản": ' + ERROR_MESSAGE();
END CATCH
GO

-- Giáo Trình Tiếng Anh Nâng Cao
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'9786043356366';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Giáo Trình Tiếng Anh Nâng Cao' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'9786043356366', N'Giáo Trình Tiếng Anh Nâng Cao', N'Nhiều tác giả', N'NXB Giáo Dục', 6, N'Giáo trình tiếng Anh nâng cao giúp mở rộng vốn từ và cấu trúc câu phức tạp.', 165000, NULL, 0, 40, NULL, N'Tiếng Anh', 0, 0, 1, 1, 4.4, 290, 510, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/9786043356366.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giáo trình', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'nâng cao', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Giáo Trình Tiếng Anh Nâng Cao": ' + ERROR_MESSAGE();
END CATCH
GO

-- IELTS Speaking 6.0+
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IELTS-SPEAKING-6';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'IELTS Speaking 6.0+' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IELTS-SPEAKING-6', N'IELTS Speaking 6.0+', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Tài liệu luyện thi IELTS Speaking band 6.0+ với mẫu câu, từ vựng theo chủ đề và audio tham khảo.', 185000, NULL, 0, 35, NULL, N'Tiếng Anh', 1, 1, 1, 0, 4.8, 760, 980, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/b_a-1_ielts-speaking-6.0.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ielts', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'speaking', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "IELTS Speaking 6.0+": ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng IELTS 8.0
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IELTS-VOCAB-8';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Từ Vựng IELTS 8.0' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IELTS-VOCAB-8', N'Từ Vựng IELTS 8.0', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Tổng hợp từ vựng nâng cao cho IELTS band 7.0 - 8.0 kèm ví dụ và bài tập.', 190000, NULL, 0, 30, NULL, N'Tiếng Anh', 0, 1, 1, 0, 4.7, 640, 900, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/b_a-18aca-1_1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ielts', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Từ Vựng IELTS 8.0": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tổng Hợp Đề Thi IELTS General
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IELTS-GENERAL-TESTS';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tổng Hợp Đề Thi IELTS General' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IELTS-GENERAL-TESTS', N'Tổng Hợp Đề Thi IELTS General', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Bộ đề luyện thi IELTS General Training kèm đáp án và gợi ý trả lời chi tiết.', 195000, NULL, 0, 28, NULL, N'Tiếng Anh', 0, 0, 1, 1, 4.5, 380, 560, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/b_a-18gen-1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ielts', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'general', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tổng Hợp Đề Thi IELTS General": ' + ERROR_MESSAGE();
END CATCH
GO

-- Barron's TOEIC 6th Edition
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'barrons-toeic-6th';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Barron''s TOEIC 6th Edition' AND author = N'Lin Lougheed';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'barrons-toeic-6th', N'Barron''s TOEIC 6th Edition', N'Lin Lougheed', N'Barron''s', 6, N'Giáo trình luyện thi TOEIC nổi tiếng, phiên bản thứ 6, bao gồm đề thi mẫu và mẹo làm bài.', 230000, NULL, 0, 32, NULL, N'Tiếng Anh', 1, 1, 1, 0, 4.9, 1500, 2000, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/barronn-toeic-6th.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'toeic', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Barron''s TOEIC 6th Edition": ' + ERROR_MESSAGE();
END CATCH
GO

-- Giải Thích Ngữ Pháp Tiếng Anh
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'GIAI-THICH-NGUPHAP';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Giải Thích Ngữ Pháp Tiếng Anh' AND author = N'Mai Lan Hương';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'GIAI-THICH-NGUPHAP', N'Giải Thích Ngữ Pháp Tiếng Anh', N'Mai Lan Hương', N'NXB Đà Nẵng', 6, N'Sách giải thích chi tiết các điểm ngữ pháp tiếng Anh thường gặp, phù hợp cho học sinh phổ thông.', 125000, NULL, 0, 60, NULL, N'Tiếng Anh', 0, 1, 1, 0, 4.6, 700, 1100, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/bia1_gtnpta_b_n-m_i.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'grammar', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Giải Thích Ngữ Pháp Tiếng Anh": ' + ERROR_MESSAGE();
END CATCH
GO

-- IELTS Reading Intensive
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IELTS-READING-INT';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'IELTS Reading Intensive' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IELTS-READING-INT', N'IELTS Reading Intensive', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Tài liệu chuyên sâu kỹ năng đọc IELTS với bài tập phân loại theo dạng câu hỏi.', 185000, NULL, 0, 34, NULL, N'Tiếng Anh', 0, 0, 1, 1, 4.5, 420, 650, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/bia1-ielts-19aca.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ielts', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'reading', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "IELTS Reading Intensive": ' + ERROR_MESSAGE();
END CATCH
GO

-- Collins Reading for IELTS
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Collins Reading for IELTS' AND author = N'Els Van Geyte';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (NULL, N'Collins Reading for IELTS', N'Els Van Geyte', N'Collins', 6, N'Sách luyện kỹ năng đọc trong kỳ thi IELTS với bài tập sát đề thi thực tế.', 210000, NULL, 0, 28, NULL, N'Tiếng Anh', 1, 1, 1, 0, 4.8, 980, 1300, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/collins_readingforielts_1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ielts', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'reading', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Collins Reading for IELTS": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học Giao Tiếp Tiếng Anh Hằng Ngày
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'893-SELF-SPEAK-01';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tự Học Giao Tiếp Tiếng Anh Hằng Ngày' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'893-SELF-SPEAK-01', N'Tự Học Giao Tiếp Tiếng Anh Hằng Ngày', N'Nhiều tác giả', N'NXB Thanh Niên', 6, N'Sách tự học giao tiếp tiếng Anh với các mẫu câu thông dụng trong đời sống.', 98000, NULL, 0, 70, NULL, N'Tiếng Anh', 0, 0, 1, 0, 4.3, 310, 540, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/image_195509_1_18959.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giao tiếp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tự Học Giao Tiếp Tiếng Anh Hằng Ngày": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học Tiếng Anh Qua Hình Ảnh
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'893-SELF-PICTURE-EN';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tự Học Tiếng Anh Qua Hình Ảnh' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'893-SELF-PICTURE-EN', N'Tự Học Tiếng Anh Qua Hình Ảnh', N'Nhiều tác giả', N'NXB Thanh Niên', 6, N'Bộ sách học tiếng Anh qua hình ảnh sinh động, giúp ghi nhớ từ vựng lâu hơn.', 115000, NULL, 0, 55, NULL, N'Tiếng Anh', 0, 0, 1, 1, 4.4, 290, 500, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/image_195509_1_30085.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'hình ảnh', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tự Học Tiếng Anh Qua Hình Ảnh": ' + ERROR_MESSAGE();
END CATCH
GO

-- 3000 Từ Vựng Tiếng Anh Quan Trọng
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'VOCAB-3000-EN';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'3000 Từ Vựng Tiếng Anh Quan Trọng' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'VOCAB-3000-EN', N'3000 Từ Vựng Tiếng Anh Quan Trọng', N'Nhiều tác giả', N'NXB Lao Động', 6, N'Tổng hợp 3000 từ vựng tiếng Anh thông dụng nhất kèm nghĩa và ví dụ.', 125000, NULL, 0, 65, NULL, N'Tiếng Anh', 0, 1, 1, 0, 4.7, 540, 880, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/image_224922.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "3000 Từ Vựng Tiếng Anh Quan Trọng": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Anh Cho Người Mất Gốc
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'ENGLISH-BEGINNER-0';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tiếng Anh Cho Người Mất Gốc' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'ENGLISH-BEGINNER-0', N'Tiếng Anh Cho Người Mất Gốc', N'Nhiều tác giả', N'NXB Lao Động', 6, N'Giáo trình tiếng Anh cho người mất gốc, bắt đầu từ phát âm đến câu giao tiếp đơn giản.', 135000, NULL, 0, 70, NULL, N'Tiếng Anh', 1, 0, 1, 1, 4.6, 420, 760, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/image_227755.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'mất gốc', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tiếng Anh Cho Người Mất Gốc": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Anh Giao Tiếp Trong Công Việc
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'ENGLISH-BUSINESS';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tiếng Anh Giao Tiếp Trong Công Việc' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'ENGLISH-BUSINESS', N'Tiếng Anh Giao Tiếp Trong Công Việc', N'Nhiều tác giả', N'NXB Lao Động', 6, N'Sách luyện giao tiếp tiếng Anh trong môi trường công sở, phỏng vấn và thuyết trình.', 155000, NULL, 0, 48, NULL, N'Tiếng Anh', 0, 0, 1, 0, 4.4, 300, 520, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/image_236141.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'business', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giao tiếp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tiếng Anh Giao Tiếp Trong Công Việc": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học Tiếng Anh Qua Truyện Ngắn
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'ENGLISH-STORIES';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tự Học Tiếng Anh Qua Truyện Ngắn' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'ENGLISH-STORIES', N'Tự Học Tiếng Anh Qua Truyện Ngắn', N'Nhiều tác giả', N'NXB Thanh Niên', 6, N'Học tiếng Anh qua các truyện ngắn thú vị, giúp nâng cao vốn từ và cấu trúc câu.', 99000, NULL, 0, 80, NULL, N'Tiếng Anh', 0, 0, 1, 0, 4.2, 250, 480, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/unnamed_1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng anh', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'english', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'truyện ngắn', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tự Học Tiếng Anh Qua Truyện Ngắn": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi Năng Lực Nhật Ngữ N5
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8934974187127';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Thi Năng Lực Nhật Ngữ N5' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8934974187127', N'Luyện Thi Năng Lực Nhật Ngữ N5', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Sách luyện thi năng lực Nhật ngữ N5 với đầy đủ các kỹ năng: Hán tự, từ vựng, ngữ pháp, đọc hiểu, nghe hiểu.', 125000, NULL, 0, 60, NULL, N'Tiếng Nhật', 1, 1, 1, 1, 4.7, 450, 850, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/8934974187127.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n5', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Thi Năng Lực Nhật Ngữ N5": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N4 Toàn Diện
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8934974204480';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Thi JLPT N4 Toàn Diện' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8934974204480', N'Luyện Thi JLPT N4 Toàn Diện', N'Nhiều tác giả', N'NXB Tre', 6, N'Giáo trình luyện thi JLPT N4 với phương pháp học hiệu quả, bài tập phong phú.', 135000, NULL, 0, 55, NULL, N'Tiếng Nhật', 1, 0, 1, 1, 4.6, 380, 720, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/8934974204480.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n4', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Thi JLPT N4 Toàn Diện": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N3 - Ngữ Pháp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8934974204503';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Thi JLPT N3 - Ngữ Pháp' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8934974204503', N'Luyện Thi JLPT N3 - Ngữ Pháp', N'Nhiều tác giả', N'NXB Tre', 6, N'Sách luyện thi JLPT N3 tập trung vào ngữ pháp với các mẫu câu quan trọng.', 145000, NULL, 0, 48, NULL, N'Tiếng Nhật', 0, 0, 1, 1, 4.5, 320, 600, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/8934974204503.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n3', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ngữ pháp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Thi JLPT N3 - Ngữ Pháp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Kanji Sơ Cấp - Hán Tự Tiếng Nhật
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8935072893552';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Kanji Sơ Cấp - Hán Tự Tiếng Nhật' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8935072893552', N'Kanji Sơ Cấp - Hán Tự Tiếng Nhật', N'Nhiều tác giả', N'NXB Đại Học Quốc Gia', 6, N'Sách học Hán tự cơ bản dành cho người mới bắt đầu học tiếng Nhật.', 89000, NULL, 0, 70, NULL, N'Tiếng Nhật', 0, 1, 0, 0, 4.4, 280, 680, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/8935072893552.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kanji', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'hán tự', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Kanji Sơ Cấp - Hán Tự Tiếng Nhật": ' + ERROR_MESSAGE();
END CATCH
GO

-- Mimikara Oboeru - Học Tiếng Nhật Qua Nghe
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8935086855843';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Mimikara Oboeru - Học Tiếng Nhật Qua Nghe' AND author = N'Nishi-in';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8935086855843', N'Mimikara Oboeru - Học Tiếng Nhật Qua Nghe', N'Nishi-in', N'NXB Tổng Hợp', 6, N'Phương pháp học tiếng Nhật qua nghe hiệu quả, phù hợp mọi trình độ.', 155000, NULL, 0, 42, NULL, N'Tiếng Nhật', 1, 0, 1, 1, 4.8, 510, 920, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/8935086855843_1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'mimikara', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'nghe', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Mimikara Oboeru - Học Tiếng Nhật Qua Nghe": ' + ERROR_MESSAGE();
END CATCH
GO

-- Shin Nihongo 500 Mon - N3
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'8935086856680';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Shin Nihongo 500 Mon - N3' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'8935086856680', N'Shin Nihongo 500 Mon - N3', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Bộ đề luyện thi JLPT N3 với 500 câu hỏi đa dạng.', 165000, NULL, 0, 38, NULL, N'Tiếng Nhật', 0, 0, 1, 1, 4.6, 340, 640, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/8935086856680.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n3', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'500 mon', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Shin Nihongo 500 Mon - N3": ' + ERROR_MESSAGE();
END CATCH
GO

-- Minna no Nihongo - Bản Dịch Tiếng Việt
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'9786044022697';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Minna no Nihongo - Bản Dịch Tiếng Việt' AND author = N'3A Network';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'9786044022697', N'Minna no Nihongo - Bản Dịch Tiếng Việt', N'3A Network', N'NXB Tre', 6, N'Giáo trình tiếng Nhật phổ biến nhất thế giới với bản dịch tiếng Việt chi tiết.', 125000, NULL, 0, 65, NULL, N'Tiếng Nhật', 1, 1, 1, 0, 4.9, 720, 1450, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/9786044022697-1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'minna no nihongo', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giáo trình', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Minna no Nihongo - Bản Dịch Tiếng Việt": ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng Tiếng Nhật Theo Chủ Đề
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'9786047763603';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Từ Vựng Tiếng Nhật Theo Chủ Đề' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'9786047763603', N'Từ Vựng Tiếng Nhật Theo Chủ Đề', N'Nhiều tác giả', N'NXB Lao Động', 6, N'Học từ vựng tiếng Nhật theo chủ đề giúp ghi nhớ hiệu quả.', 95000, NULL, 0, 75, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.3, 250, 520, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/9786047763603.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Từ Vựng Tiếng Nhật Theo Chủ Đề": ' + ERROR_MESSAGE();
END CATCH
GO

-- Combo Shin Nihongo N3 + N2
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'COMBO-SHIN-N3-N2';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Combo Shin Nihongo N3 + N2' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'COMBO-SHIN-N3-N2', N'Combo Shin Nihongo N3 + N2', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Combo 2 cuốn luyện thi JLPT N3 và N2 với giá ưu đãi.', 285000, NULL, 0, 30, NULL, N'Tiếng Nhật', 1, 1, 1, 1, 4.8, 420, 780, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/combo-8935086856680-8935086858035.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n3', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n2', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'combo', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Combo Shin Nihongo N3 + N2": ' + ERROR_MESSAGE();
END CATCH
GO

-- Giao Tiếp Tiếng Nhật Hàng Ngày
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-1453';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Giao Tiếp Tiếng Nhật Hàng Ngày' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-1453', N'Giao Tiếp Tiếng Nhật Hàng Ngày', N'Nhiều tác giả', N'NXB Thanh Niên', 6, N'Học tiếng Nhật giao tiếp trong các tình huống thực tế hàng ngày.', 115000, NULL, 0, 52, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.4, 310, 580, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_1453.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giao tiếp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Giao Tiếp Tiếng Nhật Hàng Ngày": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Nghe JLPT N2
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-26612';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Nghe JLPT N2' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-26612', N'Luyện Nghe JLPT N2', N'Nhiều tác giả', N'NXB Tre', 6, N'Sách luyện kỹ năng nghe cho kỳ thi JLPT N2 với nhiều bài tập thực hành.', 155000, NULL, 0, 45, NULL, N'Tiếng Nhật', 1, 0, 1, 1, 4.7, 390, 710, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_26612.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n2', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'nghe', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Nghe JLPT N2": ' + ERROR_MESSAGE();
END CATCH
GO

-- Đọc Hiểu Tiếng Nhật Nâng Cao
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-29719';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Đọc Hiểu Tiếng Nhật Nâng Cao' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-29719', N'Đọc Hiểu Tiếng Nhật Nâng Cao', N'Nhiều tác giả', N'NXB Đại Học Quốc Gia', 6, N'Nâng cao kỹ năng đọc hiểu tiếng Nhật với các bài tập từ cơ bản đến nâng cao.', 135000, NULL, 0, 48, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.5, 280, 540, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_29719.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'đọc hiểu', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Đọc Hiểu Tiếng Nhật Nâng Cao": ' + ERROR_MESSAGE();
END CATCH
GO

-- Kanji N1 - Hán Tự Cao Cấp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-32597';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Kanji N1 - Hán Tự Cao Cấp' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-32597', N'Kanji N1 - Hán Tự Cao Cấp', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Học Hán tự trình độ N1 với phương pháp khoa học, dễ nhớ.', 185000, NULL, 0, 35, NULL, N'Tiếng Nhật', 1, 0, 1, 1, 4.8, 340, 620, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_32597.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n1', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kanji', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Kanji N1 - Hán Tự Cao Cấp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Tiếng Nhật N1
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-32598';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Ngữ Pháp Tiếng Nhật N1' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-32598', N'Ngữ Pháp Tiếng Nhật N1', N'Nhiều tác giả', N'NXB Tre', 6, N'Tổng hợp ngữ pháp tiếng Nhật N1 với giải thích chi tiết và ví dụ minh họa.', 175000, NULL, 0, 40, NULL, N'Tiếng Nhật', 1, 1, 1, 1, 4.9, 480, 890, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_32598.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n1', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ngữ pháp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Ngữ Pháp Tiếng Nhật N1": ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng JLPT N5
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-4385';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Từ Vựng JLPT N5' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-4385', N'Từ Vựng JLPT N5', N'Nhiều tác giả', N'NXB Lao Động', 6, N'Học từ vựng tiếng Nhật N5 một cách có hệ thống và khoa học.', 85000, NULL, 0, 80, NULL, N'Tiếng Nhật', 0, 1, 0, 0, 4.3, 320, 720, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_4385_1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n5', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Từ Vựng JLPT N5": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Nhật Cho Người Mới Bắt Đầu
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-7960';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tiếng Nhật Cho Người Mới Bắt Đầu' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-7960', N'Tiếng Nhật Cho Người Mới Bắt Đầu', N'Nhiều tác giả', N'NXB Thanh Niên', 6, N'Giáo trình tiếng Nhật dành cho người mới bắt đầu với phương pháp dễ hiểu.', 105000, NULL, 0, 68, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.4, 290, 610, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_7960.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sơ cấp', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giáo trình', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tiếng Nhật Cho Người Mới Bắt Đầu": ' + ERROR_MESSAGE();
END CATCH
GO

-- Bài Tập Tiếng Nhật Trung Cấp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'IMAGE-195509-8463';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Bài Tập Tiếng Nhật Trung Cấp' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'IMAGE-195509-8463', N'Bài Tập Tiếng Nhật Trung Cấp', N'Nhiều tác giả', N'NXB Đại Học Quốc Gia', 6, N'Bộ bài tập tiếng Nhật trung cấp giúp củng cố kiến thức một cách toàn diện.', 145000, NULL, 0, 50, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.5, 270, 530, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/image_195509_1_8463.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'trung cấp', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'bài tập', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Bài Tập Tiếng Nhật Trung Cấp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'LUYEN-THI-N5-FULL';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'LUYEN-THI-N5-FULL', N'Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp', N'Nhiều tác giả', N'NXB Tre', 6, N'Sách luyện thi toàn diện cho JLPT N5 bao gồm Hán tự, từ vựng, ngữ pháp, đọc hiểu và nghe hiểu.', 165000, NULL, 0, 55, NULL, N'Tiếng Nhật', 1, 1, 1, 1, 4.8, 520, 950, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/luyen_thi_nang_luc_nhat_ngu_n5_han_tu__tu_vung__ngu_phap__doc_hieu__nghe_hieu_1_2020_11_16_14_51_24.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n5', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'toàn diện', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Tiếng Nhật Cơ Bản
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'NP-JAPANESE';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Ngữ Pháp Tiếng Nhật Cơ Bản' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'NP-JAPANESE', N'Ngữ Pháp Tiếng Nhật Cơ Bản', N'Nhiều tác giả', N'NXB Lao Động', 6, N'Tổng hợp ngữ pháp tiếng Nhật cơ bản cho người mới học.', 95000, NULL, 0, 72, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.3, 240, 500, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/np.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'ngữ pháp', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'cơ bản', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Ngữ Pháp Tiếng Nhật Cơ Bản": ' + ERROR_MESSAGE();
END CATCH
GO

-- Kanji Trung Cấp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'NXBTRE-KANJI-02';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Kanji Trung Cấp' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'NXBTRE-KANJI-02', N'Kanji Trung Cấp', N'Nhiều tác giả', N'NXB Tre', 6, N'Học Hán tự trung cấp với phương pháp ghi nhớ hiệu quả.', 125000, NULL, 0, 58, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.4, 270, 560, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/nxbtre_full_02192018_041934.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'kanji', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'trung cấp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Kanji Trung Cấp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N2 - Đọc Hiểu
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'NXBTRE-N2-READ';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Thi JLPT N2 - Đọc Hiểu' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'NXBTRE-N2-READ', N'Luyện Thi JLPT N2 - Đọc Hiểu', N'Nhiều tác giả', N'NXB Tre', 6, N'Sách luyện kỹ năng đọc hiểu cho kỳ thi JLPT N2.', 155000, NULL, 0, 42, NULL, N'Tiếng Nhật', 1, 0, 1, 1, 4.7, 360, 680, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/nxbtre_full_05202023_032037-_1_.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n2', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'đọc hiểu', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Thi JLPT N2 - Đọc Hiểu": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Nhật Giao Tiếp Công Sở
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'NXBTRE-BUSINESS';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tiếng Nhật Giao Tiếp Công Sở' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'NXBTRE-BUSINESS', N'Tiếng Nhật Giao Tiếp Công Sở', N'Nhiều tác giả', N'NXB Tre', 6, N'Học tiếng Nhật giao tiếp trong môi trường công sở và kinh doanh.', 135000, NULL, 0, 46, NULL, N'Tiếng Nhật', 0, 0, 1, 1, 4.6, 310, 590, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/nxbtre_full_19442024_034428_1.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'giao tiếp', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'business', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tiếng Nhật Giao Tiếp Công Sở": ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng Tiếng Nhật Theo Cấp Độ
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'NXBTRE-VOCAB';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Từ Vựng Tiếng Nhật Theo Cấp Độ' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'NXBTRE-VOCAB', N'Từ Vựng Tiếng Nhật Theo Cấp Độ', N'Nhiều tác giả', N'NXB Tre', 6, N'Học từ vựng tiếng Nhật theo từng cấp độ từ N5 đến N1.', 115000, NULL, 0, 64, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.4, 290, 550, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/nxbtre_full_23232018_092301.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Từ Vựng Tiếng Nhật Theo Cấp Độ": ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N3 - Nghe Hiểu
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'NXBTRE-N3-LISTEN';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Luyện Thi JLPT N3 - Nghe Hiểu' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'NXBTRE-N3-LISTEN', N'Luyện Thi JLPT N3 - Nghe Hiểu', N'Nhiều tác giả', N'NXB Tre', 6, N'Sách luyện kỹ năng nghe hiểu cho kỳ thi JLPT N3 với bài tập thực hành.', 145000, NULL, 0, 50, NULL, N'Tiếng Nhật', 1, 0, 1, 1, 4.7, 380, 720, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/nxbtre_full_31532023_025343.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'jlpt', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'n3', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'nghe hiểu', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Luyện Thi JLPT N3 - Nghe Hiểu": ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng Tiếng Nhật Tổng Hợp
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'TV-JAPANESE';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Từ Vựng Tiếng Nhật Tổng Hợp' AND author = N'Nhiều tác giả';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'TV-JAPANESE', N'Từ Vựng Tiếng Nhật Tổng Hợp', N'Nhiều tác giả', N'NXB Tổng Hợp', 6, N'Tổng hợp từ vựng tiếng Nhật quan trọng theo chủ đề.', 105000, NULL, 0, 60, NULL, N'Tiếng Nhật', 0, 0, 1, 0, 4.3, 260, 510, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_nhat/tv.jpg', 1, 1, GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'sách tiếng nhật', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'japanese', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'từ vựng', GETUTCDATE());
  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, N'tổng hợp', GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Từ Vựng Tiếng Nhật Tổng Hợp": ' + ERROR_MESSAGE();
END CATCH
GO

-- Nhà Giả Kim
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-25888-8';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Nhà Giả Kim' AND author = N'Paulo Coelho';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-25888-8', N'Nhà Giả Kim', N'Paulo Coelho', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/nhagiakim.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Nhà Giả Kim": ' + ERROR_MESSAGE();
END CATCH
GO

-- Đắc Nhân Tâm
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-14725-7';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Đắc Nhân Tâm' AND author = N'Dale Carnegie';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-14725-7', N'Đắc Nhân Tâm', N'Dale Carnegie', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/dat-rung-phuong-nam.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Đắc Nhân Tâm": ' + ERROR_MESSAGE();
END CATCH
GO

-- Nguyên Lý Marketing
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-06654-3';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Nguyên Lý Marketing' AND author = N'Philip Kotler';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-06654-3', N'Nguyên Lý Marketing', N'Philip Kotler', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=Nguy%C3%AAn%20L%C3%BD%20Marketing', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Nguyên Lý Marketing": ' + ERROR_MESSAGE();
END CATCH
GO

-- Cambridge IELTS 16 Academic
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-17892-3';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Cambridge IELTS 16 Academic' AND author = N'Cambridge';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-17892-3', N'Cambridge IELTS 16 Academic', N'Cambridge', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'/img/sach_tieng_anh/bia1-ielts-19aca.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Cambridge IELTS 16 Academic": ' + ERROR_MESSAGE();
END CATCH
GO

-- Doraemon Tập 1
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-19876-1';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Doraemon Tập 1' AND author = N'Fujiko F. Fujio';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-19876-1', N'Doraemon Tập 1', N'Fujiko F. Fujio', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=Doraemon%20T%E1%BA%ADp%201', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Doraemon Tập 1": ' + ERROR_MESSAGE();
END CATCH
GO

-- Lược Sử Thời Gian
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-08765-4';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Lược Sử Thời Gian' AND author = N'Stephen Hawking';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-08765-4', N'Lược Sử Thời Gian', N'Stephen Hawking', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Th%E1%BB%9Di%20Gian', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Lược Sử Thời Gian": ' + ERROR_MESSAGE();
END CATCH
GO

-- Sapiens: Lược Sử Loài Người
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-11234-5';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Sapiens: Lược Sử Loài Người' AND author = N'Yuval Noah Harari';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-11234-5', N'Sapiens: Lược Sử Loài Người', N'Yuval Noah Harari', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=Sapiens%3A%20L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Lo%C3%A0i%20Ng%C6%B0%E1%BB%9Di', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Sapiens: Lược Sử Loài Người": ' + ERROR_MESSAGE();
END CATCH
GO

-- Tư Duy Nhanh Và Chậm
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-15678-9';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Tư Duy Nhanh Và Chậm' AND author = N'Daniel Kahneman';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-15678-9', N'Tư Duy Nhanh Và Chậm', N'Daniel Kahneman', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=T%C6%B0%20Duy%20Nhanh%20V%C3%A0%20Ch%E1%BA%ADm', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Tư Duy Nhanh Và Chậm": ' + ERROR_MESSAGE();
END CATCH
GO

-- Conan Tập 50
BEGIN TRY
DECLARE @book_id BIGINT = NULL;
SELECT TOP 1 @book_id = id FROM books WHERE isbn = N'978-604-2-19999-8';
IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = N'Conan Tập 50' AND author = N'Aoyama Gosho';
IF @book_id IS NULL
BEGIN
  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
  VALUES (N'978-604-2-19999-8', N'Conan Tập 50', N'Aoyama Gosho', N'', 1, N'', 0, NULL, 0, 0, NULL, N'Tiếng Việt', 0, 0, 0, 0, NULL, 0, 0, 0, 1, 0, GETUTCDATE(), GETUTCDATE());
  SET @book_id = SCOPE_IDENTITY();
END
IF @book_id IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @book_id;
  DELETE FROM book_tags WHERE book_id = @book_id;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, N'https://placehold.co/400x560?text=Conan%20T%E1%BA%ADp%2050', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Skipped book "Conan Tập 50": ' + ERROR_MESSAGE();
END CATCH
GO
