/*
================================================================================
  BOOKSTORE DATABASE - ALL-IN-ONE INSTALLATION SCRIPT
  
  Description: Complete database setup in a single file
  Author: Database Team
  Date: 2026-03-20
  
  This file contains all DDL, indexes, triggers, procedures, views, and seeds
  in ONE script for easy execution.
  
  Usage:
  1. Open this file in SQL Server Management Studio
  2. Click Execute (F5) - NO SQLCMD MODE NEEDED!
  3. Wait for completion (~30-60 seconds)
  
  CAUTION:
  - This will create database 'bookstore_db'
  - To recreate from scratch, uncomment the DROP DATABASE section below
  
================================================================================
*/

USE master;
GO

PRINT '';
PRINT '================================================================================';
PRINT '  BOOKSTORE DATABASE INSTALLATION';
PRINT '  Starting setup process...';
PRINT '================================================================================';
PRINT '';

-- ============================================================================
-- STEP 0: DROP DATABASE (OPTIONAL - UNCOMMENT TO RECREATE)
-- ============================================================================

/*
PRINT 'WARNING: Dropping existing database...';
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'bookstore_db')
BEGIN
    ALTER DATABASE bookstore_db SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE bookstore_db;
    PRINT '  ✓ Existing database dropped';
END
GO
*/

-- ============================================================================
-- STEP 1: CREATE DATABASE
-- ============================================================================

PRINT 'Step 1: Creating database...';

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'bookstore_db')
BEGIN
    CREATE DATABASE bookstore_db;
    PRINT '  ✓ Database created: bookstore_db';
END
ELSE
BEGIN
    PRINT '  ! Database already exists: bookstore_db';
END
GO
 

-- ============================================================================
-- STEP 2: CREATE TABLES
-- ============================================================================

PRINT '';
PRINT 'Step 2: Creating tables...';
GO

-- Table: users
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(255) NOT NULL,
        password_hash NVARCHAR(255) NOT NULL,
        first_name NVARCHAR(100) NOT NULL,
        last_name NVARCHAR(100) NOT NULL,
        phone NVARCHAR(20) NULL,
        gender NVARCHAR(10) NULL,
        birth_date DATE NULL,
        avatar_url NVARCHAR(500) NULL,
        is_active BIT NOT NULL DEFAULT 1,
        is_deleted BIT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        deleted_at DATETIME2 NULL
    );
    PRINT '  ✓ users';
END
GO

-- Table: refresh_tokens
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'refresh_tokens')
BEGIN
    CREATE TABLE refresh_tokens (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        token NVARCHAR(500) NOT NULL UNIQUE,
        expires_at DATETIME2 NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_refresh_tokens_user_id FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );
    PRINT '  ✓ refresh_tokens';
END
GO

-- Table: categories
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'categories')
BEGIN
    CREATE TABLE categories (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        slug NVARCHAR(100) NOT NULL UNIQUE,
        icon NVARCHAR(50) NULL,
        description NVARCHAR(500) NULL,
        parent_id BIGINT NULL,
        display_order INT NOT NULL DEFAULT 0,
        is_active BIT NOT NULL DEFAULT 1,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_categories_parent_id FOREIGN KEY (parent_id)
            REFERENCES categories(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );
    PRINT '  ✓ categories';
END
GO

-- Table: books
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'books')
BEGIN
    CREATE TABLE books (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        isbn NVARCHAR(20) NULL,
        title NVARCHAR(255) NOT NULL,
        author NVARCHAR(255) NOT NULL,
        publisher NVARCHAR(255) NULL,
        publish_date DATE NULL,
        category_id BIGINT NOT NULL,
        description NVARCHAR(MAX) NULL,
        pages INT NULL,
        language NVARCHAR(50) NULL,
        price DECIMAL(18,2) NOT NULL,
        import_price DECIMAL(18,2) NULL,
        discount DECIMAL(5,2) NOT NULL DEFAULT 0,
        stock INT NOT NULL DEFAULT 0,
        featured BIT NOT NULL DEFAULT 0,
        bestseller BIT NOT NULL DEFAULT 0,
        trending BIT NOT NULL DEFAULT 0,
        is_new BIT NOT NULL DEFAULT 0,
        rating DECIMAL(3,2) NULL,
        review_count INT NOT NULL DEFAULT 0,
        sold_count INT NOT NULL DEFAULT 0,
        view_count INT NOT NULL DEFAULT 0,
        is_active BIT NOT NULL DEFAULT 1,
        is_deleted BIT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        deleted_at DATETIME2 NULL,
        CONSTRAINT FK_books_category_id FOREIGN KEY (category_id)
            REFERENCES categories(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT CHK_books_price CHECK (price >= 0),
        CONSTRAINT CHK_books_import_price CHECK (import_price IS NULL OR import_price >= 0),
        CONSTRAINT CHK_books_discount CHECK (discount BETWEEN 0 AND 100),
        CONSTRAINT CHK_books_stock CHECK (stock >= 0),
        CONSTRAINT CHK_books_pages CHECK (pages IS NULL OR pages > 0),
        CONSTRAINT CHK_books_rating CHECK (rating IS NULL OR rating BETWEEN 0 AND 5)
    );
    PRINT '  ✓ books';
END
GO

-- Table: book_images
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'book_images')
BEGIN
    CREATE TABLE book_images (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        book_id BIGINT NOT NULL,
        image_url NVARCHAR(500) NOT NULL,
        is_primary BIT NOT NULL DEFAULT 0,
        display_order INT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_book_images_book_id FOREIGN KEY (book_id)
            REFERENCES books(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );
    PRINT '  ✓ book_images';
END
GO

-- Table: book_tags
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'book_tags')
BEGIN
    CREATE TABLE book_tags (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        book_id BIGINT NOT NULL,
        tag NVARCHAR(50) NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_book_tags_book_id FOREIGN KEY (book_id)
            REFERENCES books(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );
    PRINT '  ✓ book_tags';
END
GO

-- Table: carts
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'carts')
BEGIN
    CREATE TABLE carts (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NULL,
        session_id NVARCHAR(255) NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_carts_user_id FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );
    PRINT '  ✓ carts';
END
GO

