CREATE DATABASE DB_ENCUESTAS;
USE DB_ENCUESTAS;
CREATE TABLE ROL(
Id_rol char(36) DEFAULT UUID(),
Rol_Value varchar(20),
constraint PK_Rol PRIMARY KEY (Rol_value),
constraint CHK_Rol CHECK (UPPER(Rol_Value) IN ("ADMIN","USER"))
);


CREATE TABLE USUARIO(
Email varchar(50),
Rol_user varchar(20),
Name_user varchar(20),
Surname_user varchar(20),
Passwd varchar(260),
constraint PK_USER PRIMARY KEY(Email),
constraint FK_Rol FOREIGN KEY (Rol_user) REFERENCES ROL(Rol_Value),
constraint CHK_Surname CHECK (Surname_user REGEXP '^[A-Za-z\s]+$'),
constraint CHK_Name CHECK (Name_user REGEXP '^[A-Za-z\s]+$'),
constraint CHK_Email CHECK (Email  REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);


CREATE TABLE PRODUCT(
Producto varchar(20),
Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint PK_Product PRIMARY KEY(Producto),
constraint CHK_Producto CHECK (UPPER(producto) IN ("LUZ","GAS","DUAL"))
);

CREATE TABLE SUBPRODUCT(
Val_producto varchar(20),
subproducto varchar(30) ,
Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint PK_Subproduct PRIMARY KEY(subproducto),
constraint CHK_Subproducto CHECK (subproducto REGEXP '^[A-Z\s]+$'),
constraint FK_ProductSub  FOREIGN KEY (Val_producto) REFERENCES PRODUCT(Producto)
);

CREATE TABLE ENCUESTA(
Id_encuesta char(36) DEFAULT UUID(),
Dni varchar(9) NOT NULL,
Producto varchar(20),
Mantenimiento varchar(2),
Tipo_mantenimiento varchar(20),
Estado varchar(30),
Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint CHK_Estado CHECK (UPPER(Estado) IN ("VENDIDO","EN PROCESO","NO VENDIDO","NO VÁLIDO")),
constraint CHK_Mantenimiento CHECK (UPPER(Mantenimiento) IN ("SI","NO")),
constraint CHK_TipoMantenimiento CHECK(Tipo_mantenimiento REGEXP '^[A-Z\s]+$'),
constraint CHK_Dni CHECK (Dni REGEXP '^[0-9]{8}[A-Z]$' OR Dni REGEXP '^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'),  
constraint PK_ENCUESTA PRIMARY KEY(Id_encuesta),
constraint FK_ProdEncuesta FOREIGN KEY (Producto) REFERENCES PRODUCT(Producto)
);

CREATE TABLE USER_ENCUESTA(
Id_UsuEncuesta char(36) DEFAULT UUID(),
Email varchar(50),
Id_encuesta char(36),
constraint PK_USUENCUESTA PRIMARY KEY(Id_UsuEncuesta),
constraint FK_UserEncuesta FOREIGN KEY (Email) REFERENCES USUARIO(Email), 
constraint FK_EncuestaUsuEncuesta FOREIGN KEY (Id_encuesta) REFERENCES ENCUESTA(Id_encuesta)
);

