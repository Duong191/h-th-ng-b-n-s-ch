/*
  Reset mat khau va email dev: admin@bookstore.com, staff@bookstore.com, user@example.com — mat khau 1.
  Hash bcrypt dong bo voi src/config/defaultPasswordHash.ts (BCRYPT_HASH_DEV_PASSWORD_1).
*/
USE bookstore_db;
GO

DECLARE @hash NVARCHAR(255) = N'$2b$10$Qm1PTtEa2.EPCScWdPPxouw2Jc5xT2l1VCin3BeqmYwl/p2dZctj2';

UPDATE users SET password_hash = @hash, updated_at = GETUTCDATE() WHERE id IN (1, 2, 3);
UPDATE users SET email = N'admin@bookstore.com', first_name = N'Admin', last_name = N'System' WHERE id = 1;
UPDATE users SET email = N'staff@bookstore.com' WHERE id = 2;
UPDATE users SET email = N'user@example.com' WHERE id = 3;

DECLARE @ra BIGINT = (SELECT id FROM roles WHERE name = N'admin');
DECLARE @rs BIGINT = (SELECT id FROM roles WHERE name = N'staff');
DECLARE @ru BIGINT = (SELECT id FROM roles WHERE name = N'user');

IF @ra IS NOT NULL
  INSERT INTO user_roles (user_id, role_id, created_at) SELECT 1, @ra, GETUTCDATE()
  WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 1 AND role_id = @ra);
IF @rs IS NOT NULL
  INSERT INTO user_roles (user_id, role_id, created_at) SELECT 2, @rs, GETUTCDATE()
  WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 2 AND role_id = @rs);
IF @ru IS NOT NULL
  INSERT INTO user_roles (user_id, role_id, created_at) SELECT 3, @ru, GETUTCDATE()
  WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 3 AND role_id = @ru);

PRINT N'OK: admin / staff / user — password 1';
GO