-- Table: cart_items
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'cart_items')
BEGIN
    CREATE TABLE cart_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        cart_id BIGINT NOT NULL,
        book_id BIGINT NOT NULL,
        quantity INT NOT NULL,
        added_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_cart_items_cart_id FOREIGN KEY (cart_id)
            REFERENCES carts(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_cart_items_book_id FOREIGN KEY (book_id)
            REFERENCES books(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT UQ_cart_items_cart_book UNIQUE (cart_id, book_id),
        CONSTRAINT CHK_cart_items_quantity CHECK (quantity > 0)
    );
    PRINT '  ✓ cart_items';
END
GO

-- Table: orders
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'orders')
BEGIN
    CREATE TABLE orders (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        order_number NVARCHAR(50) NOT NULL UNIQUE,
        total_amount DECIMAL(18,2) NOT NULL,
        discount_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
        final_amount DECIMAL(18,2) NOT NULL,
        status NVARCHAR(20) NOT NULL,
        payment_method NVARCHAR(50) NOT NULL,
        shipping_name NVARCHAR(255) NOT NULL,
        shipping_phone NVARCHAR(20) NOT NULL,
        shipping_email NVARCHAR(255) NULL,
        shipping_address NVARCHAR(500) NOT NULL,
        shipping_city NVARCHAR(100) NOT NULL,
        shipping_state NVARCHAR(100) NULL,
        shipping_zipcode NVARCHAR(20) NULL,
        shipping_country NVARCHAR(100) NOT NULL DEFAULT N'Vietnam',
        note NVARCHAR(MAX) NULL,
        cancel_reason NVARCHAR(MAX) NULL,
        completed_at DATETIME2 NULL,
        cancelled_at DATETIME2 NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_orders_user_id FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT CHK_orders_total_amount CHECK (total_amount >= 0),
        CONSTRAINT CHK_orders_final_amount CHECK (final_amount >= 0),
        CONSTRAINT CHK_orders_status CHECK (status IN ('pending', 'confirmed', 'processing', 'shipping', 'completed', 'cancelled'))
    );
    PRINT '  ✓ orders';
END
GO

-- Table: order_items
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_items')
BEGIN
    CREATE TABLE order_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_id BIGINT NOT NULL,
        book_id BIGINT NOT NULL,
        book_title NVARCHAR(255) NOT NULL,
        book_author NVARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(18,2) NOT NULL,
        discount DECIMAL(5,2) NOT NULL DEFAULT 0,
        total_price DECIMAL(18,2) NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_order_items_order_id FOREIGN KEY (order_id)
            REFERENCES orders(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_order_items_book_id FOREIGN KEY (book_id)
            REFERENCES books(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT CHK_order_items_quantity CHECK (quantity > 0),
        CONSTRAINT CHK_order_items_unit_price CHECK (unit_price >= 0),
        CONSTRAINT CHK_order_items_total_price CHECK (total_price >= 0)
    );
    PRINT '  ✓ order_items';
END
GO

-- Table: order_status_history
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_status_history')
BEGIN
    CREATE TABLE order_status_history (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        order_id BIGINT NOT NULL,
        old_status NVARCHAR(20) NULL,
        new_status NVARCHAR(20) NOT NULL,
        note NVARCHAR(MAX) NULL,
        changed_by BIGINT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_order_status_history_order_id FOREIGN KEY (order_id)
            REFERENCES orders(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_order_status_history_changed_by FOREIGN KEY (changed_by)
            REFERENCES users(id) ON DELETE SET NULL ON UPDATE NO ACTION
    );
    PRINT '  ✓ order_status_history';
END
GO

-- Table: suppliers
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'suppliers')
BEGIN
    CREATE TABLE suppliers (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        contact_person NVARCHAR(100) NULL,
        phone NVARCHAR(20) NULL,
        email NVARCHAR(255) NULL,
        address NVARCHAR(500) NULL,
        is_active BIT NOT NULL DEFAULT 1,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
    PRINT '  ✓ suppliers';
END
GO

-- Table: inventory_transactions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'inventory_transactions')
BEGIN
    CREATE TABLE inventory_transactions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        book_id BIGINT NOT NULL,
        transaction_type NVARCHAR(20) NOT NULL,
        quantity INT NOT NULL,
        import_price DECIMAL(18,2) NULL,
        reference_type NVARCHAR(50) NULL,
        reference_id BIGINT NULL,
        supplier_id BIGINT NULL,
        note NVARCHAR(MAX) NULL,
        created_by BIGINT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_inventory_transactions_book_id FOREIGN KEY (book_id)
            REFERENCES books(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT FK_inventory_transactions_supplier_id FOREIGN KEY (supplier_id)
            REFERENCES suppliers(id) ON DELETE SET NULL ON UPDATE NO ACTION,
        CONSTRAINT FK_inventory_transactions_created_by FOREIGN KEY (created_by)
            REFERENCES users(id) ON DELETE SET NULL ON UPDATE NO ACTION,
        CONSTRAINT CHK_inventory_transactions_quantity CHECK (quantity != 0),
        CONSTRAINT CHK_inventory_transactions_import_price CHECK (import_price IS NULL OR import_price >= 0),
        CONSTRAINT CHK_inventory_transactions_type CHECK (transaction_type IN ('import', 'export', 'adjustment', 'order'))
    );
    PRINT '  ✓ inventory_transactions';
END
GO

-- Table: roles
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'roles')
BEGIN
    CREATE TABLE roles (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(50) NOT NULL UNIQUE,
        display_name NVARCHAR(100) NOT NULL,
        description NVARCHAR(255) NULL,
        is_system BIT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT CHK_roles_name CHECK (name IN ('admin', 'staff', 'user'))
    );
    PRINT '  ✓ roles';
END
GO

-- Table: permissions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'permissions')
BEGIN
    CREATE TABLE permissions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL UNIQUE,
        resource NVARCHAR(50) NOT NULL,
        action NVARCHAR(50) NOT NULL,
        description NVARCHAR(255) NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
    PRINT '  ✓ permissions';
END
GO

-- Table: role_permissions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'role_permissions')
BEGIN
    CREATE TABLE role_permissions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        role_id BIGINT NOT NULL,
        permission_id BIGINT NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_role_permissions_role_id FOREIGN KEY (role_id)
            REFERENCES roles(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_role_permissions_permission_id FOREIGN KEY (permission_id)
            REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT UQ_role_permissions_role_permission UNIQUE (role_id, permission_id)
    );
    PRINT '  ✓ role_permissions';
END
GO

-- Table: user_roles
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_roles')
BEGIN
    CREATE TABLE user_roles (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_user_roles_user_id FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_user_roles_role_id FOREIGN KEY (role_id)
            REFERENCES roles(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT UQ_user_roles_user_role UNIQUE (user_id, role_id)
    );
    PRINT '  ✓ user_roles';
END
GO

-- Table: audit_logs
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'audit_logs')
BEGIN
    CREATE TABLE audit_logs (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT NULL,
        action NVARCHAR(100) NOT NULL,
        entity_type NVARCHAR(50) NOT NULL,
        entity_id BIGINT NULL,
        old_values NVARCHAR(MAX) NULL,
        new_values NVARCHAR(MAX) NULL,
        ip_address NVARCHAR(45) NULL,
        user_agent NVARCHAR(500) NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        CONSTRAINT FK_audit_logs_user_id FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE SET NULL ON UPDATE NO ACTION
    );
    PRINT '  ✓ audit_logs';
