CREATE DATABASE DB_ENCUESTAS;
USE DB_ENCUESTAS;
CREATE TABLE ROL(
Id_rol  int(10) NOT NULL AUTO_INCREMENT,
Rol_Value varchar(20),
constraint PK_Rol PRIMARY KEY (Rol_value),
constraint CHK_Rol CHECK (UPPER(Rol_Value) IN ("ADMIN","USER")),
constraint CHK_ID UNIQUE(Id_rol)
);


CREATE TABLE USUARIO(
Email varchar(50),
Rol_user varchar(20),
Name_user varchar(20) NOT NULL,
Surname_user varchar(20)NOT NULL,
Passwd varchar(260),
constraint PK_USER PRIMARY KEY(Email),
constraint FK_Rol FOREIGN KEY (Rol_user) REFERENCES ROL(Rol_Value),
constraint CHK_Email CHECK (Email  REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);


CREATE TABLE PRODUCT(
Producto varchar(20),
Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint PK_Product PRIMARY KEY(Producto),
constraint CHK_Producto CHECK (UPPER(producto) IN ("LUZ","GAS","DUAL"))
);

CREATE TABLE SUBPRODUCT(
Id_subproducto int(10) NOT NULL AUTO_INCREMENT,
Val_producto varchar(20),
Subproducto varchar(40) NOT NULL,
Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint PK_Subproduct PRIMARY KEY (Id_subproducto),
constraint FK_ProductSub  FOREIGN KEY (Val_producto) REFERENCES PRODUCT(Producto)
);

CREATE TABLE ENCUESTA(
Id_encuesta CHAR(36),
Dni varchar(9) NOT NULL,
Producto varchar(20),
Mantenimiento varchar(2) NOT NULL,
Tipo_mantenimiento varchar(40) NOT NULL,
Estado varchar(30) NOT NULL,
Id_subproducto int(10),
Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint CHK_Estado CHECK (UPPER(Estado) IN ("VENDIDO","EN PROCESO","NO VENDIDO","NO VÁLIDO")),
constraint CHK_Mantenimiento CHECK (UPPER(Mantenimiento) IN ("SI","NO")),
constraint CHK_Dni CHECK (Dni REGEXP '^[0-9]{8}[A-Z]$' OR Dni REGEXP '^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'),  
constraint PK_ENCUESTA PRIMARY KEY(Id_encuesta),
constraint FK_ProdEncuesta FOREIGN KEY (Producto) REFERENCES PRODUCT(Producto),
constraint FK_SubEncuesta FOREIGN KEY (Id_subproducto) REFERENCES SUBPRODUCT(Id_subproducto)
);

CREATE TABLE USER_ENCUESTA(
Id_UsuEncuesta CHAR(36),
Email varchar(50),
Id_encuesta  CHAR(36),
constraint PK_USUENCUESTA PRIMARY KEY(Id_UsuEncuesta),
constraint FK_UserEncuesta FOREIGN KEY (Email) REFERENCES USUARIO(Email), 
constraint FK_EncuestaUsuEncuesta FOREIGN KEY (Id_encuesta) REFERENCES ENCUESTA(Id_encuesta)
);

