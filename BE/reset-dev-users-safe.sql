USE bookstore_db;
GO

SET ANSI_NULLS ON;
SET ANSI_PADDING ON;
SET ANSI_WARNINGS ON;
SET ARITHABORT ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET QUOTED_IDENTIFIER ON;
SET NUMERIC_ROUNDABORT OFF;
GO

DECLARE @hash NVARCHAR(255) = N'$2b$10$Qm1PTtEa2.EPCScWdPPxouw2Jc5xT2l1VCin3BeqmYwl/p2dZctj2';

UPDATE users
SET password_hash = @hash,
    updated_at = GETUTCDATE()
WHERE id IN (1, 2, 3);

UPDATE users SET email = N'admin@bookstore.com', first_name = N'Admin', last_name = N'System' WHERE id = 1;
UPDATE users SET email = N'staff@bookstore.com' WHERE id = 2;
UPDATE users SET email = N'user@example.com' WHERE id = 3;

SELECT id, email, password_hash FROM users ORDER BY id;
GO