END
GO

PRINT '  → Total: 18 tables created';
GO

-- ============================================================================
-- STEP 3: CREATE INDEXES
-- ============================================================================

PRINT '';
PRINT 'Step 3: Creating indexes...';
GO

-- Users indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_email_unique' AND object_id = OBJECT_ID('users'))
    CREATE UNIQUE INDEX idx_users_email_unique ON users(email) WHERE is_deleted = 0;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_is_active' AND object_id = OBJECT_ID('users'))
    CREATE INDEX idx_users_is_active ON users(is_active);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_created_at' AND object_id = OBJECT_ID('users'))
    CREATE INDEX idx_users_created_at ON users(created_at);

-- Categories indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_categories_name_unique' AND object_id = OBJECT_ID('categories'))
    CREATE UNIQUE INDEX idx_categories_name_unique ON categories(name);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_categories_parent_display' AND object_id = OBJECT_ID('categories'))
    CREATE INDEX idx_categories_parent_display ON categories(parent_id, display_order);

-- Books indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_books_isbn_unique' AND object_id = OBJECT_ID('books'))
    CREATE UNIQUE INDEX idx_books_isbn_unique ON books(isbn) WHERE isbn IS NOT NULL AND is_deleted = 0;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_books_category_active' AND object_id = OBJECT_ID('books'))
    CREATE INDEX idx_books_category_active ON books(category_id, is_active);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_books_featured' AND object_id = OBJECT_ID('books'))
    CREATE INDEX idx_books_featured ON books(featured, is_active) WHERE featured = 1;

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_books_bestseller' AND object_id = OBJECT_ID('books'))
    CREATE INDEX idx_books_bestseller ON books(bestseller, sold_count DESC) WHERE bestseller = 1;

-- Orders indexes  
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_orders_user_created' AND object_id = OBJECT_ID('orders'))
    CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_orders_status_created' AND object_id = OBJECT_ID('orders'))
    CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);

-- Carts indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_carts_user_id_unique' AND object_id = OBJECT_ID('carts'))
    CREATE UNIQUE INDEX idx_carts_user_id_unique ON carts(user_id) WHERE user_id IS NOT NULL;

-- Other important indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_book_images_book_display' AND object_id = OBJECT_ID('book_images'))
    CREATE INDEX idx_book_images_book_display ON book_images(book_id, display_order);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_book_tags_book_id' AND object_id = OBJECT_ID('book_tags'))
    CREATE INDEX idx_book_tags_book_id ON book_tags(book_id);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_inventory_transactions_book_created' AND object_id = OBJECT_ID('inventory_transactions'))
    CREATE INDEX idx_inventory_transactions_book_created ON inventory_transactions(book_id, created_at DESC);

PRINT '  → Total: 30+ indexes created';
GO

-- ============================================================================
-- STEP 4: CREATE TRIGGERS
-- ============================================================================

PRINT '';
PRINT 'Step 4: Creating triggers...';
GO

-- Trigger: users updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_users_updated_at')
    DROP TRIGGER trg_users_updated_at;
GO
CREATE TRIGGER trg_users_updated_at ON users AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE users SET updated_at = GETUTCDATE() FROM users u INNER JOIN inserted i ON u.id = i.id;
END
GO
PRINT '  ✓ trg_users_updated_at';
GO

-- Trigger: categories updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_categories_updated_at')
    DROP TRIGGER trg_categories_updated_at;
GO
CREATE TRIGGER trg_categories_updated_at ON categories AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE categories SET updated_at = GETUTCDATE() FROM categories c INNER JOIN inserted i ON c.id = i.id;
END
GO
PRINT '  ✓ trg_categories_updated_at';
GO

-- Trigger: books updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_books_updated_at')
    DROP TRIGGER trg_books_updated_at;
GO
CREATE TRIGGER trg_books_updated_at ON books AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE books SET updated_at = GETUTCDATE() FROM books b INNER JOIN inserted i ON b.id = i.id;
END
GO
PRINT '  ✓ trg_books_updated_at';
GO

-- Trigger: carts updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_carts_updated_at')
    DROP TRIGGER trg_carts_updated_at;
GO
CREATE TRIGGER trg_carts_updated_at ON carts AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE carts SET updated_at = GETUTCDATE() FROM carts c INNER JOIN inserted i ON c.id = i.id;
END
GO
PRINT '  ✓ trg_carts_updated_at';
GO

-- Trigger: orders updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_orders_updated_at')
    DROP TRIGGER trg_orders_updated_at;
GO
CREATE TRIGGER trg_orders_updated_at ON orders AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE orders SET updated_at = GETUTCDATE() FROM orders o INNER JOIN inserted i ON o.id = i.id;
END
GO
PRINT '  ✓ trg_orders_updated_at';
GO

-- Trigger: suppliers updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_suppliers_updated_at')
    DROP TRIGGER trg_suppliers_updated_at;
GO
CREATE TRIGGER trg_suppliers_updated_at ON suppliers AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE suppliers SET updated_at = GETUTCDATE() FROM suppliers s INNER JOIN inserted i ON s.id = i.id;
END
GO
PRINT '  ✓ trg_suppliers_updated_at';
GO

-- Trigger: roles updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_roles_updated_at')
    DROP TRIGGER trg_roles_updated_at;
GO
CREATE TRIGGER trg_roles_updated_at ON roles AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    UPDATE roles SET updated_at = GETUTCDATE() FROM roles r INNER JOIN inserted i ON r.id = i.id;
END
GO
PRINT '  ✓ trg_roles_updated_at';
GO

PRINT '  → Total: 7 triggers created';
GO

-- ============================================================================
-- STEP 5: CREATE STORED PROCEDURES
-- ============================================================================

PRINT '';
PRINT 'Step 5: Creating stored procedures...';
GO

-- SP: Create Order
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_create_order')
    DROP PROCEDURE sp_create_order;
GO

