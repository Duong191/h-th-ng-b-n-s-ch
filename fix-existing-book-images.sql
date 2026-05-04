-- Auto generated: fix broken /img/* image URLs for existing books.
-- Run this FIRST if you only want to fix the existing 10 books images without inserting new ones.
SET NOCOUNT ON;
GO

-- ===========================================================
-- Section 1: Fix the 10 legacy seed books from BE/SQLQuery1.sql
-- (these have ISBNs different from FE/public/seed/bookstoreData.json)
-- ===========================================================
-- Nhà Giả Kim
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-25888-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nhà Giả Kim' AND author = N'Paulo Coelho';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/nhagiakim.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Nhà Giả Kim" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Đắc Nhân Tâm
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-14725-7';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Đắc Nhân Tâm' AND author = N'Dale Carnegie';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=%C4%90%E1%BA%AFc%20Nh%C3%A2n%20T%C3%A2m', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Đắc Nhân Tâm" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Nguyên Lý Marketing
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-06654-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nguyên Lý Marketing' AND author = N'Philip Kotler';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Nguy%C3%AAn%20L%C3%BD%20Marketing', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Nguyên Lý Marketing" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Lập Trình Sạch (Clean Code)
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-0-13-468599-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Lập Trình Sạch (Clean Code)' AND author = N'Robert C. Martin';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=L%E1%BA%ADp%20Tr%C3%ACnh%20S%E1%BA%A1ch%20(Clean%20Code)', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Lập Trình Sạch (Clean Code)" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Cambridge IELTS 16 Academic
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-17892-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Cambridge IELTS 16 Academic' AND author = N'Cambridge';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/bia1-ielts-19aca.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Cambridge IELTS 16 Academic" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Doraemon Tập 1
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-19876-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Doraemon Tập 1' AND author = N'Fujiko F. Fujio';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Doraemon%20T%E1%BA%ADp%201', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Doraemon Tập 1" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Lược Sử Thời Gian
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-08765-4';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Lược Sử Thời Gian' AND author = N'Stephen Hawking';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Th%E1%BB%9Di%20Gian', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Lược Sử Thời Gian" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Sapiens: Lược Sử Loài Người
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-11234-5';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Sapiens: Lược Sử Loài Người' AND author = N'Yuval Noah Harari';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Sapiens%3A%20L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Lo%C3%A0i%20Ng%C6%B0%E1%BB%9Di', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Sapiens: Lược Sử Loài Người" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tư Duy Nhanh Và Chậm
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-15678-9';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tư Duy Nhanh Và Chậm' AND author = N'Daniel Kahneman';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=T%C6%B0%20Duy%20Nhanh%20V%C3%A0%20Ch%E1%BA%ADm', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Tư Duy Nhanh Và Chậm" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Conan Tập 50
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-19999-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Conan Tập 50' AND author = N'Aoyama Gosho';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/manga-comic/chu-thuat-hoi-chien_ban-thuong_bia_tap-16.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix legacy "Conan Tập 50" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- ===========================================================
-- Section 2: Fix images for all recovered books from bookstoreData.json
-- ===========================================================
-- Mưa Đỏ
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12345-6';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Mưa Đỏ' AND author = N'Chu Lai';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/muado.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Mưa Đỏ" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Hồ Điệp Và Kình Ngư
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12346-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Hồ Điệp Và Kình Ngư' AND author = N'Nguyễn Nhật Ánh';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/bia-2d_ho-diep-va-kinh-ngu_17307.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Hồ Điệp Và Kình Ngư" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Vạn Xuân
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12347-0';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Vạn Xuân' AND author = N'Yveline Féray';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/van_xuan.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Vạn Xuân" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Nhà Giả Kim
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12348-7';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nhà Giả Kim' AND author = N'Paulo Coelho';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/nhagiakim.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Nhà Giả Kim" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Lập Trình Sạch (Clean Code)
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12349-4';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Lập Trình Sạch (Clean Code)' AND author = N'Robert C. Martin';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=L%E1%BA%ADp%20Tr%C3%ACnh%20S%E1%BA%A1ch%20(Clean%20Code)', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Lập Trình Sạch (Clean Code)" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Sapiens: Lược Sử Loài Người
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12351-7';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Sapiens: Lược Sử Loài Người' AND author = N'Yuval Noah Harari';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Sapiens%3A%20L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Lo%C3%A0i%20Ng%C6%B0%E1%BB%9Di', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Sapiens: Lược Sử Loài Người" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- 4 Nguyên Tắc Thực Thi
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12352-4';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'4 Nguyên Tắc Thực Thi' AND author = N'Chris McChesney, Sean Covey, Jim Huling';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/4nguyentacthucthi.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "4 Nguyên Tắc Thực Thi" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Bí Mật Tư Duy
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12353-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Bí Mật Tư Duy' AND author = N'Carol S. Dweck';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/bimattuduy.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Bí Mật Tư Duy" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Nghệ Thuật Đàm Phán
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12354-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nghệ Thuật Đàm Phán' AND author = N'Roger Fisher, William Ury';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/nghethuatdamphan.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Nghệ Thuật Đàm Phán" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Nhà Lãnh Đạo Không Chức Danh
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12355-5';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nhà Lãnh Đạo Không Chức Danh' AND author = N'Robin Sharma';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/Nhalanhdaokhongchucdanh.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Nhà Lãnh Đạo Không Chức Danh" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Quản Lý Nghiệp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12356-2';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Quản Lý Nghiệp' AND author = N'Peter Drucker';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/quanlynghiep.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Quản Lý Nghiệp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Vị Giám Đốc 1 Phút
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12357-9';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Vị Giám Đốc 1 Phút' AND author = N'Ken Blanchard, Spencer Johnson';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/vigiamdoc1phut.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Vị Giám Đốc 1 Phút" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- MBA
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12358-6';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'MBA' AND author = N'Peter Navarro';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/MBA.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "MBA" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Một Đời Quản Trị
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12359-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Một Đời Quản Trị' AND author = N'Jack Welch';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/motdoiquantri.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Một Đời Quản Trị" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Ứng Dụng AI Vào Doanh Nghiệp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12360-0';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Ứng Dụng AI Vào Doanh Nghiệp' AND author = N'Thomas Davenport';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/_ng-d_ng-ai-v_o-doanh-nghi_p_9.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Ứng Dụng AI Vào Doanh Nghiệp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Vị Tu Sĩ
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12361-7';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Vị Tu Sĩ' AND author = N'Robin Sharma';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/vitusi.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Vị Tu Sĩ" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Combo Sách Tri Thức
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12362-4';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Combo Sách Tri Thức' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/combosachtrithuc.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Combo Sách Tri Thức" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 16
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12363-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 16' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-16.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 16" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 17
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12364-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 17' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-17.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 17" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 20
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12365-5';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 20' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-20.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 20" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 21
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12366-2';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 21' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_bia_tap-21.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 21" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 22
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12367-9';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 22' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_mockup_tap-22.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 22" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12368-6';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_tap-25_bia_card-pvc.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 25 (Bản Thường)" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12369-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_tap-25_bia_card-pvc-copy-0.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 25 (Bản Đặc Biệt)" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Chú Thuật Hồi Chiến - Tập 26
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12370-0';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Chú Thuật Hồi Chiến - Tập 26' AND author = N'Gege Akutami';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/chu-thuat-hoi-chien_ban-thuong_tap-26_bia_obi_card-pvc.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Chú Thuật Hồi Chiến - Tập 26" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Hồ Điệp Và Kình Ngư
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12371-7';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Hồ Điệp Và Kình Ngư' AND author = N'Nguyễn Nhật Ánh';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/bia-2d_ho-diep-va-kinh-ngu_17307.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Hồ Điệp Và Kình Ngư" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Cổ Tích Việt Nam
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12372-4';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Truyện Cổ Tích Việt Nam' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/image_186943.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Truyện Cổ Tích Việt Nam" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Dế Mèn Phiêu Lưu Ký
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12373-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Dế Mèn Phiêu Lưu Ký' AND author = N'Tô Hoài';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/image_232912.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Dế Mèn Phiêu Lưu Ký" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12374-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/8935244869002.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Truyện Tranh Khoa Học - Vũ Trụ Kỳ Diệu" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Cổ Tích Thế Giới - Tập 1
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12375-5';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Truyện Cổ Tích Thế Giới - Tập 1' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/8935244872361.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Truyện Cổ Tích Thế Giới - Tập 1" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Truyện Tranh Lịch Sử Việt Nam
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-12376-2';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Truyện Tranh Lịch Sử Việt Nam' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/8935280900905.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Truyện Tranh Lịch Sử Việt Nam" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Oxford English Grammar
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-0-19-431351-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Oxford English Grammar' AND author = N'John Eastwood';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/9781009195119.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Oxford English Grammar" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học 2000 Từ Vựng Tiếng Anh
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8931805006084';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tự Học 2000 Từ Vựng Tiếng Anh' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/8931805006084.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tự Học 2000 Từ Vựng Tiếng Anh" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Căn Bản Tiếng Anh
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8935343700565';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Ngữ Pháp Căn Bản Tiếng Anh' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/8935343700565.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Ngữ Pháp Căn Bản Tiếng Anh" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Nâng Cao Tiếng Anh
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8935343700572';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Ngữ Pháp Nâng Cao Tiếng Anh' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/8935343700572.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Ngữ Pháp Nâng Cao Tiếng Anh" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- English Vocabulary In Use - Intermediate
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8936110989558';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'English Vocabulary In Use - Intermediate' AND author = N'Michael McCarthy';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/8936110989558.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "English Vocabulary In Use - Intermediate" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Academic Writing Skills
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'9781009195119';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Academic Writing Skills' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/9781009195119.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Academic Writing Skills" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Giáo Trình Tiếng Anh Căn Bản
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'9786043350296';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Giáo Trình Tiếng Anh Căn Bản' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/9786043350296.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Giáo Trình Tiếng Anh Căn Bản" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Giáo Trình Tiếng Anh Nâng Cao
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'9786043356366';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Giáo Trình Tiếng Anh Nâng Cao' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/9786043356366.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Giáo Trình Tiếng Anh Nâng Cao" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- IELTS Speaking 6.0+
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IELTS-SPEAKING-6';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'IELTS Speaking 6.0+' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/b_a-1_ielts-speaking-6.0.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "IELTS Speaking 6.0+" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng IELTS 8.0
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IELTS-VOCAB-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Từ Vựng IELTS 8.0' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/b_a-18aca-1_1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Từ Vựng IELTS 8.0" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tổng Hợp Đề Thi IELTS General
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IELTS-GENERAL-TESTS';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tổng Hợp Đề Thi IELTS General' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/b_a-18gen-1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tổng Hợp Đề Thi IELTS General" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Barron's TOEIC 6th Edition
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'barrons-toeic-6th';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Barron''s TOEIC 6th Edition' AND author = N'Lin Lougheed';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/barronn-toeic-6th.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Barron''s TOEIC 6th Edition" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Giải Thích Ngữ Pháp Tiếng Anh
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'GIAI-THICH-NGUPHAP';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Giải Thích Ngữ Pháp Tiếng Anh' AND author = N'Mai Lan Hương';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/bia1_gtnpta_b_n-m_i.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Giải Thích Ngữ Pháp Tiếng Anh" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- IELTS Reading Intensive
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IELTS-READING-INT';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'IELTS Reading Intensive' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/bia1-ielts-19aca.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "IELTS Reading Intensive" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Collins Reading for IELTS
BEGIN TRY
DECLARE @bid BIGINT = NULL;
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Collins Reading for IELTS' AND author = N'Els Van Geyte';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/collins_readingforielts_1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Collins Reading for IELTS" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học Giao Tiếp Tiếng Anh Hằng Ngày
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'893-SELF-SPEAK-01';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tự Học Giao Tiếp Tiếng Anh Hằng Ngày' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/image_195509_1_18959.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tự Học Giao Tiếp Tiếng Anh Hằng Ngày" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học Tiếng Anh Qua Hình Ảnh
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'893-SELF-PICTURE-EN';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tự Học Tiếng Anh Qua Hình Ảnh' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/image_195509_1_30085.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tự Học Tiếng Anh Qua Hình Ảnh" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- 3000 Từ Vựng Tiếng Anh Quan Trọng
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'VOCAB-3000-EN';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'3000 Từ Vựng Tiếng Anh Quan Trọng' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/image_224922.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "3000 Từ Vựng Tiếng Anh Quan Trọng" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Anh Cho Người Mất Gốc
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'ENGLISH-BEGINNER-0';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tiếng Anh Cho Người Mất Gốc' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/image_227755.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tiếng Anh Cho Người Mất Gốc" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Anh Giao Tiếp Trong Công Việc
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'ENGLISH-BUSINESS';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tiếng Anh Giao Tiếp Trong Công Việc' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/image_236141.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tiếng Anh Giao Tiếp Trong Công Việc" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tự Học Tiếng Anh Qua Truyện Ngắn
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'ENGLISH-STORIES';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tự Học Tiếng Anh Qua Truyện Ngắn' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/unnamed_1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tự Học Tiếng Anh Qua Truyện Ngắn" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi Năng Lực Nhật Ngữ N5
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8934974187127';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Thi Năng Lực Nhật Ngữ N5' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/8934974187127.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Thi Năng Lực Nhật Ngữ N5" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N4 Toàn Diện
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8934974204480';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Thi JLPT N4 Toàn Diện' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/8934974204480.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Thi JLPT N4 Toàn Diện" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N3 - Ngữ Pháp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8934974204503';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Thi JLPT N3 - Ngữ Pháp' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/8934974204503.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Thi JLPT N3 - Ngữ Pháp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Kanji Sơ Cấp - Hán Tự Tiếng Nhật
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8935072893552';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Kanji Sơ Cấp - Hán Tự Tiếng Nhật' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/8935072893552.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Kanji Sơ Cấp - Hán Tự Tiếng Nhật" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Mimikara Oboeru - Học Tiếng Nhật Qua Nghe
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8935086855843';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Mimikara Oboeru - Học Tiếng Nhật Qua Nghe' AND author = N'Nishi-in';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/8935086855843_1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Mimikara Oboeru - Học Tiếng Nhật Qua Nghe" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Shin Nihongo 500 Mon - N3
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'8935086856680';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Shin Nihongo 500 Mon - N3' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/8935086856680.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Shin Nihongo 500 Mon - N3" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Minna no Nihongo - Bản Dịch Tiếng Việt
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'9786044022697';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Minna no Nihongo - Bản Dịch Tiếng Việt' AND author = N'3A Network';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/9786044022697-1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Minna no Nihongo - Bản Dịch Tiếng Việt" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng Tiếng Nhật Theo Chủ Đề
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'9786047763603';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Từ Vựng Tiếng Nhật Theo Chủ Đề' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/9786047763603.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Từ Vựng Tiếng Nhật Theo Chủ Đề" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Combo Shin Nihongo N3 + N2
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'COMBO-SHIN-N3-N2';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Combo Shin Nihongo N3 + N2' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/combo-8935086856680-8935086858035.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Combo Shin Nihongo N3 + N2" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Giao Tiếp Tiếng Nhật Hàng Ngày
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-1453';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Giao Tiếp Tiếng Nhật Hàng Ngày' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_1453.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Giao Tiếp Tiếng Nhật Hàng Ngày" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Nghe JLPT N2
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-26612';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Nghe JLPT N2' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_26612.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Nghe JLPT N2" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Đọc Hiểu Tiếng Nhật Nâng Cao
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-29719';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Đọc Hiểu Tiếng Nhật Nâng Cao' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_29719.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Đọc Hiểu Tiếng Nhật Nâng Cao" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Kanji N1 - Hán Tự Cao Cấp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-32597';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Kanji N1 - Hán Tự Cao Cấp' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_32597.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Kanji N1 - Hán Tự Cao Cấp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Tiếng Nhật N1
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-32598';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Ngữ Pháp Tiếng Nhật N1' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_32598.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Ngữ Pháp Tiếng Nhật N1" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng JLPT N5
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-4385';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Từ Vựng JLPT N5' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_4385_1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Từ Vựng JLPT N5" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Nhật Cho Người Mới Bắt Đầu
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-7960';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tiếng Nhật Cho Người Mới Bắt Đầu' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_7960.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tiếng Nhật Cho Người Mới Bắt Đầu" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Bài Tập Tiếng Nhật Trung Cấp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'IMAGE-195509-8463';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Bài Tập Tiếng Nhật Trung Cấp' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/image_195509_1_8463.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Bài Tập Tiếng Nhật Trung Cấp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'LUYEN-THI-N5-FULL';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/luyen_thi_nang_luc_nhat_ngu_n5_han_tu__tu_vung__ngu_phap__doc_hieu__nghe_hieu_1_2020_11_16_14_51_24.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Thi Năng Lực Nhật Ngữ N5 - Hán Tự, Từ Vựng, Ngữ Pháp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Ngữ Pháp Tiếng Nhật Cơ Bản
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'NP-JAPANESE';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Ngữ Pháp Tiếng Nhật Cơ Bản' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/np.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Ngữ Pháp Tiếng Nhật Cơ Bản" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Kanji Trung Cấp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'NXBTRE-KANJI-02';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Kanji Trung Cấp' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/nxbtre_full_02192018_041934.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Kanji Trung Cấp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N2 - Đọc Hiểu
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'NXBTRE-N2-READ';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Thi JLPT N2 - Đọc Hiểu' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/nxbtre_full_05202023_032037-_1_.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Thi JLPT N2 - Đọc Hiểu" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tiếng Nhật Giao Tiếp Công Sở
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'NXBTRE-BUSINESS';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tiếng Nhật Giao Tiếp Công Sở' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/nxbtre_full_19442024_034428_1.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tiếng Nhật Giao Tiếp Công Sở" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng Tiếng Nhật Theo Cấp Độ
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'NXBTRE-VOCAB';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Từ Vựng Tiếng Nhật Theo Cấp Độ' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/nxbtre_full_23232018_092301.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Từ Vựng Tiếng Nhật Theo Cấp Độ" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Luyện Thi JLPT N3 - Nghe Hiểu
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'NXBTRE-N3-LISTEN';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Luyện Thi JLPT N3 - Nghe Hiểu' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/nxbtre_full_31532023_025343.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Luyện Thi JLPT N3 - Nghe Hiểu" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Từ Vựng Tiếng Nhật Tổng Hợp
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'TV-JAPANESE';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Từ Vựng Tiếng Nhật Tổng Hợp' AND author = N'Nhiều tác giả';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_nhat/tv.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Từ Vựng Tiếng Nhật Tổng Hợp" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Nhà Giả Kim
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-25888-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nhà Giả Kim' AND author = N'Paulo Coelho';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/nhagiakim.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Nhà Giả Kim" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Đắc Nhân Tâm
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-14725-7';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Đắc Nhân Tâm' AND author = N'Dale Carnegie';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/dat-rung-phuong-nam.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Đắc Nhân Tâm" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Nguyên Lý Marketing
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-06654-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Nguyên Lý Marketing' AND author = N'Philip Kotler';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Nguy%C3%AAn%20L%C3%BD%20Marketing', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Nguyên Lý Marketing" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Cambridge IELTS 16 Academic
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-17892-3';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Cambridge IELTS 16 Academic' AND author = N'Cambridge';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'/img/sach_tieng_anh/bia1-ielts-19aca.jpg', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Cambridge IELTS 16 Academic" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Doraemon Tập 1
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-19876-1';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Doraemon Tập 1' AND author = N'Fujiko F. Fujio';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Doraemon%20T%E1%BA%ADp%201', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Doraemon Tập 1" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Lược Sử Thời Gian
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-08765-4';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Lược Sử Thời Gian' AND author = N'Stephen Hawking';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Th%E1%BB%9Di%20Gian', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Lược Sử Thời Gian" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Sapiens: Lược Sử Loài Người
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-11234-5';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Sapiens: Lược Sử Loài Người' AND author = N'Yuval Noah Harari';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Sapiens%3A%20L%C6%B0%E1%BB%A3c%20S%E1%BB%AD%20Lo%C3%A0i%20Ng%C6%B0%E1%BB%9Di', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Sapiens: Lược Sử Loài Người" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Tư Duy Nhanh Và Chậm
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-15678-9';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Tư Duy Nhanh Và Chậm' AND author = N'Daniel Kahneman';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=T%C6%B0%20Duy%20Nhanh%20V%C3%A0%20Ch%E1%BA%ADm', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Tư Duy Nhanh Và Chậm" failed: ' + ERROR_MESSAGE();
END CATCH
GO

-- Conan Tập 50
BEGIN TRY
DECLARE @bid BIGINT = NULL;
SELECT TOP 1 @bid = id FROM books WHERE isbn = N'978-604-2-19999-8';
IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = N'Conan Tập 50' AND author = N'Aoyama Gosho';
IF @bid IS NOT NULL
BEGIN
  DELETE FROM book_images WHERE book_id = @bid;
  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, N'https://placehold.co/400x560?text=Conan%20T%E1%BA%ADp%2050', 1, 1, GETUTCDATE());
END
END TRY
BEGIN CATCH
  PRINT N'Fix book "Conan Tập 50" failed: ' + ERROR_MESSAGE();
END CATCH
GO