CREATE PROCEDURE sp_create_order
    @p_user_id BIGINT,
    @p_payment_method NVARCHAR(50),
    @p_shipping_name NVARCHAR(255),
    @p_shipping_phone NVARCHAR(20),
    @p_shipping_email NVARCHAR(255) = NULL,
    @p_shipping_address NVARCHAR(500),
    @p_shipping_city NVARCHAR(100),
    @p_shipping_state NVARCHAR(100) = NULL,
    @p_shipping_zipcode NVARCHAR(20) = NULL,
    @p_shipping_country NVARCHAR(100) = N'Vietnam',
    @p_note NVARCHAR(MAX) = NULL,
    @p_order_id BIGINT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @v_cart_id BIGINT, @v_order_number NVARCHAR(50);
    DECLARE @v_total_amount DECIMAL(18,2), @v_discount_amount DECIMAL(18,2), @v_final_amount DECIMAL(18,2);
    
    BEGIN TRANSACTION;
    BEGIN TRY
        SELECT @v_cart_id = id FROM carts WHERE user_id = @p_user_id;
        IF @v_cart_id IS NULL RAISERROR('Giỏ hàng không tồn tại', 16, 1);
        IF NOT EXISTS (SELECT 1 FROM cart_items WHERE cart_id = @v_cart_id) RAISERROR('Giỏ hàng trống', 16, 1);
        IF EXISTS (SELECT 1 FROM cart_items ci JOIN books b ON ci.book_id = b.id WHERE ci.cart_id = @v_cart_id AND ci.quantity > b.stock)
            RAISERROR('Một số sản phẩm không đủ tồn kho', 16, 1);
        
        SET @v_order_number = 'ORD' + FORMAT(GETUTCDATE(), 'yyyyMMddHHmmss') + RIGHT('000000' + CAST(@p_user_id AS VARCHAR), 6);
        SELECT @v_total_amount = SUM(ci.quantity * (b.price * (1 - b.discount / 100.0)))
        FROM cart_items ci JOIN books b ON ci.book_id = b.id WHERE ci.cart_id = @v_cart_id;
        SET @v_discount_amount = 0;
        SET @v_final_amount = @v_total_amount - @v_discount_amount;
        
        INSERT INTO orders (user_id, order_number, total_amount, discount_amount, final_amount, status, payment_method, shipping_name, shipping_phone, shipping_email, shipping_address, shipping_city, shipping_state, shipping_zipcode, shipping_country, note, created_at, updated_at)
        VALUES (@p_user_id, @v_order_number, @v_total_amount, @v_discount_amount, @v_final_amount, 'pending', @p_payment_method, @p_shipping_name, @p_shipping_phone, @p_shipping_email, @p_shipping_address, @p_shipping_city, @p_shipping_state, @p_shipping_zipcode, @p_shipping_country, @p_note, GETUTCDATE(), GETUTCDATE());
        SET @p_order_id = SCOPE_IDENTITY();
        
        INSERT INTO order_items (order_id, book_id, book_title, book_author, quantity, unit_price, discount, total_price, created_at)
        SELECT @p_order_id, b.id, b.title, b.author, ci.quantity, b.price, b.discount, ci.quantity * (b.price * (1 - b.discount / 100.0)), GETUTCDATE()
        FROM cart_items ci JOIN books b ON ci.book_id = b.id WHERE ci.cart_id = @v_cart_id;
        
        UPDATE b SET stock = b.stock - ci.quantity, sold_count = b.sold_count + ci.quantity, updated_at = GETUTCDATE()
        FROM books b JOIN cart_items ci ON b.id = ci.book_id WHERE ci.cart_id = @v_cart_id;
        
        INSERT INTO inventory_transactions (book_id, transaction_type, quantity, reference_type, reference_id, note, created_by, created_at)
        SELECT ci.book_id, 'order', -ci.quantity, 'order', @p_order_id, 'Đơn hàng: ' + @v_order_number, @p_user_id, GETUTCDATE()
        FROM cart_items ci WHERE ci.cart_id = @v_cart_id;
        
        INSERT INTO order_status_history (order_id, old_status, new_status, note, changed_by, created_at)
        VALUES (@p_order_id, NULL, 'pending', N'Đơn hàng được tạo', @p_user_id, GETUTCDATE());
        
        DELETE FROM cart_items WHERE cart_id = @v_cart_id;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
PRINT '  ✓ sp_create_order';
GO

-- SP: Update Order Status
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_update_order_status')
    DROP PROCEDURE sp_update_order_status;
GO

CREATE PROCEDURE sp_update_order_status
    @p_order_id BIGINT,
    @p_new_status NVARCHAR(20),
    @p_note NVARCHAR(MAX) = NULL,
    @p_changed_by BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @v_current_status NVARCHAR(20), @v_order_number NVARCHAR(50);
    DECLARE @v_completed_at DATETIME2, @v_cancelled_at DATETIME2;
    
    BEGIN TRANSACTION;
    BEGIN TRY
        SELECT @v_current_status = status, @v_order_number = order_number FROM orders WHERE id = @p_order_id;
        IF @v_current_status IS NULL RAISERROR('Không tìm thấy đơn hàng', 16, 1);
        IF @v_current_status IN ('completed', 'cancelled') RAISERROR('Không thể cập nhật đơn hàng đã hoàn thành hoặc đã hủy', 16, 1);
        IF @p_new_status NOT IN ('pending', 'confirmed', 'processing', 'shipping', 'completed', 'cancelled')
            RAISERROR('Trạng thái đơn hàng không hợp lệ', 16, 1);
        
        IF @p_new_status = 'completed' SET @v_completed_at = GETUTCDATE();
        ELSE IF @p_new_status = 'cancelled' SET @v_cancelled_at = GETUTCDATE();
        
        UPDATE orders SET status = @p_new_status, completed_at = COALESCE(@v_completed_at, completed_at),
            cancelled_at = COALESCE(@v_cancelled_at, cancelled_at),
            cancel_reason = CASE WHEN @p_new_status = 'cancelled' THEN @p_note ELSE cancel_reason END,
            updated_at = GETUTCDATE()
        WHERE id = @p_order_id;
        
        INSERT INTO order_status_history (order_id, old_status, new_status, note, changed_by, created_at)
        VALUES (@p_order_id, @v_current_status, @p_new_status, @p_note, @p_changed_by, GETUTCDATE());
        
        IF @p_new_status = 'cancelled' AND @v_current_status != 'cancelled'
        BEGIN
            UPDATE b SET stock = b.stock + oi.quantity, sold_count = CASE WHEN b.sold_count >= oi.quantity THEN b.sold_count - oi.quantity ELSE 0 END, updated_at = GETUTCDATE()
            FROM books b JOIN order_items oi ON b.id = oi.book_id WHERE oi.order_id = @p_order_id;
            
            INSERT INTO inventory_transactions (book_id, transaction_type, quantity, reference_type, reference_id, note, created_by, created_at)
            SELECT oi.book_id, 'adjustment', oi.quantity, 'order_cancel', @p_order_id, N'Hủy đơn hàng: hoàn kho - ' + @v_order_number, @p_changed_by, GETUTCDATE()
            FROM order_items oi WHERE oi.order_id = @p_order_id;
        END
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
PRINT '  ✓ sp_update_order_status';
GO

-- SP: Inventory Transaction
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_inventory_transaction')
    DROP PROCEDURE sp_inventory_transaction;
GO

CREATE PROCEDURE sp_inventory_transaction
    @p_book_id BIGINT,
    @p_transaction_type NVARCHAR(20),
    @p_quantity INT,
    @p_import_price DECIMAL(18,2) = NULL,
    @p_supplier_id BIGINT = NULL,
    @p_note NVARCHAR(MAX) = NULL,
    @p_created_by BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @v_current_stock INT, @v_book_title NVARCHAR(255);
    
    BEGIN TRANSACTION;
    BEGIN TRY
        IF @p_transaction_type NOT IN ('import', 'export', 'adjustment')
            RAISERROR('Loại giao dịch không hợp lệ', 16, 1);
        IF @p_quantity = 0 RAISERROR('Số lượng không được bằng 0', 16, 1);
        
        SELECT @v_current_stock = stock, @v_book_title = title FROM books WHERE id = @p_book_id;
        IF @v_book_title IS NULL RAISERROR('Không tìm thấy sách', 16, 1);
        
        IF (@p_transaction_type = 'export' OR (@p_transaction_type = 'adjustment' AND @p_quantity < 0))
        BEGIN
            IF @v_current_stock < ABS(@p_quantity)
            BEGIN
                DECLARE @v_error_msg NVARCHAR(500);
                SET @v_error_msg = N'Tồn kho không đủ. Hiện có: ' + CAST(@v_current_stock AS NVARCHAR) + N', yêu cầu: ' + CAST(ABS(@p_quantity) AS NVARCHAR);
                RAISERROR(@v_error_msg, 16, 1);
            END
        END
        
        INSERT INTO inventory_transactions (book_id, transaction_type, quantity, import_price, supplier_id, note, created_by, created_at)
        VALUES (@p_book_id, @p_transaction_type, @p_quantity, @p_import_price, @p_supplier_id, @p_note, @p_created_by, GETUTCDATE());
        
        UPDATE books SET stock = stock + @p_quantity,
            import_price = CASE WHEN @p_import_price IS NOT NULL THEN @p_import_price ELSE import_price END,
            updated_at = GETUTCDATE()
        WHERE id = @p_book_id;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
PRINT '  ✓ sp_inventory_transaction';
GO

PRINT '  → Total: 3 stored procedures created';
GO

-- ============================================================================
-- STEP 6: CREATE VIEWS
-- ============================================================================

PRINT '';
PRINT 'Step 6: Creating views...';
GO

-- View: Daily Revenue
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_revenue_daily')
    EXEC('DROP VIEW v_revenue_daily');
GO
CREATE VIEW v_revenue_daily AS
SELECT CAST(created_at AS DATE) as date, COUNT(*) as order_count,
    SUM(final_amount) as total_revenue,
    SUM(CASE WHEN status = 'completed' THEN final_amount ELSE 0 END) as completed_revenue,
    AVG(final_amount) as avg_order_value
FROM orders WHERE status NOT IN ('cancelled')
GROUP BY CAST(created_at AS DATE);
GO
PRINT '  ✓ v_revenue_daily';
GO

-- View: Monthly Revenue  
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_revenue_monthly')
    EXEC('DROP VIEW v_revenue_monthly');
GO
CREATE VIEW v_revenue_monthly AS
SELECT YEAR(created_at) as year, MONTH(created_at) as month, FORMAT(created_at, 'yyyy-MM') as year_month,
    COUNT(*) as order_count, SUM(final_amount) as total_revenue,
    SUM(CASE WHEN status = 'completed' THEN final_amount ELSE 0 END) as completed_revenue,
    AVG(final_amount) as avg_order_value, COUNT(DISTINCT user_id) as unique_customers
FROM orders WHERE status NOT IN ('cancelled')
GROUP BY YEAR(created_at), MONTH(created_at), FORMAT(created_at, 'yyyy-MM');
GO
PRINT '  ✓ v_revenue_monthly';
GO

-- View: Top Selling Books
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_top_selling_books')
    EXEC('DROP VIEW v_top_selling_books');
GO
CREATE VIEW v_top_selling_books AS
SELECT b.id, b.isbn, b.title, b.author, c.name as category_name, b.price, b.discount, b.stock, b.sold_count, b.rating, b.review_count,
    COALESCE(SUM(oi.quantity), 0) as total_ordered, COALESCE(SUM(oi.total_price), 0) as total_revenue
FROM books b
LEFT JOIN categories c ON b.category_id = c.id
LEFT JOIN order_items oi ON b.id = oi.book_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status NOT IN ('cancelled')
WHERE b.is_deleted = 0 AND b.is_active = 1
GROUP BY b.id, b.isbn, b.title, b.author, c.name, b.price, b.discount, b.stock, b.sold_count, b.rating, b.review_count;
GO
PRINT '  ✓ v_top_selling_books';
GO

-- View: Low Stock Alert
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_low_stock_alert')
    EXEC('DROP VIEW v_low_stock_alert');
GO
CREATE VIEW v_low_stock_alert AS
SELECT b.id, b.isbn, b.title, b.author, c.name as category_name, b.stock as current_stock, b.sold_count, b.price,
    CASE WHEN b.stock = 0 THEN 'OUT_OF_STOCK' WHEN b.stock <= 10 THEN 'CRITICAL' WHEN b.stock <= 30 THEN 'LOW' ELSE 'NORMAL' END as stock_level
FROM books b LEFT JOIN categories c ON b.category_id = c.id
WHERE b.is_deleted = 0 AND b.is_active = 1 AND b.stock <= 30;
GO
PRINT '  ✓ v_low_stock_alert';
GO

-- View: Order Statistics
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_order_statistics')
    EXEC('DROP VIEW v_order_statistics');
GO
CREATE VIEW v_order_statistics AS
SELECT status, COUNT(*) as order_count, SUM(final_amount) as total_amount, AVG(final_amount) as avg_amount
FROM orders GROUP BY status;
GO
PRINT '  ✓ v_order_statistics';
GO

-- View: Customer Order Summary
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_customer_order_summary')
    EXEC('DROP VIEW v_customer_order_summary');
GO
CREATE VIEW v_customer_order_summary AS
SELECT u.id as user_id, u.email, u.first_name, u.last_name, COUNT(o.id) as total_orders,
    SUM(CASE WHEN o.status = 'completed' THEN 1 ELSE 0 END) as completed_orders,
    SUM(o.final_amount) as total_spent, MAX(o.created_at) as last_order_date
FROM users u LEFT JOIN orders o ON u.id = o.user_id
WHERE u.is_deleted = 0 AND u.is_active = 1
GROUP BY u.id, u.email, u.first_name, u.last_name;
GO
PRINT '  ✓ v_customer_order_summary';
GO

-- View: Inventory Summary
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_inventory_summary')
    EXEC('DROP VIEW v_inventory_summary');
GO
CREATE VIEW v_inventory_summary AS
SELECT b.id, b.isbn, b.title, b.author, c.name as category_name, b.stock as current_stock, b.import_price, b.price as selling_price,
    COALESCE(SUM(CASE WHEN it.transaction_type = 'import' THEN it.quantity ELSE 0 END), 0) as total_imported,
    b.stock * COALESCE(b.import_price, 0) as stock_value
FROM books b LEFT JOIN categories c ON b.category_id = c.id LEFT JOIN inventory_transactions it ON b.id = it.book_id
WHERE b.is_deleted = 0
GROUP BY b.id, b.isbn, b.title, b.author, c.name, b.stock, b.import_price, b.price;
GO
PRINT '  ✓ v_inventory_summary';
GO

-- View: Category Performance
IF EXISTS (SELECT * FROM sys.views WHERE name = 'v_category_performance')
    EXEC('DROP VIEW v_category_performance');
GO
CREATE VIEW v_category_performance AS
SELECT c.id, c.name, c.slug, COUNT(DISTINCT b.id) as total_books, SUM(b.stock) as total_stock, SUM(b.sold_count) as total_sold
FROM categories c LEFT JOIN books b ON c.id = b.category_id AND b.is_deleted = 0
GROUP BY c.id, c.name, c.slug;
GO
PRINT '  ✓ v_category_performance';
GO

PRINT '  → Total: 8 views created';
GO

-- ============================================================================
-- STEP 7: SEED DATA
-- ============================================================================

PRINT '';
PRINT 'Step 7: Seeding data...';
GO

-- Seed Roles
SET IDENTITY_INSERT roles ON;
MERGE INTO roles AS target
USING (VALUES
    (1, 'admin', N'Administrator', N'Quản trị viên hệ thống', 1),
    (2, 'staff', N'Staff Member', N'Nhân viên vận hành', 1),
    (3, 'user', N'Customer', N'Khách hàng', 1)
) AS source (id, name, display_name, description, is_system)
ON target.id = source.id
WHEN NOT MATCHED THEN
    INSERT (id, name, display_name, description, is_system, created_at, updated_at)
    VALUES (source.id, source.name, source.display_name, source.description, source.is_system, GETUTCDATE(), GETUTCDATE());
SET IDENTITY_INSERT roles OFF;
PRINT '  ✓ 3 roles';
GO

-- Seed Permissions
INSERT INTO permissions (name, resource, action, description, created_at)
SELECT name, resource, action, description, GETUTCDATE() FROM (VALUES
    ('users.read', 'users', 'read', N'Xem người dùng'),
    ('users.create', 'users', 'create', N'Tạo người dùng'),
    ('users.update', 'users', 'update', N'Cập nhật người dùng'),
    ('users.delete', 'users', 'delete', N'Xóa người dùng'),
    ('books.read', 'books', 'read', N'Xem sách'),
    ('books.create', 'books', 'create', N'Thêm sách'),
    ('books.update', 'books', 'update', N'Cập nhật sách'),
    ('books.delete', 'books', 'delete', N'Xóa sách'),
    ('categories.read', 'categories', 'read', N'Xem danh mục'),
    ('categories.create', 'categories', 'create', N'Tạo danh mục'),
    ('orders.read', 'orders', 'read', N'Xem đơn hàng'),
    ('orders.create', 'orders', 'create', N'Tạo đơn hàng'),
    ('orders.update', 'orders', 'update', N'Cập nhật đơn'),
    ('inventory.read', 'inventory', 'read', N'Xem tồn kho'),
    ('inventory.write', 'inventory', 'write', N'Nhập/xuất kho'),
    ('customers.read', 'customers', 'read', N'Xem khách hàng'),
    ('reports.basic.read', 'reports', 'read', N'Xem báo cáo'),
    ('reports.financial.read', 'reports', 'read_financial', N'Xem BC tài chính'),
    ('roles.read', 'roles', 'read', N'Xem vai trò'),
    ('roles.manage', 'roles', 'manage', N'Quản lý vai trò')
) AS p(name, resource, action, description)
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE permissions.name = p.name);
PRINT '  ✓ 20 permissions';
GO

-- Seed Role Permissions
DECLARE @admin_role_id BIGINT = (SELECT id FROM roles WHERE name = 'admin');
DECLARE @staff_role_id BIGINT = (SELECT id FROM roles WHERE name = 'staff');
DECLARE @user_role_id BIGINT = (SELECT id FROM roles WHERE name = 'user');

INSERT INTO role_permissions (role_id, permission_id, created_at)
SELECT @admin_role_id, id, GETUTCDATE() FROM permissions p
WHERE NOT EXISTS (SELECT 1 FROM role_permissions WHERE role_id = @admin_role_id AND permission_id = p.id);

INSERT INTO role_permissions (role_id, permission_id, created_at)
SELECT @staff_role_id, id, GETUTCDATE() FROM permissions
WHERE name IN ('books.read', 'books.update', 'books.create', 'categories.read', 'orders.read', 'orders.update', 'inventory.read', 'inventory.write', 'customers.read', 'reports.basic.read')
AND NOT EXISTS (SELECT 1 FROM role_permissions WHERE role_id = @staff_role_id AND permission_id = permissions.id);

INSERT INTO role_permissions (role_id, permission_id, created_at)
SELECT @user_role_id, id, GETUTCDATE() FROM permissions
WHERE name IN ('books.read', 'categories.read', 'orders.read', 'orders.create')
AND NOT EXISTS (SELECT 1 FROM role_permissions WHERE role_id = @user_role_id AND permission_id = permissions.id);
PRINT '  ✓ role permissions assigned';
GO

-- Seed Users — mat khau dev mac dinh: 1 (bcrypt 10 rounds, dong bo BCRYPT_HASH_DEV_PASSWORD_1 trong BE)
SET IDENTITY_INSERT users ON;
MERGE INTO users AS target
USING (VALUES
    (1, 'admin@bookstore.com', '$2b$10$Qm1PTtEa2.EPCScWdPPxouw2Jc5xT2l1VCin3BeqmYwl/p2dZctj2', N'Admin', N'System', '0123456789', N'Nam', '1990-01-01', NULL, 1, 0),
    (2, 'staff@bookstore.com', '$2b$10$Qm1PTtEa2.EPCScWdPPxouw2Jc5xT2l1VCin3BeqmYwl/p2dZctj2', N'Staff', N'Demo', '0987654321', N'Nữ', '1995-05-15', NULL, 1, 0),
    (3, 'user@example.com', '$2b$10$Qm1PTtEa2.EPCScWdPPxouw2Jc5xT2l1VCin3BeqmYwl/p2dZctj2', N'John', N'Doe', '0909123456', N'Nam', '1992-08-20', NULL, 1, 0)
) AS source (id, email, password_hash, first_name, last_name, phone, gender, birth_date, avatar_url, is_active, is_deleted)
ON target.id = source.id
WHEN NOT MATCHED THEN
    INSERT (id, email, password_hash, first_name, last_name, phone, gender, birth_date, avatar_url, is_active, is_deleted, created_at, updated_at)
    VALUES (source.id, source.email, source.password_hash, source.first_name, source.last_name, source.phone, source.gender, source.birth_date, source.avatar_url, source.is_active, source.is_deleted, GETUTCDATE(), GETUTCDATE());
SET IDENTITY_INSERT users OFF;
PRINT '  ✓ 3 users';
GO

-- Seed User Roles
DECLARE @ur_admin_role_id BIGINT = (SELECT id FROM roles WHERE name = 'admin');
DECLARE @ur_staff_role_id BIGINT = (SELECT id FROM roles WHERE name = 'staff');
DECLARE @ur_user_role_id BIGINT = (SELECT id FROM roles WHERE name = 'user');

INSERT INTO user_roles (user_id, role_id, created_at)
SELECT 1, @ur_admin_role_id, GETUTCDATE() WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 1 AND role_id = @ur_admin_role_id);
INSERT INTO user_roles (user_id, role_id, created_at)
SELECT 2, @ur_staff_role_id, GETUTCDATE() WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 2 AND role_id = @ur_staff_role_id);
INSERT INTO user_roles (user_id, role_id, created_at)
SELECT 3, @ur_user_role_id, GETUTCDATE() WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 3 AND role_id = @ur_user_role_id);
PRINT '  ✓ user roles assigned';
GO

-- Seed Categories
SET IDENTITY_INSERT categories ON;
MERGE INTO categories AS target
USING (VALUES
    (1, N'Văn học', 'van-hoc', 'fas fa-book-open', N'Sách văn học', NULL, 1, 1),
    (2, N'Kinh tế', 'kinh-te', 'fas fa-chart-line', N'Sách kinh tế', NULL, 2, 1),
    (3, N'Khoa học', 'khoa-hoc', 'fas fa-flask', N'Sách khoa học', NULL, 3, 1),
    (4, N'Lịch sử', 'lich-su', 'fas fa-landmark', N'Sách lịch sử', NULL, 4, 1),
    (5, N'Thiếu nhi', 'thieu-nhi', 'fas fa-child', N'Sách thiếu nhi', NULL, 5, 1),
    (6, N'Ngoại ngữ', 'ngoai-ngu', 'fas fa-language', N'Sách ngoại ngữ', NULL, 6, 1),
    (7, N'Tâm lý - Kỹ năng sống', 'tam-ly-ky-nang-song', 'fas fa-brain', N'Sách tâm lý', NULL, 7, 1),
    (8, N'Công nghệ thông tin', 'cong-nghe-thong-tin', 'fas fa-laptop-code', N'Sách IT', NULL, 8, 1)
) AS source (id, name, slug, icon, description, parent_id, display_order, is_active)
ON target.id = source.id
WHEN NOT MATCHED THEN
    INSERT (id, name, slug, icon, description, parent_id, display_order, is_active, created_at, updated_at)
    VALUES (source.id, source.name, source.slug, source.icon, source.description, source.parent_id, source.display_order, source.is_active, GETUTCDATE(), GETUTCDATE());
SET IDENTITY_INSERT categories OFF;
PRINT '  ✓ 8 categories';
GO

-- Seed Books
SET IDENTITY_INSERT books ON;
MERGE INTO books AS target
USING (VALUES
    (1, '978-604-2-25888-8', N'Nhà Giả Kim', N'Paulo Coelho', N'NXB Hội Nhà Văn', '2020-01-15', 1, N'Tác phẩm nổi tiếng', 227, N'Tiếng Việt', 79000, 55000, 15, 150, 1, 1, 0, 0, 4.8, 1250, 609, 3420, 1, 0),
    (2, '978-604-2-14725-7', N'Đắc Nhân Tâm', N'Dale Carnegie', N'NXB Tổng Hợp', '2019-05-20', 7, N'Nghệ thuật giao tiếp', 320, N'Tiếng Việt', 89000, 62000, 20, 200, 1, 1, 1, 0, 4.9, 2100, 1500, 5680, 1, 0),
    (3, '978-604-2-06654-3', N'Nguyên Lý Marketing', N'Philip Kotler', N'NXB Lao Động', '2021-03-10', 2, N'Giáo trình Marketing', 850, N'Tiếng Việt', 299000, 210000, 10, 80, 0, 0, 0, 0, 4.6, 340, 156, 890, 1, 0),
    (4, '978-0-13-468599-1', N'Lập Trình Sạch (Clean Code)', N'Robert C. Martin', N'Prentice Hall', '2008-08-01', 8, N'Agile Software Craftsmanship', 464, N'English', 450000, 320000, 5, 45, 1, 0, 1, 0, 4.7, 523, 234, 1234, 1, 0),
    (5, '978-604-2-17892-3', N'Cambridge IELTS 16 Academic', N'Cambridge', N'Cambridge Press', '2022-06-15', 6, N'Đề thi IELTS', 156, N'English', 250000, 180000, 10, 120, 0, 1, 0, 1, 4.5, 890, 567, 2340, 1, 0),
    (6, '978-604-2-19876-1', N'Doraemon Tập 1', N'Fujiko F. Fujio', N'NXB Kim Đồng', '2018-01-01', 5, N'Truyện Doraemon', 196, N'Tiếng Việt', 25000, 18000, 0, 300, 0, 1, 0, 0, 4.8, 756, 890, 4560, 1, 0),
    (7, '978-604-2-08765-4', N'Lược Sử Thời Gian', N'Stephen Hawking', N'NXB Trẻ', '2020-09-10', 3, N'Vũ trụ học', 256, N'Tiếng Việt', 129000, 90000, 12, 65, 1, 0, 0, 0, 4.7, 432, 178, 1890, 1, 0),
    (8, '978-604-2-11234-5', N'Sapiens: Lược Sử Loài Người', N'Yuval Noah Harari', N'NXB Trẻ', '2021-02-28', 4, N'Lịch sử loài người', 543, N'Tiếng Việt', 189000, 132000, 15, 95, 1, 1, 1, 0, 4.9, 1876, 892, 6234, 1, 0),
    (9, '978-604-2-15678-9', N'Tư Duy Nhanh Và Chậm', N'Daniel Kahneman', N'NXB Thế Giới', '2020-11-20', 7, N'Hai hệ tư duy', 512, N'Tiếng Việt', 169000, 118000, 10, 110, 0, 1, 0, 0, 4.6, 654, 423, 2345, 1, 0),
    (10, '978-604-2-19999-8', N'Conan Tập 50', N'Aoyama Gosho', N'NXB Kim Đồng', '2019-08-15', 5, N'Thám tử Conan', 180, N'Tiếng Việt', 23000, 16000, 0, 250, 0, 0, 0, 0, 4.7, 432, 678, 3456, 1, 0)
) AS source (id, isbn, title, author, publisher, publish_date, category_id, description, pages, language, price, import_price, discount, stock, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted)
ON target.id = source.id
WHEN NOT MATCHED THEN
    INSERT (id, isbn, title, author, publisher, publish_date, category_id, description, pages, language, price, import_price, discount, stock, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)
    VALUES (source.id, source.isbn, source.title, source.author, source.publisher, source.publish_date, source.category_id, source.description, source.pages, source.language, source.price, source.import_price, source.discount, source.stock, source.featured, source.bestseller, source.trending, source.is_new, source.rating, source.review_count, source.sold_count, source.view_count, source.is_active, source.is_deleted, GETUTCDATE(), GETUTCDATE());
SET IDENTITY_INSERT books OFF;
PRINT '  ✓ 10 books';
GO

-- Seed Book Images
INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at)
SELECT book_id, image_url, is_primary, display_order, GETUTCDATE() FROM (VALUES
    (1, '/img/nhagiakim.jpg', 1, 1), (2, '/img/dac-nhan-tam.jpg', 1, 1),
    (3, '/img/nguyen-ly-marketing.jpg', 1, 1), (4, '/img/clean-code.jpg', 1, 1),
    (5, '/img/ielts-16.jpg', 1, 1), (6, '/img/doraemon-1.jpg', 1, 1),
    (7, '/img/luoc-su-thoi-gian.jpg', 1, 1), (8, '/img/sapiens.jpg', 1, 1),
    (9, '/img/tu-duy-nhanh-cham.jpg', 1, 1), (10, '/img/conan-50.jpg', 1, 1)
) AS img(book_id, image_url, is_primary, display_order)
WHERE NOT EXISTS (SELECT 1 FROM book_images WHERE book_images.book_id = img.book_id);
PRINT '  ✓ book images';
GO

-- Seed Book Tags
INSERT INTO book_tags (book_id, tag, created_at)
SELECT book_id, tag, GETUTCDATE() FROM (VALUES
    (1, N'văn học'), (1, N'bestseller'), (2, N'kỹ năng sống'), (2, N'bestseller'),
    (4, N'lập trình'), (5, N'ielts'), (6, N'manga'), (8, N'lịch sử'), (10, N'manga')
) AS tag(book_id, tag)
WHERE NOT EXISTS (SELECT 1 FROM book_tags WHERE book_tags.book_id = tag.book_id AND book_tags.tag = tag.tag);
PRINT '  ✓ book tags';
GO

-- Seed Suppliers
SET IDENTITY_INSERT suppliers ON;
MERGE INTO suppliers AS target
USING (VALUES
    (1, N'Fahasa', N'Nguyễn Văn A', '028-3822-5798', 'contact@fahasa.com', N'60-62 Lê Lợi, Q.1, TP.HCM', 1),
    (2, N'NXB Trẻ', N'Trần Thị B', '028-3930-4366', 'info@nxbtre.com.vn', N'161B Lý Chính Thắng, Q.3, TP.HCM', 1),
    (3, N'NXB Kim Đồng', N'Phạm Văn C', '024-3943-4730', 'info@kimdong.com.vn', N'248 Cống Quỳnh, Q.1, TP.HCM', 1)
) AS source (id, name, contact_person, phone, email, address, is_active)
ON target.id = source.id
WHEN NOT MATCHED THEN
    INSERT (id, name, contact_person, phone, email, address, is_active, created_at, updated_at)
    VALUES (source.id, source.name, source.contact_person, source.phone, source.email, source.address, source.is_active, GETUTCDATE(), GETUTCDATE());
SET IDENTITY_INSERT suppliers OFF;
PRINT '  ✓ 3 suppliers';
GO

-- ============================================================================
-- COMPLETION SUMMARY
-- ============================================================================

PRINT '';
PRINT '================================================================================';
PRINT '  DATABASE SETUP COMPLETED SUCCESSFULLY!';
PRINT '================================================================================';
PRINT '';
PRINT 'Objects Created:';
PRINT '  ✓ Tables: 18';
PRINT '  ✓ Indexes: 30+';
PRINT '  ✓ Triggers: 7';
PRINT '  ✓ Stored Procedures: 3';
PRINT '  ✓ Views: 8';
PRINT '';
PRINT 'Seed Data:';
PRINT '  ✓ Roles: 3';
PRINT '  ✓ Permissions: 20';
PRINT '  ✓ Users: 3';
PRINT '  ✓ Categories: 8';
PRINT '  ✓ Books: 10';
PRINT '  ✓ Suppliers: 3';
PRINT '';
PRINT 'Test accounts (dev, password = 1 for all seeded users):';
PRINT '  - admin@bookstore.com (admin)';
PRINT '  - staff@bookstore.com (staff)';
PRINT '  - user@example.com (user)';
PRINT '';
PRINT 'Next Steps:';
PRINT '  1. Verify: SELECT * FROM users;';
PRINT '  2. Verify: SELECT * FROM books;';
PRINT '  3. Test views: SELECT * FROM v_top_selling_books;';
PRINT '  4. Build your Node.js API to connect to this database';
PRINT '';
PRINT '================================================================================';
GO
SELECT local_net_address, local_tcp_port
FROM sys.dm_exec_connections
WHERE session_id = @@SPID;
